# Brylo House — QR Code Menu

## Overview
Browse-only digital menu accessed via QR code (placed on tables) on customer smartphones, and also usable on the pickup-counter iPad. No ordering functionality — display only.

## Device Support
- Accessed via QR code scan on customer's own smartphone, or on the pickup iPad
- Must work well across: small phones (~375px wide), large phones (~430px), tablets portrait (~768px), tablets landscape (~1024px+)
- Meta viewport: width=device-width, initial-scale=1 (no scale locking — standard pinch-zoom/pan allowed)

## Layout
- Header: full-width espresso-brown (#4C3734) banner, centered "BRYLO" wordmark (Playfair Display, wide letter-spacing) with "HOUSE" in a small ribbon/banner shape underneath
- Below header: centered outlined pill/badge shaped button reading "MENU" (decorative border, like a label)
- Category nav bar below that: All | ESPRESSO | V60 | MATCHA & COLD | DESSERT | WATER — horizontal, underlined active state, thin divider line under the whole nav
- Nav is horizontally scrollable on narrow screens (overflow-x: auto; white-space: nowrap) instead of wrapping to multiple lines
- Item grid: responsive — 4 columns on desktop/iPad landscape, 2-3 columns on tablet portrait/large phones, 1-2 columns on small phones (CSS Grid + media queries)
- Each card = photo (square-ish, rounded corners) + item name (bold) + price below in italics
- Images scale with max-width: 100%; height: auto — no fixed pixel dimensions
- Background: platinum/off-white (#E5E4E2) throughout, cards have no visible border, just image + text

## Interaction
- Clicking a category in the nav (ESPRESSO, V60, MATCHA & COLD, DESSERT, WATER) smooth-scrolls the page down to that section's heading
- "All" scrolls back to the top
- Nav bar is sticky — stays pinned at the top of the viewport as the page scrolls
- Use position: sticky; top: 0; z-index: 10; with platinum (#E5E4E2) background so content doesn't show through underneath it
- Use CSS scroll-behavior: smooth with anchor links (<a href="#espresso">), or JS element.scrollIntoView({ behavior: 'smooth' })
- Each section needs a matching id attribute (e.g. <section id="espresso">) for the anchor links to target
- Add scroll-margin-top on each section (roughly the nav's height) so headings aren't hidden under the sticky nav after scrolling

## Sections & Items

### ESPRESSO
*Choose your origin: Brazil or Ethiopia. Available hot or iced.*
| Item | Price |
|---|---|
| Espresso | AED 24.00 |
| Americano | AED 24.00 |
| Cappuccino | AED 24.00 |
| Flat White | AED 24.00 |
| Piccolo | AED 24.00 |
| Cortado | AED 27.00 |
| Latte | AED 27.00 |
| Spanish Piccolo | AED 27.00 |
| Spanish Cortado | AED 27.00 |
| Spanish Latte | AED 29.00 |

### V60 POUR-OVER
*Every V60 is served hot or iced at the same price.*
| Item | Price |
|---|---|
| Origin | AED 27.00 |
| Chacleet | AED 37.00 |
| House Blend | AED 37.00 |

### MATCHA & COLD
| Item | Price |
|---|---|
| Salted Matcha | AED 27.00 |
| Classic Matcha | AED 34.00 |
| Ice Cloudy Matcha | AED 34.00 |
| Creamy Sweet Matcha | AED 34.00 |
| Cinnamon Oasis | AED 29.00 |
| Classic Frappe | AED 27.00 |
| Acai | AED 37.00 |
| Hibiscus | AED 27.00 |
| Pina Colada | AED 24.00 |
| Passion Fruit | AED 29.00 |
| Brazilian Lemonade | AED 27.00 |

### DESSERT
| Item | Price |
|---|---|
| Ice Cream Cheesecake (Passion Fruit / Berry / Lotus) — 3 pc | AED 27.00 |
| Ice Cream Cheesecake (Passion Fruit / Berry / Lotus) — 5 pc | AED 40.00 |
| Mini Almond French Toast | AED 24.00 |

### WATER (Mineral Water)
| Item | Price |
|---|---|
| Sparkling | AED 13.00 |
| Still | AED 13.00 |

## Assets
- Header wordmark, MENU badge, and decorative dividers: SVG (assets/logo.svg, assets/menu-badge.svg, etc.)
- Product photos: WebP images (assets/Espresso.webp, assets/Latte.webp, etc. — filenames match item names)

## Brand Tokens
- Colors: terracotta #C98A5E, espresso #4C3734, taupe #8F7F72, platinum #E5E4E2
- Fonts: Playfair Display (headings/wordmark), Jost (body/prices/nav)
- Tone: warm, minimal, elegant — generous white space, no clutter