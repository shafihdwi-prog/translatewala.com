export type PackageCategory = "websites" | "social";
export type DigitalPackage = {
  id: string;
  name: string;
  category: PackageCategory;
  label: string;
  description: string;
  price: number | null;
  featured?: boolean;
  badge?: string;
  bestFor: string;
  features: string[];
  note: string;
};

export const websitePackages: DigitalPackage[] = [
  {
    id: "basic-website", name: "Basic Website", category: "websites", label: "A CONFIDENT FIRST STEP", price: 7999,
    description: "A focused, professional website that introduces your business and makes it easy to get in touch.",
    bestFor: "Independent professionals, new businesses and straightforward service websites.",
    features: ["Up to 4 carefully structured pages", "Responsive website design", "Domain & hosting included*", "Direct WhatsApp enquiry button", "Contact form and social links", "Google Maps integration", "Basic on-page SEO setup"],
    note: "A clear foundation for a straightforward business presence.",
  },
  {
    id: "business-website", name: "Business Website", category: "websites", label: "ROOM TO TELL YOUR STORY", price: 14999, featured: true, badge: "OUR RECOMMENDED START",
    description: "More space for your services, a more distinctive design and a considered customer enquiry journey.",
    bestFor: "Service businesses, growing companies and brands with multiple offerings.",
    features: ["Up to 6 business-focused pages", "Premium custom visual design", "Mobile & tablet responsive layouts", "Domain & hosting included*", "WhatsApp & enquiry integration", "Maps and social media integration", "Basic SEO and speed optimization"],
    note: "A balanced starting point for a stronger business website.",
  },
  {
    id: "professional-website", name: "Professional Website", category: "websites", label: "A MORE COMPLETE PRESENCE", price: 24999,
    description: "A richer website for established organizations that need detailed content and a deliberate conversion journey.",
    bestFor: "Established businesses, corporate profiles and content-rich service brands.",
    features: ["Up to 10 professionally designed pages", "Premium UI/UX and tailored layouts", "Domain & hosting included*", "Lead-generation content sections", "WhatsApp & enquiry integration", "SEO-friendly page architecture", "Analytics & Search Console setup", "Speed optimization"],
    note: "Analytics is configured only with the agreed access and privacy settings.",
  },
  {
    id: "ecommerce-website", name: "E-commerce & Custom", category: "websites", label: "BUILT AROUND YOUR OPERATIONS", price: 39999,
    description: "For product-based businesses and projects that need more than a standard company website.",
    bestFor: "Online shops, product catalogues and businesses with custom requirements.",
    features: ["WooCommerce shop when that platform fits", "Product catalogue, cart and checkout", "Payment gateway integration*", "Domain & hosting included*", "Admin access for products", "WhatsApp integration", "SEO setup", "Custom features only if written into the quote"],
    note: "WooCommerce is one option, not automatic. Gateway charges and plugins are extra.",
  },
];

export const socialPackages: DigitalPackage[] = [
  {
    id: "basic-presence", name: "Basic Presence", category: "social", label: "ORGANIC CONTENT & PRESENCE", price: 1999,
    description: "An organized starting point for showing up regularly with branded, professionally prepared content.",
    bestFor: "New brands and small businesses building a consistent social presence.",
    features: ["2 agreed social media platforms", "5–7 posts per month", "1 reel per month", "Professional design and copy", "Content planning", "Basic page optimization", "Brand-consistent visual direction"],
    note: "Organic content management. Paid campaign work and ad spend are separate.",
  },
  {
    id: "social-growth", name: "Social Media Growth", category: "social", label: "CONTENT + ACCOUNT MANAGEMENT", price: 4999, featured: true, badge: "FOR A CONSISTENT BRAND",
    description: "A more complete content rhythm with reels, story graphics and ongoing account coordination.",
    bestFor: "Service brands, shops and institutions ready for a fuller content plan.",
    features: ["Facebook & Instagram management", "5–7 posts per month", "2–3 reels per month", "Story graphics & highlight covers", "Captions, hashtags and reel ideas", "Content planning and scheduling", "Engagement support", "Monthly analytics reporting"],
    note: "Organic management with a defined approval process. Advertising is quoted separately.",
  },
  {
    id: "lead-generation", name: "Lead Generation", category: "social", label: "PAID CAMPAIGN MANAGEMENT", price: 9999,
    description: "A separately scoped advertising service for businesses ready to test a focused enquiry campaign.",
    bestFor: "Businesses with a clear offer, a response process and a separate advertising budget.",
    features: ["Facebook & Instagram ad campaigns", "Campaign setup and audience targeting", "4 advertisement creatives per month", "Lead form & WhatsApp campaigns", "Campaign monitoring", "Agreed optimization activities", "Lead tracking & monthly reporting", "Social media support"],
    note: "Management fee only. Ad spend is separate; enquiry volume and sales are not guaranteed.",
  },
  {
    id: "enterprise-growth", name: "Enterprise Growth", category: "social", label: "A CUSTOM DIGITAL ENGAGEMENT", price: null,
    description: "A coordinated scope for brands that need multiple platforms, deeper reporting and campaign support.",
    bestFor: "Organizations with broader content, advertising and digital coordination needs.",
    features: ["Multi-platform management", "Meta & Google Ads coordination", "Creative production plan", "Audience testing & retargeting", "Landing-page or microsite support", "Conversion tracking & reporting", "Agreed optimization schedule", "A proposal tailored to your goals"],
    note: "Deliverables, account access, advertising budget and third-party tools are agreed in writing.",
  },
];

