<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
fitness-tracker-social-mvp
</h1>
<h4 align="center">A social fitness tracker web app for setting goals, tracking progress, and connecting with others.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="Framework used: Next.js">
  <img src="https://img.shields.io/badge/Frontend-TypeScript,_HTML,_CSS-red" alt="Frontend technologies: TypeScript, HTML, CSS">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Backend technology: Node.js">
  <img src="https://img.shields.io/badge/Database-PostgreSQL-black" alt="Database: PostgreSQL">
  <img src="https://img.shields.io/badge/State%20Management-Zustand-green" alt="State Management: Zustand">
  <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS-blue" alt="Styling: Tailwind CSS">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/fitness-tracker-social-mvp?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/fitness-tracker-social-mvp?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/fitness-tracker-social-mvp?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>


## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository houses the Minimum Viable Product (MVP) for a social fitness tracker web application. It utilizes a combination of frontend technologies (React, TypeScript, HTML, CSS, Tailwind CSS) and backend components (Node.js, Express) to deliver a user-friendly platform for setting fitness goals, monitoring progress, and connecting with others. The application also integrates with third-party APIs for authentication and data synchronization, enhancing its functionality and user experience.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🔑 | **User Authentication** | Securely onboard users with email/password logins or social media integration (e.g., Google, Facebook). Users can create profiles, manage their information, and update their privacy settings. |
| 🎯 | **Goal Setting**       | Users can set specific fitness goals (e.g., weight loss, muscle gain, distance targets, activity frequency). Goals are categorized and include target values, deadlines, and optional descriptions.  |
| 📊 | **Progress Tracking**   | Allows users to record workouts, track calories, and monitor progress towards their goals. It displays data visually through charts, graphs, and summaries. |
| 🤝 | **Social Sharing**     | Users can connect with friends, follow other fitness enthusiasts, share progress updates, and engage in group challenges. |

## 📂 Structure
```text
fitness-tracker-social-mvp
├── components
│   ├── Button.tsx
│   ├── Header.tsx
│   ├── Layout.tsx
│   ├── GoalInput.tsx
│   ├── ProgressChart.tsx
│   └── SocialShareButton.tsx
├── pages
│   ├── api
│   │   ├── auth.ts
│   │   ├── goals.ts
│   │   └── progress.ts
│   ├── _app.tsx
│   ├── index.tsx
│   ├── dashboard.tsx
│   └── login.tsx
├── styles
│   └── global.css
├── utils
│   ├── helpers.ts
│   ├── api.ts
│   ├── auth.ts
│   └── validation.ts
├── config
│   └── next-auth.config.ts
├── middleware
│   └── authentication.ts
├── .env
├── package.json
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## 💻 Installation
### 🔧 Prerequisites
- Node.js (v18 or later)
- npm (or yarn)

### 🚀 Setup Instructions
1. Clone the repository:
   - `git clone https://github.com/coslynx/fitness-tracker-social-mvp.git`
2. Navigate to the project directory:
   - `cd fitness-tracker-social-mvp`
3. Install dependencies:
   - `npm install`

## 🏗️ Usage
### 🏃‍♂️ Running the Development Server
1. Start the development server:
   - `npm run dev`
2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### ⚙️ Configuration
- **Environment Variables:**  Create a `.env.local` file in the root directory and set the following environment variables:
    - `NEXT_PUBLIC_API_URL`: The URL of your backend API.
    - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Your Google Client ID for social login.
    - `NEXT_PUBLIC_GOOGLE_CLIENT_SECRET`: Your Google Client Secret for social login.
    - `DATABASE_URL`: The URL of your PostgreSQL database.

- **Database Setup:** Set up a PostgreSQL database and configure the connection details in the `.env.local` file.

- **Authentication:** Configure NextAuth.js in `config/next-auth.config.ts` to enable authentication.

### 📚 Examples
- **User Registration and Login:** 
    - Visit the login page ([http://localhost:3000/login](http://localhost:3000/login)).
    - Create a new account or log in with an existing account.
- **Setting Goals:** 
    - Navigate to the dashboard ([http://localhost:3000/dashboard](http://localhost:3000/dashboard)).
    - Click the "Add Goal" button and set your fitness goals.
- **Tracking Progress:**
    - On the dashboard, record your workouts and track your progress towards your goals.
    - View your progress visually using the charts and graphs.
- **Social Features:**
    - Connect with friends, follow other users, and engage in group challenges.
    - Share your progress updates and interact with the community.

## 🌐 Hosting
### 🚀 Deployment Instructions
#### Vercel
1. Sign up for a Vercel account.
2. Initialize a new Vercel project using the Vercel CLI:
   - `vercel init`
3. Select the Next.js framework.
4. Deploy your application:
   - `vercel deploy`

#### Netlify
1. Sign up for a Netlify account.
2. Initialize a new Netlify project using the Netlify CLI:
   - `netlify init`
3. Select your Git provider and repository.
4. Deploy your application:
   - `netlify deploy`

#### GitHub Pages
1. Create a new repository on GitHub.
2. Configure your repository to use GitHub Pages by navigating to "Settings" -> "Pages" and selecting the "main" branch.
3. Build your application (using the `npm run build` command) and push the resulting build output (usually a `dist` folder) to the `gh-pages` branch of your repository. 

#### AWS
1. Create an AWS account.
2. Deploy your Next.js application using AWS services like AWS Elastic Beanstalk or AWS Lambda functions.
3. Configure AWS S3 to host static files and CloudFront for content delivery.

#### Google Cloud
1. Create a Google Cloud account.
2. Deploy your Next.js application using Google Cloud services like Google App Engine or Google Cloud Functions.
3. Configure Google Cloud Storage to host static files and Google Cloud CDN for content delivery.

### 🔑 Environment Variables
- `NEXT_PUBLIC_API_URL`: The URL of your backend API.
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Your Google Client ID for social login.
- `NEXT_PUBLIC_GOOGLE_CLIENT_SECRET`: Your Google Client Secret for social login.
- `DATABASE_URL`: The URL of your PostgreSQL database.

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors
- **Author Name** - [CosLynx.com](https://coslynx.com)
- **Creator Name** - [CosLynxAI](https://github.com/coslynx)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
<img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
<img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
</div>