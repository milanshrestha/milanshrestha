# Home Page Content & Migration Plan

Extracted from [Milan Shrestha's Live Portfolio](https://milanshrestha.pages.dev/) and structured for the codebase.

---

## Part 1: Extracted Live Home Page Content

### 1. Hero Section
* **Subtitle/Tagline:** Bridging Nepalese hospitality with modern technology.
* **Greeting / Heading:** Hello, I’m Milan Shrestha — IT Manager in Hospitality Industry.

### 2. Technologies / Key Services Section
* **Heading:** Technologies
* **Subtitle:** Highlighting key services that IT overlooks in hotels.
* **Items:**
  1. *Wi-Fi & Network Management:* Ensuring seamless and secure internet access for guests is a top priority...
  2. *PMS & POS System Integration:* We integrate and maintain Property Management Systems (PMS) and Point of Sale (POS)...
  3. *In-Room Technology & Entertainment:* Enhance the guest experience with modern in-room technology...
  4. *Data Security & Privacy Compliance:* Protecting sensitive guest data is paramount...
  5. *Backup & Disaster Recovery:* Business continuity is crucial...
  6. *Vendor Management & IT Procurement:* Managing relationships with technology vendors...
  7. *Online Travel Agency (OTA) & Channel Management:* Managing the hotel's presence on OTAs...
  8. *Digital Marketing & SEO:* Driving direct bookings and increasing brand visibility...
  9. *Reputation & Review Management:* Monitoring and managing online reputation...

### 3. About Preview & Bio
* **Heading:** About MS
* **Tagline:** IT Manager by day — Programmer by night
* **Bio / Description:** Personal portfolio of Milan Shrestha.

### 4. Recent Notes / Articles
* Second Blog Post
* First Blog Post with 11ty Site Generator
* Driving Sustainability in Hotels Through Smart Technology Solutions

### 5. Contact CTA
* **Heading:** Build Contact
* **Subtext:** Have a project in mind or want to connect? I'd be happy to hear from you.
* **Action:** Let's Connect

---

## Part 2: Codebase Home Page Format (`src/index.njk` & `src/_data/homePage.json`)

The current codebase home page format utilizes a modular, data-driven Eleventy template (`src/index.njk`) fueled by `src/_data/homePage.json`, organized into:
1. **Hero Section:** Avatar, greeting (`homePage.greeting`), professional title (`profile.professionalTitle`), introduction (`profile.introduction`), and primary/secondary action buttons.
2. **Current Focus (`working-on`):** Bulleted list of current projects and systems work.
3. **Featured Articles (Notes):** Dynamic collection grid (`collections.articles`).
4. **Featured Projects:** Dynamic collection grid (`collections.projects`).
5. **About Summary & Contact CTA:** Quick bio summary and call-to-action banner.

---

## Part 3: Content Placement & Migration Plan

### Content Mapping: Live Site vs. Codebase Architecture

| Live Site Section / Content | Codebase Destination File | Migration Strategy & Editorial Best Practices |
| :--- | :--- | :--- |
| **Hero Tagline** (*"Bridging Nepalese hospitality with modern technology."*) | `src/_data/headerData.json` (`siteTagline`) | Keep the sharp positioning (*"IT Manager by day — Programmer by night"* / hospitality bridge) in the global header taglines for instant visitor context. |
| **Hero Greeting** (*"Hello, I’m Milan Shrestha..."*) | `src/_data/homePage.json` (`greeting`) | Refine into an engaging, personal greeting while keeping professional credentials highlighted in the subtitle. |
| **Technologies / Hotel Services** | `src/_data/aboutPage.json` (`hotelTechnologies`) & `src/about.njk` | Place under the dedicated **Hotel Technology Services** section on the About page to showcase specialized industry expertise without cluttering the landing hero. |
| **Recent Notes / Articles** | `src/articles/*.md` collections | Dynamically populated via Eleventy collections sorted by date, ensuring automated publishing updates. |
| **Contact / Let's Connect** | `src/_data/contactPage.json` & `src/contact.njk` | Centralize call-to-action messaging onto the dedicated Contact page and home page CTA banner. |

### Content Writing & Editorial Guidelines
1. **Tone:** Professional yet approachable, highlighting systems thinking, hospitality IT operations, and practical product building.
2. **Decoupling:** All text content is stored exclusively in JSON data files (`homePage.json`, `aboutPage.json`, `contactPage.json`), guaranteeing zero hardcoding in `.njk` templates.
3. **SEO & Metadata:** Each page includes clean meta titles (`base.njk`) and descriptions for optimal SERP display.
