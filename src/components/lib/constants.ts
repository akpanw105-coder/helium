export const BRAND = {
  name: "HELIUM",
  tagline: "Premium Pharmacy. Exceptional Care.",
  whatsappNumber: "+2348004354867", // Official WhatsApp line
  phone: "+234 1 234 5678",
  email: "care@heliumpharmacy.ng",
  address: "Plot 14 Victoria Island, Lagos, Nigeria",
  hours: "Monday – Saturday: 8:00 AM – 9:00 PM | Sunday: 10:00 AM – 6:00 PM",
  instagram: "https://instagram.com/heliumpharmacy",
  twitter: "https://x.com/heliumpharmacy",
  facebook: "https://facebook.com/heliumpharmacy",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Products", href: "/#products" },
  { label: "Why Us", href: "/#why-helium" },
  { label: "Contact", href: "/#contact" },
];

export const SERVICES = [
  {
    id: "prescription",
    title: "Prescription Dispensing",
    icon: "rx",
    shortDesc:
      "Accurate, timely dispensing of doctor-issued prescriptions by our licensed pharmacists.",
    longDesc:
      "Our licensed pharmacists carefully review every prescription for accuracy, potential drug-drug interactions, and appropriate clinical dosing. We coordinate with your healthcare provider when necessary to ensure you receive verified, authentic medications. We take the time to counsel you on dosing schedules, administration guidelines, and proper storage conditions. Patient safety and clinical efficacy are the foundation of our dispensing service.",
    whatToExpect: [
      "Verification and clinical review by a licensed pharmacist",
      "Clear labelling and administration instructions",
      "Comprehensive drug interaction screening",
      "In-depth patient counselling on usage and potential side effects",
    ],
  },
  {
    id: "otc",
    title: "OTC Medicines Advice",
    icon: "pill",
    shortDesc:
      "Professional guidance on over-the-counter medications for common health needs.",
    longDesc:
      "Not every minor ailment requires an immediate clinic visit. Our pharmacists provide expert, clinical advice on over-the-counter medications for headaches, allergies, colds, coughs, gastrointestinal issues, and pain management. We help you choose the most effective, authentic medicine for your situation, specify the exact regimen, and clearly inform you when symptoms warrant medical attention.",
    whatToExpect: [
      "One-on-one consultation with a qualified pharmacist",
      "Targeted and appropriate medicine selection",
      "Dosage schedules adapted to age and medical history",
      "Prompt physician referral advice when required",
    ],
  },
  {
    id: "consultations",
    title: "Health Consultations",
    icon: "consult",
    shortDesc:
      "Private, confidential consultations on medication regimens and chronic disease care.",
    longDesc:
      "HELIUM offers private pharmacist-led health consultations in a comfortable, confidential setting. Whether you have questions regarding complex multi-drug regimens, hypertension or diabetes maintenance, or lifestyle wellness routines, our clinical team delivers evidence-based guidance. We listen carefully and support you in taking control of your health with confidence.",
    whatToExpect: [
      "Dedicated confidential consultation space",
      "Evidence-based medication reviews",
      "Chronic condition medication adherence support",
      "Practical wellness and preventative health recommendations",
    ],
  },
  {
    id: "wellness",
    title: "Wellness & Lifestyle Products",
    icon: "wellness",
    shortDesc:
      "Curated nutritional supplements, vitamins, and health monitoring equipment.",
    longDesc:
      "In addition to essential pharmaceuticals, HELIUM provides an authenticated selection of nutritional supplements, vitamins, dermatological skincare, and diagnostic devices (blood glucose monitors, digital blood pressure cuffs, nebulizers). Every item is verified for quality and stored according to manufacturer standards.",
    whatToExpect: [
      "100% verified, authentic wellness brands",
      "Certified vitamins, minerals, and dietary supplements",
      "Clinical home diagnostic and monitoring devices",
      "Pharmacist guidance on safe supplement combinations",
    ],
  },
  {
    id: "baby",
    title: "Baby & Maternal Health",
    icon: "baby",
    shortDesc:
      "Specialised care, supplements, and essentials for mothers, infants, and toddlers.",
    longDesc:
      "Maternal and child wellness demand the highest level of care. Our mother and child section includes verified prenatal and postnatal vitamins, infant nutrition, gentle dermatological products, and paediatric medications. Our pharmacists offer compassionate advice on pediatric dosing, hydration, and postpartum wellness.",
    whatToExpect: [
      "Authentic prenatal, pregnancy, and postnatal nutrition",
      "Pediatric dosing verification and counselling",
      "Hypoallergenic baby care and feeding essentials",
      "Compassionate, family-centred care",
    ],
  },
  {
    id: "chronic",
    title: "Chronic Disease Support",
    icon: "chronic",
    shortDesc:
      "Reliable ongoing medication supply, refill alerts, and condition counselling.",
    longDesc:
      "Managing chronic conditions like hypertension, diabetes, and asthma requires uninterrupted access to authentic medication and reliable pharmacist oversight. HELIUM works as your dedicated healthcare partner, providing consistent supply, medication refill tracking, and routine blood pressure or sugar checks to keep you in control of your health.",
    whatToExpect: [
      "Uninterrupted supply of authentic chronic medications",
      "Scheduled prescription refills and reminders",
      "Pharmacist monitoring of adherence and treatment goals",
      "Ongoing collaboration with your healthcare physicians",
    ],
  },
];

