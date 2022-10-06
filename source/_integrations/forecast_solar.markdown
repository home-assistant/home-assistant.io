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
ha_quality_scale: platinum
ha_integration_type: integration
---

The [Forecast.Solar](https://forecast.solar/) service provides solar production
forecasting for your solar panel system, based on historic averages combined
with weather forecasting.

This integration provides an estimated forecast on how much energy your solar
panels are going to produce, allowing you to plan ahead on how you spend your
produced energy in most efficiently.

As an example automation idea, you could determine if:

- You are going to produce enough solar power energy for the washing machine to
  run the next hour.
- You have an electric vehicle: to determine if you will produce enough solar
  energy tomorrow to charge your vehicle; or if not, charge it (partly)
  overnight at low tariffs instead.

## Prerequisites

Forecast.Solar relies on data provided by the [EU Photovoltaic geographical information system](https://re.jrc.ec.europa.eu/pvg_tools/en/tools.html) and your solar panels must be in a location that is covered by this tool. Data is available for almost the entire world. 

To use the Forecast.Solar integration, it will need some information about your
solar panel system: **latitude**, **longitude**, **declination**, **azimuth**
and **total modules power**.

It needs the specific location (defined by **latitude** and **longitude**),
which by default is taken from your Home Assistant configured "home" location.

The **declination** angle (tilt) of your solar planes (in degrees);
Is the angle between your solar panels and the earth's surface. A value of
`0` means they horizontal and flat on the earth's surface, while a value
of `90` means your panels are standing up vertically.

The **azimuth** (in degrees on a 360° scale);
Is the direction in which the front surface of your solar panels are facing
towards. As a full circle is 360°, a value of  `0` is facing North, `90` East,
`180` South and `270` is facing West (or any value in between).

The **total modules power** (in Watt peak);
Each solar panel, in a solar panel system, has a maximum power peak production
value. In order to deliver matching estimations for you system, Forecast.Solar
needs to be aware of the total maximum peak power your system can produce.
Add up the maximum peak power (in Watts!) of all your panels for this
value.

{% include integrations/config_flow.md %}

## Sensors

The Forecast.Solar integration mainly provides sensors that you can use in your
automations.

- Estimated Energy Production - Today (in kWh)
- Estimated Energy Production - Tomorrow (in kWh)
- Estimated Energy Production - This Hour (in kWh)
- Estimated Energy Production - Next Hour (in kWh)
- Estimated Power Production - Now (in Watt)

It also provides sensors that will tell you at which date & time your peak
production will be (for today and tomorrow):

- Highest Power Peak Time - Today
- Highest Power Peak Time - Tomorrow

There are some additionally, less common sensors, that are disabled by
default. Enable those entities in the user interface if you like to use these:

- Estimated Power Production - Next Hour (in Watt)
- Estimated Power Production - Next 12 Hours (in Watt)
- Estimated Power Production - Next 24 Hours (in Watt)

## Using your Solar.Forecast account

The [Forecast.Solar](https://forecast.solar/) can be used for free, but
the resolution of the data used is more limited and thus, there are less
details for this integration to work with.

If you like the Forecast.Solar service, or are interested in more frequent data
updates (based on a higher data resolution), you could [sign up for one
of their plans](https://doc.forecast.solar/doku.php?id=account_models#compare_plans).

To enable the use of the API key with this integration, to {% my integrations %}
and click "Configure" on the Forecast.Solar integration instance and enter the
API key for your account.

## Tweaking the estimations

The estimation can be tweaked and tuned to match your solar setup better.
Many factors that can cause the estimations to be slightly off
(but don't forget, it will always remain a forecast based on, e.g., weather
and historical data).

Luckily there are controls to make them more accurate for your situation,
for example, by slightly adjusting the azimuth or declination. If your panels
catch a bit of shadow in the morning/evening, you could consider damping
the results a bit.

The **damping** factor allows you to adjust and "damp" the results of your solar
predictions in the morning and evening a bit and is a great method to make
results less optimistic and more tuned to your reality.

The **inverter** size can be used in a situation where the maximum power of your
inverter is lower than the total power of all your solar panels (as entered under
"total modules power") together. As a result, the forecast takes into account that
the maximum solar power cannot exceed what your inverter can handle, giving you
a more realistic forecast graph.

[Read more about the damping factor in the Forecast.Solar documentation](https://doc.forecast.solar/doku.php?id=damping&s[]=damping).

To adjust the configuration settings for your Solar.Forecast integration
instance:

- Browse to your Home Assistant instance.
- In the sidebar click on _**{% my config icon %}**_.
- From the configuration menu select: _**{% my integrations %}**_.
- If multiple instances of {{ name }} are configured, choose the instance you want to configure.
- Click on _**"Configure"**_.
