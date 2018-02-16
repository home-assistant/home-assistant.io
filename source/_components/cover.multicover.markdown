---
layout: page
title: "Multicover"
description: "Instructions how to integrate Multicover into Home Assistant."
date: 2018-02-11 10:00 +0000
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Cover
ha_release: 0.64
ha_iot_class: "Local Push"
logo: home-assistant.png
---

The `multicover` platform can create covers that combine multiple different cover entities into one.

To enable Multicover in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: multicover
    covers:
      my_multicover:
        friendly_name: "My Multicover"
        tilt: true
        entity_id:
          - cover.hall_window
          - cover.living_room_window
```

{% configuration %}
  covers:
    description: List of your covers.
    required: true
    type: map
    keys:
      friendly_name:
        description: Name to use in the frontend.
        required: false
        type: string
      tilt:
        description: Enable tilt controls.
        required: false
        type: boolean
        default: false
      entity_id:
        description: List of cover entities you want to control.
        required: true
        type: string | list
{% endconfiguration %}

## {% linkable_title Functionality %}

After you added a `multicover` entity to your configurations file, you can control all covers you have added under `entity_id` with the controls from the `multicover` entity. It is quite useful for example if you want to control all covers in one room or house at once.

It works best if you group covers with the same supported features together (like support for `open`/`close`/`stop`/`position`/`tilt controls`), but is not limited to it. In case you have bundled covers with different features together, the controls will only affect those covers that support the actions.
