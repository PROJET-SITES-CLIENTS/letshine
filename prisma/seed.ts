import { PrismaClient } from "@prisma/client";
import {
  programs,
  formations,
  products,
  services,
  partners,
  caseStudies,
  articles,
  events,
  mediaItems,
  donationGoals,
  founder,
  nationalTeam,
  committee,
  experts
} from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seeding de la base de données Let's Shine...");

  // 1. SERVICES
  for (const item of services) {
    await prisma.service.upsert({
      where: { slug: item.id },
      update: {},
      create: {
        slug: item.id,
        icon: item.icon,
        image: item.image,
        gradient: item.gradient,
        titleFr: item.title.fr,
        titleEn: item.title.en,
        titleEs: item.title.es,
        descFr: item.description.fr,
        descEn: item.description.en,
        descEs: item.description.es,
        features: JSON.stringify(item.features.fr), // Changed item.features to item.features.fr to fix type if features is multilingue? Wait, in schema it's features String
      },
    });
  }
  console.log("✅ Services insérés.");

  // 2. PROGRAMS
  for (const item of programs) {
    await prisma.program.upsert({
      where: { slug: item.id },
      update: {},
      create: {
        slug: item.id,
        icon: item.icon,
        color: item.color,
        gradient: item.gradient,
        image: item.image,
        gallery: JSON.stringify(item.gallery),
        titleFr: item.title.fr,
        titleEn: item.title.en,
        titleEs: item.title.es,
        shortFr: item.short.fr,
        shortEn: item.short.en,
        shortEs: item.short.es,
        descFr: item.description.fr,
        descEn: item.description.en,
        descEs: item.description.es,
        objectives: JSON.stringify(item.objectives.fr),
        target: item.target.fr,
        results: JSON.stringify(item.results.fr),
      },
    });
  }
  console.log("✅ Programmes insérés.");

  // 3. FORMATIONS
  for (const item of formations) {
    await prisma.formation.upsert({
      where: { slug: item.id },
      update: {},
      create: {
        slug: item.id,
        icon: item.icon,
        image: item.image,
        categoryFr: item.category.fr,
        categoryEn: item.category.en,
        categoryEs: item.category.es,
        titleFr: item.title.fr,
        titleEn: item.title.en,
        titleEs: item.title.es,
        descFr: item.description.fr,
        descEn: item.description.en,
        descEs: item.description.es,
        durationFr: item.duration.fr,
        durationEn: item.duration.en,
        durationEs: item.duration.es,
        level: item.level,
        mode: JSON.stringify(item.mode),
        price: item.price,
        rating: item.rating,
        students: item.students,
        program: JSON.stringify(item.program.fr),
        certificate: item.certificate,
        popular: item.popular ?? false,
      },
    });
  }
  console.log("✅ Formations insérées.");

  // 4. PRODUCTS
  for (const item of products) {
    await prisma.product.upsert({
      where: { slug: item.id },
      update: {},
      create: {
        slug: item.id,
        category: item.category,
        name: item.name,
        brand: item.brand,
        price: item.price,
        oldPrice: item.oldPrice,
        rating: item.rating,
        reviews: item.reviews,
        inStock: item.inStock,
        warranty: item.warranty,
        featured: item.featured ?? false,
        badge: item.badge,
        image: item.image,
        gallery: JSON.stringify(item.gallery),
        descFr: item.description.fr,
        descEn: item.description.en,
        descEs: item.description.es,
        specs: JSON.stringify(item.specs),
      },
    });
  }
  console.log("✅ Produits insérés.");

  // 5. PARTNERS
  for (const item of partners) {
    const slug = item.name.toLowerCase().replace(/[\s\W]+/g, '-');
    await prisma.partner.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        name: item.name,
        tier: item.tier,
        logo: item.logo,
        sector: item.sector,
        image: item.image,
      },
    });
  }
  console.log("✅ Partenaires insérés.");

  // 6. ARTICLES (News)
  for (const item of articles) {
    await prisma.article.upsert({
      where: { slug: item.id },
      update: {},
      create: {
        slug: item.id,
        categoryFr: item.category.fr,
        categoryEn: item.category.en,
        categoryEs: item.category.es,
        titleFr: item.title.fr,
        titleEn: item.title.en,
        titleEs: item.title.es,
        excerptFr: item.excerpt.fr,
        excerptEn: item.excerpt.en,
        excerptEs: item.excerpt.es,
        contentFr: item.content.fr,
        contentEn: item.content.en,
        contentEs: item.content.es,
        date: new Date(item.date),
        readTime: item.readTime,
        authorName: item.author,
        authorRoleFr: item.authorRole.fr,
        authorRoleEn: item.authorRole.en,
        authorRoleEs: item.authorRole.es,
        tag: item.tag,
        image: item.image,
        published: true,
      },
    });
  }
  console.log("✅ Articles insérés.");

  // 7. EVENTS
  for (const item of events) {
    await prisma.event.upsert({
      where: { slug: item.id },
      update: {},
      create: {
        slug: item.id,
        type: item.type,
        image: item.image,
        titleFr: item.title.fr,
        titleEn: item.title.en,
        titleEs: item.title.es,
        date: new Date(item.date),
        time: item.time,
        locationFr: item.location.fr,
        locationEn: item.location.en,
        locationEs: item.location.es,
        mode: item.mode,
        price: item.price,
        seats: item.seats,
        registered: item.registered,
        descFr: item.description.fr,
        descEn: item.description.en,
        descEs: item.description.es,
      },
    });
  }
  console.log("✅ Événements insérés.");

  // 8. MEDIA ITEMS
  for (const item of mediaItems) {
    await prisma.mediaItem.upsert({
      where: { slug: item.id },
      update: {},
      create: {
        slug: item.id,
        type: item.type,
        titleFr: item.title.fr,
        titleEn: item.title.en,
        titleEs: item.title.es,
        category: item.category,
        thumb: item.thumb,
        date: new Date(item.date),
      },
    });
  }
  console.log("✅ Médias insérés.");
  
  // 9. CASE STUDIES
  for (const item of caseStudies) {
    const slug = item.title.fr.toLowerCase().replace(/[\s\W]+/g, '-');
    await prisma.caseStudy.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        titleFr: item.title.fr,
        titleEn: item.title.en,
        titleEs: item.title.es,
        partner: item.partner,
        result: item.result,
        metric: item.metric,
        image: item.image,
        descFr: item.description.fr,
        descEn: item.description.en,
        descEs: item.description.es,
      },
    });
  }
  console.log("✅ Études de cas insérées.");
  
  // 10. DONATION GOALS
  for (const item of donationGoals) {
    const slug = item.goal.fr.toLowerCase().replace(/[\s\W]+/g, '-');
    await prisma.donationGoal.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        goalFr: item.goal.fr,
        goalEn: item.goal.en,
        goalEs: item.goal.es,
        current: item.current,
        target: item.target,
        color: item.color,
        image: item.image,
      },
    });
  }
  console.log("✅ Objectifs de dons insérés.");

  // 11. TEAM MEMBERS
  const allTeam = [
    { ...founder, category: "founder" },
    ...nationalTeam.map(m => ({ ...m, category: "national" })),
    ...committee.map(m => ({ ...m, category: "committee" })),
    ...experts.map(m => ({ ...m, category: "experts" }))
  ];

  for (const item of allTeam) {
    await prisma.teamMember.upsert({
      where: { slug: item.id },
      update: {},
      create: {
        slug: item.id,
        name: item.name,
        roleFr: item.role.fr,
        roleEn: item.role.en,
        roleEs: item.role.es,
        bioFr: item.bio.fr,
        bioEn: item.bio.en,
        bioEs: item.bio.es,
        initials: item.initials,
        color: item.color,
        image: item.image,
        category: item.category,
      },
    });
  }
  console.log("✅ Membres de l'équipe insérés.");

  console.log("🎉 Seeding terminé avec succès ! Toutes les données statiques sont désormais dans Neon.");
}

main()
  .catch((e) => {
    console.error("❌ Erreur pendant le seeding :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
