---
title: MAWAQIT Prayer Times
description: Instructions on how to integrate the MAWAQIT Prayer Times integration within Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 2024.10.2
ha_config_flow: true
ha_domain: mawaqit
ha_codeowners:
  - '@MAWAQIT'
  - '@moha-tah'
  - '@yeyvo'
ha_platforms:
  - sensor
ha_integration_type: integration
---

The **MAWAQIT Prayer Times** {% term integration %} retrieves prayer times from [MAWAQIT](https://mawaqit.net) and displays them as sensors in Home Assistant. This is useful if you want to automate actions around daily prayer times, such as adjusting lights or sending notifications.

## Prerequisites

- A [MAWAQIT](https://mawaqit.net) account

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: "Your MAWAQIT account email address."
Password:
  description: "Your MAWAQIT account password."
{% endconfiguration_basic %}

After entering your credentials, you will have two options to find your mosque:

- **Search by nearest mosques**: Uses the location configured in Home Assistant.
- **Search by keyword**: Lets you manually search for a mosque by name.

## Supported functionality

### Sensors

The integration provides the following sensors:

- **Fajr**: Shows the Fajr prayer time for today.
- **Shuruq**: Shows the sunrise time for today, which marks the end of the Fajr prayer. This is a calculated value and may differ from the astronomical sunrise.
- **Dhuhr**: Shows the Dhuhr prayer time for today.
- **Asr**: Shows the Asr prayer time for today.
- **Maghrib**: Shows the Maghrib prayer time for today.
- **Isha**: Shows the Isha prayer time for today.
- **Next prayer**: Shows the time of the next upcoming prayer.
- **Jumua**: Shows the Jumua (Friday prayer) time for the week.
- **My mosque**: Shows information about your selected mosque.

For every prayer, an additional Iqama sensor is provided, showing the congregation start time.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
