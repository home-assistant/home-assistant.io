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

- **Location**: The latitude and longitude of your panels. You can enter fixed coordinates, or let the integration follow your Home Assistant home location, so the forecast keeps up if that location changes, such as for a solar setup on a camper van, motorhome, or boat.
- **Declination**: The tilt of your panels in degrees. A value of `0` means the panels lie flat, facing straight up, and `90` means they stand fully upright. You can enter a fixed tilt or select a sensor that reports it.
- **Azimuth**: The compass direction the panels face, on a 360-degree scale. `0` is north, `90` is east, `180` is south, and `270` is west. You can enter a fixed direction or select a sensor that reports it, such as a compass.
- **Total Watt peak power**: The combined maximum power of all your panels, in Watt peak. Add up the peak power of every panel in the group to get this value.

{% include integrations/config_flow.md %}

Setup has two steps. In the first step, you choose where the location and the panel angles come from:

{% configuration_basic %}
Location:
  description: "Where the location comes from. Select **Enter fixed coordinates** to enter the latitude and longitude of your panels. The forecast keeps using them even if your Home Assistant home location changes. Select **Follow the Home Assistant location, for homes that move such as campers or boats** to use your home location and follow it when it changes. You don't need to enter any coordinates."
Declination:
  description: "Where the tilt comes from. Select **Enter a fixed tilt** or **Read the tilt from a sensor**."
Azimuth:
  description: "Where the direction comes from. Select **Enter a fixed direction** or **Read the direction from a sensor, such as a compass**."
{% endconfiguration_basic %}

The second step asks only for what you chose in the first step. For each angle, you enter either a fixed value or a sensor, never both.

{% configuration_basic %}
Latitude:
  description: "The latitude of your solar panels. Only asked for if you selected **Enter fixed coordinates**. Pre-filled with your Home Assistant home location."
Longitude:
  description: "The longitude of your solar panels. Only asked for if you selected **Enter fixed coordinates**. Pre-filled with your Home Assistant home location."
Declination (0 = Horizontal, 90 = Vertical):
  description: "The tilt of your panels in degrees, from 0 (flat) to 90 (upright). Only asked for if you selected **Enter a fixed tilt**."
Declination sensor:
  description: "A sensor that reports the tilt of your panels. Only asked for if you selected **Read the tilt from a sensor**. The sensor must report a value from 0 to 90. It doesn't need to use degrees as its unit."
Azimuth (360 degrees, 0 = North, 90 = East, 180 = South, 270 = West):
  description: "The direction your panels face on a 360-degree scale. Only asked for if you selected **Enter a fixed direction**."
Azimuth sensor:
  description: "A sensor that reports the direction your panels face. Only asked for if you selected **Read the direction from a sensor, such as a compass**. The sensor can report a value from 0 to 360 or from -180 to 180. Both are accepted. It doesn't need to use degrees as its unit."
Total Watt peak power of your solar modules:
  description: "The combined maximum power of all panels in this group, in Watt peak."
{% endconfiguration_basic %}

The form doesn't accept a sensor whose current state isn't a usable angle, such as a non-numeric or out-of-range value. A sensor that is `unavailable`, `unknown`, or has no state yet is accepted. When you reconfigure a plane, a sensor it already uses isn't checked again, so a sensor that is briefly unusable doesn't stop you from changing other settings.

If you rename a sensor's entity ID, the plane keeps using it automatically.

### Changing the location

Reconfiguring the integration only changes the location. To change the location:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Forecast.Solar**.
2. Select **Reconfigure**. Your current choice is already selected.
3. Select one of the following, then select **Submit**:
   - **Follow the Home Assistant location, for homes that move such as campers or boats**: Applies right away.
   - **Enter fixed coordinates**: Shows the latitude and longitude, pre-filled with the current coordinates, so you can change them.

