---
title: Viessmann ViCare
description: Instructions how to integrate Viessmann heating devices with Home Assistant
ha_category:
  - Climate
  - Fan
  - Select
  - Water heater
ha_release: 0.99
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: vicare
ha_platforms:
  - binary_sensor
  - button
  - climate
  - diagnostics
  - fan
  - number
  - select
  - sensor
  - water_heater
ha_dhcp: true
ha_integration_type: hub
ha_codeowners:
  - '@CFenner'
  - '@lackas'
---

The **Viessmann ViCare** {% term integration %} lets you control [Viessmann](https://www.viessmann-climatesolutions.com) devices via the Viessmann ViCare (REST) API.
Most recent network-connected Viessmann heating devices (e.g., gas boilers) should be supported.

## Prerequisites

You will need to sign in on the [Viessmann developer portal](https://app.developer.viessmann-climatesolutions.com) with **your existing ViCare app user credentials**.

Create a new API client by selecting **Add** in the **Clients** section on the developer dashboard with the following settings:
   - Name: `HomeAssistant`
   - Google reCAPTCHA: `disabled`
   - Redirect URIs: `https://my.home-assistant.io/redirect/oauth`

Copy the **Client ID** in the **Clients** section on the developer dashboard for the setup in Home Assistant.

{% note %}
It may take up to an hour for your new client to become active and usable. Otherwise, you will not receive any devices in Home Assistant.
{% endnote %}

When Home Assistant prompts for application credentials during setup, enter the **Client ID** from the Viessmann developer portal. The **Client Secret** field is not used by the integration (ViCare uses PKCE), so you can enter any value.

### API limits

The Viessmann API is rate-limited. In the "Basic" (free) tier of their API plans, if you exceed one of the limits below, you will be blocked for 24 hours:

- 120 calls for a time window of 10 minutes
- 1450 calls for a time window of 24 hours

For the paid API plans this limit increases to 3000 calls in 24 hours. The {% term integration %} polls the API every 60 seconds and will work within these limits. However, any additional requests to the API, for example, by setting the temperature via the integration and interacting with the ViCare app, count into those limits.

{% important %}
For any Viessmann API plan except the most expensive "Advanced" tier, Viessmann imposes certain limits on which APIs are accessible for end-user consumption. Unfortunately, this also affects APIs useful for smart home integrations, like controlling thermostats (TRVs) and climate sensors, which are only available in the "Advanced" plan API tier. In case you set up the integration with a lower-tier plan, TRVs and other smart home entities will not become accessible in your Home Assistant installation.

Please consider providing feedback to Viessmann as described in [their FAQ](https://developer.viessmann-climatesolutions.com/start/faq.html) "Where can I give feedback on the API?" in case you consider this as a limitation for your use-case.
{% endimportant %}

{% note %}
If you have multiple Viessmann devices in Home Assistant, the limit is shared between them, meaning the poll interval is increased, and the values are less frequently updated!
{% endnote %}

{% include integrations/config_flow.md %}

## Entities

ViCare represents devices as a set of [data points](https://api.viessmann-climatesolutions.com/documentation/data-points) and the ViCare {% term integration %} maps those to {% term entity entities %} of different {% term platform platforms %} in Home Assistant. A single device may be represented by one or more platforms.

### Climate

Represents the heating controls of your device.

{% note %}
Viessmann devices with room temperature sensing will show the current room temperature via `current_temperature`. All other devices will show the current supply temperature of the heating circuit.
{% endnote %}

### Fan

Ventilation units are displayed as fans and enable the change of speed and use of presets.

### Water heater

Represents the domestic hot water controls of your device.

{% note %}
It is not possible to turn on/off water heating via the water heater {% term integration %} since this would conflict with the operation modes of the heating integration. Therefore, the operation mode of that integration is just available as an attribute and cannot be modified.
{% endnote %}

### Sensor

Additional data for a device is available as separate sensors. The sensors are automatically discovered based on the available API data points.

### Button

Button entities are available for triggering like a one-time charge of the water heater.

### Number

Number entities are available to adjust values like the predefined temperature for different heating programs or the heating curve shift and slope.

### Select

Select entities allow configuring the domestic hot water (<abbr title="domestic hot water">DHW</abbr>) operating mode of your Viessmann device. Available options depend on the specific device model and may include `balanced`, `economical`, or `off` modes.

{% include integrations/actions.md %}

## Climate and water heater control

The ViCare integration also provides the standard [climate](/integrations/climate/) and [water_heater](/integrations/water_heater/) actions. The ViCare integration provides `set_temperature`, `set_hvac_mode`, and `set_preset_mode` for climate entities, and `set_temperature` for the water heater. A few of these behave in ViCare-specific ways.

### Setting the temperature

The `climate.set_temperature` action always affects the current normal temperature or, if a preset is set, the temperature of the preset (that is, a Viessmann program such as eco or comfort).

### Setting the HVAC mode

The ViCare integration maps the Home Assistant HVAC modes to Viessmann operation modes as follows:

- `off`: maps to `ForcedReduced`, which permanently sets heating to the reduced temperature. This also deactivates domestic hot water.
- `heat`: maps to `ForcedNormal`, which permanently sets heating to the normal temperature.
- `auto`: maps to `DHWandHeating`, which switches between the reduced and normal temperature based on the heating schedule programmed in your device.

### Setting the preset mode

The `climate.set_preset_mode` action supports the *eco* and *comfort* preset modes. These are identical to the respective Viessmann programs and are only active temporarily for 8 hours. Eco mode reduces the target temperature by 3°C, whereas Comfort mode sets the target temperature to a configurable value. Consult your heating device manual for more information.

## Troubleshooting

### UTF-8 characters in passwords

The underlying PyViCare Python library cannot handle UTF-8 characters in passwords, so do not use for example `ü` or `ø` in passwords.

### GATEWAY_OFFLINE

The ViCare API tends to lose contact with the gateway from time to time. This will be logged in Home Assistant with:

```log
Invalid data from Vicare server: {
  'viErrorId': '...',
  'statusCode': 400,
  'errorType': 'DEVICE_COMMUNICATION_ERROR',
  'message': '',
  'extendedPayload': {
    'httpStatusCode': 'NotFound',
    'code': '404',
    'reason': 'GATEWAY_OFFLINE'
  }
}
```

Usually, this resolves itself after a while, but if this state persists, try to power cycle your gateway.

## Removing the integration

This integration follows standard integration removal. Once the integration is removed, you can remove the API client (assuming it was only used by this integration) by going to the [Viessmann developer portal](https://app.developer.viessmann-climatesolutions.com) and deleting the client you created for Home Assistant.

{% include integrations/remove_device_service.md %}
