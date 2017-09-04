---
layout: page
title: "Xiaomi Mi Robot Vacuum"
description: "Instructions how to integrate your Xiaomi Mi Robot Vacuum within Home Assistant."
date: 2017-05-05 18:11
sidebar: true
comments: false
sharing: true
footer: true
logo: xiaomi.png
ha_category: Vacuum
ha_release: 0.51
ha_iot_class: "Local Polling"
---

The `xiaomi` vacuum platform allows you to control the state of your [Xiaomi Mi Robot Vacuum](http://www.mi.com/roomrobot/).

Current supported features are `turn_on`, `pause`, `stop`, `return_to_home`, `turn_off` (stops goes to dock), `locate`, `clean_spot`, `set_fanspeed` and even remote control your robot.

Please follow the instructions on [Retrieving the Access Token](/components/xiaomi/#retrieving-the-access-token) to get the API token to use in the `configuration.yaml` file.

To add a vacuum to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
vacuum:
  - platform: xiaomi
    host: 192.168.1.2
    token: YOUR_TOKEN
```

Configuration variables:

- **host** (*Required*): The IP of your robot.
- **token** (*Required*): The API token of your robot.
- **name** (*Optional*): The name of your robot.

### {% linkable_title Platform services %}

In addition to all [`vacuum` component services](/components/vacuum#component-services) (`turn_on`, `turn_off`, `start_pause`, `stop`, `return_to_home`, `locate`, `set_fanspeed` and `send_command`), the `xiaomi` platform introduces specific services to access the remote control mode of the botvac.

These are: `xiaomi_remote_control_start`, `xiaomi_remote_control_stop`, `xiaomi_remote_control_move` and `xiaomi_remote_control_move_step`.

#### {% linkable_title Service `vacuum/xiaomi_remote_control_start` %}

Start the remote control mode of the vacuum cleaner. You can then move it with `remote_control_move`, when done call `remote_control_stop`.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific botvac. Else targets all.        |

#### {% linkable_title Service `vacuum/xiaomi_remote_control_stop` %}

Exit the remote control mode of the vacuum cleaner.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific botvac. Else targets all.        |

#### {% linkable_title Service `vacuum/xiaomi_remote_control_move` %}

Remote control the vacuum cleaner, make sure you first set it in remote control mode with `remote_control_start`.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific botvac. Else targets all.        |
| `velocity`                |       no | Speed, between -0.29 and 0.29.                        |
| `rotation`                |       no | Rotation, between -179 degrees and 179 degrees.       |
| `duration`                |       no | Parameter affecting the duration of the movement.     |


#### {% linkable_title Service `vacuum/xiaomi_remote_control_move_step` %}

Use this call to enter the remote control mode, make one move, and stop and exit the remote control mode.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific botvac. Else targets all.        |
| `velocity`                |       no | Speed, between -0.29 and 0.29.                        |
| `rotation`                |       no | Rotation, between -179 degrees and 179 degrees.       |
| `duration`                |       no | Parameter affecting the duration of the movement.     |
