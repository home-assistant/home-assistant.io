---
title: Virtual Remote
description: Create virtual remote entities backed by infrared entities.
ha_category:
  - Remote
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@orandasoft'
ha_domain: virtual_remote
ha_integration_type: helper
---

The Virtual Remote integration allows you to create Home Assistant `remote` entities backed by `infrared` entities.

A virtual remote behaves like a standard Home Assistant remote entity and supports:

- `remote.send_command`
- Optional power commands
- Named infrared commands
- Raw infrared commands
- Command repeats and delays
- Multiple virtual remotes in a single config entry

The integration does not directly transmit infrared commands itself. Instead, it forwards commands to a configured infrared entity.

Because Virtual Remote exposes standard Home Assistant `remote` entities, it can be used with automations, scripts, dashboards, and voice assistants which support the `remote` domain.

{% include integrations/config_flow.md %}

## Prerequisites

Before adding Virtual Remote, at least one compatible infrared entity must already exist in Home Assistant.

Examples include:

- Infrared entities provided by the iTach IP2IR integration
- Infrared entities exposed through ESPHome
- Other integrations implementing the Home Assistant `infrared` entity model

## Supported functionality

Virtual Remote supports:

- Creating one or more virtual remote entities
- Associating each virtual remote with an infrared entity
- Defining reusable named commands
- Sending raw infrared commands
- Sending command sequences
- Configuring delays and repeat counts
- Standard Home Assistant remote services and automations

Each virtual remote is exposed as a standard Home Assistant `remote` entity.

Named commands belong to individual virtual remotes and are not shared between remotes.

## Adding the integration

1. In Home Assistant, go to **Settings** > **Devices & Services**.
2. Select **Add Integration**.
3. Search for **Virtual Remote**.
4. Select the infrared entity to associate with the virtual remote.
5. Enter a name for the virtual remote.
6. Select **Submit**.

The integration creates the initial virtual remote entity.

Additional virtual remotes can be created through the integration options.

## Managing virtual remotes

Open the integration and select **Configure** to:

- Add virtual remotes
- Edit virtual remotes
- Remove virtual remotes
- Add named infrared commands
- Edit command definitions
- Remove infrared commands

Each virtual remote stores its own command definitions.

## Command formats

Virtual Remote supports multiple infrared command formats.

### Pronto Hex

Example:

```text
0000 006D 0022 0002 0157 00AC ...
```

### JSON timing array

Example:

```json
[9000,4500,560,560,560,1690]
```

### JSON timing object

Example:

```json
{
  "timings": [9000,4500,560,560,560,1690],
  "carrier_frequency": 38000
}
```

### Timing string

Example:

```text
9000 4500 560 560 560 1690
```

If a command name does not match a configured named command, Virtual Remote attempts to interpret the value as a raw infrared command.

## Sending commands

Example action call:

```yaml
action: remote.send_command
target:
  entity_id: remote.living_room_tv
data:
  command: POWER
```

Example command sequence:

```yaml
action: remote.send_command
target:
  entity_id: remote.living_room_tv
data:
  command:
    - POWER
    - HDMI1
```

Example with repeats and delay:

```yaml
action: remote.send_command
target:
  entity_id: remote.living_room_tv
data:
  command: VOLUME_UP
  num_repeats: 3
  delay_secs: 0.4
```

## Advanced usage

Virtual Remote supports:

- Reusable named commands
- Raw infrared payloads
- Command sequences
- Configurable repeat counts
- Configurable inter-command delays

These features can be combined within automations and scripts.

## Availability behavior

Virtual Remote does not maintain its own hardware connection state.

Availability is inherited directly from the linked infrared entity.

A virtual remote is available only while its linked infrared entity is available.

If the linked infrared entity becomes unavailable or is removed, the virtual remote will become unavailable.

The integration creates a repair issue when a configured infrared entity no longer exists.

## Troubleshooting

### Virtual remote unavailable

If a virtual remote becomes unavailable:

1. Verify the linked infrared entity still exists.
2. Confirm the backing integration is loaded correctly.
3. Open the Virtual Remote integration options and select a valid infrared entity if necessary.

### Command errors

If a command fails:

- Verify the command format is valid.
- Confirm the infrared entity supports transmission.
- Verify named commands exist in the virtual remote configuration.

## Known limitations

- Virtual Remote does not learn infrared commands.
- Virtual Remote does not directly control infrared hardware.
- An existing infrared entity is required.
- Infrared protocol validation depends on the backing infrared entity implementation.

## Removing the integration

1. Go to **Settings** > **Devices & Services**.
2. Open the **Virtual Remote** integration.
3. Select the three-dot menu.
4. Select **Delete**.

Removing the integration removes all configured virtual remotes and command definitions.
