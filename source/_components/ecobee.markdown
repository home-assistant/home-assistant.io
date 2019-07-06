---
layout: page
title: "Ecobee"
description: "Instructions for how to integrate Ecobee thermostats and sensors within Home Assistant."
date: 2015-11-30 17:54
sidebar: true
comments: false
sharing: true
footer: true
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
temperature. When the thermostat is in auto operation mode, there is a
pair of target temperatures: the lower target temperature determines
the lowest desired temperature, while the higher target temperature
determines the highest desired temperature (the thermostat will switch
between heating and cooling to keep the temperature within these
limits).

A _climate_ is a predefined or user-defined set of states that the
thermostat aims to achieve. The ecobee thermostat provides three predefined
climates: Home, Away, and Sleep. The user can define additional climates.

A _hold_ is an override of the target temperature defined in the
currently active climate. The temperature targeted in the hold mode may be
explicitly set (temperature hold), it may be derived from a reference
climate (home, away, sleep, etc.), or it may be derived from a vacation
defined by the thermostat. All holds are temporary. Temperature and
climate holds expire when the thermostat transitions to the next climate
defined in its program. A vacation hold starts at the beginning of the
defined vacation period, and expires when the vacation period ends.

When in _away mode_, the target temperature is permanently overridden by
the target temperature defined for the away climate. The away mode is a
simple way to emulate a vacation mode.

The _operation mode_ of the device is the currently active operational
modes that the Ecobee thermostat provides: heat, auxHeatOnly, cool,
auto, and off.

## Attributes

The following attributes are provided by the Ecobee Thermostat:
`name`, `temperature_unit`, `current_temperature`, `target_temperature`,
`target_temperature_low`, `target_temperature_high`, `desired_fan_mode`,
`fan`, `current_hold_mode`, `operation`, `operation_list`, `equipment_running`,
`operation_mode`, `mode`, `fan_min_on_time`, `device_state_attributes`,
`is_away_mode_on`, `vacation`, `climate_list`, `aux_heat`.
The attributes `min_temp` and `max_temp` are meaningless constant values.

### Attribute `name`

Returns the name of the Ecobee Thermostat.

| Attribute type | Description |
| ---------------| ----------- |
| String | Name of the Ecobee Thermostat

### Attribute `temperature_unit`

Returns the unit of measurement used for temperature by the thermostat.

| Attribute type | Description |
| ---------------| ----------- |
| String | Name of the temperature unit

### Attribute `current_temperature`

Returns the current temperature measured by the thermostat.

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Currently measured temperature

### Attribute `target_temperature`

Returns the target temperature of the thermostat, when the thermostat is
not in auto operation mode.

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Target temperature

### Attribute `target_temperature_low`

Returns the desired heating temperature set in the thermostat when in
auto operation mode.

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Target temperature

### Attribute `target_temperature_high`

Returns the desired cooling temperature set in the thermostat when in
auto operation mode.

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Target temperature

### Attribute `desired_fan_mode`

Returns the desired fan mode of the current operation.

| Attribute type | Description |
| ---------------| ----------- |
| String | 'on', 'off'

### Attribute `fan`

Returns the current fan state.

| Attribute type | Description |
| ---------------| ----------- |
| String | 'on', 'off'

### Attribute `current_hold_mode`

Returns the current temperature hold, if any.

| Attribute type | Description |
| ---------------| ----------- |
| String | 'temp', 'vacation', 'home', 'away', etc., None

### Attribute `operation`

Returns the current operation of the thermostat.

| Attribute type | Description |
| ---------------| ----------- |
| String | 'auto', 'cool', 'heat', 'off'

### Attribute `operation_list`

Returns the list of available operation modes.

| Attribute type | Description |
| ---------------| ----------- |
| List of String | Available operation modes

### Attribute `operation_mode`

Returns the current operation mode of the thermostat.

| Attribute type | Description |
| ---------------| ----------- |
| String | Currently active operation mode

