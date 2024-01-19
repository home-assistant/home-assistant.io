---
title: Thread
ha_category:
  - Other
ha_release: 2023.2
ha_codeowners:
  - '@home-assistant/core'
ha_domain: thread
ha_iot_class: Local Polling
ha_integration_type: service
ha_config_flow: true
ha_platforms:
  - diagnostics
ha_zeroconf: true
---

The Thread integration helps you track the different Thread networks in your home and store the Thread network credentials (similar to a Wi-Fi password). The Thread integration in Home Assistant is currently still a work in progress.

You do not need to install this integration. The Thread integration shows up automatically when Home Assistant detects a [border router](#thread-border-router-devices).

## Logos on Thread-based smart home devices

If you have a Thread-based consumer device, you will typically see a Thread logo on the packaging.

<p class='img'><img width="200" src='/images/integrations/thread/thread-requires-border-router.png'></p>

ToDo: find up-to-date logo with correct color.


The "Built on Thread: requires border router" logo means Thread is your only supported network protocol for this device. You cannot use Wi-Fi to onboard this device.

In addition, you will see a Matter or Apple HomeKit logo on the packaging.

<p class='img'><img src="/images/integrations/thread/matter_onpackbadge_logo.png"  width="200"><img src="/images/integrations/thread/apple-works-with-homekit-logo.png"  width="200"> Matter or Apple HomeKit logo on the packaging.
 </p>

Matter and Apple HomeKit are smart home protocols. They are responsible for handling the Thread credentials and connecting your Thread device to the Thread network. They are needed to control your device. Both home automation standards are supported natively by Home Assistant.

## Adding a Thread-based device to Home Assistant

How a Thread-based device is added to Home Assistant depends on the home automation standard it uses.

1. If you see the Matter logo on your device, follow the procedure [adding a Matter device to Home Assistant](/integrations/matter/#adding-a-matter-device-to-home-assistant).

   <img src="/images/integrations/thread/matter_onpackbadge_logo.png"  width="200">

2. If you see the Apple HomeKit logo on your device, follow the procedure [adding a HomeKit device to Home Assistant](/integrations/homekit_controller/#adding-a-homekit-device-through-thread).

   <img src="/images/integrations/thread/apple-works-with-homekit-logo.png"  width="200">

## About Thread

This section introduces the terms *Thread* and *border router* and lists border routers that are supported by Home Assistant.

### A communication protocol for IoT devices

Thread is a low-power mesh networking standard for IoT devices. The low-power aspect is important for battery-powered smart home devices. However, it's also low-bandwidth, making it ideal for applications that don't send a lot of data, like switches or motion sensors.

Thread uses the same <abbr title="radio frequency">RF</abbr> technology as Zigbee (IEEE 802.15.4) but provides IP connectivity similar to Wi-Fi. Unlike Zigbee, Thread does not allow controlling devices: It is just a communication protocol. To control the Thread devices, a higher-level protocol is required: Matter or Apple HomeKit.

Thread devices use the IPv6 standard to communicate both inside and outside the mesh network.

### Thread border routers connect Thread devices to your network

To communicate outside the mesh with any IPv6-capable device, the devices use Thread border routers. A Thread border router is connected to your network either via Wi-Fi or Ethernet and uses its <abbr title="radio frequency">RF</abbr> radio to communicate with the Thread mesh network. The <abbr title="Thread border router">TBR</abbr> routes packets between your local network and the Thread mesh. It does not look at the content of these packets, it just forwards them.

Often, Thread border routing is only a secondary functionality of a smart home device. For example, the Nest Hub (2nd gen) is a smart display, a Google Home controller, and a Chromecast target, but also has a Thread border router included.

Unlike other protocols, Thread can use multiple border routers in a single network. This increases wireless coverage and reduces the risk of a single point of failure. Ideal for home automation, with a potentially large number of devices spread over a large area.

Home Assistant can only control OpenThread <abbr title="Thread border routers">TBRs</abbr>. OpenThread is an open source implementation of Thread, originally released by Google.

### Thread border router devices

Currently, the following <abbr title="Thread border router">TBR</abbr> devices are known to work well with Home Assistant:

#### Nabu Casa

- [Home Assistant Yellow](/yellow/) hub
- [Home Assistant SkyConnect](/skyconnect/) Zigbee/Thread USB stick

#### Google

- **Displays**: Nest Hub (2nd gen), Nest Hub Max
- **Wi-Fi routers**: Nest Wifi Pro (Wi-Fi 6E), Nest Wifi

#### Apple

- **Speakers**: HomePod (2nd generation), HomePod mini
- **TVs**: Apple TV 4K (3rd generation) Wi-Fi + Ethernet, Apple TV 4K (2nd generation)

#### Others

There are other companies that provide devices with border router capability, such as Nanoleaf or Amazon. They won't be mentioned further because in our development and testing we focused on the above products.

## Understanding the Thread configuration page

This section explains why you might see multiple networks on the Thread configuration page and what this means for your network.

### Different Thread networks

Today, each vendor forms their own Thread network when you start using their products. This means you can end up having a Home Assistant, an Apple, and a Google Thread network in your home. The Thread configuration panel lists all Thread border routers and groups them by the Thread network.

<p class='img'><img width="400" src='/images/integrations/thread/thread-no-3rd-party-credentials.png'>
The Thread configuration page shows three vendor-specific Thread networks.
</p>

These are all separate networks using different credentials, which prevents devices from roaming between the Thread networks.

The <img width="30px" src='/images/integrations/thread/information-outline.png'> icon indicates that Home Assistant has the credentials for that network. In this case, only the credentials of the `home assistant` network are known.

Technical detail: Home Assistant discovers all Thread border routers in your network by their mDNS/DNS-SD announcements. The local announcements allow us to learn which networks exist, but do not contain the network credentials.

#### The preferred network

The intention of the **Preferred network** in Home Assistant is that it will be used as the default network when adding Thread⁻based devices.

<div class="note">

The **preferred network** function isn't completely implemented yet. In particular, when adding Matter devices through the companion apps, the preferred network of the mobile device is being used.
</div>

You can only set a Thread network as preferred if the credentials are known. A Thread device can be connected to any of those Thread networks, not just the preferred one.

### Importing Thread credentials

The Android and iOS companion apps are used to import Thread credentials. Navigate to the Thread configuration page on your companion app. You should see an **Import credentials** button on the lower right corner.

<p class='img'><img width="400" src='/images/integrations/thread/thread-import-credentials.png'>
Importing credentials on Android phone.
</p>

<p class='img'><img width="400" src='/images/integrations/thread/thread-preferred-network.png'>
This Thread configuration page shows three different Thread networks. Google's Thread network is the preferred Thread network.
</p>

This allows a Google- or Apple-created Thread network to be the preferred network of Home Assistant.

### Combining Thread networks

In the current implementation, having <abbr title="Thread border routers">TBRs</abbr> results in separate networks using different credentials. This prevents devices from roaming between the Thread networks. In theory, it would be better to join all Thread networks into a single network to increase the size of the mesh network. A dense mesh network should lead to better <abbr title="radio frequency">RF</abbr> coverage and better link quality, which lowers transmission latencies, making communication faster.

<div class="note">

However, in the current implementation, combining Thread networks seems to lead to instabilities. Therefore, we do not recommend combining networks in production just yet. This is especially true for our OpenThread Border Router in combination with Google or Apple Thread networks.

</div>

## Related hardware

- [Home Assistant Yellow](/yellow/) hub
- [Home Assistant SkyConnect](/skyconnect/) Zigbee/Thread USB stick

## Related guides

- [Adding a Matter device to Home Assistant](/integrations/matter/#adding-a-matter-device-to-home-assistant)
- [Adding an Apple HomeKit device through Thread](/integrations/homekit_controller/#adding-a-homekit-device-through-thread)