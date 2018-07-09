---
layout: page
title: "Mitsubishi HVAC Controller"
description: "Instructions on how to integrate Mitsubishi GB-24a and similar with Home Assistant."
date: 2017-12-10 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: daikin.png
ha_category: Hub
ha_release: 0.74
ha_iot_class: "Local Polling"
---


The `mitsubishicontroller` component integrates Mitsubishi HVAC systems into Home Assistant.

<p class='note warning'>
Please note, the Mitshubishi HVAC platform integrates **ONLY the GB-24a and similar** into Home Assistant.
</p>

To automatically add all your Mitsubishi HVAC Groups into your Home Assistant installation, add the following to your 'configuration.yaml' file:

```yaml
# Full manual example configuration.yaml entry
climate:
  - platform: mitsubishicontroller
    url: http://192.168.1.30
    scan_interval: 300
```

{% configuration %}
url:
  description: The url of you Mitsubishi Controller.
  required: true
  default: None
  type: string
scan_interval:
  description: The polling frequency in seconds (how often to check the controller for updates [including current temerature updates])
  required: false
  default: 30
  type: int
  
{% endconfiguration %}

<p class='note warning'>
The mitsubishi controller responds relatively slowly, so it pays to set a scan interval of something like 300 [5 minutes] or 600 [10 minutes] 
</p>

