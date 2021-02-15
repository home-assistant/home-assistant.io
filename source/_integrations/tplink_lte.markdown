---
title: TP-Link LTE
description: Instructions on how to integrate your TP-Link LTE routers within Home Assistant.
ha_release: 0.83
ha_category:
  - Network
  - Notifications
ha_iot_class: Local Polling
ha_domain: tplink_lte
ha_platforms:
  - notify
---

The TP-Link LTE integration for Home Assistant allows you to observe and control TP-Link LTE routers, currently only tested with TL-MR6400 (firmware 1.4.0).

The integration provides a notification service that will send an SMS.

## Configuration

To enable the component, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
tplink_lte:
  - host: IP_ADDRESS
    password: SECRET
    notify:
      - name: sms1
        recipient: "+15105550123"
      - name: sms2
        recipient: "+55520525252"
```

{% configuration %}
host:
  description: The IP address of the router web interface.
  required: true
  type: string
password:
  description: The password used for the router web interface.
  required: true
  type: string
notify:
  description: A list of notification services connected to this specific host.
  required: false
  type: list
  keys:
    target:
      description: The phone number of a default recipient or a list with multiple recipients.
      required: true
      type: [string, list]
    name:
      description: The name of the notification service.
      required: false
      default: notify
      type: string
{% endconfiguration %}
