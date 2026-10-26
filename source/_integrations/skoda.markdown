---
title: Škoda
description: Instructions on setting up Škoda within Home Assistant.
ha_release: '2026.11'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@TomVSB'
  - '@DavidMagyarics'
  - '@dvx76'
ha_domain: skoda
ha_integration_type: device
ha_config_flow: true
ha_categories:
  - vehicles_transport.cars_evs
ha_platforms:
  - sensor
ha_quality_scale: bronze
related:
  - url: https://public.api.connect.skoda-auto.cz/docs
    title: Škoda public API documentation
---

The **Škoda** {% term integration %} lets you monitor your [Škoda](https://www.skoda-auto.com) vehicle in Home Assistant. It retrieves vehicle information from Škoda Connect through the official Škoda B2C public API.

## Use cases

### Monitor vehicle status

Keep an eye on the mileage, fuel or battery level, and estimated driving range. Use this information in dashboards and automations, or track how the car is used over time.

### Monitor charging

Track the battery's state of charge, electric range, charging power, charging state, and estimated time until fully charged. Get notified when charging starts, finishes, or is unexpectedly interrupted.

The integration is read-only. It reports the charging state provided by Škoda Connect but cannot start, stop, or schedule charging.

### Monitor climate control and auxiliary heating

See the target cabin temperature and, while climate control is active, the estimated time when the target temperature will be reached. For supported vehicles, you can also monitor the auxiliary heating mode and its estimated completion time.

The integration cannot start or stop climate control or auxiliary heating. The target temperature is not available for some combustion vehicles.

## Supported vehicles

- Vehicles available through **Škoda Connect** and the [Škoda public API](https://public.api.connect.skoda-auto.cz/docs).

{% important %}
The available entities depend on the vehicle's model, powertrain, equipment, and active Škoda Connect services. For example, fuel sensors are available only for combustion-engine and hybrid vehicles, while charging sensors are available only for vehicles that support charging.

Activate Škoda Connect in the [MyŠkoda app](https://go.skoda.eu/myskoda) before setting up the integration. When a Škoda Connect service expires, entities associated with that service are no longer available. You can renew services in the [Škoda Connect Shop](https://shop.skoda-connect.com/).
{% endimportant %}

## Prerequisites

1. Make sure Škoda Connect is active and at least one vehicle is registered in your account.
2. In the [MyŠkoda app](https://go.skoda.eu/api-keys), go to **Profile** > **Smart Home** and generate an API key for the vehicle you want to add. Copy the key when it is displayed because you cannot view it again later.
3. Find the vehicle's 17-character **Vehicle Identification Number (VIN)**. It is available in the MyŠkoda app, in the vehicle registration documents, and on the vehicle itself.

{% note %}
API keys are issued per vehicle. If you want to add more than one vehicle, generate a separate API key for each one.
{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Vehicle VIN (17 characters):
  description: "The 17-character Vehicle Identification Number (VIN) of your vehicle."
API key:
  description: "The API key generated in the MyŠkoda app under **Profile** > **Smart Home**."
{% endconfiguration_basic %}

## Supported functionality

The **Škoda** integration provides the following sensors. The available sensors depend on the vehicle's equipment and powertrain.

### Sensors

- **Mileage**: Total distance driven, from the odometer.
- **Fuel level**: Current fuel level in %, for vehicles with a combustion or hybrid engine.
- **Battery state of charge**: Current battery charge level in %, for vehicles with a battery (BEV or PHEV).
- **Total range**: Combined estimated range across all engines.
- **Electric range**: Estimated electric-only range, for vehicles with a battery (BEV or PHEV).
- **Air conditioning remaining time**: Estimated time when the target cabin temperature will be reached, while climate control is active.
- **Charging power**: Current charging power, while the vehicle is actively charging.
- **Charging state**: `charging`, `connect_cable`, `ready_for_charging`, `conserving`, `discharging`, or `charging_interrupted`.
- **Time to full charge**: Estimated time when the battery will reach the defined target level, while charging.
- **Charge type**: `ac`, `dc`, `off`, or `not_charging`.
- **Auxiliary heating mode**: Current mode (heating/ventilation) of the auxiliary heating, for equipped vehicles.
- **Auxiliary heating remaining duration**: Estimated time when auxiliary heating will finish, while active.
- **Target cabin temperature**: The cabin temperature configured on the vehicle/MyŠkoda app for Climate Control/Auxiliary Air Conditioning (where supported).

### Diagnostic sensors

- **Registration plate**: The vehicle's registration plate, if set in MyŠkoda.

## Examples

### Notify when charging is interrupted

Send a notification if charging unexpectedly stops before the vehicle is fully charged.

```yaml
alias: Notify me if charging is interrupted
triggers:
  - trigger: state
    entity_id: sensor.your_vehicle_charging_state
    to: "charging_interrupted"
actions:
  - action: notify.mobile_app_phone_john_doe
    data:
      title: 🚘 Škoda
      message: "Charging was interrupted."
```

## Data updates

The **Škoda** integration {% term polling polls %} the current vehicle status every 5 minutes.

The Škoda public API enforces a rate limit per Vehicle Identification Number (VIN). If the limit is reached, the integration waits before attempting to retrieve data again.

## Known limitations

- The integration is read-only. It reports vehicle status but cannot start or stop charging, control climate, or lock or unlock the vehicle.
- Available sensors depend on the vehicle's model, powertrain, equipment, and the validity of Škoda Connect licenses.

## Troubleshooting

### Entities become unavailable, or setup fails with a rate-limit error

The Škoda public API enforces a rate limit per Vehicle Identification Number (VIN). If you reach it, wait until the rate-limit window resets. An existing integration entry retries automatically. If the error occurs while adding the integration, submit the configuration form again after the limit resets.

### Re-authentication

If the API key expires or is revoked, the integration can no longer retrieve data from the vehicle. Generate a new API key in the MyŠkoda app under **Profile** > **Smart Home**, or through the [Škoda API key portal](https://go.skoda.eu/api-keys).

Remove the existing integration entry and add the vehicle again using the new API key.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removing the integration, you can optionally revoke the associated API key in the MyŠkoda app or via the [web portal](https://go.skoda.eu/api-keys) if you no longer need it.
