---
title: HomeLink
description: Instructions on how to setup your HomeLink enabled car with Home Assistant.
ha_category:
  - Binary sensor
ha_release: 2025.1
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@niaexa'
  - '@ryanjones-gentex'
ha_domain: gentex_homelink
ha_platforms:
  - binary_sensor
ha_integration_type: integration
ha_quality_scale: bronze
---

[HomeLink by Gentex](https://www.gentex.com/products-technology/automotive/connected-car/) is the most widely used and trusted car-to-home automation system, with nearly 100 million HomeLink-equipped vehicles on the road today.

HomeLink consists of vehicle-integrated programmable buttons that use radio frequency to conveniently and reliably operate your garage door opener, security gate and other radio frequency-compatible devices.

This integration provides the following platform interfaces:

- Binary sensors: the system detects when the programmable buttons are pressed. Users can use these presses to trigger home automation routines.

## The HomeLink® App

The HomeLink® app is a companion app that makes programming HomeLink easy and gives users access to trigger smart home routines on an array of popular cloud-based home automation platforms from the comfort of your vehicle. When you arrive home, one HomeLink button press can adjust your thermostat, turn on your lights, disarm the security system, unlock the door, and begin playing your favorite music.

The app pairs with your vehicle to allow use of HomeLink buttons without needing to fumble with your phone. Depending on how the OEM has integrated the feature, HomeLink can be activated by hard buttons via a low-energy Bluetooth connection with the phone, or soft buttons created in the app via the vehicle’s center stack when the phone is paired.

Download the HomeLink® app by scanning this QR code or following links to our app store pages:

![HomeLink® app QR code](/images/integrations/gentex_homelink/homelink-qr-code.png)

- [HomeLink® - Apple App Store](https://apps.apple.com/us/app/homelink/id1309231139)
- [HomeLink® - Google Play Store](https://play.google.com/store/apps/details?id=com.gentex.homelink.connect&hl=en-US&pli=1)

## Configuration

After downloading the HomeLink® app for the platform of your choice, creating an account, and pairing your mirror by following the in-app instructions, you may enable the HomeLink integration in Home Assistant via **Settings** > **Devices & Services**.

Log in with the same username and password that you used to sign up on the HomeLink® app.

## Automation and scenes

When you have configured the HomeLink service, you will see the device and buttons you have configured on the home screen.

HomeLink configures a Binary Sensor for each button in your vehicle, typically Button 1, Button 2 and Button 3. These correspond to the buttons (`.`, `..` and `...`) on your HomeLink Device. For example, if you configure an automation that happens when Button 2 is "on", then when you press the (`..`) button, that automation will trigger

For more information on how to configure automation and scenes, please see Home Assistant's documentation [here](https://www.home-assistant.io/getting-started/automation/)
