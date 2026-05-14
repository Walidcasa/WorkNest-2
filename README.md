# CLARITY — Unified Personal Dashboard

CLARITY is a professional-grade decision tool that combines financial clarity with time awareness. It is designed to expose the truth about how you spend your money and your time, replacing illusions with actionable data.

## 🌟 Core Modules

### 💰 Cash Flow Tracker
- **Absolute Visibility**: Track every income and expense entry with zero friction.
- **Financial Reality**: Net cash flow analysis, category breakdowns, and revenue goals.
- **Smart Alerts**: Know when you're overspending before it's too late.

### ⏱ Time & Productivity
- **Time Truth**: Log activities and categorize them as Productive, Neutral, or Waste.
- **Focus Score**: A 0-100 algorithm that measures your daily efficiency.
- **Behavior Nudges**: Strategic prompts to help you become the person you want to be.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- Docker (for database)
- OpenAI API Key

### 2. Installation
```bash
npm install
cp .env.example .env
```

### 3. Database Setup
```bash
docker-compose up -d
npx turbo run db:push
```

### 4. Running the Apps
```bash
npm run dev
```

## 🛠 Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, Lucide Icons.
- **Backend**: NestJS, Prisma ORM, PostgreSQL.
- **State**: Zustand & LocalStorage.

## 📄 Philosophy
"People don't fail because of low income or lack of time. They fail because of no tracking, no structure, no feedback loop."

---
Built with absolute clarity.
