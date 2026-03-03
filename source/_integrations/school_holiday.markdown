---
title: School Holiday
description: Instructions on how to set up the School Holiday integration.
ha_category:
  - Binary sensor
  - Calendar
ha_release: 2026.3
ha_platforms:
  - binary_sensor
  - calendar
ha_iot_class: Cloud Polling
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@arievanderwende'
ha_domain: school_holiday
ha_integration_type: service
---

The **School Holiday** {% term integration %} helps you automate your home based on the school holidays of the selected country and region.

The integration provides a binary sensor that indicates whether the current day is a school holiday, which you can use in your {% term automation automations %} to create smart routines that automatically adjust based on school holidays. For example, you can adjust your morning routines or alarm settings to match school days versus school holidays, making your home adapt to your family's schedule.

The integration also provides a calendar entity that can be used to see upcoming school holidays.

{% include integrations/config_flow.md %}

## Configuration options

The integration provides the following configuration options:

{% configuration_basic %}
Sensor name:
    description: "The name for your new binary sensor."
Country:
    description: "The country for which to show school holidays."
Region:
    description: "The specific region within the selected country."
Calendar name:
    description: "The name for your new calendar."
{% endconfiguration_basic %}

{% note %}
The integration currently only supports the following countries and regions:

- The Netherlands
  - Midden
  - Noord
  - Zuid
{% endnote %}

## Supported functionality

The integration provides the following entities.

### Binary sensors

- **School Holiday Sensor**
  - **Description**: Binary sensor that shows whether today is a school holiday or not.

### Calendars

- **School Holiday Calendar**
  - **Description**: Calendar that shows all school holidays.

## Examples

### Open cover during school holidays

```yaml
automation:
  - alias: "Open cover during school holidays"
    triggers:
      - trigger: time
        at: "09:00:00"
    conditions:
      - condition: state
        entity_id: binary_sensor.school_holiday_sensor
        state: "on"
    actions:
      - action: cover.open_cover
        target:
          entity_id: cover.demo
```

## Data updates

The integration {% term polling polls %} data from the Internet when it is started. After that, the update interval of the calendar is set to every 24 hours.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
