export class Validation {
  constructor(errors) {
    this.errors = errors;
  }
  validate(event) {
    const [input1, input2] = event.currentTarget.elements;    
    if (!input1.validity.valid || !input2.validity.valid) {
      this.emptyTest(event, input1, input2);
      this.lengthTest(event, input1, input2);
      this.linkTest(event, input2);
      this.correctTest(event, input1, input2);
      this.disableButton(event);
    } else {
      this.removeErrors(event);
      this.activateButton(event);
    }
  }
  validateAva(event) {
    const [input] = event.currentTarget.elements;   
    if (!input.validity.valid) {
      this.emptyTest(event, input)
      this.linkTest(event, input)
      this.correctTest(event, input);
      this.disableButton(event);
    } else{
      this.removeErrors(event);
      this.activateButton(event);
    }
  }
  emptyTest(event, ...inputs) {
    if (event.target.value.length === 0) {
      inputs.forEach(input => {
        if (event.target.name === input.name) {
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.empty;
        }
      });
    }
  }
  lengthTest(event, ...inputs) {
    if (event.target.value.length === 1 || event.target.value.length > 30) {
      inputs.forEach(input => {
        if (event.target.name === input.name) {
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.length;
        }
      });
    }
  }
  linkTest(event, ...inputs) {
     
    if (!event.target.validity.valid && event.target.value.length === 0) {
      inputs.forEach(input => {
        if (event.target.name === input.name) {          
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.empty;
        }
      });
    } else if (!event.target.validity.valid && event.target.name === "link"|| "link-ava") {
      inputs.forEach(input => {
        if (event.target.name === input.name) {
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.link;
        }
      });
    }
  }
  correctTest(event, ...inputs) {
    if (event.target.validity.valid) {
      inputs.forEach(input => {
        if (event.target.name === input.name) {
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.correct;
        }
      });
    }
  }
  removeErrors(event) {
    event.currentTarget.querySelectorAll(".popup__error").forEach(error => {
      error.textContent = "";
    });
  }
  disableButton(event) {
    const button = event.currentTarget.querySelector("button");
    button.setAttribute("disabled", true);
  }
  activateButton(event) {
    const button = event.currentTarget.querySelector("button");
    button.removeAttribute("disabled");
  }
}


