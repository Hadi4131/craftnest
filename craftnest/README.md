# 🧶 CraftNest E-Commerce Demo

**CraftNest** is a minimalist, aesthetic, and responsive e-commerce web application built to demonstrate modern UI/UX principles. It features advanced animations, 3D navigation, and a fully functional cart system, all wrapped in a "Soft Cream & Peach" brand aesthetic.

![Project Status](https://img.shields.io/badge/Status-Live-success)
![Tech Stack](https://img.shields.io/badge/Next.js-14-black)
![Style](https://img.shields.io/badge/Tailwind-CSS-blue)

---

## ✨ Key Features

### 🎨 **UI & Animations**
*   **Aurora Background:** A smooth, animated gradient background in the hero section.
*   **3D Adaptive Navigation:** A floating "pill" navigation bar that expands on hover using physics-based animations.
*   **Interactive Buttons:** Hover effects with sliding arrows and liquid fills.
*   **Infinite Marquee:** A seamless scrolling text banner for brand messaging.
*   **Draggable Testimonials:** Interactive cards that users can swipe through.

### 🛍️ **E-Commerce Functionality**
*   **Shopping Cart:** A slide-out drawer (Sheet) that persists items in the state.
*   **Quick View:** Click the "Eye" icon to open product details in a modal without leaving the page.
*   **Pricing Switcher:** Toggle between Monthly/Yearly pricing with a confetti celebration effect.
*   **FAQ Section:** Clean accordion-style drop-downs for common questions.

---

## 🛠️ Tech Stack

*   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Components:** [shadcn/ui](https://ui.shadcn.com/) (Built on Radix UI)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Utils:** `clsx`, `tailwind-merge`, `canvas-confetti`

---

## 🚀 Getting Started (Local Development)

Follow these steps to run the project on your local machine.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/craftnest.git
cd craftnest
2. Install Dependencies
Note: We use --legacy-peer-deps to resolve version conflicts between React 18 and some animation libraries.
code
Bash
npm install --legacy-peer-deps
3. Run the Development Server
code
Bash
npm run dev
Open http://localhost:3000 in your browser to see the result.
📂 Project Structure
code
Text
craftnest/
├── src/
│   ├── app/
│   │   ├── globals.css        # Global styles & Tailwind directives
│   │   ├── layout.tsx         # Main app shell
│   │   └── page.tsx           # The main Homepage (Hero, Grid, Cart logic)
│   ├── components/
│   │   └── ui/                # Reusable UI components
│   │       ├── 3d-adaptive-navigation-bar.tsx
│   │       ├── aurora-background.tsx
│   │       ├── faq-section.tsx
│   │       ├── interactive-hover-button.tsx
│   │       ├── marquee.tsx
│   │       ├── pricing.tsx
│   │       ├── sheet.tsx      # Cart Drawer
│   │       └── ... (shadcn primitives)
│   └── lib/
│       └── utils.ts           # Tailwind class merger
├── next.config.mjs            # Next.js config (Unsplash images)
├── tailwind.config.ts         # Color palette & animation config
└── package.json               # Dependencies & Scripts
🌍 Deployment Guide
This project is optimized for deployment on Vercel or Render.
Deploying on Render
Push your code to GitHub.
Create a new Web Service on Render.
Connect your repository.
Critical Settings:
Root Directory: craftnest (If your code is in a subfolder)
Build Command: npm install --legacy-peer-deps && npm run build
Start Command: npm start
Click Deploy.
🎨 Brand Colors
The project uses a custom Tailwind color palette defined in tailwind.config.ts:
Cream: #FFCF9D (Background accents)
Peach: #FFB38E (Soft highlights)
Orange: #FFB26F (Gradients)
Deep: #DE8F5F (Primary buttons & text)
🤝 Credits
Design inspiration from modern minimalism.
UI Primitives by shadcn/ui.
Stock photography via Unsplash.
