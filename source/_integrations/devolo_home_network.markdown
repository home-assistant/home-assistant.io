---
title: devolo Home Network
description: Instructions on how to integrate devolo Home Network devices with Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Image
  - Presence detection
  - Sensor
  - Switch
  - Update
ha_release: '2021.12'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@2Fake'
  - '@Shutgun'
ha_domain: devolo_home_network
ha_quality_scale: platinum
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - diagnostics
  - image
  - sensor
  - switch
  - update
ha_zeroconf: true
ha_integration_type: device
---

The **devolo Home Network** {% term integration %} allows you to monitor and control your [devolo](https://www.devolo.global) PLC network. Depending on the device you add to Home Assistant, different use cases are possible. Roughly you can categorize the devices into Wi-Fi and non-Wi-Fi devices. Non-Wi-Fi devices are more or less limited in monitoring your PLC network. The Wi-Fi devices, however, can help with presence detection and remote control of your guest Wi-Fi. For details, please continue reading about the [entities](#entities) and look at the [supported devices](#supported-devolo-devices).

{% include integrations/config_flow.md %}

{% configuration_basic %}
IP address:
  description: "IP address of your devolo Home Network device. This can be found in the devolo Home Network App on the device dashboard."
{% endconfiguration_basic %}

## Entities

Currently, the following entities within Home Assistant are supported.

### Binary sensors

- Device attached to the router
  - Updates every 5 minutes
  - Is disabled by default because it typically rarely changes

### Buttons

- Identify a PLC device by making its LED blink for 2 minutes
- Start pairing on a PLC device
- Restart the device
- Start WPS

### Images

- QR code of your guest Wi-Fi credentials
  - Updates every 15 seconds if changes are detected
  - Is enabled by default

### Presence detection

- Detect presence of devices connected to the main or the guest Wi-Fi
  - Updates every 15 seconds
  - Automatically adds new devices as disabled entities unless disabled via system option

### Sensors

- Number of connected Wi-Fi clients
  - Updates every 15 seconds
  - Is enabled by default
- Number of neighbored Wi-Fi networks
  - Updates every 5 minutes
  - Is disabled by default because it runs quite long
- Number of PLC devices in the same PLC network
  - Updates every 5 minutes
  - Is disabled by default because it typically rarely changes
- PLC PHY rates
  - Updates every 5 minutes
  - PHY rates to/from the device attached to the router are enabled by default. PHY rates between all other devices are disabled by default.
- Last restart of the device
  - Updates every 15 seconds
  - Is disabled by default because it's of lower interest to most users.

### Switch

- Turn on/off guest Wi-Fi
  - Is enabled by default
- Turn on/off the device LEDs
  - Is enabled by default

### Update

- Update the firmware of a device.
  - Is enabled by default but will only give a result if regular checks are enabled on the device.

## Supported devolo Devices

The list of supported devolo devices depends on the device firmware and the device features. The following devices were tested running firmware 5.6.0:

- Magic 2 WiFi 6
- Magic 2 WiFi next
- Magic 2 WiFi 2-1
- Magic 1 WiFi mini
- Magic 1 WiFi 2-1
- WiFi 6 Repeater 5400
- WiFi 6 Repeater 3000
- WiFi Repeater+ ac
- dLAN 1200+ WiFi ac
- dLAN 550+ Wifi
- dLAN 550 WiFi

Since firmware 7.10 also the following device without Wi-Fi can be used as long as the corresponding entities are supported:

- Magic 2 LAN triple
- Magic 2 DinRail
- Magic 2 LAN 1-1
- Magic 1 LAN 1-1
- Gigabridge

## Known limitations

This integration only supports using the API the devolo Home Network App uses. The device website usually offers additional features. However, these features are not available via API and thus cannot be supported until devolo adds them to the API.

## Troubleshooting

### Gigabridge

The devolo Gigabridge is the only device that comes with a default password. However, it seems that in factory default the password works for the device website but not for the API. If you give the device a new password via the website, it is applied to both and the integration starts working. Even using the same password again works.

## Example automations

### Restart PLC device on loss of pairing

PLC networks are sometime flaky. In order to restore a network's state it's sometimes a good idea to reboot the PLC device attached to the router, if the number of PLC devices is lower as expected. If you apply this automation, keep in mind, that devices might be expectedly on standby. In this example, the expected number of devices is 3 and the device connected to the router is called Alexandra.

{% raw %}

```yaml
alias: PLC Feeder Restart
description: "Restart device connected to the router if number of PLC devices is unexpected low"
triggers:
  - trigger: numeric_state
    entity_id:
      - sensor.alexandra_connected_plc_devices
    for:
      hours: 0
      minutes: 10
      seconds: 0
    below: 3
conditions: []
actions:
  - device_id: c38fe153e4a5b560995fd0a0850a5443
    domain: button
    entity_id: 5ccbb089c6208425aec3cb331dd0b716
    type: press
mode: single
```

{% endraw %}

### Notify on data rate drop

Noise on the electric wire can significant disturb PLC data rates. A notification close to a drop can help identify the action that lead to the drop. The following example takes 25% as threshold.

{% raw %}

```yaml
alias: PLC Data rate
description: PLC Data rate dropped more than 25%
triggers:
  - entity_id:
      - sensor.nell_plc_downlink_phy_rate_alexandra
      - sensor.nell_plc_uplink_phy_rate_alexandra
    trigger: state
conditions:
  - condition: template
    value_template: >-
      {{ not(0.75 < (trigger.to_state.state|float /
      trigger.from_state.state|float)) }}
actions:
  - action: notify.mobile_app_pixel_4a
    metadata: {}
    data:
      message: >-
        PLC data rate of {{ trigger.to_state.name }} dropped to {{
        trigger.to_state.state }}
        {{trigger.to_state.attributes.unit_of_measurement}}
      title: PLC data rate dropped
mode: single
```

{% endraw %}

### Enable guest wifi on time basis

You might want to expose your guest wifi only during the day but turn it of at night.

{% raw %}

```yaml
alias: Toggle Guest Wifi
description: Turn Guest Wifi on and off
triggers:
  - trigger: time
    at: "08:00:00"
  - trigger: time
    at: "17:00:00"
conditions: []
actions:
  - type: toggle
    device_id: ec24234d5d2daf35ff57d6162d2801ab
    entity_id: 4c5ef9690593dc3c77079e4045558ac8
    domain: switch
mode: single
```

{% endraw %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
