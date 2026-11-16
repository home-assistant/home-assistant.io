---
description: Instructions on how to integrate Eurotronic Comet Blue Thermostats into Home Assistant.
ha_release: 2026.5
ha_domain: eurotronic_cometblue
---

The **Eurotronic Comet Blue** {% term integration %} allows you to integrate Eurotronic Comet Blue (and similar) thermostats.

## Use cases

You can use this integration to read thermostat status, adjust temperatures, and manage schedule-related settings in Home Assistant.

You can also combine your thermostats with other Home Assistant entities to automate heating around your routine. For example, you can:

- Adjust daily heating schedules based on calendar events or outdoor temperatures, such as starting heating earlier on colder days, and restore your regular schedule when those conditions no longer apply.
- Select the **Comfort** preset when a device tracker detects that you have returned home early, rather than waiting for the next scheduled heating period.
- Synchronize the thermostat's clock after a daylight saving time change to keep heating schedules aligned with local time.
- Compare the thermostat's temperature reading with a separate room sensor to help adjust the **Setpoint offset**, since the thermostat measures temperature at the radiator.

## Supported devices

- Eurotronic Comet Blue
- Sygonix HT100 BT
- Xavax Hama
- Lidl Silvercrest RT2000BT

## Prerequisites

Before you set up this integration, make sure the following requirements are met:

1. The [Bluetooth](/integrations/bluetooth) integration is enabled and working.
2. Bluetooth active scanning is enabled.


The Eurotronic Comet Blue {% term integration %} will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.


{% include integrations/config_flow.md %}

{% configuration_basic %}
Device PIN:
  description: "Device PIN with 6 digits, defaults to `000000`."
{% endconfiguration_basic %}

## Supported functionality

This integration provides climate control and thermostat configuration entities.

Comet Blue devices run on an internal schedule and can be manually controlled temporarily. When the schedule is active, the thermostat switches between low and high target temperatures based on that schedule.

If you manually change the target temperature or use presets, the thermostat returns to its programmed schedule on the next schedule change.

You can read and adjust the schedule from Home Assistant via the provided {% term actions %}.

### Climate

The climate entity lets you control the thermostat by setting a target temperature which the device will try to reach on its own.

As shortcuts, the climate platform supports the following presets:

- **Eco**: Temperature is set to the low schedule temperature.
- **Comfort**: Temperature is set to the high schedule temperature.
- **Boost**: Valve is fully open.
- **Away**: Holiday mode is currently active. Display only.
- **None**: Temperature is other than the above. Display only.

Additionally, the following modes are available:

- **Off**: Valve is fully closed.
- **Heat**: Valve is fully open.
- **Auto**: The thermostat controls the temperature automatically, based on the target temperature.

### Button

The integration provides a **Sync time** button for each device. Pressing this button synchronizes the thermostat's internal clock with Home Assistant's current time.

### Number

Number entities provide specific settings that affect automatic thermostat behavior.

- **Comfort setpoint**: Temperature used for the **Comfort** preset and if schedule is on.
- **Eco setpoint**: Temperature used for the **Eco** preset and if schedule is off.
- **Setpoint offset**: Temperature calibration for the internal thermostat control.

### Sensor

The device reports its current battery level, but the reading may not be very accurate.

{% include integrations/actions.md %}

## Automation examples

Use these examples as a starting point. Replace the entity IDs with the ones from your Home Assistant instance.

{% include docs/paste_yaml_tip.md %}

### Sync the thermostat clock after a daylight saving time change

Home Assistant checks the daylight saving time status each day at 5:00 AM. When the status differs from the previous day, it presses the thermostat's **Sync time** button.

- **Trigger**: Time
  - **At time**: `05:00`
- **Condition**: Daylight saving time status changed since the previous day
- **Action**: Press button
  - **Target**: Living room sync time button

{% details "YAML example for syncing the thermostat clock after a daylight saving time change" %}

{% example %}
automation: |
  alias: "Sync thermostat clock after daylight saving time change"
  triggers:
    - trigger: time
      at: "05:00:00"
  conditions:
    - "{{ now().timetuple().tm_isdst != (now() - timedelta(days=1)).timetuple().tm_isdst}}"
  actions:
    - action: button.press
      target:
        entity_id: button.living_room_sync_time
{% endexample %}

{% enddetails %}

### Select the Comfort preset when you return home early

When a device tracker changes to **home**, this automation selects the **Comfort** preset. If holiday mode is active, Home Assistant cannot change the preset. To turn off holiday mode, press and hold the thermostat's `MENU` button until it resets.

- **Trigger**: State changed
  - **Entity**: Phone device tracker
  - **To**: Home
- **Action**: Set thermostat preset mode
  - **Target**: Living room radiator thermostat
  - **Preset mode**: `comfort`

{% details "YAML example for selecting Comfort when you return home" %}

{% example %}
automation: |
  alias: "Set thermostat to Comfort when I get home"
  triggers:
    - trigger: state
      entity_id: device_tracker.phone
      to: "home"
  actions:
    - action: climate.set_preset_mode
      target:
        entity_id: climate.living_room_radiator
      data:
        preset_mode: comfort
{% endexample %}

{% enddetails %}

## Data updates

The integration {% term polling polls %} data from the thermostat every 5 minutes by default.

## Known limitations

- The devices only support temperature steps of 0.5°C and time steps of 10 minutes.
- If you manually change the target temperature or use presets, the thermostat returns to its programmed schedule at the next schedule change.
- If the thermostat is in holiday mode, you cannot reset it from Home Assistant. To reset it, press the `MENU` button on the thermostat until it resets.

## Troubleshooting

### Connectivity

As the data is refreshed using an active Bluetooth connection, {% term polling %} can fail due to connection issues.

If you see repeated connection issues, try the following:

1. Move your Home Assistant host closer to the thermostat.
2. Add [ESPHome Bluetooth proxies](/integrations/bluetooth/#remote-adapters-bluetooth-proxies) closer to the thermostat.

### Viewing device diagnostics

Each setup of this integration contains one thermostat. Its diagnostics include information about the thermostat and its Bluetooth connection, as well as converted data and the most recent raw values received. This information can help troubleshoot conversion or connection issues. To download diagnostics, follow the [steps to download diagnostics](/docs/configuration/troubleshooting/#download-diagnostics).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
