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
Please be aware that the product ORVIBO Wi-Fi SMART SOCKET S20 (LGS-20) has been recalled by the European authorities due to safety concerns. For more information, please visit [RAPEX information](https://ec.europa.eu/consumers/consumers_safety/safety_products/rapex/alerts/?event=viewProduct&reference=A12/1577/15&lng=en).
{% endcaution %}

The **Orvibo** {% term integration %} allows you to toggle your Orvibo S20 Wi-Fi Smart Sockets.

{% include integrations/config_flow.md %}

If Home Assistant cannot discover your switches, you can configure them manually.

{% configuration_basic %}
Host:
  description: "The host name or IP address (for example, 192.168.1.2) of your switch."
MAC address:
  description: "The MAC address of the switch. This field is optional. If it is omitted, the {% term integration %} will attempt to discover and connect to the switch using the Host field alone. If this discovery fails, you must enter both the host and MAC address information."
{% endconfiguration_basic %}

## Troubleshooting

Discovery requires that Home Assistant and the Orvibo switches are on the same network subnet. In addition, discovery may fail if the switches are in sleep mode. In this case, try toggling the switch state or power cycling the switch. If discovery still fails, you can configure the switches manually.
