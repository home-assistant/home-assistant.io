---
title: Volvo
description: Instructions on setting up Volvo within Home Assistant.
ha_release: 2025.8
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@thomasddn'
ha_domain: volvo
ha_integration_type: device
ha_config_flow: true
ha_category:
  - Sensor
ha_platforms:
  - binary_sensor
  - sensor
ha_quality_scale: silver
related:
  - url: https://developer.volvocars.com/
    title: Volvo developers portal
---

The **Volvo** {% term integration %} is used to integrate your [Volvo](https://www.volvocars.com/) vehicle.

## Supported vehicles

- Car models starting from model year 2010.
- Cars located in Europe, Middle East, Africa, US, Canada, and Latin America regions. Or view the [full list of countries](https://developer.volvocars.com/terms-and-conditions/apis-supported-locations/).

{% important %}
Features available depend on model, year and location.
{% endimportant %}

## Prerequisites

1. Head over to [Volvo's developer portal](https://developer.volvocars.com/).
2. Make an account.
3. Go to the [API applications page](https://developer.volvocars.com/account/#your-api-applications).
4. Create an **API application** and give it a meaningful name.

It's recommended to add an API application per vehicle you want to add. There is a maximum on the number of requests that can be made per API key per day.

{% note %}
Home Assistant will use account linking provided by Nabu Casa for authenticating with Volvo, this service is provided for free and does not require a Nabu Casa subscription.

If you want to use your own `client id` and `client secret`, or you have the [cloud integration](/integrations/cloud) disabled, proceed to "**Using custom application credentials**".
{% endnote %}

{% details "Using custom application credentials" icon="mdi:account-key" %}

1. On Volvo's API application page, click the **Publish** button underneath your API application.
2. Fill in all required fields in the screen that follows. Pay attention to:
   - **Scopes**: Make sure to select them all (you need to expand the sections).
   - **Redirect URI(s)**: Add `https://my.home-assistant.io/redirect/oauth`.
3. Click **View summary** and **confirm**.
4. Grab the `client id` and `client secret` from the confirmation page and add them to your [application credentials](/integrations/application_credentials).

{% enddetails %}

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
- **Door front left**: Detects if the front left door is open or closed
- **Door front right**: Detects if the front right door is open or closed
- **Door rear left**: Detects if the rear left door is open or closed
- **Door rear right**: Detects if the rear right door is open or closed
- **Engine status**: Shows if the engine is currently running
- **Fog light front**: Warns of a failure in the front fog light
- **Fog light rear**: Warns of a failure in the rear fog light
- **Hazard lights**: Warns of a failure in the hazard lights
- **High beam left**: Warns of a failure in the left high beam
- **High beam right**: Warns of a failure in the right high beam
- **Hood**: Detects if the hood is open or closed
- **Low beam left**: Warns of a failure in the left low beam
- **Low beam right**: Warns of a failure in the right low beam
- **Oil level**: Indicates oil level warnings and service requirements
- **Position light front left**: Warns of a failure in the front left position light
- **Position light front right**: Warns of a failure in the front right position light
- **Position light rear left**: Warns of a failure in the rear left position light
- **Position light rear right**: Warns of a failure in the rear right position light
- **Registration plate light**: Warns of a failure in the registration plate light
- **Reverse lights**: Warns of a failure in the reverse lights
- **Service**: Indicates if service is required for the vehicle
- **Side mark lights**: Warns of a failure in the side mark lights
- **Sunroof**: Detects if the sunroof is open or closed
- **Tailgate**: Detects if the tailgate is open or closed
- **Tank lid**: Detects if the tank lid is open or closed
- **Tire front left**: Indicates pressure warnings for the front left tire
- **Tire front right**: Indicates pressure warnings for the front right tire
- **Tire rear left**: Indicates pressure warnings for the rear left tire
- **Tire rear right**: Indicates pressure warnings for the rear right tire
- **Turn indication front left**: Warns of a failure in the front left turn indicator
- **Turn indication front right**: Warns of a failure in the front right turn indicator
- **Turn indication rear left**: Warns of a failure in the rear left turn indicator
- **Turn indication rear right**: Warns of a failure in the rear right turn indicator
- **Washer fluid**: Indicates if the washer fluid level is too low
- **Window front left**: Detects if the front left window is open or closed
- **Window front right**: Detects if the front right window is open or closed
- **Window rear left**: Detects if the rear left window is open or closed
- **Window rear right**: Detects if the rear right window is open or closed

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
- **Every minute**: doors and window status

If you decide to define a custom polling interval, beware that there is a maximum of 10,000 requests per day.
Every poll operation accounts for about a dozen calls (depends on model).

## Known limitations

The official Volvo app has access to a more feature-rich API. As a result, this integration cannot provide live updates, display tire pressure values, start air purifying, schedule climatization, show climatization status, and so on.

## Troubleshooting

### The `charging_power_status` entity shows `fault` as value or is unavailable

- Some models will report `fault` if there is no power from the charger (for example, because the charger was paused) while being connected.
- This field is poorly documented in the API, and therefore, we need to learn the possible values along the way. If an unknown value is detected, the entity will become `unavailable` and a warning will be logged. Please [open a ticket](https://github.com/home-assistant/core/issues/new?template=bug_report.yml) - if no one else has - with the value mentioned in the log.

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
