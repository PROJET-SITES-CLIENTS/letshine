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
