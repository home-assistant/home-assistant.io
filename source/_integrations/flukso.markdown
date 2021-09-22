---
title: Flukso
description: Instructions on how to integrate your Flukso energy monitor with Home Assistant.
ha_category:
  - Binary Sensor
  - Sensor
  - Energy
  - Hub
ha_release: '2021.10'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@bertouttier'
  - '@icarus75'
ha_domain: flukso
ha_platforms:
  - binary_sensor
  - sensor
---

This integration allows you to add [Flukso](https://flukso.net/) energy monitoring devices over the local MQTT link.

This page describes how to integrate your Flukso energy monitoring devices with Home Assistant. Installation instructions for your Flukso device itself can be found on the [official website](https://flukso.net/installation).

## Requirements

- MQTT broker and the [MQTT integration](/integrations/mqtt/) set up in Home Assistant.
- MQTT bridge set up between you Flukso MQTT broker and your Home Assistant MQTT Broker.

## Supported Features

Both Flukso sensors and Kube sensors are supported. Multiple Flukso's are supported.

- Sensors that are [tmpo](https://www.flukso.net/files/presentations/flukso.20140425.pdf) enabled will have the `total_increasing` state class.
- Your Flukso and it sensors will be automatically discovered when you set up the bridge connection between your HA MQTT broker and your Flukso's MQTT broker.
- The integration will create a sensor for each Flukso/Kube sensor topic that it discovers on MQTT.

{% include integrations/config_flow.md %}

If using the [Mosquitto Broker add-on for Home Assistant](https://github.com/home-assistant/addons/blob/master/mosquitto/DOCS.md), you can add the following sample bridge configuration in your `customize` folder to set up a bridge connection to your Flukso MQTT broker:

`/share/mosquitto/acl.conf`:
```ini
acl_file /share/mosquitto/accesscontrollist
```

`/share/mosquitto/accesscontrollist.conf`:
```ini
topic readwrite #
```

`/share/mosquitto/flukso01.conf`:
```ini
connection flukso01
address <flukso ip>:1883
remote_clientid flukso01bridge
cleansession true
restart_timeout 5
topic # in 0
```
