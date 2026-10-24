import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/*
 * Internal staff functions for the HiveNet enquiry dashboard.
 * Every function requires an authenticated session AND the admin role;
 * RLS policies back these checks up at the database level.
 */

async function requireAdmin(context: { supabase: unknown; userId: string }) {
  const { supabase, userId } = context as {
    supabase: {
      rpc: (fn: string, args: Record<string, unknown>) => Promise<{ data: unknown }>;
    };
    userId: string;
  };
  const { data: isAdmin } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (!isAdmin) {
    throw new Response("Forbidden", { status: 403 });
  }
  return { supabase, userId };
}

export type EnquiryRow = {
  id: string;
  reference: string;
  category: string;
  status: string;
  full_name: string;
  phone: string;
  email: string | null;
  county: string | null;
  town: string | null;
  estate: string | null;
  property_type: string | null;
  preferred_contact: string;
  preferred_time: string | null;
  description: string;
  details: Record<string, string>;
  source: string;
  assigned_to: string | null;
  follow_up_date: string | null;
  created_at: string;
  updated_at: string;
};

export type EnquiryNoteRow = {
  id: string;
  enquiry_id: string;
  author_id: string;
  body: string;
  created_at: string;
};

export type EnquiryFilters = {
  search?: string;
  status?: string;
  category?: string;
};

export const listEnquiries = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: EnquiryFilters) => input ?? {})
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    let query = context.supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);

    if (data.status && data.status !== "all") {
      query = query.eq("status", data.status);
    }
    if (data.category && data.category !== "all") {
      query = query.eq("category", data.category);
    }
    if (data.search && data.search.trim().length >= 2) {
      const term = data.search.trim().replace(/[%,()]/g, " ");
      query = query.or(
        `reference.ilike.%${term}%,full_name.ilike.%${term}%,phone.ilike.%${term}%,town.ilike.%${term}%`
      );
    }

    const { data: rows, error } = await query;
    if (error) throw new Error(error.message);
    return rows as EnquiryRow[];
  });

export const getEnquiry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const [enquiryResult, notesResult] = await Promise.all([
      context.supabase.from("enquiries").select("*").eq("id", data.id).maybeSingle(),
      context.supabase
        .from("enquiry_notes")
        .select("*")
        .eq("enquiry_id", data.id)
        .order("created_at", { ascending: false }),
    ]);
    if (enquiryResult.error) throw new Error(enquiryResult.error.message);
    if (notesResult.error) throw new Error(notesResult.error.message);
    return {
      enquiry: (enquiryResult.data ?? null) as EnquiryRow | null,
      notes: (notesResult.data ?? []) as EnquiryNoteRow[],
    };
  });

export const updateEnquiryStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; status: string }) => input)
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const { error } = await context.supabase
      .from("enquiries")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const updateEnquiryDetails = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      id: string;
      assignedTo?: string | null;
      followUpDate?: string | null;
    }) => input
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const patch: Record<string, unknown> = {};
    if (data.assignedTo !== undefined) patch.assigned_to = data.assignedTo || null;
    if (data.followUpDate !== undefined) patch.follow_up_date = data.followUpDate || null;
    const { error } = await context.supabase
      .from("enquiries")
      .update(patch)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const addEnquiryNote = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { enquiryId: string; body: string }) => input)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = await requireAdmin(context);
    const body = data.body.trim();
    if (!body) throw new Error("Note body is required");
    const { error } = await supabase.from("enquiry_notes").insert({
      enquiry_id: data.enquiryId,
      author_id: userId,
      body,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export type AdminStats = {
  total: number;
  byStatus: Record<string, number>;
  byCategory: Record<string, number>;
  today: number;
  last7Days: number;
};

export const getAdminStats = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context);
    const { data: rows, error } = await context.supabase
      .from("enquiries")
      .select("status, category, created_at")
      .order("created_at", { ascending: false })
      .limit(5000);
    if (error) throw new Error(error.message);

    const list = (rows ?? []) as Array<{
      status: string;
      category: string;
      created_at: string;
    }>;
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const stats: AdminStats = {
      total: list.length,
      byStatus: {},
      byCategory: {},
      today: 0,
      last7Days: 0,
    };
    for (const row of list) {
      stats.byStatus[row.status] = (stats.byStatus[row.status] ?? 0) + 1;
      stats.byCategory[row.category] = (stats.byCategory[row.category] ?? 0) + 1;
      const age = now - new Date(row.created_at).getTime();
      if (age < dayMs) stats.today += 1;
      if (age < 7 * dayMs) stats.last7Days += 1;
    }
    return stats;
  });
