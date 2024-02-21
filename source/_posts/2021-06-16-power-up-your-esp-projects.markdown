---
title: "Power-up your ESP8266 and ESP32 projects: browser-based installation and configure Wi-Fi via Bluetooth LE"
description: "Power-up your ESP8266 and ESP32 projects: browser-based installation, configure Wi-Fi via Bluetooth LE and a renewed ESPHome dashboard!"
date: 2021-06-16 00:00:00
date_formatted: "June 16, 2021"
author: Paulus Schoutsen
author_twitter: balloob
categories: Announcements
og_image: /images/blog/2021-06-power-up-your-esp-projects/social.png
---

ESP8266 and ESP32 are microcontrollers made by the Chinese company Espressif.
Microcontrollers are teeny tiny computers with little processor power,
memory and space that can interact with sensors, send infrared commands
and many other things.

With the ESP devices Espressif has achieved something formidable: their devices
have Wi-Fi, are compatible with code for the popular Arduino microcontroller
and they are cheap. Like, $5-including-shipping-from-China-cheap
([AliExpress][aliexpress]) or $15 for 2 on [Amazon][amazon] cheap.
So cheap that they are the de facto standard for microcontrollers used in
IoT products, both for manufacturers and creators in the DIY space.

<p class='img'>
<img
  src='/images/blog/2021-06-power-up-your-esp-projects/quindor-drzzs-esp32-wled.png'
  alt='Quindor and DrZzs playing with an ESP32-based QuinLED running WLED'
  >
  Quindor and DrZzs playing with an ESP32-based QuinLED running WLED
  (<a href="https://www.youtube.com/watch?v=lXHQ5iTpCfg" target="_blank">YouTube</a>)
</p>

Microcontrollers are just computers and so are nothing without their software.
Open source software like [ESPHome][esphome], [WLED][wled] and
[Tasmota][tasmota] allow users to turn their ESP8266 and ESP32 devices into
powerful little machines that can gather information and control devices.
In your home, microcontrollers are the eyes and ears while Home Assistant
is the brain.

But these projects all have a common problem: it is difficult to get started.
We identified three pain points:

1. Installing the software on the microcontroller.
2. Connecting the microcontroller to your wireless network.
3. Configure the software on the microcontroller.

These pain points stand in the way for creators to reach a wider audience. It’s
our mission to make local home automation succeed, and these projects,
and all the possibilities that they unlock, are an important part of this.

**Today, we are introducing some things to make using microcontrollers easier.**

## Using terms everybody understands

We are going to start using words that a user understands instead of forcing
the technical terms on them. Terms like _“firmware”_ and _“flashing”_ are the
correct terminology but for inexperienced users they do more harm than good.
They will make the user feel uncomfortable before they even start.

So instead of _“upload firmware”_ we’ve updated the ESPHome dashboard to talk
about _“installing”_. We are encouraging other projects to do the same.

Things will get more technical as a user continues playing with microcontrollers.
But this change might just be that little thing why they will actually continue.

## ESP Web Tools: Installing projects on your microcontroller via the browser

We have created [ESP Web Tools][esp-web-tools]. ESP Web Tools allows project
websites to offer a great onboarding by enabling users to install the software
on their microcontrollers via their browser. All the user has to do is connect
their microcontroller to their computer and hit the install button on the
website. ESP Web Tools will automatically select the right build for your
microcontroller and install it.

This works for both the ESP8266 and ESP32 and with any project for these
devices. This technology is powered by Web Serial, a web standard for serial
communication that is part of Google Chrome and Microsoft Edge.

ESP Web Tools Web has already been adopted as part of the onboarding by
[WLED][wled] and [ESPEasy][espeasy].

<div class='videoWrapper'>
<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/k88BS8zgWq0"
  frameborder="0"
  allowfullscreen
  ></iframe>
</div>

[Learn how to add ESP Web Tools to your website][add-esp-web-tools]

If you have an ESP32 or ESP8266 device handy, you can try it out right here:

<center style="margin-bottom: 25px">
<script
  type="module"
  src="https://unpkg.com/esp-web-tools@10/dist/web/install-button.js?module"
></script><esp-web-install-button
  manifest="https://esphome.github.io/esp-web-tools/static/firmware_build/manifest.json"
></esp-web-install-button>
</center>

ESP Web Tools uses [code][adafruit-esptool] written by
[@MakerMelissa][makermelissa] from [Adafruit][adafruit]. We’re currently relying
on an enhanced fork that can fit a wider range of use cases, including ours.
We have a pull request open to get our changes contributed back.

[ESP Web Tools website][esp-web-tools]

_Note: We don’t like to use technology that is not available in all browsers
and cannot be made available in other ways. However, in this case the benefits
outweigh the cons. We hope that Firefox and WebKit add support for Web Serial
in the future._

## Improv Wi-Fi: Open standard to provision Wi-Fi credentials via Bluetooth Low Energy

