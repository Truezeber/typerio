const isOdd = (number) => number % 2 !== 0;

const displayText = (inputString, target) => {
  target.innerHTML = `${inputString}`;
};

const write = (inputString, target, speed) => {
  return new Promise((resolve) => {
    const letters = inputString.split("");
    let respond = "";

    letters.forEach((letter, i) => {
      setTimeout(() => {
        respond += letter;
        let respondToSend = respond;
        if (isOdd(i) & (i !== letters.length - 1)) {
          respondToSend += "▮";
        } else if (i !== letters.length - 1) {
          respondToSend += "▯";
        }
        displayText(respondToSend, target);
        if (i === letters.length - 1) resolve();
      }, i * speed);
    });
  });
};

const renderText = async (input, target, speed, isInline, clear) => {
  clear ? (target.innerHTML = "") : null;
  for (let sentenceObject of input) {
    let newPhrase;
    if (isInline === false) {
      newPhrase = document.createElement("p");
    } else {
      newPhrase = document.createElement("span");
    }
    newPhrase.className = `typerio-${sentenceObject.style}`;
    target.appendChild(newPhrase);

    await write(sentenceObject.text, newPhrase, speed);
  }
};

export { displayText, write, renderText };
