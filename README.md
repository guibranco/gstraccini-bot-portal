# 🤖 GStraccini Bot Portal

<div align="center">

![GStraccini Bot Logo](https://via.placeholder.com/200x200/3B82F6/FFFFFF?text=🤖)

**A modern, responsive web portal for managing GitHub automation workflows**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[🚀 Live Demo](https://portal.gstraccini.bot) • [📖 Documentation](https://docs.bot.straccini.com) • [🐛 Report Bug](https://github.com/guibranco/gstraccini-bot-portal/issues) • [✨ Request Feature](https://github.com/guibranco/gstraccini-bot-portal/issues)

</div>

---

## 🌟 Overview

GStraccini Bot Portal is a sophisticated web application that provides a comprehensive dashboard for managing GitHub automation workflows. Built with modern React and TypeScript, it offers an intuitive interface for developers to monitor repositories, manage pull requests, track issues, and configure automated workflows.

### ✨ Key Features

- 🎯 **Comprehensive Dashboard** - Real-time overview of repositories, PRs, and issues
- 🔐 **Secure Authentication** - GitHub OAuth with 2FA and FIDO support
- 📊 **Advanced Analytics** - Detailed insights into code quality and workflow performance
- 🔧 **Integration Management** - Seamless third-party service integrations
- 🎨 **Modern UI/UX** - Responsive design with dark mode support
- ⚡ **Real-time Updates** - Live notifications and status updates
- 🛡️ **Security First** - Enterprise-grade security and privacy protection

---

## 🏗️ Architecture

### 📁 Project Structure

```
src/
├── 📁 components/           # Reusable UI components
│   ├── 📁 account/         # Account management components
│   │   ├── FIDOSection.tsx
│   │   ├── InstallationsSection.tsx
│   │   ├── PasswordSection.tsx
│   │   ├── ProfileSection.tsx
│   │   └── TwoFactorSection.tsx
│   ├── 📁 dashboard/       # Dashboard-specific components
│   │   ├── ContentGrid.tsx
│   │   ├── StatsGrid.tsx
│   │   └── WelcomeSection.tsx
│   ├── 📁 integrations/    # Integration management components
│   │   ├── AddIntegration.tsx
│   │   ├── IntegrationHistoryModal.tsx
│   │   ├── IntegrationsList.tsx
│   │   └── integrationData.ts
│   ├── 📁 notifications/   # Notification system components
│   │   ├── NotificationFilters.tsx
│   │   ├── NotificationItem.tsx
│   │   └── NotificationList.tsx
│   ├── 📁 pullrequest/     # Pull request specific components
│   │   ├── CheckRunDiagram.tsx
│   │   └── WorkflowRunDiagram.tsx
│   ├── 📁 pullrequests/    # Pull requests listing components
│   │   ├── PullRequestFilters.tsx
│   │   ├── PullRequestGroup.tsx
│   │   └── PullRequestItem.tsx
│   ├── 📁 repository/      # Repository management components
│   │   ├── BranchesSection.tsx
│   │   ├── BranchProtectionSection.tsx
│   │   ├── IntegrationsSection.tsx
│   │   ├── LatestReleaseSection.tsx
│   │   ├── PagesSection.tsx
│   │   ├── RepositoryHeader.tsx
│   │   ├── RulesetsSection.tsx
│   │   └── WorkflowsSection.tsx
│   ├── 📁 settings/        # Settings and configuration components
│   │   ├── IntegrationsSettings.tsx
│   │   ├── IssuesSettings.tsx
│   │   ├── PullRequestsSettings.tsx
│   │   ├── RepositorySettings.tsx
│   │   ├── SettingsCard.tsx
│   │   ├── SettingToggle.tsx
│   │   └── TrustedSendersSettings.tsx
│   ├── ActivityList.tsx    # Activity feed component
│   ├── BulletDiagram.tsx   # Timeline visualization component
│   ├── CommandsSection.tsx # Available commands display
│   ├── FeaturesGrid.tsx    # Features showcase grid
│   ├── Footer.tsx          # Application footer
│   ├── Header.tsx          # Navigation header
│   ├── IssuesList.tsx      # Issues listing component
│   ├── LandingFooter.tsx   # Landing page footer
│   ├── LandingHeader.tsx   # Landing page header
│   ├── PendingActions.tsx  # Pending actions display
│   ├── PullRequestsList.tsx # Pull requests listing
│   ├── StatCard.tsx        # Statistics card component
│   └── TokenSelect.tsx     # Multi-select token input
├── 📁 context/             # React context providers
│   └── AuthContext.tsx     # Authentication context
├── 📁 layouts/             # Layout components
│   ├── AuthenticatedLayout.tsx # Authenticated user layout
│   └── PublicLayout.tsx    # Public pages layout
├── 📁 pages/               # Page components
│   ├── Account.tsx         # Account management page
│   ├── Auth.tsx           # Authentication page
│   ├── Dashboard.tsx      # Main dashboard page
│   ├── ForgotPassword.tsx # Password recovery page
│   ├── Integrations.tsx   # Integrations management page
│   ├── Issues.tsx         # Issues listing page
│   ├── Landing.tsx        # Landing page
│   ├── Notifications.tsx  # Notifications page
│   ├── Privacy.tsx        # Privacy policy page
│   ├── PullRequestDetail.tsx # Pull request details page
│   ├── PullRequests.tsx   # Pull requests listing page
│   ├── Repositories.tsx   # Repositories listing page
│   ├── RepositoryDetail.tsx # Repository details page
│   ├── Security.tsx       # Security information page
│   ├── Settings.tsx       # Settings page
│   ├── Status.tsx         # System status page
│   └── Terms.tsx          # Terms of service page
├── 📁 utils/               # Utility functions
│   ├── avatar.ts          # Avatar URL utilities
│   └── events.ts          # Event processing utilities
├── App.tsx                # Main application component
├── index.css              # Global styles
├── main.tsx               # Application entry point
├── mockData.ts            # Mock data for development
├── types.ts               # TypeScript type definitions
└── vite-env.d.ts          # Vite environment types
```

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **Git** for version control

### ⚡ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/guibranco/gstraccini-bot-portal.git
   cd gstraccini-bot-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready application |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run test` | Run test suite with Vitest |
| `npm run test:coverage` | Run tests with coverage report |

---

## 🎨 Tech Stack

### 🏗️ Core Technologies

- **[React 18.3.1](https://reactjs.org/)** - Modern UI library with hooks and concurrent features
- **[TypeScript 5.5.3](https://www.typescriptlang.org/)** - Type-safe JavaScript development
- **[Vite 5.4.2](https://vitejs.dev/)** - Lightning-fast build tool and dev server
- **[React Router 6.22.3](https://reactrouter.com/)** - Declarative routing for React

### 🎨 Styling & UI

- **[TailwindCSS 3.4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon library
- **[Floating UI](https://floating-ui.com/)** - Advanced positioning for tooltips and dropdowns

### 🧪 Development & Testing

- **[Vitest](https://vitest.dev/)** - Fast unit testing framework
- **[ESLint](https://eslint.org/)** - Code linting and quality assurance
- **[Prettier](https://prettier.io/)** - Code formatting and style consistency
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript-specific linting rules

### 🔧 Build & Deployment

- **[SWC](https://swc.rs/)** - Fast TypeScript/JavaScript compiler
- **[PostCSS](https://postcss.org/)** - CSS processing and optimization
- **[Autoprefixer](https://autoprefixer.github.io/)** - Automatic CSS vendor prefixing

---

## 🌟 Features

### 🎯 Dashboard & Analytics
- **Real-time Statistics** - Live metrics for repositories, PRs, and issues
- **Activity Timeline** - Chronological view of all repository activities
- **Performance Insights** - Detailed analytics on workflow efficiency
- **Custom Widgets** - Configurable dashboard components

### 🔐 Security & Authentication
- **GitHub OAuth Integration** - Secure authentication via GitHub
- **Multi-Factor Authentication** - FIDO2, TOTP, and recovery codes support
- **Session Management** - Secure session handling and automatic expiration
- **Permission Controls** - Granular access control for repositories

### 🔧 Repository Management
- **Branch Protection** - Configure and manage branch protection rules
- **Workflow Automation** - Set up and monitor GitHub Actions workflows
- **Integration Hub** - Connect with SonarCloud, Codacy, Snyk, and more
- **Release Management** - Track and manage repository releases

### 📊 Pull Request & Issue Tracking
- **Advanced Filtering** - Filter by status, labels, assignees, and more
- **Bulk Operations** - Perform actions on multiple items simultaneously
- **Timeline Visualization** - Visual representation of PR/issue lifecycle
- **Automated Workflows** - Set up automated responses and actions

### 🔔 Notifications & Alerts
- **Real-time Notifications** - Instant updates on important events
- **Custom Filters** - Configure notification preferences
- **Priority Levels** - Categorize notifications by importance
- **Email Integration** - Optional email notifications for critical events

---

## 🎨 Design System

### 🌈 Color Palette

- **Primary**: Blue (`#3B82F6`) - Actions, links, and primary elements
- **Success**: Green (`#10B981`) - Success states and positive actions
- **Warning**: Yellow (`#F59E0B`) - Warnings and pending states
- **Error**: Red (`#EF4444`) - Errors and destructive actions
- **Neutral**: Gray (`#6B7280`) - Text and neutral elements

### 🎭 Dark Mode Support

The application features a comprehensive dark mode implementation with:
- **System Preference Detection** - Automatically adapts to user's system theme
- **Manual Toggle** - Users can override system preference
- **Persistent Settings** - Theme preference saved in localStorage
- **Smooth Transitions** - Animated theme switching

### 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Enhanced experience on tablets
- **Desktop Optimization** - Full-featured desktop interface
- **Flexible Layouts** - Adaptive grid systems and components

---

## 🔧 Configuration

### 🌍 Environment Variables

Create a `.env` file in the root directory:

```env
# GitHub OAuth Configuration
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_GITHUB_REDIRECT_URI=http://localhost:5173/auth/callback

# API Configuration
VITE_API_BASE_URL=https://api.gstraccini.bot
VITE_API_VERSION=v1

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_DARK_MODE=true
```

### ⚙️ Build Configuration

The project uses Vite with SWC for optimal performance:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

---

## 🧪 Testing

### 🎯 Testing Strategy

- **Unit Tests** - Component and utility function testing
- **Integration Tests** - Feature workflow testing
- **E2E Tests** - Complete user journey testing
- **Visual Regression** - UI consistency testing

### 📊 Coverage Reports

Generate detailed coverage reports:

```bash
npm run test:coverage
```

Coverage reports are generated in the `coverage/` directory with:
- **HTML Reports** - Interactive coverage visualization
- **JSON Reports** - Machine-readable coverage data
- **LCOV Reports** - Integration with external tools

---

## 🚀 Deployment

### 🌐 Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### 📦 Docker Support

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### ☁️ Deployment Platforms

The application is optimized for deployment on:
- **Vercel** - Zero-configuration deployment
- **Netlify** - Continuous deployment from Git
- **AWS S3 + CloudFront** - Scalable static hosting
- **Docker** - Containerized deployment

---

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### 🔄 Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### 📝 Code Standards

- **TypeScript** - All code must be properly typed
- **ESLint** - Follow the configured linting rules
- **Prettier** - Use consistent code formatting
- **Testing** - Include tests for new features
- **Documentation** - Update documentation for changes

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **GitHub** - For providing the platform and APIs
- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite Team** - For the lightning-fast build tool
- **Open Source Community** - For the incredible tools and libraries

---

## 📞 Support

- 📧 **Email**: [support@gstraccini-bot.com](mailto:support@gstraccini-bot.com)
- 📖 **Documentation**: [docs.bot.straccini.com](https://docs.bot.straccini.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/guibranco/gstraccini-bot-portal/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/guibranco/gstraccini-bot-portal/discussions)

---

<div align="center">

**Made with ❤️ by the GStraccini Bot Team**

[⭐ Star this repository](https://github.com/guibranco/gstraccini-bot-portal) if you find it helpful!

</div>