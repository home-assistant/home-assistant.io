---
title: TP-Link Kasa Smart
description: Instructions on integrating TP-Link Smart Home Devices to Home Assistant.
ha_category:
  - Hub
  - Switch
  - Light
  - Sensor
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
---

The `tplink` integration allows you to control your [TP-Link Smart Home Devices](https://www.tp-link.com/kasa-smart/) such as plugs, power strips, wall switches and bulbs.

You need to provision your newly purchased device to connect to your network before it can be added via the integration. This can be done either by using [kasa command-line tool](https://python-kasa.readthedocs.io/en/latest/cli.html#provisioning) or by adding it to the official Kasa app before trying to add them to Home Assistant. If you use the app, do not upgrade the firmware if it presents the option to avoid blocking the local access by potential firmware updates.

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
- KP105
- KP115 (supports consumption sensors)

### Strip (Multi-Plug)

- HS107 (indoor 2-outlet)
- HS300 (powerstrip 6-outlet) (supports consumption sensors)
- KP303 (powerstrip 3-outlet)
- KP400 (outdoor 2-outlet)
- KP200 (indoor 2-outlet)
- KP40 (outdoor 2-outlet)
- EP40 (outdoor 2-outlet)

### Wall Switches

- HS200
- HS210
- HS220 (acts as a light)

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
- KL400
- KL430

Other bulbs may also work, but with limited color temperature range (2700-5000). If you find a bulb isn't reaching the full-color temperature boundaries, submit a bug report to [python-kasa](https://github.com/python-kasa/python-kasa).
