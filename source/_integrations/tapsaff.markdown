---
title: Taps Aff
description: Instructions on how to use the Taps Aff binary sensor in Home Assistant.
ha_category:
  - Weather
ha_release: 0.47
ha_iot_class: Local Polling
ha_domain: tapsaff
ha_codeowners:
  - '@bazwilliams'
ha_platforms:
  - binary_sensor
ha_integration_type: integration
---

The `tapsaff` binary sensor provides the 'Taps Aff' status for a given location within the UK using [Taps Aff](https://www.taps-aff.co.uk/).

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: tapsaff
    location: glasgow
```

{% configuration %}
location:
  description: The location for the Taps Aff. It must be configured with a UK postcode or city to work.
  required: true
  type: string
name:
  description: The name to use when displaying this sensor.
  required: false
  type: string
  default: Taps Aff
{% endconfiguration %}
