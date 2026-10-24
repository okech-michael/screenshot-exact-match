import { z } from "zod";

/*
 * Shared enquiry validation. Used on the client (react-hook-form) and on the
 * server (server function inputValidator) so forms are validated in both places.
 */

export const ENQUIRY_CATEGORIES = [
  "general",
  "home",
  "property",
  "business",
  "school",
  "healthcare",
  "installation",
  "coverage",
] as const;

export type EnquiryCategory = (typeof ENQUIRY_CATEGORIES)[number];

const phoneRegex = /^[+]?[0-9][0-9\s-]{6,17}$/;

const baseSchema = z.object({
  category: z.enum(ENQUIRY_CATEGORIES),
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Enter a valid phone number, e.g. 0712 345 678"),
  email: z
    .union([z.literal(""), z.string().trim().email("Enter a valid email address")])
    .optional()
    .transform((v) => v || undefined),
  county: z.string().trim().max(80).optional().transform((v) => v || undefined),
  town: z.string().trim().max(120).optional().transform((v) => v || undefined),
  estate: z.string().trim().max(120).optional().transform((v) => v || undefined),
  propertyType: z.string().trim().max(120).optional().transform((v) => v || undefined),
  preferredContact: z.enum(["phone", "whatsapp", "email"]).default("phone"),
  preferredTime: z.string().trim().max(120).optional().transform((v) => v || undefined),
  description: z
    .string()
    .trim()
    .min(10, "Tell us a little about what you need (at least 10 characters)")
    .max(2000),
  // Per-category structured details.
  details: z.record(z.string(), z.string().max(300)).default({}),
  // Honeypot — must stay empty. Real users never see this field.
  website: z.string().max(0).optional().default(""),
});

/** Residential property / plot enquiries collect extra fields. */
const propertyDetails = z.object({
  units: z.string().trim().max(80).optional().default(""),
  buildings: z.string().trim().max(80).optional().default(""),
  users: z.string().trim().max(80).optional().default(""),
  occupancy: z.string().trim().max(80).optional().default(""),
  constraints: z.string().trim().max(500).optional().default(""),
});

/** Business enquiries collect extra fields. */
const businessDetails = propertyDetails.extend({});

/** School and healthcare enquiries collect extra fields. */
const institutionDetails = propertyDetails.extend({});

export const enquiryRequestSchema = baseSchema.superRefine((val, ctx) => {
  const d = val.details as Record<string, string | undefined>;
  if (val.category === "property") {
    if (!d.units) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["details", "units"],
        message: "Enter the approximate number of houses or units",
      });
    }
  }
  if (val.category === "business" && !d.users) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["details", "users"],
      message: "Enter the approximate number of users",
    });
  }
  if ((val.category === "school" || val.category === "healthcare") && !d.users) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["details", "users"],
      message: "Enter the approximate number of users",
    });
  }
  if (val.category === "coverage" && (!val.county || !val.town)) {
    if (!val.county) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["county"],
        message: "Select your county",
      });
    }
    if (!val.town) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["town"],
        message: "Enter your town or area",
      });
    }
  }
});

export type EnquiryRequest = z.infer<typeof enquiryRequestSchema>;

export { propertyDetails, businessDetails, institutionDetails };
