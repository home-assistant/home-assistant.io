---
title: Default Config
description: The default configuration integration will initiate a default configuration for Home Assistant.
ha_category:
  - Other
ha_release: 0.88
ha_domain: default_config
---

This integration is a meta-component and configures a default set of integrations for Home Assistant to load. The integrations that will be loaded are:

- [Automation](/integrations/automation/)
- [Home Assistant Cloud](/integrations/cloud/)
- [Configuration](/integrations/config/)
- [Frontend](/integrations/frontend/)
- [History](/integrations/history/)
- [Input boolean](/integrations/input_boolean)
- [Input datetime](/integrations/input_datetime)
- [Input number](/integrations/input_number)
- [Input select](/integrations/input_select)
- [Input text](/integrations/input_text)
- [Logbook](/integrations/logbook/)
- [Map](/integrations/map/)
- [Mobile App Support](/integrations/mobile_app/)
- [Person](/integrations/person/)
- [Scene](/integrations/scene/)
- [Scripts](/integrations/script/)
- [Simple Service Discovery Protocol (SSDP)](/integrations/ssdp/)
- [Sun](/integrations/sun/)
- [System Health](/integrations/system_health/)
- [Updater](/integrations/updater/)
- [Zero-configuration networking (zeroconf)](/integrations/zeroconf/)
- [Zone](/integrations/zone)

## Configuration

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
default_config:
```
