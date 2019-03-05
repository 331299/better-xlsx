import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";

export default {
  output: {
    file: "dist/xlsx.js",
    format: "umd",
    name: "xlsx",
    globals: {
      JSZip: "JSZip"
    }
  },
  input: "src/index.js",
  external: ["jszip"],
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true,
      preferBuiltins: true
    }),
    commonjs({
      include: "node_modules/**"
    }),
    babel({
      babelrc: false,
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              browsers: ["since 2015", "chrome >= 36"]
            },
            modules: false,
            loose: false
          }
        ]
      ],
      plugins: [
        require("./constructor-name"),
        [
          "@babel/plugin-proposal-decorators",
          { decoratorsBeforeExport: false }
        ],
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-external-helpers",
        "@babel/plugin-transform-runtime"
      ],
      runtimeHelpers: true,
      externalHelpers: true,
      exclude: "node_modules/**"
    })
  ]
};
