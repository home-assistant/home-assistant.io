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

You need to provision your newly purchased device to connect to your network before it can be added via the integration. This can be done by using the using the [kasa command-line tool](https://python-kasa.readthedocs.io/en/latest/cli.html#provisioning).

TP-Link has issued some firmware updates to their devices which disabled the local access. The local access is what enables Home Assistant to connect to your devices and control them. They revisited their decision in early 2022 and started offering a special 'local access only' provisioning which re-enables local access on newer firmware versions. This provisioning is not compatible with all devices supported by this integration. Their [FAQ](https://www.tp-link.com/us/support/faq/2707/) outlines how to proceed if your device is supported.


There is currently support for the following device types within Home Assistant:

- **Light**
- **Switch**
- **Sensor**

{% include integrations/config_flow.md %}

## TP-Link Kasa Device Overview

### Plugs

| Model Number     | Support by Home Assistant | Support by TP-Link's 'local only mode'     | Note                                     |
|------------------|---------------------------|--------------------------------------------|------------------------------------------|
| HS100            | ✅                        | ✅                                         |                                          |
| HS103            | ✅                        | ✅                                         |                                          |
| HS105            | ✅                        | ✅                                         |                                          |
| HS110            | ✅                        | ✅                                         | supports consumption sensors             |
| KP100            | ❓                        | ✅                                         |                                          |
| KP105            | ✅                        | ❓ <!-- not mentioned as of 2022-05-01 --> |                                          |
| KP115            | ✅                        | ✅                                         | supports consumption sensors             |

### Multi-Outlet Power Strips

| Model Number     | Support by Home Assistant | Support by TP-Link's 'local only mode'     | Note                                     |
|------------------|---------------------------|--------------------------------------------|------------------------------------------|
| EP40             | ✅                        | ❌                                         | outdoor 2-outlet                         |
| HS107            | ✅                        | ❌                                         | indoor 2-outlet                          |
| HS300            | ✅                        | ❌                                         | 6-outlet<br>supports consumption sensors |
| KP40             | ✅                        | ❓ <!-- not mentioned as of 2022-05-01 --> | outdoor 2-outlet                         |
| KP200            | ✅                        | ❌                                         | indoor 2-outlet                          |
| KP303            | ✅                        | ❌                                         | 3-outlet                                 |
| KP400            | ✅                        | ❌                                         | outdoor 2-outlet                         |

### Wall Switches

| Model Number     | Support by Home Assistant | Support by TP-Link's 'local only mode'     | Note                                     |
|------------------|---------------------------|--------------------------------------------|------------------------------------------|
| ES10             | ❓                        | ✅                                         |                                          |
| HS200            | ✅                        | ✅                                         |                                          |
| HS210            | ✅                        | ❌                                         |                                          |
| HS210KIT         | ❓                        | ❌                                         |                                          |
| HS220            | ✅                        | ❌                                         | acts as a light                          |

### Bulbs

| Model Number     | Support by Home Assistant | Support by TP-Link's 'local only mode'     | Note                                     |
|------------------|---------------------------|--------------------------------------------|------------------------------------------|
| KB130            | ✅                        | ❓ <!-- not mentioned as of 2022-05-01 --> |                                          |
| KL50             | ❓                        | ✅                                         |                                          |
| KL60             | ❓                        | ✅                                         |                                          |
| KL110            | ✅                        | ✅ <!-- whole series should to work -->    |                                          |
| KL120            | ✅                        | ✅ <!-- whole series should to work -->    |                                          |
| KL125            | ✅                        | ✅ <!-- whole series should to work -->    |                                          |
| KL130            | ✅                        | ✅ <!-- whole series should to work -->    |                                          |
| LB100            | ✅                        | ✅ <!-- whole series should to work -->    |                                          |
| LB110            | ✅                        | ✅ <!-- whole series should to work -->    |                                          |
| LB120            | ✅                        | ✅ <!-- whole series should to work -->    |                                          |
| LB130            | ✅                        | ✅ <!-- whole series should to work -->    |                                          |
| LB230            | ✅                        | ✅ <!-- whole series should to work -->    |                                          |

### Light Strips

| Model Number     | Support by Home Assistant | Support by TP-Link's 'local only mode'     | Note                                     |
|------------------|---------------------------|--------------------------------------------|------------------------------------------|
| KL400            | ✅                        | ❓ <!-- not mentioned as of 2022-05-01 --> |                                          |
| KL420            | ✅                        | ❓ <!-- not mentioned as of 2022-05-01 --> |                                          |
| KL430            | ✅                        | ❌                                         |                                          |
| KL430E           | ❓                        | ❌                                         |                                          |

### Range Extender

| Model Number     | Support by Home Assistant | Support by TP-Link's 'local only mode'     | Note                                     |
|------------------|---------------------------|--------------------------------------------|------------------------------------------|
| RE270            | ❓                        | ✅                                         |                                          |
| RE370            | ❓                        | ✅                                         |                                          |
| RE350K           | ❓                        | ✅                                         |                                          |

### Cameras

| Model Number     | Support by Home Assistant | Support by TP-Link's 'local only mode'     | Note                                     |
|------------------|---------------------------|--------------------------------------------|------------------------------------------|
| All Kasa cameras | ❓                        | ❌ <!-- as of 2022-05-01               --> |                                          |

### Smart Routers

| Model Number     | Support by Home Assistant | Support by TP-Link's 'local only mode'     | Note                                     |
|------------------|---------------------------|--------------------------------------------|------------------------------------------|
| SR20             | ❓                        | ❌                                         |                                          |

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

### Sequence Effect - Service `tplink.sequence_effect`

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
