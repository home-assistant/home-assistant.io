---
title: Minut Point
description: Instructions on how to integrate Minut Point into Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
  - Hub
  - Sensor
ha_release: 0.83
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fredrike'
ha_domain: point
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - sensor
ha_integration_type: integration
related:
  - docs: /integrations/application_credentials/
    title: Application credentials
---

The Point hub enables integration with the [Minut Point](https://minut.com/).


## Prerequisites

Before adding the integration to Home Assistant, you need to get Minut Point application credentials.

1. Navigate to the [API-client | Minut](https://web.minut.com/settings/api-clients) dashboard and **Create client**:

   - Enter a **Name** for your client (this is just an identifier).
   - Enter `https://my.home-assistant.io/redirect/oauth` in the **Redirect URI** field.
2. Get the **ClientID** and **ClientSecret** for the new client and store them in a safe place. You need them to complete the integration setup in Home Assistant.

<div class='note'>

If you are a Kickstarter backer, you need to send an email to hello@minut.com to retrieve the **ClientID** and **ClientSecret**. Don't forget to mention that the **Redirect URI** should be `https://my.home-assistant.io/redirect/oauth`.

</div>

{% include integrations/config_flow.md %}

## Device types

The integration supports the following device types within Home Assistant:
  - [Alarm](#alarm)
  - [Binary sensor](#binary-sensor)
  - [Sensor](#sensor)

{% note %}
The Point is just active occasionally so the [sensors](#sensor) are only updated every hour or so. The [binary sensors](#binary-sensor) are however updated via [Cloud Push](/blog/2016/02/12/classifying-the-internet-of-things/#cloud-pushing-new-state), making the changes close to instant.
{% endnote %}

## Alarm

Each home configured in the Point mobile application will show up as a separate alarm control panel. The panels allow **arming** and **disarming** of the Point home alarm system.

{% note %}
The Point only supports a Arm/Disarm action, so it is only `Arm Away` that is implemented.
{% endnote %}

## Binary sensor

Each Point exposes the following binary sensors:

- **alarm**: `On` means alarm sound was recognized, `Off` means normal
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

{% note %}
The binary sensors **button_press**, **sound** and **tamper** are switched `On` for a brief moment and are then switched back to `Off`.
{% endnote %}

### Automation example

The following example show how to implement an automation for the **button_press** binary sensor.

```yaml
# Example configuration.yaml Automation entry
automation:
  alias: "Point button press"
  triggers:
  - trigger: state
    entity_id: binary_sensor.point_button_press  # Change this accordingly
    to: "on"
  actions:
  - action: persistent_notification.create
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
  triggers:
  - trigger: event
    event_type: point_webhook_received
    event_data: {}
  conditions:
    - condition: template
      value_template: "{{ trigger.event.data.event.type == 'short_button_press' }}"
  actions:
  - action: persistent_notification.create
    data:
      title: Point button press (webhook)
      message: "Button press on Point {{ trigger.event.data.event.device_id }}"
```

{% endraw %}

## Sensor

Each Point exposes the following sensors:

- **temperature**: Temperature in °C.
- **humidity**: Percentage of humidity in the air.
- **sound_level**: Sound level in dBA
