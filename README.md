# _“The Pie Paradise”_

Available languages:
[English](./README.md) | [Svenska](./README_SE.md)

---

## Home Page

![G5 - HomePage Image]<img width="2938" height="3714" alt="homepage" src="https://github.com/user-attachments/assets/cd83ccca-4f0e-48d0-a656-66c7842ff6c3" />

## Recipe Page

![G5 - RecipePage Image]<img width="2938" height="3746" alt="recipepage" src="https://github.com/user-attachments/assets/c03491cc-1a22-477e-ba70-5a01ff757bee" />

---

**Frontend web application** developed as part of the _ITHS Software Development Program_ (Java & JavaScript).
The project implements a complete recipe website built with **React**, following **SSDLC principles (Secure Software Development Life Cycle)** and tested with **Vitest**, **React Testing Library**, and **Playwright**.
The application is fully integrated with **GitHub Actions (CI/CD)** and deployed via **Netlify**.

---

## Table of Contents

- [_“The Pie Paradise”_](#the-pie-paradise)
  - [Home Page](#home-page)
  - [Recipe Page](#recipe-page)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
    - [Main Views](#main-views)
  - [Tech Stack](#tech-stack)
  - [Features and Functionality](#features-and-functionality)
    - [🎯 User Flows](#-user-flows)
    - [💡 Error Handling \& UX Resilience](#-error-handling--ux-resilience)
  - [Security and SSDLC](#security-and-ssdlc)
  - [Testing and Quality Assurance](#testing-and-quality-assurance)
  - [CI/CD Workflow](#cicd-workflow)
  - [Project Structure](#project-structure)
  - [Team and Roles](#team-and-roles)
  - [Project Status](#project-status)
  - [License](#license)

---

## Project Overview

**G5-Recipes (“Pie Paradise”)** is a responsive web application that retrieves recipe data from an external REST API and dynamically renders it using React.
Users can browse recipes, search by keyword, filter by category, view detailed cooking instructions, rate recipes, and post comments.

### Main Views

|  #  | View              | Route                       | Description                                   |
| :-: | :---------------- | :-------------------------- | :-------------------------------------------- |
|  1  | **Home Page**     | `/`                         | Lists all recipes, search bar, and categories |
|  2  | **Category Page** | `/categories/:categoryName` | Filters recipes by selected category          |
|  3  | **Recipe Page**   | `/recipes/:recipeId`        | Displays ingredients, rating, and comments    |
|  4  | **404 Page**      | `*`                         | Handles invalid routes                        |

---

## Tech Stack

|  #  | Area                  | Technology / Framework                              |
| :-: | :-------------------- | :-------------------------------------------------- |
|  1  | **Frontend**          | React 19 + React Router 7                           |
|  2  | **Build Tool**        | Vite 7                                              |
|  3  | **Testing**           | Vitest + React Testing Library + Playwright         |
|  4  | **CI/CD**             | GitHub Actions + Netlify                            |
|  5  | **Code Quality**      | ESLint 9 + Prettier 3                               |
|  6  | **Security Analysis** | OWASP ZAP Baseline Scan (in CI)                     |
|  7  | **Deployment**        | Netlify (Cache-Control headers and secure delivery) |

---

## Features and Functionality

### 🎯 User Flows

1. **Browse Recipes** – the homepage lists all recipes with name, image, rating, and preparation time.
2. **Search** – real-time client-side filtering via querystring (`?search=`).
3. **Filter by Category** – clicking a category navigates to `/categories` and highlights the active category.
4. **Recipe Details** – shows name, description, ingredients, difficulty, and preparation time.
5. **Rating System** – users can rate recipes (1–5 stars); a thank-you message appears upon submission.
6. **Comments** – form with validation and sanitization; previous comments are listed with name and date.

### 💡 Error Handling & UX Resilience

- Clear error messages (e.g., _“Failed to fetch recipes.”_)
- **Retry buttons** allow recovery from API failures without reload.
- Skeleton loaders during slow responses.
- Dedicated 404 page for invalid routes.

---

## Security and SSDLC

The project adheres to the **TESTPLAN_SSDLC_RECEPTSAJTEN** and **G5 Threat Analysis** standards.

|  #  | Security Area                             | Control / Implementation                                                                 | Framework          |
| :-: | :---------------------------------------- | :--------------------------------------------------------------------------------------- | :----------------- |
|  1  | **OWASP A03 – XSS / Injection**           | Input validation (`inputPolicies.js`), sanitization (`sanitizeInput.js`), React escaping | OWASP / STRIDE (I) |
|  2  | **OWASP A05 – Security Misconfiguration** | CSP & CORS, secure Netlify headers, no sensitive data in `localStorage`                  | OWASP              |
|  3  | **OWASP A08 – Supply Chain Integrity**    | `npm audit --audit-level=high`, version locking via `package-lock.json`                  | OWASP              |
|  4  | **STRIDE S – Spoofing**                   | `sanitizeSearchQuery()` + React escaping prevents forged querystrings                    | STRIDE             |
|  5  | **STRIDE T – Tampering**                  | DTO validation (`Recipe.fromJSON()`) ensures data integrity                              | STRIDE             |
|  6  | **STRIDE I – Information Disclosure**     | Generic UI errors; DTO filters fields; no stack traces exposed                           | STRIDE             |
|  7  | **DoS Resilience**                        | Retry logic and asynchronous requests prevent UI blocking                                | SSDLC              |

**Trust Boundaries:**
Browser ↔ Frontend ↔ Backend API

**Improvement Areas:**

- Partial protection against _provenance spoofing_ (URL source validation)
- Reduced logging in production environments

---

## Testing and Quality Assurance

The project includes complete **unit**, **integration**, and **end-to-end** test coverage, plus automated security scanning.

|  #  | Test Level            | Framework                   | Focus                                                          |
| :-: | :-------------------- | :-------------------------- | :------------------------------------------------------------- |
|  1  | **Unit Tests**        | Vitest                      | Utility functions, DTOs, validation, sanitization              |
|  2  | **Integration Tests** | React Testing Library       | Component flows – SearchBar, CommentForm, RecipeCard, etc.     |
|  3  | **E2E Tests**         | Playwright (Chromium)       | User flows – search, retry, category filtering, XSS protection |
|  4  | **Security Tests**    | OWASP ZAP Baseline          | Automated vulnerability scanning in CI                         |
|  5  | **Quality Checks**    | ESLint, Prettier, npm audit | Code style, formatting, dependency security                    |

> ✅ All checks run automatically through **GitHub Actions** on every push to `dev`.

---

## CI/CD Workflow

1. **Push → CI Pipeline**
   - Lint → Prettier → npm audit → Build → Unit & E2E Tests → ZAP Scan

2. **Pull Request Review**
   - Code and security peer review before merge

3. **Deployment → Netlify**
   - Automatic production deployment with secure headers

4. **Incident Response**
   - Data breach notification within 72 hours (IMY compliance)

---

## Project Structure

Simplified overview (see `docs/[~TREE~].MD` for full details):

```
G5-Recipes/
├── src/
│   ├── pages/          # HomePage, CategoryPage, RecipePage, NotFoundPage
│   ├── components/     # UI components (RecipeCard, CommentForm, Header, etc.)
│   ├── api/            # API client + DTO classes
│   ├── utils/          # Validation, sanitization, filtering helpers
│   ├── test/           # unit/, integration/, e2e/
│   └── styles/         # tokens.css, base.css, layout.css
├── .github/workflows/ci.yml
├── netlify.toml
└── package.json
```

---

## Team and Roles

**Project Management**

- Chiman Delwood
- Jonas Rosen
- Kelly Fredriksson
- Nabila Zekry

**Developers**

- Belle Sangthong
- Max Eriksson
- Sandra Boerma
- Sirak Kahsay

---

## Project Status

This repository represents the final version of the G5-Recipes project, developed collaboratively by Group 5 at ITHS as part of the Agile Development course.
All functionality and design reflect the team’s shared work and decisions up to the defined Definition of Done (DoD) milestone.

Future developers are warmly welcome to fork this repository and continue experimenting, learning, or evolving the project further — but please note that the main branch is preserved to honor the team’s original contribution.

---

## License

**MIT License © 2025 G5-Recipes Team**

---
