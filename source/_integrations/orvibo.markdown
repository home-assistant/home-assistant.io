---
title: Orvibo
description: Instructions on how to integrate Orvibo sockets within Home Assistant.
ha_category:
  - Switch
ha_iot_class: Local Push
ha_release: 0.8
ha_domain: orvibo
ha_platforms:
  - switch
ha_integration_type: integration
ha_quality_scale: legacy
---

{% caution %}
Please be aware that the product ORVIBO WIFI SMART SOCKET S20 (LGS-20) has been recalled by the European authorities due to safety concerns. For more information, please visit [RAPEX information](https://ec.europa.eu/consumers/consumers_safety/safety_products/rapex/alerts/?event=viewProduct&reference=A12/1577/15&lng=en).
{% endcaution %}

The `orvibo` switch platform allows you to toggle your Orvibo S20 Wifi Smart Sockets.

To automatically discover Orvibo sockets on your network:

```yaml
# Example configuration.yaml entry
switch:
  - platform: orvibo
```

To specify Orvibo sockets and skip discovery:

```yaml
# Example configuration.yaml entry
switch:
  - platform: orvibo
    discovery: false
    switches:
      - host: IP_ADDRESS
        mac: MA:CA:DD:RE:SS:00
        name: "My Socket"
```

{% configuration %}
discovery:
  description: Whether to discover sockets.
  required: false
  default: true
  type: boolean
switches:
  description: A list of Orvibo switches.
  required: false
  type: list
  keys:
    host:
      description: "IP address of your socket, e.g., 192.168.1.10."
      required: true
      type: string
    mac:
      description: "MAC address of the socket, e.g., `AA:BB:CC:DD:EE:FF`. This is required if the socket is connected to a different subnet to the machine running Home Assistant."
      required: false
      type: string
    name:
      description: Your name for the socket.
      required: false
      default: Orvibo S20 Switch
      type: string
{% endconfiguration %}
