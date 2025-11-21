# Development Guide

## Local Development

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/easytocloud/easytocloud.github.io.git
    cd easytocloud.github.io
    ```

2.  **Start a local server**:
    You can use Python's built-in HTTP server:
    ```bash
    python3 -m http.server 8000
    ```

3.  **View the site**:
    Open your browser and navigate to `http://localhost:8000`.

## Making Changes

- **Styles**: Edit `styles.css` for global styling changes. Use CSS variables for colors and spacing.
- **Scripts**: Edit `script.js` for global interactivity.
- **Content**: Edit the respective HTML files. Ensure you update the navigation and footer if adding new pages.

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.