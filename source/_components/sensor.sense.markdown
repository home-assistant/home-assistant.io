---
layout: page
title: Sense
description: "Instructions on how to integrate Sense within Home Assistant."
date: 2018-01-11 13:50
sidebar: true
comments: false
sharing: true
footer: true
logo: sense.png
ha_category: Energy
ha_iot_class: "Cloud Polling"
ha_release: 0.65
---


Integrate your [Sense](https://sense.com) electricity meter information into Home Assistant. 

## {% linkable_title Configuration %}

To enable this integration in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sense:
  email: CLIENT_ID
  password: CLIENT_SECRET
```

In addidition to binary sensors for individual devices, two types of sensors will be created with the following names:

- **Active Usage/Production**: Current active power usage/production in Watts. Updated every 1 minute.
- **Daily/Weekly/Monthly/Yearly Usage/Production**: Daily power usage/production in kWh. Updated every 5 minutes.



{% configuration %}
email:
  description: The email associated with your Sense account/application.
  required: true
  type: string  
password:
  description: The password for your Sense account/application.
  required: true
  type: string
timeout:
  description: Timeout for the connection in seconds.
  required: false
  default: 5
  type: integar
{% endconfiguration %}

Full example:

```yaml
# Example configuration.yaml entry
sense:
  email: CLIENT_ID
  password: CLIENT_SECRET
  timeout: 5
```
