# Professor Site - Profa. Mariana Sombrio

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-blue.svg)](https://opensource.org/licenses/MPL-2.0)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)](https://tailwindcss.com/)

Personal website for Professor Mariana Sombrio - Historian, PhD in Geosciences from Unicamp, Professor at UFABC.

## Motivation

This website serves as a digital hub for students, researchers, and the academic community to access Prof. Mariana Sombrio's work, teaching materials, and research contributions. It aims to bridge the gap between academic research and public accessibility, making her extensive work in History of Science, Gender Studies, and the history of women travelers in Brazil available to a broader audience.

By providing a modern, multilingual platform, this project facilitates knowledge sharing across language barriers and demonstrates best practices in academic web presence design.

## Features

### 🌐 **Internationalization**
- Full support for 3 languages: Portuguese (PT-BR), English (EN), Spanish (ES)
- Seamless language switching with persistent preferences
- Culturally appropriate content adaptation for each locale

### 🎨 **Modern, Accessible Design**
- Built with shadcn/ui components for consistency and quality
- Fully responsive layout (mobile, tablet, desktop)
- Dark/light theme support with next-themes
- WCAG accessibility standards compliance
- Clean, academic-focused aesthetic

### 📚 **Content Management**
- Academic publications showcase with detailed information
- Course/discipline information for students
- Blog and events calendar for academic engagement
- Contact information and office hours
- Professional author profile with credentials

### 🚀 **Performance Optimized**
- Next.js 14 App Router for optimal performance and SEO
- Server-side rendering (SSR) for better search visibility
- Optimized images and static assets
- Fast page loads and smooth navigation
- TypeScript for type safety and developer experience

### 🧪 **Quality Assurance**
- TypeScript for compile-time type checking
- ESLint for code quality enforcement
- BMAD methodology integration for structured development

## 📁 Project Structure

This project maintains an organized structure with clear separation between documentation and code:

```text
professor-site/
├── README.md          # This file
├── LICENSE            # Project license (MPL-2.0)
├── CONTRIBUTING.md    # Contribution guidelines
├── docs/              # 📚 All project documentation
│   ├── discover/      # Discovery and research
│   ├── plan/          # Planning documents
│   ├── solution/      # Technical solutions
│   ├── reports/       # Reports (test, story, prd, etc.)
│   └── requirements/  # Requirements (epics, stories, prd)
└── code/              # 💻 All source code and configurations
    ├── src/           # Application source code
    ├── tests/         # Tests (unit, e2e, api, fixtures)
    ├── public/        # Static assets
    ├── bmad/          # BMAD Framework
    └── [configs]      # Configuration files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Navigate to the code folder and install dependencies
cd code
npm install
```

### Development

```bash
# From code folder:
cd code
npm run dev
```

The development server will start at [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Scripts

All scripts must be run from the `code/` directory:

```bash
cd code

npm run dev     # Start development server
npm run build   # Create production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

## 🏗️ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (Radix UI)
- **Icons:** Lucide React
- **State Management:** React Context API
- **Internationalization:** Custom system (PT-BR, EN, ES)

## 📦 Code Structure (`code/src/`)

```text
src/
├── app/              # Pages and routes (Next.js App Router)
│   ├── layout.tsx    # Main layout
│   ├── page.tsx      # Homepage
│   ├── blog/         # Blog and events
│   ├── contato/      # Contact page
│   ├── disciplinas/  # Courses taught
│   └── publicacoes/  # Academic publications
├── components/
│   ├── common/       # Shared components
│   ├── features/     # Feature-specific components
│   └── ui/           # shadcn/ui components
├── contexts/         # React Contexts
├── hooks/            # Custom hooks
├── lib/              # Utilities and helpers
└── styles/           # Global styles
```

## 📖 Documentation

All project documentation is in the `/docs/` folder:

- **discover/** - Domain research and discovery
- **plan/** - Planning documents
- **solution/** - Technical specifications and guides
- **reports/** - Test reports, stories, PRDs
- **requirements/** - Epics, user stories, requirements

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, improving documentation, or proposing new features, your input is valuable.

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes following [Conventional Commits](https://www.conventionalcommits.org/)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on our code of conduct, development process, and how to submit pull requests.

### Quick Contribution Guidelines

- Follow existing code style (TypeScript + ESLint)
- Update documentation as needed
- Run linter before submitting (`npm run lint`)
- Use CommonMark standards for documentation

## 📝 License

This project is licensed under the **Mozilla Public License 2.0 (MPL-2.0)** - see the [LICENSE](LICENSE) file for complete details.

### What This Means

- ✅ You can use, modify, and distribute this code
- ✅ You can use it in proprietary projects
- ⚠️ You must disclose source code of MPL-2.0 licensed files
- ⚠️ Modified files must carry a notice stating changes made

For more information, visit [Mozilla's MPL 2.0 FAQ](https://www.mozilla.org/en-US/MPL/2.0/FAQ/).

## 👤 Author

@danielvm-git

## 🙏 Acknowledgments

This project is built with excellent open-source tools and frameworks:

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons
- [BMAD Framework](https://github.com/bmad-method) - Business Model Agile Development methodology

Special thanks to the open-source community for making modern web development accessible and enjoyable.

---

**Built with ❤️ using Next.js and TypeScript**

*Making academic knowledge accessible to everyone*
