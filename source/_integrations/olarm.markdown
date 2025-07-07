---
title: Olarm
description: Instructions on how to integrate Olarm devices into Home Assistant.
ha_release: 2025.1
iot_class: Cloud Push
codeowners:
  - '@olarmtech'
config_flow: true
domain: olarm
integration_type: integration
platforms:
  - binary_sensor
---

The **Olarm** {% term integration %} connects Home Assistant with Olarm's range of smart alarm communicators. It allows you to monitor, control, and automate your alarm system directly from Home Assistant—enhancing security through smart home automation.

Olarm upgrades traditional alarm panels with remote access, real-time notifications, and seamless smart home integration.

Learn more and view supported alarm systems: [Olarm](https://www.olarm.com)

## Supported devices

The following devices are known to be supported by the {% term integration %}:

- Olarm GEN1 – Paradox
- Olarm GEN1 – Universal
- Olarm PRO
- Olarm PRO 4G  
- Olarm MAX

## Prerequisites

- An active Olarm account
- A compatible Olarm {% term device %} connected to a supported alarm panel
- An active subscription for the device
- The device has public API access enabled

## Before Configuration

Before adding the integration to Home Assistant:

1. In the Olarm App: Go to **Profile** > **Device List** > **[Select Device]** > **Developer Settings**, then enable **API Access**
2. Ensure your Olarm device is online and has an active subscription

{% include integrations/config_flow.md %}

## Entities

The **Olarm** {% term integration %} provides the following {% term entities %}.

### Binary sensors

The integration creates various binary sensors depending on your alarm system configuration:

#### Zone sensors

- `binary_sensor.zone_XXX_<zone_name>`: Individual zone status for each configured zone
  - Device class automatically set based on zone type (door, window, motion)
  - Extra attribute: `bypassed` indicates if the zone is currently bypassed

#### Zone bypass sensors (optional)

- `binary_sensor.zone_XXX_bypass_<zone_name>`: Shows bypass status for each zone (only if bypass {% term entities %} are enabled during setup)

#### System sensors

- `binary_sensor.ac_power`: Indicates if AC power is available to the alarm panel

#### LINK module sensors (if LINK modules are connected)

- `binary_sensor.<link_name>_link_input_XX_<input_name>`: LINK input status
- `binary_sensor.<link_name>_link_output_XX_<output_name>`: LINK output status (for outputs in latch mode)
- `binary_sensor.<link_name>_link_relay_XX_<relay_name>`: LINK relay status (for relays in latch mode)

#### MAX module sensors (if have an Olarm MAX)

- `binary_sensor.max_input_XX_<input_name>`: MAX input status
- `binary_sensor.max_output_XX_<output_name>`: MAX output status (for outputs in latch mode)

## Examples

### Automation examples

#### Zone monitoring

```yaml
alias: "Front Door Opened"
trigger:
  - platform: state
    entity_id: binary_sensor.zone_001_front_door
    to: "on"
action:
  - service: notify.mobile_app
    data:
      message: "Front door has been opened"
```

## Troubleshooting

### Common issues

- **No updates or control issues**: Ensure the {% term device %} is online and the subscription is active
- **Missing {% term entities %}**: Reload the {% term integration %} or restart Home Assistant
- **Login issues**: Double-check your Olarm account credentials and ensure API access is enabled in the Olarm app
- **LINK entities missing**: Ensure the modules are properly connected and configured in the Olarm system

### Removal

{% my integrations badge %}

1. Go to **{% my integrations icon title="Settings > Devices & Services" %}**
2. Locate the **Olarm** integration
3. Select the integration, then select **Delete**

## Known limitations

- A maximum of 5 Olarm {% term device %}s per {% term integration %} instance are currently supported
- Only one Olarm user account per Home Assistant instance - multiple Home Assistant instances require different Olarm user accounts
- Zone bypass {% term entities %} are optional and must be enabled during setup
- LINK binary sensors {% term entities %} only available if the respective modules are connected to your system
- MAX binary sensors only available if you have an Olarm MAX

## Use cases

- Get real-time alerts for alarm events and zone activity  
- Monitor alarm system health
- Integrate LINK modules for expanded I/O capabilities
