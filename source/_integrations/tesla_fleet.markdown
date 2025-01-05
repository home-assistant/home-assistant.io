---
title: Tesla Fleet
description: Instructions on how to integrate the Tesla Fleet API within Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Car
  - Climate
  - Cover
  - Device tracker
  - Lock
  - Media player
  - Number
  - Select
  - Sensor
  - Switch
ha_release: 2024.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - "@Bre77"
ha_domain: tesla_fleet
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
ha_integration_type: integration
---

The Tesla Fleet API {% term integration %} exposes various sensors from Tesla vehicles and energy sites using the [Tesla Fleet API](https://developer.tesla.com/).

## Prerequisites

You must have a [Tesla](https://tesla.com) account, and a [Developer Application](https://developer.tesla.com/en_AU/dashboard).

### Developer Application

You must [create your own application](https://developer.tesla.com/docs/fleet-api/getting-started/what-is-fleet-api#step-2-create-an-application) for the Tesla Fleet API and configure it as an [application credential](https://my.home-assistant.io/redirect/application_credentials).
When creating the application, you must set the redirect URL to `https://my.home-assistant.io/redirect/oauth`, but the other URLs can be set as desired. You must also complete both [step 3](https://developer.tesla.com/docs/fleet-api/getting-started/what-is-fleet-api#step-3-generate-a-public-private-key-pair) and [step 4](https://developer.tesla.com/docs/fleet-api/getting-started/what-is-fleet-api#step-4-call-the-register-endpoint) before the application will be able to make API calls.

{% include integrations/config_flow.md %}

## Scopes

When connecting your Tesla account to Home Assistant, you **must** select the `Vehicle Information` or `Energy Product Information` scope. It is recommended you select all scopes for full functionality. The `Vehicle Location` scope was added in Home Assistant 2024.1, so any authorizations performed on previous releases that want this scope will need to be [modified](https://accounts.tesla.com/en_au/account-settings/security?tab=tpty-apps).

## Pay per use
	
Previously, Tesla restricted this integration to a very modest rate limit. However, from January 2025, accounts in eligible countries will be charged for every API call. Here's what you need to know:

- Tesla provides a $10 credit per developer account per calandar month
- Every vehicle coordinator refresh, vehicle command, and wake up has a cost
- This credit only allows for a maximum of 5000 coordinator refreshes
- Energy product APIs are free to use at this time
- To go beyond the free credit, you must provide payment details to Tesla

For more details please see [developer.tesla.com](https://developer.tesla.com).

## Command signing

Certain vehicles, including all vehicles manufactured since late 2023, require vehicle commands to be signed with a private key. All actions on vehicle entities will fail with an error if this is required and the key has not been added to the vehicle.

You will need to use Tesla's [command line tools](https://github.com/teslamotors/vehicle-command/blob/main/README.md#installation-and-configuration) to generate a key pair and install the public key on your vehicle using Bluetooth.

```shell
tesla-keygen -key-file tesla_fleet.key create > tesla_fleet.pem
tesla-control -ble -key-file tesla_fleet.key -vin VINVINVINVIN -debug add-key-request tesla_fleet.pem owner cloud_key
```

Finally, copy `tesla_fleet.key` to your Home Assistant config directory and then reload the Tesla Fleet {% term integration %}.

{% note %}
If you receive a "BLE connection attempt failed" error, follow these steps:

1. Disable Bluetooth on your phone
2. Execute the `tesla-control` command
3. Re-enable Bluetooth after the command completes

This is necessary because the tool cannot establish a connection while another Bluetooth device is connected to the car.
{% endnote %}

## Entities

These are the entities available in the Tesla Fleet integration. Not all entities are enabled by default, and not all values are always available.

### Vehicles

| Domain         | Name                                       | Enabled |
| -------------- | ------------------------------------------ | ------- |
| Binary sensor  | Battery heater                             | No      |
| Binary sensor  | Cabin overheat protection actively cooling | No      |
| Binary sensor  | Charge cable                               | Yes     |
| Binary sensor  | Charger has multiple phases                | No      |
| Binary sensor  | Dashcam                                    | No      |
| Binary sensor  | Front driver door                          | Yes     |
| Binary sensor  | Front driver window                        | Yes     |
| Binary sensor  | Front passenger door                       | Yes     |
| Binary sensor  | Front passenger window                     | Yes     |
| Binary sensor  | Preconditioning enabled                    | No      |
| Binary sensor  | Preconditioning                            | No      |
| Binary sensor  | Rear driver door                           | Yes     |
| Binary sensor  | Rear driver window                         | Yes     |
| Binary sensor  | Rear passenger door                        | Yes     |
| Binary sensor  | Rear passenger window                      | Yes     |
| Binary sensor  | Scheduled charging pending                 | No      |
| Binary sensor  | Status                                     | Yes     |
| Binary sensor  | Tire pressure warning front left           | No      |
| Binary sensor  | Tire pressure warning front right          | No      |
| Binary sensor  | Tire pressure warning rear left            | No      |
| Binary sensor  | Tire pressure warning rear right           | No      |
| Binary sensor  | Trip charging                              | No      |
| Binary sensor  | User present                               | Yes     |
| Button         | Flash lights                               | Yes     |
| Button         | Homelink                                   | Yes     |
| Button         | Honk horn                                  | Yes     |
| Button         | Keyless driving                            | Yes     |
| Button         | Play fart                                  | Yes     |
| Button         | Wake                                       | Yes     |
| Climate        | Cabin overheat protection                  | No      |
| Climate        | Climate                                    | Yes     |
| Cover          | Charge port door                           | Yes     |
| Cover          | Frunk                                      | Yes     |
| Cover          | Sunroof                                    | No      |
| Cover          | Trunk                                      | Yes     |
| Cover          | Vent windows                               | Yes     |
| Device tracker | Location                                   | Yes     |
| Device tracker | Route                                      | Yes     |
| Lock           | Charge cable lock                          | Yes     |
| Lock           | Lock                                       | Yes     |
| Media player   | Media player                               | Yes     |
| Number         | Charge current                             | Yes     |
| Number         | Charge limit                               | Yes     |
| Select         | Seat heater front left                     | Yes     |
| Select         | Seat heater front right                    | Yes     |
| Select         | Seat heater rear center                    | No      |
| Select         | Seat heater rear left                      | No      |
| Select         | Seat heater rear right                     | No      |
| Select         | Seat heater third row left                 | No      |
| Select         | Seat heater third row right                | No      |
| Select         | Steering wheel heater                      | Yes     |
| Sensor         | Battery level                              | Yes     |
| Sensor         | Battery range                              | Yes     |
| Sensor         | Charge cable                               | No      |
| Sensor         | Charge energy added                        | Yes     |
| Sensor         | Charge rate                                | Yes     |
| Sensor         | Charger current                            | Yes     |
| Sensor         | Charger power                              | Yes     |
| Sensor         | Charger voltage                            | Yes     |
| Sensor         | Charging                                   | Yes     |
| Sensor         | Distance to arrival                        | Yes     |
| Sensor         | Driver temperature setting                 | No      |
| Sensor         | Estimate battery range                     | No      |
| Sensor         | Fast charger type                          | No      |
| Sensor         | Ideal battery range                        | No      |
| Sensor         | Inside temperature                         | Yes     |
| Sensor         | Odometer                                   | No      |
| Sensor         | Outside temperature                        | Yes     |
| Sensor         | Passenger temperature setting              | No      |
| Sensor         | Power                                      | No      |
| Sensor         | Shift state                                | No      |
| Sensor         | Speed                                      | No      |
| Sensor         | State of charge at arrival                 | No      |
| Sensor         | Time to arrival                            | Yes     |
| Sensor         | Time to full charge                        | Yes     |
| Sensor         | Tire pressure front left                   | No      |
| Sensor         | Tire pressure front right                  | No      |
| Sensor         | Tire pressure rear left                    | No      |
| Sensor         | Tire pressure rear right                   | No      |
| Sensor         | Traffic delay                              | No      |
| Sensor         | Usable battery level                       | No      |
| Switch         | Auto seat climate left                     | Yes     |
| Switch         | Auto seat climate right                    | Yes     |
| Switch         | Auto steering wheel heater                 | Yes     |
| Switch         | Charge                                     | Yes     |
| Switch         | Defrost                                    | Yes     |
| Switch         | Sentry mode                                | Yes     |

### Energy sites

| Domain        | Name                     | Enabled |
| ------------- | ------------------------ | ------- |
| Binary sensor | Backup capable           | Yes     |
| Binary sensor | Grid services active     | Yes     |
| Binary sensor | Grid services enabled    | Yes     |
| Binary sensor | Storm watch active       | Yes     |
| Number        | Backup reserve           | Yes     |
| Number        | Off grid reserve         | Yes     |
| Select        | Allow export             | Yes     |
| Select        | Operation mode           | Yes     |
| Sensor        | Battery power            | Yes     |
| Sensor        | Energy left              | Yes     |
| Sensor        | Generator power          | No      |
| Sensor        | Grid power               | Yes     |
| Sensor        | Grid services power      | Yes     |
| Sensor        | Grid status              | Yes     |
| Sensor        | Island status            | Yes     |
| Sensor        | Load power               | Yes     |
| Sensor        | Percentage charged       | Yes     |
| Sensor        | Solar power              | Yes     |
| Sensor        | Total pack energy        | No      |
| Sensor        | VPP backup reserve       | Yes     |
| Sensor        | Version                  | Yes     |
| Switch        | Allow charging from grid | Yes     |
| Switch        | Storm watch              | Yes     |

### Wall connector

| Domain | Name        | Enabled |
| ------ | ----------- | ------- |
| Sensor | Fault state | No      |
| Sensor | Power       | Yes     |
| Sensor | State       | Yes     |
| Sensor | Vehicle     | Yes     |

## Vehicle sleep

Constant API polling will prevent most Model S and Model X vehicles manufactured before 2021 from sleeping, so the integration will stop polling these vehicles for 15 minutes, after 15 minutes of inactivity. You can call the `homeassistant.update_entity` service to force polling the API, which will reset the timer.

## Energy dashboard

The Tesla Fleet API only provides power data for Powerwall and Solar products. This means they cannot be used on the energy dashboard directly.

Energy flows can be calculated from `Battery power` and `Grid power` sensors using a [Template Sensor](/integrations/template/) to separate the positive and negative values into positive import and export values.
The `Load power`, `Solar power`, and the templated sensors can then use a [Riemann Sum](/integrations/integration/) to convert their instant power (kW) values into cumulative energy values (kWh),
which then can be used within the energy dashboard.
