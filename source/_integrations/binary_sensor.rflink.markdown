---
title: "RFLink Binary Sensor"
description: "Instructions on how to integrate RFLink binary sensors into Home Assistant."
logo: rflink.png
ha_category:
  - Binary Sensor
ha_iot_class: Local Push
ha_release: 0.81
ha_domain: rflink
---

The `rflink` integration supports devices that use [RFLink gateway firmware](https://www.rflink.nl/download.php), for example the [Nodo RFLink Gateway](https://www.nodo-shop.nl/en/21-rflink-). RFLink gateway is an Arduino firmware that allows two-way communication with a multitude of RF wireless devices using cheap hardware (Arduino + transceiver).

First, you have to set up your [RFLink hub](/integrations/rflink/).

The RFLink integration does not know the difference between a `binary_sensor`, a `switch` and a `light`. Therefore all switchable devices are automatically added as `light` by default.

RFLink binary_sensor/switch/light ID's are composed of: protocol, id, switch/channel. For example: `newkaku_0000c6c2_1`.

Once the ID of a binary sensor is known, it can be used to configure it as a binary sensor type in Home Assistant, for example, to hide it or configure a nice name.

Configuring a device as a binary sensor:

```yaml
# Example configuration.yaml entry
binary_sensor:
   - platform: rflink
     devices:
       pt2262_00174754_0: {}
```

{% configuration %}
devices:
  description: A list of binary sensors.
  required: false
  type: list
  keys:
    rflink_ids:
      description: RFLink ID of the device
      required: true
      type: map
      keys:
        name:
          description: Name for the device.
          required: false
          default: RFLink ID
          type: string
        aliases:
          description: Alternative RFLink ID's this device is known by.
          required: false
          type: list
        device_class:
          description: Sets the [class of the device](/integrations/binary_sensor/), changing the device state and icon that is displayed on the frontend.
          required: false
          type: string
        off_delay:
          description: For sensors that only sends 'On' state updates, this variable sets a delay after which the sensor state will be updated back to 'Off'.
          required: false
          type: integer
        force_update:
          description: Sends update events even if the value has not changed. Useful for sensors that only sends `On`.
          required: false
          type: boolean
          default: false
{% endconfiguration %}

### Sensor state

Initially, the state of a binary sensor is unknown. When a sensor update is received, the state is known and will be shown in the frontend.

### Device support

See [device support](/integrations/rflink/#device-support)

### Additional configuration examples

Multiple sensors with custom name and device class and set off_delay

```yaml
# Example configuration.yaml entry
binary_sensor:
   - platform: rflink
     devices:
       pt2262_00174754_0:
         name: PIR Entrance
         device_class: motion
         off_delay: 5
       pt2262_00174758_0:
         name: PIR Living Room
         device_class: motion
         off_delay: 5
```
