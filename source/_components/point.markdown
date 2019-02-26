---
layout: page
title: "Minut Point"
description: "Instructions on how to integrate Minut Point into Home Assistant."
date: 2018-11-19
sidebar: true
comments: false
sharing: true
footer: true
logo: minut.svg
ha_category:
  - Hub
  - Binary Sensor
  - Sensor
featured: false
ha_release: "0.83"
ha_iot_class: "Cloud Polling"
ha_qa_scale: silver
redirect_from:
  - /components/binary_sensor.point/
  - /components/sensor.point/
---

The Point component is the main component to integrate the [Minut Point](https://minut.com/). To connect Point, you will have to [sign up for a developer account](https://minut.com/community/developers/) and get a `client_id` and `client_secret` using the `callback url`  as `base_url` + `/api/minut`, e.g., `http://localhost:8123/api/minut`. The `client_id` and `client_secret` should be used as below.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Sensor](#sensor)

Once Home Assistant is started, a configurator will pop up asking you to Authenticate your Point account via a link when you follow the link and have clicked on **Accept** you will be redirected to the `callback url` and the Point integration will be automatically configured and you can go back to the original dialog and press **Submit**.

### {% linkable_title Configuration %}

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

<p class='note'>
The Point is just active occasionally so the sensors are only updated every hour or so.
The events sent from the Point is sent as a webhook back to Home Assistant with `event_type` as `point_webhook_received`, please consider the documentation for the [IFTT](/components/ifttt/) component on how to write automations for webhooks.
</p>

## {% linkable_title Binary Sensor %}

Each Point exposes the following binary sensors:

- **battery**: `On` means low, `Off` means normal
- **button_press**: `On` means the button was pressed, `Off` means normal
- **cold**: `On` means cold, `Off` means normal
- **connectivity**: `On` means connected, `Off` means disconnected
- **dry**: `On` means too dry, `Off` means normal
- **heat**: `On` means hot, `Off` means normal
- **light**: `On` means light detected, `Off` means no light
- **moisture**: `On` means moisture detected (wet), `Off` means no moisture (dry)
- **motion**: `On` means motion detected, `Off` means no motion (clear)
- **sound**: `On` means sound detected, `Off` means no sound (clear)
- **tamper**: `On` means the point was removed or attached

For installation instructions, see [the Point component](#configuration).

<p class='note'>
The events sent from the Point is also sent as a webhook back to Home Assistant with `event_type` as `point_webhook_received`, please consider the documentation for the [IFTT](/components/ifttt/) component on how to write automations for webhooks.
</p>

## {% linkable_title Sensor %}

Each Point exposes the following sensors:

- **temperature**: Temperature in °C.
- **humidity**: Percentage of humidity in the air.
- **pressure**: Pressure in hPa.
- **sound_level**: Sound level in dBa.

For installation instructions, see [the Point component](#configuration).

<p class='note'>
The Point is just active occasionally so the sensors are only updated every hour or so.
</p>
