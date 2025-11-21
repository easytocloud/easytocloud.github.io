# Architecture

The website is a static site hosted on GitHub Pages.

## Directory Structure

- `/`: Root directory containing the main landing page (`index.html`), global styles (`styles.css`), and scripts (`script.js`).
- `/assets/`: Images and other static assets.
- `/cloudX/`: Product page for cloudX (multilingual: `/en/` and `/nl/`).
- `/sso-config-generator/`: Product page for SSO Config Generator.
- `/mac-letterhead/`: Product page for Mac-letterhead.

## Shared Components

- **Header**: Contains the logo, navigation menu, and theme/language controls.
- **Footer**: Contains links to resources and social profiles.
- **Styles**: `styles.css` defines CSS variables for colors and spacing, ensuring consistency.
- **Scripts**: `script.js` handles common functionality like the mobile menu and dark mode.

## Navigation

- **Desktop**: Horizontal menu with links to sections and products.
- **Mobile**: Hamburger menu that expands to show navigation links.