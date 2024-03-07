---
title: Matter (BETA)
description: Instructions on how to integrate Matter with Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Cover
  - Light
  - Lock
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
  - climate
  - cover
  - diagnostics
  - event
  - light
  - lock
  - sensor
  - switch
ha_integration_type: integration
---

The Matter integration allows you to control Matter devices on your local Wi-Fi or {% term Thread %} network.

For communicating with Matter devices, the Home Assistant integration runs its own "Matter controller" as add-on. This Matter Server add-on runs the controller software as a separate process and connects your Matter network (called Fabric in technical terms) and Home Assistant. The Home Assistant Matter integration connects to this server via a WebSocket connection.

<div class='note warning'>
The integration is marked BETA: Both the Matter standard itself and its implementation within Home Assistant are in an early stage. You may run into compatibility issues and/or other bugs.
</div>

# Introduction - What is Matter?

Matter is a new smart home connectivity standard for home automation products and IoT (Internet of Things) devices, see its [Wikipedia article](https://en.wikipedia.org/wiki/Matter_(standard)).

The initial version 1.0 release of Matter was published in October of 2022. Matter is still in the process of being adopted in the smart home market. It has gotten much publicity because of its promise of interoperability across all ecosystems. The largest tech companies like Google, Apple and Amazon teamed up to develop this new smart home connectivity standard under the roof of the CSA ([Connectivity Standards Alliance](https://csa-iot.org/)). The largest tech companies that are already active in the home automation market have announced that they are or will be working on Matter-compatible products and also joined the development effort.

Matter products run locally and always allow local control, with device control done without the need for any internet connection or cloud services. From a technical perspective, you can use a Matter-compatible device with Home Assistant without connecting to a vendor-specific cloud. However, some vendors may require you to set up an account before you can enable Matter support for some products, (especially for commercial manufacturer's own branded gateways/bridges/hubs/controllers sold as appliances).

Unlike other common radio-based protocols for IoT, (like Zigbee, Z-Wave, and Bluetooth), the Matter standard specification itself does not contain its own proprietary radio protocol or network transport protocol, but instead, it is a service control protocol that runs **on top** of the existing network infrastructure at the application level, with all Matter devices communicating using standard IP-based (IPv6) communication over your existing [local area network (i.e. LAN networks like Wi-Fi and Ethernet)](https://en.wikipedia.org/wiki/Local_area_network) or [Thread (Low-Power Wireless Personal Area Network)](https://en.wikipedia.org/wiki/Thread_(network_protocol)) depending on the type of device.

Home Assistant is a so-called "_controller_" in a Matter ecosystem, meaning that it can control Matter-based devices. Other examples of Matter controllers are the Google Nest products, Apple HomePod speakers, Samsung SmartThings Station, and some newer Amazon Echo devices.

## What does Thread have to do with Matter?

{% term Thread %} is a low power radio mesh networking technology. Much like Zigbee, but with the key difference that it is _IP-addressable_, making it a suitable transport protocol option for Matter.

The figure below illustrates the landscape of {% term Matter %}, {% term Thread %}, and Border routers. The Thread border router forwards traffic from the devices in the Thread network to devices outside that network.

![image](/images/integrations/matter/matter_thread_infographic.png)

Image taken from [the Thread Smart Home Fact Sheet](https://www.threadgroup.org/support#Resources) by the Thread Group.

For more information about Thread, refer to the [Thread documentation](/integrations/thread/).

### Thread devices don't necessarily support Matter

Many devices on the market use {% term Thread %} for radio communication and Matter as a control protocol. But this is not guaranteed. Some Thread-based devices support Apple HomeKit or another vendor-specific communication protocol. There are also a few cases where you need to apply for a (beta) firmware update on the device to enable Matter as a communication protocol.

Don't assume Matter support when you see a Thread logo on a device. Always look for the _Matter_ logo itself (on either Wi-Fi/Ethernet-based devices or {% term Thread %}) or any other confirmation by the manufacturer that the device supports Matter.

## Bluetooth used during commissioning

Most (if not all) Matter-compliant devices have a Bluetooth chip onboard to ease {% term commissioning %}. Bluetooth is not used to control but to pair a device after unboxing or after factory resetting. The Home Assistant controller uses the Home Assistant Companion app for {% term commissioning %}. During commissioning, you need to bring your phone close to the device. The controller then sends your network credentials to your device over Bluetooth. Once that is done, the device communicates over its native interface: Wi-Fi or Thread.

<div class='note'>
Although your Home Assistant server might have a Bluetooth adapter on board that the controller can use to {% term commission %} devices, Home Assistant does not utilize that adapter. Mainly to prevent issues with the built-in Bluetooth integration but also because it is easier to bring your mobile devices close to the Matter device than bringing the device near your server.
</div>

## Multi fabric: join to multiple controllers

One of the great features of Matter is the so-called _Multi Fabric_ feature: you can join the same device to multiple controllers. For example, simultaneously add it to Google Home, Apple Home, and Home Assistant. The standard describes that each device should be able to at least support 5 different fabrics simultaneously.

For devices where Home Assistant provides a native integration (with local API), Matter may not be the best option. Matter, being a universal standard, might not have the nitty-gritty features that come with a product-specific protocol. A good example is Philips Hue: the communication over Matter only provides the basic controls over lights, while the official [Hue integration](/integrations/hue) brings all Hue unique features like (dynamic) scenes, entertainment mode, etc.

## Supported installation types

It is recommended to run the Matter add-on on Home Assistant OS. This is currently the only supported option. Other installation types are without support and at your own risk.

If you run Home Assistant in a container, you can run a Docker image of the [Matter server](https://github.com/home-assistant-libs/python-matter-server). The requirements and instructions for your host setup are described on that GitHub page.

Running Matter on a Home Assistant Core installation is not supported.

## Adding a Matter device to Home Assistant

Each Matter network is called a fabric. Each home automation controller that controls Matter devices has its own "fabric". You can add devices directly to the fabric of your Home Assistant instance, or share them from another fabric (for example from Google or Apple) to Home Assistant's fabric. We're going to explore all these options below.

Note: The section below mentions third-party Thread border routers such as the Nest Hub (2nd Gen) or the HomePod Mini. This doesn’t mean you have to add your devices to these ecosystems. Home Assistant only uses them to access the Thread radio network. The communication between the Home Assistant Matter controller and your Matter devices is encrypted. The Thread border router passes the data along. It cannot read its content.

### Prerequisites

Make sure you have all these components ready before trying to add a Matter device to Home Assistant.

#### Prepare Home Assistant

- Make sure you have the latest version of Home Assistant [installed](/installation/).
- In Home Assistant, have the Matter integration installed.
  - Go to {% my integrations title="**Settings** > **Devices & services**" %}.
  - Add the **Matter (BETA)** integration.
  - When prompted to **Select the connection method**:
    - If you run Home Assistant OS in a regular setup: select **Submit**.
      - This will install the official Matter server add-on.
    - If you are already running the Matter server in another add-on, in or a custom container:
      - Deselect the checkbox, then select **Submit**.
      - In the next step, provide the URL to your Matter server.

#### Check logos on the device

- On the device packaging, check for both the Matter logo and for either the Wi-Fi or the {% term Thread %} logo.
- Check if the QR code or the numeric setup code is on the device.
  - If you reset your device you'll need the QR code *or* numeric setup code to {% term commission %} that device again! Without this information, commissioning won't be possible.
  - If the QR code or the numeric setup code is only in accompanied documentation, it is good practice to snap a picture of the QR code and/or numeric setup code as a backup, ideally along with the device for reference, and store the code in a safe place.

#### Prepare Android or iPhone

- Have either an Android or iPhone ready and Bluetooth enabled. For information why Bluetooth is required, refer to the section on [Bluetooth used during commissioning](#bluetooth-used-during-commissioning):
  - Android:
    - Have an Android phone (a full Android, not F-Droid).
    - Have the latest version of the Home Assistant Companion app installed.
    - If you are using {% term Thread %}: Make sure there is a Thread border router device (Nest Hub (2nd Gen) or Nest Wi-Fi Pro) present in your home network.
  - iPhone
    - Have the iOS version 16 or higher
    - Have the latest version of the Home Assistant Companion app installed.
    - If you are using {% term Thread %}: Make sure there is a Thread border router device (HomePod Mini or V2, Apple TV 4K) present in your home network.
- Make sure the phone is in close range of the border router and your device.
- If you are adding a Wi-Fi-based Matter device: Matter devices often use the 2.4&nbsp;GHz frequency for Wi-Fi. For this reason, make sure your phone is in the same 2.4&nbsp;GHz network where you want to operate your devices.

### To add a new device using the iOS Companion app

This guide describes how to add a new device. This will use the Bluetooth connection of your phone to add the device.

1. Open The Home Assistant app on your phone.
2. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
3. On the **Devices** tab, select the **Add device** button.
4. Select **Add Matter device**.
5. Scan the QR-code of the Matter device with your phone camera or select **More options...** to manually enter the Commission code.
6. Select **Add to Home Assistant**.
   - This starts the commissioning process which may take a few minutes.
7. If you're adding a test board or beta device, you might get a prompt about an **Uncertified Accessory**. In this dialog, select **Add Anyway**.
8. If prompted, enter a custom **Accessory Name**.
   - You can type whatever you like here.
   - This is an internal reference for iOS. It won't be visible in Home Assistant.
   - After entering a name, select **Continue**.
9. Once the process is complete, select **Done**.
   - You are now redirected to the device page within Home Assistant. It is ready for use.

<lite-youtube videoid="8y79Kq3QfCQ" videotitle="Add Matter device via iOS app in Home Assistant"></lite-youtube>

### To add a new device using the Android Companion app

This guide describes how to add a new device. This will use the Bluetooth connection of your phone to add the device.

1. Open The Home Assistant app on your phone.
2. Power up the device by plugging it in or add a battery. Most devices will now go into pairing mode.
   - For some devices, you need to enable a pairing mode (like you do with Z-Wave or Zigbee device).
   - The instructions on how to set the device in pairing mode can usually be found in the device documentation.
3. For some devices, at this point, your phone shows a pop-up, prompting you to **Scan the QR code**.
   - Scan the QR code.
   - When prompted to **Choose an app**, make sure to select Home Assistant.
   - Once the process is complete, select **Done**, then select **Add device**.
4. If you did not see a pop-up, go to {% my integrations title="**Settings** > **Devices & Services**" %}.
   - On the **Devices** tab, select the **Add device** button.
   - Select **Add Matter device**.
   - Scan the QR-code of the Matter device with your phone camera or select **Setup without QR-code** to manually enter the commission code.
      - This starts the commissioning process which may take a few minutes.
   - If you're adding a test board (e.g. ESP32 running the example apps) and commissioning fails, you might need to take some actions in the Google Developer console, have a look at any instructions for your test device.
   - Once the process is complete, select **Done**.
5. To view the device details, go to {% my integrations title="**Settings** > **Devices & Services**" %} and select the **Matter** integration.
6. By default, the device gets a factory specified name. To rename it, on the device page, select the pencil to edit and rename the device.
   ![image](/images/integrations/matter/matter-android-rename.png)
7. Your device is now ready to use.

<lite-youtube videoid="Fk0n0r0eKcE" videotitle="Add Matter device via Android app in Home Assistant"></lite-youtube>

### Troubleshooting the installation

Check these steps if you are experiencing issues when trying to add a Matter device using the Home Assistant Companion app on your Android phone.

#### Symptom

While trying to add the Matter device, I get an error stating that *Matter is currently unavailable*. 

#### Remedy

This could mean that not all required Matter modules that are needed by the Home Assistant Companion App have been downloaded yet. Try the following steps:

1. Wait up to 24 hours for the Google Play services to download the necessary Matter modules.
2. If this did not work, try reinstalling the Home Assistant Companion app.
3. If this did not work, try installing the Google Home app. Technically this is not required, but it might trigger another installation attempt of the Matter modules.
4. Refer to this [Troubleshooting Guide from Google](https://developers.home.google.com/matter/verify-services).

## Sharing a device from another platform with Home Assistant

Use one of these methods if your Matter device was added to Apple Home or Google Home and you want to control it from both Apple or Google Home and Home Assistant.

### Prerequisites

- Latest version of the Home Assistant Companion App installed.
- Have the Matter device integrated to Apple Home or Google Home respectively
- In Home Assistant, have the Matter integration installed.
  - Go to {% my integrations title="**Settings** > **Devices & services**" %}.
  - Add the **Matter (BETA)** integration.
  - When prompted to **Select the connection method**:
    - If you run Home Assistant OS in a regular setup: select **Submit**.
      - This will install the official Matter server add-on.
    - If you are running the Matter server in a custom container (not recommended):
      - Deselect the checkbox, then select **Submit**.
      - In the next step, provide the URL to your Matter server.

### Share a device from Apple Home

To allow Home Assistant to control the Matter device that has previously been added to Apple Home, follow these steps:

1. In Apple Home find your device and select the cogwheel to view the **Accessory Settings**.
2. Scroll all the way down and select **Turn On Pairing Mode**.
3. You are now given a setup code, copy this to the clipboard.
4. In the Home Assistant Companion App, go to {% my integrations title="**Settings** > **Devices & services**" %}.
5. Select **Devices** > **Add device** and on the QR code scanner page, select **More options**.
6. From the list, select your device and paste the code you just received from Apple Home.
7. Once the device is connected with Home Assistant, the device page opens and you can control it from there.

<lite-youtube videoid="nyGyZv90jnQ" videotitle="Share Matter device from Apple Home to Home Assistant"></lite-youtube>

### Share a device from Google Home

To allow Home Assistant to control the Matter device that has previously been added to Google Home, follow these steps:

1. In Google Home, open the **Devices** page and select the cogwheel.
2. On the **Settings** page, select your Matter device.
3. Select **Linked Matter apps and services**.
4. Select **Link apps and services** to link the device to Home Assistant.
5. Choose Home Assistant from the list.
   - You are redirected to the Home Assistant Companion app now.
   - Select **Add device**.
   - **Troubleshooting**: If Home Assistant fails to add the device, check if you have the Matter integration installed and the latest version of the Companion app.
6. Once the device has been added to Home Assistant, you see a notification **Your device has been added**.
   - When the process finishes, you're redirected to the device page in Home Assistant.
   - You can now control your device from within Home Assistant, as well as from Google Home.

<lite-youtube videoid="-B4WWevd2JI" videotitle="Share Matter device from Google Home to Home Assistant"></lite-youtube>

### Using a Matter bridge

For some ecosystems, you can add some of their non-Matter devices into Home Assistant via a *Matter bridge*. Examples of Matter bridges are the SwitchBot&nbsp;Hub&nbsp;2, Aqara&nbsp;Hub&nbsp;M2, Ikea&nbsp;Dirigera, or the Philips Hue Bridge. Using a bridge allows you to keep controlling these devices via their native App, while having them available in Home Assistant at the same time. The Aquara Hub, for example, uses a cloud-based integration. By bridging it into Home Assistant via Matter (instead of using their cloud-based integration), you can make it use local communication.

Home Assistant, as a Matter controller, only supports **control** of Matter devices. Home Assistant is not a bridge itself and it cannot turn existing devices within Home Assistant into Matter compatible devices.

#### How to add a Matter bridge to Home Assistant

How you add a bridge to Home Assistant depends on the device. Check the documentation of that device for the specific steps. In case of SwitchBot&nbsp;Hub&nbsp;2, for example, you need to enable the Matter-paring mode within the app. It then gives you a pairing code and tells you to set the actual device into pairing mode. You can then add that bridge device to Home Assistant as a Matter device. There is no guarantee that all the devices from that ecosystem can be used in Home Assistant. SwitchBot Hub 2 V1.5, for example, allows you to use curtain, lock, and blind via Matter, but not light.

#### When not to use a bridge

In some cases, bridging devices into Home Assistant via Matter might not bring you benefits. So far, The Philips Hue bridge, for example, supports Matter. But Matter only support a limited set of features. The native Home Assistant integration of Philips Hue comes with a wide variety of features. It also runs locally. You would not gain anything by adding your Philipps Hue devices to Home Assistant via Matter bridging. On the contrary, you would lose some of the features.

<lite-youtube videoid="rEugjMk-4II" videoStartAt="4192" videotitle="Bridge a Matter device to Home Assistant"></lite-youtube>

## Sharing a device across platforms

Follow these steps if you have added a Matter device to Home Assistant and you want to make it available in an other platform, such as Google Home or Apple Home.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and on the **Matter (BETA)** integration card, select **Devices**.
2. From the list of devices, select the device you want to share.
3. Select **Share device**, then in the dialog, select **Share device** again.
   - There is no need to press a hardware button on the device to set it to commissioning mode.
4. To join the device to the other platform, in their app, scan the QR code or enter the sharing code.
5. Follow the instructions in their app. Once the process is complete, you can see that the device is shared in Home Assistant:
   - Next to the **Share device** button, select the three dots menu, then **Manage fabrics**.
   - In the list there, the new platform should be listed.
   - For example, if you shared it with Google Home, it lists **Google LLC**.
     ![image](/images/integrations/matter/matter_share-device-with-other-platform.png)

## Removing a device from a Matter controller

Follow these steps if you want to remove a device from a particular Matter controller.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and on the **Matter (BETA)** integration card, select **Devices**.
2. From the list of devices, select the device you want to remove from a controller.
3. In the **Device info** section, next to **Share device**, select the three-dot menu. Then, select **Manage fabrics**.
4. From the list, remove the controller of interest.
   - If you want to remove Apple Home, also remove the Apple Keychain entry.
   ![image](/images/integrations/matter/matter-remove-from-network.png)
5. If you want to remove the device from Home Assistant itself, select the three-dot menu and select **Delete**.

## About Matter device information

The device information section provides some diagnostic information of a device.

1. To view the device details, go to {% my integrations title="**Settings** > **Devices & services**" %} and on the **Matter (BETA)** integration card, select **Devices**.
2. From the list of devices, select the device you want to look at.

<p class='img'>
<img src='/images/integrations/matter/matter_device-info.png' alt='Matter device information'>
</p>

This section provides a bit more information on some of the categories:

**Network type**: Shows which network type the device belongs to. For example, Thread or Wi-Fi.

**Device type**: There are 4 device types:

- **End device**: End device that always keeps its radio on. Typically these devices are not battery-powered.
- **Sleepy end device**: non-routing end device. Normally sleeping, wakes on occasion to check for messages. Typically battery-powered.
- **Routing end device**: End device that always keeps its radio on and can route traffic for other, routing and non-routing end devices.
- **Bridge**

**Network name**: Name of the network the device joined when it was commissioned.

**IP addresses**: Typically more than one IPv6 address is shown: link local, unique local, and global unicast. In some cases a device also supports IPv4. In that case there will also be listed an IPv4 address here.

## Experiment with Matter using a ESP32 dev board

You do not yet have any Matter-compatible hardware but you do like to try it out or maybe create your own DIY Matter device? We have [prepared a page for you](https://nabucasa.github.io/matter-example-apps/) where you can easily flash Matter firmware to a supported ESP32 development board. We recommend the M5 Stamp C3 device running the Lighting app.

NOTE for Android users: You need to follow the instructions at the bottom of the page to add the test device to the Google developer console, otherwise {% term commissioning %} will fail. iOS users will not have this issue but they will get a prompt during {% term commissioning %} asking if you trust the development device.

1. Make sure you use Google Chrome or Microsoft Edge browser.
2. Open https://nabucasa.github.io/matter-example-apps/
3. Attach the ESP32 device using a USB cable.
4. Select the radio button next to the example you like to set up, in case of an M5 Stamp, click **Lighting app for M5STAMP C3**.
5. Select **Connect**.
6. In the popup dialog that appears, choose the correct serial device. This will usually be something like "cu-usbserial" or alike.
7. Click **Install Matter Lighting app example** and let it install the firmware on the device. This will take a few minutes.
8. Once the device is flashed with the Matter firmware, connect to the device again but this time choose **Logs & console**.
9. You are presented with a console interface where you see live logging of events. This is an interactive shell where you can type commands. For a list of all commands, type **matter help** and press enter.
10. To add the device, we need the QR code. In the console, type in `matter onboardingcodes ble` and copy/paste the URL into your browser.
11. Use the QR code to add the device using one of the above instructions on your phone, e.g. using the Home Assistant Companion app.

## Troubleshooting

### General recommendations

- Using Thread-based Matter devices in Home Assistant requires Home Assistant OS version 10 and above. Not using Home Assistant OS is at your own risk. We do provide some [documentation](https://github.com/home-assistant-libs/python-matter-server/blob/main/README.md) on how to run the Matter Server as a Docker container. The documentation includes a description of the host and networking requirements.

- To use {% term Thread %} devices you will need a {% term Thread %} network with at least one Thread border router in your network nearby the {% term Thread %} device(s). Apple users, for example, need the Apple TV 4K or the HomePod Mini, while Google users need a Nest Hub (2nd Gen). Use the Thread integration in Home Assistant to diagnose your {% term Thread %} network(s).

- Start simple and work from there, keep your network simple and add for example an ESP32 test device. Once that works, move on to the next step or more devices.

- Realize that you are an early adopter, both on the hardware side and on the software (controller) side so you may run into compatibility issues or features that are still missing. Report any issues you may find and help out others if you find a workaround or tested a device.

- Make sure IPv6 (multicast) traffic travels freely from your network to the Home Assistant host. There is no requirement to have an IPv6-enabled internet connection or DHCPv6 server. However, IPv6 support has to be enabled on Home Assistant. Go to **{% my network title="Settings > System > Network" %}**, and make sure **IPv6** is set to **Automatic** or **static**, depending on your network setup. If you're unsure, use **Automatic**.

- For more detailed information on network configuration, refer to the [README of the Matter server repository](https://github.com/home-assistant-libs/python-matter-server/blob/main/README.md).

### I do not see the button "Commission using the Companion app"

This button will only be visible within the Home Assistant Companion App (so not in the browser) and your device meets all requirements for Matter support.

- For iOS, minimum version is iOS 16 (minimal 16.3 is preferred) and the most recent version of the HA companion app.
- For Android, minimum version is 8.1 and the most recent version of the (full) HA Companion app, downloaded from the Play Store.

### When I'm trying to commission using the Android app, I get an error stating "Matter is currently unavailable"

See above, make sure your device meets all requirements to support Matter. Update Android to the latest version and the Home Assistant Companion app. To quickly verify if your device meets all requirements to support Matter, on your Android device, go to **Settings** > **Google** > **Devices & Sharing**. There should be an entry there for **Matter devices**.

Some users have reported that uninstalling and reinstalling the Google Home app fixed this issue for them.
Also see this [extended troubleshooting guide](https://developers.home.google.com/matter/verify-services) from Google.

### Unable to commission devices, it keeps giving errors or stops working randomly

The Matter protocol relies on (local) IPv6 and mDNS (multicast traffic) which should be able to travel freely in your network. Matter devices that use Wi-Fi (including Thread border routers) must be on the same LAN/VLAN as Home Assistant. Matter devices that only use {% term Thread %} must be joined to {% term Thread %} networks for which there is at least one border router connected to the Home Assistant LAN.

If you experience any issues with discovering devices (for example, if the initial {% term commissioning %} keeps failing or if devices become unavailable randomly), investigate your network topology. For instance, a setting on your router or Wi-Fi access point to "optimize" multicast traffic can harm the (discovery) traffic from Matter devices. Keep this in mind when you experience issues trying to add or control Matter devices. Protocols like Matter are designed for regular residential network setups and may not integrate well with enterprise networking solutions like VLANs, Multicast filtering, and (malfunctioning) IGMP snooping. To avoid issues, try to keep your network topology as simple and flat as possible.

## Related topics

### Related integrations

- [Thread](/integrations/thread/)
- [HomeKit](/integrations/homekit_controller/)

### Related guides

- [Adding an Apple HomeKit device through Thread](/integrations/homekit_controller/#adding-a-homekit-device-through-thread)
