export const translations = {
  "pt-BR": {
    // Navigation
    home: "Início",
    disciplines: "Disciplinas",
    publications: "Publicações",
    blog: "Blog & Eventos",
    contact: "Contato",

    selectLanguage: "Idioma / Language",

    // Home page
    welcomeTitle: "Profa. Mariana Sombrio",
    welcomeSubtitle: "Historiadora • Doutora em Geociências • UFABC",
    aboutTitle: "Sobre",
    aboutText:
      "Sou historiadora formada pela Unicamp, com doutorado em Geociências pela mesma universidade. Atualmente leciono na UFABC, onde ministro disciplinas como História da Educação, Teoria da História e Políticas Educacionais.",

    academicFormation: "Formação Acadêmica",
    phdDegree: "Doutorado em Estudos de Gênero",
    bachelorDegree: "Graduação em História",
    advisor: "Orientadora:",
    phdThesisLabel: "Tese de Doutorado:",

    // Disciplines
    disciplinesTitle: "Disciplinas Ministradas",
    historyEducation: "História da Educação",
    theoryHistory: "Teoria da História",
    educationalPolicies: "Políticas Educacionais",

    // Publications
    publicationsTitle: "Publicações e Pesquisas",
    thesisTitle: "Tese de Doutorado",
    thesisDescription:
      '"Em busca pelo campo: ciências, coleções, gênero e outras histórias sobre mulheres viajantes no Brasil em meados do século XX"',
    university: "Universidade Estadual de Campinas (Unicamp)",

    // Blog
    blogTitle: "Blog e Eventos Acadêmicos",
    eventsTitle: "Próximos Eventos",

    // Contact
    contactTitle: "Contato",
    email: "E-mail",
    office: "Gabinete",
    officeHours: "Horário de Atendimento",
    location: "Localização",

    // Footer
    rights: "Todos os direitos reservados.",
  },

  en: {
    // Navigation
    home: "Home",
    disciplines: "Courses",
    publications: "Publications",
    blog: "Blog & Events",
    contact: "Contact",

    selectLanguage: "Idioma / Language",

    // Home page
    welcomeTitle: "Prof. Mariana Sombrio",
    welcomeSubtitle: "Historian • PhD in Geosciences • UFABC",
    aboutTitle: "About",
    aboutText:
      "I am a historian graduated from Unicamp, with a PhD in Geosciences from the same university. I currently teach at UFABC, where I teach subjects such as History of Education, Theory of History and Educational Policies.",

    academicFormation: "Academic Background",
    phdDegree: "PhD in Gender Studies",
    bachelorDegree: "Bachelor's Degree in History",
    advisor: "Advisor:",
    phdThesisLabel: "PhD Thesis:",

    // Disciplines
    disciplinesTitle: "Courses Taught",
    historyEducation: "History of Education",
    theoryHistory: "Theory of History",
    educationalPolicies: "Educational Policies",

    // Publications
    publicationsTitle: "Publications and Research",
    thesisTitle: "PhD Thesis",
    thesisDescription:
      '"In search of the field: sciences, collections, gender and other stories about traveling women in Brazil in the mid-20th century"',
    university: "University of Campinas (Unicamp)",

    // Blog
    blogTitle: "Blog and Academic Events",
    eventsTitle: "Upcoming Events",

    // Contact
    contactTitle: "Contact",
    email: "Email",
    office: "Office",
    officeHours: "Office Hours",
    location: "Location",

    // Footer
    rights: "All rights reserved.",
  },

  es: {
    // Navigation
    home: "Inicio",
    disciplines: "Disciplinas",
    publications: "Publicaciones",
    blog: "Blog y Eventos",
    contact: "Contacto",

    selectLanguage: "Idioma / Language",

    // Home page
    welcomeTitle: "Prof. Mariana Sombrio",
    welcomeSubtitle: "Historiadora • Doctora en Geociencias • UFABC",
    aboutTitle: "Acerca de",
    aboutText:
      "Soy historiadora graduada de Unicamp, con doctorado en Geociencias de la misma universidad. Actualmente enseño en UFABC, donde imparto materias como Historia de la Educación, Teoría de la Historia y Políticas Educativas.",

    academicFormation: "Formación Académica",
    phdDegree: "Doctorado en Estudios de Género",
    bachelorDegree: "Licenciatura en Historia",
    advisor: "Directora:",
    phdThesisLabel: "Tesis Doctoral:",

    // Disciplines
    disciplinesTitle: "Disciplinas Impartidas",
    historyEducation: "Historia de la Educación",
    theoryHistory: "Teoría de la Historia",
    educationalPolicies: "Políticas Educativas",

    // Publications
    publicationsTitle: "Publicaciones e Investigación",
    thesisTitle: "Tesis Doctoral",
    thesisDescription:
      '"En busca del campo: ciencias, colecciones, género y otras historias sobre mujeres viajeras en Brasil a mediados del siglo XX"',
    university: "Universidad de Campinas (Unicamp)",

    // Blog
    blogTitle: "Blog y Eventos Académicos",
    eventsTitle: "Próximos Eventos",

    // Contact
    contactTitle: "Contacto",
    email: "Correo electrónico",
    office: "Oficina",
    officeHours: "Horario de Atención",
    location: "Ubicación",

    // Footer
    rights: "Todos los derechos reservados.",
  },
}

export type Language = keyof typeof translations
export type TranslationKey = keyof (typeof translations)["pt-BR"]
