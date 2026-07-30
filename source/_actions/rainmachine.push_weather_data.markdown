---
title: "Push weather data"
action: rainmachine.push_weather_data
domain: rainmachine
description: "Sends weather data from Home Assistant to the RainMachine device."
related_actions:
  - rainmachine.push_flow_meter_data
---

The **Push weather data** action sends weather measurements from Home Assistant to a RainMachine controller. RainMachine uses this data to decide how much to water, so feeding it accurate local weather can improve its watering decisions.

This is useful when you have a personal weather station in Home Assistant and want RainMachine to use its readings instead of, or in addition to, online forecasts.

## Prerequisites

- Enable the local weather push service in RainMachine under **Settings** > **Weather** > **Developer** so the controller uses the values you send.

{% include actions/ui_header.md %}

To push weather data from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **RainMachine: Push weather data**.
6. Select the **Controller** and set the weather values you want to send.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Controller:
  description: The controller for the weather data to be pushed.
  required: true
Timestamp:
  description: UNIX timestamp for the weather data. If omitted, the controller's local time at the moment of the call is used.
  required: false
Min temperature:
  description: Minimum temperature in the current period, in °C.
  required: false
Max temperature:
  description: Maximum temperature in the current period, in °C.
  required: false
Temperature:
  description: Current temperature, in °C.
  required: false
Wind speed:
  description: Current wind speed, in m/s.
  required: false
Solar radiation:
  description: Daily solar radiation, in MJ/m²/d.
  required: false
Evapotranspiration:
  description: Evapotranspiration, in mm.
  required: false
Quantitative Precipitation Forecast:
  description: Quantitative Precipitation Forecast (QPF), in mm. Send the measured or forecasted value per hour or day, not a cumulative value.
  required: false
Measured rainfall:
  description: Measured rainfall, in mm. Send the measured or forecasted value per hour or day, not a cumulative value.
  required: false
Min relative humidity:
  description: Minimum relative humidity in the current period, in %RH.
  required: false
Max relative humidity:
  description: Maximum relative humidity in the current period, in %RH.
  required: false
Weather condition code:
  description: Current weather condition code (WNUM).
  required: false
Barometric pressure:
  description: Current barometric pressure, in kPa.
  required: false
Dew point:
  description: Current dew point, in °C.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rainmachine.push_weather_data`. A basic example looks like this:

{% example %}
action: |
  action: rainmachine.push_weather_data
  data:
    device_id: 4de41b1e3d8f0b6e3c0e2a3b1f5a7c9d
    temperature: 21.5
    rain: 2.4
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The controller for the weather data to be pushed.
  required: true
  type: string
timestamp:
  description: >
    UNIX timestamp for the weather data. If omitted, the controller's
    local time at the moment of the call is used.
  required: false
  type: integer
mintemp:
  description: >
    Minimum temperature in the current period, in °C.
  required: false
  type: float
maxtemp:
  description: >
    Maximum temperature in the current period, in °C.
  required: false
  type: float
temperature:
  description: >
    Current temperature, in °C.
  required: false
  type: float
wind:
  description: >
    Current wind speed, in m/s.
  required: false
  type: float
solarrad:
  description: >
    Daily solar radiation, in MJ/m²/d.
  required: false
  type: float
et:
  description: >
    Evapotranspiration, in mm.
  required: false
  type: float
qpf:
  description: >
    Quantitative Precipitation Forecast (QPF), in mm. Send the measured
    or forecasted value per hour or day, not a cumulative value.
  required: false
  type: float
rain:
  description: >
    Measured rainfall, in mm. Send the measured or forecasted value per
    hour or day, not a cumulative value.
  required: false
  type: float
minrh:
  description: >
    Minimum relative humidity in the current period, in %RH.
  required: false
  type: float
maxrh:
  description: >
    Maximum relative humidity in the current period, in %RH.
  required: false
  type: float
condition:
  description: >
    Current weather condition code (WNUM).
  required: false
  type: integer
pressure:
  description: >
    Current barometric pressure, in kPa.
  required: false
  type: float
dewpoint:
  description: >
    Current dew point, in °C.
  required: false
  type: float
{% endoptions_yaml %}

## Good to know

- Send all values in metric units. The integration does not convert units for you.
- For the weather condition code (WNUM) options, see the [RainMachine weather data reference](https://github.com/sprinkler/rainmachine-developer-resources/blob/d47e1ad59dee59e34094ad41636ae289275eb973/sdk-parsers/RMDataFramework/rmWeatherData.py#L13).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
