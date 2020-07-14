---
title: "Cover Group"
description: "Instructions how to setup grouped covers in Home Assistant."
ha_category:
  - Cover
ha_release: 0.66
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: group
---

The `group` platform can create a cover that combines several cover entities into one.

To enable `Cover Groups` in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: group
    entities:
      - cover.hall_window
      - cover.living_room_window
```

{% configuration %}
  name:
    description: Name to use in the frontend.
    required: false
    type: string
    default: "Cover Group"
  entities:
    description: List of all cover entities you want to control.
    required: true
    type: [string, list]
{% endconfiguration %}

## Functionality

It works best if you group covers with the same supported features together (like support for `open`/`close`/`stop`/`position`/`tilt controls`), but is not limited to it. In case you have bundled covers with different features together, the controls will only affect those covers that support the actions.
