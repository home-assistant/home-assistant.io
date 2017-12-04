---
layout: page
title: "Skybell"
description: "Instructions on how to integrate your Skybell HD devices within Home Assistant."
date: 2017-10-03 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: skybell.png
ha_category: Hub
ha_release: 0.56
ha_iot_class: "Cloud Polling"
---

The `skybell` implementation allows you to integrate your [Skybell.com](http://www.skybell.com/) doorbells in Home Assistant.

Currently only the Skybell HD is supported by this platform.

To enable devices set up with your [Skybell.com](http://www.skybell.com/) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
skybell:
  username: you@example.com
  password: secret
```

{% configuration %}
username:
  description: The username for accessing your Skybell account.
  required: true
  type: string
password:
  description: The password for accessing your Skybell account.
  required: true
  type: string
{% endconfiguration %}

Finish your configuration by visiting the [Skybell binary sensor](/components/binary_sensor.skybell/), [Skybell camera](/components/camera.skybell/), [Skybell light](/components/light.skybell/), [Skybell sensor](/components/sensor.skybell/), or [Skybell switch](/components/switch.skybell/) documentation.
