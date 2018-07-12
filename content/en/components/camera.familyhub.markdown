---
layout: page
title: "Family Hub Camera"
description: "Instructions on how to integrate Samsung Family Hub refrigerator cameras within Home Assistant."
date: 2018-05-04 09:44
sidebar: true
comments: false
sharing: true
footer: true
logo: familyhub.png
ha_category: Camera
ha_release: "0.70"
ha_iot_class: "Local Polling"
---

The `familyhub` platform allows you to get images of the inside of your [Samsung Family Hub refrigerator](https://www.samsung.com/us/explore/family-hub-refrigerator/connected-hub/) in Home Assistant.

## {% linkable_title Configuration %}

To enable your Family Hub camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: familyhub
    ip_address: 'IP_ADDRESS'
```

{% configuration %}
ip_address:
  description: The IP address of your refrigerator.
  required: true
  type: string
{% endconfiguration %}
