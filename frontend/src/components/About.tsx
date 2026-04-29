import { motion } from "motion/react";
import { Rocket, BookOpen, Coffee, GraduationCap } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 px-6 bg-slate-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent pb-2">
            {t("about.title")}
          </h2>
          <p className="text-xl text-slate-300">{t("about.subtitle")}</p>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 mb-12"
        >
          <p className="text-slate-200 leading-relaxed mb-4">{t("about.bio1")}</p>
          <p className="text-slate-200 leading-relaxed mb-4">{t("about.bio2")}</p>
          <p className="text-slate-200 leading-relaxed">{t("about.bio3")}</p>
        </motion.div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: Rocket, label: t("about.stats.github"), value: "5+" },
            { icon: BookOpen, label: t("about.stats.courses"), value: "5+" },
            { icon: GraduationCap, label: t("about.stats.semester"), value: "5º" },
            { icon: Coffee, label: t("about.stats.coffee"), value: "∞" },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center hover:border-blue-500/50 transition-colors"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-linear-to-br from-blue-600 to-cyan-500 p-2.5">
                  <Icon className="w-full h-full text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-300">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Journey */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center text-white mb-8">
            {t("about.journey")}
          </h3>

          <div className="space-y-6">
            {[
              {
                year: "2023 - 2025",
                titleKey: "about.exp1.title",
                companyKey: "about.exp1.company",
                descKey: "about.exp1.desc",
              },
              {
                year: "Jun 2025 - Presente",
                titleKey: "about.exp2.title",
                companyKey: "about.exp2.company",
                descKey: "about.exp2.desc",
              },
            ].map((exp, index) => (
              <motion.div
                key={exp.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-blue-500/30 hover:border-blue-500 transition-colors"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-linear-to-br from-blue-600 to-cyan-500" />
                <div className="text-sm text-blue-400 mb-1">{exp.year}</div>
                <div className="text-xl font-bold text-white mb-1">{t(exp.titleKey)}</div>
                <div className="text-slate-300 mb-2">{t(exp.companyKey)}</div>
                <div className="text-slate-400">{t(exp.descKey)}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default About;
