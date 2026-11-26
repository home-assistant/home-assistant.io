---
description: Show SMHI weather forecasts, thunder probability, and fire risk for locations in Sweden in Home Assistant.
ha_release: 0.81
ha_domain: smhi
---

The **SMHI** {% term integration %} brings weather forecasts and fire risk forecasts from [SMHI](https://www.smhi.se/), the Swedish Meteorological and Hydrological Institute, into Home Assistant. Use it to show the weather and forecasts for your home on your dashboard, or to get notified when thunder or a high fire risk is expected.

The integration works for locations in and near Sweden and does not need an account or an API key. Each location you add becomes its own entry in Home Assistant, with a weather entity and sensors for that location.

## Use cases

- Show the current weather and the daily or hourly forecast for your home on your dashboard.
- Get a notification when thunder is likely, so you have time to bring in garden furniture or unplug sensitive electronics.
- Check the fire risk before you light a barbecue or a campfire, or get notified when the risk is high.
- Follow the weather at a second location, such as a summer house, by adding it as a separate entry.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Location:
  description: "The location you want weather data for. Select it on the map. By default, the map shows your Home Assistant home location. The location must be within the SMHI forecast area, which covers Sweden and the areas close to it."
{% endconfiguration_basic %}

If you keep the map pin on your Home Assistant home location, the entry is named **Home**. For any other location, the entry is named **Weather** followed by the coordinates. To add more locations, add the integration again.

## Reconfiguration

You can move an entry to a different location without removing the integration. Your entities and their history are kept.

The entry keeps its name after you move it. If the name no longer fits the new location, rename the entry.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **SMHI** integration.
2. Next to the entry, select the three dots {% icon "mdi:dots-vertical" %} menu, then select **Reconfigure**.
3. Select the new **Location** on the map, and select **Submit**.

## Supported functionality

The **SMHI** integration provides the following entities for each location.

### Weather

- **Weather**
  - **Description**: The current weather and forecasts for the location. Use it with the weather forecast card on your dashboard, or with the [`weather.get_forecasts`](/actions/weather.get_forecasts/) action in automations and scripts.
  - **Current values**: Condition, temperature, humidity, pressure, wind speed, wind gust speed, wind bearing, visibility, and cloud coverage.
  - **Forecasts**: Daily, hourly, and twice-daily (day and night).
  - **Remarks**: The entity is named after the entry, and its entity ID starts with `weather.smhi_`. For example, `weather.smhi_home`.
  - **Attributes**:
    - **Thunder probability**: The probability of thunder, in percent.

### Weather sensors

- **Thunder probability**
  - **Description**: The probability of thunder.
  - **Unit**: %
- **Precipitation category**
  - **Description**: The type of precipitation expected.
  - **Options**: No precipitation, Rain, Thunderstorm, Freezing rain, Mixed/ice, Snow, Wet snow, Mixture of rain and snow, Ice pellets, Graupel, Hail, Drizzle, Freezing drizzle
- **Frozen precipitation**
  - **Description**: How much of the precipitation falls in frozen form, such as snow or ice.
  - **Unit**: %
- **Total cloud coverage**
  - **Description**: The mean value of total cloud cover.
  - **Unit**: %
  - **Remarks**: [Disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).
- **Low cloud coverage**
  - **Description**: The mean value of low-level cloud cover.
  - **Unit**: %
  - **Remarks**: Disabled by default.
- **Medium cloud coverage**
  - **Description**: The mean value of medium-level cloud cover.
  - **Unit**: %
  - **Remarks**: Disabled by default.
- **High cloud coverage**
  - **Description**: The mean value of high-level cloud cover.
  - **Unit**: %
  - **Remarks**: Disabled by default.

### Fire risk sensors

All fire risk sensors are disabled by default. To use them, [enable the sensors](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity) you need.

- **FWI index**
  - **Description**: The fire weather index (FWI) as a risk level.
  - **Options**: Very low risk, Low risk, Moderate risk, High risk, Very high risk, Extremely high risk
- **Fire weather index**
  - **Description**: The fire weather index (FWI) as a number. A higher value means a higher risk of fire.
- **Initial spread index**
  - **Description**: The expected rate of fire spread (ISI).
- **Build up index**
  - **Description**: The total amount of fuel available for a fire (BUI).
- **Fine fuel moisture code**
  - **Description**: The moisture content in dead, fine fuels on the ground (FFMC).
- **Duff moisture code**
  - **Description**: The moisture content in loosely compacted organic layers of moderate depth (DMC).
- **Drought code**
  - **Description**: The moisture content in deep, compact organic layers (DC).
- **Highest grass fire risk**
  - **Description**: The highest grass fire risk, according to the SMHI grass fire model.
  - **Options**: Snow cover, Grass fire season over, Low, Moderate, High, Very high
- **Potential rate of spread**
  - **Description**: How fast a fire can spread in uncut and ungrazed natural grass.
  - **Unit**: m/min
- **Fuel drying**
  - **Description**: How much water is available in the forest fuel.
  - **Options**: Very wet, Wet, Moderately wet, Dry, Very dry, Extremely dry

## SMHI automation examples

You can use the SMHI sensors in automations, for example to get a warning before thunder or when the fire risk is high.

{% include docs/paste_yaml_tip.md %}

### Automation: Get notified when thunder is likely

This automation sends a notification to your phone when the probability of thunder rises above 50%.

- **Trigger**: Entity: Numeric state
  - **Target**: Home Thunder probability (`sensor.home_thunder_probability`)
  - **Above**: 50
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification when thunder is likely" %}

{% example %}
automation: |
  alias: "Notify when thunder is likely"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.home_thunder_probability
      above: 50
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          SMHI forecasts a high probability of thunder.
{% endexample %}

{% enddetails %}

### Automation: Get notified when the fire risk is high

This automation sends a notification to your phone when the fire risk becomes high, very high, or extremely high. It uses the **FWI index** sensor, which is disabled by default. Enable it before you create the automation.

- **Trigger**: Entity: State
  - **Target**: Home FWI index (`sensor.home_fwi_index`)
  - **To**: High risk, Very high risk, Extremely high risk
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification when the fire risk is high" %}

{% example %}
automation: |
  alias: "Notify when the fire risk is high"
  triggers:
    - trigger: state
      entity_id: sensor.home_fwi_index
      to:
        - high
        - very_high
        - extreme
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          SMHI reports a high fire risk. Avoid open fires and barbecues.
{% endexample %}

{% enddetails %}

## Data updates

The integration {% term polling polls %} SMHI for new weather forecasts and fire risk forecasts every 31 minutes. The `weather.get_forecasts` action uses the forecast data that is already loaded, so it does not send extra requests to SMHI.

The data comes from the [SMHI open data API](https://opendata.smhi.se/metfcst). SMHI provides the data for free under the [Creative Commons Attribution 4.0 International license](https://creativecommons.org/licenses/by/4.0/).

## Known limitations

- Only locations within the [SMHI forecast area](https://opendata.smhi.se/metfcst/pmp/geographic_area) can be added. This area covers Sweden and the areas close to it.
- The current weather and the weather sensors use the first hour of the latest SMHI forecast. The fire risk sensors show today's SMHI fire risk forecast. None of these values are weather-station measurements.
- The weather entity never reports the conditions hail, windy, or exceptional, because the SMHI forecast does not provide them.
- The fire risk sensors are most useful during the fire season. Outside the season, some of them can show values like **Snow cover** or **Grass fire season over**, or have no value at all.
- Each entry covers one location. To follow several locations, add the integration once for each location.

## Troubleshooting

{% details "Only locations in Sweden are supported" %}

### Symptom: "Only locations in Sweden are supported"

When you set up or reconfigure the integration, the form shows the message "Only locations in Sweden are supported".

#### Description

SMHI did not return a forecast for the selected location. Either the location is outside the SMHI forecast area, or SMHI could not be reached at that moment.

#### Resolution

1. Check that the location you selected on the map is in Sweden. To see the supported area, open the [SMHI forecast area map](https://opendata.smhi.se/metfcst/pmp/geographic_area).
2. If the location is correct, wait a few minutes and try again.

{% enddetails %}

{% details "Account is already configured" %}

### Symptom: "Account is already configured"

When you set up or reconfigure the integration, the setup stops with the message "Account is already configured".

#### Description

You already have an entry for this exact location. When you reconfigure, this also happens if you select the location the entry already uses.

#### Resolution

Use the existing entry, or select a different location on the map.

{% enddetails %}

{% details "The weather entity and sensors are unavailable" %}

### Symptom: The weather entity and sensors are unavailable

The weather entity and the sensors show as unavailable, or the integration shows that it failed to set up.

#### Description

Home Assistant could not get data from SMHI. This can happen when your internet connection is down or when the SMHI service has a temporary problem.

The weather forecast and the fire risk forecast are loaded separately. If only the fire risk forecast fails, only the fire risk sensors become unavailable. When Home Assistant starts, both forecasts must load before the integration can set up.

#### Resolution

1. Check that Home Assistant has a working internet connection.
2. Wait for the next update. The integration tries again automatically, and the entities become available as soon as SMHI responds.
3. If the problem continues, check the {% my logs title="**Settings** > **System** > **Logs**" %} for messages from the SMHI integration.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
