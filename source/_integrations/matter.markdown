---
title: Matter (BETA)
description: Instructions on how to integrate Matter with Home Assistant.
ha_category:
  - Binary Sensor
  - Light
  - Sensor
  - Switch
ha_release: '2022.12'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@home-assistant/matter'
ha_domain: matter
ha_platforms:
  - binary_sensor
  - diagnostics
  - light
  - sensor
  - switch
ha_integration_type: integration
---

The Matter integration allows you to control Matter devices on your local WiFi or Thread network.

Matter is [the new standard for home automation](https://en.wikipedia.org/wiki/Matter_(standard)) which has just been released. It is in the process of being adopted by the tech industry. Matter is a local protocol, device control is done without the need of any cloud. You can use a Matter compatible device with Home Assistant without having to connect to a vendor specific cloud.

Matter devices are available using either WiFi based communication or [Thread](/integrations/thread/), both are supported by Home Assistant. Bluetooth is used for adding new devices to your Matter network.

Home Assistant only supports control of Matter devices. Home Assistant is not a bridge itself and it cannot turn devices within Home Assistant into Matter compatible devices.

At this time there are only a few devices available that are compatible with the standard and some of them require you to join a beta/developer program. It is to be expected that more devices will hit the market during the 2nd quarter of 2023 and beyond.

<p class='note'>
Both the Matter standard itself and its implementation within Home Assistant are in a very early stage where only the basics are working and/or breaking changes can still happen. Using it in production is not recommended yet until it matures a bit more.
</p>

One of the great features of Matter is the so called _Multi Fabric_ feature: you can join the same device to multiple controllers. For example: add it to Google Home, Apple Home, and Home Assistant at the same time.

For devices where Home Assistant provides an native integration (with local API), Matter may not be the best option. Matter, being a universal standard, might not have the nitty-gritty features that come with a product specific protocol. A good example is Philips Hue:  the communication over Matter only provides the basic controls over lights, the official integration brings all Hue unique features like (dynamic) scenes, entertainment mode, etc.

<p class='note'>
The Matter protocol relies on (local) IPv6 and mDNS (multicast traffic) which should be able to travel freely in your network. Matter devices (and any Thread Border routers) must be on the same LAN/VLAN as Home Assistant. Implementations like mDNS reflectors usually do more harm than good.
</p>

{% include integrations/config_flow.md %}

_If you run Home Assistant Container, Home Assistant Core, or you don’t want to use the built-in Matter Server add-on, please see the [advanced installation instructions](#advanced-installation-instructions)._

## Current state of the integration

While the support for Matter is evolving, we will regularly update the Matter integration with new features or device support. Because it might be hard to track what's supported and what not, we list the current state here and try to update this information as often as possible.

Platform support in Home Assistant is currently limited to switches, lights, and (binary) sensors. The light platform is limited to _on/off_ and _brightness_ control only, support for _color_ and _color temperature_ control will be added soon.

### Known issues

- Support for bridges (e.g. Hue bridge) is NOT working yet. Please do not try to add a bridge as it will break the integration.
- Door/window sensors show up reversed (closed instead of open)

_Both issues will be fixed in Home Assistant 2023.3._

## Adding Matter devices to Home Assistant

Each Matter network is called a fabric. Each home automation controller that controls Matter devices has its own fabric. You can add devices directly to the fabric of your Home Assistant instance, or share them from another fabric (ie Google, Apple) to Home Assistant's fabric. We're going to explore all these options below.

### Add a device using the iOS Companion app

This will use the Bluetooth connection of your phone to add the device.

1) Open The Home Assistant app on your phone.
2) Go to Settings, Devices & Services.
3) On the Devices tab, press the `Add device` button.
4) Choose `Add Matter device` as the top of the list.
5) Scan the QR-code of the Matter device with your phone camera or press `More options...` to manually enter the Commission code.
6) Press the `Add to Home Assistant` button which will start the commissioning process which may take up to a few minutes.
7) If you're adding a test board or beta device you might get a prompt about an Uncertified Accessory". In this dialog press `Add Anyway`.
8) Once prompted you can enter a custom Accessory Name, this is just an internal reference and not visible in Home Assistant so you can type whatever you like here.
9) Once the process is complete and you pressed the `Done` button, you are redirected to the Device within Home Assistant and its ready for use.

