---
title: BMW Connected Drive
description: Instructions on how to setup your BMW Connected Drive account with Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Car
  - Lock
  - Notifications
  - Number
  - Presence detection
  - Select
  - Sensor
  - Switch
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
  - diagnostics
  - lock
  - notify
  - number
  - select
  - sensor
  - switch
ha_integration_type: integration
---

The **BMW Connected Drive** {% term integration %} lets you retrieve data of your BMW or MINI vehicle from the MyBMW portal (previously BMW Connected Drive).

{% note %}
The {% term entities %} available in Home Assistant heavily depend on your vehicle's capabilities (model year, headunit, etc.). The integration will make sure all available car attributes are added as entities.
{% endnote %}

## Prerequisites

You need to have an active MyBMW account with a connected car. For MINI vehicles, you register with MINI Connected.

For compatibility with your BMW vehicle check the [bimmer_connected page](https://github.com/bimmerconnected/bimmer_connected) on GitHub.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: |
    Username of your MyBMW/MINI Connected account.

    &nbsp;
    
    **China**: Your username/phone number must be prefixed with `86`, i.e. `8612345678`.
Password:
  description: "Password of your MyBMW/MINI Connected account."
Region:
  description: "Region of your MyBMW/MINI Connected account."
  options: china, north_america, rest_of_world
Captcha token (second step, only for North America and Rest of World):
  description: |
    The **North America** and **Rest of World** regions require a captcha challenge to be solved, that means you need to verify that you are not a robot.

    - After entering your login data, a second step will ask for a `Captcha token` and provide you with a **link** to a website. 
    - Open this link, solve the **"Are you a human?"** challenge and press **Submit**.
    - Copy the resulting token into Home Assistant and continue.

    No data of your Home Assistant instance is shared with any third party during this step.
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Read-only:
  description: No execution of actions to the vehicle. You can only send POIs to the vehicle via `notify`.
{% endconfiguration_basic %}

## Data updates

The integration will pull data from MyBMW/MINI servers at the following intervals:

| Region        | Interval   |
|---------------|------------|
| China         | 5 minutes  |
| North America | 10 minutes |
| Rest of world | 5 minutes  |

{% note %}
This will only refresh data from the BMW/MINI servers and **not** from your car. Updates from the car to the servers typically happen:

- for **combustion engine** vehicles when the car is parked and the engine is shut off.
- for **electric** vehicles when the car is parked and turned off or while the car is charging.

While driving, the servers are not updated.
{% endnote %}

### Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}

## Available platforms

This {% term integration %} provides the following {% term platforms %}:

- Binary sensors: Doors, windows, condition based services, check control messages, parking lights, door lock state, charging status (electric cars) and connections status (electric cars).
- Device tracker: The location of your car.
- [Lock](/integrations/bmw_connected_drive/#lock): Control the lock of your car.
- Sensors: Mileage, remaining range, remaining fuel, charging time remaining (electric cars), charging status (electric cars), remaining range electric (electric cars).
- [Notifications](/integrations/bmw_connected_drive/#notifications): Send Points of Interest (POI) to your car.
- [Buttons](/integrations/bmw_connected_drive/#buttons): Turn on air condition, sound the horn, flash the lights, update the vehicle location and update the state.
- [Selects](/integrations/bmw_connected_drive/#selects): Display and control charging related settings for (PH)EVs.
- [Switches](/integrations/bmw_connected_drive/#switches): Display and toggle settings on your car.
- [Numbers](/integrations/bmw_connected_drive/#numbers): Display and control numeric charging related settings for (PH)EVs.

{% warning %}
Every platform except **binary sensors** and **sensors** can change the state of your vehicle. Once you change the state in Home Assistant, a command is sent to your car. 
{% endwarning %}

&nbsp;

{% important %}
The `North America` and `Rest of world` regions require a captcha challenge to be solved, i.e. you need to verify that you are a human.
After entering your login data, a second step will ask for a `Captcha token` and provide you with a link to a website. 
Please open this link, solve the "are you a human?" challenge and press `Submit`.
Copy the resulting token into Home Assistant and continue.

No data of your Home Assistant instance is shared with any third party during this step.
{% endimportant %}

{% note %}
For `china`, it is mandatory to prefix your username/phone number with `86`, i.e. `8612345678`.
{% endnote %}

### Notifications

The **BMW Connected Drive** integration offers a notification action. Using this action you can send Points of Interest (POI) to your vehicle. In your vehicle, you can select this POI, and the navigation will automatically start using the POI as a destination.
The name of the action is `notify.bmw_connected_drive_<your_vehicle>`.

### Send a Point of Interest to your vehicle

```yaml
...
actions:
  - action: notify.bmw_connected_drive_<your_vehicle>
    data:
      message: The name of the POI # this is shown on the iDrive dashboard
      data:
        latitude: 48.177024
        longitude: 11.559107
        street: Street name  # Optional
        city: City name  # Optional
        postal_code: Postal Code  # Optional
        country: Country  # Optional
```

### Lock

The vehicle can be locked and unlocked via the lock integration that is created automatically for each vehicle.

{% note %}
If your vehicle does not provide its current state (no sensor entities are created), you will not see the current lock state either. You still can lock/unlock the car.
{% endnote %}

### Buttons

Buttons are used to trigger actions in your car. The buttons are automatically created and can be pressed/executed from the UI or using the `button.press` action. Please see the [button documentation](/integrations/button/) for more information.

#### Air conditioning

The air conditioning of the vehicle can be activated with the `button.<your_vehicle>_activate_air_conditioning` button.

What exactly is started here depends on the type of vehicle. It might range from just ventilation over auxiliary heating to real air conditioning. If your vehicle is equipped with auxiliary heating, only trigger this action if the vehicle is parked in a location where it is safe to use it (e.g., not in an underground parking or closed garage).

#### Sound the horn

The `button.<your_vehicle>_sound_horn` button sounds the horn of the vehicle. This option is not available in some countries (among which the UK). Use this feature responsibly, as it might annoy your neighbors.

#### Flash the lights

The `button.<your_vehicle>_light_flash` button flashes the lights of the vehicle.

#### Vehicle finder

The `button.<your_vehicle>_find_vehicle` button requests the vehicle to update the GPS location. This can be used for older vehicles which don't automatically send the updated GPS location.

{% warning %}
Using this action will **send your Home Assistant location to BMW**, as this is required by the API (like sharing your mobile phone's location with the MyBMW app for vehicle tracking).
If you do not want this, trigger the `vehicle_finder` action from your phone and it should update in Home Assistant within 5 minutes.
{% endwarning %}

{% note %}
On some older cars (non i3/i8 series produced before 7/2014) this action will fail in getting your vehicles position, if the vehicle is more than 1.5 km away from the location of your Home Assistant instance. This is a limitation of the BMW API.
{% endnote %}

### Selects

If you have a (PH)EV, you can control the charging process through Home Assistant. The selects are created automatically depending on your vehicle's capabilities and can be pressed/executed from the UI or using the `select.select_option` action. For more information, please see the [select documentation](/integrations/select/).

- **Charging Mode**: Vehicle can be set to `IMMEDIATE_CHARGING` (charge as soon as plugged in) or `DELAYED_CHARGING` (charge only if within charging window). It can be used to start/stop charging if the charging window is set accordingly.
- **AC Charging Limit**: The maximum current a vehicle will charge with. Not available on all EVs.

### Switches

If supported by your vehicle, you can display and toggle remote actions with start/stop functionality.

- **Climate**: Toggle vehicle climatization. It is not possible to force it to heat or cool; the vehicle will decide on its own. If turned on, it will run for 30 minutes (as if toggled via the MyBMW app).
- **Charging**: Toggle vehicle charging if plugged in. Only available on some electric vehicles.

### Numbers

If you have a (PH)EV, you can control the charging process through Home Assistant. The number entities are created automatically depending on your vehicle's capabilities and can be changed from the UI or using the `number.set_value` action. For more information, please see the [number documentation](/integrations/number/).

- **Target SoC**: Vehicle will charge until this battery level is reached. Not available on all EVs.

## Troubleshooting

{% details "Problem: Invalid authentication" %}

This can happen during initial login or after some time. Please do the following steps:
- Log in to your MyBMW **website** and verify your credentials (for example, ensure that username and password are correct).
- If you cannot login on the website, please **deactivate** polling (see [Defining a custom polling interval](#defining-a-custom-polling-interval)) and wait for **at least 24 hours**.
- Once you can login to the website, reconfigure/reauthenticate the integration via {% my integrations title="**Settings** > **Devices & services**" %}, click {% icon "mdi:dots-vertical" %} and select **Reconfigure**.
- Activate polling again

{% enddetails %}

{% details "Problem: Captcha validation missing" %}

Sometimes, your account can be force-logged-out. For **North America** and **Rest of World**, the recovery requires manual intervention.

Home Assistant will show a repair issue to **reconfigure** the integration. Follow the steps to log in again.

{% enddetails %}

## Known limitations

- The entities available to Home Assistant depend on your vehicle. Even inside the same model code (for example, U11 for BMW X1) you will see different entities, depending on your specific car's features.
- Not all features, mostly related to charging control for (PH)EVs, are implemented. If you have a functionality in your MyBMW/MINI app that is not yet available, search for an existing feature request in the [`bimmer_connected` discussions](https://github.com/bimmerconnected/bimmer_connected/discussions) or create a new one.

## Removing the integration

{% include integrations/remove_device_service.md %}

## Disclaimer

This software is not affiliated with or endorsed by BMW Group.
