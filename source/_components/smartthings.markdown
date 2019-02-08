---
layout: page
title: "SmartThings"
description: "Instructions on setting up Samsung SmartThings within Home Assistant."
date: 2018-01-14 00:00
sidebar: true
comments: false
sharing: true
footer: true
featured: true
logo: samsung_smartthings.png
ha_category:
  - Binary Sensor
  - Fan
  - Hub
  - Light
  - Switch
ha_release: "0.87"
ha_iot_class: "Cloud Push"
redirect_from:
  - /components/smartthings.binary_sensor/
  - /components/binary_sensor.smartthings/
  - /components/smartthings.fan/
  - /components/fan.smartthings/
  - /components/smartthings.light/
  - /components/light.smartthings/
  - /components/smartthings.switch/
  - /components/switch.smartthings/
---

Samsung SmartThings is integrated into Home Assistant through the SmartThings Cloud API. The SmartThings component is the main component to integrate all SmartThings related platforms. The basic features of this integration include:

1. Controlling SmartThings devices with pushed state updates from SmartThings.
2. Entities automatically added, removed, or updated when changed in SmartThings (upon Home Assistant restart).
3. Support for multiple SmartThings accounts and locations, each represented as a unique integration in the front-end configuration.
4. No brokers, bridges, or additional dependencies.

## {% linkable_title Basic requirements %}

1. A [personal access token](https://account.smartthings.com/tokens) tied to a Samsung or SmartThings account (see below for instructions).
2. Home Assistant setup for [remote access](/docs/configuration/remote/) via a domain name secured with SSL. *Self-signed SSL certificates are not supported by the SmartThings Cloud API.*
3. [`base_url` of the http component](/components/http#base_url) set the URL that Home Assistant is available on the internet.

## {% linkable_title Setup instructions %}

### {% linkable_title Create personal access token %}

1. Log into the [personal access tokens page](https://account.smartthings.com/tokens) and click '[Generate new token](https://account.smartthings.com/tokens/new)'
2. Enter a token name (can be whatever you want), for example, 'Home Assistant' and select the following authorized scopes:
    - Devices (all)
    - Installed Apps (all)
    - Locations (all)
    - Apps (all)
    - Schedules (all)
    - Scenes (all)
3. Click 'Generate token'. When the token is displayed, copy and save it somewhere safe (such as your keystore) as you will not be able to retrieve it again.

### {% linkable_title Configure Home Assistant %}

<p class='note info'>
The SmartThings component is configured exclusively through the front-end. Manual setup through `configuration.yaml` is not available at this time.
</p>

1. From the Home Assistant front-end, navigate to 'Configuration' then 'Integrations'. Under 'Set up a new integration' locate 'SmartThings' and click 'Configure'.
2. Enter the personal access token created above and click 'Submit'
3. When prompted, install the SmartApp:
    1. Open the SmartThings Classic mobile app. Navigate to 'Automation' and select the 'SmartApps' tab.
    2. Click 'Add a SmartApp', scroll to the bottom, and select 'My Apps', then choose 'Home Assistant'.
    3. Optionally change the display name and press 'Done'
    4. Authorize the app by pressing 'Allow'
4. Return to Home Assistant and click 'Submit'.

<p class='note info'>
Advanced: If you have multiple locations in SmartThings, each can be integrated into Home Assistant. Follow the steps above, then for each subsequent location, install the SmartApp and it will automatically add to Home Assistant. This can be completed during step 3 (install SmartApp) above or at any time after that.
</p>

## {% linkable_title Events %}

The SmartThings component triggers events for select device capabilities.

### {% linkable_title smartthings.button %}

The component will trigger an event when a device with the [button](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Button) capability is actuated and can be used to trigger automations within Home Assistant. Below is an example of the data payload:

```json
{
  "component_id": "main",
  "device_id": "42a16cf2-fef7-4ee8-b4a6-d32cb65474b7",
  "location_id": "2a54b9fa-f66c-42d9-8488-d8f036b980c8",
  "value": "pushed",
  "name": "Scene Button"
}
```

| Attribute                 | Description
|---------------------------|------------------------------------------------------------------|
`component_id`              | Describes which component of the device triggered the event. `main` represents the parent device. For devices with child-devices, this attribute identifies the child that raised the event.
`device_id`                 | The unique id of the device in SmartThings. This can be located in the HASS device registry or in the [SmartThings Groovy IDE](https://developers.smartthings.com/).
`location_id`               | The unique id of the location the device is part of. This can be found in the config entry registry or in the [SmartThings Groovy IDE](https://developers.smartthings.com/).
`value`                     | Describes the action taken on the button. See the [button](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Button) capability reference for a list of possible values (not all are supported by every device).
`name`                      | The name given to the device in SmartThings.

## {% linkable_title Platforms %}

SmartThings represents devices as a set of [capabilities](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html) and the SmartThings component mapps those to entity platforms in Home Assistant. A single device may be represented by one or more platforms.

| Platform                        |Capabilities
|---------------------------------|--------------------------------------------------------------------------------------------|
[binary_sensor](#binary-sensor)   | `accelerationSensor`, `contactSensor`, `filterStatus`, `motionSensor`, `presenceSensor`, `tamperAlert`, `valve` and `waterSensor`
[fan](#fan)                       | `fanSpeed` and `switch`
[light](#light)                   | `colorControl`, `colorTemperature`, `switch` and `switchLevel`
[switch](#switch)                 | `switch`

Support for additional capabilities will be added in the future.

### {% linkable_title Binary Sensor %}

The SmartThings Binary Sensor platform lets you view devices that have binary sensor-related capabilities. A Binary Sensor entity will be created for each attribute (below) supported by the device.

| Capability        |Attribute     |On-Value        |Binary Sensor Device Class
|-------------------|--------------|----------------|---------------------------------|
| [`accelerationSensor`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Acceleration-Sensor) | `acceleration` | `active`   | `moving`
| [`contactSensor`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Contact-Sensor)           | `contact`      | `open`     | `opening`
| [`filterStatus`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Filter-Status)             | `filterStatus` | `replace`  | `problem`
| [`motionSensor`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Motion-Sensor)             | `motion`       | `active`   | `motion`
| [`presenceSensor`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Presence-Sensor)         | `presence`     | `present`  | `presence`
| [`tamperAlert`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Tamper-Alert)               | `tamper`       | `detected` | `problem`
| [`valve`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Valve)                            | `valve`        | `open`     | `opening`
| [`waterSensor`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Water-Sensor)               | `water`        | `wet`      | `moisture`

### {% linkable_title Fan %}

The SmartThings fan platform lets you control devices that have fan-related capabilities. For a SmartThings device to be represented by the fan platform, it must have one or more of the capabilities below in addition to the [`switch`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Switch) capability.

| Capability        |Fan Features
|-------------------|------------------------------------------------------------|
| [`fanSpeed`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Fan-Speed)            | `speed` (`off`, `low`, `medium`, and `high`)

### {% linkable_title Light %}

The SmartThings light platform lets you control devices that have light-related capabilities. For a SmartThings device to be represented by the light platform, it must have one or more of the capabilities below in addition to the [`switch`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Switch) capability.

| Capability        |Light Features
|-------------------|------------------------------------------------------------|
| [`switchLevel`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Switch-Level)            | `brightness` and `transition`
| [`colorControl`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Color-Control)            | `color`
| [`colorTemperature`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Color-Temperature)            | `color_temp`

### {% linkable_title Switch %}

The SmartThings switch platform lets you control devices that have the [`switch`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Switch) capability that are not already represented by a more specific platform.