---
title: IMGW-PIB
description: Instructions on how to integrate IMGW-PIB (Polish Institute of Meteorology and Water Management - National Research Institute) hydrological service within Home Assistant.
ha_category:
  - Environment
ha_release: 2024.6
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: imgw_pib
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
ha_quality_scale: platinum
---

The **IMGW-PIB** {% term integration %} uses hydrological data from [Institute of Meteorology and Water Management - National Research Institute](https://hydro.imgw.pl) to present information about rivers and water reservoirs in Poland.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Hydrological station:
    description: "Select a hydrological station from the list of available stations."
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}

## Supported functionality

The IMGW-PIB integration provides the following entities.

### Sensors

- **Water level**
  - **Description**: Water level in the river or reservoir at the measurement point
- **Water flow**
  - **Description**: River water flow at the measurement point
  - **Remarks**: Not available for all hydrological stations
- **Water temperature**
  - **Description**: Water temperature in the river or reservoir at the measurement point
  - **Remarks**: Not available for all hydrological stations
- **Hydrological alert**
  - **Description**: Provides information on hydrological alerts for a given river or reservoir

## Data updates

By default, the integration {% term polling polls %} data from the IMGW-PIB API every 30 minutes.

## Possible use-cases

- Monitor hydrological alerts to protect your family and property from floods.
- Monitor river water levels to gain long-term insight into climate change in your area.

## Examples

### Create a hydrological alert notification

This automation will create a persistent notification with the content and probability of a hydrological alert:

```yaml
automation:
  - alias: Hydrological alert
    triggers:
      - trigger: state
        entity_id:
          - sensor.warta_oborniki_hydrological_alert
        from: no_alert
    actions:
      - action: persistent_notification.create
        data:
          title: Hydrological alert!
          message: "{{ trigger.to_state.state }}, probability {{ trigger.to_state.attributes.probability }}%"
```

## Known limitations

- The integration provides data for hydrological stations available through the public IMGW-PIB API. Some hydrological stations are not available in this data and therefore the integration does not support them.
- Not all hydrological stations provide all data, so the set of entities for individual stations may differ.
