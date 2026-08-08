import { db } from "../src/lib/db";
import {
  services,
  partners,
  caseStudies,
  mediaItems,
  founder,
  nationalTeam,
  committee,
  experts,
  donationGoals,
} from "../src/lib/data";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  console.log("🌱 Seeding new entities...");

  // ---- Services ----
  for (const s of services) {
    const slug = s.id;
    await db.service.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        icon: s.icon,
        image: s.image,
        gradient: s.gradient,
        titleFr: s.title.fr,
        titleEn: s.title.en,
        titleEs: s.title.es,
        descFr: s.description.fr,
        descEn: s.description.en,
        descEs: s.description.es,
        features: JSON.stringify(s.features.fr),
      },
    });
  }
  console.log(`✅ ${services.length} services`);

  // ---- Partners ----
  for (const p of partners) {
    const slug = slugify(p.name);
    await db.partner.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        name: p.name,
        tier: p.tier,
        logo: p.logo,
        sector: p.sector,
        image: p.image,
      },
    });
  }
  console.log(`✅ ${partners.length} partners`);

  // ---- Case Studies ----
  for (const cs of caseStudies) {
    const slug = slugify(cs.title.fr).slice(0, 50);
    await db.caseStudy.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        titleFr: cs.title.fr,
        titleEn: cs.title.en,
        titleEs: cs.title.es,
        partner: cs.partner,
        result: cs.result,
        metric: cs.metric,
        image: cs.image,
        descFr: cs.description.fr,
        descEn: cs.description.en,
        descEs: cs.description.es,
      },
    });
  }
  console.log(`✅ ${caseStudies.length} case studies`);

  // ---- Media Items ----
  for (const m of mediaItems) {
    await db.mediaItem.upsert({
      where: { slug: m.id },
      update: {},
      create: {
        slug: m.id,
        type: m.type,
        titleFr: m.title.fr,
        titleEn: m.title.en,
        titleEs: m.title.es,
        category: m.category,
        thumb: m.thumb,
        date: new Date(m.date),
      },
    });
  }
  console.log(`✅ ${mediaItems.length} media items`);

  // ---- Team Members (founder + national + committee + experts) ----
  const allTeam = [
    { ...founder, category: "founder" },
    ...nationalTeam.map((t) => ({ ...t, category: "national" })),
    ...committee.map((t) => ({ ...t, category: "committee" })),
    ...experts.map((t) => ({ ...t, category: "experts" })),
  ];
  for (const t of allTeam) {
    const slug = slugify(t.name);
    await db.teamMember.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        name: t.name,
        initials: t.initials,
        color: t.color,
        image: t.image,
        category: t.category,
        roleFr: t.role.fr,
        roleEn: t.role.en,
        roleEs: t.role.es,
        bioFr: t.bio.fr,
        bioEn: t.bio.en,
        bioEs: t.bio.es,
      },
    });
  }
  console.log(`✅ ${allTeam.length} team members`);

  // ---- Donation Goals ----
  for (const d of donationGoals) {
    const slug = slugify(d.goal.fr).slice(0, 50);
    await db.donationGoal.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        goalFr: d.goal.fr,
        goalEn: d.goal.en,
        goalEs: d.goal.es,
        current: d.current,
        target: d.target,
        color: d.color,
        image: d.image,
      },
    });
  }
  console.log(`✅ ${donationGoals.length} donation goals`);

  console.log("\n🎉 Entity seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
