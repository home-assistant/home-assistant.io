---
title: MAWAQIT Prayer Times
description: Instructions on how to integrate the MAWAQIT Prayer Times integration within Home Assistant.
ha_category:
  - Sensor
ha_iot_class: cloud_polling
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

The MAWAQIT (`mawaqit`) integration displays the various prayer times for Muslims as sensors.

This platform calculates prayer times from MAWAQIT.net.

## Prerequisites
- a MAWAQIT.net account

{% include integrations/config_flow.md %}

## Integration Sensors

The following sensors are added by the integration:

- **fajr**: Shows the fajr prayer time for today.
- **shuruq**: Shows the sunrise for today, which is the end of fajr prayer. This is a calculated field and may not necessarily be the same as the astronomical sunrise.
- **dhuhr**: Shows the dhuhr prayer time for today.
- **asr**: Shows the asr prayer time for today.
- **maghrib**: Shows the maghrib prayer time for today.
- **isha**: Shows the isha prayer time for today.
- **next prayer**: Shows the time of the next prayer.
- **jumua**: Shows the jumua time for the week.
- **my_mosque**: displays information about your favorite mosque.
For every prayer, you get an iqama sensor.

## Configuration

### Set up your account

This component allows you to integrate the data of your mawaqit mosque into Home Assistant. To do this, a Mawaqit account from https://mawaqit.net is required.

### Installation Instructions

1. Open **Home Assistant** and navigate to **Settings > Devices & Services**.
2. Click on **+ ADD INTEGRATION**.
3. In the search bar, type **Mawaqit** and select it from the results.
4. Enter your **Mawaqit account credentials** if prompted.
5. Once connected, you will have two options to find your mosque:
   - **Search by nearest mosques**: Uses the location specified in Home Assistant.
   - **Search by keyword**: Allows you to manually search for a mosque by name.
6. Click **Submit**.
   - If searching by location, select your mosque from the list and confirm.
   - If searching by keyword, enter the desired keyword, find your mosque in the results, select it, and submit.
7. Once completed, your Mawaqit integration will be added to Home Assistant.

### Removal Instructions

1. Open **Home Assistant** and navigate to **Settings > Devices & Services**.
2. Locate the **Mawaqit** integration in the list.
3. Click on it, then select the **three-dot menu** (⋮) on the top right.
4. Click **Delete**.
5. A confirmation prompt will appear. Click **DELETE** to confirm and remove the integration.```
