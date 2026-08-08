import { db } from "../src/lib/db";
import bcrypt from "bcryptjs";
import { programs, formations, products, events, articles } from "../src/lib/seed-data";

async function main() {
  console.log("🌱 Seeding database...");

  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await db.user.upsert({
    where: { email: "admin@letsshine.africa" },
    update: {},
    create: {
      email: "admin@letsshine.africa",
      name: "Admin LET'S SHINE",
      password: adminPassword,
      role: "ADMIN",
      phone: "+224 622 33 44 55",
      country: "Guinée",
    },
  });
  console.log(`✅ Admin: ${admin.email} / admin123`);

  const memberPassword = await bcrypt.hash("member123", 12);
  const member = await db.user.upsert({
    where: { email: "member@letsshine.africa" },
    update: {},
    create: {
      email: "member@letsshine.africa",
      name: "Aïssatou Diallo",
      password: memberPassword,
      role: "MEMBER",
      phone: "+224 628 77 88 99",
      country: "Guinée",
    },
  });
  await db.memberProfile.upsert({
    where: { userId: member.id },
    update: {},
    create: {
      userId: member.id,
      bio: "Jeune entrepreneure passionnée par l'agroalimentaire.",
      occupation: "Étudiante en commerce",
      skills: JSON.stringify(["Marketing", "Vente", "Gestion de projet"]),
      languages: JSON.stringify(["Français", "Anglais", "Soussou"]),
    },
  });
  console.log(`✅ Member: ${member.email} / member123`);

  for (const p of programs) {
    await db.program.upsert({
      where: { slug: p.id },
      update: {},
      create: {
        slug: p.id, icon: p.icon, color: p.color, gradient: p.gradient, image: p.image,
        gallery: JSON.stringify(p.gallery),
        titleFr: p.title.fr, titleEn: p.title.en, titleEs: p.title.es,
        shortFr: p.short.fr, shortEn: p.short.en, shortEs: p.short.es,
        descFr: p.description.fr, descEn: p.description.en, descEs: p.description.es,
        objectives: JSON.stringify(p.objectives.fr), target: p.target.fr,
        results: JSON.stringify(p.results.fr),
      },
    });
  }
  console.log(`✅ ${programs.length} programs`);

  for (const f of formations) {
    await db.formation.upsert({
      where: { slug: f.id },
      update: {},
      create: {
        slug: f.id, icon: f.icon, image: f.image,
        categoryFr: f.category.fr, categoryEn: f.category.en, categoryEs: f.category.es,
        titleFr: f.title.fr, titleEn: f.title.en, titleEs: f.title.es,
        descFr: f.description.fr, descEn: f.description.en, descEs: f.description.es,
        durationFr: f.duration.fr, durationEn: f.duration.en, durationEs: f.duration.es,
        level: f.level, mode: JSON.stringify(f.mode), price: f.price,
        rating: f.rating, students: f.students, program: JSON.stringify(f.program.fr),
        certificate: f.certificate, popular: f.popular ?? false,
      },
    });
  }
  console.log(`✅ ${formations.length} formations`);

  for (const p of products) {
    await db.product.upsert({
      where: { slug: p.id },
      update: {},
      create: {
        slug: p.id, category: p.category, name: p.name, brand: p.brand,
        price: p.price, oldPrice: p.oldPrice, rating: p.rating, reviews: p.reviews,
        inStock: p.inStock, stockQty: 50, warranty: p.warranty,
        featured: p.featured ?? false, badge: p.badge,
        image: p.image, gallery: JSON.stringify(p.gallery),
        descFr: p.description.fr, descEn: p.description.en, descEs: p.description.es,
        specs: JSON.stringify(p.specs),
      },
    });
  }
  console.log(`✅ ${products.length} products`);

  for (const e of events) {
    await db.event.upsert({
      where: { slug: e.id },
      update: {},
      create: {
        slug: e.id, type: e.type, image: e.image,
        titleFr: e.title.fr, titleEn: e.title.en, titleEs: e.title.es,
        date: new Date(e.date), time: e.time,
        locationFr: e.location.fr, locationEn: e.location.en, locationEs: e.location.es,
        mode: e.mode, price: e.price, seats: e.seats, registered: e.registered,
        descFr: e.description.fr, descEn: e.description.en, descEs: e.description.es,
      },
    });
  }
  console.log(`✅ ${events.length} events`);

  for (const a of articles) {
    await db.article.upsert({
      where: { slug: a.id },
      update: {},
      create: {
        slug: a.id,
        categoryFr: a.category.fr, categoryEn: a.category.en, categoryEs: a.category.es,
        titleFr: a.title.fr, titleEn: a.title.en, titleEs: a.title.es,
        excerptFr: a.excerpt.fr, excerptEn: a.excerpt.en, excerptEs: a.excerpt.es,
        contentFr: a.content.fr, contentEn: a.content.en, contentEs: a.content.es,
        date: new Date(a.date), readTime: a.readTime,
        authorName: a.author,
        authorRoleFr: a.authorRole.fr, authorRoleEn: a.authorRole.en, authorRoleEs: a.authorRole.es,
        tag: a.tag, image: a.image,
      },
    });
  }
  console.log(`✅ ${articles.length} articles`);

  // Demo registrations + certificate
  const f1 = await db.formation.findFirst({ where: { slug: "f1" } });
  const f2 = await db.formation.findFirst({ where: { slug: "f2" } });
  if (f1 && f2) {
    const reg1 = await db.registration.create({
      data: { userId: member.id, type: "FORMATION", formationId: f1.id, status: "IN_PROGRESS", paid: true, amount: f1.price },
    });
    const reg2 = await db.registration.create({
      data: { userId: member.id, type: "FORMATION", formationId: f2.id, status: "COMPLETED", paid: true, amount: f2.price },
    });
    await db.certificate.create({
      data: { userId: member.id, registrationId: reg2.id, title: `Certificat — ${f2.titleFr}` },
    });
    console.log("✅ Demo registrations + certificate");
  }

  await db.message.create({
    data: {
      senderId: admin.id, recipientId: member.id,
      subject: "Bienvenue chez LET'S SHINE !",
      content: "Bonjour Aïssatou,\n\nBienvenue dans la communauté LET'S SHINE. Explore nos programmes et formations.\n\nL'équipe LET'S SHINE",
    },
  });
  console.log("✅ Demo message");

  console.log("\n🎉 Seed complete!");
  console.log("  Admin:  admin@letsshine.africa / admin123");
  console.log("  Member: member@letsshine.africa / member123");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
