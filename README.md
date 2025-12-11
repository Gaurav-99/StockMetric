# StockMetric

A production-ready web application for tracking Indian stock market (NSE) portfolios with AI-style buy/sell/hold suggestions.

Built using **Google's Antigravity**.

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

## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components.
- `lib/`: Utility functions and mock services (`stockService`, `newsService`).
- `hooks/`: Custom React hooks (e.g., `useStockPrices`).
- `actions/`: Server Actions for data mutation.
- `prisma/`: Database schema and seeds.

## Disclaimer

This application provides educational suggestions only and does not constitute financial advice.
