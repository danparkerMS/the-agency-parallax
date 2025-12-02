# Planning Guide

A modern, interactive agency website featuring parallax scrolling effects, multiple content pages, and dynamic content displays with modal interactions and detailed views.

**Experience Qualities**: 
1. **Professional** - Clean, corporate aesthetic that builds trust and credibility with polished visual design
2. **Dynamic** - Engaging parallax effects and smooth transitions that create memorable user interactions
3. **Intuitive** - Clear navigation and content hierarchy that guides users effortlessly through information

**Complexity Level**: Light Application (multiple features with basic state)
  - Multiple pages with different layouts, content persistence, modal interactions, and filtering capabilities

## Essential Features

### Navigation System
- **Functionality**: Global navigation bar with links to all major pages (Home, About, Donations, Events, Projects, Blog)
- **Purpose**: Provides consistent access to all site sections and maintains user orientation
- **Trigger**: Always visible, sticky header
- **Progression**: User clicks nav link → Smooth scroll or page transition → Content loads with animation
- **Success criteria**: Navigation remains accessible, active page is highlighted, smooth transitions between sections

### Home Page with Parallax Sections
- **Functionality**: Hero section with parallax background, feature highlights, call-to-action areas
- **Purpose**: Creates engaging first impression and directs users to key content
- **Trigger**: Landing on site or clicking Home nav link
- **Progression**: Page loads → Parallax hero animates → User scrolls → Sections reveal with stagger effect → CTAs guide to other pages
- **Success criteria**: Smooth parallax effect, no performance lag, clear visual hierarchy

### About Page
- **Functionality**: Information sections about the agency including mission, team, values, timeline
- **Purpose**: Builds credibility and trust by sharing agency story and expertise
- **Trigger**: User navigates to About page
- **Progression**: Page loads → Hero section appears → User scrolls → Info sections reveal progressively → Interactive elements respond to hover
- **Success criteria**: Content is engaging, sections flow logically, interactions feel responsive

### Donations Page (Tile Grid Layout)
- **Functionality**: Grid of donation campaign tiles, each showing preview information
- **Purpose**: Showcase active fundraising campaigns and encourage contributions
- **Trigger**: User navigates to Donations page
- **Progression**: Page loads → Grid of tiles appears → User hovers/clicks tile → Detailed view opens → User can take action
- **Success criteria**: Tiles are visually distinct, hover effects are smooth, details view shows comprehensive information

### Events Page (Tile Grid with Modal Details)
- **Functionality**: Grid of event tiles that open modal dialogs with full event information
- **Purpose**: Display upcoming events and allow users to get details without leaving the page
- **Trigger**: User navigates to Events page, clicks on event tile
- **Progression**: Page loads → Event grid displays → User clicks event → Modal animates open → User views details → Close modal to return
- **Success criteria**: Modals open smoothly, event details are complete, easy to close and return to grid

### Projects Page (Tile Grid Layout)
- **Functionality**: Showcase portfolio of completed and ongoing projects with filtering
- **Purpose**: Demonstrate agency capabilities and past work
- **Trigger**: User navigates to Projects page
- **Progression**: Page loads → Project grid displays → User can filter by category → Click project → Details view opens
- **Success criteria**: Filtering works instantly, projects display attractively, case study details are comprehensive

### Blog Page (Tile Grid to Article View)
- **Functionality**: Grid of blog post previews that link to full article pages
- **Purpose**: Share insights, news, and thought leadership content
- **Trigger**: User navigates to Blog page, clicks on blog post
- **Progression**: Page loads → Blog grid displays → User clicks post → New page opens with full article → User can return to grid
- **Success criteria**: Blog posts are easy to browse, article pages are readable, navigation between posts works

## Edge Case Handling
- **Empty States**: Display helpful messages and CTAs when no content exists for Events, Projects, Donations, or Blog
- **Long Content**: Implement pagination or "load more" for extensive lists to maintain performance
- **Modal Overflow**: Ensure event modals scroll properly when content exceeds viewport height
- **Mobile Navigation**: Hamburger menu collapses navigation on small screens with smooth drawer animation
- **Slow Parallax Devices**: Reduce motion effects on devices that prefer reduced motion or have performance constraints
- **Broken Links**: Handle missing blog posts or project details gracefully with 404-style messaging

## Design Direction
The design should evoke professionalism, trust, and innovation with a corporate-elegant aesthetic featuring bold typography, strategic use of white space, and sophisticated parallax effects that feel premium rather than gimmicky - a minimal interface with purposeful interactive moments.

## Color Selection
Custom palette - A sophisticated, corporate color scheme with strong contrast and professional appeal

- **Primary Color**: Deep Navy Blue (oklch(0.25 0.05 250)) - Conveys trust, professionalism, and stability
- **Secondary Colors**: 
  - Slate Gray (oklch(0.45 0.01 250)) for supporting text and subtle backgrounds
  - Light Silver (oklch(0.96 0.005 250)) for cards and section backgrounds
