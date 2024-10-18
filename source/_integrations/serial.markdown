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

The `serial` sensor {% term integration %} is using the data provided by a device connected to the serial port of the system where Home Assistant is running. With [`ser2net`](https://ser2net.sourceforge.net/) and [`socat`](http://www.dest-unreach.org/socat/) would it also work for sensors connected to a remote system.

To check what kind of data is arriving at your serial port, use a command-line tool like `minicom` or `picocom` on Linux, on a macOS you can use `screen` or on Windows `putty`.

```bash
sudo minicom -D /dev/ttyACM0
```

## Configuration

To setup a serial sensor to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: serial
    serial_port: /dev/ttyACM0
```

{% configuration %}
serial_port:
  description: Local serial port where the sensor is connected and access is granted.
  required: true
  type: string
name:
  description: Friendly name to use for the frontend. Default to "Serial sensor".
  required: false
  type: string
baudrate:
  description: Baudrate of the serial port.
  required: false
  default: 9600 Bps
  type: integer
bytesize:
  description: "Number of data bits. Possible values: `5=FIVEBITS`, `6=SIXBITS`, `7=SEVENBITS`, `8=EIGHTBITS`."
  required: false
  default: 8
  type: integer
parity:
  description: "Enable parity checking. Possible values: `N=PARITY_NONE`, `E=PARITY_EVEN`, `O=PARITY_ODD`, `M=PARITY_MARK`, `S=PARITY_SPACE`."
  required: false
  default: "N"
  type: string
stopbits:
  description: "Number of stop bits. Possible values: `1=STOPBITS_ONE`, `1.5=STOPBITS_ONE_POINT_FIVE`, `2=STOPBITS_TWO`."
  required: false
  default: 1
  type: float
xonxoff: 
  description: Enable software flow control.
  required: false
  default: False
  type: boolean
rtscts:
  description: Enable hardware (RTS/CTS) flow control.
  required: false
  default: False
  type: boolean
dsrdtr:
  description: Enable hardware (DSR/DTR) flow control.
  required: false
  default: False
  type: boolean
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the serial line."
  required: false
  type: template
{% endconfiguration %}

## `value_template` for Template sensor

### TMP36

{% raw %}

```yaml
"{{ (((states('sensor.serial_sensor') | float * 5 / 1024 ) - 0.5) * 100) | round(1) }}"
```

{% endraw %}

## Examples

### Arduino

For controllers of the Arduino family, a possible sketch to read the temperature and the humidity could look like the sample below.The returned data is in JSON format and can be split into the individual sensor values using a [template](/docs/configuration/templating/#processing-incoming-data).

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

For devices that return multiple sensors as a concatenated string of values with a delimiter, (i.e., the returned string is not JSON formatted) you can make several template sensors, all using the same serial response. For example, a stream from the [Sparkfun USB Weather Board](https://www.sparkfun.com/products/retired/9800) includes temperature, humidity and barometric pressure within it returned text string. Sample returned data:

```c
$,24.1,50,12.9,1029.83,0.0,0.00,*
$,24.3,51,12.8,1029.76,0.0,0.00,*
```

To parse this into individual sensors, split using the comma delimiter and then create a template sensor for each item of interest.

{% raw %}

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

{% endraw %}

### Digispark USB Development Board

This [blog post](/blog/2017/10/23/simple-analog-sensor/) describes the setup with a Digispark USB Development Board.
