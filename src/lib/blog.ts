export type BlogPost = {
  slug: string; title: string; description: string; date: string; readTime: string;
  category: string; image: string; author: string; content: { heading?: string; paragraphs: string[]; list?: string[] }[];
};
export const blogPosts: BlogPost[] = [
  {
    slug: "indian-languages-gcc-business-growth",
    title: "Why Indian Languages Are a Growth Lever for GCC Businesses",
    description: "From Malayalam-speaking teams in Dubai to Tamil-speaking customers in Saudi Arabia, discover how regional Indian languages unlock trust and efficiency in the Gulf.",
    date: "14 June 2026",
    readTime: "8 min read",
    category: "Translation Strategy",
    image: "/images/dubai-skyline.webp",
    author: "TranslateWala Team",
    content: [
      {
        heading: "The language advantage GCC businesses cannot ignore",
        paragraphs: [
          "GCC economies run on relationships. Whether you operate in Dubai, Riyadh, Doha, Kuwait City, Muscat or Manama, your customers, employees and partners often communicate in more than one language. For businesses that serve or employ Indian communities, regional Indian languages such as Malayalam, Tamil, Hindi, Telugu, Kannada, Bengali, Urdu and Punjabi are not niche considerations — they are everyday business tools.",
        ],
      },
      {
        heading: "Where Indian languages matter most in the Gulf",
        paragraphs: [
          "Workplaces across hospitality, construction, healthcare, retail and logistics employ large numbers of Indian-language speakers. Onboarding documents, safety manuals, payslips and workplace policies become far more effective when employees can read them in their first language.",
        ],
        list: [
          "Malayalam and Tamil for teams from Kerala and Tamil Nadu",
          "Hindi and Urdu for broader North Indian communication",
          "Telugu, Kannada, Bengali and Punjabi for specific regional communities",
        ],
      },
      {
        heading: "Arabic, English and Indian languages working together",
        paragraphs: [
          "A strong GCC language strategy does not choose between Arabic, English and Indian languages. It coordinates them. Customer-facing signage may use Arabic and English, while internal briefings and employee support use Malayalam, Tamil or Hindi. Website content, social captions and help articles benefit from the same layered approach.",
          "The practical test is simple: can the reader finish the task without calling someone to explain the form? If a payslip, a safety notice or a service page still needs a verbal translation, the written version has not done its job.",
        ],
      },
      {
        heading: "What a useful first conversation covers",
        paragraphs: [
          "Tell us who reads the text, which country it will be used in, and whether the tone should be formal or everyday. A recruitment notice for a site team and a brochure for families do not need the same register, even when both are in Malayalam or Tamil.",
          "If you already have approved spellings for names, job titles or product names, share them at the start. That small list prevents the most common correction round.",
        ],
      },
      {
        heading: "Start with a clear brief, not assumptions",
        paragraphs: [
          "Before translating, we recommend confirming the audience, country of use, preferred script and receiving organization’s requirements. Not every language combination is available for every subject, and official submissions may need separate verification. A short conversation helps us scope the right language pair and timeline.",
        ],
      },
    ],
  },
  {
    slug: "multilingual-website-arabic-english-indian-languages",
    title: "Building Multilingual Websites for UAE and Saudi Audiences",
    description: "Arabic right-to-left layouts, Indian script support and English navigation — plan a website that speaks to every customer without compromising design.",
    date: "28 May 2026",
    readTime: "7 min read",
    category: "Website Design",
    image: "/images/digital-studio.webp",
    author: "TranslateWala Team",
    content: [
      {
        heading: "Design for more than one direction",
        paragraphs: [
          "Arabic is read right to left, while English and most Indian languages read left to right. A multilingual website needs more than translated text — it needs direction-aware navigation, mirrored alignment, mixed-direction numbers and script-aware typography.",
        ],
      },
      {
        heading: "Planning content before translation",
        paragraphs: [
          "Indian scripts such as Devanagari, Malayalam, Tamil, Telugu, Kannada, Bengali, Gurmukhi and Arabic script can need different line heights and spacing. Allocating space early prevents cramped buttons, broken layouts and last-minute redesigns.",
        ],
        list: [
          "Use logical CSS properties instead of hard-coded left/right values",
          "Load fonts that support each target script",
          "Test on mobile screens where space is tightest",
          "Agree terminology with a reviewer before publishing",
        ],
      },
      {
        heading: "Search visibility across languages",
        paragraphs: [
          "Separate, crawlable URLs for each language version help search engines show the right page to the right audience. Hreflang annotations connect equivalent Arabic, English and Indian-language pages so visitors are not sent to the wrong version.",
          "A language switcher should be a word, not only a flag. Visitors in Dubai may prefer English, Arabic or an Indian language for different tasks on the same day. Let them choose, and keep phone numbers and prices readable in both directions.",
        ],
      },
      {
        heading: "What to decide before design starts",
        paragraphs: [
          "List the pages, the languages and who approves each language. Translation, Arabic layout and English copy are related, but they are not the same line item. A four-page company site and a WooCommerce catalogue need different space for headings, filters and buttons.",
          "Also decide what stays in English: brand names, software labels and some technical terms. Forcing every word into another script can make a page harder to use, not easier.",
        ],
      },
    ],
  },
  {
    slug: "social-media-content-arabic-english-gcc",
    title: "Organic Social Media Content for GCC Brands",
    description: "Consistent posting, bilingual captions and community coordination — a practical guide to organic social media management in the Gulf.",
    date: "10 May 2026",
    readTime: "6 min read",
    category: "Social Media",
    image: "/images/digital-studio.webp",
    author: "TranslateWala Team",
    content: [
      {
        heading: "Start with the audience, not the algorithm",
        paragraphs: [
          "A content calendar works when it reflects what your customers actually care about. For GCC-focused brands, that often means a mix of service information, cultural awareness, practical tips and brand storytelling — in Arabic, English or Indian languages where relevant.",
        ],
      },
      {
        heading: "Organic management versus paid advertising",
        paragraphs: [
          "Organic social media management covers planning, design, publishing and community engagement. Paid advertising is a separate service with its own budget, targeting and reporting. Mixing the two without clear boundaries can lead to unclear expectations and wasted spend.",
        ],
      },
      {
        heading: "Approval and consistency",
        paragraphs: [
          "Agree on who approves content, how feedback is consolidated and how quickly comments and messages are answered. A recognizable visual voice matters more than posting every day.",
          "A useful month usually has a theme, a small set of designs and one person who can say yes. If five people edit the same caption, the post loses the voice you were trying to build.",
        ],
      },
      {
        heading: "Language on social is not a copy-paste",
        paragraphs: [
          "An Arabic caption and an English caption can share a picture and still need different sentence length. Indian-language captions should be requested only for the audience you actually want to reach, and the language pair should be confirmed before the calendar is locked.",
          "TranslateWala’s organic plans cover agreed posts, design and publishing. Advertising spend, if you need it, is a separate budget and a separate conversation. Reach and enquiries are not guaranteed by a monthly fee.",
        ],
      },
    ],
  },
  {
    slug: "translation-brief-checklist-gcc-projects",
    title: "How to Prepare a Translation Brief for GCC Projects",
    description: "A good brief saves time and cost. Learn what to include before requesting Malayalam, Tamil, Hindi, Arabic or English translation for your UAE, Saudi or Qatar project.",
    date: "22 April 2026",
    readTime: "6 min read",
    category: "Translation Tips",
    image: "/images/dubai-skyline.webp",
    author: "TranslateWala Team",
    content: [
      {
        heading: "Start with the reader",
        paragraphs: [
          "Who will read the translation? A workplace safety notice for employees needs a different tone from a customer-facing service page or a personal document for a government authority.",
        ],
      },
      {
        heading: "Include practical details",
        paragraphs: [
          "Source and target languages, approximate word count, file format, preferred deadline and the country where the content will be used. If you have approved terminology or brand glossaries, share them early.",
        ],
        list: [
          "Source language and target language",
          "Intended audience and country of use",
          "Approximate content length",
          "Preferred file format",
          "Deadline preference",
        ],
      },
      {
        heading: "What not to send initially",
        paragraphs: [
          "Please do not include identity numbers, medical records, payment details or other sensitive personal information in the first message. We will agree on a secure way to share documents once the project scope is confirmed.",
          "A short description is enough to start: document type, languages, country and whether a person or a company will read it. Files can follow once the handover method is agreed.",
        ],
      },
      {
        heading: "One project, one reviewer",
        paragraphs: [
          "If several people will comment, name one person who sends the final notes. Mixed feedback on names and dates is the fastest way to delay a certificate or a contract.",
          "Also say whether the translation is for information or for a submission. Those are different jobs. A page that explains a service does not need the same checks as a paper an authority will file.",
        ],
      },
    ],
  },
  {
    slug: "medical-certificate-translation-gcc",
    title: "Medical and Certificate Translation for Families in the GCC",
    description: "What to prepare before asking for a birth, marriage, education or medical-document translation used in the Gulf.",
    date: "2 July 2026",
    readTime: "7 min read",
    category: "Documents",
    image: "/images/dubai-skyline.webp",
    author: "TranslateWala Team",
    content: [
      { heading: "Start with the receiving office", paragraphs: ["A hospital letter, a school and a visa desk do not ask for the same format. Tell us the country and the office that will read the translation before sending personal papers."] },
      { heading: "What we can translate", paragraphs: ["TranslateWala handles medical reports, prescriptions, discharge summaries, and birth, death, marriage and education certificates. Names, dates and numbers need a careful check against the source.", "A readable scan matters more than a rushed photo. Stamps, handwritten notes and second pages are often the lines an office looks at first."], list: ["Share a clear scan only after the scope is agreed", "Keep identity numbers out of the first WhatsApp message", "Ask whether the office needs a particular format"] },
      { heading: "Families moving between India and the Gulf", paragraphs: ["The same certificate may be needed for a school, an employer and a visa file. Tell us each use if you know it. One translation is not automatically accepted everywhere, and we will not pretend that it is.", "If several family documents are travelling together, list them in one message. That makes the language pair, the names and the deadline easier to confirm in a single quote."] },
    ],
  },
  {
    slug: "visa-frro-document-support",
    title: "Visa, FRRO and Exit-Permit Papers: What to Ask First",
    description: "A practical checklist for translation and document support. This is coordination help, not immigration advice.",
    date: "18 June 2026",
    readTime: "6 min read",
    category: "Support",
    image: "/images/digital-studio.webp",
    author: "TranslateWala Team",
    content: [
      { heading: "Support is not a guarantee of approval", paragraphs: ["TranslateWala can help prepare translations and explain common document steps for visa, FRRO registration and GCC exit-permit files. The authority decides what it accepts."] },
      { heading: "Bring the instructions with the file", paragraphs: ["If the embassy, FRRO or employer published a checklist, send that with your enquiry. It is more useful than a general request for a fast translation.", "Common requests include visa papers, registration forms and GCC exit-permit documents. We can help with translation and with explaining the usual document steps. We cannot promise that an authority will accept a file."] },
      { heading: "A calm brief is faster than an urgent one", paragraphs: ["Write the country, the office and the deadline you hope for. If a date is fixed by a flight or a joining day, say so. We will tell you whether that date is realistic after seeing the pages, not before.", "Do not send passport numbers or full identity details in the first chat. Describe the document. The secure handover comes after the scope is clear."] },
    ],
  },
  {
    slug: "website-package-prices-explained",
    title: "How to Read TranslateWala Website Prices",
    description: "₹7,999, ₹14,999, ₹24,999 and ₹39,999 are starting prices in Indian rupees. Here is what that means before you pay.",
    date: "9 June 2026",
    readTime: "6 min read",
    category: "Pricing",
    image: "/images/digital-studio.webp",
    author: "TranslateWala Team",
    content: [
      { heading: "The number is a starting point", paragraphs: ["Basic starts at ₹7,999, Business at ₹14,999, Professional at ₹24,999, and E-commerce & Custom from ₹39,999. These are one-project starting prices in INR, not monthly retainers."] },
      { heading: "What can change the bill", paragraphs: ["Extra languages, Arabic right-to-left design, premium plugins, payment-gateway charges and ongoing maintenance are quoted separately. Domain and hosting terms are confirmed in writing before work starts.", "A WooCommerce shop is not the same job as a four-page company site. Product count, payment setup and admin training can move the quote. We name those extras before you agree, rather than discovering them after design."] },
      { heading: "How to choose without overbuying", paragraphs: ["Start from the pages a visitor actually needs: what you do, how to contact you, and the next step. Add a shop, a blog or a second language only when that page has a job. A smaller site that is finished is more useful than a large site waiting for copy.", "Prices on this website are Indian-rupee starting points from TranslateWala’s published packages. International billing, tax and renewals are confirmed in the proposal."] },
    ],
  },
  {
    slug: "social-media-fees-and-ad-spend",
    title: "Social Media Fees and Advertising Spend Are Not the Same",
    description: "₹1,999 and ₹4,999 cover organic management. ₹9,999 covers campaign management. The platform’s ad budget is still extra.",
    date: "1 June 2026",
    readTime: "6 min read",
    category: "Pricing",
    image: "/images/dubai-skyline.webp",
    author: "TranslateWala Team",
    content: [
      { heading: "Read the monthly fee first", paragraphs: ["Basic Presence starts at ₹1,999 per month. Social Media Growth starts at ₹4,999 per month. Lead Generation starts at ₹9,999 per month for agreed campaign management. Enterprise is quoted after a brief."] },
      { heading: "Ad spend stays separate", paragraphs: ["None of these fees is a prepaid advertising budget. Meta or Google charges are billed by the platform. We do not promise a number of leads or sales.", "If you only need a steady presence, the organic plans are the right place to start. If you want enquiry campaigns, say so. Mixing the two in one sentence is how budgets get unclear."] },
      { heading: "What a monthly plan should name", paragraphs: ["Platforms, post count, reel count, who approves captions and what the monthly note will report. Languages should be listed too. An Arabic caption and an English caption are not free copies of each other.", "Enterprise work is quoted after a brief because the platform mix, creative volume and reporting can differ a lot between a shop and an institute. A custom price is more honest than a number that hides the work."] },
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
export function getPosts() {
  return blogPosts;
}
