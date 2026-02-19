# Young Chakma Association (YCA) Platform

A modern, full-stack platform for the Young Chakma Association, featuring a high-performance Next.js frontend and a robust Node.js/Express backend.

## 🚀 Project Architecture

- **Frontend**: Next.js 16 (Turbopack) with Tailwind CSS for a premium, responsive UI.
- **Backend & Database**: Supabase (PostgreSQL, Auth, Real-time) for a scalable BaaS architecture.
- **Infrastructure**: Optimized for Vercel deployment with Supabase managed services.

## 📁 Project Structure

```
YCA/
├── yca-next/           # Next.js Frontend Application
│   ├── app/            # App Router (Bylaws, News, Zones, etc.)
│   ├── public/         # Static Assets
│   └── components/     # UI Components (Navbar, Footer, etc.)
├── backend/            # Express API Server
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Endpoints
│   └── seedBylaws.js   # Constitutional Data Seeder
├── .env                # Environment Variables (Shared)
└── vercel.json         # Deployment Configuration
```

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 18+
- MongoDB instance (Local or Atlas)

### 2. Installation
```bash
# Install core dependencies
npm install

# Install frontend dependencies
cd yca-next
npm install
```

### 3. Development
Run the frontend:

```bash
cd yca-next
npm run dev
```

### ⚡ Supabase Setup (When Ready)
1. Create a project at [supabase.com](https://supabase.com).
2. Run the SQL in `supabase_schema.sql` (in root) in the Supabase SQL Editor.
3. Update `.env` with your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. The website will automatically switch from **Demo Mode** to **Live Mode** once keys are added.

## 📜 Key Features
- **By-Laws Explorer**: Synchronized table of contents for the official 2018 Revised Constitution.
- **Organization Directory**: Hierarchical view of Central, Zonal, and Branch committees.
- **Newsroom**: Dynamic feed for announcements, circulars, and events.
- **Membership**: Integrated registration and authentication system.

---

**Built with ❤️ for the Chakma Youth.**
