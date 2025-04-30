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
ha_integration_type: integration
ha_quality_scale: legacy
---

The TP-Link LTE integration for Home Assistant makes it possible to send SMS's from the TP-Link LTE router. Phone numbers have to be pre-defined as part of the YAML configuration, and each phone number will turn up as additional notify action in Home Assistant. The integration adds a new notify action for each adds a notification action to Home Assistant that can be used to send SMSs provides a notification action that will send an SMS. Tested only with TL-MR6400 v4.

The integration provides a notification action that will send an SMS.

## Configuration

To enable the integration, add the following lines to your {% term "`configuration.yaml`" %} file:

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
  description: A list of notification targets connected to this specific host.
  required: false
  type: list
  keys:
    recipient:
      description: The phone number of a default recipient or a list with multiple recipients.
      required: true
      type: [string, list]
    name:
      description: The name of the notification action.
      required: false
      default: notify
      type: string
{% endconfiguration %}
