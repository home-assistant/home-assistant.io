---
layout: page
title: "Optoma Projector Switch"
description: "Instructions on how to integrate Optoma Projectors into Home Assistant."
date: 2019-05-14 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: optoma.png
ha_category:
  - Multimedia
  - switch
ha_iot_class: Local Polling
ha_release: 0.96
---

The `optoma_projector` switch platform allows you to control the state of a network enabled Optoma projector.

## {% linkable_title Configuration %}

To use your Optoma Projector in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: optoma_projector
    host: IP_ADDRESS
```

{% configuration %}
name:
  description: The name to use when displaying this switch.
  required: false
  type: string
host:
  description: The network path to the projector.
  required: true
  type: string
username:
  description: Username to log into the Optoma web ui.
  default: admin
  required: false
  type: string
password:
  description: Password to log into the Optoma web ui.
  default: admin
  required: false
  type: string
{% endconfiguration %}
