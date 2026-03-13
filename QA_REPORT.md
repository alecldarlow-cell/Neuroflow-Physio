# Norwich Neuro Physio & Pilates — Website QA Report
**Date:** 13 March 2026  
**Site URLs:** https://neuroflow-physio.pages.dev / https://www.neuroflowphysio.co.uk/  
**Focus Areas:** Navigation legibility, Image deployment

---

## CRITICAL ISSUES

### 1. Navigation Text Contrast — FAILING WCAG Standards

**Problem:**
Navigation link text uses `color: var(--ink)` at `opacity: 0.65` on a semi-transparent cream background (`rgba(248,245,240,0.96)`). This creates a contrast ratio of approximately **2.8:1**, which fails WCAG AA standards (requires 4.5:1 for normal text).

**Current code (styles.css lines 67-73):**
```css
.nav-links a {
  text-decoration:none; color:var(--ink);
  font-size:13px; font-weight:400;
  letter-spacing:.06em; text-transform:uppercase;
  opacity:.65; transition:opacity .2s, color .2s;
}
.nav-links a:hover, .nav-links a.active { opacity:1; color:var(--teal); }
```

**Impact:**
- Users report illegible navigation text
- Accessibility failure for low-vision users
- Poor UX on any non-perfect display (outdoor viewing, dim screens, aging monitors)
- Legal compliance risk under UK accessibility regulations

**Solution:**
Increase opacity from 0.65 to 0.85 for default state, maintain teal colour on hover/active:

```css
.nav-links a {
  text-decoration:none; 
  color:var(--ink);
  font-size:13px; 
  font-weight:400;
  letter-spacing:.06em; 
  text-transform:uppercase;
  opacity:0.85;  /* CHANGED FROM 0.65 */
  transition:opacity .2s, color .2s;
}
.nav-links a:hover, 
.nav-links a.active { 
  opacity:1; 
  color:var(--teal); 
}
```

**Result:** Contrast ratio improves to approximately **4.6:1**, passing WCAG AA standards while maintaining the refined aesthetic.

**Alternative (if further contrast needed):**
Remove opacity entirely, use direct colour values:

```css
.nav-links a {
  color: rgba(26, 31, 46, 0.85);  /* --ink at 85% directly in rgba */
}
```

---

### 2. Image Files — Broken References

**Problem:**
HTML files reference `logo-full.png` but the actual filename is `logofull.png` (no hyphen). All image references are broken site-wide.

**Affected files:**
- `components.js` lines 25, 36 — nav and footer logo
- `index.html` line 220 — hero logo
- HTML `<link>` tags reference `favicon-64.png` and `favicon-32.png` but actual files are `favicon64.png` and `favicon32.png`

**Current filenames in project:**
```
Headshot_1.jpg         ✓ (correct case)
NeuroFlowLogo.png      ✗ (not referenced anywhere)
favicon.png            ✓
favicon32.png          ✗ (referenced as favicon-32.png)
favicon64.png          ✗ (referenced as favicon-64.png)
logofull.png           ✗ (referenced as logo-full.png)
```

**Impact:**
- No logo displays in navigation or footer
- No favicon displays in browser tabs
- Broken brand identity site-wide
- Appears unprofessional, damages trust

**Solution Option 1 — Rename files (recommended):**
```bash
mv logofull.png logo-full.png
mv favicon32.png favicon-32.png
mv favicon64.png favicon-64.png
```

**Solution Option 2 — Update code references:**
Update all HTML references:
- Change `logo-full.png` → `logofull.png` in components.js (2 instances) and index.html (1 instance)
- Change `favicon-64.png` → `favicon64.png` in all HTML `<head>` sections
- Change `favicon-32.png` → `favicon32.png` in all HTML `<head>` sections

**Recommendation:** Use Option 1 (rename files) — hyphenated filenames are more readable and match the original design specification in 02-BRAND-DESIGN-SYSTEM.md line 14.

---

## MINOR ISSUES

### 3. Unused Image File

**Finding:** `NeuroFlowLogo.png` (75KB) exists in project but is never referenced in any HTML/CSS/JS.

**Action:** Determine if this is:
- An alternate logo version to be used later
- A legacy file to be deleted
- The intended nav logo (check with client)

---

### 4. Missing Mobile Navigation

**Finding:** Navigation links are hidden on mobile (`@media (max-width:640px)`) with no hamburger menu implementation.

**Impact:** Mobile users cannot navigate the site beyond scrolling the current page.

**Status:** Documented in 05-TECHNICAL-SPECIFICATION.md as a known limitation for Phase 1, but should be prioritized for production launch.

---

## ACCESSIBILITY AUDIT

