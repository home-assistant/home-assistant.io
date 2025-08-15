---
title: Volvo
description: Instructions on setting up Volvo within Home Assistant.
ha_release: 2025.8
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@thomasddn'
ha_domain: volvo
ha_integration_type: integration
ha_config_flow: true
ha_category:
  - Sensor
ha_platforms:
  - sensor
ha_quality_scale: silver
related:
  - url: https://developer.volvocars.com/
    title: Volvo developers portal
---

The **Volvo** {% term integration %} is used to integrate your [Volvo](https://www.volvocars.com/) vehicle.

## Supported vehicles

- Car models starting from model year 2010. Features available depend on model and year.
- Cars located in Europe, Middle East, Africa, US, Canada, and Latin America regions. Or view the [full list of countries](https://developer.volvocars.com/terms-and-conditions/apis-supported-locations/).

## Prerequisites

1. Head over to [Volvo's developer portal](https://developer.volvocars.com/).
2. Make an account.
3. Go to the [API applications page](https://developer.volvocars.com/account/#your-api-applications).
4. Create an **API application** and give it a meaningful name.

It's recommended to add an API application per vehicle you want to add. There is a maximum on the number of requests that can be made per API key per day.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
    description: "Enter the API key obtained in the prerequisites steps."
VIN:
    description: "If you have more than one car under this account, then you can select the Vehicle Identification Number of the vehicle you wish to add."
{% endconfiguration_basic %}

## Supported functionality

The **Volvo** integration provides the following entities.

### All engine types

#### Binary sensors

- **Brake fluid**: Indicates if the brake fluid level is too low
- **Brake light center**: Warns of a failure in the center brake light
- **Brake light left**: Warns of a failure in the left brake light
- **Brake light right**: Warns of a failure in the right brake light
- **Coolant level**: Indicates if the engine coolant level is too low
- **Daytime running light left**: Warns of a failure in the left daytime running light
- **Daytime running light right**: Warns of a failure in the right daytime running light
- **Door front left**<sup>*</sup>: Detects if the front left door is open or closed
- **Door front right**<sup>*</sup>: Detects if the front right door is open or closed
- **Door rear left**<sup>*</sup>: Detects if the rear left door is open or closed
- **Door rear right**<sup>*</sup>: Detects if the rear right door is open or closed
- **Engine status**: Shows if the engine is currently running
- **Fog light front**: Warns of a failure in the front fog light
- **Fog light rear**: Warns of a failure in the rear fog light
- **Hazard lights**: Warns of a failure in the hazard lights
- **High beam left**: Warns of a failure in the left high beam
- **High beam right**: Warns of a failure in the right high beam
- **Hood**<sup>*</sup>: Detects if the hood is open or closed
- **Low beam left**: Warns of a failure in the left low beam
- **Low beam right**: Warns of a failure in the right low beam
- **Oil level**<sup>*</sup>: Indicates oil level warnings and service requirements
- **Position light front left**: Warns of a failure in the front left position light
- **Position light front right**: Warns of a failure in the front right position light
- **Position light rear left**: Warns of a failure in the rear left position light
- **Position light rear right**: Warns of a failure in the rear right position light
- **Registration plate light**: Warns of a failure in the registration plate light
- **Reverse lights**: Warns of a failure in the reverse lights
- **Service**<sup>*</sup>: Indicates if service is required for the vehicle
- **Side mark lights**: Warns of a failure in the side mark lights
- **Sunroof**<sup>*</sup>: Detects if the sunroof is open or closed
- **Tailgate**<sup>*</sup>: Detects if the tailgate is open or closed
- **Tank lid**<sup>*</sup>: Detects if the tank lid is open or closed
- **Tire front left**<sup>*</sup>: Indicates pressure warnings for the front left tire
- **Tire front right**<sup>*</sup>: Indicates pressure warnings for the front right tire
- **Tire rear left**<sup>*</sup>: Indicates pressure warnings for the rear left tire
- **Tire rear right**<sup>*</sup>: Indicates pressure warnings for the rear right tire
- **Turn indication front left**: Warns of a failure in the front left turn indicator
- **Turn indication front right**: Warns of a failure in the front right turn indicator
- **Turn indication rear left**: Warns of a failure in the rear left turn indicator
- **Turn indication rear right**: Warns of a failure in the rear right turn indicator
- **Washer fluid**: Indicates if the washer fluid level is too low
- **Window front left**<sup>*</sup>: Detects if the front left window is open or closed
- **Window front right**<sup>*</sup>: Detects if the front right window is open or closed
- **Window rear left**<sup>*</sup>: Detects if the rear left window is open or closed
- **Window rear right**<sup>*</sup>: Detects if the rear right window is open or closed

{% note %}
Each binary sensor marked with "\*" has:

- An attribute indicating details about the status.
- A regular sensor, that is disabled by default, having the status as value.
{% endnote %}

#### Sensors

- **Car connection**: Connectivity of the car
- **Distance to service**: Remaining distance until the next service maintenance
- **Odometer**: Odometer
- **Time to engine service**: Remaining engine-hours until the next service maintenance
- **Time to service**: Remaining time until the next service maintenance
- **Trip automatic average speed**: Average speed on the automatic trip meter
- **Trip automatic distance**: Total distance on the automatic trip meter
- **Trip manual average speed**: Average speed on the manual trip meter
- **Trip manual distance**: Total distance on the manual trip meter

### Battery-only and plug-in hybrid

#### Sensors

- **Average energy consumption since charge**: Average energy consumption since the last charge of the battery
- **Battery**: Current state of charge of the battery
- **Battery capacity**: Total capacity of the battery
- **Distance to empty battery**: Electric range

#### Sensors for specific models

Go to Volvo's developer portal to view [the list of supported models](https://developer.volvocars.com/apis/energy/v2/overview/#availability).

- **Charging connection status**: Charging connection status
- **Charging limit**: Charging limit configured in the car
- **Charging power**: Current charging power
- **Charging power status**: Indication if power is being provided
- **Charging status**: Indication if the car is charging or not
- **Charging type**: AC or DC
- **Estimated charging time**: Estimated charging time to reach the target battery charge level
- **Trip automatic average energy consumption**: Average energy consumption on the automatic trip meter
- **Target battery charge level**: Target battery charge level configured in the car
- **Trip manual average energy consumption**: Average energy consumption on the manual trip meter

### Fuel-only and plug-in hybrid

#### Sensors

- **Distance to empty tank**: Fuel range
- **Fuel amount**: Remaining fuel
- **Trip automatic average fuel consumption**: Average fuel consumption on the automatic trip meter
- **Trip manual average fuel consumption**: Average fuel consumption on the manual trip meter

## Examples

### Estimated charging finish time

The Volvo API only provides an estimated charging time (in minutes). To calculate the finish time, you can create a **Template sensor** helper with the template below.

{% raw %}

```jinja2
{% set charging_time = states('sensor.volvo_YOUR_MODEL_estimated_charging_time') | int(0) %}
{% if charging_time > 0 -%}
  {% set new_time = now() + timedelta(minutes=charging_time) %}
  {{ new_time }}
{%- else -%}
  {{ this.state }}
{%- endif %}
```

{% endraw %}

Set the **Device class** to **Timestamp** and optionally choose your vehicle for **Device**.

## Data updates

The **Volvo** integration fetches data from the API at different intervals:

- **Every 60 minutes**: diagnostics, odometer, and statistics
- **Every 15 minutes**: car connectivity and fuel status
- **Every 2 minutes**: energy data (for battery cars)

If you decide to define a custom polling interval, beware that there is a maximum of 10,000 requests per day.
Every poll operation accounts for about a dozen calls (depends on model).

## Known limitations

The official Volvo app has access to a more feature-rich API. As a result, this integration cannot provide live updates, display tire pressure values, start air purifying, schedule climatization, show climatization status, and so on.

## Troubleshooting

### Recharge API

#### Symptoms

The **Volvo** {% term integration %} does not show recharge entities, or they are unavailable.
This happens because sometimes the Volvo recharge API does not respond properly.

#### Resolution

The integration will automatically re-enable the recharge entities once the API becomes available again.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the app of the manufacturer and remove the Home Assistant integration from there as well.
