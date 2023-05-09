---
title: "Adding ESPHome media players"
---

Ready-made firmware to turn devices into ESPHome media players

<head>
    <style>
      body {
        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
          Roboto, Ubuntu, sans-serif;
        padding: 0;
        margin: 0;
        line-height: 1.4;
      }
      .content {
        max-width: 600px;
        margin: 0 auto;
        padding: 12px;
      }
      .hidden {
        display: none;
      }
      esp-web-install-button[install-unsupported] {
        visibility: inherit;
      }
      .content pre {
        max-width: 100%;
        overflow-y: scroll;
      }
      li {
        padding: 4px 0;
      }
      .footer {
        margin-top: 24px;
        border-top: 1px solid #ccc;
        padding-top: 24px;
        text-align: center;
      }
      .footer .initiative {
        font-style: italic;
        margin-top: 16px;
      }
      table {
        border-spacing: 0;
      }
      td {
        padding: 8px;
        border-bottom: 1px solid #ccc;
      }
      .radios {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
      }
      .radios label {
        padding: 4px;
        cursor: pointer;
        width: calc(50% - 16px);
        max-width: 184px;
        display: block;
        position: relative;
      }
      .radios input {
        position: absolute;
        top: 12px;
        left: 12px;
      }
      .radios img {
        display: block;
        width: calc(100% - 8px);
        border: 4px solid rgba(0, 0, 0, 0);
        aspect-ratio: 1;
      }
      input:checked + img {
        border-color: #58a6ff;
      }
      @media (prefers-color-scheme: dark) {
        body {
          background-color: #333;
          color: #fff;
        }
        a {
          color: #58a6ff;
        }
      }
      /* Remove this once we add a fifth media player */
      @media only screen and (min-height: 1000px) {
        .radios label {
          max-width: initial;
        }
      }
    </style>
    <script
      type="module"
      src="https://unpkg.com/esp-web-tools@9/dist/web/install-button.js?module"
    ></script>
  </head>

## Adding an ESPHome Media Player to Home Assistant