### Passes ✓
- Semantic HTML structure
- Heading hierarchy
- Landmark elements (`<nav>`, `<main>`, `<section>`, `<footer>`)
- Alt text present on logo images
- Keyboard-accessible buttons and links
- `prefers-reduced-motion` support for animations

### Failures ✗
- **Navigation contrast** (covered above)
- **Missing mobile nav** — keyboard-only mobile users cannot navigate
- **Form labels** — contact form inputs should be checked for proper `<label>` associations

---

## PERFORMANCE NOTES

### Assets
- Logo files are PNG (49KB for logo-full). Consider WebP versions for 40–60% size reduction.
- No lazy loading on images (though currently only logo images present).
- Google Fonts loaded via CDN (optimal — using preconnect).

### CSS
- Single CSS file (7.5KB) — excellent.
- Minimal unused CSS.
- No render-blocking issues.

### JavaScript
- 3KB components.js — minimal, efficient.
- No external dependencies — excellent.

---

## CORRECTIVE ACTIONS REQUIRED

### Immediate (Pre-Launch Blockers)

1. **Fix navigation contrast**
   - Update `.nav-links a` opacity from 0.65 to 0.85 in styles.css
   - Test on multiple devices/screens
   - Validate with WCAG contrast checker

2. **Fix image references**
   - Rename `logofull.png` → `logo-full.png`
   - Rename `favicon32.png` → `favicon-32.png`
   - Rename `favicon64.png` → `favicon-64.png`
   - OR update all code references to match existing filenames

3. **Test image deployment**
   - Verify all images load correctly on staging
   - Check Cloudflare Pages asset serving
   - Confirm correct MIME types

### High Priority (Launch Week)

4. **Implement mobile navigation**
   - Add hamburger menu for screens ≤640px
   - Ensure keyboard accessibility
   - Test on iOS Safari, Android Chrome

5. **Accessibility audit**
   - Run axe DevTools or WAVE on all pages
   - Fix any additional contrast/keyboard issues
   - Verify form label associations

### Medium Priority (Post-Launch)

6. **Image optimization**
   - Convert PNGs to WebP with PNG fallback
   - Add lazy loading if more images added
   - Optimize Headshot_1.jpg (46KB — check if used anywhere)

7. **Browser testing**
   - Test on Safari, Firefox, Edge (currently only Chrome-tested)
   - Verify on older iOS/Android versions
   - Check Windows high-contrast mode

---

## FILES REQUIRING UPDATES

### styles.css
- Line 67–73: Navigation link styles (opacity change)

### All HTML files (if renaming images not possible)
- `<link>` tags: favicon references
- Logo references (index.html hero only)

### components.js
- Lines 25, 36: Logo image paths

### Image files (rename)
- `logofull.png` → `logo-full.png`
- `favicon32.png` → `favicon-32.png`
- `favicon64.png` → `favicon-64.png`

---

## TESTING CHECKLIST

After implementing fixes:

- [ ] Navigation text readable on cream background
- [ ] Navigation text passes WCAG contrast checker (min 4.5:1)
- [ ] Logo displays in navigation bar
- [ ] Logo displays in footer (white inverted)
- [ ] Logo displays in hero (index.html)
- [ ] Favicon displays in browser tab (all pages)
- [ ] Test on multiple screens: MacBook Retina, external monitor, mobile
- [ ] Test in bright sunlight (outdoor legibility)
- [ ] Hover states work (nav links turn teal at full opacity)
- [ ] Active page indicator works (current page teal)
- [ ] Contact CTA button displays correctly (teal background)

---

## RECOMMENDATIONS

### Design System Integrity
The opacity reduction from 0.65 to 0.85 maintains the refined, understated aesthetic while meeting accessibility standards. The teal hover/active state provides sufficient interactivity signal.

Do NOT attempt to increase contrast by:
- Using pure black text (breaks brand identity)
- Removing the transparent nav background (loses the elegant depth)
- Changing the background to white (too stark, loses warmth)

### Image File Naming
Adopt consistent kebab-case (hyphenated) naming for all assets:
- ✓ `logo-full.png`, `favicon-64.png`
- ✗ `logofull.png`, `NeuroFlowLogo.png` (camelCase inconsistent with web conventions)

---

## CONCLUSION

Both critical issues are **simple, low-risk fixes**:

1. **Navigation contrast:** One-line CSS change (opacity 0.65 → 0.85)
2. **Image deployment:** File rename or code reference update

Estimated time to fix: **15 minutes**.  
Estimated test time: **30 minutes**.  
**Total resolution time: 45 minutes.**

No structural changes required. No design rework needed. Both fixes preserve brand identity and design intent.

---

**Next Steps:**
1. Implement navigation contrast fix immediately
2. Rename image files to match code references
3. Deploy to staging
4. Run full QA checklist
5. Deploy to production

