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
2. If you want to search for the nearest mosques during setup, make sure your Home Assistant location is set. You can check it under {% my general title="**Settings** > **System** > **General**" %}.

{% include integrations/config_flow.md %}

You first sign in with your MAWAQIT account:

{% configuration_basic %}
Email:
    description: "Your MAWAQIT account email address. If you don't have an account yet, create one for free at [mawaqit.net](https://mawaqit.net)."
Password:
    description: "Your MAWAQIT account password."
{% endconfiguration_basic %}

After signing in, you choose how to find your mosque, then select it:

{% configuration_basic %}
Search method:
    description: "How to find your mosque. Select **Search for the nearest mosques to your location** to list mosques close to the location set in your Home Assistant settings, or **Search for a mosque by keyword** to look one up by name or city."
Search:
    description: "Only shown when searching by keyword. Enter the name or location of the mosque you are looking for. Results are paginated, so you can move between pages if your mosque is not on the first one."
Mosque:
    description: "The mosque whose prayer times you want to follow. When searching by location, you select from the nearest mosques. When searching by keyword, you select from the search results."
{% endconfiguration_basic %}

Only one MAWAQIT entry can be set up per Home Assistant instance.

## Configuration options

The MAWAQIT integration does not have additional options to configure after setup.

To follow a different mosque, reconfigure the existing entry. Go to {% my integrations title="**Settings** > **Devices & services**" %}, select the MAWAQIT integration, open the {% icon "mdi:dots-vertical" %} menu, and select **Reconfigure**. You can then pick a new mosque using the same search methods as during setup.

If your MAWAQIT password changes, Home Assistant automatically asks you to sign in again so it can keep retrieving your prayer times.

## Supported functionality

### Sensors

The integration provides the following sensors. All prayer and Iqama times are timestamp sensors.

#### Daily prayer times

- **Fajr Prayer**: The Fajr prayer time for today.
- **Shuruq**: The sunrise time for today, which marks the end of the Fajr prayer. This is a calculated value and may differ from the astronomical sunrise.
- **Dhuhr Prayer**: The Dhuhr prayer time for today.
- **Asr Prayer**: The Asr prayer time for today.
- **Maghrib Prayer**: The Maghrib prayer time for today.
- **Isha Prayer**: The Isha prayer time for today.

#### Friday prayer

- **Jumua Prayer**: The Jumua (Friday prayer) time.
- **Second Jumua Prayer** and **Third Jumua Prayer**: Additional Friday prayer times. These sensors are only created when the selected mosque publishes a second or third Jumua time.

#### Next prayer

- **Next Salat Name**: The name of the next upcoming prayer.
- **Next Salat Time**: The time of the next upcoming prayer.

#### Iqama (congregation) times

- **Fajr Iqama**, **Dhuhr Iqama**, **Asr Iqama**, **Maghrib Iqama**, and **Isha Iqama**: The congregation (Iqama) start time for each daily prayer. These sensors are only created when the selected mosque has Iqama times enabled.

#### Mosque

- **Mosque information**: The name of the mosque you selected.

## MAWAQIT prayer times automation examples

The prayer time sensors are timestamp sensors, so you can use them directly as the time to run an automation. Here is an example to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Send a notification at Maghrib

This automation sends a notification to your phone when it is time for the Maghrib prayer.

- **Trigger**: Time, at the **Maghrib Prayer** sensor
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

This integration is a cloud {% term polling %} integration. Mosque information is refreshed once a day. Prayer times are fetched from MAWAQIT about twice a day, and the **Next Salat Name** and **Next Salat Time** sensors are re-evaluated every minute so they always point to the upcoming prayer.

## Known limitations

- You can set up only one MAWAQIT account and mosque per Home Assistant instance. To follow a different mosque, reconfigure the existing entry.
- The **Iqama** sensors and the **Second Jumua Prayer** and **Third Jumua Prayer** sensors are only created when the selected mosque publishes those times in MAWAQIT.
- The nearest mosques search relies on the location set in your Home Assistant settings. If no mosque is found nearby, check your location under {% my general title="**Settings** > **System** > **General**" %}, or use the keyword search instead.

## Troubleshooting

### No mosque found near my location

When searching for the nearest mosques, the setup shows that no mosque was found in your area.

This usually means the location configured in Home Assistant has no MAWAQIT mosque nearby, or the location is not set accurately. To resolve this:

1. Check your location under {% my general title="**Settings** > **System** > **General**" %}.
2. If your location is correct and no mosque is listed, set up the integration again and use **Search for a mosque by keyword** instead.

### Cannot connect to the MAWAQIT server

When signing in or selecting a mosque, the setup reports that it cannot connect to the server.

This means Home Assistant could not reach MAWAQIT. To resolve this:

1. Check that your Home Assistant instance has internet access.
2. Confirm that [mawaqit.net](https://mawaqit.net) is reachable from your browser.
3. Wait a moment and try again.

### My MAWAQIT login no longer works

If your prayer time sensors stop updating after changing your MAWAQIT password, Home Assistant starts a reauthentication flow and prompts you to sign in again. Enter your current MAWAQIT email and password to restore the connection.

## Diagnostics

This integration provides downloadable diagnostics to help reproduce, test, and debug issues. The downloaded file contains no personal information. It includes:

- Your configuration entry, with the API key and your Home Assistant location (latitude and longitude) redacted.
- The public information of your selected mosque, such as its name, address, and prayer-time settings.
- The most recent prayer times fetched from MAWAQIT.

To download the diagnostics, go to {% my integrations title="**Settings** > **Devices & services**" %}, select the MAWAQIT integration, open the {% icon "mdi:dots-vertical" %} menu on the integration entry, and select **Download diagnostics**. Attach the downloaded file when you report an issue to help the maintainers investigate.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
