# Typerio ⌨️

**Typerio** is a simple, lightweight and easy-to-use npm package that writes text character by character, much like a terminal.

It supports multi-style phrases and allows you to customize the appearance and speed of text display.

## Getting started

* [How to install📩](#how-to-install-)
* [How to use🤷‍♂️](#how-to-use-)
  * [JavaScript💛](#javascript)
  * [CSS💙](#css💙)
  * [Customize animation🪄](#customize-animation)
  * [Customize prefix🎼](#customize-prefix)
* [Example code👀](#example-code-)
* [Live demo🎞️](#live-demo-)

### How to install 📩

```console
$ npm install typerio
```

### How to use 🤷‍♂️

To get started, you have to import _`renderText`_ function to your project.

```javascript
import { renderText } from 'typerio'
```

Now you can use _`renderText()`_ function to - as it stands - render a text.

```javascript
renderText(input, target, speed, willClear, prefix);
```

#### JavaScript💛

As you can see, function takes 5 arguments:

- _`target`_ - HTML element where text will be typed;
- _`speed`_ - Speed of typing effect in ms;
- _`willClear`_ - If true, every element inside of the target will be deleted;
- _`prefix`_ - Optional, custom prefix;

And last, but not least, _`input`_ which takes an array of objects with the following properties:

```javascript
[
  {
    text: "", //Text to be written
    style: "", //Custom CSS class
    isInline: true //If true input will be rendered as <span>
  },
];
```

><span style="color:#d12e2e; font-weight: bold;">_Important note!_</span>
>
>_`renderText()`_<span style="color:#bd4444;">  is an async function. In case of using it on the same target more than one time in a row it is recommended to use it with </span>_`await`_<span style="color:#bd4444;">.</span>


#### CSS💙

Typerio uses _`typerio-`_ prefix for its classes, so to style the text, you have to declare them inside of your CSS code. Simple as that.

#### Customize animation🪄

To customize the typing animation use:

```javascript
import { textAnimation } from 'typerio'

textAnimation.setFrames(['frame1', 'frame2']);
```
You can also get the current animation frames:

```javascript
textAnimation.getFrames(); //returns [frame1, frame2]
```

#### Customize prefix🎼

There are two ways to customize your prefix. First one, described at the beginning, is to pass it directly to the `renderText()` function:

```javascript
renderText(inputObject, targetHTML, 50, true, '>');
```
But as you can read upper, it's an optional argument, and when not provided, function will render the text using default prefix if there is declared one (defaulty it's not). To do it simply use:

```javascript
textAnimation.setDefaultPrefix('prefix');
```

You can also get the current default prefix if you need:

```javascript
textAnimation.getDefaultPrefix(); //returns string
```

### Example code 👀

```javascript
//JavaScript

const targetElement = document.getElementById("target");

const newText = [
  {
    text: "This text is red! ",
    style: "red",
    isInline: false
  },
  {
    text: "And this is blue! ",
    style: "blue",
    isInline: true
  },
];

const anotherText = [
  {
    text: "This text is black! ",
    style: "black"
  },
];

await renderText(newText, targetElement, 50, true);

renderText(anotherText, targetElement, 50, false, '->');
```

```scss
//SCSS

.typerio {
  &-red {
    color: #fe0000;
  }
  &-blue {
    color: #0000ff;
  }
  &-black {
    color: #000000;
  }
}
```
### Live demo 🎞️

* [Codepen 🖊️](https://codepen.io/pasiastazebra/pen/XWGqBLJ)