<lite-youtube videoid="8y79Kq3QfCQ" videotitle="Add Matter device via iOS app in Home Assistant"></lite-youtube>

### Add a device using the Android Companion app

This will use the Bluetooth connection of your phone to add the device.

1) Open The Home Assistant app on your phone.
2) Go to Settings, Devices & Services.
3) On the Devices tab, press the `Add device` button.
4) Choose `Add Matter device` as the top of the list.
5) Scan the QR-code of the Matter device with your phones camera or press the `Setup without QR-code` button to manually enter the Commission code.
6) The process will start adding the device which takes up to a few minutes.
7) If you're adding a test board (e.g. ESP32 running the example apps) and commissioning fails, you might need to take some actions in the Google Developer console, have a look at any instructions for your test device.
8) Once the process is complete and you pressed the `Done` button, you are redirected to the Device within Home Assistant and its ready for use.

<lite-youtube videoid="Fk0n0r0eKcE" videotitle="Add Matter device via Android app in Home Assistant"></lite-youtube>

### Share a device from Apple Home

This method will allow you to select a Matter device from Apple Home and share it to Home Assistant. The result is that the device can be controlled from both Apple Home and Home Assistant at the same time.

1)  Find your device in Apple Home and press the jogwheel to edit it. In the page with detailed descriptions and settings for the device, scroll all the way down and press the button `Turn On Pairing Mode`.
2)  You are now given a Setup code, copy this to the clipboard.
3)  Follow the [Add a device using the iOS Companion app](#add-a-device-using-the-ios-companion-app) directions above to add the device to Home Assistant where you paste the code you just received from Apple Home.

<lite-youtube videoid="nyGyZv90jnQ" videotitle="Share Matter device from Apple Home to Home Assistant"></lite-youtube>

### Share a device from Google Home

This method will allow you to share a device that was added to Google Home to Home Assistant. The result is that the device can be controlled from both Google Home and Home Assistant at the same time.

1)  Open the device in Google Home and press the settings button (jog wheel) in the top right.
2)  Click `Linked Matter apps and services`.
3)  Press the button `Link apps and services` to link the device to Home Assistant.
4)  Choose Home Assistant from the list, you are redirected to the Home Assistant Companion app now. Press `Add device`.
5)  Your device will now be added to Home Assistant. When the process finishes, you're redirected to the device page in Home Assistant.

<lite-youtube videoid="-B4WWevd2JI" videotitle="Share Matter device from Google Home to Home Assistant"></lite-youtube>

## Device specific instructions

Because availability of actual Matter devices is sparse and proper HOWTO documentation even more, we provide a few step by step instructions for devices we have currently tested.

### TP-Link Tapo P125M (power plug)

This device runs Matter out of the box, so you can add it directly to the controller(s) of your choice!

Look for the M addition in the model name, a device without the M (regular P125) is not Matter compliant. This device is available in the US only.

[TP-Link Tapo P125M on Amazon](https://amzn.to/3RILJah)

### ESP32 dev board running Matter example app

This is the most convenient and easy way to start playing with Matter. We have [prepared a page for you](https://nabucasa.github.io/matter-example-apps/) where you can easily flash Matter firmware to a supported ESP32 development board. We actually recommend the M5 Stamp C3 device running the Lightning app.

NOTE for Android users: You need to follow the instructions at the bottom of the page to add the test device to the Google developer console, otherwise commissioning will fail. iOS users will not have this issue but they will get a prompt during commissioning asking if you trust the development device.

1) Make sure you are using the Google Chrome or Microsoft Edge browser.
2) Open https://nabucasa.github.io/matter-example-apps/
3) Attach the ESP32 device using an USB cable.
4) Click the radiobutton next to the example you like to setup, in case of an M5 Stamp, click `Lightning app for M5STAMP C3`.
5) Press `Connect`.
6) In the popup dialog that appears choose the correct serial device, in most cases this will be something like "cu-usbserial" or alike.
7) Click `Install Matter Lightning app example` and let it install the firmware on the device, this will take a few minutes.
8) Once the device is flashed with the Matter firmware, connect to the device again but this time choose `Logs & console`.
9) You are presented with a console interface where you see live logging of events. This is actually an interactive shell where you can type commands. For a list of all commands, type `matter help` and press enter.
10) To add the device, we need the QR code. In the console type in `matter onboardingcodes ble` and copy/paste the URL in your browser.
11) Use the QR code to add the device using one of the above instructions on your phone, e.g. using the Home Assistant Companion app.

