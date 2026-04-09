<div align="center">

# 💊 MediStore

### Full-Stack Online Medical Store — Bangladesh

**A modern e-commerce platform for medical supplies and medicines with category browsing, cart management, and fast doorstep delivery across Bangladesh.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-UI-000000?style=for-the-badge)](https://ui.shadcn.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://medi-store-frontend-seven.vercel.app/)

[🌐 Live Demo](https://medi-store-frontend-seven.vercel.app/) · [🐛 Report Bug](https://github.com/your-username/medi-store-frontend/issues) · [✨ Request Feature](https://github.com/your-username/medi-store-frontend/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🏥 About The Project

**MediStore** is a full-stack online medical store built for Bangladesh. It allows users to browse and order medicines and medical supplies across multiple categories — including Vitamins & Supplements, Pain Relief, Cold & Flu, and Digestive Health — with fast and reliable delivery across major cities.

The platform is built with **Next.js**, **TypeScript**, and **Tailwind CSS** on the frontend, and backed by a robust **Node.js + Express + MongoDB** REST API — the same proven stack as **Helps Near**.

---

## ✨ Features

### 🛍 Shopping
- Browse medicines by **category** — Digestive Health, Vitamins & Supplements, Cold & Flu, Pain Relief
- **Product search** and filter
- **Add to cart** and manage quantities
- **Real-time order tracking**
- **Fast & contactless delivery** across Bangladesh

### 🔐 Authentication
- User **Register / Login** with JWT
- Role-based access — **User**, **Manufacturer**, **Admin**

### 🏭 Manufacturer Dashboard
- Add, edit, and manage medicine listings
- Track orders related to their products

### 🛡 Admin Dashboard
- Manage all users, products, and orders
- Approve or reject manufacturer registrations
- Full platform oversight

### 📦 Delivery
- Shipping to **Dhaka, Chittagong, Khulna, Rajshahi, Sylhet**
- Real-time order status updates

### 💡 General
- ⚡ Fast, SEO-friendly with Next.js App Router
- 📱 Fully responsive — mobile & desktop
- 🎨 Clean UI with shadcn/ui components
- 🌙 24/7 patient support info

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Next.js 15 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| shadcn/ui | UI Components |
| Lucide React | Icons |
| Axios / Fetch | API calls |
| Vercel | Hosting |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Server framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| dotenv | Environment config |
| CORS | Cross-origin requests |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- npm / yarn / pnpm
- MongoDB Atlas or local MongoDB

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/medi-store-frontend.git
cd medi-store-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

4. **Run development server**

```bash
npm run dev
```

5. **Open in browser**

```
http://localhost:3000
```

---

## 📁 Project Structure

```
medi-store-frontend/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public layout
│   │   ├── page.tsx              # Home / Landing page
│   │   ├── shop/                 # Product listing
│   │   │   └── [id]/             # Product detail
│   │   ├── about/                # About page
│   │   └── contact/              # Contact page
│   ├── dashboard/                # Protected dashboard
│   │   ├── user/                 # User orders & profile
│   │   ├── manufacturer/         # Manufacturer panel
│   │   │   ├── add-medicine/     # Add new product
│   │   │   └── my-medicines/     # Manage listings
│   │   └── admin/                # Admin panel
│   │       ├── users/            # Manage users
│   │       ├── orders/           # Manage all orders
│   │       └── medicines/        # Manage all products
│   └── layout.tsx
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── nav-main.tsx              # Sidebar navigation
│   ├── ProductCard.tsx           # Medicine card
│   └── ...
├── lib/                          # Utilities & config
│   ├── routes.ts                 # Route definitions
│   └── utils.ts                  # Helper functions
├── public/                       # Static assets
└── ...config files
```

---

## 🗺 Pages & Routes

| Route | Description | Access |
|---|---|---|
| `/` | Home / Landing page | Public |
| `/shop` | Browse all medicines | Public |
| `/shop/[id]` | Medicine detail | Public |
| `/about` | About MediStore | Public |
| `/contact` | Contact page | Public |
| `/dashboard/user` | User profile & orders | Auth Required |
| `/dashboard/manufacturer/add-medicine` | Add new medicine | Manufacturer |
| `/dashboard/manufacturer/my-medicines` | Manage medicines | Manufacturer |
| `/dashboard/admin/users` | Manage users | Admin |
| `/dashboard/admin/orders` | Manage all orders | Admin |
| `/dashboard/admin/medicines` | Manage all products | Admin |

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Backend API
NEXT_PUBLIC_API_URL=https://your-backend-api.com

# Site URL
NEXT_PUBLIC_SITE_URL=https://medi-store-frontend-seven.vercel.app
```

> ⚠️ Never commit `.env.local` to version control.

---

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

---

## 🌐 Deployment

This project is deployed on **Vercel**.

### Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/medi-store-frontend)

1. Push your code to GitHub
2. Import repository on [Vercel](https://vercel.com/)
3. Add environment variables
4. Deploy!

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 📞 Contact & Support

| Contact | Details |
|---|---|
| 🌐 Live Site | [medi-store-frontend-seven.vercel.app](https://medi-store-frontend-seven.vercel.app/) |
| 📍 Shipping Areas | Dhaka, Chittagong, Khulna, Rajshahi, Sylhet |
| 🕐 Support | 24/7 Patient Care |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ for healthier communities in Bangladesh

**[⬆ Back to top](#-medistore)**

</div>
