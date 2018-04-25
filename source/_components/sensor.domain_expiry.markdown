---
layout: page
title: "Domain Expiry"
description: "Instructions on how to set up Domain expiry sensors within Home Assistant."
date: 2018-04-24 14:14
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: System Monitor
ha_release: 0.69
ha_iot_class: "depends"
---

The `domain_expiry` sensor gets whois information about domain and displays the expiry in days. 

To add the Domain Expiry sensor to your installation, add these options to `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: domain_expiry
    domain: home-assistant.io
```

{% configuration %}
domain:
  description:  Domain name to track
  required: true
  type: string
name: 
  description: The friendly name for the certificate.
  required: false
  type: string
  default: Domain Expiry
{% endconfiguration %}