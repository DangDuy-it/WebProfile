## Project Structure

```text
Profile/                                # Root workspace
|-- eslint.config.js                    # ESLint config chung
|-- package.json                        # Scripts/deps root
|-- README.md                           # Tai lieu tong quan
|-- Profile_Backend/                    # Node.js + TypeScript API
|   |-- package.json                    # Deps backend
|   |-- tsconfig.json                   # Cau hinh TypeScript backend
|   `-- src/                            # Source code backend
|       |-- index.ts                    # Entry point server
|       |-- config/                     # Cau hinh he thong
|       |   |-- db.ts                   # Ket noi database
|       |   `-- passport.ts             # Cau hinh xac thuc
|       |-- controllers/                # Business logic cho tung module
|       |   |-- contactsControllers.ts
|       |   |-- profileControllers.ts
|       |   |-- projectsControllers.ts
|       |   `-- skillsControllers.ts
|       |-- middleware/                 # Middleware dung chung
|       `-- routes/                     # Dinh nghia API routes
|           |-- contactsRoutes.ts
|           |-- profileRoutes.ts
|           |-- projectsRoutes.ts
|           `-- skillsRoutes.ts
`-- Profile_Frontend/                   # React + Vite client
    |-- index.html                      # HTML shell
    |-- package.json                    # Deps frontend
    |-- tsconfig.app.json               # TS config app
    |-- tsconfig.json                   # TS config tong
    |-- tsconfig.node.json              # TS config node tools
    |-- vite.config.ts                  # Cau hinh Vite
    |-- public/                         # Static assets
    |   `-- assets/
    `-- src/                            # Source code frontend
        |-- App.css
        |-- App.tsx                     # Root component
        |-- index.css                   # Global styles
        |-- main.tsx                    # Entry point React
        |-- components/                 # Reusable components
        |   |-- layout/
        |   |   `-- Navbar.tsx
        |   |-- layouts/
        |   |   |-- AdminLayout.tsx
        |   |   |-- AuthLayout.tsx
        |   |   `-- MainLayout.tsx
        |   `-- ui/
        |-- contexts/                   # React contexts
        |   `-- ThemeContext.tsx
        |-- pages/                      # Route-level pages
        |   |-- About.tsx
        |   |-- AdminDashboard.tsx
        |   |-- Contact.tsx
        |   |-- Home.tsx
        |   |-- HomePage.tsx
        |   |-- LoginFail.tsx
        |   |-- Projects.tsx
        |   `-- Skills.tsx
        |-- sections/                   # Page sections
        |   |-- AboutSection.tsx
        |   |-- ContactSection.tsx
        |   |-- HeroSection.tsx
        |   `-- SkillSection.tsx
        `-- styles/                     # CSS theo page/feature
            |-- About.css
            |-- AdminDashboard.css
            |-- Contact.css
            |-- Home.css
            |-- LoginFail.css
            |-- Navbar.css
            |-- Projects.css
            `-- Skills.css
```
