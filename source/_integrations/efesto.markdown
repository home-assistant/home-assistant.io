---
title: "Efesto"
description: "Instructions on how to integrate Efesto heating devices within Home Assistant."
logo: efesto.png
ha_category: Climate
ha_release: 0.102
ha_iot_class: Cloud Polling
---


The `efesto` climate platform lets you control Efesto heating devices (for example: pellet stove). To set it up, add the following information to your `configuration.yaml` file:

```yaml
climate:
  - platform: efesto
    url: EFESTO_URL
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    device: YOUR_DEVICE_ID
```

{% configuration %}
url:
  description: The URL to the web app of your Efesto heating device.
  required: true
  type: string
username:
  description: The username to login to the Efesto web app.
  required: true
  type: string
password:
  description: The password to login to the Efesto web app.
  required: true
  type: string
device:
  description: The device identifier of the heating device in Efesto.
  required: true
  type: string
name:
  description: An optional custom name for the Efesto heating device.
  required: false
  type: string
{% endconfiguration %}
