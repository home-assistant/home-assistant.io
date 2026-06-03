# Global Caché iTach IP2IR

The Global Caché iTach IP2IR integration allows Home Assistant to control infrared devices through a Global Caché iTach IP2IR network infrared controller.

The integration exposes infrared-capable ports as Home Assistant `infrared` entities.

## Supported devices

- Global Caché iTach IP2IR

## Features

- Automatic device discovery using:
  - DHCP discovery
  - Global Caché UDP beacon discovery
- Automatic detection of infrared-capable ports
- One infrared entity per infrared-capable port
- Support for:
  - Pronto Hex infrared commands
  - Raw infrared timing sequences
- Runtime refresh of device capabilities after hardware-side configuration changes
- Diagnostics support
- Repairs support for connectivity and configuration issues

## Requirements

- A reachable Global Caché iTach IP2IR device on the local network
- Home Assistant network access to TCP port `4998`
- Infrared emitters connected to the desired output ports

## Configuration

### Automatic discovery

If the iTach IP2IR device is connected to the network, Home Assistant should discover it automatically.

When discovered:

1. Open the notification in Home Assistant.
2. Confirm the device.
3. Complete setup.

### Manual configuration

To add the integration manually:

1. Go to **Settings** → **Devices & services**.
2. Select **Add Integration**.
3. Search for **Global Caché iTach IP2IR**.
4. Enter:
   - Hostname or IP address
   - TCP port (normally `4998`)

## Infrared entities

The integration creates one `infrared` entity for each infrared-capable output port detected on the device.

Entity names depend on the detected port type:

- `IR Port X`
- `IR Blaster Port X`

Only ports that advertise infrared transmission capability are exposed.

## Sending infrared commands

Infrared commands can be sent using the `infrared.send_command` action.

Example:

```yaml
action: infrared.send_command
target:
  entity_id: infrared.ir_port_1
data:
  command:
    - "0000 006D 0022 0002 0157 00AC 0015 0016"
```

## Reconfiguring infrared ports

The iTach IP2IR device can be reconfigured outside of Home Assistant.

If the hardware configuration changes:

1. Open the integration.
2. Select **Configure**.
3. Use **Refresh infrared ports**.

The integration will re-query the device and synchronize entity availability with the currently advertised capabilities.

This avoids removing and re-adding the integration after device-side changes.

## Diagnostics

The integration supports diagnostics downloads from the device page.

Diagnostics include:

- Device identification
- Detected infrared-capable ports
- Connection information
- Entity mapping information

Sensitive information is redacted automatically.

## Troubleshooting

### Device not discovered

- Verify the device and Home Assistant are on the same network.
- Verify UDP discovery traffic is not blocked.
- Verify the device is powered on.

### Cannot connect

- Verify the IP address or hostname.
- Verify TCP port `4998` is reachable.
- Verify no firewall rules block Home Assistant.

### No infrared entities created

The integration only creates entities for ports that advertise infrared transmission capability.

Verify:
- Infrared-capable ports are enabled on the device
- The hardware configuration is correct
- The integration has been refreshed after reconfiguration

## Actions

### infrared.send_command

Send an infrared command to an infrared entity.

#### Action data

| Field | Description |
|---|---|
| `command` | Infrared command payload |
| `repeat` | Number of repeats |
| `delay_secs` | Delay between repeats |

## Notes

This integration does not learn infrared commands.

Infrared command learning must be performed using external hardware or external software tools.
