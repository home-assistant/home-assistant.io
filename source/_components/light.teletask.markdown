---
layout: page
title: "Teletask"
description: "Instructions on how to integrate Teletask components with Home Assistant."
date: 2019-02-06 20:30
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Hub
ha_release: 0.87
ha_iot_class: "Local Polling"
---

The `teletask` light component is used as in interface to switching/light actuators.

The `teletask` component must be configured correctly, see [Teletask Component](/components/teletask).

## {% linkable_title Configuration %}

To use your Teletask light in your installation, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: teletask
    doip_component: relay
    address: 1
    name: Garden Light
```

{% configuration %}
doip_component:
  description: Teletask DoIP type for switching the switch on/off.
  required: true
  type: string
address:
  description: Teletask DoIP address for switching the switch on/off.
  required: true
  type: string
name:
  description: A name for this device used within Home Assistant.
  required: true
  type: string
{% endconfiguration %}