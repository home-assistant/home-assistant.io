---
title: Logitech Harmony Hub
description: Instructions on how to integrate Harmony Hub remotes into Home Assistant.
ha_category:
  - Remote
ha_iot_class: Local Push
ha_release: 0.34
ha_config_flow: true
ha_codeowners:
  - '@ehendrix23'
  - '@bramkragten'
  - '@bdraco'
  - '@mkeesey'
ha_domain: harmony
ha_ssdp: true
ha_platforms:
  - remote
  - switch
---

The `harmony` remote platform allows you to control the state of your [Harmony Hub Device](https://www.logitech.com/en-us/product/harmony-hub).

Supported units:

- Harmony Hub
- Harmony Companion
- Harmony Pro
- Harmony Elite
- Harmony Pro 2400

{% include integrations/config_flow.md %}

Once the Logitech Harmony Hub has been configured, the default activity and duration in seconds between sending commands to a device can be adjusted in the settings via **Configuration** >> **Integrations** >> **Your Logitech Harmony Hub**

### Configuration file

Upon startup one file will be written to your Home Assistant configuration directory per device in the following format: `harmony_UNIQUE_ID.conf`. The file will contain:

- List of all programmed activity names and ID numbers
- List of all programmed device names and ID numbers
- List of all available commands per programmed device

This file will be overwritten whenever the Harmony HUB has a new configuration, there is no need to restart Home Assistant.

### Service `remote.turn_off`

Turn off all devices that were switched on from the start of the current activity.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |       no | Entity ID to target.

### Service `remote.turn_on`

Start an activity. Will start the default `activity` from `configuration.yaml` if no activity is specified.  The specified activity can either be the activity name or the activity ID from the configuration file written to your [Home Assistant configuration directory](/docs/configuration/).

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |       no | Entity ID to target.
| `activity`             |      yes | Activity ID or Activity Name to start.

##### Example

In the file 'harmony_REMOTENAME.conf' you can find the available activities, for example:

```text
{
    "Activities": {
        "-1": "PowerOff",
        "20995306": "Watch TV",
        "20995307": "Play Games",
        "20995308": "Listen Music"
    }
}
```

Using the activity name 'Watch TV', you can call a service via automation to switch this activity on:

```yaml
action:
  - service: remote.turn_on
    target:
      entity_id: remote.bed_room_hub
    data:
       activity: "Watch TV"
```

### Service `remote.send_command`

Send a single command or a set of commands to one device, device ID and available commands are written to the configuration file at startup. You can optionally specify the number of times you wish to repeat the command(s) and delay you want between repeated command(s).

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |       no | Entity ID to target.
| `device`               |       no | Device ID or Device Name to send the command to.
| `command`              |       no | A single command or a list of commands to send.
| `num_repeats`          |      yes | The number of times to repeat the command(s).
| `delay_secs`           |      yes | The number of seconds between sending each command.

In the file 'harmony_REMOTENAME.conf' you can find the available devices and commands, for example:

```text
{
    "Devices": {
        "TV": {
            "commands": [
                "PowerOff",
                "PowerOn"
            ],
            "id": "327297814"
        },
        "Receiver": {
            "commands": [
                "PowerOff",
                "PowerOn",
                "VolumeUp",
                "VolumeDown",
                "Mute"
            ],
            "id": "428297615"
        }
    }
}
```

A typical service call for sending several button presses looks like this:

```yaml
service: remote.send_command
target:
  entity_id: remote.tv_room
data:
  command:
    - PowerOn
    - Mute
  device: Receiver
  delay_secs: 0.6
```
OR
```yaml
service: remote.send_command
target:
  entity_id: remote.tv_room
data:
  command:
    - PowerOn
    - Mute
  device: 428297615
  delay_secs: 0.6
```

### Service `harmony.change_channel`

Sends the change channel command to the Harmony HUB

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |       no | Entity ID to target.
| `channel`              |       no | Channel number to change to

A typical service call for changing the channel would be::

```yaml
service: harmony.change_channel
target:
  entity_id: remote.tv_room
data:
  channel: 200
```

### Service `harmony.sync`

Force synchronization between the Harmony device and the Harmony cloud.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |       no | Entity ID to target.

### Examples

Template sensors can be utilized to display current activity in the frontend.

{% raw %}

```yaml
sensor:
  - platform: template
    sensors:
      family_room:
        value_template: '{{ state_attr("remote.family_room", "current_activity") }}'
        friendly_name: "Family Room"
      bedroom:
        value_template: '{{ state_attr("remote.bedroom", "current_activity") }}'
        friendly_name: "bedroom"
```

{% endraw %}

The example below shows how to control an `input_boolean` switch using the Harmony remote's current activity. The switch will turn on when the remote's state changes and the Kodi activity is started and off when the remote's state changes and the current activity is "PowerOff".

{% raw %}

```yaml
automation:
  - alias: "Watch TV started from harmony hub"
    trigger:
      platform: state
      entity_id: remote.family_room
    condition:
      condition: template
      value_template: '{{ trigger.to_state.attributes.current_activity == "Kodi" }}'
    action:
      service: input_boolean.turn_on
      target:
        entity_id: input_boolean.notify
  - alias: "PowerOff started from harmony hub"
    trigger:
      platform: state
      entity_id: remote.family_room
    condition:
      condition: template
      value_template: '{{ trigger.to_state.attributes.current_activity == "PowerOff" }}'
    action:
      service: input_boolean.turn_off
      target:
        entity_id: input_boolean.notify
```

{% endraw %}
