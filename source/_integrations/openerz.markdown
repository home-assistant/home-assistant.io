---
title: Open ERZ
description: Instructions on how to integrate a OpenERZ API for Zurich city waste disposal with Home Assistant
ha_category:
  - Sensor
ha_release: 0.109
ha_iot_class: Cloud Polling
ha_domain: openerz
ha_codeowners:
  - '@misialq'
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

This `openerz` sensor {% term integration %} uses [OpenERZ](http://openerz.metaodi.ch/) API to access data from Entsorgung und Recycling Zürich (ERZ). It reports the next pickup date for the specified zip and waste type.

## Configuration

To enable this {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: openerz
    zip: 8001
    waste_type: cardboard
```

Available (and tested) waste types are: `paper`, `cardboard`, `waste`, `cargotram`, `etram`, `organic` and `textile`.

{% configuration %}
name:
  description: The name to be used when displaying this sensor.
  required: false
  type: string
zip:
  description: Postcode of the pickup location.
  required: true
  type: string
waste_type:
  description: Type of waste to be collected.
  required: true
  type: string
  default: waste
{% endconfiguration %}
