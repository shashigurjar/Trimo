# 🔗 Trimo – Tiny Links, Big Insights

*“Make long URLs disappear and your analytics sparkle.”*

Welcome to **Trimo**, a modern URL shortener that does more than squash long links — it gives you QR codes, click analytics, and a clean dashboard so you actually know who clicked your links and from where.

---

## ✨ What is Trimo?

Trimo is a lightweight, user-friendly URL shortener built with **React (Vite)** for the frontend and **Supabase** as a backend (database + auth + storage). It allows users to:

- Create short links (auto or custom)
- Generate QR codes for each short link
- Track clicks (total clicks, device type, and rough location)
- Copy, download QR codes, and manage links via a dashboard

---

## 🚩 Why Trimo matters (real-world uses)

- **Cleaner Sharing** — Short, branded links are the difference between “click here” and “what is this?”
- **Campaign Tracking** — Measure the effectiveness of posts, posters, or emails.
- **Smaller QR Codes** — Short links produce smaller, easier-to-scan QR codes.
- **Branding & Professionalism** — Custom short URLs look trustworthy.
- **Analytics** — See engagement by location and device for smarter decisions.

---

## 🧩 Features

- 🔹 Shorten URLs (auto-generated or choose your custom slug)
- 🔹 Generate downloadable QR codes per short URL
- 🔹 Track click analytics: total clicks, device info, and geo breakdown
- 🔹 User authentication (Supabase Auth) — links per user
- 🔹 Delete/manage links + download QR images
- 🔹 Responsive UI built with Tailwind CSS

---

## 🛠 Tech Stack

| Layer     | Tech                                                       |
| --------- | ---------------------------------------------------------- |
| Frontend  | React (Vite), Tailwind CSS, Lucide Icons                   |
| Backend   | Supabase (Postgres, Auth, Storage)                         |
| Analytics | Stored in Supabase (clicks table with IP-derived location) |
<<<<<<< HEAD
| Hosting   | Netlify (frontend), Supabase (backend)                     |
=======
>>>>>>> f5d6c37a1eab96f92dfd847237fa3ceb03711f03
| Dev Tools | Git, npm/yarn, VS Code                                     |

---

## 🔧 Quick Start (Developer)

### 1) Clone

```bash
git clone https://github.com/shashigurjar/Trimo.git
cd Trimo
```

### 2) Environment Variables

Create a `.env` in the project root:

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-public-key>
```

> ⚠️ Only the **anon** key should be used in the client. Keep the service role key secret.

### 3) Install & Run (dev)

```bash
npm install
npm run dev
```

Open `http://localhost:5173` (or the console address) to view the app.

### 4) Build for production

```bash
npm run build
```

---

## ⚙️ How It Works (high level)

1. **Create short link**
   - User submits a long URL → stored in Supabase with short slug, QR generated & saved.
2. **User shares short link** (`https://yourdomain/<slug>`)
3. **Clicking short link**
   - App fetches original URL from Supabase, records click data (timestamp, device, location), then redirects.
4. **View analytics**
   - Dashboard aggregates click data by location/device/time.

---

## 🧾 Database (Supabase) - Suggested Tables

**urls**

```sql
id uuid primary key
owner_id uuid references auth.users
title text
original_url text
short_slug text unique
qr_url text
created_at timestamp
```

**clicks**

```sql
id uuid primary key
url_id uuid references urls(id)
<<<<<<< HEAD
ip text
user_agent text
=======
>>>>>>> f5d6c37a1eab96f92dfd847237fa3ceb03711f03
device_type text
country text
region text
created_at timestamp
```

---

## 🧑‍💻 Author

**Shashank Gurjar**\
GitHub: [https://github.com/shashigurjar](https://github.com/shashigurjar)

---

## 🎉 License

MIT License — use it, fork it, make it better.

---

## 📬 Contact

Built with ☕ and lots of curiosity.\
If this project saved you from posting a 200-character dump, I did my job.

