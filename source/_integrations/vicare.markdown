---
title: Viessmann ViCare
description: Instructions how to integrate Viessmann heating devices with Home Assistant
ha_category:
  - Climate
  - Fan
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
  - sensor
  - water_heater
ha_dhcp: true
ha_integration_type: integration
ha_codeowners:
  - '@CFenner'
---

The **Viessmann ViCare** {% term integration %} lets you control [Viessmann](https://www.viessmann.com) devices via the Viessmann ViCare (REST) API.
Most recent network-connected Viessmann heating devices (e.g., gas boilers) should be supported.

## Prerequisites

You will need to sign in on the [Viessmann developer portal](https://app.developer.viessmann.com/) with **your existing ViCare app user credentials**.

Create a new API client by selecting **Add** in the **Clients** section on the developer dashboard with the following settings:
   - Name: `HomeAssistant`
   - Google reCAPTCHA: `disabled`
   - Redirect URIs: `vicare://oauth-callback/everest`

Copy the **Client ID** in the **Clients** section on the developer dashboard for the setup in Home Assistant.

{% important %}
You have to set up the {% term integration %} from your device (phone) where you have the ViCare app installed. Otherwise, your device does not know how to handle the `vicare://` redirect URL, and you will receive an **Invalid credentials** notification and the setup procedure will fail.
{% endimportant %}

{% note %}
It may take up to an hour for your new client to become active and usable. Otherwise, you will not receive any devices in Home Assistant.
{% endnote %}

### API limits

The Viessmann API is rate-limited. In the "Basic" (free) tier of their API plans, if you exceed one of the limits below, you will be blocked for 24 hours:

- 120 calls for a time window of 10 minutes
- 1450 calls for a time window of 24 hours

For the paid API plans this limit increases to 3000 calls in 24 hours. The {% term integration %} polls the API every 60 seconds and will work within these limits. However, any additional requests to the API, for example, by setting the temperature via the integration and interacting with the ViCare app, count into those limits.

{% important %}
For any Viessmann API plan except the most expensive "Advanced" tier, Viessmann imposes certain limits on which APIs are accessible for end-user consumption. Unfortunately, this also affects APIs useful for smart home integrations, like controlling thermostats (TRVs) and climate sensors, which are only available in the "Advanced" plan API tier. In case you set up the integration with a lower-tier plan, TRVs and other smart home entities will not become accessible in your Home Assistant installation.

Please consider providing feedback to Viessmann as described in [their FAQ](https://developer.viessmann.com/start/faq.html) "Where can I give feedback on the API?" in case you consider this as a limitation for your use-case.
{% endimportant %}

{% note %}
If you have multiple Viessmann devices in Home Assistant, the limit is shared between them, meaning the poll interval is increased, and the values are less frequently updated!
{% endnote %}

{% include integrations/config_flow.md %}

## Entities

ViCare represents devices as a set of [data points](https://documentation.viessmann.com/static/iot/data-points) and the ViCare {% term integration %} maps those to {% term entity entities %} of different {% term platform platforms %} in Home Assistant. A single device may be represented by one or more platforms.

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

## Actions

The following actions of the [climate integration](/integrations/climate/) are provided by the ViCare integration: `set_temperature`, `set_hvac_mode`, `set_preset_mode` 

The following actions of the [water_heater integration](/integrations/water_heater/) are provided by the ViCare integration: `set_temperature`

### Action `vicare.set_vicare_mode`

Set the mode for the climate device as defined by Viessmann (see [set_hvac_mode](#action-climateset_hvac_mode) for a mapping to Home Assistant Climate modes. This allows more-fine grained control of the heating modes.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. To target all entities, use the `all` keyword instead of entity_id. |
| `vicare_mode` | no | New value of ViCare mode. For supported values, see the `vicare_modes` attribute of the climate {% term entity %}. |

### Action `climate.set_temperature`

Sets the target temperature to the given temperature.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. To target all entities, use `all` keyword instead of entity_id. |
| `temperature` | no | Desired target temperature. |

Note that `set_temperature` will always affect the current normal temperature or, if a preset is set, the temperature of the preset (i.e., Viessman program like eco or comfort).

### Action `climate.set_hvac_mode`

Set HVAC mode for the climate device. The following modes are supported:

The ViCare {% term integration %} has the following mapping of HVAC modes to Viessmann operation modes:

| HVAC mode | Viessmann mode | Description |
| ---------------------- | -------- | ----------- |
| `off` | `ForcedReduced` | Permanently set heating to reduced temperature. Note: This will also deactivate domestic hot water. |
| `heat` | `ForcedNormal` | Permanently set heating to normal temperature. |
| `auto` | `DHWandHeating` | Switches between reduced and normal temperature as by the heating schedule programmed in your device. |
 
| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. To target all entities, use `all` keyword instead of entity_id. |
| `hvac_mode` | no | New value of HVAC mode. |

### Action `climate.set_preset_mode`

Sets the preset mode. Supported preset modes are *eco* and *comfort*. These are identical to the respective Viessmann programs and are only active temporarily for 8 hours.
Eco mode reduces the target temperature by 3°C, whereas Comfort mode sets the target temperature to a configurable value. Please consult your heating device manual for more information.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. To target all entities, use `all` keyword instead of entity_id. |
| `preset_mode` | no | New value of preset mode. |

### Action `water_heater.set_temperature`

Sets the target temperature of domestic hot water to the given temperature.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. |
| `temperature` | no | New target temperature for water heater. |

## Troubleshooting

### UTF-8 characters in passwords

The underlying PyViCare Python library cannot handle UTF-8 characters in passwords, so do not use for example `ü`, `ø`, etc. in passwords.

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

This integration follows standard integration removal. Once the integration is removed, you can remove the API client (assuming it was only used by this integration) by going to the [Viessmann developer portal](https://app.developer.viessmann.com/) and deleting the client you created for Home Assistant.

{% include integrations/remove_device_service.md %}
