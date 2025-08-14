---
title: Sensibo
description: Instructions on how to integrate Sensibo A/C controller into Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Fan
  - Number
  - Select
  - Sensor
  - Switch
  - Update
ha_release: 0.44
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@andrey-git'
  - '@gjohansson-ST'
ha_domain: sensibo
ha_platforms:
  - binary_sensor
  - button
  - climate
  - diagnostics
  - number
  - select
  - sensor
  - switch
  - update
ha_homekit: true
ha_dhcp: true
ha_integration_type: integration
ha_quality_scale: platinum
---

The **Sensibo** {% term integration %} integrates [Sensibo](https://sensibo.com) devices into Home Assistant.

## Prerequisites

Please click [here](https://home.sensibo.com/me/api) and register to obtain the API key.

{% tip %}
If you create the API key using a dedicated user (and not your main user),
then in the Sensibo app log you will be able to distinguish between actions
done in the app and actions done by Home Assistant.
{% endtip %}

## Supported devices

The **Sensibo** {% term integration %} supports the following devices and accessories.

- **Sensibo Sky**: Smart AC control device.
- **Sensibo Air**: Smart AC control device.
- **Sensibo Air Pro**: Smart AC control device with air quality monitoring.
- **Sensibo Pure**: Smart air purifier.
- **Sensibo Elements**: Smart air quality monitoring.
- **Sensibo Room Sensor**: Motion sensor and temperature readings (needs to be connected with an Air device).

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: The previously created API key.
{% endconfiguration_basic %}

## Supported functionality

{% note %}

Some entities are disabled by default, so you need to [enable them](/common-tasks/general/#to-enable-or-disable-a-single-entity) to use them.

Depending on device support, some entities might not be available as the device does not support them.

{% endnote %}

### Sensibo Sky, Air, Air Pro, Pure, Elements and Room sensor

#### Numbers

- **Temperature calibration**: Calibrate the temperature reading of the device.
- **Humidity calibration**: Calibrate the humidity reading of the device.

#### Updates

- **Firmware**: Firmware update available.

### Sensibo Sky, Air, Air Pro, Pure, and Elements

#### Binary sensors

- **Filter clean required**: Does the A/C's filter need cleaning.

#### Buttons

- **Reset filter**: Reset the filter timer after cleaning.

#### Climates

- **[Name of device]**: The main climate entity for the device to control <abbr title="Heating, ventilation, and air conditioning">HVAC</abbr> mode.

#### Selects

- **Light**: Turn the light on/off or dim for the device.

#### Sensors

- **Filter last reset**: Last reset of the filter cleaning.

### Sensibo Sky, Air, and Air Pro

#### Sensors

- **Feels like**: Feels like temperature.
- **Timer end time**: End time of timer.
- **Climate React type**: Climate React type: Temperature, Feels like, or Humidity.
- **Climate React low temperature threshold**: Low temperature threshold setting for Climate react.
- **Climate React high temperature threshold**: High temperature threshold setting for Climate react.

#### Switches

- **Timer**: Timer on/off. Enabling the timer, sets it to 10 minutes.
- **Climate React**: Enable/Disable Climate React.

### Sensibo Air, Air Pro, and Elements

#### Sensors

- **TVOC**: TVOC reading from device.
- **Co2**: Co2 reading from device.

### Sensibo Elements

#### Sensors

- **PM2.5**: PM2.5 reading from device.
- **Ethanol**: Ethanol reading from device.
- **Air quality**: Air quality based on readings from device.

### Sensibo Pure

#### Binary sensors

- **Pure Boost linked with AC**: Is Pure Boost linked with an A/C device.
- **Pure Boost linked with presence**: Is Pure Boost linked to presence.
- **Pure Boost linked with indoor air quality**: Is Pure Boost linked with indoor air quality.
- **Pure Boost linked with outdoor air quality**: Is Pure Boost linked with outdoor air quality.

#### Sensors

- **Pure AQI**: PM2.5 level indicated as 'Good', 'Moderate', and 'Bad'.
- **Pure Boost Sensitivity**: Sensitivity for Pure Boost.

#### Switches

- **Pure Boost**: Enable/Disable Pure Boost.

### Sensibo Room sensor

#### Binary sensors

- **Motion**: Is there motion
- **Connectivity**: Is the motion sensor alive and connected
- **Main sensor**: Is the connected motion sensor the main sensor for the connected Air device.
- **Room occupied**: Is there presence in the room of the connected Air device.

## Actions

### Get device mode capabilities

As the below custom actions [Full state](#set-full-state) and [Climate react](#enable-climate-react) both require their inputs to match the API requirements precisely, this custom action will provide the capabilities for the device for a certain HVAC mode to help the users on using those actions properly.

**Action configuration:**

{% configuration_basic %}
Target:
  description: Select the Sensibo climate entity.
HVAC mode:
  description: Select the HVAC mode for which you want to get the capabilities.
{% endconfiguration_basic %}

**Proposed action use:**

1. Go to [Developer Tools](https://my.home-assistant.io/redirect/server_controls/).
2. Switch to the **Actions** page.
3. Use the `sensibo.get_device_capabilities` action.
4. Select the `climate` entity as the target.
5. Select the `hvac_mode` from the available list.
6. Select **Perform action** to retrieve the available options.
7. Copy the case-sensitive options as needed to other action calls, automations or scripts.

### Set full state

You can send a full state command to **Sensibo** instead of single commands using the `sensibo.full_state` action.

{% note %}

All fields are required to be according to Sensibo API specifications and are case-sensitive.

Only provide the fields which are supported by the device.

{% endnote %}

**Action configuration:**

{% configuration_basic %}
Target:
  description: Select the Sensibo climate entity.
HVAC mode:
  description: Select the HVAC mode for which you want to get the capabilities.
Target temperature:
  description: Provide a target temperature if applicable.
Fan mode:
  description: Provide a fan mode if applicable.
Swing mode:
  description: Provide a swing mode if applicable.
Horizontal swing mode:
  description: Provide a horizontal swing mode if applicable.
Light:
  description: Provide a setting for the light if applicable.
{% endconfiguration_basic %}

{% tip %}

Use the [Get device mode capabilities](#get-device-mode-capabilities) action to provide a list of capabilities.

{% endtip %}

### Assume state

An HVAC device often has a manual remote or other means of control which can put **Sensibo** out of sync with the HVAC device.

Use the `sensibo.assume_state` action to tell **Sensibo** if the HVAC device is currently on or off without sending a control to the actual device.

**Action configuration:**

{% configuration_basic %}
Target:
  description: Select the Sensibo climate entity.
State:
  description: Select if the HVAC device is on or off.
{% endconfiguration_basic %}

### Enable Pure Boost

You can configure your Pure Boost settings using the `sensibo.enable_pure_boost` action.

{% note %}

AC integration and Geo integration needs to be pre-configured via the app before first use.

{% endnote %}

**Action configuration:**

{% configuration_basic %}
Target:
  description: Select the Sensibo climate entity.
AC integration:
  description: Integrate with a HVAC device.
Geo integration:
  description: Integrate with presence.
Indoor air quality:
  description: Integrate with indoor air quality.
Outdoor air quality:
  description: Integrate with outdoor air quality.
Sensitivity:
  description: Set the sensitivity to `Normal` or `Sensitive`.
{% endconfiguration_basic %}

### Enable timer

You can enable a timer to turn the HVAC device on or off for a certain time, using the `sensibo.enable_timer` action that is provided.

**Action configuration:**

{% configuration_basic %}
Target:
  description: Select the Sensibo climate entity.
Minutes:
  description: Number of minutes to turn the device on or off.
  mandatory: true
{% endconfiguration_basic %}

### Enable Climate React

You can configure your Climate React settings using the `sensibo.enable_climate_react` action.

{% note %}

Configuring this action also turns Climate React on.

When using the action, the state needs to be set to precisely what Sensibo API expects. The first time, it's recommended to use the app to configure it.

{% endnote %}

**Action configuration:**

{% configuration_basic %}
Target:
  description: Select the Sensibo climate entity.
Threshold high:
  description: When the trigger goes above this value.
State high threshold:
  description: The full state to configure above the high threshold.
Threshold low:
  description: When the trigger goes below this value.
State low threshold:
  description: The full state to configure below the low threshold.
Trigger type:
  description: The trigger type (`temperature`, `feelsLike`, or `humidity`).
{% endconfiguration_basic %}

{% tip %}

Use the [Get device mode capabilities](#get-device-mode-capabilities) action to provide a list of capabilities.

{% endtip %}

**Example full state:**

{% raw %}

```yaml
on: true
fanLevel: "high"
temperatureUnit: "C"
targetTemperature: 23
mode: "cool"
swing: "fixedBottom"
horizontalSwing: "fixedLeft"
light: "on"
```

{% endraw %}

## Examples

### Template switch to turn HVAC device on or off

A simple switch which has `heat` or `off` as mode.

{% raw %}

```yaml
switch:
  - platform: template
    switches:
      ac:
        friendly_name: "AC"
        value_template: "{{ is_state('climate.ac', 'heat') }}"
        turn_on:
          action: climate.set_hvac_mode
          target:
            entity_id: climate.ac
          data:
            hvac_mode: "heat"
        turn_off:
          action: climate.set_hvac_mode
          target:
            entity_id: climate.ac
          data:
            hvac_mode: "off"
```

{% endraw %}

### Start the timer for 30 minutes when I get home

{% raw %}

```yaml
automation:
  alias: "Example timer"
  triggers:
    - trigger: zone
      entity_id: person.me
      zone: zone.home
      event: enter
  actions:
    - action: sensibo.enable_timer
      data:
        minutes: 30
      target:
        entity_id: climate.hvac_device
```

{% endraw %}

### Set a full state of the HVAC device at 6pm

{% raw %}

```yaml
automation:
  alias: "Example full state"
  triggers:
    - trigger: time
      at: "18:00:00"
  actions:
    - action: sensibo.full_state
      data:
        mode: "heat"
        target_temperature: 23
        fan_mode: "medium"
        swing_mode: "fixedMiddleTop"
        horizontal_swing_mode: "fixedCenter"
        light: "off"
      target:
        entity_id: climate.hvac_device
```

{% endraw %}

## Data fetching and limitations

Data is {% term polling polled %} from the **Sensibo** API once every minute for all devices.

If {% term polling %} cannot happen because of no connectivity or a malfunctioning API, it will retry a few times before failing.
The user can use the [`homeassistant.update_entity`](homeassistant#action-homeassistantupdate_entity) action to manually try again later, in the case the user has solved the connectivity issue.

## Troubleshooting

This service is reliant on an internet connection and that the **Sensibo** API is available. Here are the things you can try before raising an issue:

- Check that internet is available in your Home Assistant instance.
- Check that the **Sensibo** API is available by accessing the [Sensibo API page](https://home.sensibo.com/api/v1/users/me). If you have previously logged in to Sensibo web, you will get a JSON back with the provided information about your account. If not logged in, the API will respond with `login_required`.
- Use `curl` in a terminal on your Home Assistant instance using the same URL as previously opened in the browser. `curl https://home.sensibo.com/api/v1/users/me`

### Specific log entries

**Log entry:** `Device [name of device] not correctly registered with remote on Sensibo cloud.`

When setting up a device the first time, a `remote` needs to be defined for the device in the **Sensibo** app, either automatically or manually.
The device will appear in Home Assistant, but won't be usable as no HVAC modes can be selected.

## Remove the integration

{% include integrations/remove_device_service.md %}
