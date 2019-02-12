---
layout: page
title: "Huawei LTE Notify"
description: "Instructions on how to add Huawei LTE notifications to Home Assistant."
date: 2018-12-23 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: huawei.svg
ha_category: Notifications
ha_release: 0.88
---

The `huawei_lte` platform allows you to use a Huawei LTE router for
notifications from Home Assistant. The messages will be sent as SMS
text messages.

This requires you to have set up the
[Huawei LTE component](/components/huawei_lte/).

```yaml
# Example configuration.yaml entry
notify:
  - platform: huawei_lte
    recipient: "+15105550123"
```

{% configuration %}
recipient:
  description: The phone number of a default recipient or a list with multiple recipients.
  required: true
  type: string, list
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
url:
  description: The router to use. Not needed if you only have one.
  required: false
  type: url
{% endconfiguration %}

To use notifications, please see the
[getting started with automation page](/getting-started/automation/).
