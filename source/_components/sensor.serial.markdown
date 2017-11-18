---
layout: page
title: "Serial Sensor"
description: "Instructions how to integrate data from serial connected sensors into Home Assistant."
date: 2017-10-13 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_release: 0.56
ha_iot_class: "Local Polling"
---

The `serial` sensor platform is using the data provided by a device connected to the serial port of the system where Home Assistant is running. With [`ser2net`](http://ser2net.sourceforge.net/) and [`socat`](http://www.dest-unreach.org/socat/) would it also work for sensors connected to a remote system.

To check what kind of data is arriving at your serial port, use a command-line tool like `minicom` or `picocom` on Linux, on a macOS you can use `screen` or on Windows `putty`. 

```bash
$ sudo minicom -D /dev/ttyACM0
```

To setup a serial sensor to your installation, add the following to your `configuration.yaml` file:

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
  type: int
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the serial line."
  required: false
  type: template 
{% endconfiguration %}


## {% linkable_title `value_template` for Template sensor %}

### {% linkable_title TMP36 %}

{% raw %}
```yaml
"{{ (((states('sensor.serial_sensor') | float * 5 / 1024 ) - 0.5) * 100) | round(1) }}"
```
{% endraw %}

## {% linkable_title Examples %}

### {% linkable_title Arduino %}

For controllers of the Arduino family a possible sketch to read the temperature and the humidity could look like the sample below.

```
#include <ArduinoJson.h>

void setup() {
  Serial.begin(115200);
}

void loop() {
  StaticJsonBuffer<100> jsonBuffer;
  JsonObject& json = prepareResponse(jsonBuffer);
  json.printTo(Serial);
  Serial.println();
  delay(2000);
}

JsonObject& prepareResponse(JsonBuffer& jsonBuffer) {
  JsonObject& root = jsonBuffer.createObject();
  root["temperature"] = analogRead(A0);
  root["humidity"] = analogRead(A1);
  return root;
}
```

### {% linkable_title Digispark USB Development Board %}

This [blog post](/blog/2017/10/23/simple-analog-sensor/) describes the setup with a Digispark USB Development Board.
