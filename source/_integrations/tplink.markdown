---
title: TP-Link Kasa Smart
description: Instructions on integrating TP-Link Smart Home Devices to Home Assistant.
ha_category:
  - Hub
  - Light
  - Sensor
  - Switch
ha_release: 0.89
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@rytilahti'
  - '@thegardenmonkey'
ha_domain: tplink
ha_platforms:
  - diagnostics
  - light
  - sensor
  - switch
ha_dhcp: true
ha_quality_scale: platinum
ha_integration_type: integration
---

The `tplink` integration allows you to control your [TP-Link Smart Home Devices](https://www.tp-link.com/kasa-smart/) such as plugs, power strips, wall switches and bulbs.

You need to provision your newly purchased device to connect to your network before it can be added via the integration. This can be done either by using [kasa command-line tool](https://python-kasa.readthedocs.io/en/latest/cli.html#provisioning) or by adding it to the official Kasa app before trying to add them to Home Assistant. If you use the app, do not upgrade the firmware if it presents the option to avoid blocking the local access by potential firmware updates.

There is currently support for the following device types within Home Assistant:

- **Light**
- **Switch**
- **Sensor**

{% include integrations/config_flow.md %}

## Supported Devices

See [Supported Devices in python-kasa](https://github.com/python-kasa/python-kasa#supported-devices) for an up to date list.

## Supported devices

### Plugs

- HS100
- HS103
- HS105
- HS107
- HS110
- KP100
- KP105
- KP115
- KP125
- KP401
- EP10

### Power Strips

- EP40
- HS300
- KP303
- KP400

### Wall switches

- ES20M
- HS200
- HS210
- HS220
- KS200M
- KS220M
- KS230

### Bulbs

- EP40
- LB100
- LB110
- LB120
- LB130
- LB230
- KL50
- KL60
- KL110
- KL120
- KL125
- KL130
- KL135

### Light strips

- KL400
- KL420
- KL430

Other bulbs may also work, but with limited color temperature range (2700-5000). If you find a bulb isn't reaching the full-color temperature boundaries, submit a bug report to [python-kasa](https://github.com/python-kasa/python-kasa).

### Random Effect - Service `tplink.random_effect`

The light strips allow setting a random effect.

| Service data attribute | Description |
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
#Example Service Call
service: tplink.random_effect
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

### Seqeuence Effect - Service `tplink.sequence_effect`

The light strips allow setting a sequence effect.

| Service data attribute | Description |
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
#Example Service Call
service: tplink.sequence_effect
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
