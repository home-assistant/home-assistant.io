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
---

The **Serial** {% term integration %} uses the data provided by a device connected to a serial port that Home Assistant can reach. The port can be on the system where Home Assistant runs, or shared over your network. To connect a device that is not next to your system, the recommended way is a [serial proxy](#serial-proxy), which shares a serial port from an [ESPHome](/integrations/esphome/) device over your network. You can also use [`ser2net`](https://ser2net.sourceforge.net/) or [`socat`](http://www.dest-unreach.org/socat/) to reach a device on a remote system.

To check what kind of data is arriving at your serial port, use a serial terminal program. On Linux, use `minicom` or `picocom`. On macOS, use `screen`. On Windows, use `PuTTY`.

```bash
sudo minicom -D /dev/ttyACM0
```

## Configuration

To set up a serial sensor to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: serial
    serial_port: /dev/ttyACM0
```

{% configuration %}
serial_port:
  description: "The [device path](#device-path) of the serial port to read from, such as `/dev/ttyACM0`. For a port that Home Assistant reaches over your network, use its URL instead, such as `socket://192.168.1.10:4001`."
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

An interface that sends data sequentially, one bit at a time. A serial port can be built into your system, added with a USB-to-serial adapter, or shared over your network by a serial proxy.

### Device path

The identifier that Home Assistant uses to address a serial port. This is the value you enter for the `serial_port` option.

For a serial port exposed via USB, use the `/dev/serial/by-id/...` path when available. This path stays the same as you move the device to another USB port or move your Home Assistant installation to another system. Avoid paths like `/dev/ttyUSB0` and `/dev/ttyACM0` because their mappings can change; in other words, which device appears as `ttyACM0` will vary. If there is no `by-id` link (for example, for a built-in port), use a path like `/dev/ttyS0`. A serial port connected over the network is identified by a URL instead, such as `socket://192.168.1.10:4001` for a port that you expose with `ser2net`. The URL of a port that is shared by a serial proxy starts with `esphome-hass://`.

### Serial proxy

The recommended way to connect a [device connected via serial](#serial-connected-device) to Home Assistant. A serial proxy is an [ESPHome](/integrations/esphome/) device that uses the [serial proxy](https://esphome.io/components/serial_proxy/) component to share one of its serial ports over your network, so that Home Assistant can use that port as if it were connected to your system. The serial port that it shares is what you select in Home Assistant.

Because the proxy connects over the network, you can place it close to the device connected via serial, no matter where it is located. Prefer a wired network connection to the proxy.

### USB-to-serial adapter

A device that adds a serial port to your system over USB. Use a USB-to-serial adapter when the [device connected via serial](#serial-connected-device) is close enough to cable directly to the system that runs Home Assistant. If it isn't, use a serial proxy instead.

"Serial" is a broad label that can mean RS-232, RS-422, RS-485, or TTL-serial. An adapter for a device with an <abbr title="Recommended Standard 232">RS-232</abbr> port is also sold as a USB-to-RS-232 adapter.

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
