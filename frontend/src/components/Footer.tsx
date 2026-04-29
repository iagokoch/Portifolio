import { motion } from "motion/react";
import { Heart, Github, Linkedin, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="py-12 px-6 bg-black border-t border-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-slate-300"
          >
            <span>Built with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            >
              <Heart className="w-4 h-4 text-orange-500 fill-orange-500" />
            </motion.div>
            <span>and lots of coffee</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            {[
              { Icon: Github, href: "#", label: "GitHub" },
              { Icon: Linkedin, href: "#", label: "LinkedIn" },
              { Icon: Twitter, href: "#", label: "Twitter" },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                className="p-2 rounded-lg bg-slate-950 text-slate-400 hover:text-blue-400 hover:bg-slate-900 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-slate-400 text-sm"
          >
            © 2026 Iago Neermann Koch. All rights reserved
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
