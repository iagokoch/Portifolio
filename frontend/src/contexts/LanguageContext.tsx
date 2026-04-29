import { createContext, useContext, useState, ReactNode } from "react";

type Language = "pt" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const translations = {
  pt: {
    // Navbar
    "nav.home": "Home",
    "nav.projects": "Projetos",
    "nav.skills": "Habilidades",
    "nav.about": "Sobre",
    "nav.contact": "Contato",
    "nav.hireMe": "Contratar",

    // Hero
    "hero.role": "Desenvolvedor Full-Stack",
    "hero.description":
      "Desenvolvedor Full-Stack baseado em Joinville, SC. Focado em construir aplicações e automações bem estruturadas e eficientes, e expandindo minha atuação para DevOps.",
    "hero.contact": "Entre em contato",
    "hero.projects": "Ver Projetos",

    // About
    "about.title": "Sobre mim",
    "about.subtitle": "Apaixonado em criar soluções inovadoras e impactantes",
    "about.bio1":
      "Sou um desenvolvedor Full-Stack em formação, atualmente cursando Engenharia de Software na Católica SC e atuando na área de TI desde 2023. Apaixonado por resolver problemas e automatizar processos.",
    "about.bio2":
      "Trabalho com Python, PostgreSQL, React, TypeScript e Node.js, e estou expandindo meus conhecimentos para DevOps — com foco em Docker, CI/CD e infraestrutura.",
    "about.bio3":
      "Quando não estou codando, aproveito para ler livros, ver vídeos sobre programação e cybersecurity ou até mesmo jogar.",
    "about.stats.github": "Projetos no GitHub",
    "about.stats.courses": "Cursos concluídos",
    "about.stats.semester": "Semestre Atual",
    "about.stats.coffee": "Cafés consumidos",
    "about.journey": "Jornada Profissional",
    "about.exp1.title": "Jovem Aprendiz",
    "about.exp1.company": "ILPEA DO BRASIL",
    "about.exp1.desc":
      "Atuei como Jovem Aprendiz na ILPEA DO BRASIL, onde tive a oportunidade de aprender e contribuir para a área de TI. Desenvolvi habilidades em suporte técnico e manutenção de sistemas.",
    "about.exp2.title": "Auxiliar de TI",
    "about.exp2.company": "Anagê Imóveis",
    "about.exp2.desc":
      "Responsável por suporte técnico, gestão de acessos, governança de TI, manutenção de hardware e suporte à infraestrutura de rede.",

    // Projects
    "projects.title": "Projetos",
    "projects.subtitle": "Alguns projetos que construí",
    "projects.code": "Código",
    "projects.demo": "Live Demo",

    // Skills
    "skills.title": "Skills",
    "skills.subtitle": "Tecnologias e ferramentas que eu utilizo",

    // Contact
    "contact.title": "Entre em Contato",
    "contact.subtitle": "Vamos criar projetos incríveis juntos!",
    "contact.info": "Informações de Contato",
    "contact.nameLabel": "Nome",
    "contact.namePlaceholder": "Seu nome",
    "contact.emailLabel": "Email",
    "contact.emailPlaceholder": "seu@email.com",
    "contact.messageLabel": "Mensagem",
    "contact.messagePlaceholder": "Fale sobre seu projeto...",
    "contact.send": "Enviar Mensagem",
    "contact.terminal.init": "$ contato --init",
    "contact.terminal.ready1": "> Formulário inicializado...",
    "contact.terminal.ready2": "> Pronto para receber mensagens!",
    "contact.terminal.connecting": "> Estabelecendo conexão...",
    "contact.terminal.success": "> Mensagem enviada com sucesso! ✓",
    "contact.terminal.thanks": "> Agradeço pelo contato!",

    // Footer
    "footer.rights": "Todos os direitos reservados.",
    "footer.built": "Feito com",
    "footer.coffee": "e muito café",
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.hireMe": "Hire Me",

    // Hero
    "hero.role": "Full-Stack Developer",
    "hero.description":
      "Full-Stack Developer based in Joinville, SC. Focused on building well-structured applications and automations, expanding into DevOps.",
    "hero.contact": "Get in touch",
    "hero.projects": "View Projects",

    // About
    "about.title": "About Me",
    "about.subtitle": "Passionate about creating innovative and impactful solutions",
    "about.bio1":
      "I'm a Full-Stack Developer in training, currently studying Software Engineering at Católica SC and working in IT since 2023. Passionate about solving problems and automating processes.",
    "about.bio2":
      "I work with Python, PostgreSQL, React, TypeScript and Node.js, and I'm expanding my knowledge into DevOps — focused on Docker, CI/CD and infrastructure.",
    "about.bio3":
      "When I'm not coding, I enjoy reading books, watching programming and cybersecurity content, or gaming.",
    "about.stats.github": "GitHub Projects",
    "about.stats.courses": "Completed Courses",
    "about.stats.semester": "Current Semester",
    "about.stats.coffee": "Coffees consumed",
    "about.journey": "Professional Journey",
    "about.exp1.title": "Apprentice",
    "about.exp1.company": "ILPEA DO BRASIL",
    "about.exp1.desc":
      "Worked as an Apprentice at ILPEA DO BRASIL, contributing to the IT department. Developed skills in technical support and system maintenance.",
    "about.exp2.title": "IT Assistant",
    "about.exp2.company": "Anagê Imóveis",
    "about.exp2.desc":
      "Responsible for technical support, access management, IT governance, hardware maintenance, and network infrastructure support.",

    // Projects
    "projects.title": "Projects",
    "projects.subtitle": "Some projects I've built",
    "projects.code": "Code",
    "projects.demo": "Live Demo",

    // Skills
    "skills.title": "Skills",
    "skills.subtitle": "Technologies and tools I work with",

    // Contact
    "contact.title": "Get in Touch",
    "contact.subtitle": "Let's build amazing projects together!",
    "contact.info": "Contact Information",
    "contact.nameLabel": "Name",
    "contact.namePlaceholder": "Your name",
    "contact.emailLabel": "Email",
    "contact.emailPlaceholder": "your@email.com",
    "contact.messageLabel": "Message",
    "contact.messagePlaceholder": "Tell me about your project...",
    "contact.send": "Send Message",
    "contact.terminal.init": "$ contact --init",
    "contact.terminal.ready1": "> Form initialized...",
    "contact.terminal.ready2": "> Ready to receive messages!",
    "contact.terminal.connecting": "> Establishing connection...",
    "contact.terminal.success": "> Message sent successfully! ✓",
    "contact.terminal.thanks": "> Thanks for reaching out!",

    // Footer
    "footer.rights": "All rights reserved.",
    "footer.built": "Built with",
    "footer.coffee": "and lots of coffee",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.pt] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