export function formatPackagePrice(plan: DigitalPackage) {
  return plan.price === null ? "Custom proposal" : `INR ${plan.price.toLocaleString("en-IN")} ${plan.category === "social" ? "/ month" : "starting"}`;
}

export const comparisonRows: Record<PackageCategory, { label: string; values: string[] }[]> = {
  websites: [
    { label: "Website scale", values: ["Up to 4 pages", "Up to 6 pages", "Up to 10 pages", "Custom scope"] },
    { label: "Design approach", values: ["Responsive business design", "Premium custom design", "Premium UI/UX", "Store / custom experience"] },
    { label: "Domain & hosting", values: ["Included*", "Included*", "Included*", "Included*"] },
    { label: "WhatsApp connection", values: ["Included", "Included", "Included", "Included"] },
    { label: "Search foundations", values: ["Basic SEO", "Basic SEO + speed", "SEO structure + speed", "SEO setup"] },
    { label: "Analytics setup", values: ["Discuss requirements", "Discuss requirements", "Included", "Included"] },
    { label: "Arabic / multilingual content", values: ["Separate scope", "Separate scope", "Separate scope", "Separate scope"] },
    { label: "Maintenance & renewals", values: ["Agreed separately", "Agreed separately", "Agreed separately", "Agreed separately"] },
  ],
  social: [
    { label: "Main focus", values: ["Organic presence", "Organic content & management", "Paid enquiries campaign", "Custom multi-platform scope"] },
    { label: "Platforms", values: ["2 agreed platforms", "Facebook & Instagram", "Facebook & Instagram ads", "Agreed platform mix"] },
    { label: "Monthly post / creative plan", values: ["5–7 posts", "5–7 posts", "4 ad creatives", "Defined in proposal"] },
    { label: "Reels", values: ["1 per month", "2–3 per month", "Discuss requirements", "Defined in proposal"] },
    { label: "Reporting", values: ["Agree requirements", "Monthly analytics", "Monthly tracking report", "Agreed reporting plan"] },
    { label: "Paid campaign management", values: ["Separate scope", "Separate scope", "Included in agreed scope", "Included in agreed scope"] },
    { label: "Advertising spend", values: ["Not included", "Not included", "Not included", "Not included"] },
    { label: "Multilingual content", values: ["Confirm language scope", "Confirm language scope", "Confirm language scope", "Confirm language scope"] },
  ],
};

export const packageFAQs = [
  { question: "Are these prices in Indian rupees or a Gulf currency?", answer: "All displayed prices are in Indian rupees (INR), based on TranslateWala’s published India service packages. They are starting points, not automatic international offers. Your final scope, billing currency, applicable taxes and any additional costs are confirmed in a written proposal." },
  { question: "Can you help me choose a package on WhatsApp?", answer: "Yes. Use any package’s WhatsApp button and the selected package details will be added to a draft message. Tell us about your business, market and priorities. You decide when to send the message in WhatsApp; choosing a package does not place an order or take a payment." },
  { question: "What does domain and hosting included mean?", answer: "The published website packages include domain and hosting. The exact domain, extension, availability, hosting allocation, initial term, ownership arrangements and renewal costs must be confirmed before the project starts. Premium domains and extra infrastructure are not assumed to be covered." },
  { question: "Are Arabic, English and Indian-language versions included?", answer: "Language requirements are scoped separately. Tell us which languages and audiences you need, and whether the project includes translation, Arabic right-to-left design or multilingual social captions. We confirm language availability, content volume, review responsibilities and pricing in the proposal." },
  { question: "Does a social media package include advertising spend?", answer: "No. Organic content management, paid campaign management and the platform’s advertising spend are different costs. The Lead Generation and Enterprise options describe management activities, not a prepaid advertising budget. No reach, leads, revenue or return is guaranteed." },
  { question: "What if I need something outside the listed packages?", answer: "A custom scope is available to discuss. Share the pages, features, platforms, languages and ongoing support you need. Premium themes, plugins, production, integrations, payment-provider charges and maintenance are confirmed individually rather than assumed to be included." },
];
