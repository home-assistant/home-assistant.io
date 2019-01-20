---
layout: page
title: "Owlet"
description: "Instructions on how to integrate Owlet baby monitor into Home Assistant."
date: 2019-01-19
sidebar: true
comments: false
sharing: true
footer: true
logo: owlet.svg
ha_category: Health
featured: true
ha_release: "0.87"
ha_iot_class: "Cloud Polling"
ha_qa_scale:
---

The Point component is the main component to integrate the [Minut Point](https://minut.se/). To connect Point, you will have to [sign up for a developer account](https://minut.com/community/developers/) and get a `client_id` and `client_secret` using the `callback url`  as `base_url` + `/api/minut` eg. `http://localhost:8123/api/minut`. The `client_id` and `client_secret` should be used as below.

Once Home Assistant is started, a configurator will pop up asking you to Authenticate your Point account via a link when you follow the link and have clicked on **Accept** you will be redirected to the `callback url` and the Point integration will be automatically configured and you can go back to the original dialog and press **Submit**.

### {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
owlet:
  username: OWLET_USER
  password: OWLET_PASSWORD
  name: CUSTOM_NAME
```

{% configuration %}
username:
  description: Your Owlet account user ID.
  required: true
  type: string
password:
  description: Your Owlet account password.
  required: true
  type: string
name:
  description: Custom name for your Owlet device.
  required: false
  type: string
{% endconfiguration %}

<p class='warning'>
The intended purpose of this component is to enable data logging and automations
such as battery status updates and charging reminders.  This component should not
replace the Owlet app nor should it be used for for life critical notifications.
</p>

Owlet Care baby monitors check your baby's oxygen level and heart rate while
sleeping.  The configuration of this component is used for the sensor platforms
listed below. At least one of the platforms below must be enabled for this configuration
to be effective.

- [Sensor](/components/sensor.owlet): View heart rate and oxygen levels
- [Binary Sensor](/components/binary_sensor.owlet): View base station power and sock movement status

