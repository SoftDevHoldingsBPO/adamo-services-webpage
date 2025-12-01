# Adamo Services Webpage

## Development

### Running the Development Server

For standard development:

```bash
npm run dev
```

### Single Sign-On (SSO) Integration

To integrate this app with other Adamo services (Single Sign-On), you need to configure local domain names:

1. **Start the dev server with host binding:**

   ```bash
   npm run dev:host
   ```

2. **Configure your hosts file:**

   **Windows:** `C:\Windows\System32\drivers\etc\hosts`

   **macOS/Linux:** `/etc/hosts`

   Add the following entries for Adamo Landing and Adamo ID.
   Add another mappings when needed:

   ```bash
   127.0.0.1 landing-local.adamoservices.co
   127.0.0.1 id-local.adamoservices.co
   ```

3. **Access the app at:** `http://landing-local.adamoservices.co:3000`

This allows cookies to be shared across different Adamo service subdomains for seamless authentication.
