---
title: Flock
description: Instructions on how to add Flock notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.71
ha_domain: flock
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `flock` integration uses [Flock.com](https://flock.com) to deliver notifications from Home Assistant.

## Setup

Go to the [Flock.com Admin website](https://admin.flock.com/#!/webhooks) and create a new "Incoming Webhooks". Choose a channel to send the notifications from Home Assistant to, specify a name and press *Save and Generate URL*.

<p class='img'>
  <img src='/images/integrations/flock/flock-webhook.png' />
</p> 

You will need the last part of the URL which is the `access_token` for your room.

<p class='img'>
  <img src='/images/integrations/flock/new-webhook.png' />
</p> 

## Configuration

To add Flock notifications to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: flock
    access_token: YOUR_ROOM_TOKEN
```

{% configuration %}
name:
  description: "The optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action."
  required: false
  type: string
  default: notify
access_token:
  description: The last part of the webhook URL.
  required: true
  type: string
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
