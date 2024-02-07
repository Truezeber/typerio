# Typerio ⌨️

**Typerio** is a simple, lightweight and easy-to-use npm package that writes text character by character, much like a terminal.

It supports multi-style phrases and allows you to customize the appearance and speed of text display.

## Getting started

- [How to install📩](#how-to-install-)
- [How to use🤷‍♂️](#how-to-use)
  - [JavaScript💛](#javascript)
  - [CSS💙](#css)
  - [Customize default configuration🪄](#customize-default-configuration)
- [Example code👀](#example-code-)
- [Live demo🎞️](#live-demo-)
- [Documentation📙](https://github.com/pasiastazebra/typerio/wiki/Documentation-for-versions-2.x.x)

### How to install 📩

```console
$ npm install typerio
```

### How to use 🤷‍♂️

> Important message!
> 
> Version ^2.0.0 is not compatible with previous versions. Looking for docs for 1.5.0? [Documentation for version 1.5.0 · pasiastazebra/typerio Wiki · GitHub](https://github.com/pasiastazebra/typerio/wiki/Documentation-for-version-1.5.0)

To get started, you have to import _`renderText`_ function to your project.

```javascript
import { typerioRender } from 'typerio'
```

Now you can use _`typerioRender()`_ function to - as it stands - render a text.

```javascript
typerioRender(input, {
    frames,
    prefix,
    speed,
    target,
    clearingPolicy
});
```

#### JavaScript💛

As you can see, function takes a lot of arguments. But don't panic, let's take a look at them really quick:

- _`input`_ is an array of objects with the following properties:
  

```javascript
{
    text: string, //Text which will be rendered.
    style: string, //Custom CSS class.
    HTMLelement: HTMLElement //HTML element inside of which text will be
}                            //rendered. Usually p or span
```

- `frames` - Array of 2 string which will be used as an animation.
  
- `prefix` - String placed at the beggining of the rendered text.
  
- `speed` - Typing animation speed in ms.
  
- `target` - HTML element inside of which animation will be rendered.
  
- `clearingPolicy` - Boolean value, if true all content inside of the target will be deleted.
  

> Note that every arguments besides `input` need to be parsed as one object

> `typerioRender()` is an asynchronic function. If you want to call it on the same target more than once in a row, you can use `await` to wait untill previous animation is completed.

#### CSS💙

Typerio uses _`typerio`_ as default class for every element, *`typerioPrefix`* as class for its prefix and classes provided as `style` via input array. To style it, simply declare them inside of your CSS.

#### Customize default configuration🪄

Providing the same data as an configuration object in `typerioRender()` function would be a nuisance. That's why version `2.0.0` introduced configuration object which allows you to set the default values which will be used, if you won't provide them via `typerioRender()` function. To change them you can simply use

```javascript
typerioConfig.setDefaultConfig({newFrames, newPrefix, newSpeed, newTarget, newClearingPolicy});;
```

As you can see, there are the same arguments as in configuration object. You can also get the default config object using:

```javascript
typerioConfig.getDefaultConfig();
```

> Please note, that the default target value is set to `{}`, which means that you have to declare this value in `typerioConfig` or pass it everytime via `typerioRender()` function.

### Example code 👀

```javascript
//JavaScript

import { typerioRender, typerioConfig } from 'typerio'

const outputWindow = document.querySelector(".window-console");
const button = document.querySelector("button");

typerioConfig.setDefaultConfig({
  newFrames: [".", ".."],
  newPrefix: "x",
  newSpeed: 20,
  newTarget: outputWindow,
  newClearingPolicy: false,
});

button.addEventListener("click", async () => {
  const textInput = document.querySelector("input").value;
  const styleInput = document.querySelector("select").value;

  if (textInput !== "") {
    const inputObject = [
      { text: textInput, style: styleInput, HTMLelement: "span" },
    ];
    await typerioRender(inputObject, { prefix: "$", speed: "25" });
  }
});
```

```scss
//SCSS

  .typerio {
    &.typerioPrefix{
      color: #6495ed;
      font-style: italic;
    }
    &.red {
      color: #cd5c5c;
    }
  
    &.green {
      color: #86af80;
    }
  
    &.blue {
      color: #6495ed;
    }
    &.white {
      color: #ddccbb;
    }
    &.italic {
      color: #ddccbb;
      font-style: italic;
    }
  }
```

### Live demo 🎞️

- [Codepen 🖊️](https://codepen.io/pasiastazebra/pen/XWGqBLJ)