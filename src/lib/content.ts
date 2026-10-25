import { siteConfig } from "./site-config";

/*
 * Central content for the HiveNet website. Edit copy, packages and links here.
 * Claims, prices and details in this file reflect only what HiveNet has
 * confirmed — do not add invented statistics, testimonials or coverage claims.
 */

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Solutions", to: "/solutions" },
  { label: "Industries", to: "/industries" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "About HiveNet", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

/** Header / hero call-to-action. */
export const siteHeaderCta = { label: "Get Connected", to: "/contact" } as const;

export const SOLUTIONS = [
  {
    slug: "home-internet",
    name: "Home Internet",
    title: "Home internet, professionally connected",
    short:
      "Reliable connectivity for your house or apartment, with the router, installation and support handled for you.",
    image: "/images/hero-home.jpg",
    imageAlt:
      "A family relaxing in a bright modern living room using phones, tablets and a laptop",
    intro:
      "Your home depends on the internet every day — streaming, studying, working remotely and staying in touch. HiveNet sets up home connectivity as a complete service: we assess your location, provide the right equipment, install and configure it, and stay available for support.",
    includes: [
      "A connectivity assessment for your location and house layout.",
      "Routers and access points supplied and managed by HiveNet.",
      "Professional installation and Wi-Fi configuration.",
      "Coverage planned around the rooms and devices you actually use.",
      "Ongoing technical assistance when you need it.",
    ],
    note: "Availability, equipment and pricing are confirmed in your quotation after we assess your requirements.",
    cta: { label: "Request a Home Quote", category: "home" as const },
  },
  {
    slug: "residential-properties",
    name: "Residential Properties and Plots",
    title: "Managed Wi-Fi for plots, apartments and multi-unit properties",
    short:
      "Shared, centrally managed connectivity for landlords, caretakers and property managers — one network serving every unit.",
    image: "/images/apartments.jpg",
    imageAlt:
      "A modern multi-storey residential apartment building with balconies",
    intro:
      "If you own or manage a plot with several rental units, an apartment block, or student accommodation, individual connections for every unit are costly and hard to manage. HiveNet designs and runs one professionally managed network across the property, with clear access arrangements for your tenants.",
    includes: [
      "Connectivity planning across multiple units and buildings.",
      "Strategic router and access-point placement for whole-property coverage.",
      "Network equipment supplied, configured and managed by HiveNet.",
      "Clear tenant access arrangements for the Wi-Fi service.",
      "Support for connectivity enquiries and fault reports.",
      "Service arrangements tailored to the property and its tenants.",
    ],
    note: "Terms, equipment ownership and service inclusions are confirmed during quotation and contracting.",
    cta: { label: "Connect My Property", category: "property" as const },
  },
  {
    slug: "business-office",
    name: "Business and Office Internet",
    title: "Connectivity that keeps your business working",
    short:
      "Internet and managed networking for offices, shops and hospitality venues — planned around how your team works.",
    image: "/images/office.jpg",
    imageAlt:
      "Professionals working on laptops in a bright contemporary open-plan office",
    intro:
      "Every business runs on connectivity — point-of-sale systems, email, cloud tools, customer Wi-Fi. HiveNet assesses your premises and usage, then proposes a service arrangement with the right equipment, installation and ongoing support.",
    includes: [
      "A site assessment covering size, layout and expected users.",
      "Equipment recommendations suited to your operations.",
      "Professional installation and network configuration.",
      "Coverage for work areas, meeting rooms and customer spaces.",
      "Ongoing support and service management.",
    ],
    note: "We do not promise guaranteed uptime or specific speeds; what we deliver is confirmed in your proposal.",
    cta: { label: "Request a Business Quote", category: "business" as const },
  },
  {
    slug: "schools",
    name: "Institutional Connectivity — Schools",
    title: "Connectivity for schools and educational institutions",
    short:
      "Internet for classrooms, administration and computer labs, assessed and installed professionally.",
    image: "/images/school.jpg",
    imageAlt:
      "Students learning at computers in a bright school computer laboratory",
    intro:
      "Schools rely on the internet for teaching, research, administration and communication with parents. HiveNet assesses the campus — classrooms, offices, laboratories and other buildings — and proposes a connectivity and equipment arrangement suited to the number of users and buildings.",
    includes: [
      "A campus assessment covering buildings, blocks and expected users.",
      "Connectivity and coverage planning for learning and administration.",
      "Equipment provision, installation and configuration.",
      "Support arrangements agreed with the administration.",
    ],
    note: "Educational-network features beyond standard connectivity are discussed and confirmed during the assessment.",
    cta: { label: "Request an Assessment", category: "school" as const },
  },
  {
    slug: "healthcare",
    name: "Institutional Connectivity — Healthcare",
    title: "Dependable connectivity for healthcare facilities",
    short:
      "Connectivity for hospitals and clinics, planned around the facility's operations after a proper site assessment.",
    image: "/images/healthcare.jpg",
    imageAlt:
      "A calm, professional healthcare facility reception area",
    intro:
      "Hospitals and clinics depend on connectivity for records, communication and daily operations. HiveNet treats healthcare connectivity with the care it deserves: we assess the facility, discuss coverage and usage needs with your team, and propose a service arrangement with professional installation and support.",
    includes: [
      "A facility assessment with your administration or IT contact.",
      "Coverage planning for wards, offices and administrative areas.",
      "Equipment provision, installation and configuration.",
      "Support arrangements agreed with the facility.",
    ],
    note: "HiveNet does not make clinical availability or compliance claims; service terms are confirmed in the proposal.",
    cta: { label: "Request an Assessment", category: "healthcare" as const },
  },
  {
    slug: "managed-wifi",
    name: "Managed Wi-Fi and Networking Equipment",
    title: "Equipment, installation and network management — handled",
    short:
      "HiveNet supplies and manages the routers, access points and network setup required for its services.",
    image: "/images/equipment.jpg",
    imageAlt:
      "A neatly organised wall-mounted network installation with a router and tidy cabling",
    intro:
      "HiveNet is more than a Wi-Fi connection. We supply and manage the networking equipment your service requires, plan coverage around your premises, install and configure everything professionally, and remain available for support.",
    includes: [
      "Equipment selection suited to your premises and expected users.",
      "Router and access-point provision as part of the managed service.",
      "Coverage planning around your building or property.",
      "Professional installation and configuration.",
      "Ongoing assistance and service management.",
    ],
    note: "HiveNet supplies and manages the equipment required for its services. Ownership and equipment-return terms for a particular agreement are confirmed during quotation or contracting.",
    cta: { label: "Plan My Installation", category: "installation" as const },
  },
] as const;

export type SolutionSlug = (typeof SOLUTIONS)[number]["slug"];

export function getSolution(slug: string) {
  return SOLUTIONS.find((s) => s.slug === slug);
}

export const INDUSTRIES = [
  {
    name: "Homes and Families",
    blurb:
      "Everyday connectivity for the whole household — studying, streaming, working and staying in touch.",
    to: "/solutions/home-internet",
  },
  {
    name: "Apartments and Residential Properties",
    blurb:
      "One managed network serving every unit in an apartment block, plot or multi-unit development.",
    to: "/solutions/residential-properties",
  },
  {
    name: "Hostels and Student Accommodation",
    blurb:
      "Shared, centrally managed Wi-Fi that stays reliable across many rooms and heavy evening use.",
    to: "/solutions/residential-properties",
  },
  {
    name: "Offices and Corporate Businesses",
    blurb:
      "Connectivity and network equipment planned around your team, your tools and your premises.",
    to: "/solutions/business-office",
  },
  {
    name: "Retail and Hospitality",
    blurb:
      "Reliable connectivity for shops, restaurants and hotels — operations and guest Wi-Fi alike.",
    to: "/solutions/business-office",
  },
  {
    name: "Schools and Educational Institutions",
    blurb:
      "Campus connectivity for classrooms, computer labs and administration, professionally assessed.",
    to: "/solutions/schools",
  },
  {
    name: "Hospitals and Healthcare Facilities",
    blurb:
      "Dependable connectivity for records, communication and daily operations, planned with your team.",
    to: "/solutions/healthcare",
  },
  {
    name: "Other Organisations",
    blurb:
      "Churches, community centres, NGOs and organisations with multiple rooms, buildings or users.",
    to: "/contact",
  },
] as const;

export const SOLUTIONS_DROPDOWN = SOLUTIONS.map((s) => ({
  name: s.name,
  short: s.short,
  to: `/solutions/${s.slug}`,
}));

export const HOW_IT_WORKS_STEPS = [
  {
    title: "Tell us what you need",
    body: "Share your location, the type of property and what you want to connect. A short enquiry is enough to start.",
  },
  {
    title: "We assess your requirements",
    body: "HiveNet reviews service availability at your location and determines whether a site visit or more information is needed.",
  },
  {
    title: "Receive your proposal",
    body: "You get a clear recommendation: the service arrangement, the equipment required, pricing and terms.",
  },
  {
    title: "Installation and configuration",
    body: "Once agreed, our technicians install and configure the connectivity and equipment at your premises.",
  },
  {
    title: "Stay connected",
    body: "We guide you on using the service and remain reachable through our support channels whenever you need help.",
  },
] as const;

/** Confirmed HiveNet prepaid Wi-Fi packages. Prices in Kenyan shillings. */
export const PREPAID_PACKAGES = [
  { duration: "1 Hour", price: 5 },
  { duration: "2 Hours", price: 10 },
  { duration: "4 Hours", price: 15 },
  { duration: "6 Hours", price: 20 },
  { duration: "24 Hours", price: 35 },
  { duration: "7 Days", price: 170 },
  { duration: "30 Days", price: 500 },
] as const;

export const WHY_HIVENET = [
  {
    title: "One provider for connectivity and equipment",
    body: "HiveNet can provide the internet service and the networking equipment together — one accountable partner instead of several.",
  },
  {
    title: "Solutions shaped around your premises",
    body: "A bedsitter, an apartment block, an office floor and a school campus have very different needs. We plan for the space you actually have.",
  },
  {
    title: "Professional installation and configuration",
    body: "Our technicians install and configure the equipment, so your Wi-Fi works where it should from day one.",
  },
  {
    title: "Options for single rooms and whole properties",
    body: "From a single home connection to a managed network across multiple buildings, there is an arrangement that fits.",
  },
  {
    title: "A clear enquiry and support process",
    body: "Enquire, get an assessment, receive a proposal, get installed — and reach support through a clear channel afterwards.",
  },
  {
    title: "A relationship beyond installation",
    body: "We stay involved: coverage reviews, additional access points and service adjustments as your needs change.",
  },
] as const;

export const FAQS = [
  {
    q: "Which areas does HiveNet serve?",
    a: "HiveNet's service availability varies by location. Submit a coverage enquiry with your county, town and estate, and we will confirm what is possible at your location.",
  },
  {
    q: "Does HiveNet provide routers and access points?",
    a: "Yes. HiveNet supplies and manages the routers, access points and other networking equipment required for its services. The exact equipment depends on your premises and service design.",
  },
  {
    q: "Do you install and configure the equipment?",
    a: "Yes. Professional installation and configuration are part of how HiveNet delivers its service. Our technicians set up the equipment and Wi-Fi coverage at your premises.",
  },
  {
    q: "Can HiveNet connect an entire plot or apartment building?",
    a: "Yes — this is one of our core offerings. We plan coverage across the units and buildings, place routers and access points strategically, and agree clear access arrangements for tenants.",
  },
  {
    q: "Do you provide internet for offices and businesses?",
    a: "Yes. We assess the size of the premises, the number of users and how the business works, then propose a connectivity and equipment arrangement to match.",
  },
  {
    q: "Can a school or hospital request a connectivity assessment?",
    a: "Yes. Institutions can request an assessment covering the buildings or blocks, estimated users and coverage needs. We then propose a suitable service arrangement.",
  },
  {
    q: "How is the service priced?",
    a: "HiveNet's prepaid Wi-Fi packages have fixed prices shown on the Plans page. Dedicated home, property, business and institutional arrangements are quoted individually, because pricing depends on availability, coverage needs and equipment.",
  },
  {
    q: "How do I request installation?",
    a: "Submit an enquiry through the Get Connected form or the relevant solution page. We will confirm availability, discuss your requirements and provide a proposal before any installation is scheduled.",
  },
  {
    q: "What happens if I experience a connectivity problem?",
    a: "Contact HiveNet support and we will work to resolve the issue. Equipment supplied and managed by HiveNet is supported by our team as part of the service arrangement.",
  },
  {
    q: "How can I contact HiveNet?",
    a: "Use the enquiry form on the Contact page, call us, or email us. Our contact details are listed on the Contact page.",
  },
] as const;

export const ENQUIRY_CATEGORY_LABELS: Record<string, string> = {
  general: "General contact",
  home: "Home internet",
  property: "Residential property or plot",
  business: "Office or business",
  school: "School or educational institution",
  healthcare: "Hospital or healthcare facility",
  installation: "Installation and networking equipment",
  coverage: "Coverage and availability check",
};

export const ENQUIRY_STATUS_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  assessment_required: "Assessment required",
  quotation_sent: "Quotation sent",
  converted: "Converted",
  closed: "Closed",
};

