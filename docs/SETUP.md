# Portfolio Setup Guide

## Quick Start

Follow these steps to get your portfolio running:

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React icons
- And more...

### 2. Run Development Server

```bash
npm run dev
```

Your portfolio will be available at: http://localhost:3000

### 3. Build for Production

```bash
npm run build
npm start
```

## Project Overview

This is a complete portfolio website converted from your HTML file to a modern React/Next.js application.

### What's Included

✅ All content from your original HTML portfolio
✅ Responsive design that works on all devices
✅ Smooth scroll navigation
✅ Modern animations and transitions
✅ SEO optimized with proper metadata
✅ Fast loading with Next.js optimization
✅ TypeScript for type safety
✅ Tailwind CSS for styling

### File Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Main page assembling all sections
│   └── globals.css         # Global styles and Tailwind
│
├── components/
│   ├── Navigation.tsx      # Sticky navigation bar
│   ├── Footer.tsx          # Footer with copyright
│   │
│   ├── sections/           # All portfolio sections
│   │   ├── Hero.tsx        # Hero with name and contact
│   │   ├── About.tsx       # About me section
│   │   ├── Education.tsx   # Education details
│   │   ├── Skills.tsx      # Technical skills grid
│   │   ├── Experience.tsx  # Work experience
│   │   ├── Projects.tsx    # Featured projects
│   │   └── Contact.tsx     # Contact section
│   │
│   └── ui/
│       └── expandable-tabs.tsx  # Bonus component
│
├── lib/
│   └── utils.ts            # Utility functions
│
└── Configuration files
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    └── next.config.ts
```

## Customization

### Update Your Information

1. **Personal Details** - Edit `components/sections/Hero.tsx`
2. **About Text** - Edit `components/sections/About.tsx`
3. **Education** - Edit `components/sections/Education.tsx`
4. **Skills** - Edit `components/sections/Skills.tsx`
5. **Experience** - Edit `components/sections/Experience.tsx`
6. **Projects** - Edit `components/sections/Projects.tsx`
7. **Contact** - Edit `components/sections/Contact.tsx`

### Change Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  primary: "#2563eb",  // Change this
  secondary: "#1e40af", // And this
  // etc...
}
```

### Add More Sections

1. Create a new component in `components/sections/`
2. Import it in `app/page.tsx`
3. Add it to the page layout

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

Done! Your portfolio will be live in minutes.

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site"
4. Connect your repository
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Click "Deploy"

## Troubleshooting

### Dependencies won't install?

Try:
```bash
npm cache clean --force
npm install
```

### Port 3000 already in use?

Run on a different port:
```bash
npm run dev -- -p 3001
```

### Build errors?

Check that all dependencies are installed:
```bash
npm install
```

## Need Help?

- Check the [Next.js Documentation](https://nextjs.org/docs)
- Check the [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- Review the component files for examples

## Next Steps

1. ✅ Install dependencies
2. ✅ Run the dev server
3. ✅ Customize your content
4. ✅ Test on mobile devices
5. ✅ Deploy to production

Good luck with your portfolio! 🚀
