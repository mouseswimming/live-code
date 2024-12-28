# Live Code

This is a live collaborating markdown editor built with Next.js, Clerk, Liveblocks, and Lexical.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

- Live Collaboration: Multiple users can edit markdown documents in real-time.
- User Authentication: Secure user authentication and management using Clerk.
- Rich Text Editing: Enhanced text editing capabilities with Lexical.
- Responsive Design: Styled using Tailwind CSS for a responsive and modern UI.

## Main Libraries

- @clerk/nextjs: Authentication and user management.
- @liveblocks/client, @liveblocks/node, @liveblocks/react, @liveblocks/ react-lexical, @liveblocks/react-ui: Real-time collaboration features.
- @lexical/react: Rich text editor framework.
- next: The Next.js framework for building React applications.
- react: The React library for building user interfaces.
- tailwindcss: Utility-first CSS framework for styling.

## Learn More

To learn more about the main libraries used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Clerk Documentation](https://clerk.dev/docs) - learn about Clerk features and API.
- [Liveblocks Documentation](https://liveblocks.io/docs) - learn about Liveblocks features and API.
- [Lexical Documentation](https://lexical.dev/docs) - learn about Lexical features and API.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS features and API.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
