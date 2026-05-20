import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
/// <reference types="@batijs/core/types" />

import vike from "vike/plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    vike(),
    tailwindcss(),
    react(),
    babel({
        presets: [linguiTransformerBabelPreset()],
      }),
    lingui(),
  ],
});
