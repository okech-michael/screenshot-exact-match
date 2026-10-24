export const siteConfig = {
  name: "HiveNet",
  tagline: "Internet that keeps you connected.",
  description:
    "HiveNet delivers reliable internet connectivity and professionally managed Wi-Fi for homes, residential properties, businesses, and institutions — including the equipment, installation, and ongoing support.",
  url: "", // Set to the production URL before launch.
  contact: {
    // Supply real contact details before launch. Nothing is invented here.
    phone: "", // e.g. "+254700000000" — used for tel: links and WhatsApp.
    whatsapp: "", // Optional; falls back to phone when empty.
    email: "", // e.g. "hello@hivenet.example"
    address: "", // Physical address, shown only when set.
  },
  hours: {
    weekdays: "", // e.g. "Monday to Friday, 8:00 am to 6:00 pm"
    weekends: "", // e.g. "Saturday, 9:00 am to 4:00 pm"
  },
  social: {
    // Only add links for genuine accounts.
    facebook: "",
    instagram: "",
    x: "",
    linkedin: "",
  },
  prepaidServiceUrl: "", // URL of the HiveNet prepaid Wi-Fi service, once available.
} as const;

export function hasPhone() {
  return siteConfig.contact.phone.trim().length > 0;
}

export function hasEmail() {
  return siteConfig.contact.email.trim().length > 0;
}

/** True when at least one direct contact channel is configured. */
export function contactConfigured() {
  return hasPhone() || hasEmail();
}
