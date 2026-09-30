---
title: Serial
description: Instructions on how to integrate data from serial connected sensors into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.56
ha_iot_class: Local Polling
ha_codeowners:
  - '@fabaff'
ha_domain: serial
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /integrations/esphome/#about-esphome-remote-adapters-proxies
    title: ESPHome remote adapters (proxies)
  - url: https://esphome.io/projects/?type=serial
    title: ESPHome serial proxy projects
  - url: https://esphome.io/components/serial_proxy/
    title: ESPHome serial proxy component
  - url: https://devices.esphome.io/
    title: ESPHome device database
---

The **Serial** {% term integration %} uses the data provided by a device connected to a serial port that Home Assistant can reach. The port can be on the system where Home Assistant runs, or shared over your network. To connect a device that is not next to your system, the recommended way is a [serial proxy](#serial-proxy), which shares a serial port from an [ESPHome](/integrations/esphome/) device over your network. You can also use [`ser2net`](https://ser2net.sourceforge.net/) or [`socat`](http://www.dest-unreach.org/socat/) to reach a device on a remote system.

To check what kind of data is arriving at your serial port, use a serial terminal program. On Linux, use `minicom` or `picocom`. On macOS, use `screen`. On Windows, use `PuTTY`.

```bash
sudo minicom -D /dev/ttyACM0
```

## Setting up a serial connection in Home Assistant

You can connect a [device connected via serial](#device-connected-via-serial) to the system running Home Assistant, or access it over your network with a serial proxy.

### Prerequisites

- Administrator rights in Home Assistant.
- A serial-connected device, such as an AV receiver, a projector, or a smart meter with a P1 port.
- An {% term integration %} for that device. In the documentation, search the [integrations](/integrations/) for your device or its brand.
  - If no integration is available for your device, you can read the raw data from the port with the [Serial sensor](#serial-sensor) instead.
- A way for Home Assistant to reach the serial port of that device:
  - A [USB-to-serial adapter](#usb-to-serial-adapter), if the device is close enough to cable it to the system that runs Home Assistant.
  - A [serial proxy](#serial-proxy), if it is not. Because the proxy connects over your network, you can place it next to the device. To choose one and prepare it, refer to [Setting up an ESPHome serial proxy](#setting-up-an-esphome-serial-proxy).
  - A [serial device server](#serial-device-server), if you already have one on your network.
- The connection settings that your device expects, such as the [baud rate](#baud-rate). Check the documentation of your device.

### To set up a serial connection in Home Assistant

1. Connect your device to a serial port that Home Assistant can reach.
   - **USB-to-serial adapter**: connect your device to the adapter, then plug the adapter into the system that runs Home Assistant.
   - **Serial proxy**: connect your device to one of the serial ports of the ESPHome device. Then, add the [ESPHome](/integrations/esphome/) {% term integration %}. The serial ports that the ESPHome device shares become available to Home Assistant. If you do not have a serial proxy yet, first refer to [Setting up an ESPHome serial proxy](#setting-up-an-esphome-serial-proxy).
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
   - If you enter a local device path yourself, use the `/dev/serial/by-id/...` link rather than a path like `/dev/ttyUSB0` or `/dev/ttyACM0`, because their mappings can change; in other words, which device appears as `ttyACM0` will vary. To look up the link, select **Port information** for that port in the **Serial** panel, and copy the **Device** field.
   - The list shows the ports that Home Assistant found on your system and on your serial proxies. A port on another system, such as one that you expose with [`ser2net`](https://ser2net.sourceforge.net/) or [`socat`](http://www.dest-unreach.org/socat/), is not found automatically. To use such a port, select **Enter manually** and enter its URL, such as `socket://192.168.1.10:4001`. For more details, refer to [Device path](#device-path).

## Setting up an ESPHome serial proxy

A [serial proxy](#serial-proxy) shares one of its serial ports with Home Assistant over your network. [ESPHome](/integrations/esphome/) is currently the only {% term integration %} that provides serial proxy ports.

### To set up an ESPHome serial proxy

1. Choose a device that runs ESPHome and has a free serial port.
   - Make sure the port type matches the device you want to connect: TTL, <abbr title="Recommended Standard 232">RS-232</abbr>, or <abbr title="Recommended Standard 485">RS-485</abbr>.
   - To find a device, refer to the [ESPHome device database](https://devices.esphome.io/).
   - An ESPHome device can proxy more than serial. For an overview, refer to [ESPHome remote adapters (proxies)](/integrations/esphome/#about-esphome-remote-adapters-proxies).
2. Install the serial proxy configuration on the ESPHome device.
   - For some devices, there is a ready-made project that you can install from your browser. To see what is available, refer to the [ESPHome serial proxy projects](https://esphome.io/projects/?type=serial).
   - If no ready-made project fits your device, add the [serial proxy](https://esphome.io/components/serial_proxy/) component to the configuration of your ESPHome device yourself.
   - The {% term integration %} that uses a port sets the [baud rate](#baud-rate) and the other connection settings when it connects. This means you do not need to change the ESPHome configuration when a device needs a different baud rate.
3. Continue with [Setting up a serial connection in Home Assistant](#setting-up-a-serial-connection-in-home-assistant). There, you connect your device to the proxy, add the [ESPHome](/integrations/esphome/) {% term integration %}, and select the shared port.

## Serial sensor

The **Serial** sensor reads the raw data from a serial port and makes it available as a sensor {% term entity %}. Use it when no integration is available for your device.

To add a serial sensor, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: serial
    serial_port: /dev/ttyACM0
```

{% configuration %}
serial_port:
  description: "The [device path](#device-path) of the serial port to read from. Use the `/dev/serial/by-id/...` link where one is available. Avoid paths like `/dev/ttyUSB0` and `/dev/ttyACM0` because their mappings can change; in other words, which device appears as `ttyACM0` will vary. For a port that Home Assistant reaches over your network, use its URL instead, such as `socket://192.168.1.10:4001`."
  required: true
  type: string
name:
  description: Name of the sensor.
  required: false
  default: Serial Sensor
  type: string
baudrate:
  description: "The [baud rate](#baud-rate) of the serial port, in bits per second."
  required: false
  default: 9600
  type: integer
bytesize:
  description: "Number of data bits. Possible values: `5`, `6`, `7`, `8`."
  required: false
  default: 8
  type: integer
parity:
  description: "Parity checking. Possible values: `N` (none), `E` (even), `O` (odd), `M` (mark), `S` (space)."
  required: false
  default: "N"
  type: string
stopbits:
  description: "Number of stop bits. Possible values: `1`, `1.5`, `2`."
  required: false
  default: 1
  type: float
xonxoff:
  description: Enable software flow control.
  required: false
  default: false
  type: boolean
rtscts:
  description: Enable hardware (RTS/CTS) flow control.
  required: false
  default: false
  type: boolean
dsrdtr:
  description: Enable hardware (DSR/DTR) flow control.
  required: false
  default: false
  type: boolean
value_template:
  description: "Defines a [template](/docs/templating/where-to-use/#processing-incoming-data) to extract a value from the serial line."
  required: false
  type: template
{% endconfiguration %}

## About serial terminology

This section explains some of the key terms that the Home Assistant documentation uses to describe serial connections.

### Serial port

An interface that sends data sequentially, one bit at a time. A serial port can be built into your system, added with a [USB-to-serial adapter](#usb-to-serial-adapter), or shared over your network by a [serial proxy](#serial-proxy) or a [serial device server](#serial-device-server).

### Device path

The identifier that Home Assistant uses to address a serial port. This is the value you enter for the `serial_port` option.

For a serial port exposed via USB, use the `/dev/serial/by-id/...` path when available. This path stays the same as you move the device to another USB port or move your Home Assistant installation to another system. Avoid paths like `/dev/ttyUSB0` and `/dev/ttyACM0` because their mappings can change; in other words, which device appears as `ttyACM0` will vary. If there is no `by-id` link (for example, for a built-in port), use a path like `/dev/ttyS0`. A serial port connected over the network is identified by a URL instead, such as `socket://192.168.1.10:4001` for a port that you expose with `ser2net`. The URL of a port that is shared by a serial proxy starts with `esphome-hass://`.

### Serial proxy

A remote adapter that shares a serial port with Home Assistant over your network. A serial proxy is an [ESPHome](/integrations/esphome/) device that uses the [serial proxy](https://esphome.io/components/serial_proxy/) component to share one or more of its serial ports, so that Home Assistant can use them as if they were connected to your system. When an {% term integration %} asks you to select a serial port, the shared ports are listed next to the ports of your own system. The port that the proxy shares is what you select in Home Assistant.

A serial proxy is the recommended way to connect a [device connected via serial](#device-connected-via-serial) that is not next to the system running Home Assistant. A direct serial cable only reaches so far, and it ties your device to the place where your system is. With a serial proxy, you place the ESPHome device next to your device instead, and your network covers the rest of the distance. Prefer a wired network connection to the proxy.

To choose and prepare a serial proxy, refer to [Setting up an ESPHome serial proxy](#setting-up-an-esphome-serial-proxy).

### USB-to-serial adapter

A device that adds a serial port to your system over USB. Use a USB-to-serial adapter when the [device connected via serial](#device-connected-via-serial) is close enough to cable directly to the system that runs Home Assistant. If it isn't, use a serial proxy instead.

"Serial" is a broad label that can mean RS-232, RS-422, RS-485, or TTL-serial. An adapter for a device with an <abbr title="Recommended Standard 232">RS-232</abbr> port is also sold as a USB-to-RS-232 adapter.

### Serial device server

Another way to put a serial port on your network, without using a serial proxy. This can be a piece of hardware with one or more serial ports, or another computer on your network that shares a port with [`ser2net`](https://ser2net.sourceforge.net/) or [`socat`](http://www.dest-unreach.org/socat/).

Home Assistant uses such a port differently from a serial proxy:

- Home Assistant does not find the port by itself. The port is listed in the **Serial** panel only after an integration that you added in the UI uses it. It is then listed under **Connected**, even while the device server is offline, because Home Assistant cannot check it. A port that is only used by a [Serial sensor](#serial-sensor) in your {% term "`configuration.yaml`" %}, or only by Modbus, is not listed.
- With a `socket://` URL, Home Assistant sends and receives only data. The [baud rate](#baud-rate) and the other connection settings of the integration are not passed on, so set them on the device server itself. If your device server supports <abbr title="Request for Comments">RFC</abbr> 2217, you can use an `rfc2217://` URL instead. Home Assistant then passes these settings on to the device server.

To use the port with an integration, select **Enter manually** during integration setup and enter its URL, such as `socket://192.168.1.10:4001`. For more details, refer to [Device path](#device-path).

### Device connected via serial

The device you want to use with Home Assistant, such as an AV receiver, a projector, or a smart meter with a P1 port. It communicates over a serial connection instead of over your network, so Home Assistant reaches it through a [serial port](#serial-port).

### Baud rate

The speed of a serial connection, in bits per second. Home Assistant and the connected device must use the same baud rate, otherwise the data arrives unreadable. Common values are 9600 and 115200. Check the documentation of your device for the value that it uses.

### RS-232

A standard for serial connections that is common on devices such as receivers, projectors, and TVs. To use a device with an <abbr title="Recommended Standard 232">RS-232</abbr> port, you typically connect it with a USB-to-serial adapter or a serial proxy.

## `value_template` for Template sensor

### TMP36

```yaml
"{{ (((states('sensor.serial_sensor') | float * 5 / 1024 ) - 0.5) * 100) | round(1) }}"
```

## Viewing your serial ports

You can see all the serial ports on your system in one place from the **Serial** configuration panel. This is also where you look up the device path to use in your configuration.

1. Go to **Settings** > **Connectivity** > **Serial**.
   - At the top, a status summary shows how many of your connected ports are in use, and whether any ports are disconnected.
   - The ports are grouped into three lists:
      - **Connected**: ports that are used by at least one integration or {% term app %}.
      - **Available**: ports that are connected, but not used by any integration or {% term app %}.
      - **Disconnected**: ports that an integration or {% term app %} uses, but that are currently not connected.
   - If Home Assistant did not find any serial ports, the panel shows **No serial ports found** instead.
   - To look for ports again, for example after plugging in a USB-to-serial adapter, select **Refresh** {% icon "mdi:refresh" %} in the top right corner.

   {% tip %}
   Serial ports that are only used by serial sensors configured in your {% term "`configuration.yaml`" %}, or only by Modbus, are not tracked as consumers, so they appear in the **Available** rather than the **Connected** section.
   {% endtip %}
2. Under each port, you see what it is used for:
   - Every integration and {% term app %} that uses the port is listed below it. Select one to go to its settings. An integration or app that is not running at the moment is marked as **not running**.
   - **Discovered by**: names the integration that recognized the device on this port and is ready to set it up. Select this line to start the setup.
   - **Used by Modbus**: appears when a Modbus connection uses this port. Select this line to open the **Modbus** page, where you can see the connection and the units on it.
   - **Can be used with**: lists the integrations that support the device on this port. This appears only for a port that is not in use yet.
3. To view more details about a port, select **Port information** {% icon "mdi:information-outline" %} next to it. The **Port information** dialog shows the device path, together with details such as the description, manufacturer, and serial number of the device. This option is available for ports that are currently connected.
   - To use the port with a serial sensor, copy the value of the **Device** field and use it as the `serial_port` option. For example, `/dev/ttyAMA0`.

### About the serial ports panel

The **Serial** panel under **Settings** > **Connectivity** can list the following types of serial ports:

- **USB**: a device that is connected to a USB port, such as a USB-to-serial adapter.
- **Built-in**: a serial port that is part of your system's hardware. For example, the Zigbee radio on [Home Assistant Yellow](/yellow/).
- **Serial proxies**: a serial port that an [ESPHome](/integrations/esphome/) device shares over your network. These ports are listed alongside the ports that are connected to your system, so you can use them the same way.
- **Integration-provided**: a serial port that is addressed with a URL instead of a device path, such as a port on a remote system that you expose with `ser2net` or `socat`.
- **Other**: a serial port that Home Assistant cannot identify any further.

## Examples

### Arduino

For controllers of the Arduino family, a possible sketch to read the temperature and the humidity could look like the sample below.The returned data is in JSON format and can be split into the individual sensor values using a [template](/docs/templating/where-to-use/#processing-incoming-data).

```c
#include <ArduinoJson.h>

void setup() {
  Serial.begin(115200);
}

void loop() {
  StaticJsonDocument<100> jsonBuffer;

  jsonBuffer["temperature"] = analogRead(A0);
  jsonBuffer["humidity"] = analogRead(A1);

  serializeJson(jsonBuffer, Serial);
  Serial.println();
  
  delay(1000);
}
```

### Devices returning multiple sensors as a text string

For devices that return multiple sensors as a concatenated string of values with a delimiter (that is, the returned string is not JSON formatted) you can make several template sensors, all using the same serial response. For example, a stream from the [Sparkfun USB Weather Board](https://www.sparkfun.com/products/retired/9800) includes temperature, humidity and barometric pressure within it returned text string. Sample returned data:

```c
$,24.1,50,12.9,1029.83,0.0,0.00,*
$,24.3,51,12.8,1029.76,0.0,0.00,*
```

To parse this into individual sensors, split using the comma delimiter and then create a template sensor for each item of interest.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: serial
    serial_port: /dev/ttyUSB0
    baudrate: 9600

template:
  sensor:
    - name: Temperature
      unit_of_measurement: "°C"
      state: "{{ states('sensor.serial_sensor').split(',')[1] | float(default=0) }}"
    - name: Humidity
      unit_of_measurement: "%"
      state: "{{ states('sensor.serial_sensor').split(',')[2] | float(default=0) }}"
    - name: Barometer
      unit_of_measurement: "mbar"
      state: "{{ states('sensor.serial_sensor').split(',')[4] | float(default=0) }}"
```

### Digispark USB Development Board

This [blog post](/blog/2017/10/23/simple-analog-sensor/) describes the setup with a Digispark USB Development Board.

## Troubleshooting

{% details "A serial port is missing from the list of ports" %}

### Symptom: the port of your device is not listed

You look for the port that your device is connected to, but it is not listed. This can happen in the **Serial** panel under **Settings** > **Connectivity** > **Serial**, or in the list of ports when you set up an integration.

#### Description

Home Assistant lists a port only while it can find it. A port that no {% term integration %} uses is not listed while it is unavailable. How Home Assistant finds a port depends on how it is connected:

- A port on a [USB-to-serial adapter](#usb-to-serial-adapter) is found when the adapter is plugged in.
- A port that a [serial proxy](#serial-proxy) shares is found only while the ESPHome device is online.
- A port on a [serial device server](#serial-device-server) is never found automatically. When you set up an integration, it is never in the list of ports. In the **Serial** panel, it is listed only after an integration that you added in the UI uses it. If such a port is only used by a [Serial sensor](#serial-sensor) in your {% term "`configuration.yaml`" %}, or only by Modbus, it is not listed at all. This is different from a local port, which is listed under **Available** in that case.

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
- The state of a [Serial sensor](#serial-sensor) stays empty, or shows unreadable characters.

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
