---
description: Instructions on how to integrate the Tomorrow.io Weather and Air Quality API into Home Assistant.
ha_release: 2022.4
ha_domain: tomorrowio
---

The **Tomorrow.io** {% term integration %} allows you to obtain weather, air quality, pollen, and fire information from the [Tomorrow.io API](https://www.tomorrow.io/weather-api/).

## Obtain an API key

You can obtain a free API key by signing up with [Tomorrow.io](https://www.tomorrow.io/weather-api/). The integration assumes that your API key is associated with a free Tomorrow.io account. Free accounts include a limited number of daily API requests and the number of daily API requests included varies by account. Log in to Tomorrow.io to view the number of daily API requests included with your account.

The refresh interval defaults to a time period that is compatible with an account limited to 100 daily API requests and this integration should use around 90% of the available daily requests.

When using a free account, the information provided by Tomorrow.io is limited to the [Core layer](https://docs.tomorrow.io/reference/data-layers-core). It does not include the Air Quality layer or other layers. A paid Tomorrow.io account is required to retrieve those layers.

## Forecasts

Each location has a weather {% term entity %} that provides these forecasts:

| Forecast | Coverage                                                                   | How to get it                                                                           |
|----------|----------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| Daily    | The next 14 days                                                           | The `weather.get_forecasts` action with type `daily`                                    |
| Hourly   | The next 24 hours                                                          | The `weather.get_forecasts` action with type `hourly`                                   |
| Nowcast  | Up to 30 intervals of 1 to 60 minutes, depending on the location's setting | The [`tomorrowio.get_minute_forecast`](/actions/tomorrowio.get_minute_forecast/) action |

Locations set up before Home Assistant 2023.9 can also have separate Hourly and Nowcast weather entities. They provide the same forecasts as the main entity.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "Your Tomorrow.io API key."
{% endconfiguration_basic %}

The integration creates one entry per API key. The places you want weather and air quality data for are added to that entry as locations.

{% note %}
If you set up Tomorrow.io before this version, your existing entries are migrated automatically: locations sharing an API key are collected under a single entry, and their entities, devices, and history are preserved.
{% endnote %}

## Adding a location

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Tomorrow.io** integration.
2. Select **Add location**.
3. Enter a name and pick the location on the map.
4. Optionally adjust **Minutes between NowCast forecasts** (1, 5, 15, 30, or 60), which sets the interval length of the forecasts returned by the [`tomorrowio.get_minute_forecast`](/actions/tomorrowio.get_minute_forecast/) action.

### Changing a location

To change a location's name, coordinates, or NowCast timestep, select the three-dot menu next to the location and select **Reconfigure location**.

## Data updates

All of an API key's locations are {% term polling polled %} together in one cycle. The polling interval is calculated from your account's daily request limit and the number of configured locations, keeping usage at about 90% of the available daily requests.

The `weather.get_forecasts` and `tomorrowio.get_minute_forecast` actions return data from the latest update and don't use any API requests.
