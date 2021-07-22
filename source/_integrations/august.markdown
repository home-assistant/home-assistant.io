---
title: August
description: Instructions on how to integrate your August devices into Home Assistant.
ha_category:
  - Doorbell
  - Binary Sensor
  - Sensor
  - Camera
  - Lock
ha_release: 0.64
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
ha_domain: august
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - camera
  - lock
  - sensor
---

The `august` integration allows you to integrate your [August](https://august.com/) devices in Home Assistant.

There is currently support for the following device types within Home Assistant:

- Doorbell
- Binary Sensor
- Sensor
- Camera
- Lock

<div class='note'>
August Lock 2nd Gen will need either August Connect or Doorbell to connect to Home Assistant.
</div>

{% include integrations/config_flow.md %}

### Binary Sensor

If you have an August Doorbell, once you have enabled the August component, you should see following sensors:

- Doorbell ding sensor
- Doorbell motion sensor
- Doorbell online sensor

If you have an August Smart Lock with DoorSense, once you have enabled the August component, you should see the following sensors:

- Door sensor

### Camera

The `august` camera platform allows you to view the latest camera image (triggered by motion) by your [August](https://august.com/) device in Home Assistant.

### Sensor

If you have an August Doorbell with a battery, once you have enabled the August component, you should see the following sensors:

- Doorbell Battery

If you have an August Smart Lock, once you have enabled the August component, you should see the following sensors:

- Lock Battery
- Lock Operation

If you have an August Keypad, once you have enabled the August component, you should see the following sensors:

- Keypad Battery

### Presence Detection with Lock Operation

Using the lock operation sensors, you can detect when a user operates a lock and is physically present (not remote). The below automation example (added to `automations.yaml`) will trigger when the user named “John Doe” in August locks or unlocks the door from the keypad (if present), via Bluetooth from their phone, or by auto-unlock. The state of the sensor will be the name of the party operating the lock as returned by August.

{% raw %}

```yaml
- id: "1583706446906"
  alias: "joe_doe_front_door_operate"
  description: John Doe locks or unlocks the Front Door
  trigger:
  - entity_id: sensor.front_door_operator
    platform: state
    to: John Doe
  condition:
  - condition: template
    value_template: "{{ not state_attr('sensor.front_door_operator', 'remote') }}"
  action:
  - data: {}
    entity_id: camera.inside
    service: camera.turn_off
```

{% endraw %}
