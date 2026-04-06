import { motion } from "motion/react";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center
      justify-center overflow-hidden bg-linear-to-br from-black via-blue-950
      to-black pt-24"
    >
      {/* Background orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-blue-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent leading-normal pb-2 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Iago Neermann Koch
        </motion.h1>
        <motion.p
          className=" text-2xl text-slate-200 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Full-Stack Developer
        </motion.p>

        <motion.p
          className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Desenvolvedor Full-Stack criado em Joinville, SC. Focado em construir
          aplicações e automações bem estruturadas e eficientes, e expandindo
          minha atuação para DevOps.
        </motion.p>

        {/* Call to action buttons */}
        <motion.div
          className=" flex gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <a
            href="#contact"
            className="px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-500 rounded-full text-white font-semibold hover:shadow-blue-500/50 transition-shadow"
          >
            Entre em contato
          </a>

          <a
            href="#projects"
            className="px-8 py-4 border-2 box-border border-blue-400/50 rounded-full text-blue-300 font-semibold hover:bg-blue-500/10 transition-colors "
          >
            Ver Projetos
          </a>
        </motion.div>

        {/* Social media links */}
        <motion.div
          className="flex gap-6 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <a
            href="https://github.com/iagokoch"
            target="blank"
            className="p-3 rounded-full bg-slate-400 hover:text-blue-400 hover:bg-slate-900 transition-colors "
          >
            <Github className="w-6 h-6" />
          </a>

          <a
            href="https://www.linkedin.com/in/iago-koch"
            target="blank"
            className="p-3 rounded-full bg-slate-400 hover:text-blue-400 hover:bg-slate-900 transition-colors "
          >
            <Linkedin className="w-6 h-6" />
          </a>

          <a
            href="mailto:iagon.koch@gmail.com"
            target="blank"
            className="p-3 rounded-full bg-slate-400 hover:text-blue-400 hover:bg-slate-900 transition-colors "
          >
            <Mail className="w-6 h-6" />
          </a>
        </motion.div>
      </div>
      {/* Scroll down indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-slate-400" />
      </motion.div>
    </section>
  );
}

export default Hero;
