// Transform DB flat shape (titleFr, titleEn, titleEs) → nested shape (title: { fr, en, es })
// This allows pages to use the same data structure whether from static import or API.

import type { Program, Formation, Product, Article } from "@/lib/data";

type DBProgram = {
  id: string; slug: string; icon: string; color: string; gradient: string;
  image: string; gallery: string;
  titleFr: string; titleEn: string; titleEs: string;
  shortFr: string; shortEn: string; shortEs: string;
  descFr: string; descEn: string; descEs: string;
  objectives: string; target: string; results: string; duration: string | null;
  createdAt: Date; updatedAt: Date;
};

type DBFormation = {
  id: string; slug: string; icon: string; image: string;
  categoryFr: string; categoryEn: string; categoryEs: string;
  titleFr: string; titleEn: string; titleEs: string;
  descFr: string; descEn: string; descEs: string;
  durationFr: string; durationEn: string; durationEs: string;
  level: string; mode: string; price: number; rating: number; students: number;
  program: string; certificate: boolean; popular: boolean;
  createdAt: Date; updatedAt: Date;
};

type DBProduct = {
  id: string; slug: string; category: string; name: string; brand: string;
  price: number; oldPrice: number | null; rating: number; reviews: number;
  inStock: boolean; stockQty: number; warranty: string;
  featured: boolean; badge: string | null;
  image: string; gallery: string;
  descFr: string; descEn: string; descEs: string;
  specs: string;
  createdAt: Date; updatedAt: Date;
};

type DBEvent = {
  id: string; slug: string; type: string; image: string;
  titleFr: string; titleEn: string; titleEs: string;
  date: Date; time: string;
  locationFr: string; locationEn: string; locationEs: string;
  mode: string; price: number; seats: number; registered: number;
  descFr: string; descEn: string; descEs: string;
  organizerId: string | null;
  createdAt: Date; updatedAt: Date;
};

type DBArticle = {
  id: string; slug: string;
  categoryFr: string; categoryEn: string; categoryEs: string;
  titleFr: string; titleEn: string; titleEs: string;
  excerptFr: string; excerptEn: string; excerptEs: string;
  contentFr: string; contentEn: string; contentEs: string;
  date: Date; readTime: number;
  authorId: string | null; authorName: string;
  authorRoleFr: string; authorRoleEn: string; authorRoleEs: string;
  tag: string; image: string; published: boolean;
  createdAt: Date; updatedAt: Date;
};

export function transformProgram(p: DBProgram): any {
  return {
    id: p.slug,
    icon: p.icon,
    color: p.color,
    gradient: p.gradient,
    image: p.image,
    gallery: safeJsonArray(p.gallery),
    title: { fr: p.titleFr, en: p.titleEn, es: p.titleEs },
    short: { fr: p.shortFr, en: p.shortEn, es: p.shortEs },
    description: { fr: p.descFr, en: p.descEn, es: p.descEs },
    objectives: { fr: safeJsonArray(p.objectives), en: safeJsonArray(p.objectives), es: safeJsonArray(p.objectives) },
    target: { fr: p.target, en: p.target, es: p.target },
    results: { fr: safeJsonArray(p.results), en: safeJsonArray(p.results), es: safeJsonArray(p.results) },
  };
}

export function transformFormation(f: DBFormation): any {
  return {
    id: f.slug,
    icon: f.icon,
    image: f.image,
    category: { fr: f.categoryFr, en: f.categoryEn, es: f.categoryEs },
    title: { fr: f.titleFr, en: f.titleEn, es: f.titleEs },
    description: { fr: f.descFr, en: f.descEn, es: f.descEs },
    duration: { fr: f.durationFr, en: f.durationEn, es: f.durationEs },
    level: f.level,
    mode: safeJsonArray(f.mode),
    price: f.price,
    rating: f.rating,
    students: f.students,
    program: { fr: safeJsonArray(f.program), en: safeJsonArray(f.program), es: safeJsonArray(f.program) },
    certificate: f.certificate,
    popular: f.popular,
  };
}

export function transformProduct(p: DBProduct): any {
  return {
    id: p.slug,
    category: p.category,
    name: p.name,
    brand: p.brand,
    price: p.price,
    oldPrice: p.oldPrice ?? undefined,
    rating: p.rating,
    reviews: p.reviews,
    inStock: p.inStock,
    stockQty: p.stockQty,
    warranty: p.warranty,
    featured: p.featured,
    badge: (p.badge as "new" | "promo" | "best" | undefined) ?? undefined,
    image: p.image,
    gallery: safeJsonArray(p.gallery),
    description: { fr: p.descFr, en: p.descEn, es: p.descEs },
    specs: safeJsonArray(p.specs),
  };
}

