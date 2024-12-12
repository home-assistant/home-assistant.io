---
title: Zengge
description: Instructions on how to integrate Zengge Bluetooth bulbs into Home Assistant.
ha_category:
  - Light
ha_iot_class: Local Polling
ha_release: 0.36
ha_domain: zengge
ha_platforms:
  - light
ha_integration_type: integration
ha_codeowners:
  - '@emontnemery'
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `zengge` {% term integration %} allows you to integrate your [Zengge Bluetooth bulbs](http://www.zengge.com/) into Home Assistant.

## Configuration

To enable the lights, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
light:
  - platform: zengge
    devices:
      "C4:BE:84:51:54:8B":
        name: Living Room
```

{% configuration %}
devices:
  description: The list of your devices/bulbs.
  required: true
  type: list
  keys:
    mac_address:
      description: The MAC address of the bulb.
      required: true
      type: list
      keys:
        name:
          description: The friendly name for the frontend.
          required: false
          type: string
{% endconfiguration %}
