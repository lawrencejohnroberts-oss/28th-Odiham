# 28th Odiham Scouts Website

A modern, responsive website for the 28th Odiham Scouts group, built with HTML5, CSS3, and JavaScript.

## Features

### 🎯 Core Functionality
- **Responsive Design**: Mobile-first approach, works perfectly on all devices
- **Modern UI/UX**: Clean, engaging design following UK Scouting brand guidelines
- **Interactive Elements**: Smooth animations, hover effects, and user-friendly navigation
- **Accessibility**: WCAG compliant with proper focus management and screen reader support

### 📱 Sections
1. **Hero Section**: Welcome message with call-to-action buttons
2. **Our Sections**: Detailed information about Squirrels, Beavers, Cubs, and Scouts
3. **Activities**: Showcase of what the group does (camping, crafts, games, etc.)
4. **Photo Gallery**: Interactive gallery with lightbox functionality
5. **Join Us**: Membership application form with validation
6. **Contact**: Meeting times, location, and contact information

### 🎨 Design Features
- **UK Scouting Brand Colors**: Official purple, teal, green, yellow, and red
- **Nunito Sans Font**: Official Scouts font family
- **High-Quality Images**: Real scout activity photos
- **Interactive Gallery**: Click to view larger images with captions
- **Mobile Navigation**: Hamburger menu for mobile devices

### 📋 Membership Application
- **Smart Form Validation**: Real-time validation with helpful error messages
- **Age-Based Section Recommendation**: Automatically suggests appropriate section
- **Required Field Checking**: Ensures all necessary information is provided
- **Email Format Validation**: Validates email addresses
- **UK Phone Number Formatting**: Formats phone numbers in UK format

### 🛠️ Technical Features
- **Vanilla JavaScript**: No external dependencies for fast loading
- **CSS Grid & Flexbox**: Modern layout techniques
- **Intersection Observer**: Smooth scroll animations
- **Local Storage**: Remembers user preferences
- **SEO Optimized**: Proper meta tags and semantic HTML

## File Structure

```
website/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This documentation
└── server.log          # Server logs (when running locally)
```

## Local Development

To run the website locally:

1. Navigate to the website directory
2. Start a local server:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and go to `http://localhost:8000`

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Colors
The website uses CSS custom properties for easy color customization:
- `--scout-purple`: #7413dc (Primary brand color)
- `--scout-navy`: #003982
- `--scout-teal`: #00a794
- `--scout-green`: #23a950
- `--scout-yellow`: #ffe627
- `--scout-red`: #ed3f23

### Content Updates
- **Meeting Times**: Update in the "Our Sections" and "Contact" sections
- **Images**: Replace image URLs in HTML with your own photos
- **Contact Information**: Update email addresses and phone numbers
- **Activities**: Modify the activities grid to reflect your group's specific activities

### Form Integration
The membership form currently logs data to the console. To integrate with a backend:

1. Replace the form submission handler in `script.js`
2. Add your server endpoint
3. Configure proper form processing on your server

Example integration:
```javascript
fetch('/api/membership-application', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formObject)
});
```

## Deployment

### Static Hosting
The website is ready for deployment to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Traditional web hosting

### Domain Setup
1. Upload all files to your web server
2. Ensure `index.html` is in the root directory
3. Configure your domain to point to the hosting location

## Accessibility Features

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **High Contrast**: Colors meet WCAG AA contrast requirements
- **Focus Indicators**: Clear focus outlines for keyboard users
- **Reduced Motion**: Respects user's motion preferences

## Performance

- **Optimized Images**: All images are properly sized and compressed
- **Minimal Dependencies**: No external JavaScript libraries
- **Efficient CSS**: Uses modern CSS features for better performance
- **Fast Loading**: Optimized for quick page loads

## Security Features

### 🔒 **Implemented Security Measures**

**Headers & Policies:**
- Content Security Policy (CSP) to prevent XSS attacks
- X-Frame-Options to prevent clickjacking
- X-Content-Type-Options to prevent MIME sniffing
- Referrer Policy for privacy protection
- Permissions Policy to limit browser features

**Form Security:**
- CSRF token generation for form submissions
- Input sanitization to prevent script injection
- Rate limiting to prevent spam submissions
- Suspicious pattern detection
- Enhanced validation with security checks

**Server Configuration:**
- `.htaccess` file with comprehensive security headers
- Protection against common vulnerability scanners
- Hotlinking protection
- Directory browsing disabled
- Sensitive file access blocked

**Responsible Disclosure:**
- `security.txt` file for vulnerability reporting
- Clear contact information for security issues
- Proper `robots.txt` for crawler management

### 🛡️ **Additional Security Recommendations**

**For Production Deployment:**
1. **Enable HTTPS**: Uncomment HTTPS redirect in `.htaccess`
2. **Regular Updates**: Keep all dependencies updated
3. **Server Hardening**: Configure web server security settings
4. **Monitoring**: Implement security monitoring and logging
5. **Backup Strategy**: Regular secure backups
6. **Access Control**: Limit administrative access

**Form Backend Security:**
- Implement server-side CSRF validation
- Use parameterized queries for database operations
- Implement proper session management
- Add server-side rate limiting
- Validate and sanitize all inputs server-side
- Use secure email transmission for form submissions

**Data Protection:**
- Encrypt sensitive data at rest and in transit
- Implement proper access controls
- Regular security audits
- GDPR compliance measures
- Secure data retention policies

### 📧 **Security Contact**

For security vulnerabilities, contact:
- **Primary**: matthew@derwenthillside.co.uk
- **Secondary**: membership@28thodiham.org.uk

Please report responsibly and allow time for remediation before public disclosure.

## Future Enhancements

Potential additions for future versions:
- **Event Calendar**: Interactive calendar for upcoming events
- **News/Blog Section**: Regular updates and news
- **Photo Upload**: Allow members to submit photos
- **Online Payments**: Integration with payment systems
- **Member Portal**: Login area for members
- **Multi-language Support**: Support for multiple languages

## Support

For technical support or questions about this website:
- Review the code comments for implementation details
- Check browser console for any JavaScript errors
- Ensure all files are properly uploaded and accessible

## License

This website template is created for the 28th Odiham Scouts and follows UK Scouting brand guidelines. The Scout logo and branding elements are property of The Scout Association.