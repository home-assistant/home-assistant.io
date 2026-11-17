---
description: Instructions on how to integrate Rituals Perfume Genie diffusers within Home Assistant.
ha_release: 2021.3
ha_domain: rituals_perfume_genie
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

Each diffuser on your Rituals account is added to Home Assistant as a device, with the entities described below. When you add a diffuser to your Rituals account later, it shows up in Home Assistant within a few minutes. When you remove one from your account, its device is removed from Home Assistant as well.

{% note %}
The entities you see depend on your model. The battery and charging entities appear on the battery-powered model only. On mains-powered models, the **Room size** control is [disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity). You can turn it on from the entity's settings if you want to use it.
{% endnote %}

### Switch

- **Diffuser**: The main switch for the diffuser. Turn it on to start diffusing fragrance, and off to stop. This switch carries the name of your diffuser.
- **Standby LED**: Turns on or off the light that shows while the diffuser is on standby, for example to keep it from lighting up a bedroom at night. Available on diffusers that support it.

### Number

- **Perfume amount**: Sets how much fragrance is diffused, on a scale from 1 (lightest) to 3 (strongest).

### Select

- **Room size**: Tells the diffuser how large the room is, in square meters, so it can pace the fragrance to suit the space. You can choose 15, 30, 60, or 100.

### Binary sensor

- **Cartridge**: Shows whether a fragrance cartridge is inserted in the diffuser.
- **Charging**: Shows whether the diffuser's battery is charging. Available on the battery-powered model only.

### Sensors

- **Battery**: The remaining battery charge, as a percentage. Available on the battery-powered model only.
- **Fill**: An estimate of how full the current fragrance cartridge is, as a percentage. Unknown when there is no measurement.
- **Perfume**: The name of the fragrance cartridge currently in the diffuser. Unknown when no cartridge is inserted.
- **Wi-Fi signal**: The strength of the diffuser's Wi-Fi connection, as a percentage. This sensor is disabled by default. You can turn it on from the entity's settings if you want to use it.

### Update

- **Firmware**: Shows the firmware the diffuser runs and the newest firmware Rituals has for it, and lets you install that update. When Rituals numbers its firmware builds, the version includes that number, like `5.4 (127)`.

Rituals doesn't report how far along a firmware update is. Home Assistant shows the update as in progress until the diffuser reports the new firmware, for up to 30 minutes.

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

Home Assistant {% term polling polls %} your Rituals account for updates. Rituals limits how often its service can be used, so not everything is updated equally often:

- The state of your diffusers, such as whether they are on, the perfume amount, and the room size, is updated every 5 minutes. All diffusers on your account are updated at once.
- The battery, charging, perfume, and Wi-Fi signal sensors are updated every hour. Only the sensors that are enabled are updated, so disabling a sensor you don't use saves a request.
- The fill level is updated once a day, and also when the hourly update finds a different cartridge.

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
3. Wait a few minutes. Home Assistant checks your Rituals account for new diffusers every 5 minutes.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
