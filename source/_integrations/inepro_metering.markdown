---
title: inepro Metering
description: Instructions on how to integrate inepro energy meters with Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@khaledemam'
ha_domain: inepro_metering
ha_integration_type: hub
ha_platforms:
  - button
  - number
  - select
  - sensor
  - switch
  - text
---

The inepro Metering integration connects Home Assistant to supported inepro
energy meters over local Modbus-based transports. It can read electrical
measurements, expose diagnostic and configuration entities, discover supported
GROW meters on the local network, and manage multiple meters behind a supported
gateway or shared Modbus bus.

{% include integrations/config_flow.md %}

## Supported Products

The integration currently supports these inepro meter families and models:

| Family | Models | Supported setup paths |
| --- | --- | --- |
| GROW | GROW 3P4U, GROW 3P4S | Wired Modbus RTU, Modbus TCP via gateway, Modbus TCP over Ethernet, Modbus TCP over Wi-Fi, Bluetooth |
| GROW | GROW 1P2U | Wired Modbus RTU, Modbus TCP via gateway, Modbus TCP over Wi-Fi, Bluetooth |
| GROW | GROW 1P1U | Wired Modbus RTU, Modbus TCP via gateway |
| PRO | PRO1, PRO2, PRO380, PRO380CT | Wired Modbus RTU, Modbus TCP via gateway |

Available entities depend on the meter family, model, firmware, and selected
route.

## Prerequisites

Before setting up the integration, make sure you know which connection method
you want to use.

For a directly connected TCP meter, you need:

- The meter IP address or a visible mDNS discovery result.
- The Modbus TCP port. The default is `502`.
- The Modbus slave address. The default is `1`.

For a wired Modbus RTU bus, you need:

- The serial adapter path available to Home Assistant.
- The serial settings. The default GROW settings are `9600`, `8E1`.
- The slave address range to scan.

For an Ambition Gateway, you need:

- The gateway IP address or the subnet to scan.
- The gateway Modbus TCP port. The default is `502`.

For Bluetooth setup, you need:

- A Home Assistant Bluetooth adapter is recommended. Bluetooth proxy behavior,
  especially first-time encrypted pairing, depends on the environment.
- The meter already paired and trusted with the Home Assistant host.
- The meter kept in Bluetooth pairing/discovery mode while pairing at the host.

## Setup

Add the integration from **Settings > Devices & services > Add integration**,
then search for **inepro Metering**.

The setup flow asks whether you want to add an energy meter or a gateway.

### GROW mDNS Discovery

Supported GROW meters can advertise `_modbus._tcp.local.` on the local network.
When Home Assistant sees a supported advertisement, it creates a discovered
inepro Metering entry.

The integration requires a `serial` value in the mDNS TXT record. That serial
number is used as the stable identity for the meter. Hostnames and IP addresses
are not used as the primary identity because they can change.

The mDNS advertisement provides the host and port, but current GROW
advertisements do not say whether the endpoint is Ethernet or Wi-Fi. During
confirmation, choose **Meter Ethernet** or **Meter Wi-Fi**. The integration
keeps the discovered host and port and saves the selected route type.

### Manual TCP Setup

Use manual TCP setup when:

- mDNS discovery is not available on your network.
- Home Assistant is running in a VM, WSL, Docker, or another environment where
  multicast discovery is limited.
- You know the meter IP address and port.

Enter the host, port, slave address, timeout, and polling interval. Home
Assistant validates the live meter identity before creating the entry.

### Ambition Gateway Setup And Scan

Ambition Gateways are added through the gateway setup path. Gateway discovery is
user-triggered; the integration does not run background LAN scans.

You can scan a subnet or enter a specific gateway IP address. The integration
validates the gateway identity before creating the gateway entry. After the
gateway is added, downstream meters can be scanned from the setup flow or entry
options.

Direct Ethernet-capable GROW meters are not treated as Ambition Gateways. Add
them through mDNS discovery or manual TCP setup instead.

### Bluetooth Host-Level Pairing

Bluetooth setup assumes the meter is already paired and trusted with the Home
Assistant host. The integration does not normally ask for a PIN or run its own
pairing agent.

On Home Assistant OS or Linux, pair the meter at the host level first:

```bash
ha host shell
bluetoothctl
agent KeyboardDisplay
default-agent
scan on
pair <address>
trust <address>
```

