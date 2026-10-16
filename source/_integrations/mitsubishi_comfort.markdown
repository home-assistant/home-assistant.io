---
title: Mitsubishi Comfort
description: Control Mitsubishi Electric minisplit heat pump and air conditioning systems through local or cloud connections with Home Assistant.
ha_category:
  - Climate
ha_release: 2026.6
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_dhcp: true
ha_codeowners:
  - '@nikolairahimi'
ha_domain: mitsubishi_comfort
ha_platforms:
  - climate
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Mitsubishi Comfort** {% term integration %} connects Mitsubishi Electric ductless minisplit heat pump and air conditioning systems to Home Assistant. It uses your Mitsubishi Comfort account to discover devices and retrieve any available local-control credentials. Indoor units use your local network when those credentials and a local IP address are available. Otherwise, they use Mitsubishi Comfort cloud control.

This integration provides climate control for indoor units. It can also discover Kumo Station devices, but it does not currently provide entities for them.

{% important %}
Mitsubishi has removed information required for local control from its API responses for new Mitsubishi Comfort accounts. If your account does not provide these credentials, your indoor units use cloud control, which requires an internet connection and access to Mitsubishi's service. Kumo Station devices still require local-control credentials.

Existing installations can continue to use local control if Home Assistant has cached the required credentials or your account still provides them. Avoid removing a working integration, as you may lose the ability to control your devices locally.
{% endimportant %}

## Supported devices

- **Indoor unit** (ductless, ducted)
  - Controls: mode, temperature, fan speed, vane direction
  - Readings: current temperature and humidity, when reported by the device
- **Kumo Station** (discovery only)
  - Requires local-control credentials and a local IP address
  - Cloud control and sensor entities are not supported

## Prerequisites

- A [Mitsubishi Comfort (Kumo Cloud)](https://app.kumocloud.com) account with your Mitsubishi devices registered.
- Devices must be connected via their Wi-Fi adapters. Cloud control requires an internet connection for both Home Assistant and your devices.
- Home Assistant must be able to reach Mitsubishi's service when the integration starts or reloads, even if your devices use local control afterward.
- During setup you will be asked to enter the **username** and **password** for your Kumo Cloud account. The integration uses these credentials to discover your devices, retrieve available local-control credentials, and control indoor units through the cloud when needed.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: The email address for your Kumo Cloud account.
Password:
  description: The password for your Kumo Cloud account.
{% endconfiguration_basic %}

## Configuration options

### Automatic local or cloud control

You do not need to enable cloud control separately. The integration selects a connection for each indoor unit when it starts or reloads:

- If local-control credentials and a local IP address are available, it uses local control.
- If either is missing, it uses cloud control through your Mitsubishi Comfort account.

You can have both local and cloud-controlled units on the same account. Both use the same climate controls in Home Assistant, subject to each unit's capabilities. Cloud control does not require you to enter a local IP address or keep Home Assistant on the same network as your units.

If a unit has local-control credentials and its IP address is later discovered or entered through the repair below, the integration reloads and switches it to local control. Its entity ID stays the same, so your existing dashboards and automations continue to use it.

### Finding device IP addresses

For devices with local-control credentials, the integration finds the local IP address automatically through DHCP discovery. This works when your devices are on the same network as Home Assistant. Indoor units use cloud control while their local address is unknown. If a device is on a different subnet or VLAN, you can enter its IP address manually:

1. Go to {% my repairs title="**Settings** > **System** > **Repairs**" %}.
2. Select **Mitsubishi Comfort devices have no local IP address** and open the repair.
3. Enter the local IP address for each device that the integration cannot find on its own.
4. Leave a field blank to keep using DHCP discovery for that device.

This repair is only offered for devices that have local-control credentials. Entering an IP address cannot enable local control if Mitsubishi no longer provides those credentials for your account.

{% configuration_basic %}
Device IP addresses:
  description: The local IP address for each device, shown as one field per device. Leave a field blank to keep using DHCP discovery, which only works when the device is on the same network as Home Assistant.
{% endconfiguration_basic %}

{% tip %}
If you set an IP address manually, give the device a fixed IP address in your router (a DHCP reservation) so the address does not change over time.
{% endtip %}

## Supported functionality

The **Mitsubishi Comfort** integration provides the following entities.

### Climate

Each indoor unit is exposed as a climate entity with the following capabilities:

- **HVAC modes**: Off, Cool, Heat, Dry, Fan only, Heat/Cool (auto)
  - Availability depends on the specific unit.
- **Fan modes**: Super quiet, Quiet, Low, Powerful, Super powerful, Auto
  - The number of available speeds depends on the unit.
- **Swing modes**: Horizontal, Mid-Horizontal, Midpoint, Mid-Vertical, Vertical, Auto, Swing
  - Availability depends on the unit.
- **Temperature**: Single setpoint in Cool and Heat modes, separate high and low setpoints in Heat/Cool (auto) mode.
  - Temperature ranges vary by unit and mode.

## Data updates

The Mitsubishi Comfort integration {% term polling polls %} the status of your devices every 60 seconds, using the selected local or cloud connection. After a command is accepted (such as changing the mode or adjusting the temperature), Home Assistant displays the requested setting without waiting for the next poll.

For cloud-controlled units, accepting a command does not confirm that the device has applied it. The next successful poll updates Home Assistant with the state reported by Mitsubishi. Cloud control does not provide the current heating or cooling activity. Cloud rate limits can delay updates.

## Known limitations

- The cloud fallback applies when local connection information is missing. If a unit already uses local control and becomes unreachable, the integration does not automatically switch it to cloud control.
- Cloud-controlled units require Mitsubishi's service and an internet connection for status updates and commands. They become unavailable when cloud updates fail. Units with working local connections can continue operating while the integration remains loaded.
- A command that times out is not automatically retried through the cloud. Check the device's reported state before sending it again.

## Troubleshooting

### Local control is unavailable

If your account is affected by Mitsubishi's API changes described above, indoor units use cloud control. Retrying setup or entering a device's IP address cannot replace the missing credentials. Only devices with local-control credentials can switch to local control when their address is discovered or entered manually.

### A cloud-controlled unit is unavailable

Check that the unit works in the Mitsubishi Comfort app and that both Home Assistant and the unit can reach the internet. If Mitsubishi's service is unavailable or temporarily limits requests, updates resume when requests succeed again.

### Home Assistant asks you to sign in again

If Mitsubishi rejects the integration's account credentials, Home Assistant prompts you to reauthenticate. Go to {% my integrations title="**Settings** > **Devices & services**" %} and follow the prompt for **Mitsubishi Comfort**. Sign in with the same account you used to set up the integration. Reauthentication preserves your cached local-control credentials and device IP addresses.

### A locally controlled unit is unavailable

Check that Home Assistant can reach the unit on your network and that its local IP address has not changed. For devices on a different subnet or VLAN with no known address, use the repair described in [Finding device IP addresses](#finding-device-ip-addresses). A unit with a known local address does not automatically switch to cloud control when that address stops responding.

## Removing the integration

{% include integrations/remove_device_service.md %}

Removing the integration stops all polling and closes connections to the devices. Your Kumo Cloud account and device settings are not affected.
