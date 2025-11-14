# Young Chakma Association (YCA) Website

A beautiful, responsive website for the Young Chakma Association built with HTML, CSS (Tailwind CSS), and JavaScript.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Modern UI**: Clean, professional design with smooth animations
- **Multi-page Navigation**: Complete website with all necessary pages
- **Accessibility**: Proper semantic HTML and ARIA labels

## Pages Included

1. **Home** (`index.html`) - Landing page with hero section and overview
2. **About Us** (`about.html`) - Organization information and mission
3. **CYCA** (`cyca.html`) - Chakma Youth Cultural Association details
4. **Zones** (`zones.html`) - Geographic zones information
5. **Branches** (`branches.html`) - Local branch details
6. **Gallery** (`gallery.html`) - Photo gallery with categories
7. **News & Events** (`news-events.html`) - Latest news and upcoming events
8. **Election** (`election.html`) - Election archive and results
9. **By-Law** (`bylaw.html`) - Organization bylaws and regulations
10. **Membership** (`membership.html`) - Membership information and application
11. **Contact** (`contact.html`) - Contact form and information

## How to Share

### Option 1: Direct Browser Opening
Simply open any of the HTML files in your web browser. All pages are self-contained and will work offline.

### Option 2: Local Server
1. Install Node.js if not already installed
2. Run: `npx serve frontend -p 3000`
3. Open `http://localhost:3000` in your browser

### Option 3: Free Hosting
Upload the `frontend` folder to any static hosting service:
- **GitHub Pages**: Free hosting for public repositories
- **Netlify**: Drag & drop deployment
- **Vercel**: Simple deployment from Git
- **Firebase Hosting**: Google's hosting service

### Option 4: Share as ZIP
Compress the `frontend` folder and share the ZIP file. Recipients can extract and open `index.html` directly.

## File Structure

```
frontend/
├── index.html              # Home page
├── about.html              # About page
├── cyca.html               # CYCA page
├── zones.html              # Zones page
├── branches.html           # Branches page
├── gallery.html            # Gallery page
├── news-events.html        # News & Events page
├── election.html           # Election page
├── bylaw.html              # By-Law page
├── membership.html         # Membership page
├── contact.html            # Contact page
├── assets/
│   └── ycalogo.png         # Logo image
├── css/                    # Additional CSS files (if any)
├── images/                 # Gallery images (if any)
└── js/                     # JavaScript files (if any)
```

## Technologies Used

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework (CDN)
- **JavaScript**: Interactive features and dark mode toggle
- **Google Fonts**: Public Sans font family
- **Material Symbols**: Icon library

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Customization

To customize the website:

1. **Colors**: Update the Tailwind config in each HTML file's `<script>` tag
2. **Content**: Edit the text content in the HTML files
3. **Images**: Replace images in the `assets/` folder
4. **Styling**: Modify Tailwind classes or add custom CSS

## License

This project is created for the Young Chakma Association and can be freely shared and modified.

---

**Made with ❤️ by Angu Macmillan Chakma**
