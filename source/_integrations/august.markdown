---
title: August
description: Instructions on how to integrate your August devices into Home Assistant.
ha_category:
  - Binary Sensor
  - Button
  - Camera
  - Doorbell
  - Lock
  - Sensor
ha_release: 0.64
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
ha_domain: august
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - button
  - camera
  - diagnostics
  - lock
  - sensor
ha_integration_type: integration
---

The `august` integration allows you to integrate your [August](https://august.com/) and some Yale Access devices in Home Assistant.

{% include integrations/config_flow.md %}

## Known Working Devices

| Device                            | Requires [Connect Bridge](https://august.com/products/august-connect/) or Doorbell |
| --------------------------------- | ------------------------------------|
| August Wi-Fi Smart Lock (Gen 4) | no |
| August Smart Lock Pro (Gen 3) | yes |
| August Smart Lock (Gen 2) | yes |
| August Smart Lock (Gen 1) | no |
| August Doorbell Cam (Gen 1, Gen2) | no |
| August View | no |
| Yale Assure Lock | yes |
| Yale Conexis L1 | yes |
| Yale Linus | yes |

There is currently support for the following device types within Home Assistant:

- Doorbell
- Binary Sensor
- Button
- Sensor
- Camera
- Lock

<div class='note'>
Most devices will need either August Connect Bridge or Doorbell to connect to Home Assistant.
</div>

## Known Issues with battery reporting 

The August Wi-Fi Smart Lock (Gen 4) uses different battery technology (lithium-ion) than the other locks. The battery charge value reported by the lock detail API has frequently been reported as incorrect for these models.
		
Other August locks expect to be powered by AA alkaline (non-rechargeable) batteries. Rechargeable batteries in these locks will result in incorrect reporting of battery charge.

## Known Unsupported Devices

- The Yale Doorman L3

Other devices not listed above have not been tested and may not function as expected.

## Binary Sensor

If you have an August Doorbell, once you have enabled the August component, you should see following sensors:

- Doorbell ding sensor
- Doorbell motion sensor
- Doorbell online sensor

If you have an August Smart Lock with DoorSense, once you have enabled the August component, you should see the following sensors:

- Door sensor

## Button

Buttons are created to wake locks from a deep sleep. If your lock is not reporting a status, it may be in a deep sleep, and the button can be used to wake it. Locks are not automatically woken from deep sleep to preserve battery life.

## Camera

The `august` camera platform allows you to view the latest camera image (triggered by motion) by your [August](https://august.com/) device in Home Assistant.

## Sensor

If you have an August Doorbell with a battery, once you have enabled the August component, you should see the following sensors:

- Doorbell Battery

If you have an August Smart Lock, once you have enabled the August component, you should see the following sensors:

- Lock Battery
- Lock Operation

If you have an August Keypad, once you have enabled the August component, you should see the following sensors:

- Keypad Battery

## Presence Detection with Lock Operation

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