Pick your product and install [ESPHome](https://esphome.io) on it to use it directly as a media player inside Home Assistant. No programming required.

To install the ESPHome software on the device, follow these steps:

1. Open this page in a Chromium-based browser (for example Google Chrome or MS Edge) on a desktop. It does not work on a tablet or phone.
1. Pick your product.


<div class="content">
<div class="radios">
    <label>
        <input type="radio" name="type" value="raspiaudio-muse-luxe" checked />
        <img src="/images/docs/esphome/esp_muse_luxe.png" alt="Raspiaudio ESP Muse Luxe" />
    </label>
    <label>
        <input type="radio" name="type" value="raspiaudio-muse-proto" />
        <img src="/images/docs/esphome/esp_muse_proto.png" alt="Raspiaudio ESP Muse Proto" />
    </label>
    <label>
        <input type="radio" name="type" value="m5stack-atom-speaker-kit" />
        <img src="/images/docs/esphome/atom_speaker_kit.png" alt="M5Stack Atom Speaker Kit" />
    </label>
    <label>
        <input type="radio" name="type" value="m5stack-atom-echo" />
        <img src="/images/docs/esphome/atom_echo.png" alt="M5Stack Atom Echo Development Kit" />
    </label>
</div>
<br />
<p class="button-row" align="center">
    <esp-web-install-button></esp-web-install-button>
</p>
<div class="hidden info raspiaudio-muse-luxe">
    <h3>Raspiaudio ESP Muse Luxe</h3>
    <p>
        Portable speaker with two 5 Watt speakers built-in. Can run 4 hours
        off the built-in battery or be powered by a cable.
    </p>
    <p>
        This is a powerful device. If you want to use it solely as a media
        player, we recommend to use the
        <a href="https://raspiaudio.github.io/">Squeezelite-ESP32 firmware</a
        >.
    </p>
    <p>Buy</p>
    <ul>
        <li>
        <a href="https://raspiaudio.com/produit/esp-muse-luxe"
            >Raspiaudio</a
        >
        </li>
        <li>
        <a
            href="https://www.amazon.com/gp/product/B09N3S9S29/?&_encoding=UTF8&tag=homeassista0e-20&linkCode=ur2&linkId=71c80756dcd782eba9f1a80dc576c7d3&camp=1789&creative=9325"
            >Amazon</a
        >
        </li>
    </ul>
</div>
<div class="hidden info raspiaudio-muse-proto">
    <h3>Raspiaudio ESP Muse Proto</h3>
    <p>
        Powerful audio prototyping board to create your own smart speakers.
    </p>
    <p>
        This is a powerful device. If you want to use it solely as a media
        player, we recommend to use the
        <a href="https://raspiaudio.github.io/">Squeezelite-ESP32 firmware</a
        >.
    </p>
    <p>Buy</p>
    <ul>
        <li>
        <a href="https://raspiaudio.com/produit/muse-proto">Raspiaudio</a>
        </li>
        <li>
        <a
            href="https://www.amazon.com/gp/product/B097F884WL/?&_encoding=UTF8&tag=homeassista0e-20&linkCode=ur2&linkId=71c80756dcd782eba9f1a80dc576c7d3&camp=1789&creative=9325"
            >Amazon</a
        >
        </li>
    </ul>
</div>
<div class="hidden info m5stack-atom-speaker-kit">
    <h3>M5Stack Atom Speaker Kit</h3>
    <p>Small ESP32 board with a built-in speaker and a headphone jack.</p>
    <p>Buy</p>
    <ul>
        <li>
        <a
            href="https://shop.m5stack.com/products/atom-speaker-kit-ns4168?ref=NabuCasa"
            >M5Stack Shop</a
        >
        </li>
        <li>
        <a
            href="https://www.aliexpress.com/item/1005003297368240.html?aff_platform=portals-tool&sk=_A8G2YF&aff_trace_key=90326d2a90444b4887632f62dd533ce4-1654058373639-07963-_A8G2YF&terminal_id=c5517a8c9bb44b4fb32147398fbc2576&aff_fcid=90326d2a90444b4887632f62dd533ce4-1654058373639-07963-_A8G2YF&tt=CPS_NORMAL&aff_fsk=_A8G2YF"
            >AliExpress</a
        >
        </li>
    </ul>
</div>
<div class="hidden info m5stack-atom-echo">
    <h3>M5Stack Atom Echo Development Kit</h3>
    <p>Tiny ESP32 board with a built-in speaker.</p>
    <p>Buy</p>
    <ul>
        <li>
        <a
            href="https://shop.m5stack.com/collections/m5-controllers/products/atom-echo-smart-speaker-dev-kit?ref=NabuCasa"
            >M5Stack Shop</a
        >
        </li>
        <li>
        <a
            href="https://www.aliexpress.com/item/1005003299332198.html?aff_platform=portals-tool&sk=_A8G2YF&aff_trace_key=90326d2a90444b4887632f62dd533ce4-1654058373639-07963-_A8G2YF&terminal_id=c5517a8c9bb44b4fb32147398fbc2576&aff_fcid=90326d2a90444b4887632f62dd533ce4-1654058373639-07963-_A8G2YF&tt=CPS_NORMAL&aff_fsk=_A8G2YF"
            >AliExpress</a
        >
        </li>
    </ul>
</div>
</div>



{% include /esphome/flash_firmware_steps.markdown %}

### Advanced Users

* The device is adoptable in [the ESPHome dashboard](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome&amp;repository_url=https%3A%2F%2Fgithub.com%2Fesphome%2Fhome-assistant-addon).
* The YAML configuration is on [GitHub](https://github.com/esphome/media-players/)

### Affiliated links

Affiliated links are used on this website to support ESPHome development. Use Coupon code `NABUCASA` on [M5Stack](https://shop.m5stack.com/discount/NABUCASA?ref=NabuCasa) for 5% off your order.

[ESPHome](https://esphome.io)&mdash; Installer powered by [ESP Web Tools](https://esphome.github.io/esp-web-tools/)

<script>
    document.querySelectorAll('input[name="type"]').forEach((radio) =>
    radio.addEventListener("change", () => {
        const button = document.querySelector("esp-web-install-button");
        button.manifest = `https://esphome.github.io/media-players/${radio.value}-manifest.json`;
        document.querySelectorAll(".info").forEach((info) => {
        info.classList.add("hidden");
        });
        document
        .querySelector(`.info.${radio.value}`)
        .classList.remove("hidden");
    })
    );
    document
    .querySelector('input[name="type"]:checked')
    .dispatchEvent(new Event("change"));
</script>
