---
title: ecobee
description: Instructions for how to integrate ecobee thermostats and sensors within Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Humidifier
  - Notifications
  - Number
  - Sensor
  - Switch
  - Weather
ha_release: 0.9
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: ecobee
ha_platforms:
  - binary_sensor
  - climate
  - humidifier
  - notify
  - number
  - sensor
  - switch
  - weather
ha_zeroconf: true
ha_homekit: true
ha_integration_type: integration
---

The **ecobee** {% term integration %} lets you control and view sensor data from [ecobee](https://ecobee.com) thermostats.

## Preliminary steps

You will need to obtain an API key from ecobee's [developer site](https://www.ecobee.com/developers/) to use this integration. To get the key, your thermostat must be registered on ecobee's website (which you likely would have already done while installing your thermostat). Once you have done that, perform the following steps.

{% warning %}
As of March 28th, 2024, ecobee is no longer accepting new developer subscriptions, nor are existing developer accounts able to create new API keys. There is no ETA for when they will be allowed again. Existing API keys will continue to function.

In the meantime, you can use the [HomeKit Device](/integrations/homekit_controller/) integration as a fully functional alternative.
{% endwarning %}

1. Click on the **Become a developer** link on the [developer site](https://www.ecobee.com/home/developer/loginDeveloper.jsp).
2. Log in with your ecobee credentials. (Make sure multifactor authentication is disabled to meet the developer login form's limits. If you've already enabled MFA, the web portal doesn't support disabling it. The iOS and Android apps do under Account > Account Security. You can re-enable MFA after becoming a developer.)
3. Accept the SDK agreement.
4. Fill in the fields.
5. Click **save**.

Log in to the regular consumer portal and click the overflow menu button in the upper right. You will see a new option named **Developer**. Now an application can be created to integrate with Home Assistant.

1. Select the **Developer** option from the hamburger menu on the top-right.
2. Select **Create New**.
3. Complete the form on the right. (Neither of the fields are referenced by Home Assistant)
    - Name: Must be unique across all ecobee users.
    - Summary: Does not need to be unique.
4. Click *Authorization method* and select **ecobee PIN**.
5. Click **Create**.

Your new application will now appear on the left. Upon clicking on the application, API key will appear on the right. Copy this key and use it in the configuration section below. Click **X** to close the Developer section.

## Configuration

1. In the **Settings** -> **Devices & services** menu, click **+** and then select "ecobee" from the pop-up menu.
2. In the pop-up box, enter the API key you obtained from ecobee's [developer portal](https://ecobee.com/developers).
3. In the next pop-up box, you will be presented with a unique 8 character code separated by a dash (format: XXXX-XXXX), which you will need to authorize in the [ecobee consumer portal](https://www.ecobee.com/consumerportal/index.html). You can do this by logging in, selecting **My Apps** from the hamburger menu, clicking **Add Application** on the left, entering the PIN code from Home Assistant, clicking **Validate** and then **Add Application** in the bottom right.
4. After authorizing the app with ecobee, return to Home Assistant and click **Submit**. If the authorization was successful, a configuration entry will be created and your thermostats, ventilators and sensors will be available in Home Assistant.

## Manual configuration

If you prefer to set up the integration in your {% term "`configuration.yaml`" %} file, add your API key (and optional parameters) as follows (however, you must still complete authorization via the **Integrations** panel).
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
ecobee:
  api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: Your ecobee API key. This is only needed for the initial setup of the integration. Once registered it can be removed. If you revoke the key in the ecobee portal, you will need to remove the existing `ecobee` configuration in the **Integrations** panel, update this, and then configure the integration again.
  required: false
  type: string
{% endconfiguration %}

<p class='img'>
  <img src='/images/screenshots/ecobee-sensor-badges.png' />
  <img src='/images/screenshots/ecobee-thermostat-card.png' />
</p>

You must [restart Home Assistant](/docs/configuration/#reloading-changes) for the changes to take effect. After restarting, go to {% my integrations title="**Settings** > **Devices & services**" %} and select the integration. Then, select **Configure** and continue to authorize the app according to the above **Automatic Configuration**, starting at step 2.

## Notifications

The `ecobee` notify platform allows you to send notifications to an ecobee thermostat. For each thermostat found, a `notify` entity will be added.

Example action:

```yaml
action: notify.send_message
data:
  message: "Hello, this is your thermostat."
  entity_id: notify.ecobee
```

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

## Thermostat

### Concepts

The ecobee thermostat supports the following key concepts.

The _target temperature_ is the temperature that the device attempts to achieve. The target temperature is either determined by the currently active climate or it may be overridden by a hold. When the
thermostat is not in auto mode, there is a single target temperature. When the thermostat is in auto HVAC mode, there is a pair of target temperatures: the lower target temperature determines the lowest desired temperature, while the higher target temperature determines the highest desired temperature (the thermostat will switch between heating and cooling to keep the temperature within these limits).

A _climate_ is a predefined or user-defined set of presets that the thermostat aims to achieve. The ecobee thermostat provides three predefined climates: Home, Away, and Sleep. Ecobee refers to these as _comfort settings_. The user can define additional climates.

A _preset_ is an override of the target temperature defined in the currently active climate. The temperature targeted in the preset mode may be explicitly set (temperature preset), it may be derived from a reference climate (home, away, sleep, etc.), or it may be derived from a vacation defined by the thermostat. All holds are temporary. Temperature and climate holds expire when the thermostat transitions to the next climate defined in its program. A vacation hold starts at the beginning of the
defined vacation period and expires when the vacation period ends.

When in _away preset_, the target temperature is permanently overridden by the target temperature defined for the away climate. The away preset is a simple way to emulate a vacation mode.

The _HVAC mode_ of the device is the currently active operational modes that the ecobee thermostat provides: heat, cool, auto, and off.

The _target humidity_ is the humidity set point of the thermostat when a humidifier is connected and in manual control or "On" mode.

On a thermostat configured with auxiliary heat, an aux_heat_only switch will be present. When this switch is turned on, the ecobee thermostat HVAC mode will be changed to "Aux". However, Home Assistant will reflect that the thermostat is in "heat" mode. Turning off the aux_heat_only switch will change the thermostat back to the last active HVAC mode (heat, auto, etc).

### Attributes

The ecobee climate entity has some extra attributes to represent the state of the thermostat.

| Name                | Description                                                                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fan`               | If the fan is currently on or off: `on` / `off`.                                                                                                                                                  |
| `climate_mode`      | This is the climate mode that is active, or would be active if no override is active.                                                                                                             |
| `equipment_running` | This is a comma-separated list of equipment that is currently running.                                                                                                                            |
| `fan_min_on_time`   | The minimum amount of time (in minutes) that the fan will run per hour. This is determined by the minimum fan runtime setting which can be changed in the ecobee app or on the thermostat itself. |

## Ventilator

### Concepts

The ecobee thermostat supports the addition of an accessory. If you have an air exchanger (ventilator, HRV, or ERV), you can control it via the minimum time home and minimum time away numbers.

### Switch

The `ventilator 20 min` switch is behaving like the switch in the physical ecobee device. When switched on, the ventilator turns on for 20 min. When turned off, it stops the ventilator.

*Note: this does not interact with the `ventilator min time`*

### Number

| Name                          | Description                                                                                                                                                                                                                        |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ventilator_min_on_time_home` | The minimum amount of time (in minutes) that the ventilator will run per hour, when you are home. This is determined by the minimum ventilator runtime setting which can be changed in the ecobee app or on the thermostat itself. |
| `ventilator_min_on_time_away` | The minimum amount of time (in minutes) that the ventilator will run per hour, when you are away. This is determined by the minimum ventilator runtime setting which can be changed in the ecobee app or on the thermostat itself. |

## Auxiliary Heat

### Concepts 

When an HVAC system is equipped with a heat pump, a form of auxiliary heat is usually included. This may also be referred to as 'Emergency Heat'. You can control whether the thermostat requests only auxiliary heat, and adjust the outdoor temperature at which the heat pump compressor will no longer be used, for example, in response to utility costs or solar production in a hybrid system. A hybrid system refers to a system that does not use electricity for the auxiliary heat (natural gas, propane, etc.). This applies more to air source heat pumps than geothermal. 

### Switch

The `Auxiliary heat only` switch is provided to disable the use of the compressor (heat pump), only using the auxiliary heater. Be careful with this setting, as it can incur additional utility costs from using a less-efficient heat source. 

### Number

The `Compressor minimum temperature` number represents the outdoor temperature at which the compressor (heat pump) will not run. This is represented in the temperature units you have selected in Home Assistant; however, ecobee allows configuration only in increments of 5 degrees Fahrenheit. This is also represented in the thermostat user interface. When the outdoor temperature is below this value, only auxiliary heat will be used. Be careful with this setting, as it can incur additional utility costs from using a less-efficient heat source.

Check your heat pump Owners' Manual prior to adjusting this value; do not adjust it below the rated minimum operating temperature of the heat pump. **Failure to observe the rated minimum operating temperature can cause damage to the system**

## Actions

Besides the standard actions provided by the Home Assistant [Climate](/integrations/climate/) integration, the following extra actions are provided by the ecobee integration:

- `ecobee.create_vacation`
- `ecobee.delete_vacation`
- `ecobee.resume_program`
- `ecobee.set_fan_min_on_time`
- `ecobee.set_dst_mode`
- `ecobee.set_mic_mode`
- `ecobee.set_occupancy_modes`
- `ecobee.set_sensors_in_climate`

### Action `ecobee.create_vacation`

Creates a vacation on the selected ecobee thermostat.

| Data attribute | Optional | Description                                                                                          |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | ecobee thermostat on which to create the vacation                                                    |
| `vacation_name`        | no       | Name of the vacation to create. Must be unique on the thermostat                                     |
| `cool_temp`            | no       | Cooling temperature during the vacation                                                              |
| `heat_temp`            | no       | Heating temperature during the vacation                                                              |
| `start_date`           | yes      | Date the vacation starts in YYYY-MM-DD format                                                        |
| `start_time`           | yes      | Time the vacation starts in the local time zone. Must be in 24-hour format (HH:MM:SS)                |
| `end_date`             | yes      | Date the vacation ends in YYYY-MM-DD format (14 days from now if not provided)                       |
| `end_time`             | yes      | Time the vacation ends in the local time zone. Must be in 24-hour format (HH:MM:SS)                  |
| `fan_mode`             | yes      | Fan mode of the thermostat during the vacation (auto or on) (auto if not provided)                   |
| `fan_min_on_time`      | yes      | Minimum number of minutes to run the fan each hour (0 to 60) during the vacation (0 if not provided) |

### Action `ecobee.delete_vacation`

Delete a vacation on the selected ecobee thermostat.

| Data attribute | Optional | Description                                       |
| ---------------------- | -------- | ------------------------------------------------- |
| `entity_id`            | no       | ecobee thermostat on which to delete the vacation |
| `vacation_name`        | no       | Name of the vacation to delete                    |

### Action `ecobee.resume_program`

Resumes the standard active schedule of presets. This cancels any manual temperature settings or selected preset. This will not cancel vacation events, use `delete_vacation`.

| Data attribute | Optional | Description                                                                                                                |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`s of climate devices to control. Omit to target all ecobee thermostats. |
| `resume_all`           | no       | `true` will resume the standard schedule. `false` will only cancel the latest active event, which is not used often.       |

### Action `ecobee.set_fan_min_on_time`

Sets the minimum amount of time that the fan will run per hour.

| Data attribute | Optional | Description                                                                                                                 |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`'s of climate devices to control. Omit to target all ecobee thermostats. |
| `fan_min_on_time`      | no       | integer (e.g.,  5)                                                                                                          |

### Action `ecobee.set_dst_mode`

Enable/disable automatic daylight savings time.

| Data attribute | Optional | Description                                                                                          |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `entity_id`            | yes      | ecobee thermostat on which to set daylight savings time mode. Omit to target all ecobee thermostats. |
| `dst_enabled`          | no       | true or false                                                                                        |

### Action `ecobee.set_mic_mode`

Enable/disable Alexa mic (only for ecobee 4).

| Data attribute | Optional | Description                                                                            |
| ---------------------- | -------- | -------------------------------------------------------------------------------------- |
| `entity_id`            | yes      | ecobee thermostat on which to set the mic mode. Omit to target all ecobee thermostats. |
| `mic_enabled`          | no       | true or false                                                                          |

### Action `ecobee.set_occupancy_modes`

Enable/disable Smart Home/Away and Follow Me modes.

| Data attribute | Optional | Description                                                                               |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------- |
| `entity_id`            | yes      | ecobee thermostat on which to set occupancy modes. Omit to target all ecobee thermostats. |
| `auto_away`            | yes      | true or false                                                                             |
| `follow_me`            | yes      | true or false                                                                             |

### Service `ecobee.set_sensors_in_climate`

Set which sensors are active on a termostat for a specific climate program.

| Service data attribute | Optional | Description                                                                                                                                         |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | ecobee thermostat on which to set the active sensors.                                                                                                |
| `preset_mode`          | yes      | Name of the climate program to set the sensors active on (defaults to currently active program).                                                     |
| `sensors`              | no       | Sensors to set as participating for climate. This is the device ID of the sensor/thermostat. These can be found in the available_sensors attribute. |
