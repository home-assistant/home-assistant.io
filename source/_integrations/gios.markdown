---
title: GIOŚ
description: Instructions on how to integrate GIOŚ (Polish Chief Inspectorate Of Environmental Protection) air quality service into Home Assistant.
ha_category:
  - Health
ha_release: 0.104
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: gios
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

The **GIOŚ** {% term integration %} uses the [GIOŚ](http://powietrze.gios.gov.pl/pjp/current) web service as a source for air quality data for your location.

## Use cases

- Monitor outdoor air quality.
- Warn to close windows when air quality is poor.
- Control ventilation systems based on air quality.


{% include integrations/config_flow.md %}

{% configuration_basic %}
Measuring station:
  description: "Select a measuring station from the list."
{% endconfiguration_basic %}

## Supported functionality

Below is a complete overview of the entities this integration provides.

### Available sensors

The integration provides the following sensors:

- Air quality index
- Benzene
- Carbon monoxide
- Nitrogen dioxide
- Nitrogen dioxide index
- Nitrogen monoxide
- Nitrogen oxides
- Ozone
- Ozone index
- PM10
- PM10 index
- PM2.5
- PM2.5 index
- Sulphur dioxide
- Sulphur dioxide index

The available sensors and data refresh rate depend on the selected measurement station.

## Data updates

By default, the integration {% term polling polls %} data from the API every 30 minutes.

## Examples

The following examples show how to use the integration in Home Assistant automations. These examples are just a starting point, and you can use them as inspiration to create your own automations.

### Notify when the PM10 level is too high

The following example sends a notification to your mobile device when the PM10 level exceeds 100 µg/m³.

{% raw %}

```yaml
automation:
  - alias: "Notify when PM10 level is too high"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.czerniawa_pm10
        above: 100

    actions:
      - action: notify.mobile_app_your_device
        data:
          title: "High PM10 Level Alert"
          message: >
            The PM10 level is too high at {{ states('sensor.czerniawa_pm10') }} µg/m³.
            Avoid going outside.
```

{% endraw %}

## Troubleshooting

Before reporting an issue, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) and restart the integration. As soon as the issue re-occurs, stop the debug logging again (_download of debug log file will start automatically_). Further, _if still possible_, download the {% term diagnostics %} data. If you have collected the debug log and the diagnostics data, include them in the issue report.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
