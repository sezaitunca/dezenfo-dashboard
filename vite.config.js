import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages için repo adınız neyse base'i ona göre değiştirin:
// base: "/REPO_ADI/"
export default defineConfig({
  plugins: [react()],
  base: "/dezenfo-dashboard/",
});
