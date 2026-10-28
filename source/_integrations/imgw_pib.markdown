---
description: Instructions on how to integrate IMGW-PIB (Polish Institute of Meteorology and Water Management - National Research Institute) hydrological service within Home Assistant.
ha_release: 2024.6
ha_domain: imgw_pib
---

The **IMGW-PIB** {% term integration %} uses hydrological data from the [Institute of Meteorology and Water Management - National Research Institute](https://hydro.imgw.pl) to present information about rivers and water reservoirs in Poland.

Use case: Monitor hydrological alerts to protect your family and property from floods, or track river water levels to gain long-term insight into climate change in your area.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Hydrological station:
    description: "Select a hydrological station from the list of available stations."
{% endconfiguration_basic %}

## Supported functionality

The **IMGW-PIB** integration provides the following entities.

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
- **Ice phenomena**
  - **Description**: Ice phenomena sensor shows how much of the river surface is affected by ice, such as slush, ice floes, or a frozen cover
  - **Remarks**: Not available for all hydrological stations
- **Emergent vegetation cover**
  - **Description**: Emergent vegetation cover indicates how much of the river cross-section is occupied by plants that grow above the water surface
  - **Remarks**: Not available for all hydrological stations, [disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity)
- **Floating vegetation cover**
  - **Description**: Floating vegetation cover indicates how much of the river cross-section is covered by plants floating on the water surface
  - **Remarks**: Not available for all hydrological stations, disabled by default
- **Submerged vegetation cover**
  - **Description**: Submerged vegetation cover indicates how much of the river cross-section is occupied by plants growing under the water surface
  - **Remarks**: Not available for all hydrological stations, disabled by default

## IMGW-PIB automation examples

The **Hydrological alert** sensor lets you react when a hydrological alert is detected for your river or reservoir.
Here is an idea to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Create a hydrological alert notification

Use the **Hydrological alert** sensor to create a persistent notification with the content and probability of a hydrological alert. Replace the entity ID in the example with the entity ID of your station's **Hydrological alert** sensor.

- **Trigger**: State changed
  - **Target**: Your station's **Hydrological alert** sensor
  - **From**: No alert
- **Action**: Persistent Notification: Create persistent notification
  - **Title**: `Hydrological alert!`
  - **Message**: `{{ trigger.to_state.state }}, probability {{ trigger.to_state.attributes.probability }}%`

{% details "YAML example for creating a hydrological alert notification" %}

{% example %}
automation: |
  alias: "Hydrological alert"
  triggers:
    - trigger: state
      entity_id: sensor.warta_oborniki_hydrological_alert
      from: no_alert
  actions:
    - action: persistent_notification.create
      data:
        title: "Hydrological alert!"
        message: >
          {{ trigger.to_state.state }},
          probability {{ trigger.to_state.attributes.probability }}%
{% endexample %}

{% enddetails %}

## Data updates

The **IMGW-PIB** integration {% term polling polls %} data from the IMGW-PIB API every 30 minutes by default.

## Known limitations

- The integration provides data for hydrological stations available through the public IMGW-PIB API. Some hydrological stations are not available in this data and therefore the integration does not support them.
- Not all hydrological stations provide all data, so the set of entities for individual stations may differ.

## Troubleshooting

{% details "The entities are unavailable" %}

### Symptom: The entities of the hydrological station become unavailable

The entities of the hydrological station show as unavailable, or {% my logs title="**Settings** > **System** > **Logs**" %} contains messages about connecting to the IMGW-PIB API or retrieving data from it.

#### Description

Home Assistant cannot reach the IMGW-PIB API, or the API does not return data for the selected hydrological station.

#### Resolution

1. Check that Home Assistant has a working internet connection.
2. Wait for the next data update. The integration retries automatically every 30 minutes, and the entities become available again when the IMGW-PIB API returns data.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
