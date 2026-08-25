---
title: Rituals Perfume Genie
description: Instructions on how to integrate Rituals Perfume Genie diffusers within Home Assistant.
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_release: 2021.3
ha_category:
  - Binary sensor
  - Number
  - Select
  - Sensor
  - Switch
ha_codeowners:
  - '@milanmeu'
  - '@frenck'
  - '@quebulm'
ha_domain: rituals_perfume_genie
ha_platforms:
  - binary_sensor
  - diagnostics
  - number
  - select
  - sensor
  - switch
ha_integration_type: hub
---

The **Rituals Perfume Genie** {% term integration %} lets you control and monitor your [Rituals](https://www.rituals.com/) perfume diffusers from Home Assistant.

The Perfume Genie is a smart fragrance diffuser. Once it is connected to your home Wi-Fi and linked to your Rituals account, this integration brings it into Home Assistant. You can start and stop the fragrance, set how much is diffused, and keep an eye on the cartridge and battery, all without reaching for the Rituals app.

That opens the door to fragrance that follows your day. Picture the diffuser easing on as you walk through the door in the evening, winding down on its own at bedtime, and a gentle reminder reaching you when the cartridge runs low. Because every control is available to your automations, your home can set the mood on its own.

## Supported devices

The following devices are supported by this integration:

- Rituals Perfume Genie
- Rituals Perfume Genie 2nd generation
- Rituals Perfume Genie 3rd generation

## Prerequisites

Before you set up the integration, make sure you have:

- A Rituals account.
- Your Perfume Genie set up in the Rituals mobile app and connected to your Wi-Fi network.
- The email address and password for your Rituals account.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: "The email address for your Rituals account."
Password:
  description: "The password for your Rituals account."
{% endconfiguration_basic %}

## Supported functionality

Each diffuser on your Rituals account is added to Home Assistant as a device, with the entities described below.

{% note %}
The entities you see depend on your model. The battery and charging entities appear on the battery-powered model only. On mains-powered models, the **Room size** control is disabled by default. You can turn it on from the entity's settings if you want to use it.
{% endnote %}

### Switch

- **Diffuser**: The main switch for the diffuser. Turn it on to start diffusing fragrance, and off to stop. This switch carries the name of your diffuser.

### Number

- **Perfume amount**: Sets how much fragrance is diffused, on a scale from 1 (lightest) to 3 (strongest).

### Select

- **Room size**: Tells the diffuser how large the room is, in square meters, so it can pace the fragrance to suit the space. You can choose 15, 30, 60, or 100.

### Binary sensor

- **Charging**: Shows whether the diffuser's battery is charging. Available on the battery-powered model only.

### Sensors

- **Battery**: The remaining battery charge, as a percentage. Available on the battery-powered model only.
- **Fill**: How full the current fragrance cartridge is.
- **Perfume**: The name of the fragrance cartridge currently in the diffuser.
- **Wi-Fi signal**: The strength of the diffuser's Wi-Fi connection, as a percentage.

## Examples

The following example shows how to use the Rituals Perfume Genie integration in a Home Assistant automation. It is a starting point you can build on for your own ideas.

### Turn the diffuser on at a specific time

This automation starts the fragrance every evening at 18:00.

```yaml
automation:
  - alias: "Start fragrance in evening"
    triggers:
      - trigger: time
        at: "18:00:00"
    actions:
      - action: switch.turn_on
        target:
          entity_id: switch.rituals_perfume_genie_diffuser
```

## Data updates

Home Assistant {% term polling polls %} your Rituals account for updates every few minutes. With a single diffuser, it polls every 3 minutes. Each additional diffuser on your account lengthens that interval, which keeps Home Assistant within the limits of the Rituals service.

## Known limitations

- The integration relies on the Rituals cloud service. If your internet connection or the Rituals service is unavailable, Home Assistant cannot read from or control your diffuser.
- The battery and charging entities are available on the battery-powered model only.

## Troubleshooting

### Authentication fails or the diffuser stops updating

#### Symptom: "Reauthentication required" or entities show as unavailable

After a while, Home Assistant can no longer reach your Rituals account, or you are asked to sign in again.

##### Resolution

1. Confirm you can sign in to the Rituals mobile app with the same email address and password.
2. If you recently changed your Rituals password, enter the new password when Home Assistant prompts you to reauthenticate.
3. Check that the diffuser is powered on and connected to your Wi-Fi network in the Rituals app.

### A diffuser is missing from Home Assistant

If one of your diffusers does not appear:

1. Open the Rituals mobile app and confirm the diffuser is registered to your account and online.
2. Make sure the diffuser is connected to your Wi-Fi network.
3. Reload the integration from its page under {% my integrations title="**Settings** > **Devices & services**" %}.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
