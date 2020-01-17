---
title: StreamLabs
description: Instructions on how to integrate Streamlabs Water devices with Home Assistant.
logo: streamlabswater.png
ha_category:
  - Binary Sensor
  - Sensor
ha_release: '0.95'
ha_iot_class: Cloud Polling
---

The `Streamlabs Water` integration platform is used to interact with [Streamlabs water monitoring devices](https://www.streamlabswater.com/) in order to retrieve usage information and manage the away mode of the device. The [Streamlabs Water API](https://developer.streamlabswater.com) is used to retrieve daily, monthly, and yearly water usage along with the current away mode.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Sensor

In preparation for using this integration you will need to request an API key following the instructions in the [Streamlabs API Getting Started Section](https://developer.streamlabswater.com/docs/getting-started.html). Be sure to request an API key and not an OAuth token.

## Configuration

Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
streamlabswater:
  api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: Your api_key for the Streamlabs API.
  required: true
  type: string
location_id:
  description: A specific monitor to use if you have multiple. By default the first found will be used.
  required: false
  type: string
{% endconfiguration %}

## Service `set_away_mode`

You can use the service `streamlabswater.set_away_mode` to set the mode to `home` or `away`. The away mode will only be changed for the configured location.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `away_mode` | no | String, must be `away` or `home`.