### Eve Energy (power plug), Eve Door & Window (contact sensor), Eve Motion (motion sensor)

1) Look for the Thread logo on the box to ensure you have the new device which is compatible with Matter.
2) The Eve device runs on HomeKit by default, you will need an iOS device to set it up out of the box.
3) The Eve device uses Thread for communication, therefore you will need to have a Thread Border Router configured in your network setup, such as the Apple TV 4K (2021/2022), Homepod Mini, or Homepod V2.
4) You need to join the [Eve Beta program here](https://www.evehome.com/en/meet-matter) and wait for instructions per email.
5) Update the firmware of your Eve device using the Eve beta app to Matter.
6) During the update process the Eve app will create a new QR code for you to save somewhere safe. This QR code is required when you want to add the device to a Matter controller. The normal QR code attached to the device will no longer work!
7) During the upgrade process, the Eve app will join the device to Apple Home using Matter.
8) Confirm that the device is working properly within Apple Home.
9) Follow our instructions above to share the device from Apple Home to Home Assistant.

Once the initial firmware upgrade to Matter is complete, the device can also be paired to non-Apple based Thread networks, like Google Home or later Home Assistant's own Thread implementation based on OTBR but you do need an Apple ecosystem running (iOS phone + Border router) for the first time setup.

- [Eve Energy on Amazon](https://amzn.to/3YuO62P)
- [Eve Door & Window on Amazon](https://amzn.to/3RIU6ml)
- [Eve Motion on Amazon](https://amzn.to/3jDujiP)

## Troubleshooting

### I do not see the option to add a Matter device in the settings
We've added the option to **Add a Matter device** from the **Settings**>**Devices** in a recent version of the Home Assistant frontend, available from version 2023.3 and upwards or if you're running the Home Assistant nightly channel. If you are on a previous version of Home Assistant, you should see a button **Configure** on the Matter integration card within **Settings**>**Devices & Services**>**Integrations**. Click that **Configure** button and you should be able to see the **Commission** button on the Companion app.

### I do not see the button "Commission using the Companion app"
This button will only be visible within the Home Assistant Companion App (so not in the browser) and your device meets all requirements for Matter support.
- For iOS, minimum version is iOS 16 (minimal 16.3 is preferred) and the most recent version of the HA companion app.
- For Android, minimum version is 8.1 and the most recent version of both the Google Home app and the (full) HA Companion app, downloaded from the app store.

### When I'm trying to commission using the Android app, I get an error stating "Matter is currently unavailable"
See above, make sure your device meets all requirements to support Matter. Update Android to the latest version and the Google Home and Home Assistant Companion app. To quickly verify if your device meets all requirements to support Matter, on your Android device go to **Settings**>**Google**>**Devices & Sharing**. There should be an entry there for **Matter devices**.

### Unable to commission devices, it keeps giving errors or stops working randomly
We've seen cases (e.g. on UniFi hardware) where IPv6 derived from the Internet Provider causes issues with the discovery of Matter devices. Keep this in mind when you experience issues trying to add or control Matter devices. Protocols like Matter are designed for regular residential network setups and do not play nice with enterprise solutions like VLAN's, Multicast filtering, and IGMP snooping. To avoid issues, try to keep your network as simple and flat as possible.

## Advanced installation instructions

If you are using Home Assistant Container, Home Assistant Core, or you don't want to use the built-in Matter Server add-on, you will need to run the Matter Server yourself, to which the Matter integration will connect.

### Running Matter Server

This application provides the connection between your Matter network (called Fabric in technical terms) and Home Assistant. The Home Assistant Matter integration connects to this server via a websocket connection. You need to run the Matter Server before you can use the integration.

There are multiple ways to run the server:

**Option 1: The official Matter Server add-on, as described above**

_This option is only available for Home Assistant OS (the recommended installation type) and Home Assistant Supervised installations._

**Option 2: Run the Matter server yourself**

This option is considered a very advanced setup and only for experienced users. You can find instructions on how to run the Matter Server in the [project repository](https://github.com/home-assistant-libs/python-matter-server).

_Disclaimer: Some links on this page are affiliate links._
