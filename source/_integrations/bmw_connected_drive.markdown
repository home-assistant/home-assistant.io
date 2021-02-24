---
title: BMW Connected Drive
description: Instructions on how to setup your BMW Connected Drive account with Home Assistant.
ha_category:
  - Car
  - Binary Sensor
  - Presence Detection
  - Lock
  - Sensor
  - Notifications
ha_release: 0.64
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@gerard33'
  - '@rikroe'
ha_domain: bmw_connected_drive
ha_platforms:
  - binary_sensor
  - device_tracker
  - lock
  - notify
  - sensor
---

The `bmw_connected_drive` integration lets you retrieve data of your BMW vehicle from the BMW Connected Drive portal. You need to have a working BMW Connected Drive account and a Connected Drive enabled vehicle for this to work.

The `bmw_connected_drive` integration also works with (recent) Mini vehicles. You need to have a working Mini Connected account, and a Mini Connected enabled vehicle for this to work.

<div class='note'>
The entities available in Home Assistant heavily depend on your vehicle's capabilities (model year, headunit, etc.). The integration will make sure all available car attributes are added as entities.
</div>

For compatibility with your BMW vehicle check the [bimmer_connected page](https://github.com/bimmerconnected/bimmer_connected) on GitHub.

This integration provides the following platforms:

- Binary Sensors: Doors, windows, condition based services, check control messages, parking lights, door lock state, charging status (electric cars) and connections status (electric cars).
- Device tracker: The location of your car.
- Lock: Control the lock of your car.
- Sensors: Mileage, remaining range, remaining fuel, charging time remaining (electric cars), charging status (electric cars), remaining range electric (electric cars).
- Notifications: Send messages or Points of Interest (POI) to your car.
- Services: Turn on air condition, sound the horn, flash the lights, update the vehicle location and update the state. More details can be found [here](/integrations/bmw_connected_drive/#services).

## Configuration

The preferred way to enable the `bmw_connected_drive` integration is via **Configuration** > **Integrations**. After connecting to your account, you can set the following settings in the integration's options:

| Setting | Description |
|---------|-------------|
| Read-only | No execution of services to the vehicle. Still possible to send messages and POIs via `notify` and to request a status update via `bmw_connected_drive.update_state`.
| Use Home Assistant location for car location polls | Older cars (non i3/i8 build before 7/2014) require the phone to be close to the car to get location updates. Enable this option to use the location of your Home Assistant instance for these queries, so updates are available when your car is in the surrounding of your home. | 

The following settings in your `configuration.yaml` file are considered legacy. They will be imported into **Configuration** > **Integrations** and you can set the options from above. Changes to `configuration.yaml` after the first import will be ignored. 

### Legacy configuration

```yaml
# Example configuration.yaml entry
bmw_connected_drive:
  name:
    username: USERNAME_BMW_CONNECTED_DRIVE
    password: PASSWORD_BMW_CONNECTED_DRIVE
    region: one of "north_america", "china", "rest_of_world"
```

{% configuration %}
bmw_connected_drive:
  description: configuration
  required: true
  type: map
  keys:
    name:
      description: Name of your account in Home Assistant.
      required: true
      type: string
    username:
      description: Your BMW Connected Drive username.
      required: true
      type: string
    password:
      description: Your BMW Connected Drive password.
      required: true
      type: string
    region:
      description: "The region of your Connected Drive account. Please use one of these values: `north_america`, `china`, `rest_of_world`"
      required: true
      type: string
    read_only:
      description: In read only mode, all services including the lock of the vehicle are disabled.
      required: false
      type: boolean
      default: false
{% endconfiguration %}

## Notifications

The `bmw_connected_drive` integration offers a notification service. Using this service you can send messages or Points of Interest (POI) to your vehicle. In your vehicle you can select this POI and the navigation will automatically start using the POI as a destination.
The name of the service is `notify.bmw_connected_drive_<your_vehicle>`.

### Examples

A few examples on how to use the notification service.

#### Send a text message to your vehicle

```yaml
...
action:
  service: notify.bmw_connected_drive_<your_vehicle>
  data:
    title: Message from Home Assistant # optional, will default to "Home Assistant" when left empty
    message: The text of the message you want to send to your vehicle
```

#### Send a Point of Interest to your vehicle

```yaml
...
action:
  service: notify.bmw_connected_drive_<your_vehicle>
  data:
    message: The name of the POI # this is shown on the iDrive dashboard
    data:
      location:
        latitude: 48.177024
        longitude: 11.559107
        street: Street name  # Optional
        city: City name  # Optional
        postal_code: Postal Code  # Optional
        country: Country  # Optional
```

## Services

The `bmw_connected_drive` integration offers several services. In case you need to provide the vehicle identification number (VIN) as a parameter, you can see the VIN as attribute of all enties, e.g. (binary) sensors or the device tracker. The VIN is a 17 digit alphanumeric string, e.g., `WBANXXXXXX1234567`.

Using these services will impact the state of your vehicle. So use these services with care!

### Locking and unlocking

The vehicle can be locked and unlocked via the lock integration that is created automatically for each vehicle. Before invoking these services, make sure it's safe to lock/unlock the vehicle in the current situation.

### Air condition

The air condition of the vehicle can be activated with the service `bmw_connected_drive.activate_air_conditioning`.

What exactly is started here depends on the type of vehicle. It might range from just ventilation over auxiliary heating to real air conditioning. If your vehicle is equipped with auxiliary heating, only trigger this service if the vehicle is parked in a location where it is safe to use it (e.g., not in an underground parking or closed garage).

The vehicle is identified via the parameter `vin`.

### Sound the horn

The service `bmw_connected_drive.sound_horn` sounds the horn of the vehicle. This option is not available in some countries (among which  the UK). Use this feature responsibly, as it might annoy your neighbors. The vehicle is identified via the parameter `vin`.

### Flash the lights

The service `bmw_connected_drive.light_flash` flashes the lights of the vehicle. The vehicle is identified via the parameter `vin`.

### Vehicle finder

The service `bmw_connected_drive.find_vehicle` requests the vehicle to update the GPS location. This can be used for older vehicles which don't automatically send the updated GPS location. The vehicle is identified via the parameter `vin`.

### Update the state

The service `bmw_connected_drive.update_state` fetches the last state of the vehicles of all your accounts from the BMW server. This does *not* trigger an update from the vehicle; it gets the data from the BMW servers. So this service does *not* interact with your vehicles.

This service does not require any attributes.

## Disclaimer

This software is not affiliated with or endorsed by BMW Group.
