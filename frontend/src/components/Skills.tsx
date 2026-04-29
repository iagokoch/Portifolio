import { motion } from "motion/react";
import { Code2, Database, Cloud } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const skills = [
  {
    category: "Frontend",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    items: ["React", "TypeScript", "Tailwind CSS", "Git"],
  },
  {
    category: "Backend",
    icon: Database,
    color: "from-blue-600 to-blue-400",
    items: ["Node.js", "Python", "PostgreSQL", "MySQL", "Prisma", "MongoDB", "Unit Testing"],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    color: "from-blue-500 to-indigo-600",
    items: ["Docker", "Linux", "CI/CD", "GitHub Actions", "AWS"],
  },
];

function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-24 px-6 bg-linear-to-b from-black to-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent pb-2">
            {t("skills.title")}
          </h2>
          <p className="text-xl text-slate-300">{t("skills.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl bg-slate-950/80 backdrop-blur-sm border border-slate-800 hover:border-slate-700 p-6 transition-all"
              >
                {/* Gradient bg hover */}
                <motion.div
                  className={`absolute inset-0 bg-linear-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                />
                {/* Icon */}
                <div className={`relative mb-4 w-12 h-12 rounded-xl bg-linear-to-br ${skill.color} p-2.5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                {/* Category */}
                <h3 className="relative text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {skill.category}
                </h3>
                {/* Skills list */}
                <ul className="relative space-y-2">
                  {skill.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-slate-300 group-hover:text-slate-200 transition-colors"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full bg-linear-to-r ${skill.color}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-linear-to-br ${skill.color} opacity-5 blur-2xl`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;