To change the angles or power of a plane, reconfigure the plane instead. See [Reconfiguring a plane](#reconfiguring-a-plane).

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

Adding a plane uses the same two steps as setup, without the **Location** choice. When a plane uses a sensor, its title shows the sensor's entity ID, for example `30° / sensor.roof_azimuth / 5100W`. If you rename the sensor's entity ID, the title follows. If you give the plane your own title, it is kept.

To add a plane:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Forecast.Solar**.
2. Select **Add plane**.

### Reconfiguring a plane

Reconfiguring a plane also uses the same two steps, without the **Location** choice. It starts with the plane's current choices selected and its current values filled in. This is also how you switch an angle between a fixed value and a sensor.

To reconfigure a plane:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Forecast.Solar**.
2. Next to the plane, select the three dots {% icon "mdi:dots-vertical" %} menu, then select **Reconfigure**.

## Using a Forecast.Solar account

You can use the public [Forecast.Solar](https://forecast.solar/) service for free, but the data has a lower resolution, the forecast updates less often, and you can configure only a single plane.

If you would like more frequent updates or want to add multiple planes, you can [sign up for one of their plans](https://doc.forecast.solar/doku.php?id=account_models#compare_plans). The Personal Plus tier and above let you configure up to four planes.

To use your account, add the API key in the integration's configuration options, as described under [Configuration options](#configuration-options).

## Tweaking the estimations

A forecast will never perfectly match what your panels produce, because it is based on weather and historical data rather than the power you actually generate. Even so, you can make it more accurate for your situation in a few ways:

- Fine-tune the **Azimuth** and **Declination** if the real orientation of your panels differs slightly from what you first entered, or select a sensor for either so it follows a moving or adjustable mount. To change these, [reconfigure the plane](#reconfiguring-a-plane).
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

{% include integrations/actions.md %}

## Examples

### Automation: Act on a high solar forecast for tomorrow

This example sends a notification when the estimated energy production for tomorrow rises above 10 kWh.

```yaml
alias: "High solar forecast tomorrow"
triggers:
  - trigger: numeric_state
    entity_id: sensor.energy_production_tomorrow
    above: 10
actions:
  - action: notify.send_message
    target:
      entity_id: notify.my_device
    data:
      message: "More than 10 kWh of solar production is forecast for tomorrow."
```

### Automation: Act at the solar production peak

This example sends a notification at today's forecast highest-power-peak time.

```yaml
alias: "Forecast.Solar production peak"
triggers:
  - trigger: time
    at: sensor.power_highest_peak_time_today
actions:
  - action: notify.send_message
    target:
      entity_id: notify.my_device
    data:
      message: "The forecast solar production peak has started."
```

## Data updates

How often the forecast {% term polling updates %} depends on your Forecast.Solar account:

- Free accounts update every hour.
- Accounts with an API key update every 30 minutes.

Because Forecast.Solar limits how often the forecast can be requested, the integration reads your declination and azimuth sensors at each scheduled update, not the moment they change.

When the integration follows your Home Assistant home location, a change to that location refreshes the forecast right away. To stay within the Forecast.Solar rate limit, a location that keeps changing, such as on a moving camper, refreshes the forecast at most once per update interval.

The forecast always remains an estimate based on weather and historical data, not a measurement of the power your panels actually produce.

## Known limitations

- The free service offers a lower data resolution, updates less often, and supports only a single plane. More frequent updates and multiple planes require a paid Forecast.Solar account.
- Your panel location must be covered by the EU Photovoltaic Geographical Information System.
- Declination and azimuth sensors are read at each scheduled forecast update, not the moment they change. See [Data updates](#data-updates).
- A selected sensor is never replaced by a fixed value. If a sensor can't be read after setup, the forecast keeps using its last reading and logs a warning once. When the sensor can be read again, the next forecast update uses its new value. The last reading isn't kept across a restart or a reload of the integration. If the sensor still can't be read at that point, setup retries. See [Setup keeps retrying because of a sensor](#setup-keeps-retrying-because-of-a-sensor).

## Troubleshooting

### Setup keeps retrying because of a sensor

#### Symptom: setup retries with an error that names a sensor

The integration shows that it is retrying setup, and the error names a declination or azimuth sensor.

#### Description

During setup, including after a restart or a reload of the integration, every selected sensor must be readable. A sensor can't be read if it doesn't exist, is `unavailable` or `unknown`, reports something that isn't a number, or reports a value that is out of range. The integration keeps retrying until the sensor can be read. If Home Assistant is still starting, it retries as soon as startup finishes.

#### Resolution

1. Check that the sensor named in the error exists and reports a number in the accepted range. Refer to the sensor descriptions under [Configuration](#configuration).
2. If you deleted the sensor, reconfigure the plane and select another sensor or a fixed value. Refer to [Reconfiguring a plane](#reconfiguring-a-plane).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
