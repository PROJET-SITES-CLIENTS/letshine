"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Newspaper,
  Mic,
  FileText,
  BookOpen,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useLocalized } from "@/lib/use-localized";
import { useRouter } from "@/components/providers/router-provider";
import { SectionHeader } from "@/components/layout/section-header";
import { articles } from "@/lib/data";

export function ArticleDetailPage() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const { params, navigate } = useRouter();

  const article =
    articles.find((a) => a.id === params.id) ?? articles[0];
  const others = articles.filter((a) => a.id !== article.id).slice(0, 3);

  const tagIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    interview: Mic,
    report: FileText,
    press: Newspaper,
    blog: BookOpen,
  };

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString(
      loc === "fr" ? "fr-FR" : loc === "es" ? "es-ES" : "en-US",
      { day: "numeric", month: "long", year: "numeric" }
    );
  };

  const paragraphs = (article.content[loc] || "").split("\n\n");

  return (
    <div className="animate-page-enter pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={article.image}
            alt={article.title[loc]}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1929]/90 via-[#0A1929]/80 to-[#003366]/70" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative py-20">
          <button
            onClick={() => navigate("news")}
            className="inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-200 text-sm font-semibold mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> {t("news.tag")}
          </button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-md bg-yellow-400 text-slate-900 text-xs font-bold uppercase tracking-wide">
                {article.category[loc]}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-300">
                <Calendar className="w-3.5 h-3.5" /> {formatDate(article.date)}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-300">
                <Clock className="w-3.5 h-3.5" /> {article.readTime} min
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              {article.title[loc]}
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-slate-900 font-bold text-base shadow-lg">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-white text-sm">
                  {article.author}
                </p>
                <p className="text-yellow-300 text-xs uppercase tracking-wide">
                  {article.authorRole[loc]}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article content + sidebar */}
      <section className="py-20 bg-shine-radial-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 max-w-6xl mx-auto">
            {/* Main content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-7 md:p-10 shadow-premium"
            >
              <p className="text-lg text-slate-800 leading-relaxed font-medium mb-6 pb-6 border-b border-slate-100">
                {article.excerpt[loc]}
              </p>
              <div className="space-y-5">
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-slate-700 leading-relaxed text-[15px] md:text-base whitespace-pre-line"
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Share / back */}
              <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => navigate("news")}
                  className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold text-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> {t("common.back")}
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 uppercase tracking-wide">
                    {article.category[loc]}
                  </span>
                </div>
              </div>
            </motion.article>

            {/* Sidebar - other articles */}
            <aside className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-6 shadow-premium sticky top-24"
              >
                <h4 className="font-display font-bold text-slate-900 mb-4">
                  {t("news.title")}
                </h4>
                <div className="space-y-3">
                  {others.map((a) => {
                    const TagIcon = tagIcons[a.tag] ?? Newspaper;
                    return (
                      <button
                        key={a.id}
                        onClick={() => navigate("article-detail", { id: a.id })}
                        className="group flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                      >
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={a.image}
                            alt={a.title[loc]}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="64px"
                          />
                          <div className="absolute inset-0 bg-black/20" />
                          <TagIcon className="absolute top-1 right-1 w-3.5 h-3.5 text-white/90" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors line-clamp-2 mb-1">
                            {a.title[loc]}
                          </p>
                          <p className="text-xs text-slate-500 flex items-center gap-2">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {a.readTime} min
                            </span>
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </aside>
          </div>

          {/* Bottom related */}
          <div className="max-w-6xl mx-auto mt-16">
            <SectionHeader
              badge={t("news.tag")}
              title={t("news.title")}
              align="left"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {others.map((a, i) => (
                <motion.button
                  key={a.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  onClick={() => navigate("article-detail", { id: a.id })}
                  className="group text-left bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500 card-shine"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={a.image}
                      alt={a.title[loc]}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-yellow-400 text-slate-900 text-[10px] font-bold uppercase tracking-wide">
                      {a.category[loc]}
                    </span>
                  </div>
                  <div className="p-5">
                    <h4 className="font-display font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                      {a.title[loc]}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(a.date)}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
