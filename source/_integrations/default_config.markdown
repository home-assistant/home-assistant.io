---
title: Default Config
description: The default configuration integration will initiate a default configuration for Home Assistant.
ha_category:
  - Other
ha_release: 0.88
ha_domain: default_config
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
---

This {% term integration %} is a meta-component and configures a default set of integrations for Home Assistant to load. The integrations that will be loaded are:

- [Assist pipeline](/integrations/assist_pipeline/) (`assist_pipeline`)
- [Backup](/integrations/backup/) (`backup`)
- [Bluetooth](/integrations/bluetooth/) (`bluetooth`)
- [Configuration](/integrations/config/) (`config`)
- [Conversation](/integrations/conversation/) (`conversation`)
- [DHCP discovery](/integrations/dhcp/) (`dhcp`)
- [Energy](/integrations/energy/) (`energy`)
- [Go2rtc](/integrations/go2rtc/) (`go2rtc`)
- [History](/integrations/history/) (`history`)
- [Home Assistant Alerts](/integrations/homeassistant_alerts) (`homeassistant_alerts`)
- [Home Assistant Cloud](/integrations/cloud/) (`cloud`)
- [Image upload](/integrations/image_upload/) (`image_upload`)
- [Logbook](/integrations/logbook/) (`logbook`)
- [Media source](/integrations/media_source/) (`media_source`)
- [Mobile app support](/integrations/mobile_app/) (`mobile_app`)
- [My Home Assistant](/integrations/my/) (`my`)
- [Simple Service Discovery Protocol (SSDP)](/integrations/ssdp/) (`ssdp`)
- [Stream](/integrations/stream/) (`stream`)
- [Sun](/integrations/sun/) (`sun`)
- [USB](/integrations/usb/) (`usb`)
- [Webhooks](/integrations/webhook) (`webhook`)
- [Zero-configuration networking (zeroconf)](/integrations/zeroconf/) (`zeroconf`)

## Configuration

To integrate this into Home Assistant, add the following section to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
default_config:
```
