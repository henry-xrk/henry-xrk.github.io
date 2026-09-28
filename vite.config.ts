import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// User site: https://henry-xrk.github.io/
export default defineConfig({
  base: "/",
  plugins: [react()],
})
