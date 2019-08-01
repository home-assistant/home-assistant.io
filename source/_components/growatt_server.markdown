---
title: "Growatt server PV Inverter Sensor"
description: "Instructions on how to integrate your growatt server solar inverter within Home Assistant."
logo: growatt.png
ha_category:
  - Sensor
  - Energy
ha_release: 0.97
ha_iot_class: Cloud Polling
---

This is a sensor to collect information from your growatt inverters using growatt server.

This will log into your growatt account and grab the first "Plant" after which it collects the inverters on this plant and creates sensors for these inverters as well as a total sensor.

In case of two inverters this will create 3 sensors. One for inverter 1, one for inverter 2 and one for the total of these. The state of these sensors all contain the current power delivered to the net in `W`. There is a lot more information available in the attributes of the inverter sensors like individual power of the different inputs of the inverters (if applicable, otherwise it'll return 0)

## Configuration

Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: growatt
    username: <growatt server username>
    password: <growatt server password>
```

{% configuration %}
username:
  description: The username used to log into growatt server.
  required: true
  type: string
password:
  description: The password used to log into growatt server.
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

```yaml
# Example configuration.yaml entry for growatt_server platform
sensor:
  - platform: growatt home
    name: 'plant 1'
    plant_id: 12345678
    username: username
    password: password
  - platform: growatt
    name: growatt work
    plant_id: 87654321
    username: username
    password: password
```
