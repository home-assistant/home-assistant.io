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


Integrate your [Sense](https://sense.com) meter information into Home Assistant. 
To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: sense
  email: CLIENT_ID
  password: CLIENT_SECRET
  monitored_conditions:
    - active_usage
    - active_production
    - daily_usage
    - daily_production
```

Two types of sensors can be monitored and will be created with the following names:
- **Active Usage/Production**: Current active power usage/production in Watts. Updated every 30 seconds.
- **Daily Usage/Production**: Daily power usage/production in kWh. Updated every 5 minutes.
- ...

Weekly, Monthly and Yearly variants are also available.

{% configuration %}
email:
  description: The email associated with your Sense account/application.
  required: true
  type: string  
password:
  description: The password for your Sense account/application.
  required: true
  type: string
monitored_conditions:
  description: List of sensors to display in the front end.
  required: true
  type: list
  keys:
    active_usage:
      description: The current power usage in W
    active_production:
      description: The current solar production in W
    daily_usage:
      description: Total power used for current day in kWh
    daily_production:
      description: Total power produced for current day in kWh
    weekly_usage:
      description: Total power used for current week in kWh
    weekly_production:
      description: Total power produced for current week in kWh
    monthly_usage:
      description: Total power used for current month in kWh
    monthly_production:
      description: Total power produced for current month in kWh
    yearly_usage:
      description: Total power used for current year in kWh
    yearly_production:
      description: Total power produced for current year in kWh
{% endconfiguration %}
