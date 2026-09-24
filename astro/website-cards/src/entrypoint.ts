// Renders real dashboard cards on the Home Assistant website, backed by mocked
// data instead of a Home Assistant server.
//
// Usage:
//
//   <ha-website-card>
//     <script type="application/json">
//       { "config": { "type": "tile", "entity": "light.bed_light" },
//         "entities": [{ "entity_id": "light.bed_light", "state": "on" }] }
//     </script>
//   </ha-website-card>

import "./static-path";
import type { PropertyValues } from "lit";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators";
import { applyThemesOnElement } from "../../src/common/dom/apply_themes_on_element";
import type { HASSDomEvent } from "../../src/common/dom/fire_event";
import { showDialog } from "../../src/dialogs/make-dialog-manager";
import type { MoreInfoDialogParams } from "../../src/dialogs/more-info/ha-more-info-dialog";
import type { LovelaceCardConfig } from "../../src/data/lovelace/config/card";
import type { EntityInput } from "../../src/fake_data/entities/types";
import type { MockHomeAssistant } from "../../src/fake_data/provide_hass";
import { provideHass } from "../../src/fake_data/provide_hass";
import { ProvideHassLitMixin } from "../../src/mixins/provide-hass-lit-mixin";
import "../../src/panels/lovelace/cards/hui-card";
import { themeStyles } from "../../src/resources/theme/theme";
import type { HomeAssistant } from "../../src/types";

interface WebsiteCardData {
  config: LovelaceCardConfig;
  entities?: EntityInput[];
}

const TAG = "ha-website-card";

// The theme variables target `html` in the app. Scope them to the card
// element so they don't leak into the website's own styles.
const appendScopedThemeStyles = () => {
  const style = document.createElement("style");
  // The app's html rule also makes the page one screen tall; the card must
  // size to its content instead.
  style.textContent = `${themeStyles.replace(/\bhtml\b(?=[\s{:[])/g, TAG)}
    ${TAG} { height: auto; }`;
  document.head.append(style);
};

appendScopedThemeStyles();

const darkModeQuery = matchMedia("(prefers-color-scheme: dark)");

@customElement(TAG)
export class HaWebsiteCard extends ProvideHassLitMixin(LitElement) {
  @property({ attribute: false }) public hass?: MockHomeAssistant;

  // "light", "dark", or "auto" (follows the visitor's system setting).
  @property() public theme: "light" | "dark" | "auto" = "auto";

  @state() private _data?: WebsiteCardData;

  @state() private _error?: string;

  public connectedCallback() {
    super.connectedCallback();
    darkModeQuery.addEventListener("change", this._applyTheme);
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    darkModeQuery.removeEventListener("change", this._applyTheme);
  }

  protected firstUpdated(changedProps: PropertyValues<this>) {
    super.firstUpdated(changedProps);
    const script = this.querySelector('script[type="application/json"]');
    try {
      this._data = JSON.parse(script?.textContent || "{}");
    } catch (err) {
      this._error = `Invalid card data: ${err}`;
      return;
    }
    if (!this._data?.config) {
      this._error = "Card data is missing a config";
      return;
    }

    const hass = provideHass(this, {
      language: "en",
      selectedLanguage: "en",
      // Not an admin, so the more-info dialog hides entity settings and other
      // actions that need a real Home Assistant.
      user: {
        credentials: [],
        id: "website",
        is_admin: false,
        is_owner: false,
        mfa_modules: [],
        name: "Website visitor",
      },
    } as Partial<HomeAssistant>);
    hass.updateHass({ locale: { ...hass.locale, language: "en" } });
    hass.updateTranslations(null, "en");
    hass.updateTranslations("lovelace", "en");
    if (this._data.entities?.length) {
      hass.addEntities(this._data.entities);
    }
    this._applyTheme();

    this.addEventListener("hass-more-info", (ev) => this._showMoreInfo(ev));
  }

  // Cards ask the app to open the more-info dialog (for example, to change a
  // light's color). Open it here instead, without the app's browser history
  // and URL handling, so the website page stays where it is.
  private _showMoreInfo(ev: HASSDomEvent<MoreInfoDialogParams>) {
    ev.stopPropagation();
    if (!ev.detail.entityId) {
      return;
    }
    showDialog(
      this,
      "ha-more-info-dialog",
      { entityId: ev.detail.entityId, view: ev.detail.view || "info" },
      () => import("../../src/dialogs/more-info/ha-more-info-dialog"),
      undefined,
      false
    );
  }

  private _applyTheme = () => {
    if (!this.hass) {
      return;
    }
    const dark =
      this.theme === "dark" ||
      (this.theme === "auto" && darkModeQuery.matches);
    applyThemesOnElement(this, this.hass.themes, "default", { dark }, true);
  };

  protected updated(changedProps: PropertyValues<this>) {
    super.updated(changedProps);
    if (changedProps.has("theme")) {
      this._applyTheme();
    }
  }

  protected render() {
    if (this._error) {
      return html`<p class="error">${this._error}</p>`;
    }
    if (!this._data || !this.hass) {
      return nothing;
    }
    return html`
      <hui-card .config=${this._data.config} .hass=${this.hass}></hui-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
      font-family: var(--ha-font-family-body);
      -webkit-font-smoothing: var(--ha-font-smoothing);
      color: var(--primary-text-color);
    }
    .error {
      color: var(--error-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-website-card": HaWebsiteCard;
  }
}
