# react-static-plugin-less

A [React-Static](https://react-static.js.org) plugin that adds loader and SSR support for [LESS](https://github.com/less/less.js)

## Installation

In an existing react-static site run:

```bash
$ yarn add react-static-plugin-less
$ yarn add less less-loader
```

Then add the plugin to your `static.config.js`:

```javascript
export default {
  plugins: ["react-static-plugin-less"]
};
```

## With Options

```javascript
export default {
  plugins: [
    [
      "react-static-plugin-less",
      {
        includePaths: ["..."], // always includes `src/`
        sourceMap: true,
        javascriptEnabled: true,
        // modifyVars: themeVariables,
        // other options for the less-loader
      }
    ]
  ]
};
```
