---
title: Default Config
description: The default config integration will initate a default configuration for Home Assistant.
logo: home-assistant.png
ha_category:
  - Other
ha_release: 0.88
---

This integration is a meta-component and configures a default set of integrations for Home Assistant to load. The integrations that will be loaded are:

- [automation](/integrations/automation/)
- [cloud](/integrations/cloud/)
- [config](/integrations/config/)
- [frontend](/integrations/frontend/)
- [history](/integrations/history/)
- [logbook](/integrations/logbook/)
- [map](/integrations/map/)
- [mobile_app](/integrations/mobile_app/)
- [person](/integrations/person/)
- [script](/integrations/script/)
- [ssdp](/integrations/ssdp/)
- [sun](/integrations/sun/)
- [system_health](/integrations/system_health/)
- [updater](/integrations/updater/)
- [zeroconf](/integrations/zeroconf/)

## Configuration

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
default_config:
```
