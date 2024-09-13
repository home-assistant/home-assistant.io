---
title: Shark IQ
description: Integrate your Shark IQ robot vacuum with Home Assistant.
ha_category:
  - Vacuum
ha_iot_class: Cloud Polling
ha_release: 0.115
ha_config_flow: true
ha_codeowners:
  - '@JeffResc'
  - '@funkybunch'
ha_domain: sharkiq
ha_platforms:
  - vacuum
ha_integration_type: integration
---

The `sharkiq` integration allows you to control your [Shark IQ](https://www.sharkclean.com/vacuums/robot-vacuums/) vacuum.

{% include integrations/config_flow.md %}

## Actions

Currently supported [`vacuum`](/integrations/vacuum/) actions are:

- `start`
- `pause`
- `stop`
- `return_to_base`
- `locate`
- `set_fan_speed`

### Room Targeting

In addition to the [`vacuum`](/integrations/vacuum/) actions, this integration supports room targeting.
This allows you to select specific rooms that you want cleaned, instead of doing a whole-home clean.

```yaml
action: sharkiq.clean_room
data:
  rooms:
    - "Entry"
    - "Living Room"
target:
  entity_id: vacuum.my_vacuum
```
**Important Note:** The list of rooms must be written _exactly_ as they appear in the Shark Clean app. If you want exact names that the action will understand,
look for the `Rooms` attribute of your Shark Robot Vacuum in Home Assistant.  This will be populated with the rooms that the robot has configured, as they will be
understood by the action.

If you want to use the area selector in the action's UI, you need to format the area names exactly as they appear in the vacuum's `Rooms` attribute.  You may also check the attribute using Home Assistant's [Developer Tools](https://www.home-assistant.io/docs/tools/dev-tools/).
<p class='img'>
<img src='/images/integrations/sharkiq/sharkiq-room-service-attributes.png' />
</p>

## Troubleshooting

### Integration Disconnecting

If the integration frequently disconnects and you have an ad blocker runner like [Pi-hole](https://pi-hole.net/) or [AdGuard](https://adguard.com) add `ads-field.aylanetworks.com` to the Allow list . This domain is needed for the connection and can be part of the automatic blocking because of `ads` being part of the subdomain.

If `pause` does not work for you, then it is not supported by your vacuum. The `stop` action will provide similar functionality.
