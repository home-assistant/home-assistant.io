---
title: Sunricher
description: Connect and control your Sunricher devices using the Zigbee Home Automation integration
ha_category:
  - Light
ha_domain: sunricher
ha_integration_type: virtual
ha_supporting_domain: zha
ha_supporting_integration: Zigbee Home Automation
ha_release: '2025.03'
ha_codeowners:
  - '@niracler'
ha_platforms:
  - light
ha_iot_class: Local Push
ha_iot_standard:
  - zigbee
---

{% include integrations/supported_brand.md %}

## Sunricher Devices

[Sunricher](https://www.sunricher.com) is a professional manufacturer of smart lighting control systems, offering various Zigbee lighting products. Through Home Assistant's Zigbee Home Automation (ZHA) integration, you can easily add Sunricher devices to your smart home system.

## Supported Devices

The following Sunricher devices can be used with the ZHA integration:

- Zigbee Light Controllers
- Zigbee Dimmers
- Zigbee LED Drivers
- Zigbee RGB/RGBW Controllers

## Setup Method

To add Sunricher devices, pair them as Zigbee devices:

{% my add_zigbee_device badge brand=page.ha_domain %}

[Learn more about Zigbee in Home Assistant](/integrations/zha/)

## Usage Information

For more documentation on how to use Sunricher devices in Home Assistant, please refer to the [Zigbee Home Automation integration documentation page](/integrations/zha/).
