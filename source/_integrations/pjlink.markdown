---
title: PJLink
description: Instructions on how to integrate PJLink enabled projectors into Home Assistant.
ha_category:
  - Media player
ha_release: 0.76
ha_iot_class: Local Polling
ha_domain: pjlink
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `pjlink` {% term integration %} allows you to control from Home Assistant, projectors with support for the [PJLink protocol](https://pjlink.jbmia.or.jp/english/index.html).

## Configuration

To add a PJLink projector to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
media_player:
  - platform: pjlink
    host: 192.168.1.2
```

{% configuration %}
host:
  description: IP address or hostname of the device. Example:`192.168.1.2`.
  required: true
  type: string
port:
  description: port on which the PJLink service runs on the device.
  required: false
  type: integer
  default: 4352
name:
  description: Name of the device.
  required: false
  type: string
  default: name of the device as returned by PJLink.
encoding:
  description: Character encoding to use to communicate with the device.
  required: false
  type: string
  default: utf-8
password:
  description: Password to authenticate with the projector.
  required: false
  type: string
{% endconfiguration %}
