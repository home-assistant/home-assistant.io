---
title: Xiaomi Weather
description: Get current weather and forecasts for mainland China cities with Xiaomi Weather in Home Assistant.
ha_category:
  - Weather
ha_release: "2026.10"
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@shirok1'
ha_domain: xiaomi_weather
ha_platforms:
  - weather
ha_integration_type: service
related:
  - docs: /integrations/weather/
    title: Weather entity
---

The **Xiaomi Weather** {% term integration %} provides current weather and daily, hourly, and twice-daily forecasts for cities in mainland China. You can choose a city or use the coordinates of your home or another location.

## Prerequisites

Your Home Assistant instance needs internet access to retrieve data from Xiaomi Weather. You do not need a Xiaomi device, account, or API key.

{% include integrations/config_flow.md %}

1. Choose how to find your weather location:
   - **Use Home or another zone**: Select a zone. The integration uses its coordinates to find a city. The default is your home zone.
   - **Search for a city**: Enter a city name, such as `北京`, or a nine-digit city code, such as `101010100` for Beijing.
   - **Enter coordinates**: Enter the latitude and longitude to find a city.
2. On **Choose a city**, check the city name, region, and code, then select the matching city. Select a city even if only one result is shown.
3. On **Review location**, check the city and coordinates, then submit to verify weather access and finish setup. To go back, select **Choose a different location** and submit.

To add another city, add the integration again. Each city can be configured only once, even if you use different coordinates.

### Location settings

{% configuration_basic %}
Zone:
  description: "The zone whose coordinates you want to use. Available with **Use Home or another zone** and defaults to your home zone. The location name defaults to the zone name."
City name or code:
  description: "A mainland China city name or a nine-digit weather city code starting with `101`. Required with **Search for a city**. For zone or coordinate setup, expand **Specify a city (optional)** to choose a city instead of matching one automatically."
Latitude:
  description: "The latitude of your weather location, from -90 to 90. Required with **Enter coordinates**. When searching for a city, expand **Specify coordinates (optional)** to override the city center. Enter both coordinates or leave both empty to use the city center."
Longitude:
  description: "The longitude of your weather location, from -180 to 180. Use it together with latitude. If you specify a city during zone or coordinate setup, the coordinates you provided are retained."
{% endconfiguration_basic %}

## Reconfiguring the location

Zone coordinates are saved during setup. Changes to a zone do not automatically update the weather location.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Xiaomi Weather**.
2. Next to the entry you want to change, select the three dots {% icon "mdi:dots-vertical" %} menu, then **Reconfigure**.
3. Choose a location source and enter the updated details. If you search for a city without specifying coordinates, the integration uses the city center rather than your previous coordinates.
4. Select the same city as the existing entry, review the location, and submit.

Reconfiguration keeps the existing weather entity. To use a different city, add another integration entry.

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

Missing measurements or unusable forecast periods are omitted. The number of forecast periods depends on the available data.

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

If you use the YAML example, replace `weather.home` with your Xiaomi Weather entity. You can adjust the time to suit your routine. The notification ID makes subsequent reminders update the same notification.

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

Try a more specific city name or its nine-digit weather code. Check the region and code in the results to distinguish cities with similar names. If automatic matching from a zone or coordinates does not find the city you want, expand **Specify a city (optional)** and enter its name or code.

### Weather cannot be retrieved

Check that Home Assistant has internet access, then retry. During setup, your location details are kept when a lookup or weather request fails.

If an existing weather entity becomes unavailable, the integration automatically retries and restores it after a successful update.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
