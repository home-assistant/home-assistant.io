---
description: How to integrate the System Bridge integration into Home Assistant.
ha_release: 2021.6
ha_domain: system_bridge
---

[System Bridge](https://system-bridge.timmo.dev) is an application that runs on your local machine to share system information via its API/WebSocket. You can also send commands to the device such as opening a URL or sending keyboard keypresses.

## Use cases

- **Keep an eye on your computers**: See CPU, memory, disk, GPU, network and battery use on a dashboard, and get notified when a disk fills up or a battery runs low.
- **Automate around your computer**: Turn the lights down when your computer locks, or react to the camera being in use.
- **Control your computer from Home Assistant**: Lock, sleep or shut down the computer, turn its displays off, control its media, or open a URL on it.
- **Send notifications to your desktop**: Show a notification with buttons and a sound on the computer, such as when someone rings the doorbell.

## Supported devices

The integration works with any computer running [System Bridge](https://system-bridge.timmo.dev) 5.0.0 or later. System Bridge has packages for Linux and Windows. macOS isn't officially supported, but you can build System Bridge from source to run it there. Some features depend on the operating system; see [Known limitations](#known-limitations).

## Prerequisites

### Version

This integration requires System Bridge 5.0.0 and above. Any older version will not work.

### Token

You will need your token. For instructions on finding your token, follow the steps in the [System Bridge documentation](https://system-bridge.timmo.dev/running/#token).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The hostname or IP address of the computer running System Bridge.
Port:
  description: The port System Bridge listens on. The default is `9170`, and you can change it on the computer with the `SYSTEM_BRIDGE_PORT` environment variable.
Token:
  description: The token from the System Bridge settings. To find it, run `system-bridge client token` on the computer, as the same user that runs System Bridge.
{% endconfiguration_basic %}

Home Assistant discovers computers running System Bridge on your network. A discovered computer shows up under {% my integrations title="**Settings** > **Devices & services**" %}, and you only need to enter its token.

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

## Known limitations

- Display brightness and power controls aren't available on macOS.
- A display can report its brightness or power state without supporting changes to it. In that case, the action fails and shows the error message from System Bridge.
- Some monitors stop responding to DDC/CI when they're off, so they can't be turned back on from Home Assistant.

## Examples

### Lock your computer when you leave home

This automation locks the computer when everyone has left home. Replace `button.my_computer_lock` with your computer's **Lock** button.

- **Trigger**: Zone occupancy cleared
  - **Zone**: Home (`zone.home`)
- **Action**: Press button
  - **Target**: Computer lock (`button.my_computer_lock`)

{% example %}
automation: |
  alias: "Lock the computer when leaving home"
  triggers:
    - trigger: zone.occupancy_cleared
      options:
        zone: zone.home
  actions:
    - action: button.press
      target:
        entity_id: button.my_computer_lock
{% endexample %}

### Notify when a disk is nearly full

This automation sends a notification to your phone when a disk on the computer is more than 90% full. Replace `sensor.my_computer_c_space_used` with the space used sensor of the disk.

- **Trigger**: Numeric state crossed threshold
  - **Entity**: C: drive space used (`sensor.my_computer_c_space_used`)
  - **Above**: `90`
- **Action**: Send a notification message
  - **Target**: My phone (`notify.my_phone`)
  - **Title**: `Disk nearly full`
  - **Message**: The C: drive on your computer is more than 90% full.

{% example %}
automation: |
  alias: "Computer disk nearly full"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.my_computer_c_space_used
      above: 90
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_phone
      data:
        title: "Disk nearly full"
        message: "The C: drive on your computer is more than 90% full."
{% endexample %}

### Show a notification on the computer when the doorbell rings

This automation shows a notification on the computer when someone rings the doorbell. Replace `event.front_door_doorbell` with your doorbell's event entity, and `notify.my_computer` with your computer's notify entity.

- **Trigger**: Doorbell rang
  - **Target**: Front door doorbell (`event.front_door_doorbell`)
- **Action**: Send a notification message
  - **Target**: My computer (`notify.my_computer`)
  - **Title**: `Doorbell`
  - **Message**: Someone is at the door.

{% example %}
automation: |
  alias: "Doorbell notification on the computer"
  triggers:
    - trigger: doorbell.rang
      target:
        entity_id: event.front_door_doorbell
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_computer
      data:
        title: "Doorbell"
        message: "Someone is at the door."
{% endexample %}

## Troubleshooting

### Can't connect to System Bridge

If Home Assistant can't connect when you set up the integration, or the computer's entities stay unavailable:

1. Check System Bridge is running on the computer, for example by opening its [web client](https://system-bridge.timmo.dev/using/web-client/).
2. Check the host and port. From another device on your network, open `http://YOUR_COMPUTER:9170` in a browser, using your port if you changed it. If the System Bridge web client loads, that device can reach the computer. Also check that routing and firewall rules allow Home Assistant to reach the same host and port.
3. Check the computer's firewall allows incoming connections on the System Bridge port.
4. If the computer gets its IP address from DHCP, give it a fixed address, or use its hostname. A computer that Home Assistant discovered gets its address updated when it changes.

The computer's entities are unavailable while it sleeps or is turned off. This is expected, and they update again once it's back.

### Authentication failed

If the token changes, for example after reinstalling System Bridge, Home Assistant asks you to reauthenticate. Select **Reconfigure** on the notification under {% my integrations title="**Settings** > **Devices & services**" %} and enter the new token.

### System Bridge upgrade required

If the computer runs a System Bridge version older than 5.0.0, Home Assistant creates a repair issue and doesn't set up the integration. Update System Bridge on the computer. Home Assistant keeps retrying, and sets the integration up once the update is done.

## Removing the integration

This integration follows standard integration removal. Removing it doesn't change System Bridge on your computer. To stop System Bridge as well, uninstall it there.

{% include integrations/remove_device_service.md %}
