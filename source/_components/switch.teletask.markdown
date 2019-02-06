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

The `teletask` switch component is used as in interface to switching actuators.

The `teletask` component must be configured correctly, see [Teletask Component](/components/teletask).

## {% linkable_title Configuration %}

To use your Teletask switch in your installation, add the following to your `configuration.yaml` file:

```yaml
switch:
  - platform: teletask
    doip_component: relay
    address: 1
    name: Power Outlets Garden
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