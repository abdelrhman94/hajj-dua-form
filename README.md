# دعواتكم أمانة عندي 🕌🤲

Hajj dua collection form — submit your supplications and I'll carry them to the Haram. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Beautiful Islamic-themed UI with gold/dark design and RTL Arabic layout
- 12 predefined dua suggestions with custom dua support
- Submissions persisted to a JSON file
- Secret admin page to view all submitted duas
- Excel export for all entries
- Open Graph image for rich social media previews

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file:

```
ADMIN_SECRET=your-secret-key-here
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to see the form.

## Admin Page

Access the admin page at:

```
http://localhost:3000/admin/your-secret-key-here
```

Replace `your-secret-key-here` with the value you set in `.env.local`.

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
- xlsx (Excel export)

## Deploy

The easiest way to deploy is on [Vercel](https://vercel.com). Make sure to add `ADMIN_SECRET` as an environment variable in your Vercel project settings.
