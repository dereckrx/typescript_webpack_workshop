## Webpack Typscript Workshop

Init project: 

```bash
$ mkdir webpack_ts
$ npm init
$ npm install --save typescript
```

in package.json lets add the typscript compile command to `scripts` section so we can run it with the `npm` command.
    
    "tsc": "tsc"

Run `npm run tsc` and look at the output to see info on the tsc command.

Create new file `HelloWorld.ts`

```js
function helloWorld(count){
  return ('hello world' + count);
}

const result = helloWorld(3);
console.log(result);
```

Compile it with `tsc`

```bash
$ npm run tsc HelloWorld.ts
```

Look at output `HelloWorld.js`, notice that it's not much different from the `.ts` file.

Run `$ npm run tsc HelloWorld.ts && node HelloWorld.js` to compile and then run the outputted file with `node`.

Add this command to the npm scripts to make it easier to run:

```
"hello": "tsc HelloWorld.ts && node HelloWorld.js"
```

Run: `$ npm run hello`

Now lets generate a Typescript config file to customize it for our project.

Run `node_modules/.bin/tsc --init` to generate a `tsconfig.json` file. Notice how you can run thing directly from node_modules. `npm` will look here when run commands from the `scripts` section of the `package.json` file.

Take a look at the `tsconfig.json` to see all the configuration options.

Now run `npm run tsc` and notice the `implicitly any` errors. Fix them by adding types to our `HelloWorld.ts` file.

```js
function helloWorld(count: number): string {
  return 'hello world ' + count;
}

const result: string = helloWorld(3);
console.log(result);
```

Take a moment to play around with passing invalid types to helloWorld, and returning invalid types to see typescript errors by running `npm run hello`.

Lets tell Typescript where to put our compiled javascript to keep our project clean. Change `tsconfig.json` `"outDir": "./output",` and rerun `npm run tsc`. Notice new `output` dir in your project directory.

Lets install jest so can start writing tests.

`npm install --save-dev jest`

Add `"test": "jest"` to `package.json` and run `npm test`, view the output

Create `HelloWorld.spec.ts`

```js
import hello from './HelloWorld3'

describe('HelloWorld', () => {
  it('returns a string', () => {
    expect(hello(3)).toEqual('hello world 3');
  });
});
```
We have an issue, Jest needs to be configured to work with Typescript. We need to install a loader to work with typscript files. 

Install the Typescript loader for jest as well as the `@type` definitions for jest so Typescript can compile Jest files

```bash
npm install --save-dev ts-jest
npm install --save-dev @types/jest
```

Now lets try running our test `npm test` and make sure they're green.

## Part 2

Create a `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>React App</title>
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
  </head>
  <body>
    <div id="root"></div>
    <script src="./App.js"></script>
    <script>
      ReactDOM.render(React.createElement(App, {}), document.getElementById('root'));
    </script>
  </body>
</html>
```

Notice we are importing the react and react-dom and libraries from a cdn and not from npm. Take a moment to understand the difference between these two ways of using javascript in html.

We will also start by not using any JSX (More on JSX later). Here we will use react DOM to render our App component at the root div.

Create another file called `App.js`

```javascript
const App = (props) => {
  return (
      React.createElement('div', {}, 
          React.createElement('p', {}, 'Hello world!')
        )
    )
}
```

This will render a `<div>` with a child `<p>` tag with the text `"hello world"`. The params to React.createElement are (tagName, props, children)

Open the `index.html` in a browser and you should see "hello world!"

Next we will set up webpack so we don't need to source react from a CDN and so we can bundle up module files in our app.

`npm install --save-dev webpack`

If you're using webpack v4 or later, you'll also need to install the CLI.
`npm install --save-dev webpack-cli`

Add the `build` command to your `package.json` file:

```json
"scripts": {
  //...
  "build": "webpack --config webpack.config.js"
}
```

Now we can run `npm run build` and notice we need a `webpack.config.js` file, so create one.

If you run it again, you'll need to create a `src` directory, this is the default place webpack looks for source files.

We now need an entry point for webpack to use as a starting point to trace all the modules and bundle them up into `bundle.js` so that our code can be ran in the browser.

Inside `webpack.config.js`

```javascript
module.exports = function(env, argv) {
    return {
      entry: './src/index.js',
  }
}
```

Now lets create the `index.js` which will simply render the App component inside the root div:

```js
import React from 'react';
import ReactDom from 'react-dom';

ReactDOM.render(React.createElement(App, {}), document.getElementById('root'));
```

Notice we are using our first `import` statements which means we need to now install React & ReactDom from npm

`npm install --save react` and `npm install --save react-dom`

Create a `index.html` that only renders your default `./dist/main.js` file.
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="./dist/main.js"></script>
  </body>
</html>
```

Try running webpack again. You should now be able to open your new `index.html` in a browser.

You'll have errors. Fix them. Rerun `npm run build` to rebundle your code into `main.js` and refresh your browser to debug and see changes. (hint: you will need to propery import modules now)

Now move on to part3.
