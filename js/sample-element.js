
class customElement extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        let h2 = document.createElement('h2');
        h2.textContent = "Hello this is custom element";
        shadowRoot.append(h2);
    }
}

customElements.define('custom-element', customElement);
