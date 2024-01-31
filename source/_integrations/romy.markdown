---
title: ROMY
description: Integrate your ROMY vacuum robot with Home Assistant.
ha_category:
  - Vacuum
ha_iot_class: Local Polling
ha_release: 2024.2
ha_config_flow: true
ha_codeowners:
  - '@xeniter'
ha_domain: romy
ha_platforms:
  - vacuum
ha_integration_type: integration
---

The **ROMY** integration allows you to control your [ROMY](https://www.romyrobot.com) vacuum robot.

This integration currently supports the following models:

- ROMY C5
- ROMY L6 Performance
- ROMY L6 Animal

{% include integrations/config_flow.md %}

## Services

Currently supported services are:

- `start`
- `pause`
- `continue`
- `stop`
- `return_to_base`


## Troubleshooting

### Local HTTP interface password

You have to enable the local interface first with a password. This is printed as QR Code on a label directly under the dust bin inside the robot.

### ROMY robot interface protocol

Is available as download under [romy-robot-interface-protocol](https://www.romyrobot.com/en-AT/romy-robot-interface-protocol)
