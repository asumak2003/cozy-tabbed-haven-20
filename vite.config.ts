import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Set the base path for your app (e.g., for GitHub Pages or a subdirectory deployment)
  base: mode === "development" ? "/" : "/cozy-tabbed-haven-20/",

  server: {
    host: "::",  // Accept connections from all IP addresses
    port: 8080,  // Define your desired port for local development
  },

  plugins: [
    react(), // Use the React plugin
    mode === "development" && componentTagger(), // Only enable this in development mode
  ].filter(Boolean), // Remove any falsy values

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias for src directory
    },
  },
}));
