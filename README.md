# Typerio ⌨️

**Typerio** is a simple, lightweight and easy-to-use npm package that writes text character by character, much like a terminal.

It supports multi-style phrases and allows you to customize the appearance and speed of text display.

## How to install 📩

```console
$ npm install typerio
```

## How to use 🤷‍♂️

Firstly import Typerio into your project.

```javascript
import * as typerio from 'typerio'
```

Now you can use _`renderText()`_ function to - as it stands - render a text.

```javascript
typerio.renderText(input, target, speed, clear);
```

### JavaScript💛

As you can see, function takes 4 arguments:

- _`target`_ - HTML element where text will be typed;
- _`speed`_ - Speed of typing effect in ms;
- _`clear`_ - If true, every element inside of the target will be deleted;

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
>Important note!
>
> _`renderText()`_ is an async function. In case of using it on the same target more than one time in a row it is recommended to use it with _`await`_.

### CSS💙

Typerio uses _`typerio-`_ prefix for its classes, so to style the text, you have to declare them inside of your CSS code. Simple as that.

## Example code 👀

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
    style: "blue"
    isInline: true
  },
];

const anotherText = [
  {
    text: "This text is black! ",
    style: "black"
  },
];

await typerio.renderText(newText, targetElement, 50, true);

typerio.renderText(anotherText, targetElement, 50, false);
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
