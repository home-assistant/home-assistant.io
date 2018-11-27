---
layout: page
title: "Notify Me"
description: "Instructions on how to add Alexa notification via NotifyMe to Home Assistant."
date: 2018-11-27 00:00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: notifyme.png
ha_category: Notifications
ha_release: 0.83
---

NotifyMe is an Alexa Skill which allows you to send a notification to Alexa
via a simple REST API, which will make your Echo devices to flash a yellow 
ring to notify you.

To use this notification platform in your installation, add the following
to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: notifyme
    access_token: NOTIFYME_ACCESS_TOKEN
```

{% configuration %}
access_token:
  description: "Access token for NotifyMe API. Checkout [Notify Me](http://www.thomptronics.com/notify-me) for more information"
  required: true
  type: string
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: "`notify`"
  type: string
{% endconfiguration %}

### {% linkable_title Usage %}