export function transformEvent(e: DBEvent): any {
  return {
    id: e.slug,
    type: e.type,
    image: e.image,
    title: { fr: e.titleFr, en: e.titleEn, es: e.titleEs },
    date: e.date.toISOString(),
    time: e.time,
    location: { fr: e.locationFr, en: e.locationEn, es: e.locationEs },
    mode: e.mode,
    price: e.price,
    seats: e.seats,
    registered: e.registered,
    description: { fr: e.descFr, en: e.descEn, es: e.descEs },
  };
}

export function transformArticle(a: DBArticle): any {
  return {
    id: a.slug,
    category: { fr: a.categoryFr, en: a.categoryEn, es: a.categoryEs },
    title: { fr: a.titleFr, en: a.titleEn, es: a.titleEs },
    excerpt: { fr: a.excerptFr, en: a.excerptEn, es: a.excerptEs },
    content: { fr: a.contentFr, en: a.contentEn, es: a.contentEs },
    date: a.date.toISOString(),
    readTime: a.readTime,
    author: a.authorName,
    authorRole: { fr: a.authorRoleFr, en: a.authorRoleEn, es: a.authorRoleEs },
    tag: a.tag,
    image: a.image,
  };
}

function safeJsonArray(str: string): any[] {
  if (!str) return [];
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// ============ NEW ENTITY TRANSFORMERS ============

type DBService = {
  id: string; slug: string; icon: string; image: string; gradient: string;
  titleFr: string; titleEn: string; titleEs: string;
  descFr: string; descEn: string; descEs: string;
  features: string;
  createdAt: Date; updatedAt: Date;
};

type DBPartner = {
  id: string; slug: string; name: string; tier: string; logo: string;
  sector: string; image: string;
  createdAt: Date; updatedAt: Date;
};

type DBCaseStudy = {
  id: string; slug: string;
  titleFr: string; titleEn: string; titleEs: string;
  partner: string; result: string; metric: string; image: string;
  descFr: string; descEn: string; descEs: string;
  createdAt: Date; updatedAt: Date;
};

type DBMediaItem = {
  id: string; slug: string; type: string;
  titleFr: string; titleEn: string; titleEs: string;
  category: string; thumb: string; date: Date;
  createdAt: Date; updatedAt: Date;
};

type DBTeamMember = {
  id: string; slug: string; name: string;
  roleFr: string; roleEn: string; roleEs: string;
  bioFr: string; bioEn: string; bioEs: string;
  initials: string; color: string; image: string; category: string;
  createdAt: Date; updatedAt: Date;
};

type DBDonationGoal = {
  id: string; slug: string;
  goalFr: string; goalEn: string; goalEs: string;
  current: number; target: number; color: string; image: string;
  createdAt: Date; updatedAt: Date;
};

export function transformService(s: DBService): any {
  return {
    id: s.slug,
    icon: s.icon,
    image: s.image,
    gradient: s.gradient,
    title: { fr: s.titleFr, en: s.titleEn, es: s.titleEs },
    description: { fr: s.descFr, en: s.descEn, es: s.descEs },
    features: {
      fr: safeJsonArray(s.features),
      en: safeJsonArray(s.features),
      es: safeJsonArray(s.features),
    },
  };
}

export function transformPartner(p: DBPartner): any {
  return {
    id: p.slug,
    name: p.name,
    tier: p.tier,
    logo: p.logo,
    sector: p.sector,
    image: p.image,
  };
}

export function transformCaseStudy(cs: DBCaseStudy): any {
  return {
    id: cs.slug,
    title: { fr: cs.titleFr, en: cs.titleEn, es: cs.titleEs },
    partner: cs.partner,
    result: cs.result,
    metric: cs.metric,
    image: cs.image,
    description: { fr: cs.descFr, en: cs.descEn, es: cs.descEs },
  };
}

export function transformMediaItem(m: DBMediaItem): any {
  return {
    id: m.slug,
    type: m.type,
    title: { fr: m.titleFr, en: m.titleEn, es: m.titleEs },
    category: m.category,
    thumb: m.thumb,
    date: m.date.toISOString(),
  };
}

export function transformTeamMember(t: DBTeamMember): any {
  return {
    id: t.slug,
    name: t.name,
    initials: t.initials,
    color: t.color,
    image: t.image,
    category: t.category,
    role: { fr: t.roleFr, en: t.roleEn, es: t.roleEs },
    bio: { fr: t.bioFr, en: t.bioEn, es: t.bioEs },
  };
}

export function transformDonationGoal(d: DBDonationGoal): any {
  return {
    id: d.slug,
    goal: { fr: d.goalFr, en: d.goalEn, es: d.goalEs },
    current: d.current,
    target: d.target,
    color: d.color,
    image: d.image,
  };
}
