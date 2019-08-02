---
title: "Growatt server PV Inverter Sensor"
description: "Instructions on how to integrate your Growatt server solar inverter within Home Assistant."
logo: growatt.png
ha_category:
  - Sensor
  - Energy
ha_release: 0.98
ha_iot_class: Cloud Polling
---

This is a sensor to collect information from your Growatt inverters using [Growatt server](https://server.growatt.com/).

This will log into your Growatt account and grab the first "Plant", after which it collects the inverters on this plant and creates sensors for these inverters as well as a total sensor.

In the case of two inverters, it will create 3 sensors. One for inverter 1, one for inverter 2 and one for the total of these. The state of these sensors all contain the current power delivered to the net in `W`. There is a lot more information available in the attributes of the inverter sensors like individual power of the different inputs of the inverters (if applicable, otherwise it'll return 0).

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
    name: 'growatt home'
    plant_id: 12345678
    username: username
    password: password
  - platform: growatt_server
    name: 'growatt work'
    plant_id: 87654321
    username: username
    password: password
```
