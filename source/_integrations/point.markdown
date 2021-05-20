---
title: Minut Point
description: Instructions on how to integrate Minut Point into Home Assistant.
ha_category:
  - Hub
  - Alarm
  - Binary Sensor
  - Sensor
ha_release: 0.83
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_quality_scale: gold
ha_codeowners:
  - '@fredrike'
ha_domain: point
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - sensor
---

The Point hub enables integration with the [Minut Point](https://minut.com/). To connect with Point, you will have to [sign up for a developer account](https://minut.com/community/developers/) and get a `client_id` and `client_secret` with the `callback url` configured as your Home Assistant URL + `/api/minut`, e.g.,  `http://localhost:8123/api/minut`. The `client_id` and `client_secret` should be used as below.

Once Home Assistant is started, a configurator will pop up asking you to Authenticate your Point account via a link. When you follow the link and click on **Accept** you will be redirected to the `callback url` and the Point integration will be automatically configured and you can go back to the original dialog and press **Submit**.

There is currently support for the following device types within Home Assistant:

- [Alarm](#alarm)
- [Binary Sensor](#binary-sensor)
- [Sensor](#sensor)

### Configuration

```yaml
# Example configuration.yaml entry
point:
  client_id: CLIENT_ID
  client_secret: CLIENT_SECRET
```

{% configuration %}
client_id:
  description: Your Minut Point developer client ID.
  required: true
  type: string
client_secret:
  description: Your Minut Point developer client secret.
  required: true
  type: string
{% endconfiguration %}

# Device types

The integration supports the following device types within Home Assistant:
  - [Alarm](#alarm)
  - [Binary Sensor](#binary-sensor)
  - [Sensor](#sensor)

<div class='note'>

The Point is just active occasionally so the [Sensors](#sensor) are only updated every hour or so. The [Binary Sensors](#binary-sensor) are however updated via [Cloud Push](/blog/2016/02/12/classifying-the-internet-of-things/#cloud-pushing-new-state), making the changes close to instant.

</div>

## Alarm

Each home configured in the Point mobile application will show up as a separate alarm control panel. The panels allow **arming** and **disarming** of the Point home alarm system.

<div class="note">

The Point only supports a Arm/Disarm action, so it is only `Arm Away` that is implememented.

</div>

## Binary Sensor

Each Point exposes the following binary sensors:

- **alarm**: `On` means alarm sound was recognised, `Off` means normal
- **battery**: `On` means low, `Off` means normal
- **button_press**: `On` means the button was pressed, `Off` means normal
- **cold**: `On` means cold, `Off` means normal
- **connectivity**: `On` means connected, `Off` means disconnected
- **dry**: `On` means too dry, `Off` means normal
- **glass**: `On` means the sound of glass break was detected, `Off` means normal
- **heat**: `On` means hot, `Off` means normal
- **light**: `On` means light detected, `Off` means no light
- **moisture**: `On` means moisture detected (wet), `Off` means no moisture (dry)
- **motion**: `On` means motion was detected, `Off` means no motion
- **noise**: `On` means noise was detected, `Off` means noise levels have gone back to normal
- **sound**: `On` means sound detected, `Off` means no sound (clear)
- **tamper**: `On` means the point was removed, `Off` means normal
- **tamper_old**: `On` means the point was removed or attached, `Off` means normal (this is only supported on some "old" devices)

<div class="note">

The binary sensors **button_press**, **sound** and **tamper** are switched `On` for a brief moment and are then switched back to `Off`.

</div>

### Automation example

The following example show how to implement an automation for the **button_press** binary sensor.

```yaml
# Example configuration.yaml Automation entry
automation:
  alias: "Point button press"
  trigger:
  - platform: state
    entity_id: binary_sensor.point_button_press  # Change this accordingly
    to: "on"
  action:
  - service: persistent_notification.create
    data:
      title: Point button press
      message: Point button was pressed.
```

### Webhook events

The events shown as [binary sensors](#binary-sensor) are sent to Home Assistant as webhooks with the `event_type` set to `point_webhook_received`. Below is an example of how to use such a webhook do note the `trigger.event.data.event.device_id` which translates to the id of the Point device that sent the event.

{% raw %}

```yaml
# Example configuration.yaml Automation entry
automation:
  alias: "Point button press (webhook)"
  trigger:
  - platform: event
    event_type: point_webhook_received
    event_data: {}
  condition:
    condition: template
    value_template: "{{ trigger.event.data.event.type == 'short_button_press' }}"
  action:
  - service: persistent_notification.create
    data:
      title: Point button press (webhook)
      message: "Button press on Point {{ trigger.event.data.event.device_id }}"
```

{% endraw %}

## Sensor

Each Point exposes the following sensors:

- **temperature**: Temperature in °C.
- **humidity**: Percentage of humidity in the air.
- **pressure**: Pressure in hPa.
- **sound_level**: Sound level in dBA
