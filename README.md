# StockMetric

A production-ready web application for tracking Indian stock market (NSE) portfolios with AI-style buy/sell/hold suggestions.

## Features

- **Portfolio Tracking**: Real-time updates of your holdings using React Query.
- **News Integration**: Latest news for your stocks and global market news.
- **Smart Suggestions**: Educational buy/sell suggestions based on your Risk Profile and Investment Horizon.
- **Responsive Design**: Mobile-first UI built with Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Prisma)
- **Auth**: NextAuth.js
- **State**: TanStack Query
- **Styling**: Tailwind CSS
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL Database

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Rename `env.example` to `.env`.
   - Update `DATABASE_URL` with your PostgreSQL connection string.
   - Update `NEXTAUTH_SECRET` (generate one with `openssl rand -base64 32`).

### Database Setup

1. Run migrations to create the schema:
   ```bash
   npx prisma migrate dev
   ```
2. Seed the database with a user and sample data:
   ```bash
   npx prisma db seed
   ```
   **Default Credentials:**
   - Email: `demo@example.com`
   - Password: `password123`

### Running the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components.
- `lib/`: Utility functions and mock services (`stockService`, `newsService`).
- `hooks/`: Custom React hooks (e.g., `useStockPrices`).
- `actions/`: Server Actions for data mutation.
- `prisma/`: Database schema and seeds.

## Disclaimer

This application provides educational suggestions only and does not constitute financial advice.
