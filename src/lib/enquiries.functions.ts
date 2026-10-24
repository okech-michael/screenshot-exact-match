import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { enquiryRequestSchema, type EnquiryRequest } from "./enquiry-schemas";

export type SubmitEnquiryResult =
  | { ok: true; reference: string }
  | { ok: false; error: "rate_limited" | "invalid" | "server_error"; message: string };

/**
 * Public enquiry submission. Validates server-side, then creates the enquiry
 * through the publishable (anon) client; the `create_enquiry` database
 * function assigns the reference and enforces the submission rate limit.
 */
export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): EnquiryRequest => {
    const parsed = enquiryRequestSchema.safeParse(input);
    if (!parsed.success) {
      throw new Error("Invalid enquiry data");
    }
    return parsed.data;
  })
  .handler(async ({ data }): Promise<SubmitEnquiryResult> => {
    // Honeypot: pretend success so bots learn nothing.
    if (data.website && data.website.length > 0) {
      return { ok: true, reference: "HN-THANKYOU" };
    }

    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabasePublic = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
      // Opaque sb_ keys are not JWTs; send apikey only, no bearer.
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { data: reference, error } = await supabasePublic.rpc("create_enquiry", {
      p_category: data.category,
      p_full_name: data.fullName,
      p_phone: data.phone,
      // Optional text params are passed as empty strings; the database
      // function converts them to NULL with nullif().
      p_email: data.email ?? "",
      p_county: data.county ?? "",
      p_town: data.town ?? "",
      p_estate: data.estate ?? "",
      p_property_type: data.propertyType ?? "",
      p_preferred_contact: data.preferredContact,
      p_preferred_time: data.preferredTime ?? "",
      p_description: data.description,
      p_details: data.details,
      p_source: "website",
    });

    if (error) {
      const msg = error.message;
      if (msg.includes("RATE_LIMITED")) {
        return {
          ok: false,
          error: "rate_limited",
          message: "You have submitted several enquiries recently. Please try again in a few minutes or call us instead.",
        };
      }
      console.error("create_enquiry failed:", msg);
      return {
        ok: false,
        error: "server_error",
        message: "We could not record your enquiry just now. Please try again, or reach us by phone or email.",
      };
    }

    return { ok: true, reference: reference as string };
  });
