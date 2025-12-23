# StockMetric - NSE Portfolio Tracker Documentation

## Overview
StockMetric is a comprehensive web application for tracking stock portfolios, specifically tailored for the Indian NSE market. It allows users to manage their stock holdings, view live price updates, analyze historical performance charts, and stay updated with the latest market news.

## Features
-   **User Authentication**: Secure Signup and Login using `NextAuth.js`.
-   **Portfolio Management**: Add, remove, and track stock holdings with real-time value calculation.
-   **Live Stock Data**: Real-time stock prices and historical data fetching using `yahoo-finance2` (integrated with Yahoo Finance v3 API).
-   **Interactive Charts**: Dynamic price history charts (1 Month, 1 Year, etc.) powered by `Recharts`.
-   **Market News**: Aggregated live news feed from multiple sources (Nifty, Sensex, etc.) with pagination.
-   **Responsive Design**: Modern, dark-themed UI built with `Tailwind CSS v4`.
-   **Database**: Persistent user and portfolio data storage using `PostgreSQL` (via Prisma ORM).

## Technology Stack
-   **Framework**: Next.js 15+ (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS v4
-   **Database**: PostgreSQL
-   **ORM**: Prisma
-   **Auth**: NextAuth.js
-   **Data Source**: `yahoo-finance2` (Unofficial Yahoo Finance API)
-   **Charts**: Recharts

## Setup Instructions

### 1. Prerequisites
-   Node.js (v18 or higher)
-   PostgreSQL installed and running
-   Git

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Gaurav-99/StockMetric.git
cd StockMetric
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory with the following variables:

```env
# Database Connection
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here"
```

### 4. Database Setup
Initialize the database schema using Prisma:
```bash
# Generate Prisma Client
npm run postinstall

# Push schema to database
npx prisma db push
```

### 5. Running the Application
Start the development server:
```bash
npm run dev
```

For production build:
```bash
npm run build
npm start
```
The app will be available at `http://localhost:3000`.

## Project Structure

```
StockMetric/
├── app/                    # Next.js App Router pages
│   ├── (main)/             # Protected routes (Dashboard, Stocks, News)
│   ├── api/                # API Routes (Auth)
│   ├── login/              # Login Page
│   └── signup/             # Signup Page
├── components/             # Reusable UI Components
│   ├── DashboardClient.tsx # Main Dashboard Logic
│   ├── NewsFeed.tsx        # Paginated News Component
│   ├── StockChart.tsx      # Recharts wrapper
│   └── ...
├── lib/                    # Utility libraries and Services
│   ├── stockService.ts     # Yahoo Finance Data Fetching
│   ├── newsService.ts      # News Aggregation Service
│   └── prisma.ts           # Database Client
├── prisma/                 # Database Schema
│   └── schema.prisma
└── public/                 # Static Assets
```

## Key Services

### Stock Service (`lib/stockService.ts`)
Fetches live data.
-   **Method**: `getStockHistory(symbol)`
-   **Note**: Uses explicit `Date` objects for `period1` and `period2` to ensure compatibility with `yahoo-finance2` v3.

### News Service (`lib/newsService.ts`)
Aggregates news.
-   **Method**: `getGlobalNews()`
-   **Strategy**: Runs parallel searches for "Nifty 50", "Indian Economy", etc., to gather ~50 unique articles.
-   **Pagination**: Handled client-side by `components/NewsFeed.tsx`.

## Troubleshooting

-   **"No chart data available"**: Ensure your system time is correct, as the API relies on date-based queries.
-   **Database Errors**: Verify `DATABASE_URL` in `.env` and ensure the Postgres server is running.
