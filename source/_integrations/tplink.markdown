---
title: TP-Link Smart Home
description: Instructions on integrating TP-Link Smart Home Devices to Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Fan
  - Hub
  - Light
  - Number
  - Select
  - Sensor
  - Switch
ha_release: 0.89
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@rytilahti'
  - '@bdraco'
  - '@sdb9696'
ha_domain: tplink
ha_platforms:
  - binary_sensor
  - button
  - climate
  - diagnostics
  - fan
  - light
  - number
  - select
  - sensor
  - switch
ha_dhcp: true
ha_quality_scale: platinum
ha_integration_type: integration
---

The `tplink` integration allows you to control your [TP-Link Kasa Smart Home Devices](https://www.tp-link.com/kasa-smart/) and [TP-Link Tapo Devices](https://www.tapo.com/) such as plugs, power strips, wall switches and bulbs.

You need to provision your newly purchased device to connect to your network before it can be added via the integration. This can be done either by using [kasa command-line tool](https://python-kasa.readthedocs.io/en/latest/cli.html#provisioning) or by adding it to the official Kasa or Tapo app before trying to add them to Home Assistant.

If your device is a newer Kasa or Tapo device it will require your TP-Link cloud username and password to authenticate for local access.
If you have an older device that does not currently require authentication, you may consider disabling automatic firmware updates to keep it that way.

{% include integrations/config_flow.md %}

## Supported Devices

See [Supported Devices in python-kasa](https://python-kasa.readthedocs.io/en/stable/SUPPORTED.html) for an up to date list that includes hardware and firmware versions.

Devices not listed below may work but if you encounter issues submit a bug report to [python-kasa](https://github.com/python-kasa/python-kasa).

### Supported Kasa devices

- **Plugs**: EP10, EP25[^1], HS100[^2], HS103, HS105, HS110, KP100, KP105, KP115, KP125, KP125M[^1], KP401
- **Power Strips**: EP40, HS107, HS300, KP200, KP303, KP400
- **Wall Switches**: ES20M, HS200, HS210, HS220, KP405, KS200M, KS205[^1], KS220M, KS225[^1], KS230, KS240[^1]
- **Bulbs**: KL110, KL120, KL125, KL130, KL135, KL50, KL60, LB110
- **Light Strips**: KL400L5, KL420L5, KL430
- **Hubs**: KH100[^1]
- **Hub-Connected Devices[^3]**: KE100[^1]

### Supported Tapo[^1] devices

- **Plugs**: P100, P110, P115, P125M, P135, TP15
- **Power Strips**: P300, TP25
- **Wall Switches**: S500D, S505, S505D
- **Bulbs**: L510B, L510E, L530E
- **Light Strips**: L900-10, L900-5, L920-5, L930-5
- **Hubs**: H100
- **Hub-Connected Devices[^3]**: T110, T300, T310, T315

[^1]: Requires authentication  
[^2]: Newer versions require authentication  
[^3]: Devices may work across TAPO/KASA branded hubs

## Unavailable entities

Some entities might be showing as Unavailable if they have been removed from the integration.

### Total consumption

This entity is only reported by older kasa devices.
Currently, Tapo devices and newer Kasa devices do not report total consumption, although briefly during 2024.6, they incorrectly reported today's consumption as "total consumption." You can safely delete this entity if it is reported as unavailable on a newer Kasa or Tapo device.

### Update

This entity has been removed from the integration due to stability issues, calling the TPLink cloud API to check for updates. It will be replaced in a future release with a new Update entity, but if you have an Unavailable entity ID starting with `binary_sensor.` and ending with `update`, you can safely delete it.

## Light effects

If light effects are supported by a device they can be selected from the bottom of the light card.
They are currently not supported on Kasa bulbs.

### Random Effect - Action `tplink.random_effect`

Light strips allow setting a random effect.

| Data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | The entity_id of the light strip to set the effect on |
| `init_states` | Initial HSV sequence |
| `backgrounds` | List of HSV sequences (Max 16) |
| `segments` | List of segments (0 for all) |
| `brightness` | Initial brightness |
| `duration` | Duration |
| `transition` | Transition |
| `fadeoff` | Fade off |
| `hue_range` | Range of hue |
| `saturation_range` | Range of saturation |
| `brightness_range` | Range of brightness |
| `transition_range` | Range of transition |
| `random_seed` | Random seed |

```yaml
#Example action
action: tplink.random_effect
target:
  entity_id:
    - light.strip
data:
  init_states: 199,99,96
  backgrounds:
    - - 199
      - 89
      - 50
    - - 160
      - 50
      - 50
    - - 180
      - 100
      - 50
  segments: 0, 2, 4, 6, 8
  brightness: 90
  transition: 2000
  fadeoff: 2000
  hue_range: 340, 360
  saturation_range: 40, 95
  brightness_range: 90, 100
  transition_range: 2000, 6000
  random_seed: 80
```

### Sequence Effect - Action `tplink.sequence_effect`

Light strips allow setting a sequence effect.

| Data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | The entity_id of the light strip to set the effect on |
| `sequence` | List of HSV sequences (Max 16) |
| `segments` | List of segments (0 for all) |
| `brightness` | Initial brightness |
| `duration` | Duration |
| `repeat_times` | Repetitions (0 for continuous) |
| `transition` | Transition |
| `spread` | Speed of spread |
| `direction` | Direction |

```yaml
#Example action
action: tplink.sequence_effect
target:
  entity_id:
    - light.strip
data:
  sequence:
    - - 340
      - 20
      - 50
    - - 20
      - 50
      - 50
    - - 0
      - 100
      - 50
  segments: 0, 2, 4, 6, 8
  brightness: 80
  transition: 2000
  spread: 1
  direction: 1
```
