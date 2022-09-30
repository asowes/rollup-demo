import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
const packageJson = require("./package.json");
import generatePackageJson from "rollup-plugin-generate-package-json";
import { getFolders } from "./scripts/buildUtils";

const externalPackages = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
];

const external = externalPackages.map(
  (packageName) => new RegExp(`^${packageName}(\/.*)?`)
);

const plugins = [
  peerDepsExternal(),
  resolve(),
  babel({
    exclude: "**/node_modules/**",
    // runtimeHelpers: true,
    babelHelpers: "runtime",
    plugins: ["@babel/plugin-external-helpers"],
  }),
  replace({
    __IS_DEV__: process.env.NODE_ENV === "development",
  }),
  commonjs(),
  typescript({
    tsconfig: "./tsconfig.json",
    useTsconfigDeclarationDir: true,
  }),
  terser(),
];

const subfolderPlugins = (folderName) => [
  ...plugins,
  generatePackageJson({
    baseContents: {
      name: `${packageJson.name}/${folderName}`,
      private: true,
      main: "../cjs/index.js",
      module: "./index.js",
      types: "./index.d.ts",
    },
  }),
];

// const external = [
//   "react",
//   "react-dom",
//   "@reduxjs/toolkit",
//   "react-redux",
//   "@chakra-ui/react",
//   "@emotion/styled",
//   "**/node_modules/**",
// ];

const srcSubFoldersConfigs = getFolders("./src").map((folder) => {
  return {
    input: `src/${folder}/index.ts`,
    output: {
      file: `dist/${folder}/index.js`,
      sourcemap: false,
      exports: "named",
      format: "esm",
    },
    plugins: subfolderPlugins(folder),
    external: external,
  };
});

const esmIndexFileConfig = {
  input: ["src/index.ts"],
  output: [
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: false,
      exports: "named",
    },
  ],
  plugins,
  external: external,
};

const cjsIndexFileConfig = {
  input: ["src/index.ts"],
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: false,
      exports: "named",
    },
  ],
  plugins,
  external: external,
};

export default [
  // esmIndexFileConfig,
  ...srcSubFoldersConfigs,
  // cjsIndexFileConfig,
];
