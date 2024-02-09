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

  /**
   * Set default configuration values.
   *
   * @param {Object} config - Configuration object.
   * @param {Array<string>} config.newFrames - New animation frames.
   * @param {string} config.newPrefix - New prefix.
   * @param {number} config.newSpeed - New typing speed in ms.
   * @param {HTMLElement} config.newTarget - New target HTML element.
   * @param {boolean} config.newClearingPolicy - New clearing policy.
   */

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

  /**
   * Returns actuall default configuration.
   *
   * @returns {Object} Configuration object.
   */

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
 * Renders a typing animation.
 * @param {Array} input - Input array.
 * @param {Object} [options] - Custom options object (optional).
 * @param {HTMLElement} [options.target] - Target HTML element (optional).
 * @param {number} [options.speed] - Speed of typing in ms (optional).
 * @param {boolean} [options.clearingPolicy] - If true, targets content will be deleted (optional).
 * @param {string} [options.prefix] - Custom prefix (optional).
 * @param {Array} [options.frames] - Custom frames for animation (optional).
 * @param {Function} callback - Callback to run after animation (optional).
 */

const typerioRender = async (
  input,
  {
    frames = typerioConfig.frames,
    prefix = typerioConfig.prefix,
    speed = typerioConfig.speed,
    target = typerioConfig.target,
    clearingPolicy = typerioConfig.clearingPolicy,
  } = typerioConfig.getDefaultConfig(),
  callback = () => {}
) => {
  const isOdd = (number) => number % 2 !== 0;

  const clearText = (clearingValue, targetElement) => {
    if (clearingValue) {
      targetElement.innerHTML = "";
    }
  };

  const displayText = (inputString, targetElement) => {
    targetElement.innerText = `${inputString}`;
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
            respondToSend += `${frames[0]}`;
          } else if (i !== letters.length - 1) {
            respondToSend += `${frames[1]}`;
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
        let newPhrase = document.createElement(`${sentenceObject.HTMLelement}`);
        newPhrase.className = `typerio ${sentenceObject.style}`;
        targetElement.appendChild(newPhrase);

        await write(sentenceObject.text, newPhrase, typingSpeed);
      }
      resolve();
    });
  };

  const addPrefix = (inputTable, prefixValue) => {
    if (prefixValue !== "") {
      let newTable = [...inputTable];
      const prefixObject = {
        text: prefix,
        style: "typerioPrefix",
        HTMLelement: "span",
      };
      newTable.unshift(prefixObject);
      return newTable;
    } else return inputTable;
  };

  clearText(clearingPolicy, target);

  await render(addPrefix(input, prefix), target, speed);
  callback();
};

export { typerioRender, typerioConfig };
