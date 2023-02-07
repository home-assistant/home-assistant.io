---
title: Matter
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
  - '@marcelveldt'
  - '@MartinHjelmare'
ha_domain: matter
ha_platforms:
  - binary_sensor
  - light
  - sensor
  - switch
ha_integration_type: integration
---

This integration allows you to communicate with and control Matter devices on your local WiFi or Thread network.

Matter is [the new standard for home automation](https://en.wikipedia.org/wiki/Matter_(standard)) which has just been released and (in the process of) being adopted by the tech industry. Its is a local protocol, controlling your devices is done without the need of any cloud. You can purchase a Matter compatible device, join it to Home Assistant (only) and you will have no dependency on a Vendor specific cloud or whatsoever.

Matter devices are available using either WiFi based communication or [Thread](/integrations/thread/). Bluetooth is used for commissioning (adopting) of new devices. Home Assistant supports both transports for Matter.

Home Assistant only supports controlling Matter devices, it is not a bridge itself to turn devices within Home Assistant into Matter compatible devices.

At this time there are only a few devices available that are compatible with the standard and some of them require you to join a beta/developer program. It is to be expected that more devices will hit the market during the 2nd quarter of 2023 and beyond.

<p class='note'>
Both the Matter standard itself and its implementation within Home Assistant are in a very early stage where only the basics are working and/or breaking changes can still happen. Using it in production is not recommended yet until it matures a bit more.
</p>

One of the great features of Matter is the so called "Multi Fabric" feature, which means that you can join the same device to multiple controllers. For example add it to Google Home, Apple Home and Home Assistant at the same time.

Matter being a universal standard has some consessions. It is therefore recommended to use official integrations for Home Assistant (with a local API) over using the Matter protocol to communicate with a device. A good example is Philips Hue where the communication over Matter will only provide the basic controls over lights, the official integration will bring all Hue unique features like (dynamic) scenes, entertainment mode etc.

<p class='note'>
The Matter protocol relies on (local) IPv6 and mDNS (multicast traffic) which should be able to travel freely in your network. Matter devices (and any Thread Border routers) must be on the same LAN/VLAN as Home Assistant. Implementations like mDNS reflectors usually do more harm than good.
</p>

{% include integrations/config_flow.md %}

If you run Home Assistant Container, Home Assistant Core, or you don’t want to use the built-in Matter Server add-on, please see the [advanced installation instructions](#advanced-installation-instructions).


## Current state of the integration
While the support for Matter is evolving we will regularly update the Matter integration with new features or device support. Because it might be hard to track what's supported and what not we list the current state here and try to update this information as often as possible. 

Platform support in Home Assistant is currently limited to switches, lights and (binary) sensors. The light platform is limited to on/off and brightness control only, support for Color and Color temperature control will be added soon.

### Known issues
- Support for bridges (e.g. Hue bridge) is NOT working yet. Please do not try to commission a bridge as it will break the integration.
- Door/window sensors show up reversed (closed instead of open), this will be fixed soon.


## Adding Matter devices to Home Assistant

Adding a new device to a Matter "controller" like Home Assistant is called "commissioning" in Matter technical terms. There are multiple ways to commission new Matter devices to your Home Assistant "controller":

1) Commission a device using the Home Assistant Companion apps (iOS/Android).
2) Commission a device to Apple Home and share it to Home Assistant.
3) Commission a device to Google Home and share it to Home Assistant.

These are the commission methods we currently support and test. There are other ways too, such as commission from other controllers (SmartThings, Alexa) which will probably work too but these are untested.

### Commission a device using the iOS Companion app

This will use the Bluetooth connection of your phone to commission the device. Unless you pair it to other controllers yourself, the device will only be commissioned to Home Assistant.

1) Open The Home Assistant app on your phone.
2) Go to Settings, Integrations.
3) On the settings card for Matter, press the `Configure` button.
4) Press the button `Commission device with mobile app`.
5) Scan the QR-code of the Matter device with your phone camera or press `More options...` to manually enter the Commission code.
6) Press the `Add to Home Assistant` button which will start the commissioning process which may take up to a few minutes.
7) If you're commissioning a test board or beta device you might get a prompt about an Uncertified Accessory". In this dialog press `Add Anyway`.
8) Once prompted you can enter a custom Accessory Name, this is just an internal reference and not visible in Home Assistant so you can type whatever you like here.
9) Once the process is complete and you pressed the `Done` button, you are redirected to the Device within Home Assistant and its ready for use.

