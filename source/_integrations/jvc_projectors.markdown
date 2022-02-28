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
ha_platforms:
  - remote
---

The `jvc_projectors` platform allows you to control [JVC Projectors](https://www.us.jvc.com/projectors/) from Home Assistant. It is likely that your device is supported by the [jvc_projectors] platform.

Known supported devices

- NZ7/NZ8/NZ9
- NX5/NX7/NX9

Untested but highly likely supported

- Any JVC Projector with an ethernet jack

If your model is not on the list then give it a test, if everything works correctly then add it to the list by clicking on the **Edit** link at the bottom of this page.

<div class='note warning'>
You must have control4 integration turned off in your JVC settings.

If using an NZ model, you MUST set a network password before using this.

</div>

{% configuration_basic %}
host: description: IP address of the device, e.g., 192.168.1.32
name: friendly name to use as the entity name. Will appear as remote.{name}
password: If NZ model, the password you configured
{% endconfiguration_basic %}

#### Service `remote.get_command`

Send a supported command to the projector. Refer to the library for supported commands. _A list of commands can be provided instead of a single command at a time. This has major performance improvements as it reuses the connection._
{% raw %}

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

{% endraw %}
| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------------------------------------------------------- |
| `entity_id` | no | Name of entity to send command to. For example `remote.nz7` |
| `command` | no | Command to send to device, e.g., `menu,left` |

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