### Attribute `equipment_running`

Returns the list of equipment that is currently operating from the thermostat.

| Attribute type | Description |
| ---------------| ----------- |
| String | If no equipment is currently running empty string is returned. Possible values are a comma separated list of any of the following: heatPump, heatPump2, heatPump3, compCool1, compCool2, auxHeat1, auxHeat2, auxHeat3, fan, humidifier, dehumidifier, ventilator, economizer, compHotWater, auxHotWater.

### Attribute `mode`

Returns the climate currently active on the thermostat. The mode
is returned as the user-visible name (rather than the internally used name).

### Attribute `fan_min_on_time`

Returns the current fan minimum on time.

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Current fan minimum on time in minutes

### Attribute `is_away_mode_on`

Returns whether the thermostat is in away mode (see the corresponding
service for more detail).

### Attribute `actual humidity`

Returns the humidity as measured by the thermostat.

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Current humidity

### Attribute `vacation`

Returns the currently active vacation or `None`.

| Attribute type | Description |
| ---------------| ----------- |
| String | Name of currently active vacation |

### Attribute `climate_list`

Returns the list of climates defined in the thermostat.

### Attribute `aux_heat`

Returns the current auxiliary heat state.

| Attribute type | Description |
| ---------------| ----------- |
| String | 'on', 'off'

## Services

The following services are provided by the Ecobee Thermostat:
`set_away_mode`, `set_hold_mode`, `set_temperature`, `set_operation_mode`,
`fan_min_on_time`, `resume_program`.
The services `set_aux_heat`, `set_humidity`, `set_fan_mode`, and
`set_swing_mode` offered by the [Climate component](/components/climate/)
are not implemented for this thermostat.

### Service `set_away_mode`

Turns Away Mode on or off, ignoring the next scheduled activity. This setting will override the thermostat Hold Duration setting, even if you set the hold duration to "Until the next scheduled activity" within thermostat preferences.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `away_mode` | no | 'on' or 'off'

### Service `set_hold_mode`

Puts the thermostat into the given hold mode. For 'home', 'away', 'sleep',
and any other hold based on a comfort setting, the
target temperature is set to whatever is programmed in the comfort setting.
For 'temp', the current temperature is taken as the target temperature.
When None is provided as parameter, the hold_mode is turned off.
If the thermostat Hold Duration is set to "Until the next scheduled activity" within thermostat preferences, then the next scheduled activity will change this hold mode.
Note that it is not possible to set a vacation hold; this must be defined on the thermostat directly. However, a vacation hold can be
canceled.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `hold_mode` | no | `temp`, `home`, `away`, `sleep`, `None`, `smart1`, `smart2`, etc.

NOTE: If you create custom hold modes (also known as "Comfort Settings") on your ecobee.com dashboard, their hold_modes are `smart1`, `smart2`, `smart3`, etc. The number for each custom mode should match the mode's icon on your ecobee.com dashboard. Also note that the mode numbers/icons in the ecobee mobile app *may not match* the numbers/icons from the ecobee.com web dashboard. The ones on the website are the ones you shoud use to determine the correct `smartX` hold_mode IDs.

### Service `set_temperature`

Puts the thermostat into a temporary hold at the given temperature.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `target_temp_low` | no | Desired heating target temperature (when in auto mode)
| `target_temp_high` | no | Desired cooling target temperature (when in auto mode)
| `temperature` | no | Desired target temperature (when not in auto mode)

Only the target temperatures relevant for the current operation mode need to
be provided.

### Service `set_operation_mode`

Sets the current operation mode of the thermostat.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `operation_mode` | no | 'auto', 'auxHeatOnly', 'cool', 'heat', 'off'

### Service `fan_min_on_time`

Sets the fan minimum on time.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `fan_min_on_time` | no | Desired fan minimum on time

### Service `resume_program`

Resumes the currently active schedule.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `resume_all` | no | true or false
