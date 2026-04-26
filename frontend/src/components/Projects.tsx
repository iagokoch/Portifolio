import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import petfrinedconnect from "../assets/projects/petfriendconnect.png";
import todolist from "../assets/projects/todolist.png";
import microlearn from "../assets/projects/microLearn.png";

const projects = [
  {
    title: "PetFriend Connect",
    description:
      "Plataforma colaborativa para conectar donos de pets a cuidadores locais. Desenvolvido em equipe com autenticação JWT, transações ACID e sistema de agendamento atômico.",
    image: petfrinedconnect,
    tech: ["React", "Node.js", "MySQL", "Prisma", "JWT"],
    github: "https://github.com/joaofsdev/PetFriendConnect",
    live: "#",
    featured: true,
  },
  {
    title: "Todo List",
    description:
      "Primeiro projeto full-stack com TypeScript — gerenciamento de tarefas com frontend e backend separados",
    image: todolist,
    tech: ["TypeScript", "Node.js"],
    github: "https://github.com/iagokoch/todo-list",
    live: "#",
    featured: false,
  },
  {
    title: "MicroLearn",
    description:
      " Plataforma de microaprendizado com sistema de aulas, quizzes, progresso do usuário e painel administrativo.",
    image: microlearn,
    tech: ["Node.js", "Express", "EJS", "MySQL"],
    github: "https://github.com/iagokoch/plataforma-de-microaprendizado",
    live: "#",
    featured: false,
  },
];

function Projects() {
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
            Projetos
          </h2>
          <p className="text-xl text-slate-300">Alguns projetos que construí</p>
        </motion.div>

        {/* Projects */}
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
              <div
                className={`grid ${project.featured ? "md:grid-cols-2" : "grid-cols-1"} gap-0`}
              >
                {/* Image */}
                <div className="relative aspect-video md:aspect-auto overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      {project.description}
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
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </motion.a>
                    <motion.a
                      href={project.live}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/50 transition-shadow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
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
