---
title: Keyboard Remote
description: Instructions on how to use a keyboard or remote control as an input device for automations in Home Assistant.
ha_category:
  - Other
ha_release: 0.29
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@bendavid'
  - '@lanrat'
ha_domain: keyboard_remote
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Keyboard Remote** {% term integration %} lets you use a USB or Bluetooth keyboard, remote control, or any Linux `evdev`-compatible input device to trigger automations in Home Assistant. Instead of creating entities, the integration fires events whenever a key is pressed, released, or held down. You can listen for these events in your automations to control lights, media players, or anything else in your smart home.

Each input device is added as a separate integration entry, so you can connect multiple keyboards or remotes and configure them independently.

Because the integration uses the Linux `evdev` interface, it works only on Linux-based Home Assistant installations. The integration captures the device exclusively. This means a keyboard you add here can no longer be used for regular typing.

## Prerequisites

Before setting up the integration, make sure you meet the following requirements:

- Your Home Assistant instance runs on a Linux-based system (Home Assistant OS, or Home Assistant Container on Linux).
- The input device you want to use is connected to your system and recognized by Linux. For Bluetooth devices, pair them first using your operating system's Bluetooth settings.
- The Home Assistant process has read and write access to the device files under `/dev/input/`. On Home Assistant OS, this is handled automatically. For Home Assistant Container, see the [Containers](#running-in-a-container) troubleshooting section below.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Input device:
  description: "The input device to use. The dropdown lists all devices detected under `/dev/input/by-id/`, shown as `Device Name (device-filename)`. If your device is not listed, make sure it is connected, then restart the setup. Add a separate integration entry for each device you want to use."
{% endconfiguration_basic %}

## Configuration options

After setup, you can adjust the following options for each device. To access them, go to {% my integrations title="**Settings** > **Devices & services**" %}, find your **Keyboard Remote** entry, and select **Configure**.

{% configuration_basic %}
Key event types:
  description: "Which key events the integration listens for. You can select one or more of: `key_up` (key released), `key_down` (key pressed), and `key_hold` (key held down). By default, only `key_up` is enabled. Be aware that `key_hold` can generate a large number of events very quickly."
Emulate key hold:
  description: "When enabled, the integration emulates `key_hold` events in software for devices that do not send them natively. Disabled by default."
Key hold delay:
  description: "The number of seconds to wait before the first emulated key hold event is fired (0.01 to 5.0 seconds). Only applies when **Emulate key hold** is enabled. Default: 0.250 seconds."
Key hold repeat interval:
  description: "The number of seconds to wait between subsequent emulated key hold events (0.001 to 1.0 seconds). Only applies when **Emulate key hold** is enabled. Default: 0.033 seconds."
{% endconfiguration_basic %}

## Events

The integration does not create any entities. Instead, it fires events on the Home Assistant event bus that you can use as triggers in your automations.

{% tip %}
To discover the key codes for your device, go to {% my developer_events title="**Settings** > **Developer tools** > **Events**" %}. In the **Listen to events** section, enter `keyboard_remote_command_received` and select **Start listening**. Then press a key on your device to see its key code and other event data.
{% endtip %}

### Keyboard remote command received

The `keyboard_remote_command_received`event is fired whenever a key event occurs that matches your configured event types.

- `key_code` — The numeric key code (evdev) for the key involved in the event
- `type` — The event type: `key_up`, `key_down`, or `key_hold`
- `device_descriptor` — The `/dev/input/` path of the device
- `device_name` — The human-readable name of the device

### Keyboard remote connected

The `keyboard_remote_connected` event is fired when a configured device is detected or reconnected. This is useful for Bluetooth devices that turn off automatically to save battery.

- `device_descriptor` — The `/dev/input/` path of the device
- `device_name` — The human-readable name of the device

### Keyboard remote disconnected

The `keyboard_remote_disconnected` event is fired when a configured device is disconnected or removed.

- `device_descriptor` — The `/dev/input/` path of the device
- `device_name` — The human-readable name of the device

## Automation examples

### Triggering an automation on a key press

The following example turns on all lights when a specific key is pressed on a specific device:

```yaml
automation:
  - alias: "Keyboard all lights on"
    triggers:
      - trigger: event
        event_type: keyboard_remote_command_received
        event_data:
          # Target a specific device by its path
          device_descriptor: "/dev/input/event0"
          # Find your key code via Developer Tools > Events
          key_code: 107
          # Only trigger on key released events
          type: key_up
    actions:
      - action: light.turn_on
        target:
          entity_id: all
```

You can include `device_descriptor` or `device_name` in the event data to target a specific keyboard. This is especially useful when you have multiple Bluetooth remotes controlling different devices. Omit both to trigger the automation for any connected keyboard.

You can also include `type` to limit the trigger to a specific event type, such as `key_down`, `key_up`, or `key_hold`.

### Responding to device connections and disconnections

The integration automatically handles reconnections without requiring a restart. The following example plays a sound through a media player whenever a keyboard connects or disconnects, which is useful for Bluetooth devices that power off to save battery:

```yaml
automation:
  - alias: "Keyboard connected"
    triggers:
      - trigger: event
        event_type: keyboard_remote_connected
    actions:
      - action: media_player.play_media
        target:
          entity_id: media_player.speaker
        data:
          media_content_id: "keyboard_connected.wav"
          media_content_type: music

  - alias: "Bluetooth keyboard disconnected"
    triggers:
      - trigger: event
        event_type: keyboard_remote_disconnected
        event_data:
          device_name: "00:58:56:4C:C0:91"
    actions:
      - action: media_player.play_media
        target:
          entity_id: media_player.speaker
        data:
          media_content_id: "keyboard_disconnected.wav"
          media_content_type: music
```

## Migrating from YAML configuration

{% important %}
YAML configuration for the **Keyboard Remote** integration is deprecated and will be removed in Home Assistant 2026.11.0. When you upgrade, your existing YAML configuration is automatically imported as one integration entry per device. Please remove the `keyboard_remote` key from your {% term "`configuration.yaml`" %} after confirming the import was successful.
{% endimportant %}

To complete the migration:

1. Restart Home Assistant to trigger the automatic import.
2. Go to {% my integrations title="**Settings** > **Devices & services**" %} and confirm that your Keyboard Remote entries have been created.
3. Open your {% term "`configuration.yaml`" %} file and remove the `keyboard_remote:` block.
4. Restart Home Assistant again.

Your automations do not need to change, because the events fired by the integration remain the same.

The following reference shows the previous YAML configuration options:

{% configuration %}
device_descriptor:
  description: "Path to the local event input device file that corresponds to the keyboard. Mutually exclusive with `device_name`."
  required: false
  type: string
device_name:
  description: "Name of the keyboard device. Mutually exclusive with `device_descriptor`."
  required: false
  type: string
type:
  description: "Key event types to listen for. Possible values are `key_up`, `key_down`, and `key_hold`. Can be a single value or a list."
  required: true
  type: string
emulate_key_hold:
  description: "Emulate key hold events when a key is held down. Some input devices do not send these natively."
  required: false
  type: boolean
  default: false
emulate_key_hold_delay:
  description: "Number of seconds to wait before firing the first emulated key hold event."
  required: false
  type: float
  default: 0.250
emulate_key_hold_repeat:
  description: "Number of seconds to wait between subsequent emulated key hold events."
  required: false
  type: float
  default: 0.033
{% endconfiguration %}

## Troubleshooting

### Device not listed during setup

If the device dropdown during setup is empty or does not include your device, try the following:

1. Make sure the device is physically connected to your system. For Bluetooth devices, make sure they are paired and active.
2. Check that the device appears under `/dev/input/by-id/`. You can verify this by running `ls /dev/input/by-id/` on your host system.
3. Restart the setup flow after connecting the device.

### Permission denied errors

If the integration fails to access the device, the Home Assistant process may not have read and write permissions on the input device file. You can grant permissions with:

```bash
sudo setfacl -m u:HASS_USER:rw /dev/input/event*
```

Replace `HASS_USER` with the user that runs Home Assistant.

To make this permanent, create a udev rule that applies permissions for all event input devices. Add a file `/etc/udev/rules.d/99-userdev-input.rules` with the following content:

```bash
KERNEL=="event*", SUBSYSTEM=="input", RUN+="/usr/bin/setfacl -m u:HASS_USER:rw $env{DEVNAME}"
```

You can verify the current permissions with:

```bash
getfacl /dev/input/event*
```

### Running in a container

If you are running Home Assistant Container, you need to pass input devices to the container. You can pass a specific device using the `--device` flag (you can repeat this flag to pass multiple devices). However, restarting the container or unplugging the keyboard will break the connection, as only the device instance that existed when the container started is available inside it.

The following incomplete `docker-compose.yml` example shows how to give Home Assistant persistent access to input devices in a container:

```yaml
version: '3.7'

services:
  homeassistant:
    image: ghcr.io/homeassistant/home-assistant:stable
    volumes:
      - config:/config/
      - /dev/input:/dev/input/ # this is needed to read input events.
    restart: unless-stopped
    device_cgroup_rules:
      # allow creation of /dev/input/* with mknod
      - 'c 13:* rmw'
    devices:
      # since input id may change, pass them all in
      - "/dev/input/"
    ...

```

## Removing the integration

This integration follows standard integration removal. Each device you configured appears as a separate integration entry, so remove each one individually if you want to stop using all keyboard remotes.

{% include integrations/remove_device_service.md %}
