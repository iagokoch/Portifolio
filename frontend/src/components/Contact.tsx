import { useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Phone, Send, Terminal } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

function Contact() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [terminalOutput, setTerminalOutput] = useState([
    t("contact.terminal.init"),
    t("contact.terminal.ready1"),
    t("contact.terminal.ready2"),
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTerminalOutput([
      ...terminalOutput,
      `$ send --to=developer --from=${formData.email}`,
      t("contact.terminal.connecting"),
      t("contact.terminal.success"),
      t("contact.terminal.thanks"),
    ]);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 px-6 bg-linear-to-b from-slate-950 to-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent pb-2">
            {t("contact.title")}
          </h2>
          <p className="text-xl text-slate-300">{t("contact.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-slate-950/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Terminal className="w-6 h-6 text-blue-400" />
                {t("contact.info")}
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "iagon.koch@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+55 47 99174-7863" },
                  { icon: MapPin, label: "Location", value: "Joinville, SC - Brazil" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-900/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-600 to-cyan-500 p-2 flex-shrink-0">
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-400 mb-1">{item.label}</div>
                        <div className="text-white">{item.value}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Terminal */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-black border border-slate-800 rounded-2xl overflow-hidden"
            >
              <div className="bg-slate-950 px-4 py-3 flex items-center gap-2 border-b border-slate-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm text-slate-400 ml-2">terminal</span>
                </div>
              </div>
              <div className="p-4 font-mono text-sm space-y-1 max-h-48 overflow-y-auto">
                {terminalOutput.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={line.startsWith("$") ? "text-blue-400" : "text-slate-300"}
                  >
                    {line}
                  </motion.div>
                ))}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-blue-400"
                >
                  ▋
                </motion.span>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-slate-950/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm text-slate-300 mb-2">
                  {t("contact.nameLabel")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder={t("contact.namePlaceholder")}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-slate-300 mb-2">
                  {t("contact.emailLabel")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder={t("contact.emailPlaceholder")}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-slate-300 mb-2">
                  {t("contact.messageLabel")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder={t("contact.messagePlaceholder")}
                />
              </div>
              <motion.button
                type="submit"
                className="w-full py-4 px-6 bg-linear-to-r from-blue-600 to-cyan-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-shadow flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                {t("contact.send")}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
