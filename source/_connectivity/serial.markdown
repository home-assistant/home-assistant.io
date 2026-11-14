---
title: "Serial"
connectivity: serial
description: "Connect devices with a serial port, like AV receivers, projectors, and smart meters, to Home Assistant."
related:
  - docs: /integrations/serial/
    title: Raw Serial integration
  - docs: /integrations/esphome/#about-esphome-remote-adapters-proxies
    title: ESPHome remote adapters (proxies)
  - url: https://esphome.io/projects/?type=serial
    title: ESPHome serial proxy projects
  - url: https://esphome.io/components/serial_proxy/
    title: ESPHome serial proxy component
---

Many devices have a serial port that you can use to control them or read their data. Examples are AV receivers, projectors, TVs, smart meters with a P1 port, and solar inverters. Home Assistant talks to these devices over a serial connection.

You do not set up serial by itself. Instead, you connect your device to a [serial port](#serial-port) that Home Assistant can reach, and then add the {% term integration %} for your device. When the integration asks which serial port to use, you select that port.

This page explains the ways to connect a serial device, which hardware you can use, and how to set up and check the connection.

## Ways to connect a serial device

Home Assistant can reach the serial port of your device in three ways:

- **Serial proxy**: an [ESPHome](/integrations/esphome/) device that you place next to your device. It shares its serial port with Home Assistant over your network. This is the recommended way when your device is not next to the system that runs Home Assistant. For details, refer to [serial proxy](#serial-proxy).
- **USB-to-serial adapter**: an adapter that you plug into the system that runs Home Assistant. Use it when your device is close enough to cable it to that system. For details, refer to [USB-to-serial adapter](#usb-to-serial-adapter).
- **Serial device server**: a device or computer that already shares a serial port on your network. For details, refer to [serial device server](#serial-device-server).

Whichever way you choose, the port type must match the port of your device: TTL, <abbr title="Recommended Standard 232">RS-232</abbr>, or <abbr title="Recommended Standard 485">RS-485</abbr>. Check the documentation of your device.

## Hardware for serial connections

### Serial proxies

Any ESPHome device with a free serial port of the right type can be a serial proxy.

- For some devices, there is a ready-made serial proxy project that you can install from your browser. To see what is available, refer to the [ESPHome serial proxy projects](https://esphome.io/projects/?type=serial).
- To find other devices that run ESPHome, refer to the [ESPHome device database](https://devices.esphome.io/).

An ESPHome device can proxy more than serial, for example Bluetooth. For an overview, refer to [ESPHome remote adapters (proxies)](/integrations/esphome/#about-esphome-remote-adapters-proxies).

### USB-to-serial adapters

USB-to-serial adapters are sold by the type of serial port they add, for example as a USB-to-RS-232 or a USB-to-RS-485 adapter. Choose one that matches the port of your device.

## Integrations that use serial

The following integrations can connect to a device over a serial port:

{% include connectivity/integrations.html slug="serial" %}

If no integration supports your device, you can read the raw data from its serial port with the [Raw Serial](/integrations/serial/) integration instead.

## Setting up a serial connection in Home Assistant

To use a device with a serial port, connect it to a serial port that Home Assistant can reach. Then, add the integration for your device and select that port.

Prerequisites:

- A device with a serial port, such as an AV receiver, a projector, or a smart meter with a P1 port.
- An {% term integration %} for that device. In the documentation, search the [integrations](/integrations/) for your device or its brand.
  - If no integration is available for your device, you can read the raw data from the port with the [Raw Serial](/integrations/serial/) integration instead.
- A way for Home Assistant to reach the serial port of that device: a [serial proxy](#serial-proxy), a [USB-to-serial adapter](#usb-to-serial-adapter), or a [serial device server](#serial-device-server). For help choosing, refer to [Ways to connect a serial device](#ways-to-connect-a-serial-device).
  - If you use a serial proxy, first set it up. Refer to [Setting up an ESPHome serial proxy](#setting-up-an-esphome-serial-proxy).
- The connection settings that your device expects, such as the [baud rate](#baud-rate). Check the documentation of your device.

1. Connect your device to a serial port that Home Assistant can reach.
   - **Serial proxy**: connect your device to one of the serial ports of the ESPHome device. Then, add the [ESPHome](/integrations/esphome/) {% term integration %}. The serial ports that the ESPHome device shares become available to Home Assistant.
   - **USB-to-serial adapter**: connect your device to the adapter, then plug the adapter into the system that runs Home Assistant.
   - **Serial device server**: connect your device to one of the serial ports of the device server. On the device server, share that port on a TCP port, and set the [baud rate](#baud-rate) and the other connection settings that your device expects. The URL of the port is made of the IP address of the device server and that TCP port, such as `socket://192.168.1.10:4001`. You need this URL in step 3. The port is not listed in the **Serial** panel before then, so you can skip step 2.
2. Optional: check if Home Assistant sees the port. Go to **Settings** > **Connectivity** > **Serial**.
   - A port is listed as soon as its adapter or serial proxy is available, whether or not your device is wired to it yet.
   - A port that a serial proxy shares is listed only while the ESPHome device is online.
   - If your port is not listed, select **Refresh** {% icon "mdi:refresh" %} in the top right corner.
   - For more details, refer to [Viewing your serial ports](#viewing-your-serial-ports).
3. Add the {% term integration %} for your device, such as [Denon RS-232](/integrations/denon_rs232/).
   - To add the integration, follow the steps in the integration documentation.
   - When you are asked which serial port to use, select the port that your device is connected to. Local ports and serial proxy ports are listed together, grouped by type. Ports that suit the integration you are setting up are listed first, under **Recommended for** the integration. When you select a port, Home Assistant stores the most stable identifier that is available for it.
   - A port that is shared by a serial proxy is listed under **Serial proxies**, together with the name of the ESPHome device that shares it.
   - If you enter a local device path yourself, use the `/dev/serial/by-id/...` link rather than a path like `/dev/ttyUSB0` or `/dev/ttyACM0`, because these paths can change. To look up the link, select **Port information** for that port in the **Serial** panel, and copy the **Device** field.
   - The list shows the ports that Home Assistant found on your system and on your serial proxies. A port on a serial device server is not found automatically. To use such a port, select **Enter manually** and enter its URL, such as `socket://192.168.1.10:4001`. For more details, refer to [Device path](#device-path).

## Setting up an ESPHome serial proxy

A [serial proxy](#serial-proxy) shares one of its serial ports with Home Assistant over your network. [ESPHome](/integrations/esphome/) is currently the only {% term integration %} that provides serial proxy ports.

1. Choose a device that runs ESPHome and has a free serial port.
   - Make sure the port type matches the device you want to connect: TTL, <abbr title="Recommended Standard 232">RS-232</abbr>, or <abbr title="Recommended Standard 485">RS-485</abbr>.
   - For devices to choose from, refer to [Serial proxies](#serial-proxies).
2. Install the serial proxy configuration on the ESPHome device.
   - For some devices, there is a ready-made project that you can install from your browser. To see what is available, refer to the [ESPHome serial proxy projects](https://esphome.io/projects/?type=serial).
   - If no ready-made project fits your device, add the [serial proxy](https://esphome.io/components/serial_proxy/) component to the configuration of your ESPHome device yourself.
   - The {% term integration %} that uses a port sets the [baud rate](#baud-rate) and the other connection settings when it connects. This means you do not need to change the ESPHome configuration when a device needs a different baud rate.
3. Continue with [Setting up a serial connection in Home Assistant](#setting-up-a-serial-connection-in-home-assistant). There, you connect your device to the proxy, add the [ESPHome](/integrations/esphome/) {% term integration %}, and select the shared port.

## Viewing your serial ports

You can see the serial ports that Home Assistant detects in one place, in the **Serial** panel. This is also where you look up the device path of a port, for example, when an integration asks for it during setup.

1. Go to **Settings** > **Connectivity** > **Serial**.
   - At the top, a status summary shows how many of your connected ports are in use, and whether any ports are disconnected.
   - The ports are grouped into three lists:
      - **Connected**: ports that are used by at least one integration or {% term app %}.
      - **Available**: ports that are connected, but not used by any integration or {% term app %}.
      - **Disconnected**: ports that an integration or {% term app %} uses, but that are currently not connected.
   - If Home Assistant did not find any serial ports, the panel shows **No serial ports found** instead.
   - To look for ports again, for example after plugging in a USB-to-serial adapter, select **Refresh** {% icon "mdi:refresh" %} in the top right corner.

   {% tip %}
   Serial ports used only by YAML-only integrations, such as the [Raw Serial](/integrations/serial/) sensor, or only by Modbus, are not tracked as having a consumer. If Home Assistant detects such a local port, it appears in the **Available** section rather than the **Connected** section. A network port that Home Assistant cannot discover, such as a `socket://` port, used only by such an integration does not appear in the panel at all.
   {% endtip %}
2. Under each port, you see what it is used for:
   - Every {% term app %} and every integration set up in the UI that uses the port is listed below it. Select one to go to its settings. An integration or app that is not running at the moment is marked as **not running**.
   - **Discovered by**: names the integration that recognized the device on this port and is ready to set it up. Select this line to start the setup.
   - **Used by Modbus**: appears when a Modbus connection uses this port. Select this line to open the **Modbus** page, where you can see the connection and the units on it.
   - **Can be used with**: lists the integrations that support the device on this port. This appears only for a port that is not in use yet.
3. To view more details about a port, select **Port information** {% icon "mdi:information-outline" %} next to it. The **Port information** dialog shows the device path, together with details such as the description, manufacturer, and serial number of the device. This option is available for ports that are currently connected.
   - To use the port with an integration that asks for a device path, such as [Zigbee Home Automation](/integrations/zha/) or the [Raw Serial](/integrations/serial/) sensor, copy the value of the **Device** field. For example, `/dev/ttyAMA0`.

### Port types in the Serial panel

The **Serial** panel groups the ports by type:

- **USB**: a device that is connected to a USB port, such as a USB-to-serial adapter.
- **Built-in**: a serial port that is part of your system's hardware. For example, the Zigbee radio on [Home Assistant Yellow](/yellow/).
- **Serial proxies**: a serial port that an [ESPHome](/integrations/esphome/) device shares over your network. These ports are listed alongside the ports that are connected to your system, so you can use them the same way. For more information, refer to [serial proxy](#serial-proxy).
- **Integration-provided**: a serial port that is addressed with a URL instead of a device path, such as a port on a remote system that you expose with `ser2net` or `socat`.
- **Other**: a serial port that Home Assistant cannot identify any further.

## Serial terminology

This section explains the key terms that the Home Assistant documentation uses to describe serial connections.

### Serial port

An interface that sends data sequentially, one bit at a time. A serial port can be built into your system, added with a [USB-to-serial adapter](#usb-to-serial-adapter), or shared over your network by a [serial proxy](#serial-proxy) or a [serial device server](#serial-device-server).

"Serial" is a broad label that can mean RS-232, RS-422, RS-485, or TTL-serial.

### Device path

The identifier that Home Assistant uses to address a serial port. You select or enter it when an integration asks which serial port to use.

For a serial port exposed via USB, use the `/dev/serial/by-id/...` path when available. This path stays the same when you move the adapter to another USB port, or move your Home Assistant installation to another system. Avoid paths like `/dev/ttyUSB0` and `/dev/ttyACM0`, because they are assigned when the adapter is detected and can change. If there is no `by-id` link, for example, for a built-in port, use a path like `/dev/ttyS0`.

A serial port connected over the network is identified by a URL instead, such as `socket://192.168.1.10:4001` for a port that you expose with `ser2net`. The URL of a port that is shared by a serial proxy starts with `esphome-hass://`.

### Serial proxy

A remote adapter that shares a serial port with Home Assistant over your network. A serial proxy is an [ESPHome](/integrations/esphome/) device that uses the [serial proxy](https://esphome.io/components/serial_proxy/) component to share one or more of its serial ports, so that Home Assistant can use them as if they were connected to your system. When an {% term integration %} asks you to select a serial port, the shared ports are listed next to the ports of your own system.

A serial proxy is the recommended way to connect a [device connected via serial](#device-connected-via-serial) that is not next to the system running Home Assistant. A direct serial cable only reaches so far, and it ties your device to the place where your system is. With a serial proxy, you place the ESPHome device next to your device instead, and your network covers the rest of the distance. Prefer a wired network connection to the proxy.

To choose and prepare a serial proxy, refer to [Setting up an ESPHome serial proxy](#setting-up-an-esphome-serial-proxy).

### USB-to-serial adapter

A device that adds a serial port to your system over USB. Use a USB-to-serial adapter when the [device connected via serial](#device-connected-via-serial) is close enough to cable directly to the system that runs Home Assistant. If it isn't, use a serial proxy instead.

### Serial device server

Another way to put a serial port on your network, without using a serial proxy. This can be a piece of hardware with one or more serial ports, or another computer on your network that shares a port with [`ser2net`](https://ser2net.sourceforge.net/) or [`socat`](http://www.dest-unreach.org/socat/).

Home Assistant uses such a port differently from a serial proxy:

- Home Assistant does not find the port by itself. The port is listed in the **Serial** panel only after an integration that you added in the UI uses it. It is then listed under **Connected**, even while the device server is offline, because Home Assistant cannot check it. A port that is only used by a [Raw Serial](/integrations/serial/) sensor in your {% term "`configuration.yaml`" %}, or only by Modbus, is not listed.
- With a `socket://` URL, Home Assistant sends and receives only data. The [baud rate](#baud-rate) and the other connection settings of the integration are not passed on, so set them on the device server itself. If your device server supports <abbr title="Request for Comments">RFC</abbr> 2217, you can use an `rfc2217://` URL instead. Home Assistant then passes these settings on to the device server.

To use the port with an integration, select **Enter manually** during integration setup and enter its URL, such as `socket://192.168.1.10:4001`. For more details, refer to [Device path](#device-path).

### Device connected via serial

The device you want to use with Home Assistant, such as an AV receiver, a projector, or a smart meter with a P1 port. It communicates over a serial connection instead of over your network, so Home Assistant reaches it through a [serial port](#serial-port).

### Baud rate

The speed of a serial connection, in bits per second. Home Assistant and the connected device must use the same baud rate, otherwise the data arrives unreadable. Common values are 9600 and 115200. Check the documentation of your device for the value that it uses.

### RS-232

A standard for serial connections that is common on devices such as receivers, projectors, and TVs. To use a device with an <abbr title="Recommended Standard 232">RS-232</abbr> port, you typically connect it with a USB-to-serial adapter or a serial proxy.

## Troubleshooting

{% details "A serial port is missing from the list of ports" %}

### Symptom: the port of your device is not listed

You look for the port that your device is connected to, but it is not listed. This can happen in the **Serial** panel under **Settings** > **Connectivity** > **Serial**, or in the list of ports when you set up an integration.

#### Description

Home Assistant lists a port only while it can find it. A port that no {% term integration %} uses is not listed while it is unavailable. How Home Assistant finds a port depends on how it is connected:

- A port on a [USB-to-serial adapter](#usb-to-serial-adapter) is found when the adapter is plugged in.
- A port that a [serial proxy](#serial-proxy) shares is found only while the ESPHome device is online.
- A port on a [serial device server](#serial-device-server) is never found automatically. When you set up an integration, it is never in the list of ports. In the **Serial** panel, it is listed only after an integration that you added in the UI uses it. If such a port is only used by a [Raw Serial](/integrations/serial/) sensor in your {% term "`configuration.yaml`" %}, or only by Modbus, it is not listed at all. This is different from a local port, which is listed under **Available** in that case.

#### Resolution

1. To look for ports again, select **Refresh** {% icon "mdi:refresh" %} in the top right corner of the **Serial** panel.
2. If you use a USB-to-serial adapter, make sure it is plugged in. Then, select **Refresh** again.
3. If you use a serial proxy, make sure the ESPHome device is powered on and connected to your network.
4. If you use a serial device server, you do not need the port to be listed. Select **Enter manually** during integration setup and enter the URL of the port, such as `socket://192.168.1.10:4001`.

{% enddetails %}

{% details "An integration that uses a serial device server fails to set up" %}

### Symptom: the integration fails to set up, but the port is listed under Connected

An integration uses a port on a [serial device server](#serial-device-server). What you see depends on the integration. For example:

- Under {% my integrations title="**Settings** > **Devices & services**" %}, the integration shows **Failed setup, will retry**.
- The entities of the integration are unavailable.

At the same time, the **Serial** panel lists the port under **Connected**.

#### Description

Home Assistant cannot check whether a serial device server is reachable. As long as an integration uses the port, Home Assistant lists it under **Connected**, even while the device server is offline. When the device server is offline or cannot be reached, the integration cannot connect to your device.

#### Resolution

1. Make sure the device server is powered on and connected to your network.
2. Make sure the URL that the integration uses matches the IP address and TCP port of the device server.
3. Make sure your device is wired to the serial port that the device server shares on that TCP port.

{% enddetails %}

{% details "Your device does not respond through a serial device server" %}

### Symptom: the device does not respond, or its data is unreadable

The serial device server is reachable, but your device does not seem to respond. What you see depends on the integration. For example:

- Setting up the integration fails with an error, such as **Failed to connect**, or a message that your device did not respond.
- The state of a [Raw Serial](/integrations/serial/) sensor stays empty, or shows unreadable characters.

#### Description

With a `socket://` URL, Home Assistant sends and receives only data. The [baud rate](#baud-rate) and the other connection settings that you set in the integration are not passed on to the device server. If the device server uses different settings than your device, the data does not come through correctly.

#### Resolution

1. Check the documentation of your device for the connection settings it expects, such as the baud rate.
2. On the device server, set the port to the same settings.
3. If your device server supports <abbr title="Request for Comments">RFC</abbr> 2217, you can use an `rfc2217://` URL instead, such as `rfc2217://192.168.1.10:4001`. Home Assistant then passes the connection settings of the integration on to the device server.

{% enddetails %}

{% details "An integration stops working after a restart or after moving the adapter" %}

### Symptom: the integration fails to set up after a restart or after moving the adapter

An integration worked before, but after you restarted your system or plugged the USB-to-serial adapter into another USB port, it stopped working. What you see depends on the integration. For example:

- Under {% my integrations title="**Settings** > **Devices & services**" %}, the integration shows **Failed setup, will retry**.
- The entities of the integration are unavailable.

At the same time, the **Serial** panel lists the port that the integration uses under **Disconnected**.

#### Description

A path like `/dev/ttyUSB0` or `/dev/ttyACM0` is assigned when the adapter is detected, so it can change. After a restart, or when you connect adapters in a different order, your adapter can get another path, and the integration can no longer find it under the old one. The `/dev/serial/by-id/...` link of an adapter stays the same. For more details, refer to [Device path](#device-path).

#### Resolution

1. Go to **Settings** > **Connectivity** > **Serial**, and find the port of your adapter under **Available**.
2. Change the serial port of the integration to that port. How you change it depends on the integration. Refer to the documentation of the integration.
   - Select the port from the list rather than entering a path like `/dev/ttyUSB0`. Home Assistant then stores the most stable identifier that is available for the port.
   - If you enter the path yourself, use the `/dev/serial/by-id/...` link. To look it up, select **Port information** {% icon "mdi:information-outline" %} for that port in the **Serial** panel, and copy the **Device** field.

{% enddetails %}
