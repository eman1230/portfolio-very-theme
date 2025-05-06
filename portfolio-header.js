/**
 * Copyright 2025 eman1230
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/simple-cta/simple-cta.js"
import "@haxtheweb/scroll-button/scroll-button.js"

/**
 * `portfolio-very-theme`
 * 
 * @demo index.html
 * @element portfolio-very-theme
 */
export class PortfolioHeader extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "portfolio-header";
  }

  constructor() {
    super();
    this.menuOpen = true;
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/portfolio-very-theme.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      menuOpen: { type: Boolean },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        flex-wrap: wrap;
        display: flex;
      }
      h3 span {
        font-size: var(--portfolio-very-theme-label-font-size, var(--ddd-font-size-s));
      }
      :root {
        scroll-behavior: smooth;
      }
      .header{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--ddd-theme-default-beaver70);
        position: fixed;
        top: 25px;
        left: 0;
        height: 100px;
        right: 0;
        margin-bottom: 4px;
        z-index: 1;
        border: 1px solid var(--ddd-theme-default-nittanyNavy);
      }
      .header a {
        display: inline-block;
        border: 2px solid var(--ddd-theme-default-beaverBlue);
        font-size: 16px;
        font-family: 'Times New Roman', Times, serif;
        padding: 10px;
        margin: 10px;
        background-color: var(--ddd-theme-default-nittanyNavy);
        color: white;
      }
      .footer{
        height: 24px;
        width: 24px;
        position: fixed;
        right: 0;
        bottom: 0;

      }
      .icon {
        display: inline-block;
        padding: 4px 0px;
        height: 128px;
        width: auto;
      }
      .menu-toggle {
        display: none;
        font-size: 24px;
        background: none;
        border: none;
        color: white;
      }

      @media (max-width: 720px){
        .header{
          flex-direction: column;
          align-items: flex-start;
          height: auto;
          padding: 10px;
        }
        .header a {
          width: 100%;
          margin: 5px 0;
          font-size: 14px;
          text-align: left;
        }

        .icon {
          height: 64px;
          margin-bottom: 10px;
        }
        .mobile-images {
          display: flex;
          flex-direction: row;
        }
        .menu-toggle {
          display: block;
          height: 64px;
        }
        .nav-links {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .nav-links[hidden] {
          display: none;
        }
      }
    `];
  }

  toggleMenu(){
    this.menuOpen = !this.menuOpen;
  }

  checkMenuToggleVisibility() {
    const toggleButton = this.shadowRoot.querySelector('.menu-toggle');
    if (toggleButton && getComputedStyle(toggleButton).display === 'none') {
      this.menuOpen = true;
    }
  }

  firstUpdated() {
    this.checkMenuToggleVisibility();
    window.addEventListener('resize', () => this.checkMenuToggleVisibility());
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
    <div class="header">
      <div class="mobile-images">
        <img class="icon" src="https://brand.psu.edu/images/backgrounds/athletic-positive.png">
        <button class="menu-toggle" @click="${this.toggleMenu}">&#9776;</button>
      </div>
        <nav class="nav-links" ?hidden="${!this.menuOpen}">
        <a href="#1">About</a>
        <a href="#2">Resume</a>
        <a href="#3">Clubs</a>
        <a href="#4">Work & Leadership</a>
        <a href="#5">Connect With Me</a>
        </nav>
    </div>
    <div class="footer">
      <scroll-button></scroll-button>
    </div>
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(PortfolioHeader.tag, PortfolioHeader);