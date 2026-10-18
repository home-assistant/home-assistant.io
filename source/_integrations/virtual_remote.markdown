---
title: Virtual Remote
description: Create a virtual remote entity backed by an infrared entity.
ha_category:
  - Remote
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@orandasoft'
ha_domain: virtual_remote
ha_integration_type: helper
---

The Virtual Remote integration creates a Home Assistant `remote` entity that sends infrared commands through an existing `infrared` entity.

Virtual Remote does not connect to infrared hardware itself. The linked infrared entity is responsible for the actual transmission. Virtual Remote stores command names, exposes a standard `remote` entity, and forwards commands to the selected infrared entity.

Use this integration when one infrared transmitter should be represented as a user-facing remote for a specific device, such as a TV, receiver, projector, HDMI switch, or air conditioner.

{% include integrations/config_flow.md %}

## Prerequisites

Before adding Virtual Remote, at least one compatible `infrared` entity must already exist in Home Assistant.

Examples include:

- Infrared entities provided by an iTach IP2IR integration.
- Infrared entities exposed by ESPHome.
- Infrared entities provided by other integrations implementing the Home Assistant `infrared` entity model.

Virtual Remote only lists enabled `infrared` entities. Disabled infrared entities must be enabled before they can be selected.

## Supported functionality

Virtual Remote supports the following functions:

- Create one virtual remote entity per config entry.
- Link the virtual remote to one existing infrared entity.
- Change the linked infrared entity from the integration options.
- Add, edit, and remove named infrared commands.
- Send configured command names with `remote.send_command`.
- Send ad-hoc raw infrared payloads with `remote.send_command`.
- Send command sequences.
- Use `num_repeats` and `delay_secs` with `remote.send_command`.
- Map configured commands to the standard remote power commands:
  - `turn_on`
  - `turn_off`
  - `toggle`
- Report availability based on the linked infrared entity.
- Create a repair issue if the linked infrared entity is removed.

Virtual Remote does not learn infrared commands and does not discover infrared hardware.

## Use cases

### Create a TV remote from an infrared transmitter

Create a Virtual Remote named `Living Room TV` and link it to the infrared emitter aimed at the TV. Add commands such as `POWER`, `HDMI_1`, `HDMI_2`, and `VOLUME_UP`.

You can then use the created `remote.living_room_tv` entity in dashboards, scripts, scenes, and automations.

### Give one transmitter multiple user-facing remotes

If one physical infrared transmitter controls multiple devices, create one Virtual Remote config entry for each device.

For example:

- `remote.living_room_tv`, linked to the transmitter port aimed at the TV.
- `remote.av_receiver`, linked to the transmitter port aimed at the receiver.
- `remote.projector`, linked to the transmitter port aimed at the projector.

Each virtual remote stores its own command names. Commands are not shared between virtual remotes.

### Use raw commands directly in automations

Named commands are useful for commands you use often. For one-off or advanced automations, you can also send a raw infrared payload directly with `remote.send_command`.

This is useful when you do not want to store every command in the integration options.

## Adding the integration

1. Go to **Settings** > **Devices & services**.
2. Select **Add integration**.
3. Search for **Virtual Remote**.
4. Select the infrared entity that should transmit commands.
5. Enter a name for the virtual remote.
6. Select **Submit**.

The integration creates one `remote` entity for the configured device.

To create another virtual remote, add the Virtual Remote integration again and select the infrared entity for the next device.

## Managing a virtual remote

Open the Virtual Remote integration and select **Configure** to manage the virtual remote.

From the options flow, you can:

- Change the linked infrared entity.
- Add a named command.
- Edit a named command.
- Remove a named command.

Named commands belong to the selected virtual remote only.

## Command formats

Virtual Remote supports the following infrared command formats.

### Pronto Hex

```text
0000 006D 0022 0002 0157 00AC ...
```

### JSON timing array

```json
[9000, 4500, 560, 560, 560, 1690]
```

### JSON timing object

```json
{
  "timings": [9000, 4500, 560, 560, 560, 1690],
  "carrier_frequency": 38000
}
```

### Timing string

```text
38000:9000,4500,560,560,560,1690
```

If the carrier frequency is omitted, Virtual Remote uses 38 kHz.

