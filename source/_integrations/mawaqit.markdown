---
title: MAWAQIT Prayer Times
description: Instructions on how to integrate the MAWAQIT Prayer Times integration within Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 2026.8
ha_config_flow: true
ha_domain: mawaqit
ha_codeowners:
  - '@MAWAQIT'
  - '@moha-tah'
  - '@Yeyvo'
ha_platforms:
  - sensor
ha_integration_type: hub
---

The **MAWAQIT Prayer Times** {% term integration %} retrieves prayer times from [MAWAQIT](https://mawaqit.net) and displays them as sensors in Home Assistant. This is useful if you want to automate actions around daily prayer times, such as turning on a light at Fajr, sending a notification before Maghrib, or playing the adhan when it is time to pray.

## Prerequisites

You need a free MAWAQIT account to set up this integration.

1. Go to [mawaqit.net](https://mawaqit.net) and create an account.
2. Make sure your Home Assistant location is set near your mosque, as the setup lists the mosques closest to it. You can check it under {% my general title="**Settings** > **System** > **General**" %}.

{% include integrations/config_flow.md %}

You first sign in with your MAWAQIT account:

{% configuration_basic %}
Email:
    description: "Your MAWAQIT account email address. If you don't have an account yet, create one for free at [mawaqit.net](https://mawaqit.net)."
Password:
    description: "Your MAWAQIT account password."
{% endconfiguration_basic %}

After signing in, you select your mosque:

{% configuration_basic %}
Mosque:
    description: "The mosque whose prayer times you want to follow, among the mosques nearest to the location set in your Home Assistant settings."
{% endconfiguration_basic %}

Only one MAWAQIT entry can be set up per Home Assistant instance.

## Configuration options

The MAWAQIT integration does not have additional options to configure after setup.

To follow a different mosque, remove the integration and set it up again.

## Supported functionality

### Sensors

The integration provides the following sensors. All prayer and Iqama times are timestamp sensors.

The daily prayer and Iqama times show today's times until the middle of the night, between Maghrib and the next Fajr, and then switch to the next day's times.

#### Daily prayer times

- **Fajr prayer**: The Fajr prayer time.
- **Shuruq**: The sunrise time, which marks the end of the Fajr prayer. This is a calculated value and may differ from the astronomical sunrise.
- **Dhuhr prayer**: The Dhuhr prayer time.
- **Asr prayer**: The Asr prayer time.
- **Maghrib prayer**: The Maghrib prayer time.
- **Isha prayer**: The Isha prayer time.

#### Friday prayer

- **Jumua prayer**: The Jumua (Friday prayer) time of the next Friday, or of today on Fridays.
- **Second Jumua prayer** and **Third Jumua prayer**: Additional Friday prayer times. These sensors are only created when the selected mosque publishes a second or third Jumua time.

#### Next prayer

- **Next salat**: The name of the next prayer. On Fridays, Jumua replaces Dhuhr.
- **Next salat time**: The time of the next prayer.

#### Iqama (congregation) times

- **Fajr iqama**, **Dhuhr iqama**, **Asr iqama**, **Maghrib iqama**, and **Isha iqama**: The congregation (Iqama) start time for each daily prayer. These sensors are only created when the selected mosque has Iqama times enabled.

## MAWAQIT prayer times automation examples

The prayer time sensors are timestamp sensors, so you can use them directly as the time to run an automation. Here is an example to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Send a notification at Maghrib

This automation sends a notification to your phone when it is time for the Maghrib prayer.

- **Trigger**: Time, at the **Maghrib prayer** sensor
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a Maghrib notification" %}

{% example %}
automation: |
  alias: "Notify at Maghrib prayer time"
  triggers:
    - trigger: time
      at: sensor.maghrib_prayer
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "It is time for the Maghrib prayer."
{% endexample %}

{% enddetails %}

## Data updates

This integration is a cloud {% term polling %} integration. The prayer times of the whole year are fetched from MAWAQIT every 12 hours. The sensors change at the prayer times themselves, without waiting for the next fetch. If MAWAQIT cannot be reached, the sensors keep using the prayer times fetched last.

## Known limitations

- You can set up only one MAWAQIT account and mosque per Home Assistant instance. To follow a different mosque, remove the integration and set it up again.
- The **Iqama** sensors and the **Second Jumua prayer** and **Third Jumua prayer** sensors are only created when the selected mosque publishes those times in MAWAQIT.
- The setup only lists the mosques nearest to the location set in your Home Assistant settings. Searching for a mosque by name is not supported yet.

## Troubleshooting

### No mosque found near my location

The setup shows that no mosque was found near your Home Assistant location.

This usually means the location configured in Home Assistant has no MAWAQIT mosque nearby, or the location is not set accurately. To resolve this, check your location under {% my general title="**Settings** > **System** > **General**" %}, then set up the integration again.

### Cannot connect to the MAWAQIT server

When signing in or selecting a mosque, the setup reports that it cannot connect to the server.

This means Home Assistant could not reach MAWAQIT. To resolve this:

1. Check that your Home Assistant instance has internet access.
2. Confirm that [mawaqit.net](https://mawaqit.net) is reachable from your browser.
3. Wait a moment and try again.

### My MAWAQIT login no longer works

Signing in again is not supported yet. If the integration fails to set up after your MAWAQIT credentials changed, remove the integration and set it up again with your current MAWAQIT email and password.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
