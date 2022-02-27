---
title: JVC Projectors
description: Instructions on how to integrate JVC Projectors into Home Assistant.
ha_category:
  - Media Player
ha_iot_class: Local Polling
ha_release: 2022
ha_domain: jvc_projectors
ha_codeowners:
  - "@iloveicedgreentea"
ha_config_flow: false
ha_ssdp: false
ha_platforms:
  - remote
---

The `jvc_projectors` platform allows you to control [JVC Projectors](https://www.us.jvc.com/projectors/) from Home Assistant. It is likely that your device is supported by the [jvc_projectors] platform.

Known supported devices:

- NZ7/NZ8/NZ9
- NX5/NX7/NX9

Untested but highly likely supported:

- Any JVC Projector with an ethernet jack

If your model is not on the list then give it a test, if everything works correctly then add it to the list by clicking on the **Edit** link at the bottom of this page.

<div class='note warning'>
You must have control4 integration turned off in your JVC settings.

If using an NZ model, you MUST set a network password before using this.

</div>

{% configuration_basic %}
host:
description: IP address of the device, e.g., 192.168.1.32
name:
friendly name to use as the entity name. Will appear as remote.{name}
password:
If NZ model, the password you configured
{% endconfiguration_basic %}

A few notes:

- This uses the [JVC Projectors Improved Python library](https://github.com/iloveicedgreentea/jvc_projector_improved) under the hood. All improvements should be made there.
- JVC's network implementation only allows a single connection at a time. Because of this, polling is not currently supported as the current implementation can cause cascading network errors. Queuing/Blocking to prevent connection errors is a work in progress.

## Features

All the features in my [JVC library](https://github.com/iloveicedgreentea/jvc_projector_improved) including:

- Power
- Picture Modes
- Laser power and dimming
- Low Latency meta-functions
- Optimal gaming and movie setting meta-functions
- and many others

## Useful Lovelace Configuration

I used this to re-create the JVC remote in HA. Add the YAML to your dashboard to get a grid which resembles most of the remote. Other functions can be used via remote.send_command. See the library readme for details.

Add this sensor to your configuration.yml. Replace the nz7 with the name of your entity. Restart Home Assistant.

```yaml
sensor:
  platform: template
  sensors:
    jvc_low_latency:
      value_template: >
        {% if is_state('remote.nz7', 'on') %}
          {% if states.remote.nz7.attributes.low_latency == false %}
            Off
          {% elif states.remote.nz7.attributes.low_latency == true %}
            On
          {% endif %}
        {% else %}
            Off
        {% endif %}
```

Add this to Lovelace after your restart:

```yaml
type: grid
cards:
  - type: button
    name: Power
    show_icon: false
    entity: remote.nz7
    show_state: true
    show_name: true
    icon: mdi:power
  - type: button
    tap_action:
      action: call-service
      service: jvc_projectors.info
      service_data: {}
      target:
        entity_id: remote.nz7
    show_icon: false
    name: Info
    hold_action:
      action: none
  - type: button
    tap_action:
      action: call-service
      service: remote.send_command
      service_data:
        command: menu,up
      target:
        entity_id: remote.nz7
    show_name: false
    show_icon: true
    icon: mdi:arrow-up
    hold_action:
      action: none
  - type: button
    tap_action:
      action: call-service
      service: remote.send_command
      service_data:
        command: menu,menu
      target:
        entity_id: remote.nz7
    show_name: true
    show_icon: false
    name: Menu
    hold_action:
      action: none
  - type: button
    tap_action:
      action: toggle
    show_icon: false
  - type: button
    tap_action:
      action: none
    show_icon: false
    entity: sensor.jvc_low_latency
    show_name: true
    show_state: true
    name: Low Latency
    hold_action:
      action: none
  - type: button
    tap_action:
      action: call-service
      service: remote.send_command
      service_data:
        command: menu,left
      target:
        entity_id: remote.nz7
    show_name: false
    icon: mdi:arrow-left
  - type: button
    tap_action:
      action: call-service
      service: remote.send_command
      service_data:
        command: menu, ok
      target:
        entity_id: remote.nz7
    name: OK
    show_icon: false
  - type: button
    tap_action:
      action: call-service
      service: remote.send_command
      service_data:
        command: menu, right
      target:
        entity_id: remote.nz7
    show_name: false
    icon: mdi:arrow-right
  - type: button
    tap_action:
      action: toggle
    show_icon: false
    show_name: false
  - type: button
    tap_action:
      action: toggle
    show_icon: false
  - type: button
    tap_action:
      action: call-service
      service: remote.send_command
      service_data:
        command: menu,back
      target:
        entity_id: remote.nz7
    name: Back
    show_icon: false
  - type: button
    tap_action:
      action: call-service
      service: remote.send_command
      service_data:
        command: menu,down
      target:
        entity_id: remote.nz7
    show_name: false
    icon: mdi:arrow-down
  - type: button
    tap_action:
      action: toggle
    show_icon: false
  - type: button
    tap_action:
      action: toggle
    show_icon: false
  - type: button
    tap_action:
      action: call-service
      service: jvc_projectors.gaming_mode_hdr
      service_data: {}
      target:
        entity_id: remote.nz7
    show_icon: false
    show_name: true
    hold_action:
      action: none
    name: Game HDR
  - type: button
    tap_action:
      action: call-service
      service: jvc_projectors.gaming_mode_sdr
      service_data: {}
      target:
        entity_id: remote.nz7
    show_icon: false
    name: Game SDR
  - type: button
    tap_action:
      action: call-service
      service: jvc_projectors.hdr_picture_mode
      service_data: {}
      target:
        entity_id: remote.nz7
    show_icon: false
    name: Film HDR
  - type: button
    tap_action:
      action: call-service
      service: jvc_projectors.sdr_picture_mode
      service_data: {}
      target:
        entity_id: remote.nz7
    show_icon: false
    name: Film SDR
  - type: button
    tap_action:
      action: toggle
    show_icon: false
columns: 5
```

#### Service `remote.get_command`

Send a supported command to the projector. Refer to the library for supported commands. _A list of commands can be provided instead of a single command at a time. This has major performance improvements as it reuses the connection._

```yaml
service: remote.send_command
data:
  command:
    - "menu,menu"
    - "menu,left"
    - "menu,menu"
target:
  entity_id: remote.nz7
```

| Service data attribute | Optional | Description                                                 |
| ---------------------- | -------- | ----------------------------------------------------------- |
| `entity_id`            | no       | Name of entity to send command to. For example `remote.nz7` |
| `command`              | no       | Command to send to device, e.g., `menu,left`                |

#### Service `remote.turn_on`

Turn on the projector

| Service data attribute | Optional | Description                                                 |
| ---------------------- | -------- | ----------------------------------------------------------- |
| `entity_id`            | no       | Name of entity to send command to. For example `remote.nz7` |

#### Service `remote.turn_off`

Turn off the projector

| Service data attribute | Optional | Description                                                 |
| ---------------------- | -------- | ----------------------------------------------------------- |
| `entity_id`            | no       | Name of entity to send command to. For example `remote.nz7` |

#### Service `jvc_projectors.gaming_mode_hdr`

Set optimal settings for Gaming when an HDR signal is present.

| Service data attribute | Optional | Description                                                 |
| ---------------------- | -------- | ----------------------------------------------------------- |
| `entity_id`            | no       | Name of entity to send command to. For example `remote.nz7` |

#### Service `jvc_projectors.gaming_mode_sdr`

Set optimal settings for Gaming when an SDR signal is present.

| Service data attribute | Optional | Description                                                 |
| ---------------------- | -------- | ----------------------------------------------------------- |
| `entity_id`            | no       | Name of entity to send command to. For example `remote.nz7` |

#### Service `jvc_projectors.hdr_picture_mode`

Set optimal settings for Film when an HDR signal is present.

| Service data attribute | Optional | Description                                                 |
| ---------------------- | -------- | ----------------------------------------------------------- |
| `entity_id`            | no       | Name of entity to send command to. For example `remote.nz7` |

#### Service `jvc_projectors.sdr_picture_mode`

Set optimal settings for Film when an SDR signal is present.

| Service data attribute | Optional | Description                                                 |
| ---------------------- | -------- | ----------------------------------------------------------- |
| `entity_id`            | no       | Name of entity to send command to. For example `remote.nz7` |

[jvc projectors]: /integrations/jvc_projectors
