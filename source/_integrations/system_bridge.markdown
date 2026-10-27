---
description: How to integrate the System Bridge integration into Home Assistant.
ha_release: 2021.6
ha_domain: system_bridge
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

| Name                      | Description                                                       |
| ------------------------- | ----------------------------------------------------------------- |
| Battery                   | Battery level of the device                                       |
| Boot Time                 | Time the device was turned on                                     |
| CPU Speed                 | The current CPU speed                                             |
| Displays Connected        | Number of displays connected                                      |
| Display Resolution X      | Display resolution (across)                                       |
| Display Resolution Y      | Display resolution (down)                                         |
| Display Refresh Rate      | Display refresh rate                                              |
| Filesystem(s)             | Space used for each drive letter / filesystem mount               |
| GPU Memory Free           | GPU memory free in GB                                             |
| GPU Usage %               | GPU usage percentage                                              |
| Kernel                    | Version information of the Kernel                                 |
| Latest Version            | System Bridge Latest Version                                      |
| Load                      | System load percentage                                            |
| Load Average (1 min)      | Load average over 1 minute                                        |
| Power Usage               | Power usage in watts (if available)                               |
| Memory Free               | Memory (RAM) free in GB                                           |
| Memory Used               | Memory (RAM) used in GB                                           |
| Memory Used %             | Memory (RAM) % used                                               |
| Network Download Rate     | Total download rate System Bridge reports for the device          |
| Network Upload Rate       | Total upload rate System Bridge reports for the device            |
| Interface SSID            | The Wi-Fi network a wireless interface is connected to            |
| Interface Signal Strength | Wi-Fi signal strength of a wireless interface in dBm              |
| Operating System          | Version information of the Operating System                       |
| Processes                 | Shows count of processes on the system                            |
| Version                   | System Bridge Version                                             |

These sensors are also available, but are not enabled by default:

| Name                    | Description                                      |
| ----------------------- | ------------------------------------------------ |
| CPU Temperature         | The current temperature of the CPU               |
| CPU Voltage             | The current voltage of the CPU                   |
| GPU Core Clock Speed    | GPU core clock speed in MHz                      |
| GPU Memory Clock Speed  | GPU memory clock speed in MHz                    |
| GPU Fan Speed           | GPU fan speed percentage                         |
| GPU Memory Used         | GPU memory used in GB                            |
| GPU Memory Used %       | GPU memory used percentage                       |
| GPU Power Usage         | GPU power usage                                  |
| GPU Temperature         | The current temperature of the GPU               |
| Interface Download Rate | Download rate of each network interface          |
| Interface Upload Rate   | Upload rate of each network interface            |
| Interface Link Rate     | Wi-Fi link rate of a wireless interface in Mbps  |
| Load Average (5 min)    | Load average over 5 minutes                      |
| Load Average (15 min)   | Load average over 15 minutes                     |

Load average sensors are only added on devices that report a load average.

Network interface sensors are named after the interface, such as `eth0 download rate`. The download and upload rate sensors show Mbit/s by default, and you can change the unit in the entity settings. Loopback interfaces are left out, and sensors for an interface that appears later, such as a USB network adapter, are added when it first shows up. The Wi-Fi sensors are unknown while the interface isn't connected, and aren't available on macOS.

## Media player

The integration also provides a media player. This allows you control the currently playing media on your device.

> This is currently only supported devices running System Bridge on Windows.

## Media source

This integration is available as a media source to use with the media browser integration. You can browse and view media from your system to media players such as your web browser and other supported media players.

## Update

The integration provides an update component, which will notify you when a new version of the app is available.

## Notifiers

The **System Bridge** {% term integration %} adds a notify {% term entity %} for your configured device. To send a notification, you can use the `notify.send_message` {% term action %}. For more customizable notifications, you can use the [notify platform](#notifications-notifysystem_bridge_hostname) instead. For further instructions on using notifiers in automations, refer to the [getting started with automation page](/getting-started/automation/).

{% example %}
action: |
  action: notify.send_message
  target:
    entity_id: notify.my_device
  data:
    title: "Reminder"
    message: "Have you considered frogs?"
{% endexample %}

## Notifications

You can send notifications to the device using the `notify.system_bridge_hostname` notify entity.

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

### Parameters

- **target**: The target to send the notification to. This can be ignored.
- **title**: The title of the notification.
- **message**: The message of the notification.
- **data**: The data to send to the device. See below for more information.

#### Actions (`data` parameter)

This is a list of actions that can be sent to the device. These are buttons that show below the title, message, and image.

- **command**: The command to send to the device. For example, `api` sends a request to the System Bridge API.
- **label**: The label of the button.
- **data**: The data to send to the device. The available parameters for the `api` command are `endpoint`, `method`, `body`, and `params`.

Here is an example action that opens a URL in the device's browser:

```yaml
- command: api
  label: "Open Cameras"
  data:
    endpoint: open
    method: POST
    body:
      url: "http://homeassistant.local:8123/lovelace/cameras"
```

#### Audio (`data` parameter)

This is an object containing the `source` and `volume` (0-100). The source must be a URL to a playable audio file, such as an MP3.

{% include integrations/actions.md %}
