---
title: Garadget
description: Instructions on how to integrate Garadget covers within Home Assistant.
ha_category:
  - Cover
ha_release: 0.32
ha_iot_class: Cloud Polling
ha_domain: garadget
ha_platforms:
  - cover
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `garadget` cover {% term integration %} lets you control [Garadget](https://www.garadget.com/) garage door futurizers through Home Assistant.

## Configuration

To enable Garadget Covers in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry

 cover:
  - platform: garadget
    covers:
      first_garage:
        device: 190028001947343412342341
        username: YOUR_USERNAME
        password: YOUR_PASSWORD
        name: first_garage
      second_garage:
        device: 4c003f001151353432134214
        access_token: df4cc785ff818f2b01396c44142342fccdef
        name: second_garage

```

{% configuration %}
covers:
  description: List of your doors.
  required: true
  type: list
  keys:
    device:
      description: This is the device id from your Garadget portal. It can be found in the Settings section of the Garadget website or mobile application.
      required: true
      type: string
    username:
      description: Your Garadget account username. Use with `password` to obtain the `access_token` automatically.
      required: false
      type: string
    password:
      description: Your Garadget account password. Use with `username` to obtain the `access_token` automatically.
      required: false
      type: string
    access_token:
      description: A generated `access_token` from your Garadget account. To obtain an `access_token`, use the network tab of the developer tools for your web browser while logged into the Garadget website. When supplied, the `username` and `password` values are not required.
      required: false
      type: string
    name:
      description: Name to use in the frontend, will use name configured in Garadget otherwise.
      required: false
      default: Garadget
      type: string
{% endconfiguration %}

## Example

<p class='img'>
  <img src='/images/integrations/garadget/cover_garadget_details.png' />
</p>

{% raw %}

```yaml
# Related configuration.yaml entry
cover:
  - platform: garadget
    covers:
      garadget:
        device: 190028001947343412342341
        access_token: !secret garadget_access_token
        name: Garage door

template:
  - sensor:
    - name: Garage door state
      state: "{{ states('cover.garage_door') }}"
    - name: Garage door state since
      state: "{{ state_attr('cover.garage_door', 'time_in_state') }}"
    - name: Garage door WiFi signal strength
      state: "{{ state_attr('cover.garage_door', 'wifi_signal_strength') }}"
      unit_of_measurement: "dB"

group:
  garage_door:
    name: Garage door
    entities:
      - cover.garage_door
      - sensor.garage_door_status
      - sensor.garage_door_time_in_state
      - sensor.garage_door_wifi_signal_strength

customize:
  sensor.garage_door_time_in_state:
    icon: mdi:timer-sand
  sensor.garage_door_wifi_signal_strength:
    icon: mdi:wifi
```

{% endraw %}

Some of the Garadget sensors can create a lot of clutter in the logbook.  Use this section of code in your{% term "`configuration.yaml`" %} to exclude those entries.

```yaml
logbook:
  exclude:
    entities:
      - sensor.garage_door_time_in_state
      - sensor.garage_door_wifi_signal_strength
```

As of firmware release 1.17 the garadget device has native support for MQTT. The options allow the end-user to configure the device in the following ways 'cloud only', 'cloud and MQTT' or 'MQTT only'.

For configuration of the garadget as a MQTT cover:

```yaml
mqtt:
  cover:
    - name: "Garage Door"
      command_topic: "garadget/device_name/command"
      state_topic: "garadget/device_name/status"
      payload_open: "open"
      payload_close: "close"
      payload_stop: "stop"
      value_template: "{{ value_json.status }}"
  sensor:
    - name: "Garage Door Since"
      state_topic: "garadget/device_name/status"
      value_template: '{{ value_json.time }}'

    - name: "Large Garage Door Brightness"
      state_topic: "garadget/device_name/status"
      unit_of_measurement: '%'
      value_template: '{{ value_json.bright }}'

```

Replace device_name with the name of the device provided when configuring garadget.
