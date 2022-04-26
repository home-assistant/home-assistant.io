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

TP-Link offers an [FAQ](https://www.tp-link.com/us/support/faq/2707/) how to provision your newly purchased devices. The devices won't connect to the TP-Link cloud and become locally controllable afterwards. If you already own devices which are connected to the cloud, you can convert them from TP-Link Cloud operated to local operation as well.

In the past more TP-Link used to support local access but they removed this support. If your old device is on older firmware it can still be controlled locally by Home Assistant.

There is currently support for the following device types within Home Assistant:

- **Light**
- **Switch**
- **Sensor**

{% include integrations/config_flow.md %}

## Supported Devices
### Plugs

- HS100
- HS103
- HS105
- HS110 (supports consumption sensors)
- KP105 (is not mentioned in the TP-Link FAQ as working/not working)
- KP115 (supports consumption sensors)

### Strip (Multi-Plug)

<!-- - HS107 (indoor 2-outlet) # Does not support local control according to TP-Link FAQ (as of date 2022-04-25) -->
<!-- - HS300 (powerstrip 6-outlet) (supports consumption sensors) # Does not support local control according to TP-Link FAQ (as of date 2022-04-25) -->
<!-- - KP303 (powerstrip 3-outlet) # Does not support local control according to TP-Link FAQ (as of date 2022-04-25) -->
<!-- - KP400 (outdoor 2-outlet) # Does not support local control according to TP-Link FAQ (as of date 2022-04-25) -->
- KP200 (indoor 2-outlet)
- KP40 (outdoor 2-outlet)
<!-- - EP40 (outdoor 2-outlet) # Does not support local control according to TP-Link FAQ (as of date 2022-04-25) -->

### Wall Switches

- HS200
<!-- - HS210 # Does not support local control according to TP-Link FAQ (as of date 2022-04-25) -->
<!-- - HS220 (acts as a light) # Does not support local control according to TP-Link FAQ (as of date 2022-04-25) -->

### Bulbs

- LB100
- LB110
- LB120
- LB130
- LB230
- KL110
- KL120
- KL125
- KL130
- KB130

### Light Strips

- KL400
- KL420
<!-- - KL430 # Does not support local control according to TP-Link FAQ (as of date 2022-04-25) -->

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
