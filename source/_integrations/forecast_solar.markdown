---
title: Forecast.Solar
description: Instructions on how to integrate Forecast.Solar within Home Assistant.
ha_category:
  - Energy
ha_release: 2021.7
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@klaasnicolaas'
  - '@frenck'
ha_domain: forecast_solar
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

The **Forecast.Solar** {% term integration %} estimates how much energy your solar panels will produce, using the [Forecast.Solar](https://forecast.solar/) service. The forecast combines the location, orientation, and size of your panels with historic averages and weather data, so you can plan ahead and use your own solar energy as efficiently as possible.

For example, you could use the forecast to decide whether you will produce enough solar energy in the next hour to run the washing machine, or whether to charge your electric vehicle from the sun tomorrow instead of from the grid overnight.

## Prerequisites

Forecast.Solar uses data from the [EU Photovoltaic Geographical Information System](https://re.jrc.ec.europa.eu/pvg_tools/en/tools.html), which covers almost the entire world. Your panels need to be in a location that this tool covers.

To create a forecast, the integration needs a few details about your solar setup:

- **Location**: The latitude and longitude of your panels. By default, the integration tracks your Home Assistant home location, so it keeps working automatically if you move it, such as for a solar setup on a camper, RV, or boat. You can turn this off and enter a fixed latitude and longitude instead.
- **Declination**: The tilt of your panels in degrees. A value of `0` means the panels lie flat, facing straight up, and `90` means they stand fully upright. You can enter this manually, or, if you have a sensor that reports an angle, select it instead so the tilt updates automatically.
- **Azimuth**: The compass direction the panels face, on a 360 degree scale. `0` is north, `90` is east, `180` is south, and `270` is west. As with declination, you can enter this manually or select an angle sensor to track it automatically.
- **Total Watt peak power**: The combined maximum power of all your panels, in Watt peak. Add up the peak power of every panel in the group to get this value.

Angle sensors are only offered as an option if Home Assistant has at least one sensor that reports its unit of measurement in degrees.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Use my Home Zone for Latitude / Longitude:
  description: "Enabled by default. Tracks the location set in your Home Assistant settings, so the forecast follows a mobile installation automatically."
Latitude:
  description: "The latitude of your solar panels. Only used if **Use my Home Zone for Latitude / Longitude** is turned off."
Longitude:
  description: "The longitude of your solar panels. Only used if **Use my Home Zone for Latitude / Longitude** is turned off."
Declination (0 = Horizontal, 90 = Vertical). Ignored if sensor is selected.:
  description: "The tilt of your panels in degrees, from 0 (flat) to 90 (upright)."
Declination sensor:
  description: "Optional. A sensor that reports the panel's tilt in degrees. Overrides the manual declination value when set. Only offered if you have a sensor reporting an angle."
Azimuth (360 degrees, 0 = North, 90 = East, 180 = South, 270 = West). Ignored if sensor is selected.:
  description: "The direction your panels face on a 360 degree scale."
Azimuth sensor:
  description: "Optional. A sensor that reports the panel's compass direction in degrees. Overrides the manual azimuth value when set. Only offered if you have a sensor reporting an angle."
Total Watt peak power of your solar modules:
  description: "The combined maximum power of all panels in this group, in Watt peak."
{% endconfiguration_basic %}

If you leave **Use my Home Zone for Latitude / Longitude** turned off, you must enter a latitude and longitude, or the setup will show an error.

To change the location settings later, go to {% my integrations title="**Settings** > **Devices & services**" %}, select the **Forecast.Solar** integration, and choose **Reconfigure**.

## Configuration options

After setup, you can fine-tune the forecast. Go to {% my integrations title="**Settings** > **Devices & services**" %}, select the **Forecast.Solar** integration, and then select the cogwheel {% icon "mdi:cog-outline" %} (**Configure**).

{% configuration_basic %}
API key:
  description: "The API key for your Forecast.Solar account. An account is only needed for more frequent updates or more than one plane. See [Using a Forecast.Solar account](#using-a-forecastsolar-account)."
Damping factor (morning):
  description: "Lower the forecast for the morning. See [Tweaking the estimations](#tweaking-the-estimations)."
Damping factor (evening):
  description: "Lower the forecast for the evening. See [Tweaking the estimations](#tweaking-the-estimations)."
Inverter size (Watt):
  description: "The maximum power of your inverter. See [Tweaking the estimations](#tweaking-the-estimations)."
{% endconfiguration_basic %}

## Adding multiple planes

A plane is a group of panels that share the same orientation. If your setup has panels facing different directions, such as an east-west roof, you can add each orientation as a separate plane within the same integration.

Adding more than one plane requires a paid Forecast.Solar account. See [Using a Forecast.Solar account](#using-a-forecastsolar-account). You can configure up to four planes, and the integration combines their data into a single set of sensors, taking your inverter size into account if you set one.

Each plane has its own declination and azimuth, and, like the first plane, can use an angle sensor instead of a fixed value for either.

To add a plane:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Forecast.Solar**.
2. Select **Add plane**.

## Using a Forecast.Solar account

You can use the public [Forecast.Solar](https://forecast.solar/) service for free, but the data has a lower resolution, the forecast updates less often, and you can configure only a single plane.

If you would like more frequent updates or want to add multiple planes, you can [sign up for one of their plans](https://doc.forecast.solar/doku.php?id=account_models#compare_plans). The Personal Plus tier and above let you configure up to four planes.

To use your account, add the API key in the integration's configuration options, as described under [Configuration options](#configuration-options).

## Tweaking the estimations

A forecast will never perfectly match what your panels produce, because it is based on weather and historical data rather than the power you actually generate. Even so, you can make it more accurate for your situation in a few ways:

- Fine-tune the **azimuth** and **declination** if the real orientation of your panels differs slightly from what you first entered, or select an angle sensor for either so it tracks a moving or adjustable mount automatically. To change these, reconfigure the plane from the integration page.
- Set a damping factor for the morning and the evening if your panels catch some shade early or late in the day. Damping lowers the forecast at those times, making it less optimistic and closer to your reality.
- Set the inverter size if your inverter can deliver less power than your panels can produce together, so the forecast does not exceed what your inverter can handle.

You can change the damping factors and inverter size at any time under [Configuration options](#configuration-options). For more background on damping, see the [Forecast.Solar damping documentation](https://doc.forecast.solar/damping).

## Supported functionality

The integration provides sensors that you can show on a dashboard or use in automations.

The following sensors are enabled by default:

- **Estimated energy production - today**: Total estimated production for today, in kWh.
- **Estimated energy production - remaining today**: Estimated production still to come today, in kWh.
- **Estimated energy production - tomorrow**: Total estimated production for tomorrow, in kWh.
- **Estimated energy production - this hour**: Estimated production for the current hour, in kWh.
- **Estimated energy production - next hour**: Estimated production for the next hour, in kWh.
- **Estimated power production - now**: Estimated power being produced right now, in Watt.
- **Highest power peak time - today**: The time of the highest expected power peak today.
- **Highest power peak time - tomorrow**: The time of the highest expected power peak tomorrow.

The following sensors are disabled by default. Enable them in the user interface if you want to use them:

- **Estimated power production - in 1 hour**: Estimated power production one hour from now, in Watt.
- **Estimated power production - in 12 hours**: Estimated power production twelve hours from now, in Watt.
- **Estimated power production - in 24 hours**: Estimated power production twenty-four hours from now, in Watt.

## Using the forecast in the Energy dashboard

If you track your solar panels in the [Energy dashboard](/docs/energy/solar-panels/), you can pair them with Forecast.Solar. The solar production graph then shows the forecasted production alongside what your panels actually generate, so you can see at a glance whether the day is living up to its prediction.

To add the forecast:

1. Go to {% my energy title="**Settings** > **Dashboards** > **Energy**" %}.
2. Under **Solar panels**, select your solar production entry. If you have not set one up yet, see [integrating your solar panels](/docs/energy/solar-panels/) first.
3. Turn on the solar production forecast option and select **Forecast.Solar**.
4. Save your changes.

The Energy dashboard now overlays the expected production on your solar graph.

## Data updates

How often the forecast {% term polling updates %} depends on your Forecast.Solar account:

- Free accounts update every hour.
- Accounts with an API key update every 30 minutes.

The forecast always remains an estimate based on weather and historical data, not a measurement of the power your panels actually produce.

## Known limitations

- The free service offers a lower data resolution, updates less often, and supports only a single plane. More frequent updates and multiple planes require a paid Forecast.Solar account.
- Your panel location must be covered by the EU Photovoltaic Geographical Information System.
- If an angle sensor you selected for declination or azimuth becomes unavailable or reports a value outside its valid range, the forecast update fails until the sensor recovers.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
