---
title: "Modbus"
connectivity: modbus
description: "Modbus is a protocol for exchanging data and commands over a network or serial connection. It is common in solar inverters, heat pumps, and ventilation units."
related:
  - docs: /integrations/modbus/
    title: Modbus integration
  - docs: /connectivity/serial/
    title: About serial connections
---

[Modbus](https://www.modbus.org/) is a communication protocol that devices use to share data and accept commands. It started in industrial equipment, and is now common in devices such as solar inverters, heat pumps, and ventilation units. Modbus works over a wired serial connection, usually <abbr title="Recommended Standard 485">RS-485</abbr>, or over your network. Home Assistant can read data from these devices and control them.

You do not set up Modbus by itself. Instead, you add the {% term integration %} for your device, and enter how Home Assistant reaches its Modbus interface. To find out if an integration is available for your device, search for the brand of your device when you add an integration in {% my integrations title="**Settings** > **Devices & services**" %}.

This page explains the ways to connect a Modbus device, and how to set up and check the connection.

## Ways to connect a Modbus device

Home Assistant can reach the Modbus interface of a device over the network, or over a serial connection.

### Over the network (Modbus TCP)

The device, or a [Modbus gateway](#modbus-gateway) that translates to Modbus TCP, is on your network. Home Assistant connects to its network address.

{% warning %}
Modbus TCP does not authenticate clients, and it does not encrypt traffic. Another device that can reach the Modbus TCP port can read data and write values the device accepts, without going through Home Assistant. Keep your Modbus TCP devices on a trusted network segment.
{% endwarning %}

### Over a serial connection (Modbus RTU)

The <abbr title="Recommended Standard 485">RS-485</abbr> wires of the device are connected to a serial port that Home Assistant can reach:

- [Home Assistant Connect AUX-2](/connect/aux-2/), with a supported USB-to-RS-485 adapter in its USB port. The adapter is shared with Home Assistant as a serial proxy port.
- Another [serial proxy](/connectivity/serial/#serial-proxies) with an RS-485 port.
- A [USB-to-RS-485 adapter](/connectivity/serial/#usb-to-serial-adapters) that is connected to your Home Assistant system.

A [serial device server](/connectivity/serial/#serial-device-servers) also works, but it is not recommended. For details about these ways to connect a serial port, refer to [Serial](/connectivity/serial/).

## Setting up a device integration that uses Modbus

Prerequisites:

- You have administrator rights.
- You have a device with a Modbus interface.
- Home Assistant can reach the Modbus interface of the device, over the network or over a serial connection. For the ways to connect, refer to [Ways to connect a Modbus device](#ways-to-connect-a-modbus-device).

1. If needed, turn on the Modbus interface of your device.
   - Many devices have Modbus TCP turned off by default. The documentation or the app of your device describes how to turn Modbus TCP on. Some integration pages describe the steps too, for example, [Fronius](/integrations/fronius/#modbus-tcp).
2. Add the integration for your device, such as [SolarEdge Modbus](/integrations/solaredge_modbus/) or [STIEBEL ELTRON](/integrations/stiebel_eltron/).
   - To add the integration, follow the steps in the integration documentation.
   - During setup, enter how Home Assistant reaches the device:
     - For a network connection, enter the host and the port. Use the port from the integration documentation. Many devices use `502`, but some use another port.
     - For a serial connection, select the [serial port](/connectivity/serial/#serial-port), and enter the [baud rate](/connectivity/serial/#baud-rate).
       - The port that an ESPHome serial proxy shares is listed with the serial ports.
       - For a serial device server, select **Enter manually** and enter its URL. With a `socket://` URL, the baud rate isn't passed on, so set it on the serial device server itself.
   - Some integrations also ask for the unit ID of the device. The unit ID identifies the device on the Modbus connection. Some integrations call it **Device ID**, and device manuals often use the older term slave ID. Most devices use `1`. Unless several devices share the connection, you can usually keep `1`. In YAML, it's `device_address`.
   - Result: The entities of your device appear in Home Assistant.
3. Optional: To check the connection, go to {% my config_modbus title="**Settings** > **Connectivity** > **Modbus**" %}.
   - For details, refer to [Viewing your Modbus connections](#viewing-your-modbus-connections).

## Viewing your Modbus connections

You can see the connections to your Modbus devices in one place from the **Modbus** configuration panel. The panel lists the Modbus hubs that you configured in YAML, and the integrations that connect through the Modbus integration. For example, [SolarEdge Modbus](/integrations/solaredge_modbus/) and [STIEBEL ELTRON](/integrations/stiebel_eltron/) are listed. Integrations that manage their own Modbus connection, such as [Nibe Heat Pump](/integrations/nibe_heatpump/) and [NeoPool](/integrations/neopool/), don't appear in the panel.

Prerequisites:

- You have administrator rights.
- You have set up an integration that connects through the Modbus integration, or a Modbus hub in YAML. Otherwise, **Modbus** doesn't appear under **Connectivity**.

1. Go to {% my config_modbus title="**Settings** > **Connectivity** > **Modbus**" %}.
   - At the top, a summary shows how many units (Modbus devices) are on how many connections.
   - If no connection has been opened yet, the panel shows **No Modbus connections**.
   - To load the list again, select **Refresh** {% icon "mdi:refresh" %} in the top right corner.
2. Under **Connections**, you can see one item for each connection. A connection is the network address of a device or of a Modbus gateway, or a serial port, such as one with an RS-485 bus. A connection can reach several units, which are the Modbus devices behind it. The integrations in the panel that use the same address or port share one connection.
3. Still under **Connections**, for each connection item, you can see:
   - The network address, or the [device path](/connectivity/serial/#device-path) of the serial port.
   - The type of connection: **TCP**, **UDP**, or **Serial**. A hub that you configured in YAML is also marked **Configured in YAML**. Such a hub keeps a connection of its own, so the same device can be listed twice.
   - Whether the connection is open right now:
     - A network connection shows **Connected** or **Not connected**. A serial port shows **Open** or **Closed**.
     - **Connected** or **Open**: The connection is open right now. For a serial port, **Open** only means that the port is open, not that the device answers.
     - **Not connected** or **Closed**: The connection is not open right now. The connection opens again the next time an integration reads from the device. A device can also close a connection that isn't used.
   - The integrations that use the connection, with the unit IDs they use. Select an integration to go to its settings. A hub that you configured in YAML is shown by its name instead, and can't be selected.
4. For a serial connection, to see the port in the **Serial** panel, select **View this port under Serial**.

## Modbus terminology

[Modbus](https://www.modbus.org/) is a communication protocol for industrial devices, such as controllers in heating, ventilation, and solar systems. Device manuals and integration pages use the following terms. Some manuals use older or different names for the same thing. These are listed with each term.

### Ways to connect

#### Modbus <abbr title="Transmission Control Protocol">TCP</abbr>

Modbus over your network. Most devices with a network interface use port `502`.

#### Modbus <abbr title="Remote Terminal Unit">RTU</abbr>

Modbus over a serial connection, usually an <abbr title="Recommended Standard 485">RS-485</abbr> bus. The data is sent in binary form.

#### Modbus RTU over TCP

Modbus RTU data that is sent over your network unchanged. A serial device server, or a Modbus gateway in transparent mode, uses it. Some manuals call it TCP-RTU.

#### RS-485

An electrical standard for the physical, wired connection that most Modbus RTU devices use. Several devices can share one RS-485 bus.

### Devices between Home Assistant and your device

#### Modbus gateway

A device that connects a serial bus, such as RS-485, to your network. Some manuals call it a bridge or a converter. A Modbus gateway works in one of two ways:

- It translates between Modbus TCP and Modbus RTU. Home Assistant then talks Modbus TCP to the gateway. Enter its host and port.
- It forwards the Modbus RTU data unchanged, often called transparent mode. Home Assistant then sends Modbus RTU over TCP to it. As the serial port, select **Enter manually** and enter its `socket://` URL.
  - This only works with integrations that offer a serial connection, such as Flexit and SolarEdge Modbus. With an integration that only connects over the network, such as Fronius, KACO Modbus, or STIEBEL ELTRON, set the gateway to translate. A Modbus hub in YAML works with both modes.

Many gateways can do both. Set up the connection to match the mode that's set on the gateway.

A device with its own network interface, such as an inverter that offers Modbus TCP, isn't a gateway. Home Assistant connects to it directly.

#### Serial device server

A device, or software such as `ser2net` or `socat`, that makes a serial port available over your network and passes the data on unchanged. For Modbus, it works like a gateway that forwards the data unchanged, with the same limit: integrations can only use it if they offer a serial connection. For details, refer to [Serial device server](/connectivity/serial/#serial-device-server) on the Serial page.

#### USB-to-RS-485 adapter

An adapter that connects an RS-485 bus to a USB port of your Home Assistant system. For details, refer to [USB-to-serial adapter](/connectivity/serial/#usb-to-serial-adapter) on the Serial page.

#### ESPHome serial proxy

An ESPHome device with an RS-485 port. It makes the bus available to Home Assistant over your network. For details, refer to [Serial proxies](/connectivity/serial/#serial-proxies) on the Serial page.

### Devices on a connection

#### Connection

The network address of a device or a Modbus gateway, or a serial port. One connection can reach several units. In the **Modbus** panel, integrations that use the same address or port share one connection.

#### Unit

A Modbus device behind a connection.

#### Unit ID

The number that identifies a unit on a connection. Most devices use `1`.

On a serial bus, and behind a Modbus gateway, `0` is the broadcast address. A write to `0` reaches all units, but no unit replies, so you can't read with `0`. A device with its own network interface can use `0` in a different way. For details, check its manual.

Device manuals often use the older term slave ID, or device address. Some integrations call it **Device ID**.
