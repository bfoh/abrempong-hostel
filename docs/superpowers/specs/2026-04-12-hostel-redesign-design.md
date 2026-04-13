# Abrempong Hostel — Premium Website Redesign

## Context

The current Abrempong Hostel website is functional but lacks the premium, conversion-focused design needed to position the hostel as a top-tier student residence in Accra, Ghana. The redesign aims to create a cinematic, luxurious single-page experience that builds trust, showcases facilities, and converts visitors into residents via both the booking portal and WhatsApp.

## Design System

### Color Palette — Dark Luxe with Gold
- **Primary backgrounds**: `#050505`, `#080808`, `#0a0a0a`, `#0d0d0d`, `#0f0f0f` (alternating dark shades for visual rhythm)
- **Accent**: `#C8A96A` (gold — buttons, icons, headings, highlights, borders)
- **Text primary**: `#FFFFFF` at varying opacities (`1.0`, `0.8`, `0.6`, `0.4`)
- **WhatsApp green**: `#25D366` (used only for WhatsApp-specific elements)
- **Card borders**: `rgba(200, 169, 106, 0.15)` (subtle gold tint)
- **Card backgrounds**: `rgba(200, 169, 106, 0.08)` to `rgba(200, 169, 106, 0.12)`

### Typography
- **Headings**: `'Playfair Display', serif` — weights 400, 600, 700
- **Body**: `'Inter', sans-serif` — weights 300, 400, 500, 600
- **Section labels**: Inter, 9-10px, letter-spacing 3-4px, uppercase, gold color
- **Heading sizes**: Section titles ~32-40px desktop, responsive scaling

### Animations
- **Scroll reveals**: IntersectionObserver-triggered fade-in + translateY(20px→0) with staggered delays per element
- **Count-up**: Stats animate from 0 to target value over ~2s using requestAnimationFrame when Trust Bar enters viewport
- **Video**: Autoplay, muted, loop, playsinline. Minimal dark gradient overlay.
- **Hover effects**: Cards lift with subtle translateY(-4px) + shadow. Images zoom with scale(1.05).
- **Carousel**: Auto-rotate testimonials every 5s with crossfade transition
- **CTA text fade-in**: Hero tagline and buttons fade in after 2s delay
- **Scroll indicator**: Bounce animation at bottom of hero

### Spacing & Layout
- Max container: `max-w-7xl` (1280px)
- Section padding: `py-20 md:py-28 px-6 md:px-10`
- Card border-radius: `rounded-xl` to `rounded-2xl`
- Button border-radius: `rounded-full`
- Grid gaps: `gap-6` to `gap-8`

## Page Structure — 13 Sections

### 1. Navbar (Fixed)
- **File**: `src/pages/home/components/Navbar.tsx`
- Transparent on page load, becomes solid dark (`#0a0a0a`) with backdrop-blur after 60px scroll
- Logo left: "ABREMPONG" in Playfair Display, gold
- Desktop nav links: Rooms, Amenities, Gallery, Booking (smooth scroll)
- Two CTA buttons: "Book Now" (gold solid, links to `https://app.abremponghostel.com/book`) + WhatsApp icon
- Mobile: hamburger menu with full-screen overlay

### 2. Hero — Video Dominant
- **File**: `src/pages/home/components/Hero.tsx`
- `public/herovideo.mp4` fills full viewport (`100vh`), `object-fit: cover`, autoplay, muted, loop, playsinline
- Minimal dark gradient overlay: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))`
- Centered content (appears after 2s fade-in):
  - Small gold label: "ABREMPONG HOSTEL" (uppercase, letter-spacing 4px)
  - Brief tagline: "Premium Student Living in Madina, Accra" (white, 14px)
  - Two CTAs: "Book a Room" (gold solid pill) + "WhatsApp Us" (white ghost pill)
- Scroll indicator at bottom with bounce animation
- No heavy headline — video speaks for itself

### 3. Trust Bar — Animated Counters
- **File**: New component `src/pages/home/components/TrustBar.tsx`
- Dark background (`#0a0a0a`)
- 4 stats in a flex row: `200+` Happy Residents, `4.8★` Google Rating, `24/7` Security, `5+` Years
- **Animated count-up**: Numbers roll from 0 to target when section enters viewport (IntersectionObserver + requestAnimationFrame). Stars character appears after count. "24/7" treated as text, not counted.
- Gold numbers (Playfair Display, ~28-36px), muted white labels (Inter, ~12px)

