export class Chatter {
  constructor({ position = "bottom-right" }) {
    this.position = this.getPosition(position);
    this.open = false;
    this.initialise();
    this.createStyles();
  }

  getPosition(position) {
    const [vertical, horizontal] = position.split("-");
    return {
      [vertical]: "30px",
      [horizontal]: "30px",
    };
  }

  initialise() {
    const container = document.createElement("div");
    container.style.position = "fixed";
    Object.keys(this.position).forEach(
      (key) => (container.style[key] = this.position[key])
    );
    document.body.appendChild(container);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const chatIcon = document.createElement("img");
    chatIcon.src = "/assets/chat.png";
    chatIcon.classList.add("icon");
    this.chatIcon = chatIcon;

    const closeIcon = document.createElement("img");
    closeIcon.src = "/assets/close.svg";
    closeIcon.classList.add("icon", "hidden");
    this.closeIcon = closeIcon;

    buttonContainer.appendChild(this.chatIcon);
    buttonContainer.appendChild(this.closeIcon);
    buttonContainer.addEventListener("click", this.toggleOpen.bind(this));

    this.messageContainer = document.createElement("div");
    this.messageContainer.classList.add("hidden", "message-container");

    this.createMessageContainerContent();

    container.appendChild(this.messageContainer);
    container.appendChild(buttonContainer);
  }

  createMessageContainerContent() {
    this.messageContainer.innerHTML = "";
    const title = document.createElement("h2");
    title.textContent = `Hi there, have a question for us? Drop us a message...`;

    const form = document.createElement("form");
    form.classList.add("content");
    const email = document.createElement("input");
    email.required = true;
    email.id = "email";
    email.type = "email";
    email.placeholder = "Enter your email address";

    const message = document.createElement("textarea");
    message.required = true;
    message.id = "message";
    message.placeholder = "Your message";

    const btn = document.createElement("button");
    btn.textContent = "Submit";
    form.appendChild(email);
    form.appendChild(message);
    form.appendChild(btn);
    form.addEventListener("submit", this.submit.bind(this));

    this.messageContainer.appendChild(title);
    this.messageContainer.appendChild(form);
  }

  createStyles() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
            .icon {
                cursor: pointer;
                width: 70%;
                position: absolute;
                top: 9px;
                left: 9px;
                transition: transform .3s ease;
            }
            .hidden {
                transform: scale(0);
            }
            .button-container {
                background-color: #e7eaed;
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }
            .message-container {
                box-shadow: -5px 0 18px 2px rgb(0 0 0 / 0.2);
                border-radius: 10px;
                width: 400px;
                right: -25px;
                bottom: 75px;
                max-height: 400px;
                position: absolute;
                transition: max-height .2s ease;
                font-family: Helvetica, Arial ,sans-serif;
            }
            .message-container.hidden {
                max-height: 0px;
            }
            .message-container h2 {
                border-radius: 10px 10px 0 0;
                margin: 0;
                padding: 20px 20px;
                color: #fff;
                background-color: #d2d3d5;
            }
            .message-container .content {
                margin: 20px 10px ;
                border: 1px solid #dbdbdb;
                padding: 10px;
                display: flex;
                background-color: #fff;
                flex-direction: column;
            }
            .message-container .notification {
                margin: 30px 10px;
                padding: 10px;
                color: #30384B;
                font-size: 16px;
                line-height: 1.625;
                text-align: center;
            }
            .message-container form * {
                margin: 5px 0;
            }
            .message-container form input {
                padding: 10px;
            }
            .message-container form textarea {
                height: 100px;
                padding: 10px;
            }
            .message-container form textarea::placeholder {
                font-family: Helvetica, Arial ,sans-serif;
            }
            .message-container form button {
                cursor: pointer;
                background-color: #d2d3d5;
                color: #fff;
                border: 0;
                border-radius: 4px;
                padding: 10px;
            }
            .message-container form button:hover {
                background-color: #C0C0C0;
            }
        `.replace(/^\s+|\n/gm, "");
    document.head.appendChild(styleTag);
  }

  toggleOpen() {
    this.open = !this.open;
    if (this.open) {
      this.chatIcon.classList.add("hidden");
      this.closeIcon.classList.remove("hidden");
      this.messageContainer.classList.remove("hidden");
    } else {
      this.createMessageContainerContent();
      this.chatIcon.classList.remove("hidden");
      this.closeIcon.classList.add("hidden");
      this.messageContainer.classList.add("hidden");
    }
  }

  submit(event) {
    event.preventDefault();
    const formData = {
      email: event.srcElement.querySelector("#email").value,
      message: event.srcElement.querySelector("#message").value,
    };

    this.messageContainer.innerHTML =
      '<h2>Thanks!</h2><p class="notification">Our agents will be in touch with your shortly regarding your enquiry.';

    console.log(formData);
  }
}
