# Contributing to Professor Site

Thank you for your interest in contributing to Prof. Mariana Sombrio's academic website! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation Standards](#documentation-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Community](#community)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of experience level, gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js 18+** installed
- **npm** or **pnpm** package manager
- **Git** for version control
- A code editor (VS Code recommended)
- Basic knowledge of:
  - TypeScript
  - React/Next.js
  - Tailwind CSS

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork** locally:

```bash
git clone https://github.com/YOUR_USERNAME/professor-site.git
cd professor-site
```

3. **Add upstream remote**:

```bash
git remote add upstream https://github.com/danielvm-git/professor-site.git
```

4. **Install dependencies**:

```bash
npm run install:code
# or
cd code && npm install
```

5. **Start development server**:

```bash
npm run dev
```

6. **Verify setup** by opening [http://localhost:3000](http://localhost:3000)

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

#### 🐛 Bug Fixes

- Found a bug? Check if it's already reported in Issues
- If not, create a new issue with reproduction steps
- Submit a PR with the fix

#### ✨ New Features

- Discuss the feature in an issue first
- Get approval from maintainers
- Implement the feature following our guidelines
- Submit a PR with tests and documentation

#### 📚 Documentation

- Fix typos or clarify existing docs
- Add missing documentation
- Improve code comments
- Create tutorials or guides

#### 🎨 Design Improvements

- Enhance UI/UX
- Improve accessibility
- Optimize responsive design
- Add theme customizations

#### 🌐 Translations

- Improve existing translations (PT-BR, EN, ES)
- Fix translation inconsistencies
- Suggest new language support

#### 🧪 Testing

- Add missing test coverage
- Improve existing tests
- Add E2E test scenarios

## Development Workflow

### Branch Strategy

We follow a simplified Git workflow:

- `main` - Production-ready code
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates
- `refactor/*` - Code refactoring
- `test/*` - Test improvements

### Working on an Issue

1. **Find or create an issue** describing what you want to work on

2. **Create a branch** from `main`:

```bash
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
```

3. **Make your changes** following our coding standards

4. **Test your changes** thoroughly:

```bash
cd code
npm run lint        # Check code style
npm test            # Run unit tests
npm run test:e2e    # Run E2E tests
npm run build       # Verify build succeeds
```

5. **Commit your changes** using [Conventional Commits](#commit-message-guidelines)

6. **Push to your fork**:

```bash
git push origin feature/your-feature-name
```

7. **Open a Pull Request** on GitHub

## Coding Standards

### TypeScript Guidelines

- **Use TypeScript** for all new code
- **Define proper types** - avoid `any` when possible
- **Use interfaces** for object shapes
- **Export types** when they're used in multiple files

#### Example

```typescript
// Good
interface UserProfile {
  name: string
  email: string
  role: 'professor' | 'student' | 'visitor'
}

function displayProfile(profile: UserProfile): void {
  console.log(profile.name)
}

// Avoid
function displayProfile(profile: any) {
  console.log(profile.name)
}
```

### React/Next.js Guidelines

- **Use functional components** with hooks
- **Prefer Server Components** when possible (Next.js 14 App Router)
- **Use Client Components** only when needed (interactivity, browser APIs)
- **Keep components small** and focused on single responsibility
- **Use custom hooks** for reusable logic

#### Example

```typescript
// Good - Server Component (default)
export default function PublicationsPage() {
  return <div>Publications content</div>
}

// Good - Client Component when needed
'use client'

import { useState } from 'react'

export default function LanguageSelector() {
  const [language, setLanguage] = useState('pt-BR')
  return <select value={language} onChange={(e) => setLanguage(e.target.value)}>...</select>
}
```

### Styling Guidelines

- **Use Tailwind CSS** utility classes
- **Follow existing patterns** in the codebase
- **Use semantic color tokens**: `text-foreground`, `bg-background`, `border-accent`
- **Ensure responsive design**: Use `sm:`, `md:`, `lg:` breakpoints
- **Support dark mode**: Test in both light and dark themes

#### Example

```tsx
// Good - Semantic, responsive, theme-aware
<div className="bg-background text-foreground p-4 md:p-8 border border-accent/20">
  <h1 className="text-2xl md:text-4xl font-bold">Title</h1>
</div>
```

### File Organization

```text
code/src/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Homepage
│   └── [routes]/     # Route folders
├── components/
│   ├── common/       # Shared components (header, footer, layout)
│   ├── features/     # Feature-specific components
│   └── ui/           # shadcn/ui components
├── contexts/         # React Contexts
├── hooks/            # Custom hooks
├── lib/              # Utilities, helpers, constants
└── styles/           # Global styles
```

### Naming Conventions

- **Files**: `kebab-case.tsx` (e.g., `language-selector.tsx`)
- **Components**: `PascalCase` (e.g., `LanguageSelector`)
- **Functions**: `camelCase` (e.g., `getTranslation`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `DEFAULT_LANGUAGE`)
- **Types/Interfaces**: `PascalCase` (e.g., `UserProfile`, `TranslationKey`)

## Testing Guidelines

### Test Coverage Requirements

- **Unit tests** for utility functions and hooks
- **Component tests** for UI components
- **E2E tests** for critical user journeys

### Writing Unit Tests

```typescript
// Example: hooks/use-language.test.ts
import { renderHook } from '@testing-library/react'
import { useLanguage } from './use-language'

describe('useLanguage', () => {
  it('should return default language', () => {
    const { result } = renderHook(() => useLanguage())
    expect(result.current.language).toBe('pt-BR')
  })

  it('should translate keys correctly', () => {
    const { result } = renderHook(() => useLanguage())
    expect(result.current.t('home')).toBe('Início')
  })
})
```

### Writing E2E Tests

```typescript
// Example: tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test'

test('user can navigate to publications page', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Publicações')
  await expect(page).toHaveURL('/publicacoes')
  await expect(page.locator('h1')).toContainText('Publicações')
})

test('language switching works', async ({ page }) => {
  await page.goto('/')
  await page.selectOption('select[aria-label="Language"]', 'en')
  await expect(page.locator('text=Publications')).toBeVisible()
})
```

### Running Tests

```bash
cd code

# Unit tests
npm test

# Unit tests in watch mode
npm test -- --watch

# E2E tests
npm run test:e2e

# E2E tests in headed mode (see browser)
npm run test:e2e -- --headed

# Generate coverage report
npm test -- --coverage
```

## Documentation Standards

All documentation must follow **CommonMark** specification and BMAD documentation standards.

### Documentation Requirements

- **Code comments** for complex logic
- **JSDoc comments** for exported functions
- **README updates** for new features
- **CHANGELOG entries** for user-facing changes

### JSDoc Example

```typescript
/**
 * Translates a key to the current language
 * 
 * @param key - Translation key from translations.ts
 * @param language - Target language (defaults to current)
 * @returns Translated string
 * 
 * @example
 * ```typescript
 * const greeting = translate('welcomeTitle', 'en')
 * // Returns: "Prof. Mariana Sombrio"
 * ```
 */
export function translate(key: TranslationKey, language?: Language): string {
  // Implementation
}
```

### Markdown Standards

- Use ATX-style headers: `#`, `##`, `###`
- Use fenced code blocks with language tags
- Include blank lines between sections
- Use descriptive link text
- Follow [CommonMark spec](https://commonmark.org/)

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `build`: Build system changes

### Examples

```bash
# Feature
feat(i18n): add Spanish translation for blog page

# Bug fix
fix(navigation): resolve mobile menu not closing on route change

# Documentation
docs(readme): update installation instructions

# Breaking change
feat(api)!: change publication data structure

BREAKING CHANGE: Publication interface now requires 'year' field
```

### Commit Best Practices

- **Keep commits atomic** - one logical change per commit
- **Write clear descriptions** - explain what and why, not how
- **Reference issues** - use `Fixes #123` or `Closes #456`
- **Sign commits** if possible (GPG)

## Pull Request Process

### Before Submitting

1. ✅ **Update your branch** with latest `main`:

```bash
git checkout main
git pull upstream main
git checkout your-feature-branch
git rebase main
```

2. ✅ **Run all checks**:

```bash
cd code
npm run lint
npm test
npm run build
```

3. ✅ **Update documentation** if needed

4. ✅ **Add tests** for new features

5. ✅ **Update CHANGELOG.md** for user-facing changes

### PR Title Format

Use Conventional Commits format:

```text
feat: add dark mode toggle to navigation
fix: resolve language selector mobile layout
docs: improve contributing guidelines
```

### PR Description Template

```markdown
## Description

Brief description of changes and motivation.

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Testing

Describe the tests you ran and how to reproduce:

- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)

Add screenshots for UI changes.

## Checklist

- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings or errors
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published
```

### Review Process

1. **Automated checks** must pass (lint, tests, build)
2. **Maintainer review** - at least one approval required
3. **Address feedback** - respond to comments and make requested changes
4. **Final approval** - maintainer will merge when ready

### After Merge

- Delete your feature branch
- Pull latest `main`
- Celebrate your contribution! 🎉

## Reporting Issues

### Before Creating an Issue

1. **Search existing issues** - your issue might already exist
2. **Check documentation** - ensure it's not a usage question
3. **Verify it's reproducible** - can you consistently reproduce it?

### Bug Report Template

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g., macOS 14.0]
 - Browser: [e.g., Chrome 120, Safari 17]
 - Node version: [e.g., 18.17.0]
 - npm version: [e.g., 9.8.1]

**Additional context**
Any other context about the problem.
```

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem. Ex. I'm frustrated when [...]

**Describe the solution you'd like**
Clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions or features you've considered.

**Additional context**
Any other context, screenshots, or examples.
```

## Community

### Getting Help

- **GitHub Issues** - For bugs and feature requests
- **Discussions** - For questions and general discussion
- **Email** - Contact Prof. Sombrio through the website

### Recognition

Contributors will be recognized in:
- Project README acknowledgments
- Release notes for significant contributions
- GitHub contributor graph

### Stay Updated

- **Watch the repository** for notifications
- **Star the project** to show support
- **Share with others** who might be interested

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [CommonMark Specification](https://commonmark.org/)
- [BMAD Framework Docs](https://github.com/bmad-method)

---

**Thank you for contributing to making academic knowledge more accessible!**

For questions about these guidelines, please open an issue or discussion.

