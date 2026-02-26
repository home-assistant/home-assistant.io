---
title: Lunatone
description: Instructions on how to integrate Lunatone REST API devices with Home Assistant.
ha_category:
  - Hub
  - Light
ha_release: 2025.11
ha_iot_class: Local Polling
ha_codeowners:
  - '@MoonDevLT'
ha_domain: lunatone
ha_config_flow: true
ha_platforms:
  - light
ha_integration_type: hub
ha_quality_scale: silver
---

The **Lunatone** {% term integration %} is used to integrate with the devices of [Lunatone](https://www.lunatone.com) that offer a REST API.

## Supported devices

Right now the following devices are supported:

- [DALI-2 IoT Gateway (v1.14.1 or later)](https://www.lunatone.com/produkt/dali-2-iot-gateway/)
- [DALI-2 IoT4 Gateway (v1.14.1 or later)](https://www.lunatone.com/produkt/dali-2-iot4-gateway/)
- [DALI-2 Display 4'' (v1.14.1 or later)](https://www.lunatone.com/produkt/dali-2-display-4/)
- [DALI-2 Display 7'' (v1.14.1 or later)](https://www.lunatone.com/produkt/dali-2-display-7/)

There is currently support for the following device types within Home Assistant:

- Lights

## Prerequisites

Before setting up the Lunatone integration, ensure you have:

1. Your gateway device powered and connected to your network.
2. The IP address or hostname of your device.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
    description: "The URL to your gateway device. For example: `http://10.0.0.131`"
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal. No extra steps are
required.

{% include integrations/remove_device_service.md %}
