import { motion } from "motion/react";
import { Rocket, BookOpen, Coffee, GraduationCap } from "lucide-react";
function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 bg-slate-950 relative overflow-hidden "
    >
      {/*TItle*/}
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Sobre mim
          </h2>

          <p className="text-xl text-slate-300">
            Apaixonado em criar soluções inovadoras e impactantes
          </p>
        </motion.div>
        {/*Bio info*/}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 mb-12"
        >
          <p className="text-slate-200 leading-relaxed mb-4">
            Sou um desenvolvedor Full-Stack em formação, atualmente estou
            cursando Engenharia de Software na Católica SC e atuo na área de TI
            desde 2023. Apaixonado por resolver problemas e automatizar
            processos.
          </p>

          <p className="text-slate-200 leading-relaxed mb-4">
            Trabalho com Python, PostgreSQL, React, TypeScript e Node.js, e
            estou expandindo meus conhecimentos para DevOps - com foco em
            Docker, CI/CD e infraestrutura.
          </p>

          <p className="text-slate-200 leading-relaxed">
            Quando não estou codando, aproveito para ler livros, ver vídeos
            sobre programação e cybersecurity ou até mesmo jogar.
          </p>
        </motion.div>
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: Rocket, label: "Projetos no github", value: "5+" },
            { icon: BookOpen, label: "Cursos concluídos", value: "5+" },
            { icon: GraduationCap, label: "Semestre Atual", value: "5º" },
            { icon: Coffee, label: "Cafés consumidos", value: "∞" },
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
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
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
          className="space-y-8"
        >
          <h3 className="text-2xl font-bold text-center text-white mb-8">
            Jornada Profissional
          </h3>

          <div className="space-y-6">
            {[
              {
                year: "2023 - 2025",
                title: "Jovem Aprendiz",
                company: "ILPEA DO BRASIL",
                description:
                  "Atuei como Jovem Aprendiz na ILPEA DO BRASIL, onde tive a oportunidade de aprender e contribuir para a área de TI. Durante esse período, desenvolvi habilidades em suporte técnico, manutenção de sistemas.",
              },
              {
                year: "2025 - Presente",
                title: "Auxiliar de TI",
                company: "Anagê Imóveis",
                description:
                  "Atuo como Auxiliar de TI na Anagê Imóveis, onde sou responsável por fornecer suporte técnico, suporte em sistemas, gestão de acessos e suporte a práticas de governança de TI ,manutenção de hardware, e suporte a infraestrutura de rede. Essa experiência tem me permitido aplicar meus conhecimentos técnicos e desenvolver habilidades de resolução de problemas em um ambiente profissional.",
              },
            ].map((exp, index) => (
              <motion.div
                key={exp.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className=" relative pl-8 border-1-2 border-blue 500/30 hover:border-blue-500  transition-colors"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500" />
                <div className=" text-sm text-blue-400 mb-1 ">{exp.year}</div>
                <div className=" text-xl font-bold text-white mb-1 ">
                  {exp.title}
                </div>
                <div className="text-slte-300 mb-2">{exp.company}</div>
                <div className="text-slate-400">{exp.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
