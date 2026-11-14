---
description: Instructions on how to integrate data from serial connected sensors into Home Assistant.
ha_release: 0.56
ha_domain: serial
related:
  - docs: /connectivity/serial/
    title: Serial connections in Home Assistant
  - docs: /docs/templating/where-to-use/#processing-incoming-data
    title: Processing incoming data with templates
---

{% warning %}
The **Raw Serial** {% term integration %} reads raw text from a serial port. To get useful values, you usually need to process that text with templates. Most devices with a serial port already have an integration that handles the connection for you. Before you use this integration, search the [integrations](/integrations/) for your device or its brand.
{% endwarning %}

The **Raw Serial** {% term integration %} uses the data provided by a device connected to a serial port that Home Assistant can reach. The port can be on the system where Home Assistant runs, or shared over your network, for example by a serial proxy. To learn how to connect a device to a serial port that Home Assistant can reach, refer to [Serial](/connectivity/serial/).

To check what kind of data is arriving at your serial port, use a serial terminal program. On Linux, use `minicom` or `picocom`. On macOS, use `screen`. On Windows, use `PuTTY`.

```bash
sudo minicom -D /dev/ttyACM0
```

## Raw Serial sensor

The **Raw Serial** sensor reads the raw data from a serial port and makes it available as a sensor {% term entity %}. Use it when no integration is available for your device.

To add a Raw Serial sensor, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: serial
    serial_port: /dev/ttyACM0
```

{% configuration %}
serial_port:
  description: "The [device path](/connectivity/serial/#device-path) of the serial port to read from. Use the `/dev/serial/by-id/...` link where one is available. Avoid paths like `/dev/ttyUSB0` and `/dev/ttyACM0` because their mappings can change; in other words, which device appears as `ttyACM0` will vary. For a port that Home Assistant reaches over your network, use its URL instead, such as `socket://192.168.1.10:4001`."
  required: true
  type: string
name:
  description: Name of the sensor.
  required: false
  default: Serial Sensor
  type: string
baudrate:
  description: "The [baud rate](/connectivity/serial/#baud-rate) of the serial port, in bits per second."
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

## `value_template` for Template sensor

### TMP36

```yaml
"{{ (((states('sensor.serial_sensor') | float * 5 / 1024 ) - 0.5) * 100) | round(1) }}"
```

## Finding the device path of a serial port

To find the device path to use for the `serial_port` option, go to **Settings** > **Connectivity** > **Serial**. Next to your port, select **Port information** {% icon "mdi:information-outline" %} and copy the **Device** field. For more details about this panel, refer to [Viewing your serial ports](/connectivity/serial/#viewing-your-serial-ports).

If a serial port is detected by Home Assistant but is used only by serial sensors configured in your {% term "`configuration.yaml`" %}, or only by Modbus, it is not tracked as having a consumer. As a result, it appears in the **Available** section of the panel rather than the **Connected** section.

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

For problems with the serial connection itself, such as a port that is not listed or a device that does not respond, refer to [Troubleshooting serial connections](/connectivity/serial/#troubleshooting).
