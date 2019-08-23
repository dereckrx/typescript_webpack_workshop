## Part 3: Typescript and Webpack

Here we have a copy of our `package.json`, typescript, and webpack config files as well as our hello world app component.

We now need to configure webpack to load our typescript files as well as support transpiling JSX. (Do a quick search on JSX if your not familair with it.)

`$ npm run tsc`

We need to install `react` and `react-dom` `@types`: 

```
npm install --save-dev @types/react
npm install --save-dev @types/react-dom
```

Qustion: What are `@type` dependencies and why do we need them? Take a moment to find out.

If we run `npm run tsc` we still get an error about jsx. We need to add it to our `tsconfig.json`. `"jsx": "react",`

Now we should have properly compiling tysescript files with react and JSX support.

If we run `npm run build` we will get an error that `webpack` does not understand `typescript`.

We need to add a rule in our webpack confg to use the `ts-loader` on `.tsx` files. 

Question: What are loaders and why do we need them for webpack? Take a moment to find out.

First install `npm install --save-dev ts-loader`

Now add the rule to webpack config:
```js
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
    }
```

Notice we are importing app using `./App.tsx`, we can configure webpack resolve many extensions using this config:

```js
    resolve: {
      modules: [
        path.resolve(__dirname, '.'),
        path.resolve(__dirname, './node_modules'),
      ],
      extensions: ['.tsx', '.ts', '.js'],
    }
```
Now we can change our import to `./App` inside our file without the extension and our app should build.

Open `index.html` to see our lovely Typescript, JSX, Webpack amazing app.

Watch can be run using: `npx webpack -w` or add a `watch` script command to your `package.json`

Add another react component and play with some types!
