---
title: Yale
description: Instructions on how to integrate your Yale devices into Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Camera
  - Doorbell
  - Event
  - Lock
  - Sensor
ha_release: 2024.9
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
ha_domain: yale
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - button
  - camera
  - diagnostics
  - event
  - lock
  - sensor
ha_integration_type: integration
---

The **Yale** integration allows you to integrate your [Yale](https://www.assaabloy.com/vn/en/solutions/products/yale) devices in Home Assistant.

The login credentials used to authenticate the integration are the same as the ones used in the Yale Home app.

{% include integrations/config_flow.md %}

## Known working devices

| Device                            | Requires [Connect Bridge](https://www.yalehome.com/vn/en/products/yale-smart-door-lock/smart-accessories/yale-connect-wi-fi-bridge) or Doorbell |
| --------------------------------- | ------------------------------------|
| Yale Assure Lock | yes |
| Yale Conexis L1 | yes |
| Yale Conexis L2 | yes |
| Yale Doorman L3 | yes |
| Yale Linus | yes |
| Yale Linus L2 | no |
| Yale Smart Safe | yes |

Other devices not listed above have not been tested and may not function as expected.

There is currently support for the following device types within Home Assistant:

- Doorbell
- Binary sensor
- Button
- Sensor
- Camera
- Lock

{% note %}
Most devices will need either a Yale Connect Bridge or a Doorbell to connect to Home Assistant.
{% endnote %}

## Push updates not available for some entities

While most entities can be updated via the push API, Yale/Yale does not offer a push API for some data, which means these entities will update slower:

- Doorbell ding sensor (Doorman models only)
- Lock Battery sensor
- Lock Operation sensor

## Binary sensor

If you have a Yale Doorbell, once you have enabled the Yale integration, you should see the following sensors:

- Doorbell ding sensor
- Doorbell motion sensor
- Doorbell online sensor

If you have a Yale Smart Lock with DoorSense, once you have enabled the Yale integration, you should see the following sensors:

- Door sensor

## Button

Buttons are created to wake locks from a deep sleep. If your lock is not reporting a status, it may be in a deep sleep, and the button can be used to wake it. Locks are not automatically woken from deep sleep to preserve battery life.

## Event

If you have a Yale doorbell or lock that has a built-in doorbell, once you have enabled the Yale integration, you should see the following event entities:

- Doorbell
- Motion

Not all models include motion sensors and support for locks with built-in doorbells is limited to Yale Doorman models type 7 and 10.

## Camera

The `yale` camera platform allows you to view the latest camera image (triggered by motion) by your [Yale](https://yalehome.com/) device in Home Assistant.

## Sensor

If you have a Yale Doorbell with a battery, once you have enabled the Yale integration, you should see the following sensors:

- Doorbell Battery

If you have a Yale Smart Lock, once you have enabled the Yale integration, you should see the following sensors:

- Lock Battery
- Lock Operation

If you have a Yale Keypad, once you have enabled the Yale integration, you should see the following sensors:

- Keypad Battery

## Integration with Yale Access Bluetooth

Following Assa Abloy, Yale's parent company, purchasing Yale in 2017, most newer devices use the Yale Home branding.

The [Yale Access Bluetooth](/integrations/yalexs_ble) integration provides local control over Bluetooth of many Yale Home locks that use the same system.

For locks that support the Yale Access system, the Yale integration can keep your offline access keys up to date to ensure you can operate your lock over Bluetooth. The following requirements must be met for the offline key updates to work:

- The Yale integration must support the lock.
- The [Yale Access Bluetooth integration](/integrations/yalexs_ble) must support the lock.
- The Bluetooth integration must be active and functional.
- The lock must be discoverable by the [Yale Access Bluetooth integration](/integrations/yalexs_ble).
- The account logged in with the Yale integration must have the offline keys.

### Troubleshooting offline key updates

- If you do not know which account has the offline keys, configure Yale integration with each different Owner account until you find the one that holds the keys. You may need to make a new owner account and grant the account access to your lock to force the keys to synchronize with the cloud service.
- Ensure the lock is in range and discoverable by the [Yale Access Bluetooth integration](/integrations/yalexs_ble).

## Presence detection with lock operation

Using the lock operation sensors, you can detect when a user operates a lock and is physically present (not remote). The below automation example (added to `automations.yaml`) will trigger when the user named “John Doe” in Yale locks or unlocks the door either from the keypad (if present), via Bluetooth from their phone, or by auto-unlock. The state of the sensor will be the name of the party operating the lock as returned by Yale.

{% raw %}

```yaml
- alias: "John Doe locks or unlocks the Front Door"
  triggers:
    - trigger: state
      entity_id: sensor.front_door_operator
      to: "John Doe"
  conditions:
    - condition: template
      value_template: "{{ not state_attr('sensor.front_door_operator', 'remote') }}"
  actions:
    - action: camera.turn_off
      entity_id: camera.inside
```

{% endraw %}
