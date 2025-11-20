# Furniture Store

This is a full-stack e-commerce website for a furniture store. It includes a product catalog, shopping cart, user authentication, checkout, admin panel, and more.

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm run dev
   ```
3. For backend/API:
   ```
   npm run server
   ```

## Features
- Product catalog
- Shopping cart
- User authentication
- Checkout and order processing
- Admin panel
- Payment integration (test/demo)
- Responsive design

## Tech Stack
- Frontend: React (or Next.js)
- Backend: Node.js/Express
- Database: MongoDB (or similar)

## Environment Variables

Create a `.env` file in `backend/` with:

```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

And in the frontend directory, add these variables to your `.env` file:

```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment (Simple Steps for Non-Coders)

Your website has two main parts:
- **Frontend**: What your customers see (the website itself)
- **Backend**: The part that handles data, payments, and orders (works in the background)

To get your site live:

1. **Get your keys ready**
   - You will get special codes (called keys) from Supabase and Stripe. These connect your website to your database and payment system.

2. **Copy and fill in the key files**
   - Go to the `backend` folder. Find the file called `.env.example`. Make a copy and rename it to `.env`. Paste your Supabase and Stripe keys into this file.
   - Go to the `frontend` folder. Find the file called `.env.example`. Make a copy and rename it to `.env`. Paste your Supabase keys and the backend link (for now, use `http://localhost:5000` if testing on your computer).

3. **Deploy (put your site online)**
   - You can use services like Vercel, Netlify, or Heroku. They will ask you to upload your project and enter your keys. Just follow their step-by-step instructions.
   - If you get stuck, search for “How to deploy a React app on [Vercel/Netlify]” or “How to deploy a Node.js app on [Heroku/Render]”.

4. **Go live**
   - Once both parts are online, your website is ready for real customers!

5. **(Optional) Custom domain and SSL**
   - You can connect your own web address (like www.yoursite.com) and make it secure (SSL). Your hosting provider will guide you through this.

If you need help, just ask for step-by-step instructions for any part!

---

For production, make sure to use secure keys and HTTPS.

This README will be updated as features are added.