### 4. About
- **File**: `src/pages/home/components/About.tsx`
- Two-column layout: image left (with floating "Est. 2019" gold badge), text right
- Section label: "ABOUT US" (gold, uppercase)
- Heading: "Premium Living in the Heart of Madina"
- Body text: Existing about copy describing value proposition
- Scroll-triggered fade-in animation
- Image: Use existing CDN image or local photo

### 5. Rooms — Prominent Pricing
- **File**: `src/pages/home/components/Rooms.tsx`
- Section label: "OUR ROOMS" → Heading: "Choose Your Space"
- 3 cards in responsive grid (1→2→3 columns):
  - **Standard Single** — GH₵650/month — "Most Popular" badge
  - **Deluxe Single** — GH₵850/month — "Best Value" badge
  - **Shared Double** — GH₵450/month — "Budget Friendly" badge
- Each card: image top, badge overlay, room name, **prominent gold price**, 4 features with checkmarks, dual CTA ("Check Availability" → booking portal, "WhatsApp" → wa.me link)
- Dark card backgrounds with gold-tinted borders
- Hover: card lifts, image zooms

### 6. Safety & Security (NEW)
- **File**: New component `src/pages/home/components/Safety.tsx`
- Section label: "YOUR SAFETY MATTERS" → Heading: "Secured Living, Peace of Mind"
- 2x2 grid of security features:
  - Smart Door Access (keycard entry) — use `door-security-system.jpeg`
  - CCTV Coverage (24/7 monitoring)
  - Security Personnel (on-site guards)
  - Gated Compound (controlled access)
- Each card: gold icon, title, description
- Dark cards with gold accent borders
- Optional: large background image of the security system

### 7. Amenities
- **File**: `src/pages/home/components/Amenities.tsx`
- Section label: "AMENITIES" → Heading: "Everything You Need"
- Grid of amenity items (responsive 2→3→4 columns):
  - High-Speed WiFi, 24/7 Security, Water Supply, Electricity (+ backup), Prime Location, Parking, Gym, Game Space, Laundry, Minimart, Restaurant, Clean Environment
- Each item: Lucide React icon (gold), title, short description
- Staggered fade-in animation on scroll

### 8. Gallery
- **File**: `src/pages/home/components/Gallery.tsx`
- Section label: "GALLERY" → Heading: "See For Yourself"
- Masonry grid layout using local images from `public/`:
  - `exterior.jpeg`, `exterior1.jpeg` (building exterior)
  - `commonliningarea.jpeg` (common areas)
  - `gym.jpeg`, `gym2.jpeg` (gym facilities)
  - `astroturf1.jpeg`, `astroturf2.jpeg` (sports)
  - `resto.jpeg` (restaurant)
  - `laundry.jpeg` (laundry)
  - `minimart.jpeg` (minimart)
  - `game-space.jpeg` (game room)
- Lightbox modal with arrow navigation + escape key
- Subtle gold border on hover
- Lazy loading for all images

### 9. Student Life (NEW)
- **File**: New component `src/pages/home/components/StudentLife.tsx`
- Section label: "STUDENT LIFE" → Heading: "More Than Just A Room"
- Horizontal scrollable cards (snap scroll):
  - Astroturf Sports → `astroturf1.jpeg`, `astroturf2.jpeg`, `astroturf3.jpeg`
  - Game Room → `game-space.jpeg`
  - Restaurant & Dining → `resto.jpeg`, `resto1.jpeg`
  - Fitness Center → `gym.jpeg`, `gym2.jpeg`
  - Common Areas → `commonliningarea.jpeg`
- Each card: full-width image, title overlay at bottom, short description
- Horizontal scroll with CSS snap and custom scrollbar

### 10. Testimonials
- **File**: `src/pages/home/components/Testimonials.tsx`
- Section label: "TESTIMONIALS" → Heading: "What Residents Say"
- Carousel with existing 4 reviews:
  - Kwame Asante (UG Student) — 5 stars
  - Abena Mensah (GIMPA Postgrad) — 5 stars
  - Emmanuel Boateng (Young Professional) — 5 stars
  - Ama Owusu (Accra Technical University) — 5 stars
- Gold star ratings, italic quote text, reviewer name + school
- Auto-rotate 5s + manual arrow buttons + dot indicators

### 11. Location
- **File**: `src/pages/home/components/Location.tsx`
- Section label: "LOCATION" → Heading: "Find Us in Madina"
- Two-column: location highlights left (4 items with icons), Google Maps embed right
- Address box with map pin icon
- "Get Directions" gold button

