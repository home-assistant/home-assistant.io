---
title: "Default Config"
description: "The default config integration will initate a default configuration for Home Assistant."
logo: home-assistant.png
ha_category:
  - Other
ha_release: 0.88
---

This integration is a meta-component and configures a default set of integrations for Home Assistant to load. The integrations that will be loaded are:

- [automation](/components/automation/)
- [cloud](/components/cloud/)
- [config](/components/config/)
- [frontend](/components/frontend/)
- [history](/components/history/)
- [logbook](/components/logbook/)
- [map](/components/map/)
- [mobile_app](/components/mobile_app/)
- [person](/components/person/)
- [script](/components/script/)
- [ssdp](/components/ssdp/)
- [sun](/components/sun/)
- [system_health](/components/system_health/)
- [updater](/components/updater/)
- [zeroconf](/components/zeroconf/)

## Configuration

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
default_config:
```
