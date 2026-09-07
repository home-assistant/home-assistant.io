---
title: Škoda
description: Instructions on setting up Škoda within Home Assistant.
ha_release: 2026.10
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@TomVSB'
  - '@DavidMagyarics'
  - '@dvx76'
ha_domain: skoda
ha_integration_type: hub
ha_config_flow: true
ha_category:
  - Car
  - Sensor
ha_platforms:
  - sensor
ha_quality_scale: bronze
related:
  - url: https://public.api.connect.skoda-auto.cz/docs
    title: Škoda public API documentation
---

The **Škoda** {% term integration %} lets you monitor your [Škoda](https://www.skoda-auto.com) vehicle in Home Assistant using the official Škoda B2C public API and Škoda Connect services.

## Use cases

### Monitor vehicle status

Keep an eye on the mileage, fuel/battery level, and when the vehicle last reported in. Build automations around synchronization gaps, or simply track how the car is used over time.

### Remote charging

Track the battery's state of charge, electric range, charging power, charging state, and estimated time until fully charged. Get notified when charging starts, finishes, or is unexpectedly interrupted.

**Note:** This integration does not provide direct control to start, stop, or schedule charging at this moment. It only reports the state reported by the Škoda Connect services. We plan to add options for starting/stopping charging and scheduling using the Charging Locations function in the future.

### Climate control / Remote auxiliary heating

See the target cabin temperature and, while active, the estimated time until the climate control system reaches it.

**Note:** This integration does not let you start or stop climate control from Home Assistant at this moment. It only reports what is currently configured on the vehicle and whether climate control is active. We plan to add the ability to start/stop climate features in the future. Viewing the target temperature is not possible on some combustion vehicles.


## Supported vehicles

- Any vehicle connected to **Škoda Connect** services through the [Škoda public API](https://public.api.connect.skoda-auto.cz/docs).

{% important %}
Which entities show up depends on your vehicle's model, powertrain, and equipment. For example, sensors related to combustion fuel only appear for vehicles with a combustion or hybrid engine, and charging-related sensors only appear for vehicles that support charging. If your Škoda Connect services are not yet active, you will not be able to use this integration. Proceed with the activation of Škoda Connect in the [**MyŠkoda app**](https://go.skoda.eu/myskoda). If any of your Škoda Connect licenses have expired, you will not be able to see sensors related to those services (e.g., viewing door/window/lock status if your Remote Access license is expired). You can renew services in the [**Škoda Connect Shop**](https://shop.skoda-connect.com/). 
{% endimportant %}

## Prerequisites

1. You need active **Škoda Connect** services with at least one vehicle registered. 
2. Obtain an API key for the vehicle you want to add in the [**MyŠkoda app** (Profile -> Smart Home section)](https://go.skoda.eu/api-keys). Remember to copy it to your clipboard, as it will be displayed only once.
3. Have the vehicle's 17-character **Vehicle Identification Number (VIN)** ready. You can find it in the MyŠkoda app, on the vehicle's registration documents, or physically on the vehicle's windshield.

{% note %}
API keys are issued per vehicle. If you want to add more than one vehicle, generate a separate API key for each one.
{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Vehicle VIN (17 characters):
    description: "The 17-character Vehicle Identification Number (VIN) of your vehicle."
API key:
    description: "Your API key from the MyŠkoda app under the Profile -> Smart Home section."
{% endconfiguration_basic %}

## Supported functionality

The **Škoda** integration provides the following sensors. Which ones appear depends on your vehicle's equipment; entities that don't apply to your vehicle are simply not created.

### Sensors

- **Mileage**: Total distance driven, from the odometer.
- **Fuel level**: Current fuel level in %, for vehicles with a combustion or hybrid engine.
- **Battery state of charge**: Current battery charge level in %, for vehicles with a battery (BEV or PHEV).
- **Total range**: Combined estimated range across all engines.
- **Electric range**: Estimated electric-only range, for vehicles with a battery (BEV or PHEV).
- **Air conditioning remaining time**: Remaining runtime of the Climate Control, while active.
- **Charging power**: Current charging power, while the vehicle is actively charging.
- **Charging state**: `Charging`, `Connect cable`, `Ready for charging`, `Conserving`, `Discharging`, or `Charging interrupted`.
- **Time to full charge**: Estimated remaining time until the battery is charged to the defined target level, while charging.
- **Charge type**: `AC`, `DC`, `Off`, or `Not charging`.
- **Auxiliary heating mode**: Current mode (heating/ventilation) of the auxiliary heating, for equipped vehicles.
- **Auxiliary heating remaining duration**: Remaining runtime of the auxiliary heating, while active.
- **Target cabin temperature**: The cabin temperature configured on the vehicle/MyŠkoda app for Climate Control/Auxiliary Air Conditioning (where supported).

### Diagnostic sensors

These are categorized as diagnostic entities. Some are disabled by default because they are mainly useful for troubleshooting; enable them from the entity's settings if you need them.

- **Last synchronization**: When the vehicle last reported its status to Škoda's servers.
- **Registration plate**: The vehicle's registration plate, if set in MyŠkoda.
- **API key expiration** _(disabled by default)_: When your API key expires. Renew it before this date to avoid losing connectivity.
- **API requests remaining** _(disabled by default)_: Remaining API requests in the current rate-limit window.
- **API rate limit reset** _(disabled by default)_: When the API rate-limit window resets.
- **Next update** _(disabled by default)_: When the integration expects to poll the API again.

## Examples

### Notify when charging is interrupted

Send a notification if charging unexpectedly stops before the vehicle is fully charged.

```yaml
alias: Notify me if charging is interrupted
triggers:
  - trigger: state
    entity_id: sensor.YOUR_MODEL_charging_state
    to: "charging_interrupted"
actions:
  - action: notify.mobile_app_phone_john_doe
    data:
      title: 🚘 Škoda
      message: "Charging was interrupted."
```

### Notify when the API key is about to expire

Send a reminder a week before your API key expires, so you can renew it before the integration loses access.

```yaml
alias: Notify me before my Škoda API key expires
triggers:
  - trigger: template
    value_template: >
      {{ (as_timestamp(states('sensor.YOUR_MODEL_api_key_expiration')) - as_timestamp(now())) < 7 * 86400 }}
actions:
  - action: notify.mobile_app_phone_john_doe
    data:
      title: 🚘 Škoda
      message: "Your Škoda API key expires in less than a week. Generate a new one in the MyŠkoda app."
```

{% note %}
The **API key expiration** sensor is disabled by default. Enable it first if you want to use this automation.
{% endnote %}

## Data updates

The **Škoda** integration polls the API for the current vehicle status once every 5 minutes, using a single API call per vehicle per update.

The Škoda public API enforces a rate limit per API key. The **API requests remaining** and **API rate limit reset** diagnostic sensors (disabled by default) let you keep an eye on your remaining quota if you need to.

## Known limitations

- This integration is currently **read-only**: it reports vehicle status but does not let you start or stop charging, control climate, or lock/unlock the vehicle from Home Assistant. This is the first version of the dedicated Škoda Home Assistant integration, and we plan to improve it over time.
- Available sensors depend on the vehicle's model, powertrain, equipment, and the validity of Škoda Connect licenses.

## Troubleshooting

### Entities become unavailable, or setup fails with a rate-limit error

The Škoda public API enforces a rate limit per API key. If you hit it, requests fail temporarily until the window resets. The integration will automatically retry; no action is needed.

### Re-authentication is requested

If your API key expires or is revoked, the integration will prompt you to re-authenticate. Generate a new API key in the MyŠkoda app (**Profile** -> **Smart Home**) or via the [web portal](https://go.skoda.eu/api-keys), and enter it when prompted.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removing the integration, you can optionally revoke the associated API key in the MyŠkoda app or via the [web portal](https://go.skoda.eu/api-keys) if you no longer need it.
