---
title: "Thread"
icon: "cbi:thread-net"
description: "Connect Thread devices, like sensors, switches, and locks, to Home Assistant through a Thread border router."
related:
  - docs: /integrations/thread/
    title: Thread integration
  - docs: /connectivity/matter/
    title: About Matter
  - docs: /integrations/homekit_controller/#adding-a-homekit-device-through-thread
    title: Adding an Apple HomeKit device through Thread
---

Thread is a low-power mesh networking standard for IoT devices. The low-power aspect is important for battery-powered smart home devices. However, it's also low-bandwidth, making it ideal for applications that don't send a lot of data, like switches or motion sensors.

Thread uses the same <abbr title="radio frequency">RF</abbr> technology as Zigbee (IEEE 802.15.4) but provides IP connectivity similar to Wi-Fi. Unlike Zigbee, Thread by itself does not allow controlling devices: It is just a communication protocol. To control the Thread devices, a higher-level protocol is required: {% term Matter %} or Apple HomeKit. Thread devices use the IPv6 standard to communicate both inside and outside the mesh network.

This page explains how to recognize and add Thread devices, and which Thread border routers you can use. To turn Home Assistant into a Thread border router, refer to the [Thread](/integrations/thread/) {% term integration %}.

## Logos on Thread-based smart home devices

If you have a Thread-based consumer device, you will typically see a Thread logo on the packaging.

<p class='img'><img width="200" src='/images/integrations/thread/thread-requires-border-router.png'></p>

The "Built on Thread: requires border router" logo means Thread is the only supported network protocol for this device. You cannot use Wi-Fi to communicate with this device.

In addition, you will see a {% term Matter %} or Apple HomeKit logo on the packaging.

{% term Matter %} and Apple HomeKit are smart home protocols. They are responsible for handling the Thread credentials and connecting your Thread device to the Thread network. A smart home protocol is needed to control your device. Both home automation standards are supported natively by Home Assistant.

## Adding a Thread-based device to Home Assistant

How a Thread-based device is added to Home Assistant depends on the home automation standard it uses.

1. If you see the {% term Matter %} logo on your device packaging, follow the procedure [adding a Matter device to Home Assistant](/integrations/matter/#adding-a-matter-device-to-home-assistant).

   <img src="/images/integrations/thread/matter_onpackbadge_logo.png"  width="200">

2. If you see the Apple HomeKit logo on your device packaging, follow the procedure [adding a HomeKit device to Home Assistant](/integrations/homekit_controller/#adding-a-homekit-device-through-thread).

   <img src="/images/integrations/thread/apple-works-with-homekit-logo.png"  width="200">

## About Thread border routers

A Thread border router is a network device that connects a Thread mesh network (consisting of low-power IoT devices) to other IP networks such as Ethernet or Wi-Fi.

The IoT devices use Thread border routers to communicate outside the mesh with any IPv6-capable device. A Thread border router is connected to your network either via Wi-Fi or Ethernet and uses its <abbr title="radio frequency">RF</abbr> radio chip to communicate with the Thread mesh network. The <abbr title="Thread border router">TBR</abbr> routes packets between your local network and the Thread mesh. The border router does not look at the content of these packets, it just forwards them.

The Thread border router does not control devices. Device control is handled by application layer protocols like Matter or Apple HomeKit.

![image](/images/integrations/matter/matter_thread_infographic.png)

Image taken from [the Thread Smart Home Fact Sheet](https://www.threadgroup.org/support#Resources) by the Thread Group. It illustrates the landscape of {% term Matter %}, {% term Thread %}, and Border routers. Instead of Matter, you could also see another protocol here, such as HomeKit.

Unlike other protocols, Thread can use multiple border routers in a single network. This increases wireless coverage and reduces the risk of a single point of failure. Ideal for home automation, with a potentially large number of devices spread over a large area.

### OpenThread border routers

OpenThread is an open source implementation of Thread, originally released by Google. Almost all commercially available Thread border routers are based on the open source implementation. However, the configuration of <abbr title="Thread border routers">TBRs</abbr> is not part of the Thread standard. This means that Google and Apple <abbr title="Thread border routers">TBRs</abbr> implementation setup and configured by their respective ecosystems.

While Home Assistant can *use* any border router, it can *configure* and *control* only OpenThread border routers built with the REST API available in the open source implementation. The **OpenThread Border Router** app is built from this open source OpenThread code and has the REST API enabled.

## List of Thread border router devices

Home Assistant can act as a Thread border router. But it also supports third-party border routers. Often, Thread border routing is only an auxiliary functionality of a smart home device. For example, the Nest Hub (2nd gen) is a smart display, a Google Home controller, and a Chromecast target, but also has a Thread border router included.

Currently, the following <abbr title="Thread border router">TBR</abbr> devices are known to work with Home Assistant.
These border routers may require an iPhone or Android phone for onboarding. What the exact requirements are, depends on the home automation protocol ({% term Matter %} or Apple HomeKit) that your devices are using. Before buying a border router, check the prerequisites in the corresponding procedures:

- [Adding a Matter device to Home Assistant](/integrations/matter/#adding-a-matter-device-to-home-assistant)
- [Adding an Apple HomeKit device through Thread](/integrations/homekit_controller/#adding-a-homekit-device-through-thread)

### Home Assistant

Out of the box, Home Assistant Connect&nbsp;ZBT-1, [Connect&nbsp;ZBT-2](/connect/zbt-2/), and Yellow run Zigbee, not Thread.

- If you have a Home Assistant Yellow, Connect&nbsp;ZBT-1, or a [Connect&nbsp;ZBT-2](/connect/zbt-2/), you can use their Thread radio. Follow these steps to [turn Home Assistant into a Thread border router](/integrations/thread/#turning-home-assistant-into-a-thread-border-router).

### Google

- **Displays**: Nest Hub (2nd gen), Nest Hub Max
- **Wi-Fi routers**: Nest Wifi Pro (Wi-Fi 6E), Nest Wifi
- **TVs**: Google TV Streamer (4K)

### Apple

- **Speakers**: HomePod (2nd generation), HomePod mini
- **TVs**: Apple TV 4K (3rd generation) Wi-Fi + Ethernet, Apple TV 4K (2nd generation)

### Others

There are also other companies that provide devices with border router capability, such as Nanoleaf or Amazon.
