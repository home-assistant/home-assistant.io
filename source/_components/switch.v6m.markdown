---
layout: page
title: "V6M Switch"
description: "Configuring a V6M switch (relay)."
date: 2018-10-05 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: v6m.jpg
ha_category: Switch 
featured: False
ha_release: 0.01
ha_iot_class: "Local Polling"
---

To enable this switch, you first have to set up [v6m](/components/v6m/), and add the following lines to your `configuration.yaml` file"

## {% linkable_title Configuration %}

``` yaml
# Example configuration.yaml entry
switch:
  - platform: v6m
    relays:
        0: "Sprinklers"
        1: "Siren"
        2: "Fog Machine"
```

{% configuration %}
relays:
  description: A list of relays.
  required: true
  type: list 
  keys:
    num:
      description: The relay number starting at 0.
      required: true
      type: int between 0 and 7
    name:
      description: The name of the switch (component).
      required: true
      type: string
{% endconfiguration %}
