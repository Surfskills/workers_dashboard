This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

###Project Structure
fred/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout (Header/Footer)
│   │   ├── page.tsx                      # Homepage
│   │   ├── auth/                         # Authentication pages
│   │   │   ├── signin/                   # Sign-in route
│   │   │   │   ├── page.tsx              # Sign-in page
│   │   │   │   └── layout.tsx            # Authentication layout
│   │   │   ├── signup/                   # Sign-up route (optional)
│   │   │   │   ├── page.tsx              # Sign-up page
│   │   │   │   └── layout.tsx            # Sign-up layout
│   │   ├── services/                     # Services pages
│   │   │   ├── layout.tsx                # Shared layout for services
│   │   │   ├── page.tsx                  # Services landing page
│   │   │   ├── custom/                   # Custom service route
│   │   │   │   ├── page.tsx              # Custom services details
│   │   │   │   └── loading.tsx           # Loading state
│   │   │   ├── software/                 # Software development route
│   │   │   │   ├── page.tsx              # Software services details
│   │   │   │   └── loading.tsx
│   │   │   ├── cicd/                     # CI/CD route
│   │   │   │   ├── page.tsx
│   │   │   │   └── loading.tsx
│   │   │   └── consultation/             # Tech consultation route
│   │   │       ├── page.tsx
│   │   │       └── loading.tsx
│   │   ├── carousel/                     # Carousel page
│   │   │   ├── page.tsx                  # Carousel demonstration
│   │   │   └── SwiperCarousel.tsx        # Swiper.js carousel component
│   │   └── api/                          # API routes
│   │       ├── auth/                     # Authentication API
│   │       │   ├── login/route.ts        # Login endpoint
│   │       │   ├── signup/route.ts       # Signup endpoint
│   │       │   └── session/route.ts      # Session verification
│   │       └── services/                 # Service-related APIs
│   │           └── route.ts
│   ├── components/                       # Reusable components
│   │   ├── layout/                       # Layout components
│   │   │   ├── Header.tsx                # Header component (responsive/mobile-first)
│   │   │   ├── Footer.tsx                # Footer component (responsive/mobile-first)
│   │   │   ├── MobileMenu.tsx            # Dropdown menu for mobile
│   │   │   └── Navigation.tsx            # Navigation bar
│   │   ├── carousel/                     # Carousel components
│   │   │   ├── Carousel.tsx              # Enhanced Swiper.js carousel
│   │   │   └── CarouselCard.tsx          # Individual carousel card
│   │   ├── auth/                         # Auth components
│   │   │   ├── SignInForm.tsx            # Sign-in form
│   │   │   ├── SignUpForm.tsx            # Sign-up form
│   │   │   └── AuthGuard.tsx             # Protected route wrapper
│   │   ├── services/                     # Service components
│   │   │   ├── ServiceTabs.tsx           # Tabs for services
│   │   │   ├── ServiceLayout.tsx         # Two-column service layout
│   │   │   ├── ServiceHeader.tsx         # Service title and description
│   │   │   ├── ServiceDetails.tsx        # Service details (time, cost)
│   │   │   └── ServiceImage.tsx          # Service SVG image
│   │   ├── avatar/                       # Avatar components
│   │   │   └── AvatarCard.tsx            # Image avatar with styling
│   │   └── shared/                       # Shared UI components
│   │       ├── LoadingSpinner.tsx        # Loading spinner
│   │       ├── SubscribeForm.tsx         # "Join My List" subscription form
│   │       └── ErrorBoundary.tsx         # Error boundary
│   ├── lib/                              # Utility files
│   │   ├── auth/                         # Authentication logic
│   │   │   ├── authProvider.ts           # NextAuth configuration
│   │   │   ├── firebaseConfig.ts         # Firebase (if used)
│   │   ├── carousel/                     # Carousel data utilities
│   │   │   └── carouselData.ts           # Data for Swiper slides
│   │   ├── services/                     # Service data
│   │   │   └── serviceData.ts            # Mock service data
│   │   └── utils/
│   │       ├── animations.ts             # Shared animations
│   │       └── breakpoints.ts            # Responsive breakpoints
│   ├── types/                            # Type definitions
│   │   ├── auth.ts                       # Auth-related types
│   │   ├── services.ts                   # Services-related types
│   │   └── carousel.ts                   # Carousel-related types
│   ├── styles/                           # Global styles
│   │   ├── globals.css                   # Global CSS
│   │   └── tailwind.css                  # Tailwind CSS (if used)
│   ├── middleware.ts                     # Middleware for route protection
│   ├── favicon.ico                       # Favicon
│   └── globals.css                       # Global styles
├── public/                               # Public assets
│   └── assets/                           # Static assets
│       ├── carousel/                     # Carousel images
│       ├── custom/                       # Custom service images
│       ├── software/                     # Software service images
│       ├── cicd/                         # CI/CD service images
│       └── consultation/                 # Consultation service images
├── tailwind.config.js                    # Tailwind CSS configuration
├── postcss.config.js                     # PostCSS configuration
├── next.config.js                        # Next.js configuration
├── tsconfig.json                         # TypeScript configuration
├── package.json                          # Package file
└── README.md                             # Documentation
