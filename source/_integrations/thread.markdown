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
related:
  - docs: /yellow/
    title: Home Assistant Yellow - hub
  - docs: /skyconnect/
    title: Home Assistant Connect ZBT-1 - Zigbee/Thread USB stick
  - docs: /integrations/matter/
    title: Matter
  - docs: /integrations/homekit_controller/
    title: HomeKit
  - docs: /integrations/matter/#adding-a-matter-device-to-home-assistant
    title: Adding a Matter device to Home Assistant
  - docs: /integrations/homekit_controller/#adding-a-homekit-device-through-thread
    title: Adding an Apple HomeKit device through Thread
  - url: https://connectzbt1.home-assistant.io/procedures/enable-thread/
    title: Enabling Thread on Connect ZBT-1
  - url: https://yellow.home-assistant.io/procedures/enable-thread/
    title: Enabling Thread on Yellow
---

The Thread integration helps you track the different Thread networks in your home and store the Thread network credentials (similar to a Wi-Fi password). The Thread integration in Home Assistant is currently still a work in progress.

You do not need to install this integration. The Thread integration shows up automatically when Home Assistant detects a [border router](#about-thread-border-routers).

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

## About Thread

This section introduces the terms *Thread* and *border router* and lists border routers that are supported by Home Assistant.

### A communication protocol for IoT devices

Thread is a low-power mesh networking standard for IoT devices. The low-power aspect is important for battery-powered smart home devices. However, it's also low-bandwidth, making it ideal for applications that don't send a lot of data, like switches or motion sensors.

Thread uses the same <abbr title="radio frequency">RF</abbr> technology as Zigbee (IEEE 802.15.4) but provides IP connectivity similar to Wi-Fi. Unlike Zigbee, Thread by itself does not allow controlling devices: It is just a communication protocol. To control the Thread devices, a higher-level protocol is required: {% term Matter %} or Apple HomeKit. Thread devices use the IPv6 standard to communicate both inside and outside the mesh network.

### About Thread border routers

The devices use Thread border routers to communicate outside the mesh with any IPv6-capable device. A Thread border router is connected to your network either via Wi-Fi or Ethernet and uses its <abbr title="radio frequency">RF</abbr> radio to communicate with the Thread mesh network. The <abbr title="Thread border router">TBR</abbr> routes packets between your local network and the Thread mesh. It does not look at the content of these packets, it just forwards them.

![image](/images/integrations/matter/matter_thread_infographic.png)

Image taken from [the Thread Smart Home Fact Sheet](https://www.threadgroup.org/support#Resources) by the Thread Group. It illustrates the landscape of {% term Matter %}, {% term Thread %}, and Border routers. Instead of Matter, you could also see another protocol here, such as HomeKit.

Unlike other protocols, Thread can use multiple border routers in a single network. This increases wireless coverage and reduces the risk of a single point of failure. Ideal for home automation, with a potentially large number of devices spread over a large area.

#### OpenThread border routers

OpenThread is an open source implementation of Thread, originally released by Google. Almost all commercially available Thread border routers are based on the open source implementation. However, the configuration of <abbr title="Thread border routers">TBRs</abbr> is not part of the Thread standard. This means that Google and Apple <abbr title="Thread border routers">TBRs</abbr> implementation setup and configured by their respective ecosystems.

While Home Assistant can *use* any border router, it can *configure* and *control* only OpenThread border routers built with the REST API available in the open source implementation. The OpenThread Border Router add-on (as well as the OpenThread Border Router bundled in the experimental Silicon Labs Multiprotocol add-on) are built from this open source OpenThread code and have the REST API enabled.

### List of Thread border router devices

Home Assistant can act as a Thread border router. But it also supports third-party border routers. Often, Thread border routing is only an auxiliary functionality of a smart home device. For example, the Nest Hub (2nd gen) is a smart display, a Google Home controller, and a Chromecast target, but also has a Thread border router included.

Currently, the following <abbr title="Thread border router">TBR</abbr> devices are known to work with Home Assistant.
These border routers may require an iPhone or Android phone for onboarding. What the exact requirements are, depends on the home automation protocol ({% term Matter %} or Apple HomeKit) that your devices are using. Before buying a border router, check the prerequisites in the corresponding procedures:

- [Adding a Matter device to Home Assistant](/integrations/matter/#adding-a-matter-device-to-home-assistant)
- [Adding an Apple HomeKit device through Thread](/integrations/homekit_controller/#adding-a-homekit-device-through-thread)

#### Home Assistant

Out of the box, Home Assistant Connect&nbsp;ZBT-1 and Yellow run Zigbee, not Thread. Currently, enabling Thread involves manual steps. The integration of the Home Assistant based Thread border router with Matter is work-in-progress.

- If you have a Home Assistant Yellow or Connect&nbsp;ZBT-1, you can use their Thread radio. Follow these steps to [turn Home Assistant into a Thread border router](#turning-home-assistant-into-a-thread-border-router).

#### Google

- **Displays**: Nest Hub (2nd gen), Nest Hub Max
- **Wi-Fi routers**: Nest Wifi Pro (Wi-Fi 6E), Nest Wifi

#### Apple

- **Speakers**: HomePod (2nd generation), HomePod mini
- **TVs**: Apple TV 4K (3rd generation) Wi-Fi + Ethernet, Apple TV 4K (2nd generation)

#### Others

There are also other companies that provide devices with border router capability, such as Nanoleaf or Amazon.

## Turning Home Assistant into a Thread border router

Follow these steps if you want to turn Home Assistant into a Thread border router using the Thread radio of Yellow, Connect&nbsp;ZBT-1, or another compatible radio.

Find out if you already have Thread networks:

- Go to {% my integrations title="**Settings** > **Devices & services**" %}.
- If you do not see a **Thread** integration, add it.
- Then, select **Configure** and check if you see any Thread networks on the overview page.
- Case 1: If you do not have any Thread networks yet, follow [Case 1: Make Home Assistant your first Thread network](#case-1-making-home-assistant-your-first-thread-network)
- Case 2: If you have existing networks, follow [Case 2: Create a HA border router when there is an existing network](#case-2-creating-a-ha-border-router-when-there-is-an-existing-network)

### Case 1: Making Home Assistant your first Thread network

Follow these steps if you want to turn Home Assistant into a Thread border router using the Thread radio of Yellow, Connect&nbsp;ZBT-1, or another compatible radio and you do not have any third-party Thread networks present yet. This will automatically create a new Thread network with the name `ha-thread-xxxx`. The last for digits are a network-specific identifier (PAN ID).

#### Prerequisites

- Device with a Thread-capable radio, such as Home Assistant Yellow, Connect&nbsp;ZBT-1, or another compatible radio
- Android phone or iPhone
- No third-party Thread networks present

#### To make Home Assistant your first Thread network

1. To enable Thread support on your Home Assistant Yellow or Connect&nbsp;ZBT-1, you need to install the **OpenThread Border Router** add-on. Follow the corresponding procedure:
   - [Enable Thread on Home Assistant Yellow](https://yellow.home-assistant.io/procedures/enable-thread/).
   - [Enable Thread on Home Assistant Connect ZBT-1](https://connectzbt1.home-assistant.io/procedures/enable-thread/).

2. Make sure the Home Assistant Thread network is defined as preferred network.
   - This should happen automatically, but check to be sure.
   - Go to {% my integrations title="**Settings** > **Devices & services**" %}, select the **Thread** integration.
   - Then, select **Configure**.
   - You should see the Home Assistant logo under **Preferred network**.

     ![image](/images/integrations/thread/thread-preferred-network-ha-only.png)

3. Before you can add Matter-based Thread devices, your phone needs to know the credentials of your newly created Thread network.
   - To share the credentials with your Android phone, open the Home Assistant Companion app.
     - In the Companion app, go to **Settings** > **Companion app** > **Troubleshooting**, then select **Sync Thread credentials**.
     - Follow the instructions on screen.
     - **Result**: You will see a confirmation stating that Thread credentials from Home Assistant have been added to this device.
   - To share the credentials with your iPhone, open the Home Assistant Companion app.
     - Go to {% my integrations title="**Settings** > **Devices & services**" %}, select the **Thread** integration.
     - Select **Configure** under **Services**.
     - At the bottom of the preferred network box, select **Send credentials to phone**.
4. To add Matter-based Thread devices, follow the steps on [Adding a matter device to Home Assistant](/integrations/matter/#adding-a-matter-device-to-home-assistant).

### Case 2: Creating a HA border router when there is an existing network

Follow these steps if you want to turn Home Assistant into a Thread border router using the Thread radio of Yellow, Connect&nbsp;ZBT-1, or another compatible radio but you already have third-party Thread networks present. These steps will join the Home Assistant Thread border router with the existing Thread network.

![image](/images/integrations/thread/thread-no-preferred-network-but-third-party-present.png)

If you have both Google and Apple Thread networks present, decide which one you would like add the Home Assistant border router to.

#### Prerequisites

- Device with a Thread-capable radio, such as Home Assistant Yellow, Connect&nbsp;ZBT-1, or another compatible radio
- Third-party Thread network listed
- Android phone if you have a Google Thread network, iPhone if you have an Apple Thread network

#### To create a HA border router when there is an existing network

Note: the steps and images here show the process with a Google Thread network. But the process is very similar if you have an Apple Thread network with an iPhone.

1. Make sure you have an Android/iPhone phone and your phone is in the same Wi-Fi network as your Google border router.
2. First you need to import the Thread credentials of your Google thread network.
   - In the companion app, go to {% my integrations title="**Settings** > **Devices & services**" %}, select the **Thread** integration.
   - On Android, select **Configure** and **Import Credentials**.
     - **Result**: You should see a notification that the credentials are imported.
   - On iOS, select **Send credentials to Home Assistant**.
3. Refresh the screen.
   - You should now see an <img width="30px" src='/images/integrations/thread/information-outline.png'> icon, indicating that Home Assistant now has the credentials of that network.
4. Select **Make preferred network**.
   - **Result**: The selected network now shows as the preferred network.

   ![image](/images/integrations/thread/thread-google-br.png)

5. To enable Thread support on your Home Assistant Yellow or Connect ZBT-1, you need to install the **OpenThread Border Router** add-on. Follow the corresponding procedure:
   - [Enable Thread on Home Assistant Yellow](https://yellow.home-assistant.io/procedures/enable-thread/).
   - [Enable Thread on Home Assistant Connect ZBT-1](https://connectzbt1.home-assistant.io/procedures/enable-thread/).
   - **Result**: The network now shows as the preferred network, joined with the third-party network.

   ![image](/images/integrations/thread/thread-ha-preferred.png)
   - 🎉 You successfully created a Home Assistant Thread network and joined it with a pre-existing third-party network.

## Understanding the Thread configuration page

This section explains why you might see multiple networks on the Thread configuration page and what this means for your network.

### About different Thread networks

Today, each vendor forms their own Thread network when you start using their products. This means you can end up having a Home Assistant, an Apple, and a Google Thread network in your home. The Thread configuration panel lists all Thread border routers and groups them by the Thread network.

<p class='img'><img width="400" src='/images/integrations/thread/thread-no-3rd-party-credentials.png'>
The Thread configuration page shows three vendor-specific Thread networks.
</p>

These are all separate networks using different credentials. This means devices can't roam between the Thread networks.

The <img width="30px" src='/images/integrations/thread/information-outline.png'> icon indicates that Home Assistant has the credentials for that network. In this case, only the credentials of the `home assistant` network are known.

Home Assistant discovers all Thread border routers in your network because they send mDNS/DNS-SD announcements. These local announcements don't contain the network credentials. That's why you see the network there, but not the credentials.

#### About the preferred network

The intention of the **Preferred network** in Home Assistant is that it will be used as the default network when adding Thread⁻based devices.

{% note %}
The **preferred network** function isn't completely implemented yet. In particular, when adding {% term Matter %} devices through the companion apps, the preferred network of the mobile device is being used.
{% endnote %}

#### Making a network your preferred network

You can only set a Thread network as preferred if the credentials are known.

1. To import Thread credentials, you need your Android and iOS companion app.
2. On your companion app, navigate to the Thread configuration page.
   - You should see an **Import credentials** button in the lower right corner.

   <img width="400" src='/images/integrations/thread/thread-import-credentials.png'>

   - Importing the credentials allows a Google- or Apple-created Thread network to be the preferred network of Home Assistant.
   <img width="400" src='/images/integrations/thread/thread-preferred-network.png'>

### Combining Thread networks

In the current implementation, having multiple <abbr title="Thread border routers">TBRs</abbr> from different vendors results in separate networks using different credentials. This prevents devices from roaming between the Thread networks. In theory, it would be better to join all Thread networks into a single network to increase the size of the mesh network. A dense mesh network should lead to better <abbr title="radio frequency">RF</abbr> coverage and better link quality, which lowers transmission latencies, making communication faster.
