---
title: System Bridge
description: How to integrate the System Bridge integration into Home Assistant.
ha_category:
  - Sensor
  - System monitor
  - Update
ha_release: 2021.6
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@timmo001'
ha_domain: system_bridge
ha_platforms:
  - binary_sensor
  - media_player
  - notify
  - sensor
  - update
ha_zeroconf: true
ha_integration_type: device
---

[System Bridge](https://system-bridge.timmo.dev) is an application that runs on your local machine to share system information via its API/WebSocket. You can also send commands to the device such as opening a URL or sending keyboard keypresses.

## Prerequisites

### Version

This integration requires System Bridge 4.0.2 and above. Any older version will not work.

### Token

You will need your token. For instructions on finding your token, follow the steps in the [System Bridge documentation](https://system-bridge.timmo.dev/docs/running).

{% include integrations/config_flow.md %}

## Binary sensors

This integration provides the following binary sensors:

| Name                  | Description                         |
| --------------------- | ----------------------------------- |
| Battery Is Charging   | Whether the battery is charging     |
| Camera In Use         | Whether the camera/webcam is in use |
| Pending Reboot        | Whether a reboot is pending         |
| New Version Available | Whether a new version is available  |

## Sensors

This integration provides the following sensors:

| Name                 | Description                                         |
| -------------------- | --------------------------------------------------- |
| Battery              | Battery level of the device                         |
| Boot Time            | Time the device was turned on                       |
| CPU Speed            | The current CPU speed                               |
| Displays Connected   | Number of displays connected                        |
| Display Resolution X | Display resolution (across)                         |
| Display Resolution Y | Display resolution (down)                           |
| Display Refresh Rate | Display refresh rate                                |
| Filesystem(s)        | Space used for each drive letter / filesystem mount |
| GPU Memory Free      | GPU memory free in GB                               |
| GPU Usage %          | GPU usage percentage                                |
| Kernel               | Version information of the Kernel                   |
| Latest Version       | System Bridge Latest Version                        |
| Load                 | System load percentage                              |
| Memory Free          | Memory (RAM) free in GB                             |
| Memory Used          | Memory (RAM) used in GB                             |
| Memory Used %        | Memory (RAM) % used                                 |
| Operating System     | Version information of the Operating System         |
| Processes            | Shows count of processes on the system              |
| Version              | System Bridge Version                               |

These sensors are also available, but are not enabled by default:

| Name                   | Description                        |
| ---------------------- | ---------------------------------- |
| CPU Temperature        | The current temperature of the CPU |
| CPU Voltage            | The current voltage of the CPU     |
| GPU Core Clock Speed   | GPU core clock speed in MHz        |
| GPU Memory Clock Speed | GPU memory clock speed in MHz      |
| GPU Fan Speed          | GPU fan speed percentage           |
| GPU Memory Used        | GPU memory used in GB              |
| GPU Memory Used %      | GPU memory used percentage         |
| GPU Power Usage        | GPU power usage                    |
| GPU Temperature        | The current temperature of the GPU |

## Media player

The integration also provides a media player. This allows you control the currently playing media on your device.

> This is currently only supported devices running System Bridge on Windows.

## Media source

This integration is available as a media source to use with the media browser integration. You can browse and view media from your system to media players such as your web browser and other supported media players.

## Update

The integration provides an update component, which will notify you when a new version of the app is available.

## Actions

### Notifications `notify.system_bridge_hostname`

You can send notifications to the device using the `notify` platform.

```yaml
action: notify.system_bridge_hostname
data:
  data:
    image: "https://brands.home-assistant.io/system_bridge/logo@2x.png"
    timeout: 30
    actions:
      - command: api
        data:
          endpoint: open
          method: POST
          body:
            url: "http://homeassistant.local:8123/lovelace/cameras"
        label: "Open Cameras"
    audio:
      source: "https://d3qhmae9zx9eb.cloudfront.net/home/amzn_sfx_doorbell_chime_02.mp3"
      volume: 80
  title: "Test Title"
  message: "This is a message"
```

#### Parameters

| Parameter | Description                                                  |
| --------- | ------------------------------------------------------------ |
| target    | The target to send the notification to. This can be ignored. |
| title     | The title of the notification.                               |
| message   | The message of the notification.                             |
| data      | The data to send to the device. See below for info.          |

##### Actions (`data` parameter)

This is an array of actions that can be sent to the device. These are buttons that show below the title, message and image.

| Parameter | Description                                                                                                                |
| --------- | -------------------------------------------------------------------------------------------------------------------------- |
| command   | The command to send to the device. For example `api` will send a request to the System Bridge API.                         |
| label     | The label of the button.                                                                                                   |
| data      | The data to send to the device. The available parameters for the `api` command are: `endpoint`, `method` `body`, `params`. |

Here is an example action that will open a URL in the device's browser:

```yaml
- command: api
  label: "Open Cameras"
  data:
    endpoint: open
    method: POST
    body:
      url: "http://homeassistant.local:8123/lovelace/cameras"
```

##### Audio (`data` parameter)

This is an object containing the `source` and `volume` (0-100). The source must be a URL to a playable audio file (an MP3 for example).

### Action `system_bridge.get_process_by_id`

Returns a process by its pid.

{% my developer_call_service service="system_bridge.get_process_by_id" title="Show action in your Home Assistant instance." %}

```yaml
action: system_bridge.get_process_by_id
data:
  bridge: "deviceid"
  id: 17752
```

This returns [Response Data](https://www.home-assistant.io/docs/scripts/perform-actions#use-templates-to-handle-response-data) like the following:

```yaml
id: 17752
name: steam.exe
cpu_usage: 0.9
created: 1698951361.6117153
memory_usage: 0.23782578821487121
path: C:\Program Files (x86)\Steam\steam.exe
status: running
username: hostname\user
working_directory: null
```

### Action `system_bridge.get_processes_by_name`

Returns a count and a list of processes matching the name provided.

{% my developer_call_service service="system_bridge.get_processes_by_name" title="Show action in your Home Assistant instance." %}

```yaml
action: system_bridge.get_processes_by_name
data:
  bridge: "deviceid"
  name: discord
```

This returns [Response Data](https://www.home-assistant.io/docs/scripts/perform-actions#use-templates-to-handle-response-data) like the following:

```yaml
count: 1
processes:
  - id: 11196
    name: Discord.exe
    cpu_usage: 0.3
    created: 1698951365.770648
    memory_usage: 0.07285296297215042
    path: C:\Users\user\AppData\Local\Discord\app\Discord.exe
    status: running
    username: hostname\user
    working_directory: null
```

### Action `system_bridge.open_path`

Open a URL or file on the server using the default application.

{% my developer_call_service service="system_bridge.open_path" title="Show action in your Home Assistant instance." %}

```yaml
action: system_bridge.open_path
data:
  bridge: "deviceid"
  path: "C:\\image.jpg"
```

This returns [Response Data](https://www.home-assistant.io/docs/scripts/perform-actions#use-templates-to-handle-response-data) like the following:

```yaml
id: abc123
type: OPENED
data:
  path: C:\image.jpg
message: Path opened
```

### Action `system_bridge.open_url`

Open a URL or file on the server using the default application.

{% my developer_call_service service="system_bridge.open_url" title="Show action in your Home Assistant instance." %}

```yaml
action: system_bridge.open_url
data:
  bridge: "deviceid"
  url: "https://home-assistant.io"
```

This returns [Response Data](https://www.home-assistant.io/docs/scripts/perform-actions#use-templates-to-handle-response-data) like the following:

```yaml
id: abc123
type: OPENED
data:
  url: https://home-assistant.io
message: URL opened
```

### Action`system_bridge.send_keypress`

Send a keypress to the server.

{% my developer_call_service service="system_bridge.send_keypress" title="Show action in your Home Assistant instance." %}

```yaml
action: system_bridge.send_keypress
data:
  bridge: "deviceid"
  key: "a"
```

This returns [Response Data](https://www.home-assistant.io/docs/scripts/perform-actions#use-templates-to-handle-response-data) like the following:

```yaml
id: abc123
type: KEYBOARD_KEY_PRESSED
data:
  key: a
message: Key pressed
```

### Action `system_bridge.send_text`

Sends text for the server to type.

{% my developer_call_service service="system_bridge.send_text" title="Show action in your Home Assistant instance." %}

```yaml
action: system_bridge.send_text
data:
  bridge: "deviceid"
  text: "Hello"
```

This returns [Response Data](https://www.home-assistant.io/docs/scripts/perform-actions#use-templates-to-handle-response-data) like the following:

```yaml
id: abc123
type: KEYBOARD_TEXT_SENT
data:
  text: Hello
message: Text entered
```

### Action `system_bridge.power_command`

Sends power command to the system.

Supported commands are:

- `hibernate`
- `lock`
- `logout`
- `restart`
- `shutdown`
- `sleep`

{% my developer_call_service service="system_bridge.power_command" title="Show action in your Home Assistant instance." %}

```yaml
action: system_bridge.power_command
data:
  bridge: "device"
  command: "sleep"
```

This returns [Response Data](https://www.home-assistant.io/docs/scripts/perform-actions#use-templates-to-handle-response-data) like the following:

```yaml
id: abc123
type: POWER_SLEEPING
data: {}
message: Sleeping
```
