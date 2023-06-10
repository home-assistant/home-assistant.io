---
title: Flux
description: Instructions on how to automate the color temperature of your lights based on the time of day with Home Assistant
ha_category:
  - Automation
ha_release: 0.21
ha_quality_scale: internal
ha_domain: flux
ha_iot_class: Calculated
ha_platforms:
  - switch
ha_integration_type: integration
---

The `flux` switch platform enables you to control the temperature of your lights, using a model that resembles the human circadian rhythm. Your lights will be bright during the day, and gradually fade to a warmer hue at night. The `flux` switch restores its last state after startup.

This integration changes your lights based on the time of day. It only affects lights that are turned on and configured in the flux switch.

## Installation and Configuration

The Flux integration can now be installed and configured directly from the Home Assistant user interface, which simplifies the setup process and reduces the need for manual YAML configuration. 

To use the Flux integration in your installation, navigate to the "Integrations" page in the configuration panel. Click on the "+" button, search for "Flux", and fill in the form to set up the integration.

During the day (in between the set `start_time` and the adjusted `sunset_time`), the lights will transition from the `start_colortemp` to the `sunset_colortemp`. After sunset (between `sunset_time` and `stop_time`), the lights will fade from the `sunset_colortemp` to the `stop_colortemp`. The fade effect is created by updating the lights periodically.

The value of `sunset_time` can be set based on your preference within the Flux integration configuration.

The color temperature is specified in kelvin, and accepted values are between 1000 and 40000 kelvin. Lower values will seem more red, while higher will look more white.

If you want to update at variable intervals, you can leave the switch turned off and use automation rules that call the service `switch.<name>_update` whenever you want the lights updated, where `<name>` equals the name you set in the switch configuration.
