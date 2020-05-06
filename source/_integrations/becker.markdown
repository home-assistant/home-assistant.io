---
title: Velux
description: Instructions on how to integrate Becker Covers via Becker Centronic USB Strick with Home Assistant.
ha_category:
  - Cover
ha_release: 
ha_codeowners:
  - '@nicolasberthel'
ha_domain: becker
---

Becker Cover Integration for for Home Assistant allows you to control your Becker Covers via a centronic USB Stick

There is currently support for the following device types within Home Assistant:

- Cover

## Configuration

The becker cover configuration consist in a new becker platform in your cover configuration:

```yaml
# Example configuration.yaml entry
cover:
  - platform: becker
    device: "/dev/serial/by-id/usb-BECKER-ANTRIEBE_GmbH_CDC_RS232_v125_Centronic-if00"
    covers:
      kitchen:
        friendly_name: "Kitchen Cover"
        channel: "1"
      bedroom:
        friendly_name: "Bedroom Cover"
        channel: "2"
```

{% configuration %}
device:
  description: The path to access centronic stick.
  default: /dev/serial/by-id/usb-BECKER-ANTRIEBE_GmbH_CDC_RS232_v125_Centronic-if00
  required: false
  type: string
covers:
  description: The list of covers you want to control
  required: true
  type: list
  keys:
    friendly_name:
      description: Override the name to use in the frontend.
      required: false
      type: string
    channel:
      description: The channel used to control the cover. Pay attention to surround the channel number with strings
      required: true
      type: string
{% endconfiguration %}

<div class='note warning'>
If a channel consists of only numbers, please make sure to surround it with quotes.
This is a known limitation in YAML, because the device ID will be interpreted as a number otherwise.
</div>
