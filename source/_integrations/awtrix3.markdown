---
title: Awtrix3
description: Instructions on how to integrate Awtrix3 light with Home Assistant.
ha_category:
  - Button
  - Binary sensor
  - Light
  - Notifications
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_release: 2023.9
ha_codeowners:
  - '@10der'
ha_domain: awtrix3
ha_platforms:
  - button
  - binary_sensor
  - diagnostics
  - light
  - notify
  - sensor
  - switch
ha_integration_type: device
ha_config_flow: true
zeroconf: true
---

[Awtrix3 light](https://github.com/Blueforcer/awtrix3) is a smart DIY clock that can be used to access applications, listen to rtttl songs and display notifications.

{% include integrations/config_flow.md %}

## Actions

The Awtrix3 integration provides actions to interact with your Awtrix3
device(s). Those action can be used in, for example, automations.

### Action `awtrix3.push_app_data`

The {% my developer_call_service service="awtrix3.push_app_data" title="`Awtrix3 apps`" %}
action allows you to create applicatiion to your Awtrix3. 

[Awtrix3 APPS documentation](https://blueforcer.github.io/awtrix3/#/apps)

{% my developer_call_service badge service="awtrix3.push_app_data" %}

{% configuration "awtrix3.push_app_data" %}
name:
  description: Unique application name.
  required: true
  type: string
data:
  description: Specific data for application. If empty - app will be removed
  required: false
  type: map
  keys:
    PARAMETER_NAME:
      description: The value of the variable. Any YAML is valid. Templates can also be used to pass a value to the variable.
      type: any
device_id:
  description: The ID of the device to create application.
  required: true
  type: string
{% endconfiguration %}

## Example
```yaml
action: awtrix3.push_app_data
data:
  name: Test
  data:
    text: Hello, AWTRIX Light!
    rainbow: true
    icon: "87"
    duration: 5
    pushIcon: 2
    lifetime: 900
    repeat: 1
  device_id: deadbeaf
```

## Notifications

You can send notifications to your Awtrix3 device using
the [Notifications](/integrations/notify) integration.

Common action for all Awtrix3 devices is `notify.awtrix`

The notification performed action against an Awtrix3 device can take the
following, additional, optional parameters:

{% configuration "notification" %}
target:
  description: Awtrix3 device name.
  required: true
  type: [list, string]
message: 
  description: Just a text message
  required: false
  type: string
data: 
  description: specific data for message
  required: false
  type: map	
  keys:
    PARAMETER_NAME:
      description: The value of the variable. Any YAML is valid. Templates can also be used to pass a value to the variable.
      type: any
{% endconfiguration %}

## Example

Send notification

```yaml
- alias: "Send notification on Air raid"
  triggers:
    - from:
        - "off"
      to:
        - "on"
      entity_id:
        - binary_sensor.m_dnipro_ta_dniprovska_teritorialna_gromada_air
      trigger: state
  actions:
    - action: notify.awtrix
      data:
        message: "Hello world!"
        target: awtrix-bedroom
        data:
          color: "#FF0000"
          repeat: 3
          blinkText: 500
          rtttl: >-
            Buzzer:d=2,o=4,b=160:16g6,32p,16g6,32p,16g6,32p,16g6,4p,16g6,32p,16g6,32p,16g6,32p,16g6,4p
```

## Troubleshooting

