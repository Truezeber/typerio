/**
 * Configuration object.
 */

const typerioConfig = {
  /**
   * Default animation frames.
   * @type {Array<string>}
   */
  frames: ["▮", "▯"],

  /**
   * Default prefix.
   * @type {string}
   */
  prefix: "",

  /**
   * Default speed.
   * @type {number}
   */

  speed: 75,

  /**
   * Default target.
   * @type {Object}
   */

  target: {},

  /**
   * Default clearing policy.
   * @type {boolean}
   */

  clearingPolicy: true,

  setDefaultConfig({
    newFrames = this.frames,
    newPrefix = this.prefix,
    newSpeed = this.speed,
    newTarget = this.target,
    newClearingPolicy = this.clearingPolicy,
  }) {
    this.frames = newFrames;
    this.prefix = newPrefix;
    this.speed = newSpeed;
    this.target = newTarget;
    this.clearingPolicy = newClearingPolicy;
  },

  getDefaultConfig() {
    return {
      frames: this.frames,
      prefix: this.prefix,
      speed: this.speed,
      target: this.target,
      clearingPolicy: this.clearingPolicy,
    };
  },
};

/**
 * Render typing animation.
 * @param {Array} input Input array.
 * @param {Object} options - Custom options object.
 * @param {HTMLElement} target Target HTML element.
 * @param {number} speed Speed of typing in ms.
 * @param {boolean} clearingPolicy If true, targets content will be deleted.
 * @param {string} prefix (Optional) Custom prefix.
 */

const typerioRender = async (
  input,
  { target, speed, clearingPolicy, prefix } = typerioConfig.getDefaultConfig()
) => {
  const isOdd = (number) => number % 2 !== 0;

  const clearText = (clearingValue, targetElement) => {
    if (clearingValue) {
      targetElement.innerHTML = "";
    }
  };

  const displayText = (inputString, targetElement) => {
    targetElement.innerHTML = `${inputString}`;
  };

  const write = (inputString, targetElement, typingSpeed) => {
    return new Promise((resolve) => {
      const letters = inputString.split("");
      let respond = "";

      letters.forEach((letter, i) => {
        setTimeout(() => {
          respond += letter;
          let respondToSend = respond;
          if (isOdd(i) & (i !== letters.length - 1)) {
            respondToSend += `${typerioConfig.getDefaultFrames()[0]}`;
          } else if (i !== letters.length - 1) {
            respondToSend += `${typerioConfig.getDefaultFrames()[1]}`;
          }
          displayText(respondToSend, targetElement);
          if (i === letters.length - 1) resolve();
        }, i * typingSpeed);
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

  const addPrefix = (inputTable, prefixValue) => {
    if (prefixValue !== "") {
      let newTable = [...inputTable];
      const prefixObject = { text: prefix, style: "prefix", isInline: true };
      newTable.unshift(prefixObject);
      return newTable;
    } else return inputTable;
  };

  clearText(clearingPolicy, target);

  await render(addPrefix(input, prefix), target, speed);
};

export { typerioRender, typerioConfig };
