---
title: FleetGO
description: Instructions on how to use a FleetGO as a device tracker.
ha_category:
  - Car
ha_iot_class: Cloud Polling
ha_release: 0.76
ha_domain: fleetgo
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `fleetgo` device tracker {% term integration %} allows you to integrate your vehicles equipped with [FleetGO](https://fleetgo.com) hardware into Home Assistant. It allows you to see certain details about your vehicle, but also shows your vehicle on the map.

## Setup

To use this {% term integration %}, you need an **API key** and **API secret**, which can be requested by contacting [info@fleetgo.com](mailto:info@fleetgo.com?subject=API%20Key).

## Configuration

To use this device tracker in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: fleetgo
    client_id: YOUR_CLIENT_ID
    client_secret: YOUR_CLIENT_SECRET
    username: YOUR_FLEETGO_USERNAME
    password: YOUR_FLEETGO_PASSWORD
    include:
        - LICENSE_PLATE
```

{% configuration %}
client_id:
  description: The client ID used to connect to the FleetGO API.
  required: true
  type: string
client_secret:
  description: The client secret used to connect to the FleetGO API.
  required: true
  type: string
username:
  description: Your FleetGO username.
  required: true
  type: string
password:
  description: Your FleetGO password.
  required: true
  type: string
include:
  description: A list of license plates to include, if this is not specified, all vehicles will be added.
  required: false
  type: list
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions on how to configure the people to be tracked.

## Available attributes

| Attribute           | Description                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| latitude            | The latitude of your vehicle                                                                                                       |
| longitude           | The longitude of your vehicle                                                                                                      |
| altitude            | Altitude of your vehicle                                                                                                           |
| id                  | Identifier used to identify your vehicle                                                                                           |
| make                | The make of the vehicle                                                                                                            |
| model               | Model of your vehicle                                                                                                              |
| license_plate       | License plate number                                                                                                               |
| active              | If the engine is currently active or not                                                                                           |
| odo                 | The odometer in kilometers                                                                                                         |
| speed               | The current speed of your vehicle, in KM/h                                                                                         |
| last_seen           | The date and time when your vehicle last communicated with the API                                                                 |
| fuel_level          | Fuel level of the vehicle [1]                                                                                                      |
| malfunction_light   | Are any malfunction lights burning [1]                                                                                             |
| coolant_temperature | Temperature of the coolant [1]                                                                                                     |
| power_voltage       | Power voltage measured by the hardware [1]                                                                                         |
| distance_from_home  | How far is your vehicle located from your Home Assistant Home location                                                             |
| current_max_speed   | The maximum speed on the road the device is currently on (if available)                                                            |
| current_address     | Object with address information the device is currently on. This resolves to the closest address to the coordinates of the device. |


[1] Only available on certain cars and hardware revisions.
