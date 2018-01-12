---
layout: page
title: Sense
description: "Instructions how to integrate Sense within Home Assistant."
date: 2018-01-11 13:50
sidebar: true
comments: false
sharing: true
footer: true
logo: sense.png
ha_category: Energy
ha_iot_class: "Cloud Polling"
ha_release: 0.61
---


Integrate your [Sense](https://sense.com) meter information into Home Assistant. 
To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: sense
  email: CLIENT_ID
  password: CLIENT_SECRET
```

Two sensors will be created with the following names:
- **Energy Usage**: Current active power usage in Watts. Updated every 10 seconds.
- **Solar Generation**: Current active power generation in Watts. Updated every 10 seconds.
- **Daily Energy Usage**: Daily power usage in kWh. Updated every 2.5 minutes.

{% configuration %}
email:
  description: The email associated with your Sense account/application.
  required: true
  type: string  
password:
  description: The password for your Sense account/application.
  required: true
  type: string
{% endconfiguration %}
