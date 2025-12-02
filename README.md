# Adamo Services Webpage

## Development

### Running the Development Server

For standard development:

```bash
npm run dev
```

### Single Sign-On (SSO) Integration

To integrate this app with other Adamo services (Single Sign-On), you need to configure local domain names and use HTTPS for secure cookie sharing:

1. **Start the dev server with host binding and HTTPS:**

   ```bash
   npm run dev:host:secure
   ```

   This will start the server with:

   - Custom hostname for SSO integration
   - HTTPS enabled (required for secure cookies)
   - Self-signed certificate (you may see a browser warning - accept it to proceed)

2. **Configure your hosts file:**

   **Windows:** `C:\Windows\System32\drivers\etc\hosts`

   **macOS/Linux:** `/etc/hosts`

   Add the following entries for Adamo Landing and other Adamo services:

   ```bash
   127.0.0.1 landing-local.adamoservices.co
   127.0.0.1 id-local.adamoservices.co
   127.0.0.1 pay-local.adamoservices.co
   127.0.0.1 sign-local.adamoservices.co
   127.0.0.1 risk-local.adamoservices.co
   ```

3. **Access the app at:** `https://landing-local.adamoservices.co:3000`

   **Note:** You must use `https://` (not `http://`) to enable secure cookie sharing across Adamo service subdomains.

4. **Accept the self-signed certificate:**
   - Your browser will show a security warning
   - Click "Advanced" and "Proceed to site" (Chrome) or similar for other browsers
   - This is safe for local development

### Available Scripts

- `npm run dev` - Standard development server (HTTP)
- `npm run dev:host` - Development with custom hostname (HTTP)
- `npm run dev:host:secure` - Development with custom hostname and HTTPS (required for SSO)
- `npm run dev-secure` - Standard development with HTTPS
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run start:host` - Start production server with custom hostname

### Why HTTPS for Local Development?

Modern browsers require HTTPS for:

- Secure cookies with `SameSite=None` attribute (required for SSO)
- Cookie sharing across subdomains
- Proper authentication flow between different Adamo services
