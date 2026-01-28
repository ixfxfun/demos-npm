# ixfxfun/demos-npm

[Getting Started](https://ixfx.fun/guides/getting-started/)

There are a few flavours of the demo repository.

* [demos](https://github.com/ixfxfun/demos) includes a copy of ixfx. This is useful for working offline and does not need Node.js installed
* You are here: [demos-npm](https://github.com/ixfxfun/demos-npm) is meant for running in a hosted environment or using a Node.js build process (also allowing you to use Typescript)

## Running

First make sure all the packages are installed

```
npm install
```

And start a dev server with:

```
npm start
```

## Demo repositories

In short, if you have Node.js installed, use the `demos-npm` version. Otherwise use the plain `demos` version.

* [demos-npm](https://github.com/ixfxfun/demos-npm): Uses a typical setup of a Vite development server and NPM-maintained packages. Requires you have Node.js installed locally. Excellent editor support. Updating ixfx is easy.
* [demos](https://github.com/ixfxfun/demos): Includes a copy of ixfx, so everything is included and local. Excellent editor support. Does not require Node.js to be installed. Updating the version of ixfx is more cumbersome.
* [demos-light](https://github.com/ixfxfun/demos-light): Bits of ixfx are fetched on-demand by the browser when the sketch runs. No editor support (ie. auto-complete, help tooltips etc). Does not require Node.js to be installed. Automatically uses the latest version of ixfx.
