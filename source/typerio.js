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

  shouldClearText: true,

  /**
   * Set default animation frames.
   * @param {Array<string>} frames - New frames.
   */

  setDefaultFrames([frame1, frame2]) {
    this.frames = [frame1, frame2];
  },

  /**
   * Set default prefix.
   * @param {string} prefix - New default prefix.
   */

  setDefaultPrefix(prefix) {
    this.prefix = prefix;
  },

  /**
   * Set default typing speed.
   * @param {number} speed - Typing speed in ms.
   */

  setDefaultTypingSpeed(speed) {
    this.speed = speed;
  },

  /**
   * Set default target.
   * @param {Object} target - HTML element.
   */

  setDefaultTarget(target) {
    this.target = target;
  },

  /**
   * Set default clearing policy.
   * @param {boolean} shouldClearText - Clearing policy.
   */

  setDefaultClearingPolicy(shouldClearText) {
    this.shouldClearText = shouldClearText;
  },

  /**
   * Returns default animation frames.
   * @returns {Array<string>} Animation frames.
   */

  getDefaultFrames() {
    return this.frames;
  },

  /**
   * Returns default prefix.
   * @returns {string} Default prefix.
   */

  getDefaultPrefix() {
    return this.prefix;
  },

  /**
   * Returns default typing speed.
   * @returns {number} Typing speed in ms.
   */

  getDefaultTypingSpeed() {
    return this.speed;
  },

  /**
   * Returns default target object.
   * @returns {Object} HTML element.
   */

  getDefaultTarget() {
    return this.target;
  },

  /**
   * Returns default clearing policy.
   * @returns {boolean} Clearing policy.
   */

  getDefaultClearingPolicy() {
    return this.shouldClearText;
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
  {
    target = typerioConfig.getDefaultTarget(),
    speed = typerioConfig.getDefaultTypingSpeed(),
    clearingPolicy = typerioConfig.getDefaultClearingPolicy(),
    prefix = typerioConfig.getDefaultPrefix(),
  } = {}
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
