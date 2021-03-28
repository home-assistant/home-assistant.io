---
title: Growatt
description: Instructions on how to integrate your Growatt server solar inverter within Home Assistant.
ha_category:
  - Sensor
  - Energy
ha_release: 0.99
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@indykoning'
ha_domain: growatt_server
ha_platforms:
  - sensor
---

This is a sensor to collect information from your Growatt inverters using [Growatt server](https://server.growatt.com/).

This will log into your Growatt account and grab the first "Plant", after which it collects the inverters on this plant and creates sensors for these inverters as well as total sensors.

## Configuration

Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: growatt_server
    username: GROWATT_SERVER_USERNAME
    password: GROWATT_SERVER_PASSWORD
```

{% configuration %}
username:
  description: The username used to log into Growatt server.
  required: true
  type: string
password:
  description: The password used to log into Growatt server.
  required: true
  type: string
plant_id:
  description: The plant id to use in case you have multiple plants on your account.
  required: false
  type: integer
  default: 0
name:
  description: Name of the sensor to use in the frontend.
  required: false
  default: Growatt
  type: string
{% endconfiguration %}

## Example with multiple plants

```yaml
# Example configuration.yaml entry
sensor:
  - platform: growatt_server
    name: "growatt home"
    plant_id: 12345678
    username: username
    password: password
  - platform: growatt_server
    name: "growatt work"
    plant_id: 87654321
    username: username
    password: password
```
