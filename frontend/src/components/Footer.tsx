import { motion } from "motion/react";
import { Heart, Github, Linkedin, Twitter } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

function Footer() {
  const { t } = useLanguage();

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
            <span>{t("footer.built")}</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            >
              <Heart className="w-4 h-4 text-orange-500 fill-orange-500" />
            </motion.div>
            <span>{t("footer.coffee")}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            {[
              { Icon: Github, href: "https://github.com/iagokoch", label: "GitHub" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/iago-koch", label: "LinkedIn" },
              { Icon: Twitter, href: "#", label: "Twitter" },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
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
            © 2026 Iago Neermann Koch. {t("footer.rights")}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