We have created [Improv Wi-Fi][improv]. Improv Wi-Fi is a free and open standard
that anyone can use to offer a user-friendly way for users to connect their
devices to the wireless network.

<p class='img'>
<img
  src='/images/improv-logo.svg'
  alt='Improv Wi-Fi logo'
  style="width: 100%"
  >
</p>

For open source firmware there are two popular ways of getting a device to
connect to your wireless network. The device sets up a wireless network and you
need to connect to it via your phone or laptop, or the user compiles the
network and password into the firmware before installing it on the ESP.
Both methods are difficult and error prone, they offer a bad user experience.

If you look at off-the-shelf products, you see another approach:
send Wi-Fi credentials to the device via Bluetooth Low Energy (BLE). BLE allows
the user to get instant feedback if something goes wrong. This technology is
used in many products, but there is no open standard that is free to implement.
Improv Wi-Fi is an open standard that is free to implement.

Open source projects often host their control interface as a website on the
ESP device. Improv Wi-Fi supports this and when provisioning is done, the user
can be redirected to a URL to finish onboarding.

<div class='videoWrapper'>
<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/AdCsX7Ni6Jc"
  frameborder="0"
  allowfullscreen
  ></iframe>
</div>

Improv Wi-Fi can be used today to provision ESP32 microcontrollers running
[ESPHome][esphome] (ESP8266 devices do not support BLE). Users will soon be
able to provision devices with the Improv Wi-Fi service via the Home Assistant
Android and iOS apps. All these implementations are open source and can be used
in your projects.

Improv Wi-Fi is also available for the web in the form of a button that can be
added to your website. This will allow users to configure and set up a device
from any browser that supports Web Bluetooth.

If you’ve used the installation button in the previous section but have not yet
connected it to the wireless network, you can onboard that device here:

<center style="margin-bottom: 25px">
<script
  type="module"
  src="https://www.improv-wifi.com/sdk-js/launch-button.js"
></script><improv-wifi-launch-button></improv-wifi-launch-button>
</center>

[Improv Wi-Fi website][improv]

## ESPHome Dashboard: simplified and streamlined

With [ESPHome][esphome] users don’t program microcontrollers, they configure
them. Tell ESPHome there is a temperature sensor on pin 3 of your ESP device
and ESPHome will install custom software on your ESP device that makes this
information available in Home Assistant.

```yaml
# Example ESPHome configuration
sensor:
  - platform: dht
    pin: D2
    temperature:
      name: "Living Room Temperature"
    humidity:
      name: "Living Room Humidity"
    update_interval: 60s
```

<p class='img'>
<img
  src='/images/blog/2021-06-power-up-your-esp-projects/dht22.png'
  alt='Result of how it shows up in Home Assistant with the example ESPHome above'
  />
</p>

The ESPHome Dashboard has been updated with a simplified and streamlined wizard
for new configurations. You now enter the name of your project and your Wi-Fi
credentials and it will install it on your ESP device via the browser. After
that all further updates will happen wirelessly.

<div class='videoWrapper'>
<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/luE1hjCf3HI"
  frameborder="0"
  allowfullscreen
  ></iframe>
</div>

## ESPHome: embracing projects

We want to make it easy for creators to sell ESPHome powered products that offer
a great user experience. ESPHome projects embrace local control and integrate
nicely with Home Assistant, and so each extra ESPHome product that our users
can buy is a win.

To make it easier to keep creators and users connected once a product is
installed, projects can now add a project identifier and version to their
firmware ([docs][esphome-project]). With
today’s release this information will be available in the device information,
logging output and the mDNS discovery info.

The goal is to integrate the projects tighter into the ESPHome dashboard by
showing the project’s logo, link to the documentation and issue pages and allow
installing updates.

## Why we build this

Home Assistant’s mission is to make local home automation a viable alternative
to cloud based solutions and accessible to everyone.

To make this mission a reality, we started the company Nabu Casa. Together with
the community, Nabu Casa develops Home Assistant and ESPHome and is funded
solely by people that support this mission. No investors or loans.

If you want to help fund our work, subscribe to [Home Assistant Cloud][nabucasa].

[adafruit-esptool]: https://github.com/adafruit/Adafruit_WebSerial_ESPTool
[adafruit]: https://www.adafruit.com
[add-esp-web-tools]: https://esphome.github.io/esp-web-tools/#add-website
[aliexpress]: https://www.aliexpress.com/item/1005002354577296.html
[amazon]: https://amzn.to/35cUvGj
[esp-web-tools]: https://esphome.github.io/esp-web-tools/
[espeasy]: https://github.com/letscontrolit/ESPEasy
[esphome-project]: https://www.esphome.io/components/esphome.html#project-information
[esphome]: https://www.esphome.io
[improv]: https://www.improv-wifi.com
[makermelissa]: https://github.com/MakerMelissa
[nabucasa]: https://www.nabucasa.com
[tasmota]: https://tasmota.github.io/docs/
[wled]: https://wled.me
