# ExpertBrief Platform - Color Specification

## Color Palette

### Primary Colors
- **Evergreen**: `#0A210F` - Primary brand color, deep professional green
- **Azure Mist**: `#F2FDFF` - Main background, light and clean

### Supporting Colors (derived from palette)
- **Evergreen Light**: `#1a3d28` - Hover states, secondary elements
- **Evergreen Soft**: `#e8f5ed` - Subtle backgrounds, cards
- **Text Dark**: `#1a1a1a` - Primary text color
- **Text Medium**: `#4a4a4a` - Secondary text color
- **White**: `#FFFFFF` - Pure white for contrast elements

### Brand Signature Color
- **Yellow Highlighter**: `#FFD700` or `#FFC107` - Legal markup highlight (PRESERVE FROM ORIGINAL DESIGN)
  - Used exclusively for text highlights like "Quantum expert witness"
  - Represents legal annotation and document review process
  - Core brand differentiator

---

## Component-by-Component Color Application

### 1. HEADER / NAVIGATION
```
Background: #FFFFFF (white)
Logo text: #0A210F (Evergreen)
"START" button: #0A210F (Evergreen)
"START" button text: #FFFFFF (white)
"START" button hover: #1a3d28 (Evergreen Light)
```

### 2. HERO SECTION
```
Background: #F2FDFF (Azure Mist)
"V1.0 PUBLIC BETA" badge:
  - Background: #0A210F (Evergreen)
  - Text: #FFFFFF (white)

Main heading "Train like a real": #0A210F (Evergreen)
Highlighted text "Quantum expert witness." / "Fire expert witness.":
  - Background: #FFD700 or #FFC107 (Yellow/Gold highlighter) ⚠️ KEEP ORIGINAL YELLOW
  - Text: #1a1a1a (Text Dark) or #0A210F (Evergreen)
  - NOTE: This yellow highlighter is a core brand element representing legal markup/annotation

Subtitle text: #4a4a4a (Text Medium)

"START" button:
  - Background: #0A210F (Evergreen)
  - Text: #FFFFFF (white)
  - Hover: #1a3d28 (Evergreen Light)

"GET EARLY ACCESS" button:
  - Background: transparent
  - Border: #0A210F (Evergreen)
  - Text: #0A210F (Evergreen)
  - Hover background: #0A210F (Evergreen)
  - Hover text: #FFFFFF (white)
```

### 3. DOCUMENT PREVIEW CARD
```
Card background: #FFFFFF (white)
Card shadow: rgba(10, 33, 15, 0.08)

Header area:
  - Background: #e8f5ed (Evergreen Soft)
  - Icons: #0A210F (Evergreen)

Title "Riverside Exchange MEP Dispute Documents":
  - Color: #0A210F (Evergreen)

Document list items:
  - Text: #1a1a1a (Text Dark)
  - Radio buttons: #0A210F (Evergreen)
  - Hover background: #F2FDFF (Azure Mist)

"Submit Report" section:
  - Background: #F2FDFF (Azure Mist)
  - Text: #4a4a4a (Text Medium)
  - Button background: #0A210F (Evergreen)
  - Button text: #FFFFFF (white)
  - Button hover: #1a3d28 (Evergreen Light)
```

### 4. "REAL DISPUTES ARE MESSY" SECTION
```
Background: #FFFFFF (white)

Main heading: #0A210F (Evergreen)
Body text: #4a4a4a (Text Medium)

Numbered steps (1, 2, 3):
  - Numbers: #0A210F (Evergreen)
  - Headings: #0A210F (Evergreen)
  - Description text: #4a4a4a (Text Medium)

"START YOUR FIRST SIMULATION" button:
  - Background: #0A210F (Evergreen)
  - Text: #FFFFFF (white)
  - Hover: #1a3d28 (Evergreen Light)
```

### 5. FOOTER
```
Background: #0A210F (Evergreen)
Logo text: #FFFFFF (white)
Body text: #b8cfc3 (light evergreen tint)
Links: #F2FDFF (Azure Mist)
Link hover: #FFFFFF (white)
Copyright text: #b8cfc3 (light evergreen tint)
```

---

## Usage Guidelines

### When to use Evergreen (#0A210F):
- Primary headings and titles
- Navigation logo
- ALL CTA buttons (primary and secondary)
- All interactive buttons (START CASE, UPLOAD REPORT, etc.)
- Active/open folder icons
- Footer background
- Icons and key UI elements
- Breadcrumb navigation
- Link states
- Creates authority and professionalism

### When to use Azure Mist (#F2FDFF):
- Main page background
- Light section backgrounds
- Card highlights
- Provides breathing room and cleanliness

### When to use Yellow Highlighter (#FFD700 / #FFC107):
- ONLY for key text highlights in hero sections
- Represents legal markup/annotation aesthetic
- Core brand signature element
- Should feel like a lawyer's highlighter on important text
- Use sparingly for maximum impact

### When to use White (#FFFFFF):
- Card backgrounds
- Alternative section backgrounds
- Button text on colored backgrounds
- Creates contrast and clarity

