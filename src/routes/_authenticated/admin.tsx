import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

import {
  CalendarClock,
  ChevronRight,
  Inbox,
  Loader2,
  LogOut,
  Plus,
  RefreshCw,
  Search,
  UserCheck,
} from "lucide-react";
import { useState } from "react";

import { toast } from "sonner";

import {
  ENQUIRY_CATEGORY_LABELS,
  ENQUIRY_STATUS_LABELS,
} from "@/lib/content";
import {
  addEnquiryNote,
  getAdminStats,
  getEnquiry,
  listEnquiries,
  updateEnquiryDetails,
  updateEnquiryStatus,
  type EnquiryNoteRow,
  type EnquiryRow,
} from "@/lib/admin.functions";
import { HiveNetLogo } from "@/components/site/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Enquiry Dashboard — HiveNet" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const STATUS_VALUES = Object.keys(ENQUIRY_STATUS_LABELS);

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusBadgeClass(status: string) {
  switch (status) {
    case "new":
      return "bg-primary/15 text-primary-deep border-primary/30";
    case "contacted":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "assessment_required":
      return "bg-sky-100 text-sky-800 border-sky-200";
    case "quotation_sent":
      return "bg-violet-100 text-violet-800 border-violet-200";
    case "converted":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "closed":
      return "bg-muted text-muted-foreground border-border";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

function AdminPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const stats = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: () => getAdminStats(),
  });

  const enquiries = useQuery({
    queryKey: ["admin", "enquiries", { search, status, category }],
    queryFn: () => listEnquiries({ data: { search, status, category } }),
  });

  async function applySearch() {
    setSearch(searchInput.trim());
  }

  const context = Route.useRouteContext();
  const userId = context.userId;

  function signOut() {
    (async () => {
      await queryClient.cancelQueries();
      queryClient.clear();
      await supabase.auth.signOut();
      navigate({ to: "/auth", replace: true });
      void router.invalidate();
    })();
  }


  const rows = enquiries.data ?? [];
  const selected = rows.find((r) => r.id === selectedId) ?? null;

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="border-b border-border bg-background">
        <div className="container-page flex items-center justify-between py-4">
          <HiveNetLogo className="h-7" />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                void queryClient.invalidateQueries({ queryKey: ["admin"] });
              }}
            >
              <RefreshCw className="mr-2 h-3.5 w-3.5" />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="mr-2 h-3.5 w-3.5" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container-page flex-1 py-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Enquiry dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every enquiry submitted through the website, newest first.
        </p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Total enquiries" value={stats.data?.total} />
          <StatCard label="Today" value={stats.data?.today} />
          <StatCard label="Last 7 days" value={stats.data?.last7Days} />
          <StatCard
            label="New (unactioned)"
            value={stats.data?.byStatus["new"] ?? 0}
          />
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="search">Search</Label>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void applySearch();
              }}
            >
              <Input
                id="search"
                placeholder="Reference, name, phone or town"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onBlur={() => void applySearch()}
              />
            </form>
          </div>
          <div className="w-full space-y-1.5 sm:w-44">
            <Label>Status</Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {STATUS_VALUES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {ENQUIRY_STATUS_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full space-y-1.5 sm:w-48">
            <Label>Category</Label>
            <Select
              value={category}
              onValueChange={(v) => setCategory(v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {Object.entries(ENQUIRY_CATEGORY_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* List */}
        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
          {enquiries.isLoading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading enquiries…
            </div>
          ) : enquiries.isError ? (
            <div className="py-16 text-center text-sm text-destructive">
              We could not load enquiries. Try refreshing the page.
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-muted-foreground">
              <Inbox className="h-8 w-8" />
              <p className="mt-3 text-sm">No enquiries match these filters.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead aria-label="Open" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedId(row.id)}
                  >
                    <TableCell className="font-mono text-xs font-semibold">
                      {row.reference}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-xs">
                      {formatDate(row.created_at)}
                    </TableCell>
                    <TableCell className="font-medium">{row.full_name}</TableCell>
                    <TableCell className="whitespace-nowrap text-sm">
                      {row.phone}
                    </TableCell>
                    <TableCell className="text-sm">
                      {[row.town, row.county].filter(Boolean).join(", ") || "—"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {ENQUIRY_CATEGORY_LABELS[row.category] ?? row.category}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn("text-xs", statusBadgeClass(row.status))}
                      >
                        {ENQUIRY_STATUS_LABELS[row.status] ?? row.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>

      {selected && (
        <EnquiryDetailDialog
          enquiryId={selected.id}
          fallback={selected}
          userId={userId}
          onClose={() => setSelectedId(null)}
        />

      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | undefined }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold text-foreground">
        {value === undefined ? "…" : value}
      </p>
    </div>
  );
}

function EnquiryDetailDialog({
  enquiryId,
  fallback,
  userId,
  onClose,
}: {
  enquiryId: string;
  fallback: EnquiryRow;
  userId: string;
  onClose: () => void;
}) {

  const queryClient = useQueryClient();
  const detail = useQuery({
    queryKey: ["admin", "enquiry", enquiryId],
    queryFn: () => getEnquiry({ data: { id: enquiryId } }),
  });

  const enquiry = detail.data?.enquiry ?? fallback;
  const notes = detail.data?.notes ?? [];

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin", "enquiry", enquiryId] });
    void queryClient.invalidateQueries({ queryKey: ["admin", "enquiries"] });
    void queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
  };

  const statusMutation = useMutation({
    mutationFn: (status: string) =>
      updateEnquiryStatus({ data: { id: enquiryId, status } }),
    onSuccess: () => {
      toast.success("Status updated");
      invalidate();
    },
    onError: () => toast.error("Could not update status"),
  });

  const detailsMutation = useMutation({
    mutationFn: (patch: { followUpDate?: string | null; assignedTo?: string | null }) =>
      updateEnquiryDetails({ data: { id: enquiryId, ...patch } }),
    onSuccess: () => {
      toast.success("Enquiry updated");
      invalidate();
    },
    onError: () => toast.error("Could not update the enquiry"),
  });

  const noteMutation = useMutation({
    mutationFn: (body: string) =>
      addEnquiryNote({ data: { enquiryId, body } }),
    onSuccess: () => {
      toast.success("Note added");
      invalidate();
    },
    onError: () => toast.error("Could not add the note"),
  });

  const detailRows: Array<[string, string | null | undefined]> = [
    ["Full name", enquiry.full_name],
    ["Phone", enquiry.phone],
    ["Email", enquiry.email],
    ["County", enquiry.county],
    ["Town / area", enquiry.town],
    ["Estate / building", enquiry.estate],
    ["Type of premises", enquiry.property_type],
    ["Preferred contact", enquiry.preferred_contact],
    ["Best time", enquiry.preferred_time],
    ["Source", enquiry.source],
    ["Follow-up date", enquiry.follow_up_date],
  ];

  const detailEntries = Object.entries(enquiry.details ?? {});

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="font-mono text-base">{enquiry.reference}</span>
            <Badge
              variant="outline"
              className={cn("text-xs", statusBadgeClass(enquiry.status))}
            >
              {ENQUIRY_STATUS_LABELS[enquiry.status] ?? enquiry.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Received {formatDate(enquiry.created_at)} ·{" "}
            {ENQUIRY_CATEGORY_LABELS[enquiry.category] ?? enquiry.category}
          </DialogDescription>
        </DialogHeader>

        {/* Status + follow-up */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Status</Label>
            <Select
              value={enquiry.status}
              onValueChange={(v) => statusMutation.mutate(v)}
              disabled={statusMutation.isPending}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_VALUES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {ENQUIRY_STATUS_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="follow-up">Follow-up date</Label>
            <div className="flex gap-2">
              <Input
                id="follow-up"
                type="date"
                defaultValue={enquiry.follow_up_date ?? ""}
                onChange={(e) =>
                  detailsMutation.mutate({
                    followUpDate: e.target.value || null,
                  })
                }
              />
              {detailsMutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin self-center" />
              )}
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-fit"
          disabled={detailsMutation.isPending}
          onClick={() => detailsMutation.mutate({ assignedTo: userId })}
        >
          <UserCheck className="mr-2 h-3.5 w-3.5" />
          Assign to me
        </Button>

        {/* Contact details */}
        <div className="rounded-lg border border-border bg-background p-4">
          <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {detailRows
              .filter(([, v]) => v)
              .map(([label, value]) => (
                <div key={label} className="flex gap-2 text-sm">
                  <dt className="shrink-0 font-medium text-muted-foreground">
                    {label}:
                  </dt>
                  <dd className="text-foreground">{value}</dd>
                </div>
              ))}
          </dl>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {enquiry.description}
          </p>
          {detailEntries.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {detailEntries
                .filter(([, v]) => v)
                .map(([key, value]) => (
                  <Badge
                    key={key}
                    variant="outline"
                    className="bg-cream text-xs font-normal"
                  >
                    {key}: {value}
                  </Badge>
                ))}
            </div>
          )}
        </div>

        {/* Notes */}
        <NotesSection
          notes={notes}
          loading={detail.isLoading}
          onAdd={(body) => noteMutation.mutate(body)}
          adding={noteMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

function NotesSection({
  notes,
  loading,
  onAdd,
  adding,
}: {
  notes: EnquiryNoteRow[];
  loading: boolean;
  onAdd: (body: string) => void;
  adding: boolean;
}) {
  const [body, setBody] = useState("");

  return (
    <div>
      <Label className="flex items-center gap-2">
        <CalendarClock className="h-3.5 w-3.5" />
        Internal notes
      </Label>
      <div className="mt-2 space-y-2">
        {loading ? (
          <p className="text-xs text-muted-foreground">Loading notes…</p>
        ) : notes.length === 0 ? (
          <p className="text-xs text-muted-foreground">No notes yet.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="rounded-lg border border-border bg-background p-3"
            >
              <p className="whitespace-pre-wrap text-sm text-foreground">
                {note.body}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {formatDate(note.created_at)}
              </p>
            </div>
          ))
        )}
      </div>
      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const trimmed = body.trim();
          if (!trimmed) return;
          onAdd(trimmed);
          setBody("");
        }}
      >
        <Textarea
          rows={2}
          placeholder="Add a note for the team…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button type="submit" size="sm" disabled={adding || !body.trim()}>
          <Plus className="h-3.5 w-3.5" />
          Add
        </Button>
      </form>
    </div>
  );
}

