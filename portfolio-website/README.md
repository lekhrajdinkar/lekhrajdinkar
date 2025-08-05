# Portfolio Website

A modern Angular portfolio website showcasing software engineering, data engineering, and platform engineering projects.

## Features

- 🎨 **Dark/Light Theme Toggle**
- 🔍 **Global Search** - Search through projects
- 📱 **Responsive Design** - Works on all devices
- 🎭 **3D Animations** - Interactive particle system
- 📊 **Dynamic Content** - Loads from YAML files
- 🎯 **Modal Dialogs** - Detailed project views

## Components

- **Header** - Navigation with search and theme toggle
- **Sidebar** - Navigation menu and social links
- **Dashboard** - Main content area with projects, skills, and experience
- **Card** - Reusable project cards
- **Dialog** - Modal for project details
- **3D Animation** - Background particle animation

## Tech Stack

- Angular 17+ (Standalone Components)
- TypeScript
- SCSS
- Canvas API for animations
- YAML for data storage

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start development server:
   \`\`\`bash
   npm start
   \`\`\`

3. Open http://localhost:4200

## Project Structure

\`\`\`
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   ├── sidebar/
│   │   ├── dashboard/
│   │   ├── card/
│   │   ├── dialog/
│   │   └── animation/
│   └── services/
│       ├── theme.service.ts
│       └── data.service.ts
└── assets/
    └── yaml/
        └── projects.yaml
\`\`\`

## Customization

Edit \`src/assets/yaml/projects.yaml\` to add your own projects, skills, and experience.

## Build

\`\`\`bash
npm run build
\`\`\`

The build artifacts will be stored in the \`dist/\` directory.