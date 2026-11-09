---
description: How to integrate the System Bridge integration into Home Assistant.
ha_release: 2021.6
ha_domain: system_bridge
---

[System Bridge](https://system-bridge.timmo.dev) is an application that runs on your local machine to share system information via its API/WebSocket. You can also send commands to the device such as opening a URL or sending keyboard keypresses.

## Prerequisites

### Version

This integration requires System Bridge 5.0.0 and above. Any older version will not work.

### Token

You will need your token. For instructions on finding your token, follow the steps in the [System Bridge documentation](https://system-bridge.timmo.dev/docs/running).

{% include integrations/config_flow.md %}

## Binary sensors

This integration provides the following binary sensors:

| Name                  | Description                          |
| --------------------- | ------------------------------------ |
| AC Power              | Whether the device is on AC power    |
| Battery Is Charging   | Whether the battery is charging      |
| Camera In Use         | Whether the camera/webcam is in use  |
| Locked                | Whether the user's session is locked |
| Pending Reboot        | Whether a reboot is pending          |
| New Version Available | Whether a new version is available   |

## Sensors

This integration provides the following sensors:

| Name                      | Description                                                       |
| ------------------------- | ----------------------------------------------------------------- |
| Battery                   | Battery level of the device                                       |
| Battery State             | Charging state of the battery                                     |
| Boot Time                 | Time the device was turned on                                     |
| CPU Speed                 | The current CPU speed                                             |
| Disk Read Rate            | Total read rate across all disks                                  |
| Disk Write Rate           | Total write rate across all disks                                 |
| Displays Connected        | Number of displays connected                                      |
| Display Resolution X      | Display resolution (across)                                       |
| Display Resolution Y      | Display resolution (down)                                         |
| Display Refresh Rate      | Display refresh rate                                              |
| Filesystem(s)             | Space used for each drive letter / filesystem mount               |
| GPU Memory Free           | GPU memory free in GB                                             |
| GPU Usage %               | GPU usage percentage                                              |
| Idle Time                 | Time since the user's last keyboard or mouse input                |
| Kernel                    | Version information of the Kernel                                 |
| Latest Version            | System Bridge Latest Version                                      |
| Load                      | System load percentage                                            |
| Load Average (1 min)      | Load average over 1 minute                                        |
| Power Usage               | Power usage in watts (if available)                               |
| Memory Free               | Memory (RAM) free in GB                                           |
| Memory Used               | Memory (RAM) used in GB                                           |
| Memory Usage              | Memory (RAM) % used                                               |
| Network Download Rate     | Total download rate System Bridge reports for the device          |
| Network Upload Rate       | Total upload rate System Bridge reports for the device            |
| Interface SSID            | The Wi-Fi network a wireless interface is connected to            |
| Interface Signal Strength | Wi-Fi signal strength of a wireless interface in dBm              |
| Operating System          | Version information of the Operating System                       |
| Processes                 | Shows count of processes on the system                            |
| Swap Usage                | Swap % used                                                       |
| Version                   | System Bridge Version                                             |

These sensors are also available, but are not enabled by default:

| Name                     | Description                                     |
| ------------------------ | ----------------------------------------------- |
| Battery Power            | Battery power draw in watts                     |
| Battery Voltage          | Battery voltage in volts                        |
| CPU Temperature          | The current temperature of the CPU              |
| CPU Voltage              | The current voltage of the CPU                  |
| Per-disk Read Rate       | Read rate of each disk                          |
| Per-disk Write Rate      | Write rate of each disk                         |
| GPU Core Clock Speed     | GPU core clock speed in MHz                     |
| GPU Decoder Usage        | GPU video decoder usage percentage              |
| GPU Encoder Usage        | GPU video encoder usage percentage              |
| GPU Memory Clock Speed   | GPU memory clock speed in MHz                   |
| GPU Fan Speed            | GPU fan speed in RPM                            |
| GPU Fan Speed Percentage | GPU fan speed percentage                        |
| GPU Memory Total         | Total GPU memory                                |
| GPU Memory Used          | GPU memory used in GB                           |
| GPU Memory Usage         | GPU memory used percentage                      |
| GPU Performance State    | GPU performance state, such as `P0`             |
| GPU Power Limit          | GPU power limit in watts                        |
| GPU Power Usage          | GPU power usage                                 |
| GPU Temperature          | The current temperature of the GPU              |
| Interface Download Rate  | Download rate of each network interface         |
| Interface Upload Rate    | Upload rate of each network interface           |
| Interface Link Rate      | Wi-Fi link rate of a wireless interface in Mbps |
| Load Average (5 min)     | Load average over 5 minutes                     |
| Load Average (15 min)    | Load average over 15 minutes                    |
| Swap Used                | Swap used in GB                                 |

Load average sensors are only added on devices that report a load average.

Not every GPU reports every value. GPU sensors System Bridge can't read for a GPU, such as encoder and decoder usage on some integrated GPUs, show as unknown.

Network interface sensors are named after the interface, such as `eth0 download rate`. The download and upload rate sensors show Mbit/s by default, and you can change the unit in the entity settings. Loopback interfaces are left out, and sensors for an interface that appears later, such as a USB network adapter, are added when it first shows up. The Wi-Fi sensors are unknown while the interface isn't connected, and aren't available on macOS.

Per-disk sensors are named after the disk, such as `/dev/sda1 read rate`. They're only added for disks that report read and write activity, and a disk that appears later, such as a USB drive, gets its sensors when it first shows up.

Each battery System Bridge finds, including ones in connected devices such as a wireless mouse or headset, also gets a level and a state sensor named after its model, such as `PRO X SUPERLIGHT 2c battery`. They're enabled for connected devices, and disabled by default for the device's own batteries, which the battery sensors above already cover. Sensors for a battery that appears later, such as a headset being switched on, are added when it first shows up. The AC Power binary sensor is only added on devices that report it, so desktops don't get one.

## Display controls

Each display that reports its brightness gets a `Display YOUR_DISPLAY_ID brightness` number entity to set its brightness from 0 to 100%. Each display that reports its power state gets a `Display YOUR_DISPLAY_ID power` switch entity to turn it on or off. The switch shows off when the display is in standby, suspended, or off. A display connected later gets its entities when it first reports these values. A display that reports neither value doesn't get these entities.

Brightness is set through the backlight on built-in screens and over Display Data Channel Command Interface (DDC/CI) on external monitors. Power is set over DDC/CI. On Linux with Hyprland, screens that don't support DDC/CI are turned on and off through Hyprland.

## Power buttons

The integration provides a button for each power command: **Sleep**, **Hibernate**, **Restart**, **Shut down**, **Lock**, and **Log out**. Pressing one sends the command to the device straight away, with no confirmation, so add a confirmation to any dashboard button that uses them. If System Bridge reports an error for a command, pressing the button shows it.

The buttons do the same as the [`system_bridge.power_command`](/actions/system_bridge.power_command/) action, and are easier to add to a dashboard or an automation.

## Power controls

On Linux with power-profiles-daemon, the **Power profile** select entity shows the active power profile, such as **Balanced**, **Performance**, or **Power saver**, and switches to another. Only the profiles the device supports are listed.

On Linux, the **Keep awake** switch entity keeps the device from idling, so it doesn't lock, blank the screen, or sleep for being idle. Turn it off to let the device idle again. On Omarchy, this is the same as the bar's stay awake switch.

Each entity is added once the device first reports it, so devices without power profiles or keep awake support don't get them. These need System Bridge 5.20.0 or later.

## Media player

The integration provides a media player for the media currently playing on your device. It shows the title, artist, album, position and other details System Bridge reports, and you can play, pause, stop and skip tracks.

What else you can control depends on the operating system:

- **Linux**: With System Bridge 5.20.0 or later, you can also seek, set the volume, and turn shuffle and repeat on or off, when the player supports it.
- **Windows**: Shuffle and repeat are shown, but can't be changed.
- **macOS**: Only play, pause and stop are available.

When more than one app is playing, the media player follows the one that's playing, or else the first one that's paused. With System Bridge 5.23.0 or later, its source list holds every player it can see: pick one to show and control that player, or pick `Automatic` to go back to following the playing one. The pick resets when Home Assistant restarts.

### Audio devices

The `Audio` media player sets the volume of whichever output is the system default and mutes it, so it's the system volume. It follows the default when you switch outputs, which makes it the one to use in automations. Its source list holds your outputs: pick one to make it the default. The volume on the main media player is the playing app's own volume, not the system volume.

Each audio output, such as speakers or headphones, also gets a media player named after it, such as `Speakers output`, to set its volume and mute it.

Each audio input, such as a microphone, gets a `Microphone input volume` number entity to set its volume from 0 to 100%, and a `Microphone input mute` switch entity to mute it. An input only gets these entities once System Bridge reports its volume or mute state. The `Audio input` select entity picks the default input.

An audio device connected later, such as a USB headset, gets its entities when it first shows up, and they become unavailable while it's disconnected.

Audio devices need System Bridge 5.16.0 or later, on Linux or Windows. On Linux, they also require `pactl` with JSON support (PulseAudio 16 or later), using PulseAudio or PipeWire with `pipewire-pulse`.

## Media source

This integration is available as a media source to use with the media browser integration. You can browse and view media from your system to media players such as your web browser and other supported media players.

## Update

The integration provides an update component, which will notify you when a new version of the app is available.

## Notifiers

The **System Bridge** {% term integration %} adds a notify {% term entity %} for each computer. To send a plain notification, use the `notify.send_message` {% term action %}. For urgency, buttons, a sound or what opens on click, use the [`system_bridge.send_message`](#action-system_bridgesend_message) action. For further instructions on using notifiers in automations, refer to the [getting started with automation page](/getting-started/automation/).

{% example %}
action: |
  action: notify.send_message
  target:
    entity_id: notify.my_computer
  data:
    title: "Reminder"
    message: "Have you considered frogs?"
{% endexample %}

### Action: `system_bridge.send_message`

Sends a notification to the computer, with options `notify.send_message` doesn't have. It returns the notification's `id`, which you can use to match the events and dismiss it later.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `entity_id` | no | The System Bridge notify entity to send to. |
| `message` | no | The message body of the notification. |
| `title` | yes | Title of the notification. Defaults to `Home Assistant`. |
| `icon` | yes | Icon name or image path on the computer to show with the notification. |
| `urgency` | yes | `low`, `normal` or `critical`. Critical notifications stay until they're dismissed. Linux only. |
| `duration` | yes | How long the notification shows for. |
| `buttons` | yes | Up to 3 buttons, each with an `id` and a `label`. Pressing one reports its `id`. The `id` can't be `default`, which is reported when the notification itself is clicked. Linux and Windows only. |
| `sound` | yes | Path to a sound file on the computer to play with the notification. Linux only. |
| `url` | yes | URL to open on the computer when the notification is clicked. Can't be used with `path`. |
| `path` | yes | File or folder on the computer to open when the notification is clicked. Can't be used with `url`. |

{% important %}
Only administrators can use this action, as `url` and `path` choose what opens on the computer when the notification is clicked.
{% endimportant %}

{% example %}
action: |
  action: system_bridge.send_message
  target:
    entity_id: notify.my_computer
  data:
    title: "Front door"
    message: "Someone's at the door"
    urgency: critical
    duration:
      seconds: 30
    buttons:
      - id: unlock
        label: "Unlock"
      - id: ignore
        label: "Ignore"
    url: "http://homeassistant.local:8123/lovelace/cameras"
  response_variable: notification
{% endexample %}

The response looks like this:

```yaml
notify.my_computer:
  id: 12
```

The `id` is empty with System Bridge versions before 5.20.0, and `0` when the computer has no notification service.

### Action: `system_bridge.dismiss_message`

Closes a notification on the computer, using the `id` that `system_bridge.send_message` returned. Linux only: on Windows and macOS, and for a notification that's no longer open, the action fails.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `entity_id` | no | The System Bridge notify entity that sent the notification. |
| `id` | no | The `id` that `system_bridge.send_message` returned. |

{% raw %}

{% example %}
action: |
  action: system_bridge.dismiss_message
  target:
    entity_id: notify.my_computer
  data:
    id: "{{ notification['notify.my_computer'].id }}"
{% endexample %}

{% endraw %}

### Notification events

With System Bridge 5.20.0 or later, each computer has a notification {% term event %} {% term entity %}, such as `event.my_computer_notification`. It fires when a notification sent by Home Assistant is clicked or closed on the computer, and, with System Bridge 5.27.0 or later, when System Bridge sends a notification from anywhere.

| Event type | Attributes | When |
| ---------- | ---------- | ---- |
| `sent` | `notification_id`, `title`, `message`, `buttons` | System Bridge sent a notification, from Home Assistant or another app. `buttons` lists each button's `id` and `label`. |
| `clicked` | `notification_id`, `action` | The notification or one of its buttons was clicked. `action` is the button's `id`, or `default` for the notification itself. |
| `closed` | `notification_id`, `reason` | The notification closed without a click. `reason` is `expired`, `dismissed` or `closed`. |

`notification_id` is the same for every event about one notification, and matches the `id` that `system_bridge.send_message` returned, so you can follow a notification from `sent` to its click or close. Linux reports clicks and closes, Windows only clicks, and macOS neither.

{% raw %}

{% example %}
automation: |
  triggers:
    - trigger: state
      entity_id: event.my_computer_notification
      not_from: unavailable
  conditions:
    - condition: state
      entity_id: event.my_computer_notification
      attribute: event_type
      state: clicked
    - condition: template
      value_template: "{{ trigger.to_state.attributes.action == 'unlock' }}"
  actions:
    - action: lock.unlock
      target:
        entity_id: lock.front_door
{% endexample %}

{% endraw %}

### Legacy notify action

The `notify.system_bridge_<hostname>` action is deprecated and will be removed in Home Assistant 2027.6. Using it creates a repair issue. Use `notify.send_message` or `system_bridge.send_message` with the notify entity instead:

- `title` and `message` stay the same.
- `data.icon` becomes `icon`.
- `data.timeout` becomes `duration`, a time period such as `seconds: 10`. System Bridge read the legacy `timeout` as milliseconds.
- `data.actions` with an `OPEN_URL` or `OPEN_PATH` command become `url` or `path`. For buttons, use `buttons`, each with an `id` and a `label`.
- `data.audio.source` becomes `sound`, a sound file on the computer. URLs and `volume` never worked.
- `data.image` isn't used by System Bridge and has no replacement.

{% include integrations/actions.md %}

## Known limitations

- Display brightness and power controls aren't available on macOS.
- A display can report its brightness or power state without supporting changes to it. In that case, the action fails and shows the error message from System Bridge.
- Some monitors stop responding to DDC/CI when they're off, so they can't be turned back on from Home Assistant.

## Removing the integration

This integration follows standard integration removal. Removing it doesn't change System Bridge on your computer. To stop System Bridge as well, uninstall it there.

{% include integrations/remove_device_service.md %}
