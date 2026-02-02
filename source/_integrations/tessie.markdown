---
title: Tessie
description: Instructions on how to integrate Tessie within Home Assistant.
ha_category:
  - Binary Sensor
  - Button
  - Car
  - Climate
  - Cover
  - Device Tracker
  - Lock
  - Media Player
  - Number
  - Sensor
  - Update
ha_release: 2024.1
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: tessie
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - device_tracker
  - diagnostics
  - lock
  - media_player
  - number
  - select
  - sensor
  - switch
  - update
ha_integration_type: hub
---

The **Tessie** {% term integration %} exposes various commands and sensors from the Tesla vehicles and energy products connected to your [Tessie](https://tessie.com/) subscription.

## How you can use this integration

This integration provides comprehensive control and monitoring of your Tesla vehicles and energy products through Home Assistant:

### Vehicle control

- Monitor battery level, range, charging status, and location
- Control climate (heating, cooling, seat heaters, steering wheel heater)
- Lock/unlock doors and control windows, trunk, frunk, and charge port
- Start/stop charging and set charge limits
- Enable Sentry mode, valet mode, and defrost mode
- Flash lights, honk horn, and trigger HomeLink
- Track vehicle location and navigation destination
- Install software updates

### Energy product monitoring and control

- Monitor battery power, grid power, solar power, and load consumption
- View energy reserves and state of charge
- Control backup reserve and operating modes
- Manage charging from grid and storm watch settings
- Monitor grid services and virtual power plant (VPP) participation

## Supported devices

This integration supports all Tesla vehicle models and energy products:

### Vehicles

- Model 3
- Model Y
- Model S
- Model X
- Cybertruck

### Energy products

- Powerwall 2/3
- Powerwall+
- Solar Inverters

## Prerequisites

You must have an active [Tessie](https://my.tessie.com/) subscription, generate a [Tessie Access Token](https://my.tessie.com/settings/api) and grant Tessie access to your Tesla vehicle by generating a [Tesla Virtual Key](https://www.tesla.com/_ak/tessie.com).

{% include integrations/config_flow.md %}


Once the integration is set up, all connected Tesla vehicles and energy products will be automatically added to Home Assistant. Note that reconfiguration through the UI is not currently supported. If you need to change your API token or reconnect your account, you will need to remove and re-add the integration.

## Vehicle entities

### Binary sensor

The integration will create binary sensor entities for a variety of metrics related to your vehicles:

#### Charge state

- Battery charging
- Battery heater
- Preconditioning enabled
- Scheduled charging enabled
- Trip charging enabled

#### Climate state

- Auto seat climate left
- Auto seat climate right
- Auto steering Wheel climate
- Overheat protection enabled
- Overheat protection running

#### Vehicle state

- Dashcam recording
- Front driver window
- Front passenger door
- Front passenger window
- Rear driver door
- Rear driver window
- Rear passenger door
- Rear passenger window
- Tire pressure warning front left
- Tire pressure warning front right
- Tire pressure warning rear left
- Tire pressure warning rear right
- User present

### Button

The integration will create button entities to control various aspects of the vehicle:

- Flash lights
- HomeLink
- Honk horn
- Keyless driving
- Play fart
- Wake

### Climate

The integration will create a climate entity to control the vehicle's climate control system. This entity can:

- Change the driver's set temperature
- Change to one of the three keep modes: Keep, Dog, and Camp
- Turn on and off

The passenger set temperature is shown as a sensor but cannot be changed by Tessie.

### Cover

The integration will create a cover entity to control various aspects of your vehicles:

- Open/Close trunk
- Open/Close charge port
- Open frunk
- Vent/Close windows
- Vent/Close sunroof

### Device tracker

The integration will create device tracker entities for the vehicle's current location and navigation destination.

### Lock

The integration will create lock entities to lock and unlock the vehicle, and to control:

- Charge cable
- Speed limit

### Media Player

The integration will create media player entities to show what each vehicle is currently playing.

### Number

The integration will create number entities to control:

- Charge current
- Charge limit
- Speed limit

### Select

The integration will create a select entity to control each of the seat heaters. It allows you to set each seat heater to Off, Low, Medium, or High.

For vehicles equipped with cooled (ventilated) seats, a select entity will also be added to control each cooled seat.

Heated seats:

- Front left
- Front right
- Rear center (if installed)
- Rear left (if installed)
- Rear right (if installed)
- Third row left (if installed)
- Third row right (if installed)

Cooled seats:

- Front left
- Front right

### Sensor

The integration will create sensor entities for a variety of metrics related to your vehicles:

#### Charge state

- Battery charging
- Battery level
- Battery range
- Battery range estimate (disabled)
- Battery range ideal (disabled)
- Charge energy added
- Charge rate
- Charger current
- Charger power
- Charger voltage

#### Climate state

- Driver temperature setting
- Inside temperature
- Outside temperature
- Passenger temperature setting

#### Drive state

- Destination
- Distance to arrival
- Power
- Shift state
- Speed
- State of charge at arrival
- Time to arrival
- Traffic delay

#### Vehicle state

- Odometer
- Online
- Tire pressure front left
- Tire pressure front right
- Tire pressure rear left
- Tire pressure rear right

### Switch

The integration will create switch entities to control various aspects of your vehicles:

- Charge
- Defrost mode
- Sentry mode
- Steering wheel heater
- Valet mode

### Update

The integration will show vehicle software updates and their installation progress. Updates can only be installed from Home Assistant after they have finished downloading.

## Energy entities

### Binary sensor

- Backup capable
- Grid services enabled
- Grid services active
- Storm watch active

### Number

- Backup reserve
- Off grid reserve

### Select

- Allow export
- Operation mode

### Sensor

- Battery power
- Energy left
- Generator power
- Grid power
- Grid services power
- Load power
- Percentage charged
- Solar power
- Total pack energy
- Version
- Vehicle
- <abbr title="Virtual power plant">VPP</abbr> backup reserve
- Fault state code
- Power
- State code

### Switch

- Allow charging from grid
- Storm watch

## Energy dashboard

The Tesla Fleet API only provides power data for Powerwall and Solar products. This means they cannot be used on the energy dashboard directly.

Energy flows can be calculated from `Battery power` and `Grid power` sensors using a [Template Sensor](/integrations/template/) to separate the positive and negative values into positive import and export values.
The `Load power`, `Solar power`, and the templated sensors can then use a [Riemann Sum](/integrations/integration/) to convert their instant power (kW) values into cumulative energy values (kWh),
which then can be used within the energy dashboard.

## Examples

Here are some common automation examples using the Tessie integration:

### Precondition vehicle before departure

This automation preconditions your Tesla 15 minutes before a scheduled departure time:

```yaml
automation:
  - alias: "Precondition Tesla before work"
    triggers:
      - trigger: time
        at: "07:45:00"
    conditions:
      - condition: time
        weekday:
          - mon
          - tue
          - wed
          - thu
          - fri
    actions:
      - action: climate.turn_on
        target:
          entity_id: climate.my_tesla
        data:
          temperature: 21
```

### Start charging during off-peak hours

This automation starts charging when electricity rates are lowest:

```yaml
automation:
  - alias: "Charge Tesla during off-peak hours"
    triggers:
      - trigger: time
        at: "23:00:00"
    conditions:
      - condition: numeric_state
        entity_id: sensor.my_tesla_battery_level
        below: 80
      - condition: state
        entity_id: binary_sensor.my_tesla_battery_charging
        state: "off"
    actions:
      - action: switch.turn_on
        target:
          entity_id: switch.my_tesla_charge
```

### Stop charging when battery reaches target

This automation stops charging when the desired charge level is reached:

```yaml
automation:
  - alias: "Stop Tesla charging at 80%"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.my_tesla_battery_level
        above: 79
    conditions:
      - condition: state
        entity_id: binary_sensor.my_tesla_battery_charging
        state: "on"
    actions:
      - action: switch.turn_off
        target:
          entity_id: switch.my_tesla_charge
```

### Open garage door when arriving home

This automation opens your garage door when your Tesla arrives home:

```yaml
automation:
  - alias: "Open garage when Tesla arrives"
    triggers:
      - trigger: zone
        entity_id: device_tracker.my_tesla_location
        zone: zone.home
        event: enter
    actions:
      - action: cover.open_cover
        target:
          entity_id: cover.garage_door
```

### Notify when charging is complete

This automation sends a notification when your vehicle has finished charging:

{% raw %}
```yaml
automation:
  - alias: "Notify when Tesla charging complete"
    triggers:
      - trigger: state
        entity_id: binary_sensor.my_tesla_battery_charging
        from: "on"
        to: "off"
    conditions:
      - condition: numeric_state
        entity_id: sensor.my_tesla_battery_level
        above: 79
    actions:
      - action: notify.mobile_app
        data:
          message: "Tesla charging is complete at {{ states('sensor.my_tesla_battery_level') }}%"
```
{% endraw %}

## Troubleshooting

### Actions return errors

If a vehicle action returns an error in Home Assistant, you should first try to perform the same action in the Tessie app. The app will guide you through the steps to fix common issues like command signing or scopes.

### Command signing

Most Tesla vehicles manufactured in 2021 or later require command signing for security. Command signing ensures that commands sent to your vehicle are cryptographically signed and verified.

To enable command signing:

1. Open the Tessie app on your mobile device.
2. Navigate to your vehicle settings.
3. Follow the prompts to set up a [Tesla Virtual Key](https://www.tesla.com/_ak/tessie.com).
    - This installs Tessie's unique encryption fingerprint on your vehicle.

Once configured, all commands from Tessie (including those sent through Home Assistant) will be signed with Tessie's private key. The vehicle verifies each command before execution, preventing unauthorized access even if your API token is compromised.

Command signing is compatible with:

- Model 3 and Model Y (all years)
- Model S and Model X (2021 or newer)

### Missing scopes or permissions

Tessie requires specific Tesla account permissions to function properly. If certain features aren't working, you may need to verify your account has granted the necessary scopes:

- **Vehicle Information** - Required to retrieve vehicle data (battery level, climate status, etc.)
- **Vehicle Location** - Required to track vehicle location
- **Vehicle Commands** - Required to control the vehicle (lock/unlock, climate, etc.)
- **Vehicle Charging Management** - Required to control charging
- **Energy Product Information** - Required to retrieve energy product data
- **Energy Product Commands** - Required to control energy products (Powerwall, Solar)

To verify or update permissions:

1. Log in to your [Tessie account](https://my.tessie.com/)
2. Check your Tesla account connection settings
3. Re-authenticate if necessary to grant missing permissions

If you're still experiencing issues, try removing and re-adding the integration in Home Assistant.

### Data not updating

If vehicle data is not updating as expected, this may be related to your Tessie field configuration. Certain vehicle fields may not update frequently depending on your subscription tier and field settings. You can adjust these settings in your [Tessie account settings](https://my.tessie.com/settings).

Energy product data should update regularly without restrictions.

## Known limitations

- **Passenger temperature control**: The passenger set temperature is shown as a sensor but cannot be changed through Tessie or Home Assistant. Only the driver's temperature can be controlled.
- **Field update frequency**: Some vehicle data fields may not update frequently depending on your Tessie subscription tier and field configuration settings.
- **No reconfiguration**: The integration cannot be reconfigured through the UI. To change your API token or settings, you must remove and re-add the integration.
- **Software updates**: Vehicle software updates can only be installed from Home Assistant after they have finished downloading to the vehicle.

## Diagnostics

The Tessie integration supports [diagnostic data collection](/docs/configuration/troubleshooting/#download-diagnostics) to help troubleshoot issues. If you're experiencing problems with the integration, you can download diagnostic information to include when reporting issues.

The diagnostic data contains a complete copy of all API data received from Tessie for your devices. This information can be helpful for developers when investigating issues.

## Removing the integration

{% include integrations/remove_device_service.md %}
