import react from "@vitejs/plugin-react";
import ssr from "vite-plugin-ssr/plugin";
import { obfuscator } from "rollup-obfuscator";
import { lingui } from "@lingui/vite-plugin";
import eslint from "vite-plugin-eslint";

export default {
  plugins: [
    react({
      babel: {
        plugins: ["macros"],
      },
    }),
    ssr({ prerender: true }),
    lingui(),
    obfuscator(),
    eslint(),
  ],
};
