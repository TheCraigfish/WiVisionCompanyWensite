# cPanel Deployment Guide

## Steps to Deploy on cPanel:

### 1. Build the Project
- Run `npm run build` (already done)
- This creates a `dist` folder with all static files

### 2. Upload Files to cPanel
- **Login to cPanel**
- **Go to File Manager**
- **Navigate to public_html folder**
- **Upload ALL contents from the `dist` folder** (not the folder itself)
- **Upload the `.htaccess` file** to public_html root

### 3. File Structure Should Look Like:
```
public_html/
├── .htaccess
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
├── WiVison_Primary_Logo.png
├── WiVison_Secondary_Logo.png
└── other image files...
```

### 4. Environment Variables (if needed)
- **cPanel doesn't support .env files directly**
- **Contact forms will need alternative setup**
- **Consider using Netlify Forms or Formspree instead**

### 5. Test the Site
- **Visit your domain**
- **Test navigation** (should work with .htaccess)
- **Test contact form** (may need alternative email service)

## Important Notes:
- ✅ **No database needed**
- ✅ **No PHP required**
- ✅ **Just static file hosting**
- ⚠️ **Contact forms need email service setup**
- ⚠️ **Live chat will work (external service)**

## Alternative for Contact Forms:
- Use **Formspree.io** or **Netlify Forms**
- Or set up **PHP mail script** in cPanel