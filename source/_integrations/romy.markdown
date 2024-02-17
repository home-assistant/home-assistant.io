---
title: ROMY Vacuum Cleaner
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
ha_zeroconf: true
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
- `send_command`

## Clean a specific area / room with send_command

### Example

```yaml
service: vacuum.send_command
data:
  command: /set/clean_map
  params:
    - map_id: 4
      area_ids: 8,7
target:
  entity_id: vacuum.romy_aicu_aicyourromysuniqueid
```
### Get map ids and areas

Visit Robeye (http site from robot under port 8080) and click left on "Maps from Robot"

Or fetch it with /get/maps and fetch areas from for example map 4 with /get/areas?map_id=4

## Troubleshooting

### Local HTTP interface password

You have to enable the local interface first with a password. This is printed as QR Code on a label directly under the dust bin inside the robot.

### ROMY robot interface protocol

Is available as download under [romy-robot-interface-protocol](https://www.romyrobot.com/en-AT/romy-robot-interface-protocol)
