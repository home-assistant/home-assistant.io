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

- **Location**: The latitude and longitude of your panels. The integration can follow your Home Assistant home location, so the forecast keeps up if that location changes, such as for a solar setup on a camper van, motorhome, or boat. You can also enter fixed coordinates instead.
- **Declination**: The tilt of your panels in degrees. A value of `0` means the panels lie flat, facing straight up, and `90` means they stand fully upright. You can also select a sensor that reports the tilt, so the forecast uses its value instead.
- **Azimuth**: The compass direction the panels face, on a 360-degree scale. `0` is north, `90` is east, `180` is south, and `270` is west. As with declination, you can also select a sensor that reports the direction.
- **Total Watt peak power**: The combined maximum power of all your panels, in Watt peak. Add up the peak power of every panel in the group to get this value.

{% include integrations/config_flow.md %}

Setup starts by asking how to determine the location of your solar panels:

- **Follow the Home Assistant location**: The forecast uses your Home Assistant home location, and follows it if that location changes. You don't need to enter any coordinates.
- **Use fixed coordinates**: You enter the latitude and longitude of your panels. The forecast uses these coordinates, even if your Home Assistant home location changes.

Both options then ask for the details of your panels.

{% configuration_basic %}
Latitude:
  description: "The latitude of your solar panels. Only asked for if you selected **Use fixed coordinates**."
Longitude:
  description: "The longitude of your solar panels. Only asked for if you selected **Use fixed coordinates**."
Declination (0 = Horizontal, 90 = Vertical):
  description: "The tilt of your panels in degrees, from 0 (flat) to 90 (upright). If you select a declination sensor, the forecast uses this value as a fallback."
Declination sensor:
  description: "Optional. A sensor that reports the tilt of your panels. When selected, its value overrides the fixed declination. The value must be between 0 and 90 degrees."
Azimuth (360 degrees, 0 = North, 90 = East, 180 = South, 270 = West):
  description: "The direction your panels face on a 360-degree scale. If you select an azimuth sensor, the forecast uses this value as a fallback."
Azimuth sensor:
  description: "Optional. A sensor that reports the direction your panels face. When selected, its value overrides the fixed azimuth. The value can be between -360 and 360 degrees. Any convention works, so a compass that reports -180 to 180 gives the same result as one that reports 0 to 360."
Total Watt peak power of your solar modules:
  description: "The combined maximum power of all panels in this group, in Watt peak."
{% endconfiguration_basic %}

The sensor fields are always shown, and you can select any sensor entity. The fixed declination and azimuth are still required, because the forecast falls back to them when a sensor can't be used. This happens if the sensor is missing, `unavailable`, or `unknown`, or if it reports something that isn't a number or is out of range. The integration then logs a warning, and its entities stay available. As soon as the sensor reports a valid value again, the forecast uses it again.

Sensor values and your Home Assistant home location are read at each scheduled forecast update, not the moment they change. See [Data updates](#data-updates) for how often that is.

If you rename a sensor's entity ID, the plane keeps using it automatically. If you delete the sensor, the plane falls back to its fixed angle until you select a different sensor by reconfiguring the plane.

### Changing the location

To switch between following the Home Assistant location and using fixed coordinates, go to {% my integrations title="**Settings** > **Devices & services**" %}, select the **Forecast.Solar** integration, and select **Reconfigure**. Then choose one of the same options as during setup:

- **Follow the Home Assistant location**: Applies immediately.
- **Use fixed coordinates**: Shows the latitude and longitude, pre-filled with the current coordinates, so you can change them.

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

Each plane has the same fields as the first plane, including the optional declination and azimuth sensors. When a plane uses a sensor, its title shows the sensor's name followed by "(sensor)", for example `roof declination (sensor) / 190° / 5100W`.

To add a plane:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Forecast.Solar**.
2. Select **Add plane**.

## Using a Forecast.Solar account

You can use the public [Forecast.Solar](https://forecast.solar/) service for free, but the data has a lower resolution, the forecast updates less often, and you can configure only a single plane.

If you would like more frequent updates or want to add multiple planes, you can [sign up for one of their plans](https://doc.forecast.solar/doku.php?id=account_models#compare_plans). The Personal Plus tier and above let you configure up to four planes.

To use your account, add the API key in the integration's configuration options, as described under [Configuration options](#configuration-options).

## Tweaking the estimations

A forecast will never perfectly match what your panels produce, because it is based on weather and historical data rather than the power you actually generate. Even so, you can make it more accurate for your situation in a few ways:

- Fine-tune the **azimuth** and **declination** if the real orientation of your panels differs slightly from what you first entered, or select a sensor for either so it follows a moving or adjustable mount. To change these, reconfigure the plane from the integration page.
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

Forecast.Solar limits how often the forecast can be requested, so values from declination and azimuth sensors and changes to your Home Assistant home location are only picked up at the next scheduled update.

The forecast always remains an estimate based on weather and historical data, not a measurement of the power your panels actually produce.

## Known limitations

- The free service offers a lower data resolution, updates less often, and supports only a single plane. More frequent updates and multiple planes require a paid Forecast.Solar account.
- Your panel location must be covered by the EU Photovoltaic Geographical Information System.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
