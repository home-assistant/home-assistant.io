---
title: Wink
description: Instructions on how to set up the Wink hub within Home Assistant.
ha_category:
  - Hub
  - Alarm
  - Binary Sensor
  - Climate
  - Cover
  - Fan
  - Light
  - Lock
  - Scene
  - Sensor
  - Switch
  - Water Heater
featured: false
ha_iot_class: Cloud Polling
ha_release: pre 0.7
ha_domain: wink
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - climate
  - cover
  - fan
  - light
  - lock
  - scene
  - sensor
  - switch
  - water_heater
---

[Wink](https://www.wink.com/) is a home automation hub that can control a whole wide range of devices on the market. Or, as they say in their own words:

<blockquote>
  Wink offers one, quick and simple way to connect people with the products they rely on every day in their home.
</blockquote>

Home Assistant integrates with the Wink API and automatically sets up any switches, lights, locks, fans, climate devices (thermostats, air conditioners, and water heaters), covers, sensors, alarms, and sirens.

There is currently support for the following device types within Home Assistant:

- [Alarm](#alarm-control-panel)
- [Binary Sensor](#binary-sensor)
- [Climate](#climate)
- [Cover](#cover)
- [Fan](#fan)
- [Light](#light)
- [Lock](#lock)
- Scene
- [Sensor](#sensor)
- [Switch](#switch)
- [Water heater](#water-heater)

## Authenticate using [developer.wink.com](https://developer.wink.com)

You need to set up a developer account with Wink. This process can take a few days to get approved.

Wink requests three pieces of information from the user when they sign up for a developer account.

1. `Name:` This can be anything, for example, "Home Assistant"
2. `Website:` The external address of your Home Assistant instance. If not externally accessible you can use your email address.
3. `Redirect URI:` This should be `http://192.168.1.5:8123/auth/wink/callback` replacing the IP with the internal IP of your Home Assistant box.

No settings are required in the `configuration.yaml` other than `wink:`.

After adding `wink:` to your `configuration.yaml` and restarting Home Assistant you will see a persistent notification on the frontend with a `CONFIGURE` button that will guide you through the setup via the frontend configurator.

<div class='note'>
When using the configurator make sure the initial setup is performed on the same local network as the Home Assistant instance, if not from the same box Home Assistant is running on. This will allow for authentication redirects to happen correctly.
</div>

```yaml
wink:
```

## Full oauth authentication (legacy)

This should be used for users that obtained their client_id and client_secret via email from Wink support prior to [developer.wink.com's](https://developer.wink.com) existence.

```yaml
wink:
  email: YOUR_WINK_EMAIL_ADDRESS
  password: YOUR_WINK_PASSWORD
  client_id: YOUR_WINK_CLIENT_ID
  client_secret: YOUR_WINK_CLIENT_SECRET
```

Please pay attention that the required entries are only needed for legacy OAuth access.

{% configuration %}
email:
  description: Your Wink login email address.
  required: true
  type: string
password:
  description: Your Wink login password.
  required: true
  type: string
client_id:
  description: Your provided Wink `client_id`.
  required: true
  type: string
client_secret:
  description: Your provided Wink `client_secret`.
  required: true
  type: string
local_control:
  description: If set to `true` state changes for lights, locks and switches will be issued to the local hub.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

Local control:

- Wink's local control API isn't officially documented and therefore could be broken by a hub update. For these reasons `local_control` defaults to `false`.
- Using local control doesn't appear to make commands any quicker, but does function in an internet/Wink outage.
- Local control is also only available for the Wink hub v1 and v2, not the Wink relay.
- Local control isn't used during the start-up of Home Assistant; this means initial setup requires an active internet connection.
- Local control requests are first sent to the controlling hub. If a request fails, that request will attempt to go online.

<div class='note'>

It is possible for the hub to get into a bad state where it stops accepting local control request. If this happens, you will notice requests taking significantly longer as they are redirected online. This doesn't happen often, but when it does, it appears to be resolved by rebooting the hub.

The following error will be logged if the hub is rejecting local requests.

```txt
Error sending local control request. Sending request online
```

</div>

## Service `refresh_state_from_wink`

The Wink integration only obtains the device states from the Wink API once, during startup. All updates after that are pushed via a third party called PubNub. On rare occasions where an update isn't pushed device states can be out of sync.

You can use the service wink/refresh_state_from_wink to pull the most recent state from the Wink API for all devices. If `local_control` is set to `true` states will be pulled from the devices controlling hub, not the online API.

## Service `pull_newly_added_devices_from_wink`

You can use the service wink/add_new_devices to pull any newly paired Wink devices to an already running instance of Home Assistant. Any new devices will also be added if Home Assistant is restarted.

## Service `delete_wink_device`

You can use the service wink/delete_wink_device to remove/unpair a device from Wink.

| Service data attribute | Optional | Description                                                |
| ---------------------- | -------- | ---------------------------------------------------------- |
| `entity_id`            | no       | String that points at the `entity_id` of device to delete. |

## Service `pair_new_device`

You can use the service wink/pair_new_device to pair a new device to your Wink hub/relay

| Service data attribute | Optional    | Description                                                                                                                     |
| ---------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `hub_name`             | no          | The name of the hub to pair a new device to.                                                                                    |
| `pairing_mode`         | no          | One of the following [zigbee, zwave, zwave_exclusion, zwave_network_rediscovery, lutron, bluetooth, kidde]                      |
| `kidde_radio_code`     | conditional | A string of 8 1s and 0s one for each dip switch on the kidde device left --> right = 1 --> 8 (Required if pairing_mode = kidde) |

<div class='note'>
Calling service wink/pull_newly_added_wink_devices after a device is paired will add that new device to Home Assistant. The device will also show up on the next restart of Home Assistant.
</div>

## Service `rename_wink_device`

You can use the service wink/rename_wink_device to change the name of a device.

| Service data attribute | Optional | Description                                                |
| ---------------------- | -------- | ---------------------------------------------------------- |
| `entity_id`            | no       | String that points at the `entity_id` of device to rename. |
| `name`                 | no       | The name to change it to.                                  |

<div class='note'>
Home Assistant entity_ids for Wink devices are based on the Wink device's name. Calling this service will not change the entity_id of the device until Home Assistant is restarted.
</div>

<div class='note'>
The Wink hub, by default, can only be accessed via the cloud. This means it requires an active internet connection and you will experience delays when controlling and updating devices (~3s).
</div>

## Custom Wink devices and their services

- GoControl siren and strobe
- Dome siren/chime/strobe
- Quirky Nimbus (Legacy device) These can no longer be officially added to your Wink account

### Service `set_siren_auto_shutoff`

You can use the service wink/set_siren_auto_shutoff to set how long the siren will sound before shutting off.

| Service data attribute | Optional | Description                                                                                            |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `auto_shutoff`         | no       | Int. One of [None, -1, 30, 60, 120] (None and -1 are forever. Use None for gocontrol, and -1 for Dome) |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`s of siren.                                         |

Example:

```yaml
script:
  set_all_sirens_to_one_minute_auto_shutoff:
    sequence:
      - service: wink.set_siren_auto_shutoff
        data:
          auto_shutoff: 60
```

<div class='note'>
The following services only work with the Dome siren/chime.
</div>

### Service `set_chime_volume`

You can use the service wink/set_chime_volume to set the volume for the chime on your Dome siren/chime.

| Service data attribute | Optional | Description                                                              |
| ---------------------- | -------- | ------------------------------------------------------------------------ |
| `volume`               | no       | String. One of ["low", "medium", "high"]                                 |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`s of the siren/chime. |

Example:

```yaml
script:
  set_chime_volume_to_low_for_all_chimes
    sequence:
      - service: wink.set_chime_volume
        data:
          volume: "low"
```

### Service `set_siren_volume`

You can use the service wink/set_chime_volume to set the volume for the chime on your Dome siren/chime.

| Service data attribute | Optional | Description                                                          |
| ---------------------- | -------- | -------------------------------------------------------------------- |
| `volume`               | no       | String. One of ["low", "medium", "high"]                             |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`s of siren/chime. |

Example:

```yaml
script:
  set_siren_volume_to_low_for_all_sirens
    sequence:
      - service: wink.set_siren_volume
        data:
          volume: "low"
```

### Service `enable_chime`

You can use the service wink/enable_chime to set the tone and enable the chime on your Dome siren/chime.

| Service data attribute | Optional | Description                                                                                                                                                               |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tone`                 | no       | String. One of ["doorbell", "fur_elise", "doorbell_extended", "alert", "william_tell", "rondo_alla_turca", "police_siren", "evacuation", "beep_beep", "beep", "inactive"] |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`s of siren/chime.                                                                                                      |

Example:

```yaml
script:
  execute_doorbell
    sequence:
      - service: wink.enable_chime
        data:
          tone: "doorbell"
```

### Service `set_siren_tone`

You can use the service wink/set_siren_tone to set the tone on your Dome siren. This tone will be used the next time the siren is executed.

| Service data attribute | Optional | Description                                                                                                                                                   |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tone`                 | no       | String. One of ["doorbell", "fur_elise", "doorbell_extended", "alert", "william_tell", "rondo_alla_turca", "police_siren", "evacuation", "beep_beep", "beep"] |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`s of siren/chime.                                                                                          |

Example:

```yaml
script:
  set_siren_to_alert:
    sequence:
      - service: wink.set_siren_tone
        data:
          tone: "alert"
```

### Service `set_siren_strobe_enabled`

You can use the service wink/set_siren_strobe_enabled to enable or disable the strobe when the siren is executed.

| Service data attribute | Optional | Description                                                          |
| ---------------------- | -------- | -------------------------------------------------------------------- |
| `enabled`              | no       | Boolean. True or False.                                              |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`s of siren/chime. |

Example:

```yaml
script:
  disable_siren_strobe:
    sequence:
      - service: wink.set_siren_strobe_enabled
        data:
          enabled: false
```

### Service `set_chime_strobe_enabled`

You can use the service wink/set_chime_strobe_enabled to enable or disable the strobe when the chime is executed.

| Service data attribute | Optional | Description                                                          |
| ---------------------- | -------- | -------------------------------------------------------------------- |
| `enabled`              | no       | Boolean. True or False.                                              |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`s of chime/chime. |

Example:

```yaml
script:
  disable_chime_strobe:
    sequence:
      - service: wink.set_chime_strobe_enabled
        data:
          enabled: false
```

### Service `set_nimbus_dial_state`

You can use the service wink/set_nimbus_dial_state to update an individual dial's value/position and its labels

| Service data attribute | Optional | Description                                                                                                                                   |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | String or list of strings that point at `entity_id`s of chime/chime.                                                                          |
| `value`                | no       | A number, should be between the dials min and max value (See set_nimbus_dial_configuration below)                                             |
| `labels`               | yes      | A list of strings the first being the value set on the dial's face and the second being the value on the dial face when the Nimbus is pressed |

Example:

```yaml
script:
  set_dial_1_value:
    sequence:
      - service: wink.set_nimbus_dial_state
        target:
          entity_id: wink.nimbus_dial_1
        data:
          value: 150
          labels:
            - "Dial 1"
            - "150"
```

### Service `set_nimbus_dial_configuration`

You can use the service wink/set_nimbus_dial_configuration to update an individual dial's configuration.

| Service data attribute | Optional | Description                                                                     |
| ---------------------- | -------- | ------------------------------------------------------------------------------- |
| `entity_id`            | no       | String or list of strings that point at `entity_id`s of chime/chime.            |
| `rotation`             | yes      | One of "cw" or "ccw" the direction the dial hand should rotate.                 |
| `ticks`                | yes      | A positive number, the number of times the hand should move.                    |
| `scale`                | yes      | One of "linear" or "log" How the dial should move in response to higher values. |
| `min_value`            | yes      | A number, the minimum value that the dial can have.                             |
| `max_value`            | yes      | A number, the maximum value that the dial can have.                             |
| `min_position`         | yes      | A number generally [0-360], the minimum position for the dial's hand.           |
| `max_value`            | yes      | A number generally [0-360], the maximum position for the dial's hand.           |

Example:

```yaml
script:
  set_dial_1_value:
    sequence:
      - service: wink.set_nimbus_dial_state
        target:
          entity_id: wink.nimbus_dial_1
        data:
          rotation: "ccw"
```

## Alarm Control Panel

The Wink alarm platform allows you to control your [Wink](https://www.wink.com/) Canary all-in-one security camera.

The requirement is that you have setup [Wink](/integrations/wink/) from above.

### Supported devices

- Canary all-in-one security camera

<div class='note'>
The above devices are confirmed to work, but others may work as well.
</div>

## Binary Sensor

The Wink binary sensor platform allows you to get data from your [Wink](https://www.wink.com/) binary sensors.

The requirement is that you have setup [Wink](/integrations/wink/) from above.

### Supported Binary sensor devices

- Smoke and CO detectors (No Wink hub required for Nest)
- Window/Door sensors
- Motion sensors
- Ring Door bells (No hub required)
- Liquid presence sensors
- Z-Wave lock key codes
- Lutron connected bulb remote buttons
- Wink Relay buttons and presence detection
- Wink spotter loudness and vibration (No Wink hub required)
- Wink hub devices connection status. This includes any paired hubs like Hue, Wink v1, Wink v2, Wink Relay...
- Dropcam sensors

<div class='note'>
The above devices are confirmed to work, but others may work as well.
</div>

## Climate

The Wink climate platform allows you to get data from your [Wink](https://www.wink.com/) thermostats and air conditioners.

The requirement is that you have setup [Wink](/integrations/wink/) from above.

### Supported climate devices

- Nest (No Wink hub required)
- Ecobee (No Wink hub required)
- Sensi (No Wink hub required)
- Carrier (Unconfirmed)
- Honeywell (No Wink hub required)
- Generic Z-Wave
- Quirky Aros window AC unit

<div class='note'>
The above devices are confirmed to work, but others may work as well.
</div>

## Cover

Wink Cover garage door functionality varies on the product. Home Assistant can open, close, and view state of GoControl/Linear openers. For Chamberlain MyQ-enabled openers, Home Assistant is limited to show current state (open or closed) only using this Wink cover. This restriction was imposed by Chamberlain for third party control. Wink suggests that MyQ customers should contact Chamberlain directly to inquire about expanding permissions.

The [MyQ Cover](/integrations/myq) does provide full functionality for opening and closing Chamberlain MyQ-enabled garage doors. If installed along with the Wink Component, a duplicate garage door entity may exist.

The requirement is that you have setup [Wink](/integrations/wink/) from above.

### Supported cover devices

- Bali window treatments
- Lutron shades
- Pella motorized blinds and shades
- GoControl garage door opener
- Chamberlain MyQ (Limited functionality) (No Wink hub required)

<div class='note'>
The above devices are confirmed to work, but others may work as well.
</div>

## Fan

The Wink fan platform allows you to control your [Wink](https://www.wink.com/) fans.

The requirement is that you have setup [Wink](/integrations/wink/) from above.

### Supported fan devices

- Home Decorator Wink-enabled Gardinier ceiling fan
- Hampton Bay ceiling fan module

<div class='note'>
The above devices are confirmed to work, but others may work as well.
</div>

## Light

The `wink` light platform allows you to use your [Wink](https://www.wink.com/) lights.

The requirement is that you have setup [Wink](/integrations/wink/) from above.

### Supported light devices

- Z-Wave switches with dimming
- Hue
- Lightify
- GE link
- Wink light groups (User created groups of lights)

<div class='note'>
The above devices are confirmed to work, but others may work as well.
</div>

## Lock

The Wink lock platform allows you to control your [Wink](https://www.wink.com/) locks.

The requirement is that you have setup [Wink](/integrations/wink/) from above.

### Supported lock devices

- Kwikset
- Schlage
- August (No Wink hub required) (August Connect required)
- Generic Z-Wave

<div class='note'>
The following services have only been confirmed on Schlage locks.
</div>

### Service `set_lock_alarm_mode`

You can use the service wink/set_lock_alarm_mode to set the alarm mode of your lock.

| Service data attribute | Optional | Description                                                    |
| ---------------------- | -------- | -------------------------------------------------------------- |
| `mode`                 | no       | String one of tamper, activity, or forced_entry                |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`s of locks. |

Example:

```yaml
script:
  set_locks_to_tamper:
    sequence:
      - service: wink.set_lock_alarm_mode
        data:
          mode: "tamper"
```

### Service `set_lock_alarm_sensitivity`

You can use the service wink/set_lock_alarm_sensitivity to set the alarm sensitivity of your lock.

| Service data attribute | Optional | Description                                                    |
| ---------------------- | -------- | -------------------------------------------------------------- |
| `sensitivity`          | no       | String one of low, medium_low, medium, medium_high, high.      |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`s of locks. |

Example:

```yaml
script:
  set_locks_to_high_sensitivity:
    sequence:
      - service: wink.set_lock_alarm_sensitivity
        data:
          sensitivity: "high"
```

### Service `set_lock_alarm_state`

You can use the service wink/set_lock_alarm_state to set the alarm state of your lock.

| Service data attribute | Optional | Description                                                    |
| ---------------------- | -------- | -------------------------------------------------------------- |
| `enabled`              | no       | Boolean enabled or disabled, true or false                     |  |  |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`s of locks. |  |  |

Example:

```yaml
script:
  disable_all_locks_alarm:
    sequence:
      - service: wink.set_lock_alarm_state
        data:
          enabled: false
```

### Service `set_lock_beeper_state`

You can use the service wink/set_lock_beeper_state to set the beeper state of your lock.

| Service data attribute | Optional | Description                                                    |
| ---------------------- | -------- | -------------------------------------------------------------- |
| `enabled`              | no       | Boolean enabled or disabled, true or false                     |  |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`s of locks. |  |

Example:

```yaml
script:
  disable_all_locks_beepers:
    sequence:
      - service: wink.set_lock_beeper_state
        data:
          enabled: false
```

### Service `set_lock_vacation_mode`

You can use the service wink/set_lock_vacation_mode to set the vacation mode of your lock.

| Service data attribute | Optional | Description                                                    |
| ---------------------- | -------- | -------------------------------------------------------------- |
| `enabled`              | no       | Boolean enabled or disabled, true or false                     |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`s of locks. |

Example:

```yaml
script:
  enabled_vacation_mode_on_all_locks:
    sequence:
      - service: wink.set_lock_vacation_mode
        data:
          enabled: false
```

### Service `add_new_lock_key_code`

You can use the service wink/add_new_lock_key_code to add a new user code to your Wink lock.

| Service data attribute | Optional | Description                                                    |
| ---------------------- | -------- | -------------------------------------------------------------- |
| `entity_id`            | no       | String or list of strings that point at `entity_id`s of locks. |
| `name`                 | no       | the name of the new key code                                   |
| `code`                 | no       | The new code. Must match length of existing codes.             |

<div class='note'>
Calling service wink/pull_newly_added_wink_devices will add the new key code to Home Assistant. The device will also show up on the next restart of Home Assistant.
</div>

<div class='note'>
If supported by your lock, a binary sensor will be created for each user key code you have defined. These key codes will turn on when the code is entered and automatically turn off after a few seconds.
</div>

## Sensor

The Wink sensor platform allows you to get data from your [Wink](https://www.wink.com/) sensors.

The requirement is that you have setup [Wink](/integrations/wink/) from above.

### Supported sensor devices

- Wink Relay temperature, proximity, and humidity
- Wink Spotter temperature, humidity, and brightness (No Wink hub required)
- Wink Porkfolio balance (No Wink hub required)
- Wink eggminder (No Wink hub required)
- Nest protect Smoke and CO severity (No confirmation that this is actually reported) (No Wink hub required)
- Motion sensor temperature
- Quirky refuel propane tank monitor (No Wink hub required)

<div class='note'>
The above devices are confirmed to work, but others may work as well.
</div>

## Switch

The Wink switch platform allows you to control your [Wink](https://www.wink.com/) switches.

The requirement is that you have set up [Wink](/integrations/wink/) from above.

## Supported switch devices

- Wink Pivot power genius (No Wink hub required)
- non-dimming Z-Wave in-wall switches (dimming switches show up as lights)
- Wink Relay load controlling switches
- Rachio sprinkler controller (No Wink hub required)
- iHome smart plug (No Wink hub required)
- Wink switch groups (User created groups of switches)

## Water heater

The Wink water heater platform allows you to get data from your [Wink](https://www.wink.com/) Water Heaters.

The requirement is that you have set up [Wink](/integrations/wink/) from above.

## Supported water heaters

- Rheem Econet water heaters (No Wink hub required)

<div class='note'>

Wink water heaters use to live under the `climate` platform prior to release 0.81.

</div>
