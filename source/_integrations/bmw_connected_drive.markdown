---
title: BMW Connected Drive
description: Instructions on how to setup your BMW Connected Drive account with Home Assistant.
ha_category:
  - Binary Sensor
  - Button
  - Car
  - Lock
  - Notifications
  - Presence Detection
  - Sensor
ha_release: 0.64
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@gerard33'
  - '@rikroe'
ha_domain: bmw_connected_drive
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - lock
  - notify
  - sensor
ha_integration_type: integration
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
- [Lock](/integrations/bmw_connected_drive/#lock): Control the lock of your car.
- Sensors: Mileage, remaining range, remaining fuel, charging time remaining (electric cars), charging status (electric cars), remaining range electric (electric cars).
- [Notifications](/integrations/bmw_connected_drive/#notifications): Send Points of Interest (POI) to your car.
- [Buttons](/integrations/bmw_connected_drive/#buttons): Turn on air condition, sound the horn, flash the lights, update the vehicle location and update the state.

## Configuration

Enable the `BMW Connected Drive` integration via **Settings** -> **Devices & Services**.

<div class='note'>

  For `china`, it is mandatory to prefix your username/phone number with `86`, i.e. `8612345678`.

</div>

After connecting to your account, you can set the following settings in the integration's options:

| Setting | Description |
|---------|-------------|
| Read-only | No execution of services to the vehicle. Still possible to send messages and POIs via `notify` and to request a status update via `bmw_connected_drive.update_state`.

## Notifications

The `bmw_connected_drive` integration offers a notification service. Using this service you can send Points of Interest (POI) to your vehicle. In your vehicle you can select this POI and the navigation will automatically start using the POI as a destination.
The name of the service is `notify.bmw_connected_drive_<your_vehicle>`.

### Send a Point of Interest to your vehicle

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

## Lock

The vehicle can be locked and unlocked via the lock integration that is created automatically for each vehicle. Before invoking, make sure it's safe to lock/unlock the vehicle in the current situation.

## Buttons

The `bmw_connected_drive` integration offers several buttons to trigger actions in your car. The buttons are automatically created and can be pressed/executed from the UI or using the `button.press` service. Please see the [button documentation](/integrations/button/) for more information.

Using these buttons will impact the state of your vehicle. So use these services with care!

### Air conditioning

The air conditioning of the vehicle can be activated with the `button.<your_vehicle>_activate_air_conditioning` button.

What exactly is started here depends on the type of vehicle. It might range from just ventilation over auxiliary heating to real air conditioning. If your vehicle is equipped with auxiliary heating, only trigger this service if the vehicle is parked in a location where it is safe to use it (e.g., not in an underground parking or closed garage).

Some newer cars also support stopping an active air conditioning with the `button.<your_vehicle>_deactivate_air_conditioning` button.

This will only work if you have the option to stop the AC in the *MyBMW* app. If your car doesn't support this service, nothing will happen.

### Sound the horn

The `button.<your_vehicle>_sound_horn` button sounds the horn of the vehicle. This option is not available in some countries (among which  the UK). Use this feature responsibly, as it might annoy your neighbors.

### Flash the lights

The `button.<your_vehicle>_light_flash` button flashes the lights of the vehicle.

### Vehicle finder

The `button.<your_vehicle>_find_vehicle` button requests the vehicle to update the GPS location. This can be used for older vehicles which don't automatically send the updated GPS location.

<div class="note warning">

  Using this service will **send your Home Assistant location to BMW**, as this is required by the API (like sharing your mobile phone's location with the MyBMW app for vehicle tracking).
  If you do not want this, trigger the `vehicle_finder` service from your phone and it should update in Home Assistant within 5 minutes.

</div>

<div class="note">

  On some older cars (non i3/i8 series produced before 7/2014) this service will fail in getting your vehicles position, if the vehicle is more than 1.5 km away from the location of your Home Assistant instance. This is a limitation of the BMW API.

</div>

### Update the state / refresh from cloud

The `button.<vehicle_model>_refresh_from_cloud` button fetches the last state of the vehicles of all your accounts from the BMW server. This does *not* trigger an update from the vehicle; it gets the data from the BMW servers. So this service does *not* interact with your vehicles.

## Disclaimer

This software is not affiliated with or endorsed by BMW Group.
