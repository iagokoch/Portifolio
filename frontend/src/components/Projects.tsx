import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import petfriendconnect from "../assets/projects/petfriendconnect.png";
import todolist from "../assets/projects/todolist.png";
import microlearn from "../assets/projects/microLearn.png";

const projects = [
  {
    title: "PetFriend Connect",
    descPt: "Plataforma colaborativa para conectar donos de pets a cuidadores locais. Desenvolvido em equipe com autenticação JWT, transações ACID e sistema de agendamento atômico.",
    descEn: "Collaborative platform to connect pet owners with local caregivers. Built as a team with JWT authentication, ACID transactions, and atomic scheduling system.",
    image: petfriendconnect,
    tech: ["React", "Node.js", "MySQL", "Prisma", "JWT"],
    github: "https://github.com/joaofsdev/PetFriendConnect",
    live: "#",
    featured: true,
  },
  {
    title: "Todo List",
    descPt: "Primeiro projeto full-stack com TypeScript — gerenciamento de tarefas com frontend e backend separados.",
    descEn: "First full-stack project with TypeScript — task management with separate frontend and backend.",
    image: todolist,
    tech: ["TypeScript", "Node.js"],
    github: "https://github.com/iagokoch/todo-list",
    live: "#",
    featured: false,
  },
  {
    title: "MicroLearn",
    descPt: "Plataforma de microaprendizado com sistema de aulas, quizzes, progresso do usuário e painel administrativo.",
    descEn: "Micro-learning platform with lesson system, quizzes, user progress tracking, and admin panel.",
    image: microlearn,
    tech: ["Node.js", "Express", "EJS", "MySQL"],
    github: "https://github.com/iagokoch/plataforma-de-microaprendizado",
    live: "#",
    featured: false,
  },
];

function Projects() {
  const { t, language } = useLanguage();

  return (
    <section id="projects" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent pb-2">
            {t("projects.title")}
          </h2>
          <p className="text-xl text-slate-300">{t("projects.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-all ${project.featured ? "md:col-span-2" : ""}`}
            >
              <div className={`grid ${project.featured ? "md:grid-cols-2" : "grid-cols-1"} gap-0`}>
                {/* Image */}
                <div className="relative aspect-video md:aspect-auto overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      {language === "pt" ? project.descPt : project.descEn}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4" />
                      {t("projects.code")}
                    </motion.a>
                    <motion.a
                      href={project.live}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/50 transition-shadow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t("projects.demo")}
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
