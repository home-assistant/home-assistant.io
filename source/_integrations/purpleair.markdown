---
title: PurpleAir
description: Instructions on how to integrate PurpleAir sensors with Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 2023.1
ha_codeowners:
  - '@bachya'
ha_domain: purpleair
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: integration
ha_config_flow: true
---

[PurpleAir](https://www2.purpleair.com/) makes sensors that measure hyper-local air
quality data and share it with the public.

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Add Sensor:
  description: Track an additional sensor.
Remove Sensor:
  description: Untrack a sensor.
Settings:
  description: Configure additional settings (e.g., show/hide sensor icons on the map).
{% endconfiguration_basic %}

## Creating an API key

To add this integration, you need a (free) Purple Air API Key. A new account currently comes with 1 million free points. After that, you need to buy additional points to continue to use the API. The current plugin uses ~30K points/day. The 1 million points last about a month. A lack of points will trigger API errors until you buy more points.

Detailed instructions can be found [here](https://community.purpleair.com/t/creating-api-keys/3951) but in summary you:

- Create an account at https://develop.purpleair.com/ (which uses Single Sign-On through a Google account).
- On the ['keys'](https://develop.purpleair.com/keys) page press the "plus" button to create an API key.  Leave the defaults of **Read** and **Enabled**.
- Go to the ['projects'](https://develop.purpleair.com/projects) page and select the edit (pencil) button on the listed Project.  Add points (for example 1,000,000), then select **Update**.
- Go back to the ['keys'](https://develop.purpleair.com/keys) page and copy the API key.  It will be a value like XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXXX.
- Paste that API key into the **API Key** field when creating the integration in Home Assistant.

Note that if you are using your own sensor, it will need to be set to **Public** to be visible.


## Creating an AQI Rating from Raw Particulate Data

The PurpleAir API does not provide AQI data; therefore, the integration does not create
an AQI sensor automatically. However, sensors providing raw particulate data can be used
to create a human-friendly AQI rating sensor.

{% warning %}
The guidelines within this documentation constitute estimates and are intended to help
informed decision making. They should not replace analysis, advice or diagnosis from a
trained medical professional.
{% endwarning %}

### Understanding EPA Guidelines

The United States Environmental Protection Agency (EPA) provides
[guidelines](https://aqs.epa.gov/aqsweb/documents/codetables/aqi_breakpoints.html) on
correlating the concentration of pollution over a time period to overall "healthiness."
For example, a PM2.5 concentration between 0.0 and 12.0 µg/m³ over a 24-hour period
equates to a "Good" AQI rating.

Therefore, a common strategy would be to use the guidelines for the particulate types
provided by the PurpleAir integration and "merge" them into a single AQI rating.

### Creating Statistics Sensors

With the EPA guidelines in hand, the next step is to create
[`statistics`](/integrations/statistics/) sensors for each particulate sensor you are
interested. This example uses PM2.5 and PM10.0 over a 24-hour period:

{% note %}
The entity IDs provided below are simulated; make sure that you use entity IDs that
actually exist in your Home Assistant instance.
{% endnote %}

```yaml
sensor:
  - platform: statistics
    name: "Average Outdoor PM2.5 (24h)"
    entity_id: sensor.sensor_pm2_5_mass_concentration
    state_characteristic: mean
    max_age:
      hours: 24

  - platform: statistics
    name: "Average Outdoor PM10.0 (24h)"
    entity_id: sensor.sensor_pm10_0_mass_concentration
    state_characteristic: mean
    max_age:
      hours: 24
```

### Creating the AQI Rating Sensor

The [`statistics`](/integrations/statistics/) sensors can then be combined into a template
sensor. Note that this example takes a conservative approach: the "worse" of the two
values (PM2.5 or PM10.0) is used to determine the overall rating.

{% tip %}
Reminder that the breakpoints used below can be determined from the aforementioned EPA
guidelines.
{% endtip %}

{% raw %}

```yaml
template:
  - sensor:
    - name: "Local Outdoor Air Quality"
      state: >
        {% set pm2_5_avg = states("sensor.average_outdoor_pm2_5_24h") | int %}
        {% if 0 <= pm2_5_avg <= 12.0 %}
          {% set pm2_5_rating = 0 %}
        {% elif 12.0 < pm2_5_avg <= 35.4 %}
          {% set pm2_5_rating = 1 %}
        {% elif 35.4 < pm2_5_avg <= 55.4 %}
          {% set pm2_5_rating = 2 %}
        {% elif 55.4 < pm2_5_avg <= 150.4 %}
          {% set pm2_5_rating = 3 %}
        {% elif 150.4 < pm2_5_avg <= 250.4 %}
          {% set pm2_5_rating = 4 %}
        {% else %}
          {% set pm2_5_rating = 5 %}
        {% endif %}

        {% set pm10_0_avg = states("sensor.average_outdoor_pm10_0_24h") | int %}
        {% if 0 <= pm10_0_avg <= 54.0 %}
          {% set pm10_0_rating = 0 %}
        {% elif 54.0 < pm10_0_avg <= 154.0 %}
          {% set pm10_0_rating = 1 %}
        {% elif 154.0 < pm10_0_avg <= 254.0 %}
          {% set pm10_0_rating = 2 %}
        {% elif 254.0 < pm10_0_avg <= 354.0 %}
          {% set pm10_0_rating = 3 %}
        {% elif 354.0 < pm10_0_avg <= 424.0 %}
          {% set pm10_0_rating = 4 %}
        {% else %}
          {% set pm10_0_rating = 5 %}
        {% endif %}

        {% set rating = [pm2_5_rating, pm10_0_rating] | max %}
        {% if rating == 0 %}
          Good
        {% elif rating == 1 %}
          Moderate
        {% elif rating == 2 %}
          Unhealthy for sensitive groups
        {% elif rating == 3 %}
          Unhealthy
        {% elif rating == 4 %}
          Very unhealthy
        {% else %}
          Hazardous
        {% endif %}
      unique_id: local_outdoor_air_quality
```

{% endraw %}
