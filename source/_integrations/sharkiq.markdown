---
title: Shark IQ
description: Instructions on how to integrate your Shark IQ vacuum robot with Home Assistant.
ha_category:
  - Vacuum
ha_iot_class: Cloud Polling
ha_release: 0.115
ha_config_flow: true
ha_codeowners:
  - '@ajmarks'
ha_domain: sharkiq
ha_platforms:
  - vacuum
---

The `sharkiq` integration allows you to control your [Shark IQ](https://www.sharkclean.com/vacuums/robot-vacuums/) vacuum.

<p class='img'>
<img src='/images/screenshots/more-info-dialog-sharkiq.png' />
</p>

This platform has been tested and is confirmed to be working with the Shark IQ R101AE robot vacuum with self-empty base but should also work with the R100.

{% include integrations/config_flow.md %}

## Services

Currently supported services are:

- `start`
- `pause`
- `stop`
- `return_to_base`
- `locate`

## Troubleshooting

### Integration Disconnecting

There is currently a bug in the shark library that causes a frequent disconnect but will continue to work after a restart. [Discussion](https://github.com/home-assistant/core/issues/44775)

This automation is a work around:
```
alias: Shark Robot not responding
description: ''
trigger:
  - platform: state
    entity_id: vacuum.shark
    to: unavailable
    for:
      hours: 0
      minutes: 5
      seconds: 0
      milliseconds: 0
condition: []
action:
  - service: homeassistant.reload_config_entry
    data:
      entry_id: vacuum.shark
mode: single
```
