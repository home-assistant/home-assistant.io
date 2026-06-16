---
title: Aqvify
description: Instructions on how to set up Aqvify devices within Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.7
ha_iot_class: Cloud Polling
ha_domain: aqvify
ha_codeowners:
  - '@astrandb'
ha_platforms:
  - diagnostics
  - sensor
ha_config_flow: true
ha_dhcp: false
ha_integration_type: hub
related:
  - url: https://www.aqvify.com/
    title: Aqvify web
  - url: https://app.aqvify.com/
    title: Aqvify user account
ha_quality_scale: bronze
---
The **Aqvify** {% term integration %} allows users to integrate their [Aqvify](https://www.aqvify.com) water well and tank sensors using the [official public API](https://public.aqvify.com/swagger/index.html).

## Use case

- Monitor the water level in a water well and trigger automations based on these sensor values.

{% include integrations/config_flow.md %}

## Supported functionality

The **Aqvify** {% term integration %} supports the following entities:

### Sensors

There is currently support for sensors measuring the well water level from different perspectives. Please refer to Aqvify's documentation for the exact interpretation of the values.

## Automation example

Get started with this automation example:

### Send a notification when the water level in the well is below a limit

{% details "Example YAML configuration" %}

{% example %}
automation: |
  alias: "Notify when water level is below 15 meters from ground surface"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.water_level
      below: -15.0
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_phone
      data:
        message: "Low water level in well."
{% endexample %}

{% enddetails %}

## Data updates

The integration will poll the API for data every 60 seconds. This polling interval is designed to work within the rate limits of Aqvify APIs while providing timely updates.

## Troubleshooting

### Can’t set up the device

To resolve this issue, try the following steps:

1. Make sure your Home Assistant is connected to the internet.
2. Make sure that you have entered the correct API key.
3. Make sure the app of the manufacturer can see the device.

### The installation went smooth but I can't see my devices

Make sure the devices are visible and controllable via the manufacturer's app.
If they are not, check the device's power and network connection and refer to manufacturer's documentation.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
