---
description: Instructions on how to integrate GIOŚ (Polish Chief Inspectorate Of Environmental Protection) air quality service into Home Assistant.
ha_release: 0.104
ha_domain: gios
---

The **GIOŚ** {% term integration %} uses the [GIOŚ](https://powietrze.gios.gov.pl/pjp/current) web service of the Polish Chief Inspectorate of Environmental Protection (Główny Inspektorat Ochrony Środowiska) as a source for air quality data for your location. The integration provides the current pollutant concentrations and air quality indices measured by a selected measuring station in Poland.

## Use cases

- Monitor the outdoor air quality near your home.
- Get a notification to close the windows when the air quality is poor.
- Control your ventilation system or air purifier based on the air quality.
- Show the current outdoor air quality on your dashboard.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Measuring station:
    description: "The measuring station where the environmental data is collected. Select the station closest to your location from the list. Each station is added as a separate integration entry, and you cannot add the same station twice."
{% endconfiguration_basic %}

## Supported functionality

The **GIOŚ** integration provides the following entities. Which entities are created depends on the pollutants measured by the selected measuring station.

### Sensors

- **Air quality index**
  - **Description**: Shows the overall air quality index for the measuring station. The possible values are **Very good**, **Good**, **Moderate**, **Sufficient**, **Bad**, and **Very bad**.
- **Benzene**
  - **Description**: Shows the benzene (C6H6) concentration in micrograms per cubic meter.
- **Carbon monoxide**
  - **Description**: Shows the carbon monoxide (CO) concentration in micrograms per cubic meter.
- **Nitrogen dioxide**
  - **Description**: Shows the nitrogen dioxide (NO2) concentration in micrograms per cubic meter.
- **Nitrogen dioxide index**
  - **Description**: Shows the air quality index for nitrogen dioxide. The possible values are the same as for the **Air quality index** sensor.
- **Nitrogen monoxide**
  - **Description**: Shows the nitrogen monoxide (NO) concentration in micrograms per cubic meter.
- **Nitrogen oxides**
  - **Description**: Shows the nitrogen oxides (NOx) concentration in micrograms per cubic meter.
- **Ozone**
  - **Description**: Shows the ozone (O3) concentration in micrograms per cubic meter.
- **Ozone index**
  - **Description**: Shows the air quality index for ozone. The possible values are the same as for the **Air quality index** sensor.
- **PM10**
  - **Description**: Shows the concentration of particulate matter smaller than 10 micrometers in micrograms per cubic meter.
- **PM10 index**
  - **Description**: Shows the air quality index for PM10. The possible values are the same as for the **Air quality index** sensor.
- **PM2.5**
  - **Description**: Shows the concentration of particulate matter smaller than 2.5 micrometers in micrograms per cubic meter.
- **PM2.5 index**
  - **Description**: Shows the air quality index for PM2.5. The possible values are the same as for the **Air quality index** sensor.
- **Sulphur dioxide**
  - **Description**: Shows the sulphur dioxide (SO2) concentration in micrograms per cubic meter.
- **Sulphur dioxide index**
  - **Description**: Shows the air quality index for sulphur dioxide. The possible values are the same as for the **Air quality index** sensor.

The index sensors become unavailable when GIOŚ does not publish an index for the related pollutant.

## GIOŚ automation examples

The following example shows how to use the integration in Home Assistant automations. It is just a starting point, and you can use it as inspiration to create your own automations.

{% include docs/paste_yaml_tip.md %}

### Automation: Notify when the PM10 level is too high

This automation sends a notification to your mobile device when the PM10 level exceeds 100 µg/m³. Replace the entity ID in the example with the entity ID of your station's **PM10** sensor.

- **Trigger**: Numeric state crossed threshold
  - **Entity**: PM10 (`sensor.czerniawa_pm10`)
  - **Above**: `100`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Title**: `High PM10 level alert`
  - **Message**: The current PM10 level and a reminder to stay inside

{% details "YAML example for notifying when the PM10 level is too high" %}

{% example %}
automation: |
  alias: "Notify when the PM10 level is too high"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.czerniawa_pm10
      above: 100
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "High PM10 level alert"
        message: >
          The PM10 level is too high at
          {{ states('sensor.czerniawa_pm10') }} µg/m³.
          Avoid going outside.
{% endexample %}

{% enddetails %}

## Data updates

The **GIOŚ** integration {% term polling polls %} data from the GIOŚ web service every 30 minutes. The GIOŚ terms of service allow downloading data no more than twice an hour, so this interval cannot be changed.

## Known limitations

- The availability of sensors depends on the selected measuring station. Not all stations provide data for all pollutants or indices.
- GIOŚ may publish new measurements less frequently than every 30 minutes, so consecutive {% term polling polls %} can return unchanged data.

## Troubleshooting

{% details "Can't set up the integration" %}

### Symptom: "Failed to connect"

When you try to set up the integration, Home Assistant shows the message "Failed to connect", or the list of measuring stations does not load.

#### Description

Home Assistant cannot reach the GIOŚ web service, or the web service does not respond in time.

#### Resolution

1. Check that Home Assistant has a working internet connection.
2. Check whether the [GIOŚ website](https://powietrze.gios.gov.pl/pjp/current) is available. The web service may be temporarily down for maintenance.
3. Try again later.

### Symptom: "Invalid sensors' data for this measuring station."

When you select a measuring station, Home Assistant shows the message "Invalid sensors' data for this measuring station."

#### Description

The GIOŚ web service does not return any usable measurements for the selected measuring station. This can happen when a station is temporarily out of service.

#### Resolution

1. Select a different measuring station near your location.
2. If you need this specific station, try again later when the station publishes data again.

{% enddetails %}

{% details "The entities are unavailable" %}

### Symptom: The entities of the measuring station become unavailable

The entities of the measuring station show as unavailable, or {% my logs title="**Settings** > **System** > **Logs**" %} contains messages about connecting to the GIOŚ web service or retrieving data from it.

#### Description

Home Assistant cannot reach the GIOŚ web service, or the web service does not return data for the selected measuring station. Individual index sensors can also become unavailable when GIOŚ temporarily does not publish an index for a pollutant.

#### Resolution

1. Check that Home Assistant has a working internet connection.
2. Wait for the next data update. The integration retries automatically every 30 minutes, and the entities become available again when the GIOŚ web service returns data.
3. If the problem persists, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), download the {% term diagnostics %} data, and include both in your issue report.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
