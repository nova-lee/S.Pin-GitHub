# Design System Guidelines — Universal Design DNA

## Overview
When creating or modifying digital products (websites, apps, dashboards, presentations, data visualizations), follow the design system workflow established in the `universal-design-intelligence` skill or this kit's `DESIGN.md`.

## Mandatory Process
Follow this sequence without skipping steps:
1. **Discovery** — Understand requirements and constraints
2. **Project DNA** — Define design system parameters
3. **Build** — Implement designs
4. **Verify** — Run quality gates
5. **Report** — Document results with evidence

## Fixed vs. Variable Elements
**Always maintain:**
- Core principles and Anti AI-Slop guidelines
- Token names and roles
- Accessibility and state criteria
- Quality gates

**Adjust per project:**
- Accent colors
- Typography
- Border radius characteristics
- Density/spacing
- Image tone

**Default values** (when brand info is unavailable): Paper background, ink text, cobalt accent.

## Creating Site Designs
- **Don't improvise.** Reference established sites for structure and techniques—never copy layout, branding, or assets.
  - Document references in the file header as `REFERENCE: [source]`

**3D and Visuals:**
- Base all 3D and visual work on copyright-free, real assets:
  - Use actual nature photography (360° panoramas) for 3D motion
  - Use real furniture models, real crystal photographs, real star/galaxy images
  - Permitted licenses: CC0, Public Domain, CC BY (with attribution)
  - Credit all assets in page footer

**3D Site Deployment:**
- Use domain-specific recipes from `references/3D_BASELINES.md` (Finance: HOGA, Furniture: GYEOL, Travel: MEONGIL) as structural templates
- Restrict 3D to Brand Experience pages only
- Avoid 3D in Utility screens (dashboards, settings)

**Page Transitions:**
- Choose one technique from `references/THREEUI_TECHNIQUES.md`:
  - Option A: CSS nested strip curl
  - Option B: three.js flexible page
  - Option C: CSS book shelving
- Match the technique to your narrative

## Accurate Reporting
- **Never claim work you didn't complete.** Report only executed validation.
- Structure final reports as:
  - Completed validations with results
  - Incomplete validations with reasons
  - Remaining work

**Verification:**
- Don't infer screen quality from code alone—render in browser when possible
- Never use unsourced numbers, fake testimonials, or counterfeit logos
- Label all example data as "example"

## Modifying Existing Projects
**Preserve:**
- API contracts and data structures
- Authentication mechanisms
- Routing architecture
- User flows and business logic
- Don't remove features for design reasons

**Before changes:**
- Create git branch or backup before deleting files or overwriting configs
- Verify all new libraries for: compatibility, duplication, necessity, and bundle impact
- Pin library versions

**Before using libraries** (three.js, GSAP, Lenis, React Three Fiber, Tailwind, etc.):
- Always check current version documentation
- Use documentation lookup tools (e.g., context search) if available