When `remote.send_command` is called, Virtual Remote first looks for a configured command with that name. If no configured command matches, it tries to parse the value as a raw infrared command. If neither succeeds, the service call fails with an unknown or invalid command error.

## Examples

### Send a named command

```yaml
action: remote.send_command
target:
  entity_id: remote.living_room_tv
data:
  command: HDMI_1
```

### Send a command sequence

```yaml
action: remote.send_command
target:
  entity_id: remote.living_room_tv
data:
  command:
    - POWER
    - HDMI_1
```

### Send a command with repeats and delay

```yaml
action: remote.send_command
target:
  entity_id: remote.living_room_tv
data:
  command: VOLUME_UP
  num_repeats: 3
  delay_secs: 0.4
```

### Send a raw infrared command directly

```yaml
action: remote.send_command
target:
  entity_id: remote.living_room_tv
data:
  command: "38000:9000,4500,560,560,560,1690"
```

### Use a virtual remote in a script

```yaml
script:
  watch_blu_ray:
    sequence:
      - action: remote.send_command
        target:
          entity_id: remote.living_room_tv
        data:
          command: POWER
      - delay: "00:00:02"
      - action: remote.send_command
        target:
          entity_id: remote.living_room_tv
        data:
          command: HDMI_1
```

## Power commands

Virtual Remote can map named commands to standard remote power actions.

If configured, these actions can be used with the virtual remote entity:

```yaml
action: remote.turn_on
target:
  entity_id: remote.living_room_tv
```

```yaml
action: remote.turn_off
target:
  entity_id: remote.living_room_tv
```

```yaml
action: remote.toggle
target:
  entity_id: remote.living_room_tv
```

If no matching power command is configured, use `remote.send_command` with the desired command name instead.

## Availability

Virtual Remote does not maintain a hardware connection.

The virtual remote is available only while the linked infrared entity exists and is available.

If the linked infrared entity becomes unavailable, the virtual remote also becomes unavailable. If the linked infrared entity is removed, Virtual Remote creates a repair issue so you can select a valid infrared entity.

## Troubleshooting

### The integration cannot be added

Virtual Remote requires at least one enabled `infrared` entity.

If no infrared entity is available:

1. Add and configure an integration that provides an `infrared` entity.
2. Confirm the infrared entity is enabled.
3. Reload or restart the backing integration if the entity was just created.
4. Try adding Virtual Remote again.

### The virtual remote is unavailable

If the virtual remote is unavailable:

1. Check whether the linked infrared entity still exists.
2. Check whether the backing infrared integration is loaded.
3. Confirm the infrared transmitter is connected and reachable.
4. Open the Virtual Remote options and select a valid infrared entity.

### A named command does not work

If a named command fails:

1. Confirm the command name in the automation exactly matches the configured command name.
2. Confirm the stored command payload is valid.
3. Test the linked infrared entity directly if possible.
4. Confirm the infrared emitter or blaster is aimed at the target device.
5. Try increasing `num_repeats` for commands that require repeated transmission.

### A raw command does not work

If a raw command fails:

1. Confirm the raw command uses one of the supported formats.
2. Confirm the timing values are in microseconds.
3. Confirm the carrier frequency is correct for the target device.
4. Test a learned command from the same physical remote when possible.
5. Check the Home Assistant logs for command parsing or send errors.

### The wrong device responds

If a different device responds to a command:

1. Confirm the virtual remote is linked to the correct infrared entity.
2. Confirm the infrared emitter is plugged into the intended transmitter port.
3. Check whether the infrared blaster is reaching more than one device.
4. Use separate emitter ports or reposition the emitter if needed.

## Known limitations

- Virtual Remote does not learn infrared commands.
- Virtual Remote does not discover infrared transmitters.
- Virtual Remote does not directly communicate with infrared hardware.
- An existing `infrared` entity is required.
- The linked infrared entity must support sending raw infrared commands.
- Command validation depends on the command format and the backing infrared entity implementation.
- Named commands are stored per virtual remote and are not shared across config entries.
- Removing the integration removes the configured command definitions for that virtual remote.

## Removing the integration

1. Go to **Settings** > **Devices & services**.
2. Open the **Virtual Remote** integration.
3. Select the three-dot menu.
4. Select **Delete**.

Removing a Virtual Remote config entry removes that virtual remote and its command definitions. It does not remove or change the linked infrared entity.
