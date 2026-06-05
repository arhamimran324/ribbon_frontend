# Ribbon & Bow Frontend

A modern, feature-rich e-commerce frontend application built with **Next.js 15**, **React 19**, and **TypeScript**. This project delivers a seamless shopping experience with advanced UI components, payment integration, and comprehensive state management.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- **Modern UI Framework**: Built with shadcn/ui and Radix UI components for accessibility and consistency
- **Payment Integration**: Stripe integration for secure payment processing
- **State Management**: Redux Toolkit with Redux Persist for robust state handling
- **Form Handling**: React Hook Form with Zod validation for type-safe forms
- **Rich Components**: 
  - Image galleries with react-image-gallery
  - Multi-carousel support with Embla Carousel and React Multi Carousel
  - OTP input for authentication
  - Rating and review system
  - Phone input with international support
  - Type animation for engaging UI
  - Toast notifications with Sonner
- **Responsive Design**: Tailwind CSS with custom animations for mobile-first responsive layouts
- **Dark Mode**: Built-in theme switching with next-themes
- **Performance**: Optimized with Next.js 15 and Turbopack for fast development and production builds
- **Shopping Cart**: Integrated cart management with react-use-cart
- **Accessibility**: Radix UI primitives ensure WCAG compliance and keyboard navigation

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 15, React 19 |
| **Language** | TypeScript (10.8%), JavaScript (87.4%) |
| **Styling** | Tailwind CSS (1.8%), CSS, Tailwind Merge |
| **Component Library** | shadcn/ui, Radix UI |
| **Form Management** | React Hook Form, Hook Form Resolvers, Zod |
| **State Management** | Redux Toolkit, Redux Persist, React Redux |
| **Payment** | Stripe, @stripe/react-stripe-js |
| **UI Components** | Lucide React Icons, Embla Carousel, React Multi Carousel, Slick Carousel |
| **Utilities** | Axios, Date-fns, js-cookie, Clsx, Class Variance Authority |
| **Development** | ESLint, TypeScript, Tailwind CSS PostCSS |

---

## 📁 Project Structure

```
ribbon_frontend/
├── app/                    # Next.js app directory
├── components/             # Reusable React components
├── pages/                  # Page components
├── lib/                    # Utility functions and helpers
├── styles/                 # Global and component styles
├── public/                 # Static assets
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── next.config.js          # Next.js configuration
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arhamimran324/ribbon_frontend.git
   cd ribbon_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   NEXT_PUBLIC_API_URL=your_api_url
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack for fast HMR |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint to check code quality |

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# API Configuration
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_API_TIMEOUT=10000

# App Configuration
NEXT_PUBLIC_APP_NAME=Ribbon & Bow
```

### Tailwind CSS

Tailwind CSS is configured with custom animations and Tailwind Merge for utility class conflicts resolution. See `tailwind.config.js` for customization.

### Redux Persist

Redux state is persisted to localStorage by default. Configure in your Redux store setup for custom persistence options.

---

## 📦 Core Dependencies

### UI & Components
- **shadcn/ui** (v0.0.4) - High-quality React components
- **Radix UI** - Unstyled, accessible components
- **Lucide React** (v0.510.0) - Icon library

### Forms & Validation
- **React Hook Form** (v7.56.4) - Performant form handling
- **Zod** (v3.25.67) - TypeScript-first schema validation

### State Management
- **Redux Toolkit** (v2.9.0) - State management
- **Redux Persist** (v6.0.0) - Persist Redux store

### Payment
- **Stripe** (v19.1.0) - Payment processing

### Carousels & Galleries
- **Embla Carousel** (v8.6.0)
- **React Multi Carousel** (v2.8.6)
- **React Image Gallery** (v1.4.0)

### Utilities
- **Axios** (v1.12.2) - HTTP client
- **Date-fns** (v3.6.0) - Date utilities
- **next-themes** (v0.4.6) - Theme management

See `package.json` for the complete list of dependencies.

---

## 🔧 Development Workflow

### Code Quality

- **ESLint** is configured for code linting
- **TypeScript** ensures type safety
- Run `npm run lint` before committing changes

### Hot Module Replacement

This project uses **Turbopack** (Next.js bundler) for extremely fast HMR during development.

### Building for Production

```bash
npm run build
npm run start
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```

3. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Open a Pull Request**

Please ensure all tests pass and code is properly linted before submitting a PR.

---

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## 📞 Support

For issues, questions, or suggestions, please:
- Open an [issue on GitHub](https://github.com/arhamimran324/ribbon_frontend/issues)
- Contact the development team

---

## 🎯 Roadmap

- [ ] Enhanced SEO optimization
- [ ] Progressive Web App (PWA) support
- [ ] Advanced analytics integration
- [ ] Multi-language support (i18n)
- [ ] Performance optimizations
- [ ] Additional payment gateways

---

**Built with ❤️ by the Ribbon & Bow team**
