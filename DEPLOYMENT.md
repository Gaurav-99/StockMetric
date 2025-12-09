# Vercel Deployment Guide

This guide explains how to deploy StockMetric to Vercel using Vercel Postgres.

## Prerequisites

- A [Vercel](https://vercel.com) account.
- A GitHub repository with this project pushed to it.

## Steps

### 1. Push Code to GitHub
Ensure your code is pushed to a GitHub repository.

### 2. Create Project on Vercel
1. Log in to Vercel and click **Add New** > **Project**.
2. Import your `stock-metric` repository.
3. In the "Configure Project" screen, leave the build settings as default.

### 3. Configure Database (Vercel Postgres)
1. Before deploying, click the **Storage** tab in your Vercel Project Dashboard (or "Install Vercel Postgres" during creation).
2. Click **Create** and select **Postgres (Serverless SQL)**.
3. Name your database (e.g., `stock-metric-db`) and select a region (e.g., `Mumbai - bom1`).
4. Click **Create**.
5. Once created, Vercel will ask to "Connect Project". Click **Connect**.
   - This automatically sets environment variables like `POSTGRES_URL`, `POSTGRES_PRISMA_URL`, etc.

### 4. Configure Environment Variables
Go to **Settings** > **Environment Variables** and add the remaining secrets:

| Name | Description |
|------|-------------|
| `NEXTAUTH_SECRET` | Run `openssl rand -base64 32` to generate one. |
| `NEXTAUTH_URL` | Set to your Vercel deployment URL (e.g. `https://your-app.vercel.app`) - **Important**: For preview deployments, Vercel sets a system var, but for production, set the canonical URL. |
| `POSTGRES_PRISMA_URL` | (Auto-set by Vercel Postgres) Used by Prisma. |
| `POSTGRES_URL_NON_POOLING`| (Auto-set by Vercel Postgres) Used for specific direct connections if needed. |

**Important for Prisma**:
In `prisma/schema.prisma`, your datasource is typically compatible with standard Postgres connection strings.
If Vercel provides a `POSTGRES_PRISMA_URL`, you might need to ensure your `.env` maps `DATABASE_URL` to it, or update `schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url = env("POSTGRES_PRISMA_URL") // or "DATABASE_URL" if you map it in Vercel UI
  directUrl = env("POSTGRES_URL_NON_POOLING") // Optional, for migrations
}
```
*Recommendation*: In Vercel Environment Variables, create a new variable named `DATABASE_URL` and copy the value from `POSTGRES_PRISMA_URL` into it. This avoids changing code.

### 5. Deploy
Click **Deploy**. Vercel will build your app.
- The `postinstall` script (`prisma generate`) will run automatically.
- The build should succeed.

### 6. Run Migrations & Seed
You cannot run `npx prisma migrate dev` directly on Vercel's build server easily.
**Option A (Recommended for First Time):**
Connect to the database from your local machine using the credentials from Vercel (found in the Storage tab > ".env.local" section).
1. Copy the Vercel Postgres credentials to your local `.env`.
2. Run `npx prisma migrate deploy` (Use `deploy`, not `dev` for production databases).
3. Run `npx prisma db seed`.

**Option B (Build Command):**
Update your Build Command in Vercel Settings to:
`npx prisma migrate deploy && next build`
This runs migrations on every deployment. (Use with caution in production).

### 7. Verify
Open your deployed URL. You should be able to log in with the seeded user (`demo@example.com` / `password123`) or sign up.
