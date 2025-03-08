---
title: Slide Local
description: Instructions on how to integrate the Innovation in Motion Slide covers with Home Assistant.
ha_category:
  - Cover
ha_iot_class: Local Polling
ha_release: 2025.1
ha_config_flow: true
ha_codeowners:
  - '@dontinelli'
ha_domain: slide_local
ha_platforms:
  - button
  - cover
  - diagnostics
  - switch
ha_integration_type: device
ha_zeroconf: true
ha_quality_scale: gold
---

The Slide Local {% term integration %} allows you to integrate your [Slide](https://slide.store/) devices in Home Assistant using the local API.

## Supported devices

The integration should work with all Slide covers (API version 1 and 2).

## Prerequisites

Before you can use the integration, you have to make sure the slide is configured for the local API. By default, the Slide connects to the cloud API, but it is possible to use the local API, too (only one of them can be active). To switch between the cloud and local API, do the following:

    Press the reset button 2x

LED flashes 5x fast: cloud API disabled, local API enabled
LED flashes 2x slow: local API disabled, cloud API enabled

![screenshot slide bottom](/images/integrations/slide_local/slide_bottom.png)

{% include integrations/config_flow.md %}

To setup the integration you need the following information:

{% configuration_basic %}
hostname:
  description: Hostname or IP of the slide device.
password:
  description: The device code of your Slide (inside of your Slide or in the box, 8 characters). Only required for API 1, with API 2 you can fill in anything here.
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Invert position:
  description: Check the box, if your cover uses inverted positions for open and closed.
{% endconfiguration_basic %}

## Supported functionality

### Cover

Your slide device will appear as cover.

### Button

You can start the calibration sequence for your slide by pushing on the Calibration button.

### Switch

You can enable/disable the Touch&Go functionality (open/close cover by a short pull on the cover) by using the TouchGo switch.

## Data updates

The integration fetches data from the device every 15 seconds.

## Known limitations

The integration only provides connection with Slide devices via the local API. The cloud API is no longer available. 


## Remove integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