---

## Accessibility Notes

All color combinations meet WCAG AA standards:
- Evergreen (#0A210F) on Azure Mist (#F2FDFF): ✓ Pass
- Evergreen (#0A210F) on White (#FFFFFF): ✓ Pass
- Taupe (#8A716A) on White (#FFFFFF): ✓ Pass (for large text)
- White (#FFFFFF) on Evergreen (#0A210F): ✓ Pass
- White (#FFFFFF) on Taupe (#8A716A): ✓ Pass

---

---

## Additional Page Specifications

### SELECT EXPERTISE PAGE
```
Page background: #F2FDFF (Azure Mist)

Page heading "Select Expertise": #0A210F (Evergreen)
Subtitle text: #4a4a4a (Text Medium)

MEP Experts Card:
  - Card background: #FFFFFF (white)
  - Card border: #e5e5e5 (light gray)
  - Card hover border: #0A210F (Evergreen)
  - Icon background: #0A210F (Evergreen)
  - Icon color: #FFFFFF (white)
  - Heading "MEP Experts": #0A210F (Evergreen)
  - Description text: #4a4a4a (Text Medium)
  - "START CASE 001" button:
    * Background: #0A210F (Evergreen)
    * Text: #FFFFFF (white)
    * Hover: #1a3d28 (Evergreen Light)
  - Arrow button (top right):
    * Background: #F2FDFF (Azure Mist)
    * Icon: #0A210F (Evergreen)
    * Hover background: #0A210F (Evergreen)
    * Hover icon: #FFFFFF (white)

Coming Soon Cards (Structural, Delay Analysis):
  - Card background: #FFFFFF (white)
  - Text "COMING SOON": #9ca3af (medium gray)
  - Title text: #d4d4d4 (light gray)
```

### DOCUMENT LIST PAGE
```
Page background: #F2FDFF (Azure Mist)

Breadcrumb navigation:
  - "SIMULATIONS": #0A210F (Evergreen)
  - "MEP CASE 001": #0A210F (Evergreen)
  - Separator "›": #9ca3af (medium gray)

"Return to Selection" link:
  - Text: #4a4a4a (Text Medium)
  - Icon: #0A210F (Evergreen)
  - Hover text: #0A210F (Evergreen)

Page heading "Riverside Exchange MEP Dispute Documents": #0A210F (Evergreen)

Document folders:
  - Closed folder icon: #9ca3af (medium gray)
  - Folder text: #1a1a1a (Text Dark)
  - Open/active folder icon: #0A210F (Evergreen)
  - Open folder text: #0A210F (Evergreen)
  - "OPEN FOLDER" button:
    * Text: #0A210F (Evergreen)
    * Background: transparent
    * Hover background: #e8f5ed (Evergreen Soft)

Submit Report box:
  - Background: #FFFFFF (white)
  - Border: #e5e5e5 (light gray)
  - Heading "Submit Report": #0A210F (Evergreen)
  - Description text: #4a4a4a (Text Medium)
  - "UPLOAD REPORT" button:
    * Background: #0A210F (Evergreen)
    * Text: #FFFFFF (white)
    * Icon: #FFFFFF (white)
    * Hover: #1a3d28 (Evergreen Light)
```

---

## Complete Orange → Evergreen Replacement Map

**FIND AND REPLACE ALL INSTANCES:**

| Current Orange Value | New Evergreen Value | Usage |
|---------------------|---------------------|-------|
| `#ff9500` or `#ff9800` | `#0A210F` | All buttons, icons, accents |
| `#ffa726` or similar light orange | `#1a3d28` | Lighter hover states |
| `#e68900` or similar dark orange | `#1a3d28` | Hover/active states |

**DO NOT CHANGE:**
- Yellow/gold highlighter on "Quantum expert witness" text (keep original value)

---

## Implementation Notes for Cursor

**PRESERVE (DO NOT CHANGE):**
- Yellow highlighter on "Quantum expert witness" / "Fire expert witness" text
- Keep the exact yellow/gold color from original design (#FFD700 or #FFC107 or similar)
- This is a core brand element representing legal markup

**CHANGE:**
- Dark backgrounds (`#1a1a1a`, `#2a2a2a`, etc.) → `#F2FDFF` or `#FFFFFF`
- **ALL orange/yellow accents on buttons/UI** (`#ff9500`, `#ff9800`, `#ffa726`, etc.) → `#0A210F` (Evergreen)
- Keep structure, just update color values in CSS/Tailwind classes

**Specific orange elements to update to Evergreen:**
1. All "START" buttons in headers
2. Icon backgrounds in expertise cards
3. "START CASE 001" buttons
4. Folder icons when active/open
5. "UPLOAD REPORT" button
6. All CTA buttons throughout the site
7. Any UI highlight or accent colors (NOT the text highlighter)

The overall feel should be:
- Professional and trustworthy (Evergreen for all interactive elements)
- Clean and modern (Azure Mist + White)
- Sharp legal focus (Yellow highlighter on key text)
- Strong, cohesive brand identity with evergreen as the dominant action color
