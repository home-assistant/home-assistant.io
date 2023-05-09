---
title: "Increasing the reach of bluetooth devices"
---


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
      .header {
        display: block;
        width: 100%;
        aspect-ratio: 1200 / 675;
        border-radius: 12px;
      }
      .hidden {
        display: none;
      }
      li {
        padding: 4px 0;
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
        width: calc(33.3% - 16px);
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
      @media only screen and (max-width: 450px) {
        .radios label {
          width: calc(50% - 16px);
          max-width: initial;
        }
      }
      .diy::after {
        content: "DIY";
        background-color: #f44336;
        color: #fff;
        padding: 2px 4px;
        border-radius: 4px;
        font-size: 0.8em;
        position: absolute;
        bottom: 12px;
        left: 12px;
      }
      body .diy {
        display: none;
      }
      body.show-diy .diy {
        display: initial;
      }
    </style>
    <script
      type="module"
      src="https://unpkg.com/esp-web-tools@9/dist/web/install-button.js?module"
    ></script>
  </head>


Bluetooth technology has a limited range. Home Assistant can expand the reach of its Bluetooth devices by communicating via Bluetooth proxy devices powered by [ESPHome](https://esphome.io/). 

Pick your product to turn it into a Bluetooth proxy for Home Assistant. No programming or other software required.

If you're an **advanced user** who wants to install the configuration via ESPHome add-on: You can find the `configuration.yaml` on [github](https://github.com/esphome/bluetooth-proxies).

To install the ESPHome software on the device, follow these steps:

1. Open this page in a Chromium-based browser (for example Google Chrome or MS Edge) on a desktop. It does not work on a tablet or phone.
1. Pick your product.

<div class="content">
<div class="radios">
    <label>
      <input type="radio" name="type" value="esp32-generic" checked />
      <img src="/images/docs/esphome/esp32_generic.png" alt="ESP32 Generic" />
    </label>
    <label>
      <input type="radio" name="type" value="m5stack-atom-lite" />
      <img src="/images/docs/esphome/m5stack_atom_lite.png" alt="M5Stack Atom Lite" />
    </label>
    <label>
      <input type="radio" name="type" value="olimex-esp32-poe-iso" />
      <img
        src="/images/docs/esphome/olimex_esp32_poe_iso.png"
        alt="Olimex ESP32 Power-over-Ethernet ISO"
      />
    </label>
    <label class="diy">
      <input type="radio" name="type" value="lilygo-t-eth-poe" />
      <img src="/images/docs/esphome/lilygo-eth-poe.png" alt="LilyGO T-ETH-POE" />
    </label>
    <label class="diy">
      <input type="radio" name="type" value="gl-s10" />
      <img src="/images/docs/esphome/gl-s10.png" alt="GL.iNet GL-S10" />
    </label>
    <label class="diy">
      <input type="radio" name="type" value="wt32-eth01" />
      <img src="/images/docs/esphome/wt32-eth01.png" alt="Wireless-Tag WT32-ETH01" />
    </label>
</div>
  <br />
  <p class="button-row" align="center">
          <esp-web-install-button></esp-web-install-button>
  </p>

  <div class="hidden info esp32-generic">
    <h3>Generic ESP32</h3>
    <p>
      Turn any ESP32 into a Bluetooth proxy for Home Assistant. This option
      only works for "plain" ESP32 and not for ESP32-C3 or other variants.
    </p>
    <p>Buy</p>
    <ul>
      <li>
        <a
          href="https://www.amazon.com/ESP-WROOM-32-Development-Microcontroller-Integrated-Compatible/dp/B08D5ZD528/?&_encoding=UTF8&tag=homeassista0e-20&linkCode=ur2&linkId=f9087b654cd5735f0761ae5db99e1e1a&camp=1789&creative=9325"
          >Amazon</a
        >
      </li>
    </ul>
  </div>

  <div class="hidden info gl-s10">
    <h3>GL.iNet GL-S10</h3>
    <p>
      ESP32 in a case with external antenna and wired Ethernet connection
      that can also be powered using Power over Ethernet 802.3af. Note that
      when installed via this website, Wi-Fi is disabled and it needs to be
      connected via Ethernet.
    </p>
      <b>Warning: This board requires extra work.</b>
      This device requires you to disassemble the device to be able to
      install it as a Bluetooth proxy. This installation method is for
      revision 2.X of their board. See instructions for the configuration of
      other revisions.
      <a href="https://blakadder.com/gl-s10/">Read DIY instructions.</a>
    </p>
    <p>Buy</p>
    <ul>
      <li>
        <a
          href="https://store.gl-inet.com/collections/iot-gateway/products/gl-s10-bluetooth-iot-gateway"
          >GL.iNet Shop</a
        >
      </li>
    </ul>
  </div>

  <div class="hidden info m5stack-atom-lite">
    <h3>M5Stack Atom Lite</h3>
    <p>Small ESP32 board with a case.</p>
    <p>Buy</p>
    <ul>
      <li>
        <a
          href="https://shop.m5stack.com/products/atom-lite-esp32-development-kit?ref=NabuCasa"
          >M5Stack Shop</a
        >
      </li>
      <li>
        <a
          href="https://www.aliexpress.com/item/1005003299215808.html?aff_platform=portals-tool&sk=_A8G2YF&aff_trace_key=90326d2a90444b4887632f62dd533ce4-1654058373639-07963-_A8G2YF&terminal_id=c5517a8c9bb44b4fb32147398fbc2576&aff_fcid=90326d2a90444b4887632f62dd533ce4-1654058373639-07963-_A8G2YF&tt=CPS_NORMAL&aff_fsk=_A8G2YF"
          >AliExpress</a
        >
      </li>
    </ul>
  </div>

<div class="hidden info olimex-esp32-poe-iso">
  <h3>Olimex ESP32 Power-over-Ethernet ISO</h3>
  <p>
    ESP32 board with wired Ethernet connection that can also be powered
    using Power over Ethernet 802.3af. Note that when installed via this
    website, Wi-Fi is disabled and it needs to be connected via Ethernet.
    The <i>ESP32-POE-ISO-EA</i> variant may provide better Bluetooth range
    since it has an external antennae.
    <a href="https://www.thingiverse.com/thing:3857281"
      >Case on Thingiverse.</a
    >
  </p>
  <p>Buy</p>
  <ul>
    <li>
      <a
        href="https://www.olimex.com/Products/IoT/ESP32/ESP32-POE-ISO-EA/open-source-hardware"
        >Olimex</a
      >
    </li>
    <li>
      <a
        href="https://www.mouser.com/ProductDetail/Olimex-Ltd/ESP32-POE-ISO?qs=sGAEpiMZZMuqBwn8WqcFUj2aNd7i9W7uc087HzBKguU1UBkflb3j3w%3D%3D"
        >Mouser</a
      >
    </li>
  </ul>
</div>

<div class="hidden info wt32-eth01">
  <h3>Wireless-Tag WT32-ETH01</h3>
  <p>
    ESP32 board with wired Ethernet connection. Note that when installed
    via this website, Wi-Fi is disabled and it needs to be connected via
    Ethernet.
    <a href="https://www.thingiverse.com/search?q=WT32-ETH01"
      >Various enclosures on Thingiverse.</a
    >
  </p>
  <p>
    <b>Warning: This board requires extra work.</b>
    This device requires you to create a special flash tool to be able to
    install it as a Bluetooth proxy.
    <a
      href="https://community.home-assistant.io/t/how-i-installed-esphome-on-the-wt32-eth01/359027"
      >Read DIY instructions.</a
    >
  </p>
  <p>Buy</p>
  <ul>
    <li>
      <a href="https://www.aliexpress.com/wholesale?SearchText=WT32-ETH01"
        >AliExpress</a
      >
    </li>
    <li>
      <a
        href="https://eu.mouser.com/ProductDetail/Seeed-Studio/102991455?qs=hd1VzrDQEGjybZ4QAH35DA%3D%3D"
        >Mouser</a
      >
    </li>
    <li>
      <a
        href="https://www.tubeszb.com/product/wt32-eth01-bluetooth-proxy-kit/53"
        >TubesZB - Kit with enlosure and USB-C</a
      >
    </li>
  </ul>
</div>

<div class="hidden info lilygo-t-eth-poe">
  <h3>LilyGO T-ETH-POE ESP32-WROOM</h3>
  <p>
    A compact board with an ESP32-WROOM module and wired Ethernet
    connection. Can be powered via Power over Ethernet 802.3af or via the
    built in USB-C port. Note that when installed via this website, Wi-Fi
    is disabled and it needs to be connected via Ethernet.
    <a
      href="https://www.thingiverse.com/search?q=LILYGO TTGO T-Internet-POE ESP32"
      >Various enclosures on Thingiverse.</a
    >
  </p>
  <p>
    <b>Warning: This board requires extra work.</b>
    This device comes with a special "download tool" that needs to be used
    to install it as a Bluetooth proxy.
  </p>
  <p>Buy</p>
  <ul>
    <li>
      <a
        href="https://www.aliexpress.com/item/2255800936677694.html?pdp_ext_f=%7B%22sku_id%22%3A%2210000014557692201%22%7D"
        >AliExpress</a
      >
    </li>
  </ul>
</div>
</div>

{% include /esphome/flash_firmware_steps.markdown %}

### Advanced Users

DIY Expert? [Show advanced boards](?diy)

* The device is adoptable in [the ESPHome dashboard](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome&amp;repository_url=https%3A%2F%2Fgithub.com%2Fesphome%2Fhome-assistant-addon).
* The YAML configuration is on [GitHub](https://github.com/esphome/bluetooth-proxies/)


### Affiliated links

Affiliated links are used on this website to support ESPHome development. Use Coupon code `NABUCASA` on [M5Stack](https://shop.m5stack.com/discount/NABUCASA?ref=NabuCasa) for 5% off your order.

[ESPHome](https://esphome.io)&mdash; Installer powered by [ESP Web Tools](https://esphome.github.io/esp-web-tools/)

<script>
  document.querySelectorAll('input[name="type"]').forEach((radio) => radio.addEventListener("change", () => {
      const button = document.querySelector("esp-web-install-button");
      button.manifest = `https://esphome.github.io/bluetooth-proxies/${radio.value}-manifest.json`;
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
  if (new URLSearchParams(document.location.search).has("diy")) {
    document.body.classList.add("show-diy");
  }
</script>
