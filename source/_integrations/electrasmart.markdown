---
description: Instructions on how to integrate Electra Smart air conditioners with Home Assistant.
ha_release: 2023.6
ha_domain: electrasmart
---

The **Electra Smart** {% term integration %} lets you control air conditioners from [Electra Air](https://www.electra-air.co.il) that are registered in the **Electra Smart** mobile app. Every air conditioner on your Electra account is added to Home Assistant as a {% term climate %} {% term entity %}.

## Use case

You can use the integration to:

- Keep a room at a comfortable temperature with an {% term automation %} that turns the air conditioner on and off at set times.
- Turn the air conditioner off when nobody is home, and turn it back on shortly before you return.
- React to the temperature reported by the unit, for example to switch to a different fan mode when a room gets too warm.

## Supported devices

Any air conditioner that can be added to the **Electra Smart** app is supported. The air conditioner needs to be online in the Electra Smart app for Home Assistant to control it.

## Prerequisites

1. The air conditioner must be added and working in the **Electra Smart** app.
2. You need the phone number that is registered to your Electra Smart account. During setup, Electra sends a one-time password to that number by SMS.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Phone number:
    description: "The phone number you used to register in the Electra Smart app."
One-time password:
    description: "The code that Electra sends to that phone number by SMS when you start the setup."
{% endconfiguration_basic %}

## Supported functionality

Each air conditioner on your Electra account is added as a climate {% term entity %}.

### Air conditioner

- **HVAC modes**: off, heat, cool, dry, fan only, or auto.
- **Target temperature**: between 17 °C and 30 °C, in steps of 1 °C.
- **Fan modes**: auto, high, medium, or low.
- **Swing**: on or off.
- **Preset**: `Shabat`, which corresponds to the Shabat option in the Electra Smart app.
- **Current temperature**: the temperature measured by the air conditioner.

## Data updates

The integration {% term polling polls %} the Electra cloud every 30 seconds and uses the settings that are reported there. The air conditioner only reports to the cloud when its network module wakes up, so a change made with the remote control or in the Electra Smart app can take a moment to appear in Home Assistant.

## Known limitations

- The integration controls the air conditioner through the Electra cloud, because the unit does not offer a local API. An internet connection and the vendor's cloud service are required to control the air conditioner, and control is not possible when either is unavailable.
- Commands are not confirmed immediately. Because the unit reports to the cloud periodically, Home Assistant can briefly show a state that is slightly behind the actual state of the unit.
- The integration creates one config entry for your Electra account, and all air conditioners on that account are added automatically. They cannot be added or removed individually.

## Troubleshooting

{% details "The air conditioner shows as unavailable" %}

### Symptom: the climate entity is unavailable

Home Assistant reports the air conditioner as unavailable and the entity cannot be controlled.

#### Description

Home Assistant has not received an update from the Electra cloud for the unit. This usually means the air conditioner itself is offline: it is powered off at the breaker, it has lost its network connection, or the vendor's cloud service is temporarily unavailable.

#### Resolution

1. Open the **Electra Smart** app and check whether it can still reach the air conditioner.
2. If the app cannot reach it either, check the power supply of the unit and its network connection.
3. If the app can reach the unit but Home Assistant cannot, select **Reload** from the {% icon "mdi:dots-vertical" %} menu of the integration entry to reconnect.

{% enddetails %}

{% details "Setup fails with an invalid one-time password" %}

### Symptom: the one-time password is rejected

During setup, the form reports that the phone number or the one-time password is invalid.

#### Description

The one-time password expires shortly after Electra sends it, and the phone number must be the one registered in the **Electra Smart** app.

#### Resolution

1. Make sure the phone number matches the number registered in the **Electra Smart** app.
2. Cancel the current setup and start adding the integration again to request a new one-time password. Enter the new code as soon as it arrives.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removing the integration entry, the air conditioners remain set up in the Electra Smart app and can be added to Home Assistant again at any time.
