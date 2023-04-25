---
title: Matter (BETA)
description: Instructions on how to integrate Matter with Home Assistant.
ha_category:
  - Binary Sensor
  - Light
  - Lock
  - Sensor
  - Switch
ha_release: "2022.12"
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - "@home-assistant/matter"
ha_domain: matter
ha_platforms:
  - binary_sensor
  - diagnostics
  - light
  - lock
  - sensor
  - switch
ha_integration_type: integration
---

The Matter integration allows you to control Matter devices on your local WiFi or Thread network.

<p class='note'>
Both the Matter standard itself and its implementation within Home Assistant are in a early stage, you may run into compatibility and/or early adopter problems, hence our mark of the integration as BETA.
</p>

# What is Matter ?

Matter is [the new standard for home automation](<https://en.wikipedia.org/wiki/Matter_(standard)>) which has been released recently. It is in the process of being adopted by the tech industry. Matter is a local protocol. Device control is done without the need of any cloud. From a technical perspective, you can use a Matter compatible device with Home Assistant without having to connect to a vendor specific cloud. However, some vendors may require you to set up an account before you can enable Matter.

Unlike the radio based protocols we're already familiar with in the IoT landscape, like Zigbee and Z-Wave, Matter makes use of standard IP-based communication. Matter is not a radio protocol, but a control protocol that runs on top of the existing network infrastructure, using your existing Wi-Fi/Ethernet routers and Thread.

Home Assistant is a so called _controller_, it can control Matter based devices. Other examples of Matter controllers are the Google Nest speakers, Apple HomePods, and a SmartThings Station.

## Bridge devices

One of the great things about Matter is that you can have both Wi-Fi and Thread based devices on the same controller.
Next to actual devices (e.g. actors or sensors), you will also see bridges. The bridge itself is connected to the network over Ethernet or Wi-Fi and bridges multiple devices into a Matter network. A great example of this is the Philips Hue V2 bridge which is a Zigbee hub but also a Matter bridge. This bridge exposes all Zigbee devices that are already connected to the bridge as Matter devices on the network. Also Aqara, SwitchBot, and IKEA have launched such Hub devices.

<p class='note'>
Home Assistant, as a Matter controller, only supports **control** of Matter devices. Home Assistant is not a bridge itself and it cannot turn existing devices within Home Assistant into Matter compatible devices.
</p>

## Thread

Matter goes hand-in-hand with (but is not the same as) [Thread](<https://en.wikipedia.org/wiki/Thread_(network_protocol)>), which is a low power Radio mesh networking techology. Much like Zigbee, but with the key difference that it is _IP-addressable_, making it the perfect companion transport for Matter.

Thread devices become directly addressable by Matter controllers (such as Home Assistant) thanks to the use of so called Thread Border Routers, which are in fact just devices that are both within your network and have a Thread chip builtin and thus act as a "router" between the Thread radio signal and your local network. These border routers (you will probably end up having multiple of them in your house) make sure that your Thread based devices are reachable on your regular network and thus can be controlled with Matter. Examples of Thread Borders routers are the Apple TV 4K, HomePod (gen 2 or Mini) and the Google Nest Hub V2, so devices that you may already own. Besides that, all kind of other border routers are available, built-in to hardware applicances or software solutions based on OpenThread Border Router, such as the add-on we provide to use with the built-in Zigbee/Thread chip of the [Home Assistant Yellow](/yellow/) or the [Home Assistant SkyConnect](/skyconnect/) dongle.

In order to use any Thread based devices on a Matter controller you need to have at least one Thread Border router device within range of the device.
More info about Thread and diagnosing Thread networks and Border routers, see the [Thread](/integrations/thread/) integration.

<p class='note'>
A lot of devices that (will) hit the market will use Thread for the radio communication and Matter as control protocol but this is not guaranteed. There are for example also Thread based devices available that only support Apple Homekit or some vendor specific communication protocol. There are also a few  cases where you meed to apply for a (beta) firmware update on the device to enable Matter as communication protocol. Therefore it is adviced that whenever you are looking for devices, do not assume Matter support when you see a Thread logo but look for the *Matter logo itself* (on either Wifi/ethernet based devices or Thread) or any other confirmation by the manufacturer that the device supports Matter.
</p>

## Bluetooth

Most (if not all) Matter compliant devices will also have a Bluetooth chip onboard, this is to ease commissioning (a somewhat technical term for adding a device to your controller). Bluetooth will not be used for controlling a device but only for pairing it after unboxing or factory reset. The Home Assistant controller uses the Home Assistant Companion app to do commissioning so you can bring your phone close to the device you want to commission. Your network credentials will then be sent by the controller to your device over Bluetooth in the commissioning process. If that succeeded, the device will furthermore communicate over its native interface, meaning WiFi, Ethernet or Thread.

<p class='note'>
Although your Home Assistant server might have a Bluetooth adapter on board that the controller can use for commissioning of devices, we choose not to utilize that adapter. Mainly to prevent issues with the built-in Bluetooth integration but also because it makes more sense to bring your mobile devices close to the Matter device you'd like to commission.
</p>

## Multi fabric: join to multiple controllers

One of the great features of Matter is the so called _Multi Fabric_ feature: you can join the same device to multiple controllers. For example: add it to Google Home, Apple Home, and Home Assistant all at the same time. The standard describes that each device should be able to at least support 5 difference fabrics at the same time.

For devices where Home Assistant provides a native integration (with local API), Matter may not be the best option. Matter, being a universal standard, might not have the nitty-gritty features that come with a product specific protocol. A good example is Philips Hue: the communication over Matter only provides the basic controls over lights, the official integration brings all Hue unique features like (dynamic) scenes, entertainment mode, etc.

![image](/images/integrations/matter/matter_thread_infographic.webp)

Image taken from [this excellent article by The Verge](https://www.theverge.com/23165855/thread-smart-home-protocol-matter-apple-google-interview) about Matter that shows the landcape of Matter, Thread, Border routers and bridges in a nice visualized way.

{% include integrations/config_flow.md %}

For communicating with Matter devices, the Home Assistant integration runs its own "Matter controller" in a separate process which will be launched as add-on. This add-on runs the actual controller software and provides the connection between your Matter network (called Fabric in technical terms) and Home Assistant. The Home Assistant Matter integration connects to this server via a websocket connection.

The only supported configuration (for now) for the Matter integration is by running the officially provided Home Assistant Matter add-on. Running the [Matter server](https://github.com/home-assistant-libs/python-matter-server) by any other means is at your own risk and currently not officially supported.

## Current state of the integration

While the support for Matter is evolving, we will regularly update the Matter integration with new features or device support. Because it might be hard to track what's supported and what's not, we list the current state here and try to update this information on a regular basis.

Supported platforms (device types)

- Binary sensor: We have so far tested door/window sensors and motion sensors but others will probably work too.
- Climate: Support for thermostat devices is in development now.
- Cover: Basic cover control has been implemented but not all devices are supported yet.
- Lights: All features (in the Matter specification) should be supported, including color control etc.
- Locks: Basic lock control has been implemented but not all devices and features are supported yet.
- Sensor: We have currently tested Illuminance and temperature sensors but others will probably work too.
- Switch: Powerplugs should work (note: no support for energy metering yet in Matter).

Note that a single Matter device can exist of multiple platform. For example a Motion sensor which also has a temperature sensor and Illuminance sensor on board.

If you own a (bridged) Matter device and you are missing controls for this device, create an issue on [GitHub](https://github.com/home-assistant/home-assistant.io) and make sure to post your Integration diagnostics there. In some cases we can easily extend the existing platform support based on your diagnostics dump.

## Adding Matter devices to Home Assistant

Each Matter network is called a fabric. Each home automation controller that controls Matter devices has its own "fabric". You can add devices directly to the fabric of your Home Assistant instance, or share them from another fabric (ie Google, Apple) to Home Assistant's fabric. We're going to explore all these options below.

### Add a device using the iOS Companion app

This will use the Bluetooth connection of your phone to add the device.

1. Open The Home Assistant app on your phone.
2. Go to Settings, Devices & Services.
3. On the **Devices** tab, press the **Add device** button.
4. Choose **Add Matter device** at the top of the list.
5. Scan the QR-code of the Matter device with your phone camera or press `More options...` to manually enter the Commission code.
6. Press the `Add to Home Assistant` button which will start the commissioning process which may take up to a few minutes.
7. If you're adding a test board or beta device you might get a prompt about an Uncertified Accessory". In this dialog press `Add Anyway`.
8. Once prompted you can enter a custom Accessory Name, this is just an internal reference and not visible in Home Assistant so you can type whatever you like here.
9. Once the process is complete and you pressed the `Done` button, you are redirected to the Device within Home Assistant and its ready for use.

<lite-youtube videoid="8y79Kq3QfCQ" videotitle="Add Matter device via iOS app in Home Assistant"></lite-youtube>

### Add a device using the Android Companion app

This will use the Bluetooth connection of your phone to add the device.

1. Open The Home Assistant app on your phone.
2. Go to Settings, Devices & Services.
3. On the Devices tab, press the `Add device` button.
4. Choose `Add Matter device` as the top of the list.
5. Scan the QR-code of the Matter device with your phones camera or press the `Setup without QR-code` button to manually enter the Commission code.
6. The process will start adding the device which takes up to a few minutes.
7. If you're adding a test board (e.g. ESP32 running the example apps) and commissioning fails, you might need to take some actions in the Google Developer console, have a look at any instructions for your test device.
8. Once the process is complete and you pressed the `Done` button, you are redirected to the Device within Home Assistant and its ready for use.

<lite-youtube videoid="Fk0n0r0eKcE" videotitle="Add Matter device via Android app in Home Assistant"></lite-youtube>

### Share a device from Apple Home

This method will allow you to select a Matter device from Apple Home and share it to Home Assistant. The result is that the device can be controlled from both Apple Home and Home Assistant at the same time.

1.  Find your device in Apple Home and press the jogwheel to edit it. In the page with detailed descriptions and settings for the device, scroll all the way down and press the button `Turn On Pairing Mode`.
2.  You are now given a Setup code, copy this to the clipboard.
3.  Follow the [Add a device using the iOS Companion app](#add-a-device-using-the-ios-companion-app) directions above to add the device to Home Assistant where you paste the code you just received from Apple Home.

<lite-youtube videoid="nyGyZv90jnQ" videotitle="Share Matter device from Apple Home to Home Assistant"></lite-youtube>

### Share a device from Google Home

This method will allow you to share a device that was added to Google Home to Home Assistant. The result is that the device can be controlled from both Google Home and Home Assistant at the same time.

1.  Open the device in Google Home and press the settings button (jog wheel) in the top right.
2.  Click `Linked Matter apps and services`.
3.  Press the button `Link apps and services` to link the device to Home Assistant.
4.  Choose Home Assistant from the list, you are redirected to the Home Assistant Companion app now. Press `Add device`.
5.  Your device will now be added to Home Assistant. When the process finishes, you're redirected to the device page in Home Assistant.

<lite-youtube videoid="-B4WWevd2JI" videotitle="Share Matter device from Google Home to Home Assistant"></lite-youtube>

<p class='note'>
At this time it is not yet possible to share a device from Home Assistant to another platform. This feature should be added after the Matter SDK 1.1 is released.
</p>

## Experiment with Matter using a ESP32 dev board

You do not yet have any Matter compatible hardware but you do like to try it out or maybe create your own DIY Matter device ? We have [prepared a page for you](https://nabucasa.github.io/matter-example-apps/) where you can easily flash Matter firmware to a supported ESP32 development board. We actually recommend the M5 Stamp C3 device running the Lightning app.

NOTE for Android users: You need to follow the instructions at the bottom of the page to add the test device to the Google developer console, otherwise commissioning will fail. iOS users will not have this issue but they will get a prompt during commissioning asking if you trust the development device.

1. Make sure you are using the Google Chrome or Microsoft Edge browser.
2. Open https://nabucasa.github.io/matter-example-apps/
3. Attach the ESP32 device using an USB cable.
4. Click the radiobutton next to the example you like to setup, in case of an M5 Stamp, click `Lightning app for M5STAMP C3`.
5. Press `Connect`.
6. In the popup dialog that appears choose the correct serial device, in most cases this will be something like "cu-usbserial" or alike.
7. Click `Install Matter Lightning app example` and let it install the firmware on the device, this will take a few minutes.
8. Once the device is flashed with the Matter firmware, connect to the device again but this time choose `Logs & console`.
9. You are presented with a console interface where you see live logging of events. This is actually an interactive shell where you can type commands. For a list of all commands, type `matter help` and press enter.
10. To add the device, we need the QR code. In the console type in `matter onboardingcodes ble` and copy/paste the URL in your browser.
11. Use the QR code to add the device using one of the above instructions on your phone, e.g. using the Home Assistant Companion app.

## Known working devices

Because availability of actual Matter devices (and their documentation) is sparse, we provide a list of all known working devices that are tested by the Home Assistant Matter developers and/or the community to help you find the device you need. Note: The list below is ordered alphabetically and some of the links contain affiliate links.

Did you test a device that is not listed below ? It would be greatly appreciated if you share your experience either on the Matter discord channel or contribute a PR (or suggestion) to this documentation page so you can help out others, thanks in advance!

### Aqara M2 Hub

- Bridges Aqara (Zigbee) devices connected to the hub to Matter.
- You need to enable Matter support/firmware in the Aqara app.
- You will need an Aqara (cloud) account and the app before you can use Matter.
- See [this Aqara landingpage](https://www.aqara.com/en/article-1583275073188196352.html) for more information, including what devices are bridged.
- Thermostat devices (climate platform) are not supported yet (but currently in development).
- Device events for example for the wall rockers and Cube are not supported.

### Eve Energy (power plug), Eve Door & Window (contact sensor), Eve Motion (motion sensor)

- If you see a Matter logo on the box, the device runs Matter already and you can add it to HA immediately.
- If there is a Thread logo, you need to install the Matter firmware using the Eve app.
- No Matter logo and no Thread logo on the box? The device is not Matter compatible.
- The energy metering feature of the Eve plug will not work in Home Assistant (Apple only feature).
- Eve has just released official Matter support so ignore any documentation about the beta program.

[Eve Energy on Amazon](https://amzn.to/3YuO62P)
[Eve Door & Window on Amazon](https://amzn.to/3RIU6ml)
[Eve Motion on Amazon](https://amzn.to/3jDujiP)

### Nanoleaf Matter bulbs and Lightstrips

- Although the products work great once commissioned, multiple users have reported that commissioning them can be a bit difficult and requires some patience and multiple resets or optimizations to your home network.
- Check the [Nanoleaf Matter infopage](https://nanoleaf.me/en-EU/integration/matter/) for all supported products and instructions.

### Philips Hue (V2) Bridge

The Philips Hue V2 bridge supports Matter since a recent update (the beta program closed, it is now officially available). You can enable Matter support from the Hue app after which you can commission it to Home Assistant and other fabrics.

- It does not make a lot of sense to bind the Hue bridge to Home Assistant because you will loose functionality over the default Hue integration in Home Assistant, such as button press events and (dynamic) scenes.
- You will need a Hue/Signify (cloud) account and the app before you can use Matter.
- Device events for example for dimmer remotes are not supported.
- Only basic control of lights is supported, no scenes, events, effects etc.

### TP-Link Tapo P125M (power plug)

- Look for the M addition in the model name, a device without the M (regular P125) is not Matter compliant.
- This device is available in the US only.

[TP-Link Tapo P125M on Amazon](https://amzn.to/3RILJah)

## Troubleshooting

### General recommendations

- Using Thread based Matter devices in Home Assistant requires Home Assistant OS (version 10 and above) because of kernel patches to solve routing issues. Not using HAOS (and thus the official Matter add-on) is at your own risk.

- To use Thread devices you will need a Thread Network with at least one Thread Border Router in your network nearby the Thread device(s). Apple users need for example the Apple TV 4K or the HomePod Mini while Google users need a Nest Hub V2. Use the Thread integration in Home Assistant to diagnose your Thread network(s).

- Start simple and work from there, keep your network easy and add for example an ESP32 test device. Does that work, move on to the next step or more devices.

- Realize that you are an early adopter, both on the hardware side and on the software (controller) side so you may run into compatibility issues or features that are still missing. Report any issues you may find and help out pothers if you find a workaround or tested a device.

### I do not see the button "Commission using the Companion app"

This button will only be visible within the Home Assistant Companion App (so not in the browser) and your device meets all requirements for Matter support.

- For iOS, minimum version is iOS 16 (minimal 16.3 is preferred) and the most recent version of the HA companion app.
- For Android, minimum version is 8.1 and the most recent version of both the Google Home app and the (full) HA Companion app, downloaded from the app store.

### When I'm trying to commission using the Android app, I get an error stating "Matter is currently unavailable"

See above, make sure your device meets all requirements to support Matter. Update Android to the latest version and the Google Home and Home Assistant Companion app. To quickly verify if your device meets all requirements to support Matter, on your Android device go to **Settings**>**Google**>**Devices & Sharing**. There should be an entry there for **Matter devices**.

Some users have reported that an uninstall and reinstall of the Google Home app fixed this issue for them.
Also see this [extended troubleshooting guide](https://developers.home.google.com/matter/verify-services) from Google.

### Unable to commission devices, it keeps giving errors or stops working randomly

The Matter protocol relies on (local) IPv6 and mDNS (multicast traffic) which should be able to travel freely in your network. Matter devices that use WiFi (including Thread Border routers) must be on the same LAN/VLAN as Home Assistant. Matter devices that only use Thread must be joined to Thread networks for which there is at least one border router connected to the Home Assistant LAN.

If you experience any issues with the discovery of devices (e.g. initial commission keeps failing) or devices become unavailable randomly, investigate your network topology. For instance a setting on your router or Wi-Fi access point to "optimize" multicast traffic can actually harm the (discovery) traffic from Matter devices. Keep this in mind when you experience issues trying to add or control Matter devices. Protocols like Matter are designed for regular residential network setups and do not play nice with enterprise networking solutions like VLAN's, Multicast filtering, and IGMP snooping. To avoid issues, try to keep your network as simple and flat as possible.
