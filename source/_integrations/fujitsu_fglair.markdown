---
title: FGLair
description: Control your Fujitsu heat pump or air conditioner that uses the FGLair app
ha_category:
  - Climate
ha_release: 2024.9
ha_domain: fujitsu_fglair
ha_integration_type: integration
ha_codeowners:
  - '@crevetor'
ha_config_flow: true
ha_platforms:
  - climate
  - sensor
ha_iot_class: Cloud Polling
---

The {{ page.title }} {% term integration %} provides support for Fujitsu heat pumps and air conditioners that use the FGLair app.
To find out which app to use for your heat pump, check [the Fujitsu FGLair FAQ](https://www.fujitsu-general.com/global/support/faq/airstage-mobile/0127.html).

## Supported devices

This integration supports a subset of devices that work with the FGlair app and other external integrations.

If your device name (visible in **Settings > Firmware Information** in the FGlair app) starts with AC-UTY, then your device is not supported by this integration.

Devices with names starting with AP-WA, AP-WB, AP-WC, AP-WD, or AP-WF should be supported.

## Prerequisites

First, set up your device in the FGLair app before using this integration.
To configure this integration, you will need the credentials (login and password) used to connect to the FGLair application.

{% include integrations/config_flow.md %}

## Climate

This integration supports the following functionalities (if the devices support them):

- [`set_hvac_mode`](/integrations/climate/#action-climateset_hvac_mode)
- [`target temperature`](/integrations/climate#action-climateset_temperature)
- [`turn on/off`](/integrations/climate#action-climateturn_on)
- [`fan mode`](/integrations/climate#action-climateset_fan_mode)
- [`swing mode`](/integrations/climate#action-climateset_swing_mode)

## Outside temperature

On units that support it, this integration will expose a temperature sensor that reports the outside temperature that the unit is sensing.
