---
title: Garadget
description: Instructions on how to integrate Garadget covers within Home Assistant.
logo: garadget.png
ha_category:
  - Cover
ha_release: 0.32
ha_iot_class: Cloud Polling
ha_domain: garadget
---

The `garadget` cover platform lets you control [Garadget](https://www.garadget.com/) garage door futurizers through Home Assistant.

## Configuration

To enable Garadget Covers in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry

 cover:
  - platform: garadget
    covers:
      first_garage:
        device: 190028001947343412342341
        access_token: 14216585ff818f2b01396c44142342f1234
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
  covers:
      keys:
        device:
          description: This is the device id from your Garadget portal.
          required: true
          type: string
        access_token:
          description: A generated `access_token` from your Garadget account.
          required: true
          type: string
        name:
          description: me to use in the frontend, will use name configured in Garadget otherwise.
          required: false
          default: Garadget
          type: string
{% endconfiguration %}

The **access_token** must be used.

For that you'll need:

Access token: a secret string your app receives to use instead of the username/password after you successfully log in. 
The simplest way is to login into the web interface and use the document inspector to pick at the background requests it sends:

- Log into your garadget from the web using chrome: https://www.garadget.com/my/login.php

- In Google Chrome: click anywhere in blank space of the page and select “Inspect” from the context menu

- Navigate to the Network Tab

- Filter by text: setState and resource type XHR (it wont show until you open or close the door(s)

- Use web interface to open and close the door

- See the requests appearing in the list, you can find the details under Headers tab, grab you token and use it within your configuration.

<p class='img'>
  <img src='https://community.garadget.com/uploads/default/original/1X/9f415b3f2ec5d9eb9b186df272c61098f2185f4f.gif />
</p>

## Example

<p class='img'>
  <img src='{{site_root}}/images/integrations/garadget/cover_garadget_details.png' />
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

sensor:
  - platform: template
    sensors:
      garage_door_status:
        friendly_name: 'State of the door'
        value_template: "{{ states('cover.garage_door') }}"
      garage_door_time_in_state:
        friendly_name: 'Since'
        value_template: "{{ state_attr('cover.garage_door', 'time_in_state') }}"
      garage_door_wifi_signal_strength:
        friendly_name: 'WiFi strength'
        value_template: "{{ state_attr('cover.garage_door', 'wifi_signal_strength') }}"
        unit_of_measurement: 'dB'

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

Some of the Garadget sensors can create a lot of clutter in the logbook.  Use this section of code in your `configuration.yaml` to exclude those entries.

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
cover:
  - platform: mqtt
    name: "Garage Door"
    command_topic: "garadget/device_name/command"
    state_topic: "garadget/device_name/status"
    payload_open: "open"
    payload_close: "close"
```
