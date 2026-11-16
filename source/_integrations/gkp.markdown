---
title: GKP Home
description: Instructions on how to control GKP Wi-Fi radiators from Home Assistant.
ha_categories:
  - climate.thermostats_heating
ha_release: '2026.11'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@theobld-ww'
  - '@AnthonyPerrier-FRRO'
ha_domain: gkp
ha_config_flow: true
ha_platforms:
  - climate
ha_integration_type: hub
ha_quality_scale: bronze
---

The **GKP Home** {% term integration %} lets you control your [GKP](https://www.gkp.se/) Wi-Fi radiators directly from Home Assistant.

GKP Wi-Fi radiators are electric radiators that you set up and control with the GKP Home mobile app.

This integration uses the GKP cloud to give you control over each radiator. You can adjust the temperature, switch between heating modes, start a boost, and follow the room temperature of each radiator in your home.

## Use cases

By bringing your GKP radiators into Home Assistant, you can combine them with all your other smart home devices, whatever their brand. For example, you can:

- **Heat only the rooms you use**: Combine your radiators with presence detection, occupancy sensors, or door and window contacts to lower the temperature when a room is empty or a window is open.
- **Lower the heating when you leave**: Switch all radiators to eco mode when everyone leaves home, and back to comfort mode when someone is on their way back.
- **Follow your energy prices**: Adjust your heating based on time-of-use tariffs, real-time electricity prices, or your solar panel production.
- **Warm up a room on demand**: Start a boost in the bathroom before your morning shower, or in the living room when you come home earlier than usual.
- **Track your room temperatures**: Keep a history of the temperature in each room and compare it with your outdoor temperature or weather forecast.

## Supported devices

The integration supports the GKP Wi-Fi radiators that you can add to the GKP Home app.

## Prerequisites

Before setting up the integration, make sure you have:

1. A GKP account, created in the GKP Home mobile app.
2. At least one GKP Wi-Fi radiator added to an installation in the GKP Home app, and connected to the internet.

{% note %}
The integration uses OAuth2 authentication. During the setup, you are redirected to the GKP login page, where you sign in with the same email address and password as in the GKP Home app.
{% endnote %}

{% include integrations/config_flow.md %}

## Supported functionality

The integration creates one device for each radiator. Each device is named after the room you gave it in the GKP Home app.

### Climate

Each radiator is available as a climate entity, which provides:

- **Current temperature**: The temperature measured by the radiator.
- **Target temperature**: The temperature the radiator heats to, between 5 °C and 35 °C, in steps of 0.5 °C.
- **HVAC modes**:
  - **Heat**: The radiator heats to its comfort temperature, or to the temperature of the selected preset.
  - **Auto**: The radiator follows the weekly program set in the GKP Home app.
  - **Off**: The radiator stops heating.
- **HVAC action**: Shows whether the radiator is currently heating, idle, or off.
- **Presets**: Switch between the heating modes of your radiator:
  - **Comfort**: The comfort temperature, for when you are in the room.
  - **Eco**: A lower temperature to save energy, for example, at night or when you are away.
  - **Boost**: Heats the room quickly for a limited time. When the boost ends, the radiator goes back to its previous mode.
  - **Frost protection**: Keeps the room just warm enough to prevent frost damage.

When you change the target temperature, the integration updates the temperature of the active mode. For example, in **Eco**, you change the eco temperature. When the radiator is in **Auto** mode, changing the target temperature starts a boost at that temperature, just like in the GKP Home app. You can't change the target temperature when the radiator is **Off** or in **Frost protection**: select another mode first.

## Examples

### Lower the temperature when nobody is home

This automation switches your radiators to eco mode when everyone has been away for 10 minutes.

{% details "Example YAML configuration" %}

```yaml
alias: "Eco mode when away"
description: "Switch the radiators to eco mode when nobody is home"
triggers:
  - trigger: state
    entity_id: zone.home
    to: "0"
    for:
      minutes: 10
actions:
  - action: climate.set_preset_mode
    target:
      entity_id:
        - climate.living_room
        - climate.bedroom
    data:
      preset_mode: eco
```

{% enddetails %}

## Data updates

The integration {% term polling polls %} the GKP cloud for the state of your radiators every 2 minutes.

GKP radiators only send their current temperature and heating status to the cloud when they are asked to. To keep this information up to date, the integration asks all your radiators for a new reading every 10 minutes, and reads their answer a few seconds later. Changes you make on the radiator itself or in the GKP Home app show up within 2 minutes.

After you send a command, such as a new temperature or mode, the integration checks the radiator every 5 seconds for one minute, so you see the result quickly.

The integration checks your installations for new or removed radiators every 15 minutes.

## Known limitations

- The current temperature and heating status can be up to 10 minutes old, because the radiators only report them when the integration asks for a new reading.
- You can't edit the weekly program or the holiday mode from Home Assistant. Use the GKP Home app for these settings.
- Energy consumption is not available in Home Assistant.

## Troubleshooting

### Radiators show as unavailable

#### Symptom: Climate entities show as "Unavailable"

One or more of your GKP climate entities show as "Unavailable" in Home Assistant.

##### Description

A radiator shows as unavailable when it hasn't answered the requests of the integration for 30 minutes, or when the integration can't reach the GKP cloud. This usually means the radiator lost its connection to your Wi-Fi network, or the GKP cloud is temporarily unavailable.

##### Resolution

To resolve this issue, try the following steps:

1. Make sure the radiator is powered on.
2. Open the GKP Home app and check that the radiator responds there too.
3. If the radiator doesn't respond in the app either, check your Wi-Fi network, and move your router or add an access point if the radiator is far from it.
4. Wait a few minutes: the radiator shows as available again as soon as it answers the next request.

### Newly added or removed radiators don't show up

#### Symptom: A radiator you added or removed in the app doesn't appear or disappear in Home Assistant

After adding a radiator in the GKP Home app, or removing one, Home Assistant doesn't show the change right away.

##### Description

The integration checks your installations for new or removed radiators every 15 minutes.

##### Resolution

1. Wait up to 15 minutes after making the change in the GKP Home app.
2. If the change still doesn't show, reload the integration:
   - Go to {% my integrations title="**Settings** > **Devices & services**" %}.
   - Select the **GKP Home** integration.
   - Select the three dots {% icon "mdi:dots-vertical" %} menu and select **Reload**.

### "Too many requests to the GKP cloud"

#### Symptom: An error message asks you to try again later

When you change a setting, an error message says there are too many requests to the GKP cloud and asks you to try again in a number of seconds.

##### Description

The GKP cloud limits the number of requests each account can send in a short time. When this limit is reached, the integration waits for the time requested by the GKP cloud before reading your radiators again. During this time, your radiators show as unavailable.

##### Resolution

Wait for the number of seconds shown in the message, then try again. If this happens often, check that your automations don't send commands to your radiators in a loop.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