export const PRODUCT_CATEGORIES = [
  {
    id: "prescription",
    name: "Prescription Medicines",
    descriptor: "Dispensed accurately by licensed pharmacists",
    accent: "var(--helium-blue)",
    desc: "Comprehensive pharmaceutical inventory covering cardiovascular, antibiotic, endocrine, respiratory, and neurological treatments — all 100% verified authentic.",
  },
  {
    id: "otc",
    name: "Over-the-Counter Remedies",
    descriptor: "Trusted solutions for everyday symptoms",
    accent: "var(--helium-cyan)",
    desc: "Quality pain relievers, fever medications, allergy treatments, cold remedies, and digestive aids vetted by certified pharmacists.",
  },
  {
    id: "vitamins",
    name: "Vitamins & Supplements",
    descriptor: "Targeted nutritional support for every age",
    accent: "var(--helium-violet)",
    desc: "Curated vitamins, multivitamins, minerals, omega oils, and antioxidants to fortify immunity, bone density, energy, and overall vitality.",
  },
  {
    id: "personal-care",
    name: "Dermatology & Personal Care",
    descriptor: "Clinical skincare suited for the Nigerian climate",
    accent: "var(--helium-blue-light)",
    desc: "Gentle cleansers, therapeutic moisturisers, high-protection sunscreens, and personal hygiene products from internationally trusted clinical brands.",
  },
  {
    id: "baby",
    name: "Baby & Maternal Care",
    descriptor: "Gentle protection for mothers and infants",
    accent: "var(--helium-cyan-light)",
    desc: "Pediatric-approved formulas, nursing essentials, gentle baby creams, and prenatal vitamins supporting healthy motherhood from conception to early years.",
  },
  {
    id: "health-wellness",
    name: "Diagnostic & Home Care Devices",
    descriptor: "Vital tools to monitor your health at home",
    accent: "var(--helium-amber)",
    desc: "Clinically validated digital blood pressure monitors, blood glucose meters, pulse oximeters, and first-aid kits for proactive family wellness.",
  },
];

export const WHY_HELIUM = [
  {
    id: "authenticity",
    title: "100% Authenticity Guaranteed",
    description:
      "We source directly from licensed pharmaceutical manufacturers and vetted Tier-1 distributors. Counterfeit medications are strictly eliminated from our supply chain.",
    icon: "shield",
  },
  {
    id: "experts",
    title: "Qualified Clinical Pharmacists",
    description:
      "Our pharmacy is staffed by registered pharmacists who guide your treatment, verify dosages, and screen for interactions with clinical precision.",
    icon: "graduate",
  },
  {
    id: "discreet",
    title: "Confidential Healthcare Environment",
    description:
      "Your medical history and prescriptions are handled with professional discretion and respect, both in-store and across our digital consultation channels.",
    icon: "lock",
  },
  {
    id: "customer-first",
    title: "Dedicated Patient-Centred Service",
    description:
      "From emergency medication enquiries on WhatsApp to ongoing prescription refills, our patient care team is dedicated to your continuous wellbeing.",
    icon: "heart",
  },
];

export const BRAND_VALUES = [
  {
    title: "Integrity",
    description:
      "Uncompromising transparency in medicine sourcing, fair pricing, and trustworthy health advice for all patients.",
    icon: "star",
  },
  {
    title: "Clinical Excellence",
    description:
      "Continuous adherence to modern pharmaceutical standards, safe dispensing, and rigorous cold-chain management.",
    icon: "medal",
  },
  {
    title: "Compassion",
    description:
      "Treating every patient with dignity, patience, and empathetic care during critical healthcare moments.",
    icon: "hands",
  },
  {
    title: "Community Wellness",
    description:
      "Committed to improving healthcare literacy and access to authentic medication across Nigerian communities.",
    icon: "globe",
  },
];
