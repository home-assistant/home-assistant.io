---
layout: page
title: "Genie Aladdin Connect Cover"
description: "Instructions how to integrate Genie Aladdin Connect garage door covers into Home Assistant."
date: 2018-07-26 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: aladdin_connect.png
ha_category: Cover
ha_release: 0.75
ha_iot_class: "Cloud Polling"
---

The `aladdin_connect` cover platform lets you control Genie Aladdin Connect garage doors through Home Assistant.

<p class='note'>
Only doors that are owned by your Aladdin Connect account will be available. Doors that your account has been granted shared access to are not yet supported.
</p>

To use your Aladdin Connect cover in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
cover:
  - platform: aladdin_connect
    username: user@email.com
    password: password
```

{% configuration %}
username: 
  description: Your Aladdin Connect account username.
  required: true
  type: string
password:
  description: Your Aladdin Connect account password.
  required: true
  type: string
{% endconfiguration %}
