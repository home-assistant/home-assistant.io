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

The `flux` switch platform enables you to control the temperature of your lights, adapting to natural day-night cycles. Your lights will be bright during the day, and gradually fade to a warmer hue at night. The `flux` switch restores its last state after startup.

This integration changes your lights based on the time of day. It only affects lights that are turned on and configured in the Flux integration.

## Installation

The Flux integration can now be installed directly from the Home Assistant user interface.

To use the Flux integration in your installation, navigate to the "Integrations" page in the configuration panel. Click on the "+" button, search for "Flux", and fill in the form to set up the integration.

## Configuration

Flux allows you to configure how your lights behave throughout the day. By default, Flux sets the timings (such as `start_time`, `sunset_time` and `stop_time`) based on your geographical location. However, these can be manually adjusted in the configuration panel for finer control.

During the day (in between `start_time` and `sunset_time`), the lights transition from a cool, daylight temperature to a warm, sunset color. After sunset (between `sunset_time` and `stop_time`), the lights continue to warm, mimicking the natural transition from daylight to nighttime.

The color temperature can be adjusted to your liking, with lower values giving a warmer, redder hue and higher values creating a cooler, whiter light.