- **Accent Color**: Vibrant Gold (oklch(0.72 0.15 85)) - Creates energy and draws attention to CTAs and important actions
- **Foreground/Background Pairings**:
  - Background (White #FFFFFF): Navy text (oklch(0.25 0.05 250)) - Ratio 10.8:1 ✓
  - Primary (Deep Navy oklch(0.25 0.05 250)): White text (oklch(1 0 0)) - Ratio 10.8:1 ✓
  - Secondary (Slate oklch(0.45 0.01 250)): White text (oklch(1 0 0)) - Ratio 6.2:1 ✓
  - Accent (Gold oklch(0.72 0.15 85)): Navy text (oklch(0.25 0.05 250)) - Ratio 4.9:1 ✓
  - Card (Light Silver oklch(0.96 0.005 250)): Navy text (oklch(0.25 0.05 250)) - Ratio 9.8:1 ✓
  - Muted (Light Gray oklch(0.93 0.005 250)): Slate text (oklch(0.45 0.01 250)) - Ratio 5.1:1 ✓

## Font Selection
Professional, modern sans-serif typefaces that project authority and clarity - Montserrat for headings (geometric, confident) and Inter for body text (highly legible, neutral)

- **Typographic Hierarchy**: 
  - H1 (Hero Title): Montserrat Bold/56px/tight letter spacing/-0.02em
  - H2 (Section Headings): Montserrat SemiBold/40px/tight letter spacing/-0.01em
  - H3 (Card Titles): Montserrat SemiBold/24px/normal spacing
  - H4 (Subsections): Montserrat Medium/20px/normal spacing
  - Body Large (Intro text): Inter Regular/18px/1.6 line height
  - Body (Main text): Inter Regular/16px/1.6 line height
  - Small (Captions): Inter Regular/14px/1.5 line height

## Animations
Sophisticated and purposeful animations that enhance the premium feel - parallax scrolling creates depth, fade-in reveals guide attention, and micro-interactions provide satisfying feedback without overwhelming or slowing down the experience

- **Purposeful Meaning**: Parallax effects create a sense of depth and luxury, smooth page transitions maintain context, and hover effects on tiles/cards communicate interactivity
- **Hierarchy of Movement**: 
  - Primary: Parallax hero sections with background moving slower than foreground (2-3x speed difference)
  - Secondary: Staggered fade-in animations for content sections as they enter viewport
  - Tertiary: Subtle hover lifts on cards/tiles (4px elevation change with shadow)
  - Micro: Button state changes, icon animations on interaction

## Component Selection
- **Components**: 
  - Navigation: Custom header with sticky positioning and transparent-to-solid transition on scroll
  - Hero Sections: Custom parallax component with background image/gradient layers
  - Cards (shadcn): For Events, Projects, Donations, and Blog tiles with hover effects
  - Dialog (shadcn): For Event detail modals with smooth open/close animations
  - Button (shadcn): Primary (gold accent), Secondary (navy outline), and Ghost variants
  - Tabs (shadcn): For filtering Projects by category
  - Separator (shadcn): Visual breaks between content sections
  - Badge (shadcn): For event dates, project categories, blog tags
  - Scroll Area (shadcn): For modal content that exceeds viewport height

- **Customizations**: 
  - Parallax container component for hero sections with configurable scroll speed
  - Tile grid component with responsive columns (1 mobile, 2 tablet, 3 desktop)
  - Page transition wrapper with fade/slide animations
  - Custom navigation with smooth scroll behavior and active state highlighting

- **States**: 
  - Buttons: Solid fill primary with gold background → darker gold on hover, scale(0.98) on active
  - Cards: Subtle shadow at rest → lifted shadow (0 8px 24px) + translateY(-4px) on hover
  - Modal: Backdrop blur-sm, dialog slides up from center with spring animation
  - Navigation links: Underline appears on hover with gold accent, active page shows gold underline

- **Icon Selection**: 
  - Navigation: House, User, Heart, Calendar, FolderOpen, Article (Phosphor Icons regular weight)
  - Actions: ArrowRight for CTAs, X for close, Plus for add/expand
  - Social: Github, Twitter, LinkedIn, Instagram for footer
  - Content: MapPin for locations, Clock for time, Tag for categories

- **Spacing**: 
  - Page padding: px-6 md:px-12 lg:px-24 (24px/48px/96px)
  - Section spacing: py-16 md:py-24 lg:py-32 (64px/96px/128px)
  - Card padding: p-6 (24px)
  - Grid gaps: gap-6 md:gap-8 (24px/32px)
  - Content max-width: max-w-7xl (1280px) centered

- **Mobile**: 
  - Navigation: Hamburger menu opens full-screen drawer with stacked links
  - Hero text: Reduce from 56px to 36px, adjust line height
  - Grid: Single column on mobile, 2 columns on tablet (768px+), 3 columns on desktop (1024px+)
  - Parallax: Reduce or disable parallax effect on mobile for performance
  - Modals: Full-screen on mobile with slide-up animation
  - Touch targets: Minimum 48px height for all interactive elements