[LINK TO VIDEO GOES HERE]

### Commission a device using the Android Companion app

This will use the Bluetooth connection of your phone to commission the device. Unless you pair it to other controllers yourself, the device will only be commissioned to Home Assistant.

1) Open The Home Assistant app on your phone.
2) Go to Settings, Integrations.
3) On the settings card for Matter, press the `Configure` button.
4) Press the button `Commission device with mobile app`.
5) Scan the QR-code of the Matter device with your phones camera or press the `Setup without QR-code` button to manually enter the Commission code.
6) The process will start commissioning which takes up to a few minutes.
7) If you're commissioning a test board (e.g. ESP32 running the example apps) and commissioning fails, you might need to take some actions in the Google Developer console, have a look at any instructions for your test device.
8) Once the process is complete and you pressed the `Done` button, you are redirected to the Device within Home Assistant and its ready for use.

[LINK TO VIDEO GOES HERE]

### Commission a device from Apple Home

This method will allow you to commission the device using Apple Home and from there share it to Home Assistant. The result is that the device can be conbtrolled from both Apple Home and Home Assistant at the same time.

1) Open the Home app on your iOS device.
2) Press the plus sign to add a new device, choose Accessory.
3) Scan the QR-code of the Matter device with your phone camera or press `More options...` to manually enter the Commission code.
4) Press the `Add to Apple Home` button which will start the commissioning process which may take up to a few minutes.
7) If you're commissioning a test board or beta device you might get a prompt about an Uncertified Accessory". In this dialog press `Add Anyway`.
8) Add the newly added device to a room, accept or edit the device name and finish commissioning.
9) Lookup the device you've just added to Apple Home and press the jogwheel to edit it. In the page with detailed descriptions and settings for the device, scroll all the way down and press the button `Turn On Pairing Mode`.
10) You are now given a Setup code, copy this to the clipboard.
11) Follow the [Commission a device using the iOS Companion app](Commission a device using the iOS Companion app) directions above to commission the device to Home Assistant where you paste the code you just received from Apple Home.

[LINK TO VIDEO GOES HERE]

### Commission a device from Google Home

This method will allow you to commission the device using Google Home and from there share it to Home Assistant. The result is that the device can be controlled from both Google Home and Home Assistant at the same time.

<p class='note'>
The steps below describe the process of manually adding the device to Google Home, but in most cases, Android will already discover the presence of a commissionable Matter device and pop up a screen to start the commission process.

[SCREENSHOT OF ANDROID THAT FOUND A MATTER DEVICE]
</p>

Jump to step 10 if you already commissioned the device to Google Home.

1) Open the Home app on your Android device.
2) Go to settings, press `Add device`, Choose `New device`.
3) After clicking your Home location, a short search for devices will follow.
4) Press `Setup a different device` and choose `Matter-enabled device`.
5) Scan the QR-code of the Matter device with your phones camera or press the `Setup without QR-code` button to manually enter the Commission code.
6) The process will start commissioning which takes up to a few minutes. It might ask you to agree with Google's privacy policy.
7) If you're commissioning a test board (e.g. ESP32 running the example apps) and commissioning fails, you might need to take some actions in the Google Developer console, have a look at any instructions for your test device.
8) Add the newly added device to a room, accept or edit the device name and finish commissioning.
9) The device can now be controlled from Google Home and the next step is to share it to Home Assistant.
10) Open the device in Google Home and press the settings button (jog wheel) in the top right.
11) Click `Linked Matter apps and services`.
12) Press the button `Link apps and services` to link the device to Home Assistant.
13) Choose Home Assistant from the list, you are redirected to the Home Assistant Companion app now. Press `Add device`.
14) Your device will now be commissioned to Home Assistant. When the process finishes, you're redirected to the device page in Home Assistant.


[LINK TO VIDEO GOES HERE]


## Device specific instructions

Because availability of actual Matter devices is sparse and proper HOWTO documentation even more, we provide a few step by step instructions for devices we have currently tested.