Keep the meter on its Bluetooth information or pairing screen while pairing. If
the meter shows a 6-digit key, enter that key in the host pairing prompt. After
the host reports the device as paired and trusted, return to Home Assistant and
start the Bluetooth setup flow again.

During setup, Home Assistant validates the BLE Device Information service and
then reads the live serial number over Modbus-over-BLE. The entry is created
only if the live identity matches the selected meter.

## Entities

The integration creates one Home Assistant device for each configured meter.
Gateway and shared-bus entries can contain more than one downstream meter.

Common enabled entities include:

- Status.
- Voltage.
- Current.
- Frequency.
- Active power.
- Reactive and apparent power where supported.
- Power factor.
- Forward and reverse energy counters.

Diagnostic entities can include:

- Transport.
- Serial number and identity fields.
- Firmware and BLE firmware versions.
- Wi-Fi support and Bluetooth support where applicable.
- Optional OCMF session diagnostics for supported GROW models.

Configuration entities can include supported writable meter settings such as:

- Wi-Fi support.
- Display and LCD settings.
- Backlight settings.
- Tariff display settings.

Some diagnostic or specialized entities are disabled by default to keep the
default entity list manageable.

## Actions

### Action `inepro_metering.set_wifi_credentials`

This action writes Wi-Fi credentials to a configured Wi-Fi-capable GROW meter
through its currently loaded route. Use it only when the meter is already
reachable through a known-good route, such as wired RTU, Ethernet, Bluetooth, or
another validated route.

Fields:

| Field | Required | Description |
| --- | --- | --- |
| `serial_number` | Yes | The immutable 12-digit GROW serial number of the target meter. |
| `ssid` | Yes | The Wi-Fi network name to write to the meter. |
| `password` | Yes | The Wi-Fi password to write to the meter. |
| `apply` | No | Whether to send the meter's Wi-Fi apply command after writing the credentials. Defaults to `true`. |

Example:

```yaml
action: inepro_metering.set_wifi_credentials
data:
  serial_number: "080125260007"
  ssid: "your_wifi_name"
  password: "your_wifi_password"
  apply: true
```

If the serial number is unknown, the entry is not loaded, or the target model
does not support Wi-Fi provisioning, Home Assistant shows a validation error
and the integration does not attempt a device write.

## Diagnostics

Diagnostics can be downloaded from the integration entry. The diagnostics output
includes sanitized entry data, route metadata, runtime identity information, and
coordinator summaries.

Secrets such as Wi-Fi credentials and pairing-related values are redacted.

## Troubleshooting

### mDNS Discovery Is Not Visible

Make sure the meter and Home Assistant are on the same LAN and VLAN and that
multicast DNS is allowed by the network.

mDNS discovery may not work from WSL, some VMs, Docker networks, routed
subnets, or VLANs that do not forward multicast. Use manual TCP setup when
Home Assistant can reach the meter IP address but does not see mDNS discovery.

### Gateway Scan Finds Nothing

Check that the gateway is powered on and reachable from Home Assistant.

If Home Assistant runs in a VM, WSL, Docker, or another routed network
environment, scan a specific gateway IP address or routed subnet instead of
relying on an automatic local subnet guess.

Direct Ethernet-capable GROW meters are filtered out of gateway discovery. Add
direct meters through mDNS discovery or manual TCP setup.

### Bluetooth Not Paired

If setup reports that the meter is not paired, pair and trust the meter with the
Home Assistant host first, then retry setup.

Bluetooth range, adapter placement, stale OS bonds, and proxy behavior can also
affect setup. If pairing was recently changed, remove the old host bond, pair
again, trust the device, and retry the Home Assistant setup flow.

### Action Validation Errors

The Wi-Fi credentials action validates the target before writing. Unknown
serial numbers, unloaded entries, unsupported models, and invalid credential
data are rejected before any meter write is attempted.

Use the Developer Tools action UI to test action calls. Raw REST action calls
may surface Home Assistant wrapper behavior differently from the Developer
Tools UI.

## Known Limitations

- Current GROW mDNS TXT records do not distinguish Ethernet from Wi-Fi. The
  integration asks the user to choose the route type while preserving the
  discovered host and port.
- Bluetooth first-time pairing must be completed at the Home Assistant host
  level before the normal setup flow validates the meter.
- First-time encrypted GROW pairing through remote Bluetooth proxies has not
  been claimed as supported.
- Repairs and issue-registry surfacing are not implemented yet.
- Automatic stale-device pruning is conservative; manual device-registry
  cleanup is supported when a stale device no longer matches current entry
  data.