### 12. FAQ (NEW)
- **File**: New component `src/pages/home/components/FAQ.tsx`
- Section label: "FAQ" → Heading: "Common Questions"
- Accordion-style expandable items with gold "+" / "−" toggle:
  - What's included in the rent?
  - How do I book a room?
  - What are the payment options?
  - What's the move-in process?
  - Are there house rules?
  - Is there a caretaker on site?
  - Can I visit before booking?
  - What's the cancellation policy?
- Smooth expand/collapse animation
- Only one item open at a time

### 13. Booking — Dual CTA
- **File**: `src/pages/home/components/Booking.tsx`
- Section label: "BOOK NOW" → Heading: "Ready to Move In?"
- Two-column layout:
  - **Left**: Booking form (Full Name, Phone, Email, Move-in Date, Room Type, Message) — submits to existing Readdy API (`https://readdy.ai/api/form/d77vojb86jhav3jpf05g`)
  - **Right**: WhatsApp card — large WhatsApp icon, "Chat with us directly", opens `https://wa.me/233244000000` with pre-filled message
- Both paths equally prominent
- Success confirmation after form submission

### 14. Footer
- **File**: `src/pages/home/components/Footer.tsx`
- Dark background (`#050505`)
- Three-column: Brand (logo + tagline), Quick Links, Contact Info
- Social icons: Instagram, Facebook, Twitter/X, WhatsApp
- Copyright notice

### 15. WhatsApp Float
- **File**: `src/pages/home/components/WhatsAppFloat.tsx`
- Fixed bottom-right floating button
- Appears after 2s delay
- Green pulse animation ring
- Opens WhatsApp with pre-filled booking inquiry message

## Files to Create
- `src/pages/home/components/TrustBar.tsx` — Animated trust/stats bar
- `src/pages/home/components/Safety.tsx` — Safety & Security section
- `src/pages/home/components/StudentLife.tsx` — Student Life / Community section
- `src/pages/home/components/FAQ.tsx` — FAQ accordion section

## Files to Modify (Full Redesign)
- `src/pages/home/page.tsx` — Add new sections to page composition
- `src/pages/home/components/Navbar.tsx` — Dark luxe styling + dual CTA
- `src/pages/home/components/Hero.tsx` — Video-dominant, minimal text, delayed fade-in
- `src/pages/home/components/About.tsx` — Dark palette update
- `src/pages/home/components/Rooms.tsx` — Dark cards, prominent pricing, dual CTA
- `src/pages/home/components/Amenities.tsx` — Dark palette, updated grid
- `src/pages/home/components/Gallery.tsx` — Local images, dark theme, gold hover borders
- `src/pages/home/components/Testimonials.tsx` — Dark theme, gold stars
- `src/pages/home/components/Location.tsx` — Dark palette
- `src/pages/home/components/Booking.tsx` — Dual CTA layout (form + WhatsApp)
- `src/pages/home/components/Footer.tsx` — Dark palette update
- `src/pages/home/components/WhatsAppFloat.tsx` — Styling consistency
- `tailwind.config.ts` — Add custom colors (gold, dark shades) to theme
- `index.html` — Update meta description and title for SEO

## Assets Usage
- **Video**: `public/herovideo.mp4` — Hero section (autoplay, muted, loop)
- **Local images**: All `public/*.jpeg` files used across Gallery, Student Life, Safety sections
- **CDN images**: Retained as fallbacks or for sections without local photo coverage
- **Icons**: Lucide React (already installed) for amenities, features, and UI elements

## External Integrations (Unchanged)
- Booking portal: `https://app.abremponghostel.com/book`
- WhatsApp: `https://wa.me/233244000000`
- Form API: `https://readdy.ai/api/form/d77vojb86jhav3jpf05g`
- Google Maps: Embedded iframe for location

## Verification

1. **Dev server**: Run `npm run dev`, open `http://localhost:3000`
2. **Visual check**: Verify all 13 sections render with correct dark palette and gold accents
3. **Video**: Confirm `herovideo.mp4` plays on loop, muted, fullscreen in hero
4. **Animations**: Scroll down and verify fade-in animations, count-up in trust bar
5. **Responsive**: Test at 375px (mobile), 768px (tablet), 1280px+ (desktop)
6. **CTAs**: Click "Book a Room" → opens booking portal. Click "WhatsApp Us" → opens WhatsApp
7. **Gallery**: Click images → lightbox opens with navigation
8. **FAQ**: Click questions → expand/collapse accordion
9. **Booking form**: Fill and submit → success confirmation
10. **Build**: Run `npm run build` — verify no errors
