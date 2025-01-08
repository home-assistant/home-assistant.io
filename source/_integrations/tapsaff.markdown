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
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `tapsaff` binary sensor {% term integration %} provides the 'Taps Aff' status for a given location within the UK using [Taps Aff](https://www.taps-aff.co.uk/).

## Configuration

To enable this {% term integration %}, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
