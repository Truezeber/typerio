const textAnimation = {
  frames: ["▮", "▯"],
  prefix: "",

  setFrames([frame1, frame2]) {
    this.frames = [frame1, frame2];
  },

  setDefaultPrefix(prefix) {
    this.prefix = prefix;
  },

  getFrames() {
    return this.frames;
  },

  getDefaultPrefix() {
    return this.prefix;
  },
};

const renderText = async (input, target, speed, willClear, prefix) => {
  const isOdd = (number) => number % 2 !== 0;

  const clearText = (needToClear, targetElement) => {
    if (needToClear) {
      targetElement.innerHTML = "";
    }
  };

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
            respondToSend += `${textAnimation.getFrames()[0]}`;
          } else if (i !== letters.length - 1) {
            respondToSend += `${textAnimation.getFrames()[1]}`;
          }
          displayText(respondToSend, target);
          if (i === letters.length - 1) resolve();
        }, i * speed);
      });
    });
  };

  const render = (inputTable, targetElement, typingSpeed) => {
    return new Promise(async (resolve) => {
      for (let sentenceObject of inputTable) {
        let newPhrase;
        if (sentenceObject.isInline === false) {
          newPhrase = document.createElement("p");
        } else {
          newPhrase = document.createElement("span");
        }
        newPhrase.className = `typerio-${sentenceObject.style}`;
        targetElement.appendChild(newPhrase);

        await write(sentenceObject.text, newPhrase, typingSpeed);
      }
      resolve();
    });
  };

  const addPrefix = (inputTable, prefix = textAnimation.getDefaultPrefix()) => {
    if (prefix !== "") {
      let newTable = [...inputTable];
      const prefixObject = { text: prefix, style: "prefix", isInline: true };
      newTable.unshift(prefixObject);
      return newTable;
    } else return inputTable;
  };

  clearText(willClear, target);

  await render(addPrefix(input, prefix), target, speed);
};

export { renderText, textAnimation };
