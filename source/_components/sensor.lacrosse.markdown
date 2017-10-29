---
layout: page
title: "LaCrosseSensor"
description: "Instructions how to integrate LaCrosse sensor data received from Jeelink into Home Assistant."
date: 2017-10-29 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_release: 0.56
ha_iot_class: "Local Polling"
---

The `lacrosse` sensor platform is using the data provided by a [`Jeelink`](https://www.digitalsmarties.net/products/jeelink) USB dongle.

Since the sensor change their ID after each powercycle/battery change you can check what sensor IDs are availble by using the command-line tool `pylacrosse` from the pylacrosse package.

```bash
$ sudo pylacrosse -D /dev/ttyUSB0 scan
```

To setup a lacrosse sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: lacrosse
    device: /dev/ttyUSB0
    baud: 57600
    kitchen_humidity:
      friendly_name: Kitchen Humidity
      type: humidity
      id: 72
    kitchen_temperature:
      friendly_name: Kitchen Temperature
      type: temperature
      id: 72
    kitchen_lacrosse_battery:
      friendly_name: Kitchen Sensor Battery
      type: battery
      id: 72
```

{% configuration %}
- **device** (*Optional*): Local serial port where the jeelink is connecte. Defaults to /dev/ttyUSB0.
- **baud** (*Optional*): Ther serial baudrate. Defaults 56700.
{% endconfiguration %}

