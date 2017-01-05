---
layout: page
title: "Mi Flora plant sensor"
description: "Instructions on how to integrate MiFlora BLE plant sensor with Home Assistant."
date: 2016-09-19 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: miflora.png
ha_category: DIY
ha_release: 0.29
ha_iot_class: "Local Polling"
---

The [Mi Flora plant sensor](https://www.open-homeautomation.com/2016/08/23/reverse-engineering-the-mi-plant-sensor/) is a small Bluetooth Low Energy device that monitors not only the moisture, but also light, temperature and conductivity. As only a single BLE device can be polled at the same time, the library implements locking to make sure this is the case.

To use your Mi Flora plant sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: miflora
    mac: "xx:xx:xx:xx:xx:xx"
    monitored_conditions:
      - temperature
```

- **mac** (*Required*): The MAC address of your sensor. You can find this be running `hcitool lescan` from command line.
- **monitored_conditions** array (*Required*): The paramaters that should be monitored.
  - **moisture**: Moisture in the soil.
  - **light**: Brightness at the sensor's location.
  - **temperature**: Temperature at the sensor's location.
  - **conductivity**: Conductivity in the soil.
  - **battery**: Battery details.
- **name** (*Optional*): The name displayed in the frontend.
- **force_update** (*Optional*): Sends update events even if the value hasn't changed.
- **median** (*Optional*): Sometimes the sensor measurements show spikes. Using this parameter, the poller will report the median of the last 3 (you can also use larger values) measurements. This filters out single spikes. Median: 5 will also filter double spikes. If you never have problems with spikes, `median: 1` will work fine. 
- **timeout** (*Optional*): Define the timeout value in seconds when polling (defaults to 10 if not defined)
- **retries** (*Optional*): Define the number of retries when polling (defaults to 2 if not defined)
- **cache** (*Optional*): Define cache expiration value in seconds (defaults to 1200 if not defined)

Note that by default the sensor is only polled once every 15 minutes. This means with the `median: 3` setting will take as least 30 minutes before the sensor will report a value after a Home Assistant restart. As the values usually change very slowly, this isn't a big problem. 
Reducing polling intervals will have a negative effect on the battery life.

A full configuration example could looks the one below:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: miflora
    mac: "xx:xx:xx:xx:xx:xx"
    name: Flower 1
    force_update: false
    median: 3
    monitored_conditions:
      - moisture
      - light
      - temperature
      - conductivity
      - battery
```




