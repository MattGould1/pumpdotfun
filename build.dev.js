#!/usr/bin/env node

require("esbuild")
  .build({
    logLevel: "info",
    entryPoints: ["dev/index.ts"],
    target: "node20.10.0",
    bundle: false,
    outdir: "dist",
    platform: "node",
  })
  .catch(() => process.exit(1));
