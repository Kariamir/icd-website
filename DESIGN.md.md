---
project: "ICD — شرکت بین‌المللی توسعه ساختمان"
version: "1.0.0"
theme: "Luxury Architecture & Real Estate"
direction: "RTL"
primary_language: "fa-IR"
status: "Active"
colors:
  background: "#F6F5F1"
  dark: "#1B2230"
  primary: "#1F4068"
  accent: "#B08D57"
  glass: "#CFE3EE"
  sky: "#E9EEF3"
fonts:
  display: "Noto Serif"
  body: "Vazirmatn"
  mono: "JetBrains Mono"
---

# Design System & Brand Strategy
**ICD — شرکت بین‌المللی توسعه ساختمان**

## 1. Brand Rationale
We position ICD not as a traditional real estate broker, but as a premier architectural force. The visual identity reflects permanence, precision, and physical weight. We optimize the experience for high-net-worth investors, luxury home buyers, and international partners. The interface must project quiet confidence—allowing the architecture to speak without interface noise.

## 2. Color System
We map our digital palette directly to physical building materials and environmental lighting. 

* **Background [Cloudline] (`#F6F5F1`):** Acts as raw limestone. We use this to provide vast, warm whitespace that frames structural photography.
* **Dark [Basalt] (`#1B2230`):** Anchors the layout. We deploy this for heavy structural blocks, text, and inverted footer sections to create mass.
* **Primary Blue [Hakim Blue] (`#1F4068`):** Evokes structural blueprints and twilight skies. We use this for primary typographic hierarchy and structural accents.
* **Gold Accent [Brass] (`#B08D57`):** Signals premium finishing. We use this sparingly—strictly for micro-interactions, active states, and discrete structural lines.
* **Glass [Glass Pane] (`#CFE3EE`):** Suggests modern steel-and-glass facades. We utilize this for subtle data visualizations or structural overlay highlights.
* **Sky [Pale Sky Mist] (`#E9EEF3`):** Provides a cool secondary background to separate content zones without relying on harsh lines.

## 3. Typography Architecture
We construct the typographic hierarchy to balance heritage and technical precision.

* **Display / Headlines (Noto Serif):** * *Weight:* 500-600.
    * *Usage:* Apply strictly to massive hero statements, pull quotes, and major section headers. It brings a grounded, editorial authority.
* **Body (Vazirmatn):** * *Weight:* 300-600.
    * *Usage:* Native Persian readability. Clean, geometric, and perfectly optimized for our RTL layout. Use 300 for long-form paragraphs and 600 for sub-headers.
* **Data / Technical (JetBrains Mono):** * *Usage:* Inject this for specs, coordinates, floorplan dimensions, and tags. It signals engineering rigor and data-driven precision.

## 4. Layout Principles
* **RTL Priority:** We design the flow right-to-left. Leading edges, typographical alignment, and grid starts originate from the right.
* **Minimal Whitespace-Heavy:** We give elements immense breathing room. Whitespace is a luxury asset. Do not cram details.
* **High Contrast:** We alternate between Cloudline and Basalt blocks to simulate walking from blinding daylight into a shadowed, premium interior space.
* **Structural Grid:** Align all elements to a strict 12-column baseline. Off-grid elements are prohibited.

## 5. Motion & Interaction Style
We reject playful, bouncy digital motion. Our motion system mirrors heavy, physical machinery and cinematic drones.

* **Timing:** Slow and deliberate. Duration strictly between `0.9s` and `1.2s`.
* **Easing:** Restrict all curves to `ease-out-cubic`. Movement starts decisively and settles smoothly.
* **Triggers:** Utilize scroll-triggered entrance animations to reveal sections as the user navigates downward.
* **Camera:** Emulate slow, deliberate crane and drone sweeps for any spatial or 3D transitions.
* **Prohibitions:** Zero bounce, zero elasticity, no playful motion whatsoever. 

## 6. Strict Anti-Patterns
We rigorously enforce these boundaries to protect the brand's architectural aesthetic. Reject any design failing these criteria:

* **No Purple/Violet Gradients:** These destroy the grounded, physical material metaphor.
* **No Rounded Pill Buttons:** Soft shapes look cheap. Enforce a maximum border radius of `2px` for a sharp, machined edge.
* **No Card-in-Card Nesting:** Keep the z-index hierarchy flat. Nested boxes create clutter. Use typography and whitespace for grouping instead.
* **No Inter or Roboto:** Avoid generic SaaS typography. Stick strictly to our defined stack.
* **No Generic Stock Aesthetic:** Refuse high-saturation, generic lifestyle photography. Mandate high-contrast, directional-lit architectural and structural imagery.
