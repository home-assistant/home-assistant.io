---
title: Electricity Maps
description: Instructions on how to use the Electricity Maps (formerly known as CO2Signal) data within Home Assistant
ha_category:
  - Climate
  - Energy
  - Environment
ha_release: 0.87
ha_iot_class: Cloud Polling
ha_domain: co2signal
ha_platforms:
  - diagnostics
  - sensor
ha_config_flow: true
ha_integration_type: service
ha_codeowners:
  - '@jpbede'
  - '@VIKTORVAV99'
---

The **Electricity Maps** {% term integration %} (formerly known as CO2Signal) queries the [Electricity Maps](https://www.electricitymaps.com/) API for the CO2 intensity of a specific region. 
Data can be collected for your home by using the home location, latitude/longitude, or a country code.

This API uses the same data as shown on the [Electricity Maps app](https://app.electricitymaps.com). 
Not all countries/regions in the world are supported, so please check the app to verify local availability before setting up the integration.

## Use case

The Electricity Maps integration helps you understand the carbon intensity of your electricity grid in real-time. This information can be valuable for:

- Timing energy-intensive tasks (like charging electric vehicles or running appliances) during periods of lower carbon intensity.
- Creating automations that respond to changing grid conditions.
- Visualizing your region's progress towards cleaner energy.
- Understanding how weather conditions affect renewable energy availability in your area.
- Tracking the carbon impact of your home's energy usage in the {% my energy title="**Energy Dashboard**" %}.

## Prerequisites

To configure and use this integration, you need to obtain a free API key from Electricity Maps by signing up to the Free Tier product on the [Electricity Maps API Portal](https://electricitymaps.com/free-tier).
Please be aware that the Free Tier API is limited to one location (called a zone). You need to specify the zone for your home location when creating your account.

{% include integrations/config_flow.md %}

The integration provides the following configuration options when setting it up:

{% configuration_basic %}
Location:
  description: Choose between using your Home Assistant's configured home location, a specific country code, or custom latitude/longitude coordinates.
API key:
  description: The API key obtained from the Electricity Maps API Portal.
{% endconfiguration_basic %}

When configuring the location based on latitude/longitude, you will be prompted to enter the following:

{% configuration_basic %}
Latitude:
  description: The latitude of your home location.
Longitude:
  description: The longitude of your home location.
{% endconfiguration_basic %}

When configuring the location based on a country code, you will be prompted to enter the following:

{% configuration_basic %}
Country code:
  description: The two-letter ISO 3166-1 alpha-2 country code for your home location (e.g., "US" for the United States, "DE" for Germany).
{% endconfiguration_basic %}

## Supported functionality

### Sensors

The integration creates two sensors for each configured location:

- **Carbon intensity**: Shows the carbon intensity of electricity production in your area, measured in gCO2eq/kWh (grams of CO2 equivalent per kilowatt-hour).
- **Fossil fuel percentage**: Shows what percentage of the electricity grid currently relies on fossil fuels for production.

## Examples

### Creating a dashboard card

You can create a gauge card to visualize the carbon intensity of your electricity:

{% raw %}
```yaml
type: gauge
entity: sensor.electricity_maps_carbon_intensity
name: Carbon Intensity
min: 0
max: 500
severity:
  green: 0
  yellow: 150
  red: 300
```
{% endraw %}

### Automation example: Run appliances when carbon intensity is low

This automation starts your dishwasher when the carbon intensity drops below a specific threshold:

{% raw %}
```yaml
alias: "Run Dishwasher at Low Carbon Intensity"
description: "Starts the dishwasher when carbon intensity is low"
trigger:
  - platform: numeric_state
    entity_id: sensor.electricity_maps_carbon_intensity
    below: 100
    for:
      minutes: 10
condition:
  - condition: time
    after: "22:00:00"
    before: "06:00:00"
  - condition: state
    entity_id: binary_sensor.dishwasher_ready
    state: "on"
action:
  - service: switch.turn_on
    target:
      entity_id: switch.dishwasher
  - service: notify.mobile_app
    data:
      message: "Dishwasher started during low carbon intensity period ({{ states('sensor.electricity_maps_carbon_intensity') }} gCO2eq/kWh)"
```
{% endraw %}

### Creating a history graph to track changes

Add this to your dashboard to track how carbon intensity changes throughout the day:

{% raw %}
```yaml
type: history-graph
entities:
  - entity: sensor.electricity_maps_carbon_intensity
    name: Carbon Intensity
hours_to_show: 24
refresh_interval: 60
```
{% endraw %}

### Energy Dashboard integration

The Electricity Maps integration is automatically used on the Energy Dashboard when set up. The carbon intensity data appears in the Energy Dashboard as a real-time gauge showing the carbon footprint of your household electricity usage.

You don't need to manually configure anything - the integration is automatically detected and used by the Energy Dashboard to calculate and display your home's carbon emissions based on your energy consumption and the current grid carbon intensity.

To view this information:
1. Navigate to the {% my energy title="**Energy Dashboard**" %}.
2. Look for the carbon intensity gauge in the dashboard.

If you don't see the carbon information in your Energy Dashboard:
1. Make sure the Electricity Maps integration is properly set up and working.
2. Verify that you have energy monitoring configured in Home Assistant.

## Data updates

The integration {% term polling polls %} data from the Electricity Maps API every 15 minutes by default. The actual update frequency may be limited by your API tier's rate limits.

## Known limitations

- The Free Tier API is limited to one location. You need to specify the country when creating your account.
- The Free Tier API has a limit of 50 requests per hour, but the integration is designed to poll at a rate that won't exceed this limit.
- Not all geographic regions are supported by Electricity Maps. Check their app to see if your region has coverage.

## Troubleshooting

### Integration fails to set up

#### Symptom: "The given token is invalid" during setup

If you see an invalid token error during setup, your API key may be invalid or expired.

##### Resolution

1. Verify that you've correctly copied the API key from the Electricity Maps API portal.
2. Check if your API key is still active in the Electricity Maps API portal.
3. Try generating a new API key if the issue persists.

#### Symptom: "No data available for selected location" during setup

If you receive a "No data available for selected location" error, the coordinates or country code you provided might not be supported by Electricity Maps.

##### Resolution

1. Check the [Electricity Maps app](https://app.electricitymaps.com) to verify coverage for your location.
2. Try using a country code instead of coordinates, or vice versa.
3. If your exact location isn't supported, try using the nearest supported location.

### Sensors show "unavailable"

If your sensors show as "unavailable" after successful setup, there might be issues with the API connection.

#### Resolution

1. Check your internet connection.
2. Verify that your API key still has available quota for the day.
3. Check if the Electricity Maps service is experiencing downtime.
4. Restart Home Assistant if the issue persists.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
