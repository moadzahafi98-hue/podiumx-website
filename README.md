# 🏋️‍♂️ PodiumX Performance Center Website

## 📘 Overview

The **PodiumX Performance Center** website is a full-featured digital platform representing **Casablanca’s premier elite fitness and performance training facility**.

It delivers a **powerful, modern, and immersive experience** for athletes of all levels — from beginners to elite performers — blending **high-performance aesthetics** with **intuitive functionality**.

The website serves as both:
- A **marketing platform** for promoting PodiumX’s philosophy, programs, and facilities.
- A **client management portal** for booking, scheduling, and accessing progress data.

### Core Capabilities
- Explore PodiumX’s programs, coaches, and zones.  
- Book sessions or memberships online.  
- Access training schedules, recovery services, and client resources.  

---

## 🧠 Brand Identity

| Element | Details |
|----------|----------|
| **Name** | PodiumX Performance Center |
| **Tagline** | “Elevate Your Performance • Every Level, Every Session” |
| **Location** | Casablanca, Morocco |
| **Primary Colors** | Matte Black `#000000` · Electric Green `#00FF5E` · White `#FFFFFF` |
| **Visual Style** | Minimalist · Futuristic · Athlete-focused aesthetic |
| **Typography** | Bold Sans-Serif for titles (*Montserrat, Bebas Neue*) / Clean Sans-Serif for text (*Open Sans, Roboto*) |
| **Tone** | Motivational · Professional · Empowering |
| **Core Values** | Performance • Precision • Progress • Community |

---

## 🌐 Website Structure

The PodiumX website uses a **multi-page architecture (MPA)** optimized for SEO, scalability, and clarity.

| Page | Description |
|------|--------------|
| **Home (`index.html`)** | Hero banner, key benefits, facility overview, testimonials, and pricing teaser with CTA “Book Your Free Evaluation.” |
| **About (`about.html`)** | PodiumX story, mission statement, coach profiles, and “Why Choose PodiumX” section. |
| **Programs (`programs.html`)** | Overview of coaching packages: individual, group, and recovery programs. |
| **Schedule (`schedule.html`)** | Interactive weekly timetable with booking integration (sessions by day/time). |
| **Facility (`facility.html`)** | Detailed view of all training zones with high-quality imagery and specifications. |
| **Pricing (`pricing.html`)** | Complete pricing table with membership tiers, inclusions, and offers. |
| **Blog (`blog.html`)** | Articles on strength, recovery, and nutrition insights. |
| **Contact (`contact.html`)** | Contact form, address, map integration, and direct inquiry email. |
| **FAQ (`faq.html`)** | Answers to common questions about memberships and programs. |
| **Login (`login.html`)** | Member portal entry point for clients to access sessions, progress, and billing. |

---

## 🏗️ Facility Overview

| Zone | Size | Description |
|------|------|-------------|
| **Training Zone** | 100 m² | Equipped with a full functional rig, barbells, kettlebells, plyo boxes, and a sled turf lane for explosive conditioning. |
| **Cardio & Reception** | 100 m² | High-end cardio area (treadmills, assault bikes, rowers) with a premium reception lounge and merchandise display. |
| **Recovery Area** | 30 m² | Includes 2 stainless steel ice baths, a glass-fronted sauna, and a relaxation bench for recovery and regeneration. |
| **Locker Rooms** | 15 m² | Secure lockers, showers, benches, and mirrors in a clean minimalist design. |

---

## 💰 Programs & Pricing

| Program | Frequency | Monthly Price | Description |
|----------|------------|----------------|--------------|
| **Small-Group Training** | 3 sessions/week | 549 MAD | Coach-led functional group sessions (max 10 participants). |
| **Individual Coaching – 2x/week** | 2 sessions/week | 799 MAD | Personalized training with full assessment and progress review. |
| **Individual Coaching – 4x/week** | 4 sessions/week | 1,199 MAD | Advanced personal coaching plan for accelerated results. |
| **Recovery Add-on** | Unlimited | 249 MAD | Unlimited access to Recovery Zone (ice bath + sauna). |
| **Special Offers** | — | — | 10% discount for 12-month membership · Referral bonus program. |

**All memberships include:**
- Initial performance assessment  
- Access to training and recovery zones  
- Monthly progress tracking  
- Priority scheduling for members  

---

## 🕒 Training Schedule

| Day | Morning | Midday | Evening |
|------|----------|---------|---------|
| **Monday–Friday** | 06:00–10:00 (*Elite Morning*) | 12:00–14:00 (*Express Lunch*) | 17:00–21:00 (*Prime Time*) |
| **Saturday** | 08:00–12:00 (*Weekend Warrior*) | — | — |
| **Sunday** | Recovery Zone only | — | — |

---

## ⚙️ Technical Stack

| Component | Technology |
|------------|-------------|
| **Frontend Framework** | React 18 |
| **Styling** | TailwindCSS (custom theme) |
| **Icons** | Lucide Icons |
| **Architecture** | Multi-Page (MPA) |
| **Build Tools** | Vite / Webpack |
| **Forms & Bookings** | Integrated booking API (Calendly, Google Calendar, or custom backend) |
| **Newsletter** | Mailchimp or SendGrid integration |
| **SEO Optimization** | Structured metadata, sitemap, robots.txt, lazy image loading |
| **Accessibility** | WCAG-compliant contrast, ARIA roles, keyboard navigation |

---

## 🧩 Features

- ⚡ **Fully responsive** across all devices  
- 📅 **Dynamic booking forms** with schedule integration  
- 📩 **Newsletter signup** and CRM-ready email collection  
- 💬 **Contact forms** with automatic email notifications  
- 📈 **SEO-optimized**, Lighthouse score > 90  
- 🔐 **Secure client login portal** for members  
- ♿ **Accessibility-compliant** interface  
- 🌍 **Multilingual-ready (French/English)**  
- 📸 **Dynamic image galleries** and video embedding  

---

## 🧭 User Flow

1. Visitor lands on **Home Page** → reads hero + benefits.  
2. Clicks **“Book Free Evaluation”** → redirected to Assessment Form.  
3. Submits form → data added to CRM.  
4. Receives confirmation email with scheduling link.  
5. Logs into **Client Portal** to view sessions, progress, and billing.  

---

## 🔐 Client Portal (Member Area)

- Secure authentication (JWT or Firebase Auth).  
- Dashboard displaying:
  - Upcoming sessions  
  - Membership status  
  - Payment history  
  - Assessment results  
  - Progress graphs  
- Option to **reschedule or cancel sessions**.  

---

## 📍 Contact Information

**Address:** Centre Casablanca-Settat, Casablanca, Morocco  
**Email:** info@podiumx.ma  
**Phone:** +212 (0) XX XXX XXXX  
**Social Media:**  
- Instagram: [@podiumx](#)  
- Facebook: [facebook.com/podiumx](#)  
- LinkedIn: [linkedin.com/company/podiumx](#)

---

## ⚙️ Developer Setup & Deployment

### 1. Prerequisites
- Node.js v18+  
- pnpm / npm / yarn  
- Git v2.30+  
- Hosting: **Vercel** or **Netlify**  
- Optional: **Firebase/Supabase (auth)**, **Stripe (payments)**, **Mailchimp (newsletter)**  

### 2. Installation
```bash
git clone https://github.com/<org>/<repo-podiumx>.git
cd <repo-podiumx>
pnpm install   # or npm install / yarn