export const KENYAN_COUNTIES = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu",
  "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho",
  "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale",
  "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit",
  "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi", "Nakuru", "Nandi",
  "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita-Taveta",
  "Tana River", "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir",
  "West Pokot",
] as const;

export function propertyTypeOptions(category: string) {
  switch (category) {
    case "home":
      return ["Single-family house", "Apartment / flat", "Bedsitter / studio", "Other"];
    case "property":
      return ["Rental plot with several units", "Apartment building", "Hostel / student accommodation", "Gated community", "Other multi-unit property"];
    case "business":
      return ["Office", "Shop / retail", "Restaurant / cafe", "Hotel / guest house", "Other business premises"];
    case "school":
      return ["Primary school", "Secondary school", "College / TVET", "University", "Other educational institution"];
    case "healthcare":
      return ["Hospital", "Health centre / clinic", "Dispensary", "Laboratory", "Other healthcare facility"];
    case "coverage":
      return ["House / home", "Rental plot / apartments", "Business premises", "School / institution", "Healthcare facility", "Other"];
    default:
      return ["House / home", "Business premises", "School / institution", "Healthcare facility", "Other"];
  }
}

export const footerLinks = {
  solutions: SOLUTIONS.map((s) => ({ name: s.name, to: `/solutions/${s.slug}` })),
  industries: INDUSTRIES.slice(0, 6).map((i) => ({ name: i.name, to: i.to })),
  company: [
    { name: "About HiveNet", to: "/about" },
    { name: "How It Works", to: "/how-it-works" },
    { name: "Plans and Pricing", to: "/plans" },
    { name: "Frequently Asked Questions", to: "/faq" },
    { name: "Contact HiveNet", to: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", to: "/privacy" },
    { name: "Terms of Service", to: "/terms" },
  ],
};

export function copyrightNotice() {
  return `© ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.`;
}
