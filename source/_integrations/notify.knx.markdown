---
title: "KNX Notify"
description: "Instructions on how to use the KNX notify with Home Assistant."
ha_category:
  - Notifications
ha_release: 0.53
ha_iot_class: Local Push
ha_domain: knx
---

The `knx` notify platform allows you to send notifications to [KNX](https://www.knx.org/) devices.

## Configuration

To use your KNX switch in your installation, add the following lines to your top level [KNX Integration](/integrations/knx) configuration key in `configuration.yaml`:

```yaml
knx:
  notify:
    - name: Alarm
      address: '5/1/10'
```

{% configuration %}
address:
  description: KNX group address of the notification. *DPT 16.000*
  required: true
  type: string
name:
  description: A name for this device used within Home Assistant.
  required: false
  type: string
{% endconfiguration %}
