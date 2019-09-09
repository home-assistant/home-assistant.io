---
title: "Ecobee"
description: "Instructions for how to integrate Ecobee thermostats and sensors within Home Assistant."
logo: ecobee.png
ha_category:
  - Sensor
  - Binary Sensor
  - Notifications
  - Climate
  - Weather
featured: true
ha_release: 0.9
ha_iot_class: Cloud Push
redirect_from:
  - /components/sensor.ecobee/
  - /components/binary_sensor.ecobee/
  - /components/notify.ecobee/
  - /components/climate.ecobee/
  - /components/weather.ecobee/
---

The `ecobee` integration lets you control a thermostats and view sensor data from [ecobee](https://ecobee.com) thermostats.

## Configuration

You will need to obtain an API key from ecobee's [developer site](https://www.ecobee.com/developers/) to use this component. To get the key, first you need to register your thermostat which should be done as part of the ecobee installation. Once you have done that perform the following steps.

1. Click on the **Become a developer** link on the [developer site](https://www.ecobee.com/developers/).
2. Login with your ecobee credentials.
3. Accept the SDK agreement.
4. Fill in the fields.
5. Click **save**.

Now login to the regular consumer portal, and in the hamburger menu there will be a new option **Developer**. Now we can create the Application to hook up to Home Assistant.

1. Select the Developer option.
2. Select **Create New**.
3. Give your app a name (it appears to need to be unique across all users, as I tried 'home-assistant' and it said it was already in use. Try <yournameoralias>-home-assistant) and a summary (neither of these are important as they are not used anywhere).
4. For Authorization method select **ecobee PIN**.
5. You don't need an Application Icon or Detailed Description.
6. Click **Create**.

Now under the Name and Summary Section you will have an API key. Copy this key and use it in you configuration section below. Click the **X** to close the Developer section.

To add the Ecobee integration to Home Assistant, add the following information to your [`configuration.yaml`](/docs/configuration/) file:

```yaml
# Example configuration.yaml entry
ecobee:
  api_key: YOUR_API_KEY
```

[Restart Home Assistant](/docs/configuration/#reloading-changes) for the changes to take effect.

The first time you (re)run Home Assistant with this integration it will give you a PIN code that you need to authorize in the [ecobee consumer portal](https://www.ecobee.com/consumerportal/index.html). You can do this by clicking **Add Application** in the **My Apps** section in the sidebar.

The PIN can be found from the Home Assistant portal on the Ecobee card or from the **configurator.ecobee** entity in states in the portal.

- If you do not have an ecobee card, you may be using groups with `default_view` that don't show the card. To get around this you can temporarily comment out the `default_view` section or add the `configurator.ecobee` integration to your `default_view` and restart Home Assistant.

Once you enter the PIN on the ecobee site, wait approximately 5 minutes and then click on the **I have authorized the app** link at the bottom of the ecobee pop-up window. If everything worked correctly, you should now be able to restart Home Assistant again to see the full ecobee card with all of the sensors populated or see the list of sensors in the developer tools. Now you can re-enable your `default_view` (if you had to disable it) and add the ecobee sensors to a group and/or view.

{% configuration %}
api_key:
  description: Your ecobee API key. This is only needed for the initial setup of the component. Once registered it can be removed. If you revoke the key in the ecobee portal you will need to update this again and remove the ecobee.conf file in the `.homeassistant` configuration path.
  required: true
  type: string
hold_temp:
  description: Whether or not to hold changes indefinitely (`true`) or until the next scheduled event.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

<p class='img'>
  <img src='{{site_root}}/images/screenshots/ecobee-sensor-badges.png' />
  <img src='{{site_root}}/images/screenshots/ecobee-thermostat-card.png' />
</p>

If for whatever reason you delete and re-create your ecobee app at ecobee.com such that your developer API key changes, you will need to delete your `/conf/ecobee.conf file`. You will also need to update the `api_key:` in the `configuration.yaml` or `secrets.yaml` file.

## Notifications

To get your Ecobee notifications working with Home Assistant, you must first have the main Ecobee integration loaded and running. Once you have that configured, you can setup this integration to send messages to your Ecobee device.

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

The Ecobee Thermostat supports the following key concepts.

The _target temperature_ is the temperature that the device attempts
to achieve. The target temperature is either determined by the
currently active climate or it may be overridden by a hold. When the
thermostat is not in auto mode, there is a single target
temperature. When the thermostat is in auto HVAC mode, there is a
pair of target temperatures: the lower target temperature determines
the lowest desired temperature, while the higher target temperature
determines the highest desired temperature (the thermostat will switch
between heating and cooling to keep the temperature within these
limits).

A _climate_ is a predefined or user-defined set of presets that the
thermostat aims to achieve. The ecobee thermostat provides three predefined
climates: Home, Away, and Sleep. The user can define additional climates.

A _preset_ is an override of the target temperature defined in the
currently active climate. The temperature targeted in the preset mode may be
explicitly set (temperature preset), it may be derived from a reference
climate (home, away, sleep, etc.), or it may be derived from a vacation
defined by the thermostat. All holds are temporary. Temperature and
climate holds expire when the thermostat transitions to the next climate
defined in its program. A vacation hold starts at the beginning of the
defined vacation period, and expires when the vacation period ends.

When in _away preset_, the target temperature is permanently overridden by
the target temperature defined for the away climate. The away preset is a
simple way to emulate a vacation mode.

The _HVAC mode_ of the device is the currently active operational
modes that the Ecobee thermostat provides: heat, auxHeatOnly, cool,
auto, and off.

## Attributes

The Ecobee climate entity has some extra attributes to represent the state of the thermostat.

| Name | Description |
| ---- | ----------- |
| `fan` | If the fan is currently on or off: `on` / `off`.
| `climate_mode` | This is the climate mode that is active, or would be active if no override is active.
| `equipment_running` | This is a comma seperated list of equipment that is currently running.
| `fan_min_on_time` | The minimum amount of minutes that the fan will be on when it's turned on.

## Services

Besides the standard services provided by the Home Assistant [Climate](https://www.home-assistant.io/components/climate/) integration, the following extra service is provided by the Ecobee Thermostat: `resume_program`.

### Service `resume_program`

Resumes the currently active schedule.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `resume_all` | no | true or false
