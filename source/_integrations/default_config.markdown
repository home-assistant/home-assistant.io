---
title: Default Config
description: The default configuration integration will initiate a default configuration for Home Assistant.
ha_category:
  - Other
ha_release: 0.88
ha_domain: default_config
ha_iot_class: Calculated
---

This integration is a meta-component and configures a default set of integrations for Home Assistant to load. The integrations that will be loaded are:

- [Automation](/integrations/automation/) (`automation`)
- [Home Assistant Cloud](/integrations/cloud/) (`cloud`)
- [Configuration](/integrations/config/) (`config`)
- [Counter](/integrations/counter/) (`counter`)
- [DHCP Discovery](/integrations/dhcp/) (`dhcp`)
- [Frontend](/integrations/frontend/) (`frontend`)
- [History](/integrations/history/) (`history`)
- [Image](/integrations/image/) (`image`)
- [Input boolean](/integrations/input_boolean/) (`input_boolean`)
- [Input datetime](/integrations/input_datetime/) (`input_datetime`)
- [Input number](/integrations/input_number/) (`input_number`)
- [Input select](/integrations/input_select/) (`input_select`)
- [Input text](/integrations/input_text/) (`input_text`)
- [Logbook](/integrations/logbook/) (`logbook`)
- [Map](/integrations/map/) (`map`)
- [Media Source](/integrations/media_source/) (`media_source`)
- [Mobile App Support](/integrations/mobile_app/) (`mobile_app`)
- [My Home Assistant](/integrations/my/) (`my`)
- [Person](/integrations/person/) (`person`)
- [Scene](/integrations/scene/) (`scene`)
- [Scripts](/integrations/script/) (`script`)
- [Simple Service Discovery Protocol (SSDP)](/integrations/ssdp/) (`ssdp`)
- [Sun](/integrations/sun/) (`sun`)
- [System Health](/integrations/system_health/) (`system_health`)
- [Tag](/integrations/tag/) (`tag`)
- [Timer](/integrations/timer/) (`timer`)
- [Updater](/integrations/updater/) (`updater`)
- [Zero-configuration networking (zeroconf)](/integrations/zeroconf/) (`zeroconf`)
- [Zone](/integrations/zone/) (`zone`)

## Configuration

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
default_config:
```
