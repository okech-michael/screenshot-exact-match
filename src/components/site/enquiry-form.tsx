import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { submitEnquiry } from "@/lib/enquiries.functions";
import {
  ENQUIRY_CATEGORIES,
  ENQUIRY_CATEGORY_LABELS,
  KENYAN_COUNTIES,
  enquiryRequestSchema,
  propertyTypeOptions,
} from "@/lib/enquiry-schemas";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type FormInput = z.input<typeof enquiryRequestSchema>;
type FormOutput = z.output<typeof enquiryRequestSchema>;

const CATEGORY_ORDER = ENQUIRY_CATEGORIES;

const CATEGORY_HINTS: Record<string, string> = {
  home: "Tell us about your house or apartment and what you want to connect.",
  property: "For plots, apartment blocks and multi-unit properties.",
  business: "For offices, shops, restaurants and hospitality venues.",
  school: "For schools, colleges and educational institutions.",
  healthcare: "For hospitals, clinics and health facilities.",
  installation: "For equipment, installation and network setup requests.",
  coverage: "Check whether service is available at your location.",
  general: "Anything else you would like to ask HiveNet.",
};

export function EnquiryForm({
  defaultCategory = "general",
  className,
}: {
  defaultCategory?: string;
  className?: string;
}) {
  const submit = useServerFn(submitEnquiry);
  const [result, setResult] = useState<
    | { kind: "success"; reference: string }
    | { kind: "error"; message: string }
    | null
  >(null);

  const form = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(enquiryRequestSchema),
    defaultValues: {
      category: defaultCategory as FormInput["category"],
      fullName: "",
      phone: "",
      email: "",
      county: "",
      town: "",
      estate: "",
      propertyType: "",
      preferredContact: "phone",
      preferredTime: "",
      description: "",
      details: {},
      website: "",
    },
  });

  const category = form.watch("category");
  const county = form.watch("county");
  const details = form.watch("details") ?? {};
  const showCountyRequired = category === "coverage";
  const typeOptions = propertyTypeOptions(category);

  const submitCategory = CATEGORY_ORDER.includes(
    category as (typeof ENQUIRY_CATEGORIES)[number],
  )
    ? (category as (typeof ENQUIRY_CATEGORIES)[number])
    : "general";

  async function onSubmit(values: FormOutput) {
    try {
      const res = await submit({ data: values });
      if (res.ok) {
        setResult({ kind: "success", reference: res.reference });
        form.reset({
          category: values.category,
          fullName: "",
          phone: "",
          email: "",
          county: "",
          town: "",
          estate: "",
          propertyType: "",
          preferredContact: "phone",
          preferredTime: "",
          description: "",
          details: {},
          website: "",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setResult({ kind: "error", message: res.message });
      }
    } catch {
      setResult({
        kind: "error",
        message:
          "We could not send your enquiry just now. Please try again shortly.",
      });
    }
  }

  if (result?.kind === "success") {
    return (
      <div
        className={cn(
          "rounded-xl border border-border bg-card p-8 text-center shadow-sm",
          className,
        )}
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h2 className="mt-4 text-xl font-bold text-foreground">
          Thank you — your enquiry has been received.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Our reference for your enquiry is{" "}
          <span className="font-mono font-semibold text-foreground">
            {result.reference}
          </span>
          . Quote it when you contact us so we can find your enquiry quickly.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline">
            <Link to="/plans">See plans and pricing</Link>
          </Button>
          <Button asChild>
            <Link to="/how-it-works">How it works</Link>
          </Button>
        </div>
        <button
          type="button"
          onClick={() => setResult(null)}
          className="mt-6 text-sm font-medium text-primary-deep underline-offset-2 hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("space-y-8", className)}
      noValidate
    >
      {result?.kind === "error" && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {result.message}
        </div>
      )}

      {/* Honeypot — hidden from real users. */}
      <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...form.register("website")}
        />
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-foreground">
          What is your enquiry about?
        </legend>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {CATEGORY_ORDER.map((c) => (
            <label
              key={c}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-3 text-sm transition-colors",
                category === c
                  ? "border-primary bg-cream text-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-foreground/25",
              )}
            >
              <input
                type="radio"
                value={c}
                className="sr-only"
                {...form.register("category")}
              />
              <span
                className={cn(
                  "h-3.5 w-3.5 shrink-0 rounded-full border-2",
                  category === c ? "border-primary bg-primary" : "border-muted-foreground/40",
                )}
                aria-hidden="true"
              />
              {ENQUIRY_CATEGORY_LABELS[c]}
            </label>
          ))}
        </div>
        <p className="mt-2.5 text-xs text-muted-foreground">
          {CATEGORY_HINTS[submitCategory]}
        </p>
      </fieldset>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" placeholder="e.g. Grace Achieng" {...form.register("fullName")} />
          {form.formState.errors.fullName && (
            <p className="text-xs text-destructive">{form.formState.errors.fullName.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" type="tel" placeholder="e.g. 0712 345 678" {...form.register("phone")} />
          {form.formState.errors.phone && (
            <p className="text-xs text-destructive">{form.formState.errors.phone.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email (optional)</Label>
          <Input id="email" type="email" placeholder="you@example.com" {...form.register("email")} />
          {form.formState.errors.email && (
            <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="preferredContact">How should we reach you?</Label>
          <Select
            value={form.watch("preferredContact")}
            onValueChange={(v) =>
              form.setValue("preferredContact", v as "phone" | "whatsapp" | "email", {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger id="preferredContact">
              <SelectValue placeholder="Choose a contact method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phone">Phone call</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </fieldset>

      <fieldset className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="county">
            County{showCountyRequired ? "" : " (optional)"}
          </Label>
          <Select
            value={county || undefined}
            onValueChange={(v) => form.setValue("county", v, { shouldValidate: true })}
          >
            <SelectTrigger id="county">
              <SelectValue placeholder="Select county" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {KENYAN_COUNTIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.county && (
            <p className="text-xs text-destructive">{form.formState.errors.county.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="town">
            Town or area{showCountyRequired ? "" : " (optional)"}
          </Label>
          <Input id="town" placeholder="e.g. Nyanchwa" {...form.register("town")} />
          {form.formState.errors.town && (
            <p className="text-xs text-destructive">{form.formState.errors.town.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="estate">Estate / building (optional)</Label>
          <Input id="estate" placeholder="e.g. Milimani" {...form.register("estate")} />
        </div>
      </fieldset>

      <fieldset>
        <div className="space-y-1.5">
          <Label htmlFor="propertyType">Type of premises</Label>
          <Select
            value={form.watch("propertyType") || undefined}
            onValueChange={(v) =>
              form.setValue("propertyType", v, { shouldValidate: true })
            }
          >
            <SelectTrigger id="propertyType">
              <SelectValue placeholder="Select the type of premises" />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </fieldset>

      {(category === "property" || category === "business") && (
        <fieldset className="grid gap-4 sm:grid-cols-2">
          {category === "property" && (
            <div className="space-y-1.5">
              <Label htmlFor="units">
                Approximate number of houses / units
              </Label>
              <Input
                id="units"
                placeholder="e.g. 12 rental units"
                value={details["units"] ?? ""}
                onChange={(e) =>
                  form.setValue("details", { ...details, units: e.target.value })
                }
              />
              {form.formState.errors.details?.["units"] && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.details["units"]?.message}
                </p>
              )}
            </div>
          )}
          {category === "property" && (
            <div className="space-y-1.5">
              <Label htmlFor="buildings">Number of buildings / blocks (optional)</Label>
              <Input
                id="buildings"
                placeholder="e.g. 3 blocks"
                value={details["buildings"] ?? ""}
                onChange={(e) =>
                  form.setValue("details", { ...details, buildings: e.target.value })
                }
              />
            </div>
          )}
          {category === "business" && (
            <div className="space-y-1.5">
              <Label htmlFor="users">Approximate number of users</Label>
              <Input
                id="users"
                placeholder="e.g. 20 staff and customers"
                value={details["users"] ?? ""}
                onChange={(e) =>
                  form.setValue("details", { ...details, users: e.target.value })
                }
              />
              {form.formState.errors.details?.["users"] && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.details["users"]?.message}
                </p>
              )}
            </div>
          )}
        </fieldset>
      )}

      {(category === "school" || category === "healthcare") && (
        <fieldset>
          <div className="space-y-1.5">
            <Label htmlFor="institution-users">
              Approximate number of users
            </Label>
            <Input
              id="institution-users"
              placeholder="e.g. 300 students and staff"
              value={details["users"] ?? ""}
              onChange={(e) =>
                form.setValue("details", { ...details, users: e.target.value })
              }
            />
            {form.formState.errors.details?.["users"] && (
              <p className="text-xs text-destructive">
                {form.formState.errors.details["users"]?.message}
              </p>
            )}
          </div>
        </fieldset>
      )}

      <fieldset className="space-y-1.5">
        <Label htmlFor="description">
          {category === "coverage"
            ? "Tell us about your location and what you want to connect"
            : "What do you need?"}
        </Label>
        <Textarea
          id="description"
          rows={5}
          placeholder="Describe your property, how many people will use the connection and anything else we should know."
          {...form.register("description")}
        />
        {form.formState.errors.description && (
          <p className="text-xs text-destructive">
            {form.formState.errors.description.message}
          </p>
        )}
      </fieldset>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="preferredTime">Best time to reach you (optional)</Label>
          <Input
            id="preferredTime"
            placeholder="e.g. Weekdays after 5 pm"
            {...form.register("preferredTime")}
          />
        </div>
      </fieldset>

      <div className="flex flex-col gap-3">
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Send enquiry"
          )}
        </Button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          We use your details only to respond to this enquiry. See our{" "}
          <Link to="/privacy" className="underline underline-offset-2">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
