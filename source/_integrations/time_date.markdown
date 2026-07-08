---
title: Time & Date
description: Instructions on how to create time and the date sensors within Home Assistant.
ha_category:
  - Calendar
ha_iot_class: Local Push
ha_release: pre 0.7
ha_quality_scale: internal
ha_config_flow: true
ha_codeowners:
  - '@fabaff'
ha_domain: time_date
ha_platforms:
  - sensor
ha_integration_type: service
---

The **Time & Date** {% term integration %} provides sensors for the current date or time in different formats. All values are based on the time zone configured under {% my general title="**Settings** > **System** > **General**" %}.

{% include integrations/config_flow.md %}

## Configuration options

During setup, select the sensor type. The integration creates one sensor in the selected format.

{% configuration_basic %}
Sensor type:
  description: "The date, time, or date and time sensor with data in a given format."
{% endconfiguration_basic %}

The available options are:
- **Date**: The current date, for example, `2026-04-12`.
- **Date & Time**: The current date and time, for example, `2026-04-12, 14:30`.
- **Date & Time (ISO)**: The current date and time in ISO 8601 format, for example, `2026-04-12T14:30:00`.
- **Date & Time (UTC)**: The current date and time in UTC, for example, `2026-04-12, 12:30`.
- **Time**: The current local time, for example, `14:30`.
- **Time & Date**: The current time and date (reversed order), for example, `14:30, 2026-04-12`.
- **Time (UTC)**: The current time in UTC, for example, `12:30`.

## Supported functionality

The **Time & Date** integration provides the following entity.

### Sensor

Depending on the sensor type selected during configuration, one of the following sensors is available.

- **Date**
  - **Description**: The current date, in the format `YYYY-MM-DD`.
- **Date & Time**
  - **Description**: The current date and time, in the format `YYYY-MM-DD, HH:MM`.
- **Date & Time (ISO)**
  - **Description**: The current date and time, in the ISO 8601 format `YYYY-MM-DDTHH:MM:SS`.
- **Date & Time (UTC)**
  - **Description**: The current date and time in UTC, in the format `YYYY-MM-DD, HH:MM`.
- **Time**
  - **Description**: The current local time, in the format `HH:MM`.
- **Time & Date**
  - **Description**: The current time and date (reversed order), in the format `HH:MM, YYYY-MM-DD`.
- **Time (UTC)**
  - **Description**: The current time in UTC, in the format `HH:MM`.

You can display the data of the sensor entity in a dashboard view by following the [instructions on how to add a card from a view](/dashboards/cards/#to-add-a-card-from-a-view).

## Data updates

Sensors that include the time update every minute. The date-only sensor updates each day at midnight.

<p class='img'>
  <img src='/images/screenshots/time_date.png' />
</p>

## Creating a custom time and date sensor

If you want a sensor with a custom date or time format, you can create a [template sensor](/integrations/template/) in your {% term "`configuration.yaml`" %} file. The example below uses the sensor created by the **Date & Time (ISO)** display option as the source and reformats it with [`timestamp_custom()`](/template-functions/timestamp_custom/) using standard [Python datetime formatting](https://docs.python.org/3/library/datetime.html#strftime-and-strptime-behavior).

Add the following to your {% term "`configuration.yaml`" %}:
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
template:
  - sensor:
      - name: "Date and time"
        state: >
          {{
            as_timestamp(states('sensor.date_time_iso'))
            | timestamp_custom('%A %B %-d, %I:%M %p')
          }}
        icon: "mdi:calendar-clock"
```

This requires the **Date & Time (ISO)** display option to be set up in this integration.

## More time-related resources

For more information about using time related variables and sensors in templates, see the template function reference for [`today_at`](/template-functions/today_at/), [`now`](/template-functions/now/), and [`as_timestamp`](/template-functions/as_timestamp/).