### ESP32 dev board running Example app
This is the most convenient and easy way to start playing with Matter. We have [prepared a page for you](https://nabucasa.github.io/matter-example-apps/) where you can easily flash Matter firmware to a supported ESP32 development board. We actually recommend the M5 Stamp C3 device running the Lightning app.

NOTE for Android users: You need to follow the instructions at the bottom of the page to add the test device to the Google developer console, otherwise commissioning will fail. iOS users will not have this issue but they will get a prompt duing commissioning if you trust the development device.

1) Make sure you are using the Google Chrome or Microsoft Edge browser.
2) Open https://nabucasa.github.io/matter-example-apps/
3) Attach the ESP32 device using an USB cable.
4) Click the radiobutton next to the example you like to setup, in case of an M5 Stamp, click `Lightning app for M5STAMP C3`.
5) Press `Connect`.
6) In the popup dialog that appears choose the correct serial device, in most cases this will be something like "cu-usbserial" or alike.
7) Click `Install Matter Lightning app example` and let it install the firmware on the device, this will take a few minutes.
8) Once the device is flashed with the Matter firmware, connect to the device again but this time choose `Logs & console`.
9) You are presented with a console interface where you see live logging of events. This is actually an interactive shell where you can type commands. For a list of all commands, type `matter help` and press enter.
10) To commission the device, we need the QR code. In the console type in `matter onboardingcodes ble` and copy/paste the URL in your browser.
11) Use the QR code to commission the device using one of the above instructions on your phone, e.g. using the Home Assistant Companion app.


### Eve Energy (power plug)
1) Look for the Thread logo on the box to ensure you have the new device which is compatible with Matter.
2) The Eve device runs on HomeKit by default, you will need an iOS device to set it up out of the box.
3) The Eve device uses Thread for communication, therefore you will need to have a Thread Border Router configured in your network setup, such as the Apple TV 4K (2021/2022), Homepod Mini, or Homepod V2.
4) You need to join the [Eve Beta program here](https://www.evehome.com/en/meet-matter) and wait for instructions per email.
5) Update the firmware of your Eve device using the Eve beta app to Matter.
6) During the update process the Eve app will create a new QR code for you to save somewhere safe. This QR code is required when you want to commission the device to a Matter controller. The normal QR code attached to the device will no longer work!
7) During the uprade priocess, the Eve app will join the device to Apple Home using Matter.
8) Confirm that the device is working properly within Apple Home.
9) Follow our instructions above to share the device from Apple Home to Home Assistant.

### Eve Door & Window (contact sensor)
See instructions for the Eve Energy above.


### Eve Motion (motion sensor)
See instructions for the Eve Energy above.


### TP-Link Tapo P125M (power plug)
This device runs Matter out of the box, so you can add it directly to the controller(s) of your choice!

NOTES: 
- Look for the M addition in the model name, a device without the M (regular P125) is not Matter compliant.
- This device is available in the US only.

## Troubleshooting

We've seen cases (e.g. on UniFi hardware) where IPv6 derived from the Internet Provider causes issues with the discovery of Matter devices. Keep these notes in mind when you experience issues trying to commission or control Matter devices. Protocols like Matter are designed for regular residential network setups and do not play nice with enterprise solutions like VLAN's, Multicast filtering and IGMP Snooping. Try to keep your network as simple and flat as possible to avoid issues.

## Advanced installation instructions

If you are using Home Assistant Container, Home Assistant Core, or you don't want to use the built-in Matter Server add-on, you will need to run the Matter Server yourself, to which the Matter integration will connect.

### Running Matter Server

This application provides the connection between your Matter network (called Fabric in technical terms) and Home Assistant. The Home Assistant Matter integration connects to this server via a websocket connection. You need to run the Matter Server before you can use the integration.

There are multiple ways to run the server:

**Option 1: The official Matter Server add-on, as described above**

_This option is only available for Home Assistant OS (the recommended installation type) and Home Assistant Supervised installations._

**Option 2: Run the Matter server yourself**

This option is considered a very advanced setup and only for experienced users. You can find instructions on how to run the Matter Server in the [project repository](https://github.com/home-assistant-libs/python-matter-server).

