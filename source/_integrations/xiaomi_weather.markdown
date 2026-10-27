---
description: Get current weather and forecasts for mainland China cities with Xiaomi Weather in Home Assistant.
ha_release: 2026.11
ha_domain: xiaomi_weather
related:
  - docs: /integrations/weather/
    title: Weather entity
---

The **Xiaomi Weather** {% term integration %} provides current weather and daily, hourly, and twice-daily forecasts for cities in mainland China. Select a location on the map during setup, and the integration finds a matching city.

You can show the current weather and forecast on your dashboard with a [weather forecast card](/dashboards/weather-forecast/). You can also use the weather in automations, such as the [morning rain reminder](#automation-show-a-morning-rain-reminder) below, which reminds you to take an umbrella when it rains.

## Prerequisites

Your Home Assistant instance needs internet access to retrieve data from Xiaomi Weather. You do not need a Xiaomi device, account, or API key.

{% include integrations/config_flow.md %}

1. On **Choose a location**, select a location in mainland China on the map. The initial selection is your Home Assistant home location.
2. If more than one city matches, **Choose a city** appears. Check the city name, region, and city code, then select the matching city.
3. On **Review location**, check the city and coordinates, then submit to verify weather access and finish setup.

To add another city, add the integration again. Each city can be configured only once, even if you use different coordinates.

### Configuration options

{% configuration_basic %}
Location:
  description: "The location to use for weather data. Select it on the map. It defaults to your Home Assistant home location, and the integration matches its coordinates to a city."
City:
  description: "The city to use for weather data. This option appears only when multiple cities match the selected coordinates."
{% endconfiguration_basic %}

The selected coordinates are saved during setup. Moving your Home Assistant home location does not change this weather location. To change a configured location, remove its integration entry and add it again.

## Supported functionality

The integration creates one weather {% term entity %} per city. Depending on the data available from Xiaomi Weather, it provides:

- Current condition and temperature
- Apparent temperature
- Humidity and pressure
- Wind speed and direction
- UV index
- Visibility

The entity supports these forecast types:

- Daily: High and low temperatures, conditions, wind, and precipitation probability
- Hourly: Temperature, conditions, and wind
- Twice daily: Separate daytime and nighttime temperatures, conditions, and wind

Missing measurements are omitted, but other available measurements for the same forecast period are retained. Forecast periods without a usable date or time are omitted. The number of forecast periods depends on the available data.

Use the standard [**Get weather forecasts**](/actions/weather.get_forecasts/) action to retrieve daily, hourly, or twice-daily forecasts.

## Xiaomi Weather automation examples

You can use the current weather conditions to create reminders in Home Assistant.

{% include docs/paste_yaml_tip.md %}

### Automation: show a morning rain reminder

At 07:00, check whether your Xiaomi Weather entity's condition is **Rainy** and show an umbrella reminder in Home Assistant's notification panel. This checks the latest reported conditions, not the day's forecast. The example checks **Rainy** only; **Pouring** and **Lightning, rainy** are separate conditions.

Go to {% my automations title="**Settings** > **Automations & scenes**" %} and create an automation with these settings:

- **Trigger**: Time: 07:00
- **Condition**: State
  - **Entity**: Your Xiaomi Weather entity
  - **State**: Rainy
- **Action**: Create persistent notification
  - **Title**: `Morning rain reminder`
  - **Message**: `Xiaomi Weather reports rain. Remember your umbrella.`
  - **Notification ID**: `xiaomi_weather_morning_rain`

If you use the YAML example, replace `weather.home` with your Xiaomi Weather entity's ID. Its entity ID is based on the city name. You can adjust the time to suit your routine. The notification ID makes subsequent reminders update the same notification.

{% details "YAML example for a morning rain reminder" %}

{% example %}
automation: |
  alias: "Show a morning rain reminder"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: state
      entity_id: weather.home
      state: "rainy"
  actions:
    - action: persistent_notification.create
      data:
        title: "Morning rain reminder"
        message: "Xiaomi Weather reports rain. Remember your umbrella."
        notification_id: "xiaomi_weather_morning_rain"
{% endexample %}

{% enddetails %}

## Data updates

The integration retrieves weather data every 15 minutes. Forecast requests use the most recently retrieved data and do not make an additional request to Xiaomi Weather.

## Known limitations

- Only mainland China cities are supported.
- City names and regions returned during setup may appear in Chinese.
- Air quality, weather alerts, and precipitation amounts are not provided by this integration.
- The integration uses an undocumented Xiaomi Weather service. Changes to that service may affect availability.

## Troubleshooting

### No matching city

Check that the selected location is in mainland China. If no city matches, select a nearby location on the map and try again. When multiple cities are listed, check the region and city code to distinguish cities with similar names.

### Weather cannot be retrieved

Check that Home Assistant has internet access, then retry. During setup, your location details are kept when a lookup or weather request fails.

If an existing weather entity becomes unavailable, the integration automatically retries and restores it after a successful update.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
