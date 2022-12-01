import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import visualizer from "rollup-plugin-visualizer";
// https://vitejs.dev/config//
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          "babel-plugin-macros",
          [
            "@emotion/babel-plugin-jsx-pragmatic",
            {
              export: "jsx",
              import: "__cssprop",
              module: "@emotion/react"
            }
          ],
          [
            "@babel/plugin-transform-react-jsx",
            { pragma: "__cssprop" },
            "twin.macro"
          ]
        ],
        env: {
          // production: {
          //   plugins: ["transform-remove-console"]
          // }
        },
        parserOpts: {
          plugins: ["decorators-legacy"]
        }
      }
    }),
    tsconfigPaths()
  ],
  esbuild: {
    // jsxInject: `import React from 'react'`,
    logOverride: { "this-is-undefined-in-esm": "silent" },
    jsxInject: `import React from 'react'`
  },
  build: {
    rollupOptions: {
      plugins: [
        //@see https://github.com/doesdev/rollup-plugin-analyzer
        visualizer()
      ]
    }
  }
});
