---
title: Lunatone
description: Instructions on how to integrate Lunatone REST API devices with Home Assistant.
ha_category:
  - Hub
  - Light
ha_release: 2025.10
ha_iot_class: Local Polling
ha_codeowners:
  - '@Overlap0190'
ha_domain: lunatone
ha_config_flow: true
ha_platforms:
  - light
ha_integration_type: integration
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

## DALI device scan

During configuration you have to choose between three DALI device scan methods:

- **Refresh present devices**: refreshes the already present devices with the latest values from the DALI bus.
- **Find new devices**: performs a device scan that can find new devices and addresses them, but doesn't remove any existing DALI addresses.
- **New installation**: deletes the stored devices and all DALI addresses. Then it performs a device scan that addresses the devices on the DALI bus from scratch and stores the device information.

{% important %}

Be cautious when using the **New installation** option, especially in an existing DALI setup. Since DALI addresses are assigned randomly, resetting them may cause devices to receive new addresses that differ from their original ones. This can lead to system malfunctions, depending on the configuration.

{% endimportant %}

## Removing the integration

This integration follows standard integration removal. No extra steps are
required.

{% include integrations/remove_device_service.md %}
