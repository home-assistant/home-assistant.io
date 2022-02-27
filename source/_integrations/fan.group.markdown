---
title: "Fan Group"
description: "Instructions how to setup grouped fans in Home Assistant."
ha_category:
  - Fan
ha_release: 2021.11
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: group
---

The `group` platform can create a fan that combines several fan entities into one.

To enable `Fan Groups` in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
fan:
  - platform: group
    entities:
      - fan.lanai_west
      - fan.lanai_south
      - fan.lanai_east
```

{% configuration %}
entities:
  description: List of all fan entities you want to control.
  required: true
  type: [string, list]
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: "Fan Group"
unique_id:
  description: An ID that uniquely identifies this fan group. If two fans have the same unique ID, Home Assistant will raise an error.
  required: false
  type: string
{% endconfiguration %}

## Functionality

It works best if you group fans with the same supported features together (like support for `percentage`/`direction`/`oscillation`), but is not limited to it. In case you have bundled fans with different features together, the controls will only affect those fans that support the actions.
