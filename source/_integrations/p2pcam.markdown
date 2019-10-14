---
title: "P2PCam camera"
description: "Instructions on how to integrate your p2pcam cameras within Home Assistant."
logo: p2pcam.png
ha_category:
  - Camera
ha_release: 0.101
ha_iot_class: Local Polling
---

This is a camera integration to connect to the cheap chinese ip cameras that you can access using apps like [p2pCamViewer](https://play.google.com/store/apps/details?id=x.p2p.cam&hl=nl) or [Plug2View](https://play.google.com/store/apps/details?id=x.view.cam).

## Configuration

Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: p2pcam
    ip_address: IP_ADDRESS
```

{% configuration %}
name:
  description: Name of the camera to use in the frontend.
  required: false
  default: p2pcam
  type: string
host:
  description: The ip of the host machine (Home Assistant) in case automatic ip detection doesn't provide the correct ip.
  required: false
  type: string
ip_address:
  description: The ip address of the camera you're trying to get the image from.
  required: true
  type: string
{% endconfiguration %}

