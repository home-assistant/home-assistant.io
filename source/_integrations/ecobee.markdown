---
title: ecobee
description: Instructions for how to integrate ecobee thermostats and sensors within Home Assistant.
ha_category:
  - Sensor
  - Binary Sensor
  - Notifications
  - Climate
  - Humidifier
  - Weather
featured: true
ha_release: 0.9
ha_iot_class: Cloud Poll
ha_config_flow: true
ha_codeowners:
  - '@marthoc'
ha_domain: ecobee
ha_platforms:
  - binary_sensor
  - climate
  - humidifier
  - notify
  - sensor
  - weather
---

The `ecobee` integration lets you control and view sensor data from [ecobee](https://ecobee.com) thermostats.

## Preliminary Steps

You will need to obtain an API key from ecobee's [developer site](https://www.ecobee.com/developers/) to use this integration. To get the key, your thermostat must be registered on ecobee's website (which you likely would have already done while installing your thermostat). Once you have done that, perform the following steps.

1. Click on the **Become a developer** link on the [developer site](https://www.ecobee.com/developers/).
2. Log in with your ecobee credentials. (Make sure multifactor authentication is disabled to allow login can re-enable after becoming developer.)
3. Accept the SDK agreement.
4. Fill in the fields.
5. Click **save**.

Log in to the regular consumer portal and click the overflow menu button in the upper right. You will see a new option named **Developer**. Now an application can be created to integrate with Home Assistant.

1. Select the **Developer** option from the hamburger menu on the top-right.
2. Select **Create New**.
3. Complete the form on the right. (Neither of the fields are referenced by Home Assistant)
    * Name: Must be unique across all ecobee users.
    * Summary: Does not need to be unique.
4. Click *Authorization method* and select **ecobee PIN**.
5. Click **Create**.

Your new application will now appear on the left. Upon clicking on the application, API key will appear on the right. Copy this key and use it in the configuration section below. Click **X** to close the Developer section.

## Configuration

1. In the **Configuration** > **Integrations** menu, click **+** and then select "ecobee" from the pop-up menu.
2. In the pop-up box, enter the API key you obtained from ecobee's [developer portal](https://ecobee.com/developers).
3. In the next pop-up box, you will be presented with a unique four-character PIN code which you will need to authorize in the [ecobee consumer portal](https://www.ecobee.com/consumerportal/index.html). You can do this by logging in, selecting **My Apps** from the hamburger menu, clicking **Add Application** on the left, entering the PIN code from Home Assistant, clicking **Validate** and then **Add Application** in the bottom right.
4. After authorizing the app with ecobee, return to Home Assistant and click **Submit**. If the authorization was successful, a configuration entry will be created and your thermostats and sensors will be available in Home Assistant.

## Manual Configuration

If you prefer to set up the integration in [`configuration.yaml`](/docs/configuration/), add your API key (and optional parameters) as follows (however, you must still complete authorization via the **Integrations** menu):

```yaml
# Example configuration.yaml entry
ecobee:
  api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: Your ecobee API key. This is only needed for the initial setup of the integration. Once registered it can be removed. If you revoke the key in the ecobee portal, you will need to remove the existing `ecobee` configuration in the **Integrations** menu, update this, and then configure the integration again.
  required: false
  type: string
{% endconfiguration %}

<p class='img'>
  <img src='/images/screenshots/ecobee-sensor-badges.png' />
  <img src='/images/screenshots/ecobee-thermostat-card.png' />
</p>

You must [restart Home Assistant](/docs/configuration/#reloading-changes) for the changes to take effect. After restarting, navigate to the **Configuration** > **Integrations** menu, hit **Configure** next to the discovered `ecobee` entry, and continue to authorize the app according to the above **Automatic Configuration**, starting at step 2.

## Notifications

To get your ecobee notifications working with Home Assistant, you must first have the main ecobee integration loaded and running. Once you have that configured, you can set up this integration to send messages to your ecobee device.

To use this notification platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: ecobee
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: "`notify`"
  type: string
{% endconfiguration %}

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

The _HVAC mode_ of the device is the currently active operational modes that the ecobee thermostat provides: heat, auxHeatOnly, cool, auto, and off.

The _target humidity_ is the humidity set point of the thermostat when a humidifier is connected and in manual control or "On" mode.

## Attributes

The ecobee climate entity has some extra attributes to represent the state of the thermostat.

| Name | Description |
| ---- | ----------- |
| `fan` | If the fan is currently on or off: `on` / `off`.
| `climate_mode` | This is the climate mode that is active, or would be active if no override is active.
| `equipment_running` | This is a comma-separated list of equipment that is currently running.
| `fan_min_on_time` | The minimum amount of time (in minutes) that the fan will run per hour. This is determined by the minimum fan runtime setting which can be changed in the ecobee app or on the thermostat itself.

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
| `start_time`           | yes      | Time the vacation starts in the local time zone. Must be in 24-hour format (HH:MM:SS)        |
| `end_date`             | yes      | Date the vacation ends in YYYY-MM-DD format (14 days from now if not provided)                       |
| `end_time`             | yes      | Time the vacation ends in the local time zone. Must be in 24-hour format (HH:MM:SS)          |
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

| Service data attribute | Optional | Description                                                                                            |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`'s of climate devices to control. Use `entity_id: all` to target all. |
| `resume_all`           | no       | true or false                                                                                          |

### Service `ecobee.set_fan_min_on_time`

Sets the minimum amount of time that the fan will run per hour.

| Service data attribute | Optional | Description                                                                                            |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`'s of climate devices to control. Use `entity_id: all` to target all. |
| `fan_min_on_time`      | no       | integer (e.g.,  5)                                                                                       |

### Service `ecobee.set_dst_mode`

Enable/disable automatic daylight savings time.

| Service data attribute | Optional | Description                                       |
| ---------------------- | -------- | ------------------------------------------------- |
| `entity_id`            | yes      | ecobee thermostat on which to set daylight savings time mode |
| `dst_enabled`          | no       | true or false                                     |

### Service `ecobee.set_mic_mode`

Enable/disable Alexa mic (only for ecobee 4).

| Service data attribute | Optional | Description                                       |
| ---------------------- | -------- | ------------------------------------------------- |
| `entity_id`            | yes      | ecobee thermostat on which to set the mic mode    |
| `mic_enabled`          | no       | true or false                                     |

### Service `ecobee.set_occupancy_modes`

Enable/disable Smart Home/Away and Follow Me modes.

| Service data attribute | Optional | Description                                       |
| ---------------------- | -------- | ------------------------------------------------- |
| `entity_id`            | yes      | ecobee thermostat on which to set occupancy modes |
| `auto_away`            | yes      | true or false                                     |
| `follow_me`            | yes      | true or false                                     |
