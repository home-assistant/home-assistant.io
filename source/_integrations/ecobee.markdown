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
  - Weather
featured: true
ha_release: 0.9
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@marcolivierarsenault'
ha_domain: ecobee
ha_platforms:
  - binary_sensor
  - climate
  - humidifier
  - notify
  - number
  - sensor
  - weather
ha_zeroconf: true
ha_homekit: true
ha_integration_type: integration
---

The **ecobee** {% term integration %} lets you control and view sensor data from [ecobee](https://ecobee.com) thermostats.

## Preliminary steps

You will need to obtain an API key from ecobee's [developer site](https://www.ecobee.com/developers/) to use this integration. To get the key, your thermostat must be registered on ecobee's website (which you likely would have already done while installing your thermostat). Once you have done that, perform the following steps.

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

1. In the **Settings** -> **Devices & Services** menu, click **+** and then select "ecobee" from the pop-up menu.
2. In the pop-up box, enter the API key you obtained from ecobee's [developer portal](https://ecobee.com/developers).
3. In the next pop-up box, you will be presented with a unique 8 character code separated by a dash (format: XXXX-XXXX), which you will need to authorize in the [ecobee consumer portal](https://www.ecobee.com/consumerportal/index.html). You can do this by logging in, selecting **My Apps** from the hamburger menu, clicking **Add Application** on the left, entering the PIN code from Home Assistant, clicking **Validate** and then **Add Application** in the bottom right.
4. After authorizing the app with ecobee, return to Home Assistant and click **Submit**. If the authorization was successful, a configuration entry will be created and your thermostats, ventilators and sensors will be available in Home Assistant.

## Manual configuration

If you prefer to set up the integration in [`configuration.yaml`](/docs/configuration/), add your API key (and optional parameters) as follows (however, you must still complete authorization via the **Integrations** panel):

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

You must [restart Home Assistant](/docs/configuration/#reloading-changes) for the changes to take effect. After restarting, go to {% my integrations title="**Settings** > **Devices & Services**" %} and select the integration. Then, select **Configure** and continue to authorize the app according to the above **Automatic Configuration**, starting at step 2.

## Notifications

The `ecobee` notify platform allows you to send notifications to an ecobee thermostat. The `target` parameter of the service call is required to specify the index of the recipient thermostat. The index values assigned to the thermostats are consecutive integers, starting at 0.

Example service call:

```yaml
service: notify.ecobee
data:
  message: "Hello, this is your thermostat."
  target: 0
```

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

## Thermostat

### Concepts

The ecobee thermostat supports the following key concepts.

The _target temperature_ is the temperature that the device attempts to achieve. The target temperature is either determined by the currently active climate or it may be overridden by a hold. When the
thermostat is not in auto mode, there is a single target temperature. When the thermostat is in auto HVAC mode, there is a pair of target temperatures: the lower target temperature determines the lowest desired temperature, while the higher target temperature determines the highest desired temperature (the thermostat will switch between heating and cooling to keep the temperature within these limits).

A _climate_ is a predefined or user-defined set of presets that the thermostat aims to achieve. Ecobee refers to these as _comfort settings.The ecobee thermostat provides three predefined climates: Home, Away, and Sleep.  The user can define additional climates. Climates may be activated in the thermostat based on a schedule.

A _preset_ is an override of the target temperature as defined in the currently active climate. The temperature targeted in the preset may be explicitly set (temperature preset), or it may be derived from a reference climate (home, away, sleep, etc.).

The amount of time a preset remains active will, by default, be determined by the hold duration setting in the ecobee thermostat. This setting in the ecobee thermostat can have one of 5 settings: _Two hours, Four hours, Until the next scheduled activity, Until you change it, or Decide at time of change._ The active hold duration in the thermostat will be applied to any preset override except for the _Decide at time of change_ hold duration. If the hold duration is _Decide at time of change_ the preset will only be active until the next scheduled activity.

To change the default behavior for for the amount of time a preset remains active, please see the [Changing Default Hold Duration](#changing-default-hold-duration ) section below.

A _vacation_ hold starts at the beginning of the defined vacation period and expires when the vacation period ends. During the vacation hold the thermostat will maintain the temperature and fan settings in the vacation hold regardless of the schedule in the thermostat or any preset changes from Home Assistant.

The _HVAC mode_ of the device is the currently active operational modes that the ecobee thermostat provides: heat, cool, auto, and off.

The _target humidity_ is the humidity set point of the thermostat when a humidifier is connected and in manual control or "On" mode.

When enabling the auxiliary heat toggle, the ecobee thermostat HVAC mode will be changed to "Aux". However, Home Assistant will reflect that the thermostat is in "heat" mode. Disabling auxiliary heat will change the thermostat back to last active HVAC mode (heat, auto, etc).

#### Changing Default Hold Duration

The default hold duration for a preset can be configured via `configuration.yaml`. This allows you to create custom default hold durations for some or all of your ecobee thermostats.

The integration allows for a new default behavior to be specified for all ecobee thermostats that do not have a thermostat-specific behavior specified.

The example below will create a custom default hold duration for all ecobee thermostats. This will create a user interface entry to select the default behavior among the options and will also create a new preset default behavior to be _Until you change it_. If this is the only ecobee hold mode entry in `configuration.yaml` then this will apply to every ecobee thermostat integrated with Home Assistant.

```yaml
# Example ecobee hold mode configuration.yaml entry
# This applies to all ecobee thermostats unless a thermostat-specific entry is included
input_select:
   ecobee_hold_mode:
       name: Default Ecobee Hold Mode
       options:
         - 2 hours
         - 4 hours
         - Until the next scheduled activity
         - Until you change it
       initial: Until you change it
```

The integration also allows for a new default behavior to be specified on a per-thermostat basis. To do this for a specific thermostat, append the thermostat name, with any blanks replaced by underscores (\_) and upper case changed to lower case to the string "ecobee_hold_mode_".

The example below will create a custom default hold duration for the ecobee thermostat named _First Floor_. This will only apply to the First Floor thermostat. Note also in this example that for this thermostat we are not allowing a 4 hour hold duration and the default is 2 hours.

If both a custom default hold duration and thermostat-specific hold durations are specified, the thermostat-specific hold duration takes priority.

```yaml
# Example ecobee hold mode configuration.yaml entry
# This applies only to the First Floor ecobee thermostat
input_select:
   ecobee_hold_mode_first_floor  :
       name: First Floor Ecobee Hold Mode
       options:
         - 2 hours
         - Until the next scheduled activity
         - Until you change it
       initial: 2 hours
```

{% configuration %}
  input_select:
    description: Alias for the input. Multiple entries are allowed.
    required: true
    type: map
    keys:
      name:
        description: Friendly name of the input to be used in the frontend
        required: false
        type: string
      options:
        description: List of options to choose from. Must be one of the following - "2 hours", "4 hours", "Until the next scheduled activity", or "Until you change it". Not all options are required.
        required: true
        type: list
      initial:
        description: Initial value when Home Assistant starts.
        required: false
        type: map
        default: First element of options
{% endconfiguration %}

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

The ecobee thermostat supports the addition of an accessory. If you have an air exchanger (ventilator, HRV, or ERV), you can control it via the min time home and min time away numbers.

### Number

| Name                          | Description                                                                                                                                                                                                                        |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ventilator_min_on_time_home` | The minimum amount of time (in minutes) that the ventilator will run per hour, when you are home. This is determined by the minimum ventilator runtime setting which can be changed in the ecobee app or on the thermostat itself. |
| `ventilator_min_on_time_away` | The minimum amount of time (in minutes) that the ventilator will run per hour, when you are away. This is determined by the minimum ventilator runtime setting which can be changed in the ecobee app or on the thermostat itself. |

## Services

Besides the standard services provided by the Home Assistant [Climate](/integrations/climate/) integration, the following extra services are provided by the ecobee integration:

- `ecobee.create_vacation`
- `ecobee.delete_vacation`
- `ecobee.resume_program`
- `ecobee.set_fan_min_on_time`
- `ecobee.set_dst_mode`
- `ecobee.set_mic_mode`
- `ecobee.set_occupancy_modes`

### Service `ecobee.create_vacation`

Creates a vacation on the selected ecobee thermostat.

| Service data attribute | Optional | Description                                                                                          |
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

### Service `ecobee.delete_vacation`

Delete a vacation on the selected ecobee thermostat.

| Service data attribute | Optional | Description                                       |
| ---------------------- | -------- | ------------------------------------------------- |
| `entity_id`            | no       | ecobee thermostat on which to delete the vacation |
| `vacation_name`        | no       | Name of the vacation to delete                    |

### Service `ecobee.resume_program`

Resumes the currently active schedule.

| Service data attribute | Optional | Description                                                                                                              |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`'s of climate devices to control. Use `entity_id: all` to target all. |
| `resume_all`           | no       | true or false                                                                                                            |

### Service `ecobee.set_fan_min_on_time`

Sets the minimum amount of time that the fan will run per hour.

| Service data attribute | Optional | Description                                                                                                              |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`'s of climate devices to control. Use `entity_id: all` to target all. |
| `fan_min_on_time`      | no       | integer (e.g.,  5)                                                                                                       |

### Service `ecobee.set_dst_mode`

Enable/disable automatic daylight savings time.

| Service data attribute | Optional | Description                                                  |
| ---------------------- | -------- | ------------------------------------------------------------ |
| `entity_id`            | yes      | ecobee thermostat on which to set daylight savings time mode |
| `dst_enabled`          | no       | true or false                                                |

### Service `ecobee.set_mic_mode`

Enable/disable Alexa mic (only for ecobee 4).

| Service data attribute | Optional | Description                                    |
| ---------------------- | -------- | ---------------------------------------------- |
| `entity_id`            | yes      | ecobee thermostat on which to set the mic mode |
| `mic_enabled`          | no       | true or false                                  |

### Service `ecobee.set_occupancy_modes`

Enable/disable Smart Home/Away and Follow Me modes.

| Service data attribute | Optional | Description                                       |
| ---------------------- | -------- | ------------------------------------------------- |
| `entity_id`            | yes      | ecobee thermostat on which to set occupancy modes |
| `auto_away`            | yes      | true or false                                     |
| `follow_me`            | yes      | true or false                                     |
