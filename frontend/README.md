# Bespoke Matchmaking Platform - Frontend

A React.js frontend application for the bespoke matchmaking platform, designed specifically for African women in the UK.

## 🎨 Design Philosophy

### Core Themes
- **Calm and Trustworthy**: Soft pastels, warm neutrals, and gentle corals
- **Minimalist & Intuitive**: Clean, uncluttered layouts with clear navigation
- **Safety & Privacy**: Prominent privacy controls and trust indicators
- **Female-Centric**: Designed with women's safety and empowerment in mind
- **Inclusivity**: Diverse representation and customizable preferences
- **Accessibility**: High-contrast options, scalable fonts, and keyboard navigation

### Design System
Our custom design system is built on Tailwind CSS with:
- Warm color palette emphasizing trust and comfort
- Accessible typography scale using Inter and Playfair Display fonts
- Consistent spacing and layout patterns
- Mobile-first responsive design
- Smooth animations and micro-interactions

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Forms**: React Hook Form with Yup validation
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **HTTP Client**: Axios
- **Real-time**: Socket.IO Client
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns
- **Utilities**: clsx for conditional classes

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   REACT_APP_API_URL=http://localhost:3000/api/v1
   REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
   REACT_APP_FACEBOOK_APP_ID=your-facebook-app-id
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3001](http://localhost:3001)

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   ├── layout/         # Layout components
│   ├── forms/          # Form components
│   ├── auth/           # Authentication components
│   ├── profile/        # Profile-related components
│   ├── matching/       # Matching components
│   └── onboarding/     # Onboarding flow
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API service functions
├── store/              # Redux store and slices
├── utils/              # Utility functions
├── types/              # TypeScript definitions
├── assets/             # Static assets
└── styles/             # Global styles
```

## 🔗 Key Features

- **User Authentication**: Email/password, OAuth, 2FA
- **Profile Management**: Comprehensive profiles with verification
- **Matchmaking System**: AI-powered matching with human curation
- **Secure Communication**: Messaging and video calls
- **Privacy-First Design**: No public browsing, verified members only
- **Responsive Design**: Mobile-first, accessible interface

## 🎨 Design System Usage

### Colors
```jsx
// Primary brand colors
className="bg-primary-500 text-primary-100"

// Accent colors
className="bg-accent-pink-500 text-accent-sage-600"
```

### Components
```jsx
// Pre-built component classes
className="btn-primary"        // Primary button
className="input-field"        // Form input
className="card"              // Card container
className="trust-badge"       // Security indicator
```

## 🔒 Security & Privacy

- Input validation and sanitization
- Secure token storage
- Privacy-first design principles
- GDPR compliance considerations
- Content Security Policy

## ♿ Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader optimization
- High contrast mode
- Scalable fonts

## 🚀 Deployment

```bash
# Build for production
npm run build

# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production
```

## 📚 Learn More

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
