---
title: Ambiclimate
description: Instructions on how to integrate Ambiclimate A/C controller into Home Assistant.
ha_category: Climate
ha_release: 0.93
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@danielhiversen'
ha_domain: ambiclimate
ha_platforms:
  - climate
---

Integrates [Ambiclimate](https://ambiclimate.com/) Air Conditioning controller into Home Assistant.

You must create an application [here](https://api.ambiclimate.com/clients) to obtain a `client_id` and `client_secret`.
The `callback url` should be configured as your Home Assistant external URL + `/api/ambiclimate`, e.g.,  `https://example.com/api/ambiclimate`.

To enable this platform, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ambiclimate:
  client_id: CLIENT_ID
  client_secret: CLIENT_SECRET
```

Restart Home Assistant. Then, go to the frontend and authorize Ambiclimate.

{% configuration %}
client_id:
  description: Your Ambiclimate API client ID.
  required: true
  type: string
client_secret:
  description: Your Ambiclimate API client secret.
  required: true
  type: string
{% endconfiguration %}

Note that you have to select manual mode from the Ambiclimate app to be able to control the A/C from Home Assistant.

{% include integrations/config_flow.md %}

## Component services

Enable comfort mode on your AC:

`climate.set_comfort_mode`

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `Name` | yes | String with device name.

Send feedback for comfort mode:

`climate.send_comfort_feedback`

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `Name` | yes | String with device name.
| `value` | yes | Send any of the following comfort values: too_hot, too_warm, bit_warm, comfortable, bit_cold, too_cold, freezing

Enable temperature mode on your AC:

`climate.set_temperature_mode`

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `Name` | yes | String with device name.
| `value` | yes | Target value in celsius
