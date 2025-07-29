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

## Configuration options

You have the following configuration options if your model has a combustion engine:

{% configuration_basic %}
Fuel consumption unit:
  description: You can specify in which unit (L/100 km, mpg (UK), or mpg (US)) the fuel consumption should be displayed.
{% endconfiguration_basic %}

## Supported functionality

The **Volvo** integration provides the following entities.

### All engine types

#### Sensors

- **Car connection**: Connectivity of the car
- **Distance to service**: Remaining distance until the next service maintenance
- **Engine time to service**: Remaining engine-hours until the next service maintenance
- **Odometer**: Odometer
- **TA avg. speed**: Average speed on the automatic trip meter
- **TA distance**: Total distance on the automatic trip meter
- **Time to service**: Remaining time until the next service maintenance
- **TM avg. speed**: Average speed on the manual trip meter
- **TM distance**: Total distance on the manual trip meter

### Battery-only and plug-in hybrid

#### Sensors

- **Avg. energy consumption since charge**: Average energy consumption since the last charge of the battery
- **Battery capacity**: Total capacity of the battery
- **Battery charge level**: Current state of charge of the battery
- **Distance to empty battery**: Electric range

#### Sensors for specific models

Go to Volvo's developer portal to view [the list of supported models](https://developer.volvocars.com/apis/energy/v1/overview/#availability).

- **Charging connection status**: Charging connection status
- **Charging limit**: Charging limit configured in the car
- **Charging status**: Indication if the car is charging or not
- **Est. charging time**: Estimated charging time to reach the target battery charge level
- **TA avg. energy consumption**: Average energy consumption on the automatic trip meter
- **Target battery charge level**: Target battery charge level configured in the car
- **TM avg. energy consumption**: Average energy consumption on the manual trip meter

### Fuel-only and plug-in hybrid

#### Sensors

- **Distance to empty tank**: Fuel range
- **Fuel amount**: Remaining fuel
- **TA avg. fuel consumption**: Average fuel consumption on the automatic trip meter
- **TM avg. fuel consumption**: Average fuel consumption on the manual trip meter

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

The **Volvo** integration fetches data from the API every 135 seconds by default.
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
