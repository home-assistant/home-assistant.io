---
layout: page
title: "Minut Point"
description: "Instructions on how to integrate Minut Point into Home Assistant."
date: 2019-02-12
sidebar: true
comments: false
sharing: true
footer: true
logo: minut.svg
ha_category: 
  - Hub
  - Alarm
  - Binary Sensor
  - Sensor
featured: false
ha_release: "0.87"
ha_config_flow: true
ha_iot_class: "Cloud Polling"
ha_qa_scale: gold
redirect_from:
  - /components/binary_sensor.point/
  - /components/sensor.point/
---

There is currently support for the following device types within Home Assistant:
  - Alarm
  - Binary Sensor
  - Sensor

The Point component is the main component to integrate the [Minut Point](https://minut.com/). To connect Point, you will have to [sign up for a developer account](https://minut.com/community/developers/) and get a `client_id` and `client_secret` using the `callback url`  as `base_url` + `/api/minut`, e.g., `http://localhost:8123/api/minut`. The `client_id` and `client_secret` should be used as below.

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

Each Point exposes the following sensors:

- **temperature**: Temperature in °C.
- **humidity**: Percentage of humidity in the air.
- **pressure**: Pressure in hPa.
- **sound_level**: Sound level in dBa.

<p class='note'>
The Point is just active occasionally so the sensors are only updated every hour or so.
</p>

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

<p class='note'>
The events sent from the Point is also sent as a webhook back to Home Assistant with `event_type` as `point_webhook_received`, please consider the documentation for the [IFTT](/components/ifttt/) component on how to write automations for webhooks.
</p>

Each home configured in the Point application will show up as a separate alarm control panel platform that enables ability to control the Point home alarm system.

<p class="note">
The Point only supports Arm/Disarm so there is no difference between `Arm Home` and `Arm Away`.
</p>
