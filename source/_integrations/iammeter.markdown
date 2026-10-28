---
description: Instructions on how to integrate IAMMETER energy meters with Home Assistant.
ha_release: 0.107
ha_domain: iammeter
related:
  - docs: /docs/energy/
    title: Energy management
---

The **IAMMETER** {% term integration %} connects your [IAMMETER energy meter](https://www.iammeter.com/) to Home Assistant over your local network. It provides electricity measurements and import and export energy readings. You do not need an IAMMETER cloud account.

## Supported devices

The integration supports these models:

- [WEM3080](https://www.iammeter.com/products/single-phase-meter): Single-phase meter
- [WEM3162](https://cloud.iammeter.com/doc/iammeter/wem3162-quickstart.html): Single-phase meter (legacy quickstart)
- [WEM3080T](https://www.iammeter.com/products/three-phase-meter): Three-phase meter
- [WEM3046T](https://www.iammeter.com/products/3046t): Three-phase meter
- [WEM3050T](https://www.iammeter.com/products/3phase-meter-3050t): Three-phase / split-phase meter
- [WEM3063T](https://www.iammeter.com/newsshow/firmware-i-91-065-17-admin-security-recovery-swagger): Three-phase meter (manufacturer support information)
- [WEM2067](https://www.iammeter.com/products/split-phase-meter-wem2067): Split-phase / two-channel meter

Available measurements depend on the model and the fields returned by its firmware.

## Prerequisites

- Connect your meter to your local network.
- Make sure Home Assistant can reach the meter's local monitoring endpoint, `/monitorjson`.
- Have the meter's hostname or IP address ready. If monitoring access requires custom credentials, have the username and password ready.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host or data URL:
  description: "The meter's hostname, IP address, or full HTTP or HTTPS monitoring URL. The integration appends `/monitorjson` when needed. A full URL determines its own protocol and port. Enter credentials in the separate fields, rather than in the URL."
Port:
  description: "The port to use with a hostname or IP address. The default is `80`. This field does not override the port in a full URL."
Username:
  description: "The username for protected monitoring access. Leave it blank for anonymous access and automatic legacy authentication."
Password:
  description: "The password for protected monitoring access. Leave it blank unless you need custom credentials. If you enter a password, also enter a username."
{% endconfiguration_basic %}

### Changing the connection

If the same meter moves to a new address or you need to update its credentials:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **IAMMETER**.
2. Open the {% icon "mdi:dots-vertical" %} menu for the meter's integration entry and select **Reconfigure**.
3. Update the connection details and submit the form.

The integration checks that the address belongs to the original meter. Add a replacement meter as a separate integration entry.

### Existing YAML configuration

Existing IAMMETER entries under `sensor:` in {% term "configuration.yaml" %} are imported automatically. After a successful import, follow the repair notification to remove the imported YAML configuration and restart Home Assistant. Existing entity IDs and your enabled or disabled entity choices are retained.

Use the UI to add meters and change their connection details.

## Supported functionality

### Sensors

Depending on the measurements returned by your meter, the integration provides:

- Voltage, in volts
- Current, in amperes
- Active power, in watts
- Import energy and export energy, in kilowatt-hours
- Reactive power, in vars
- Inductive and capacitive reactive energy, in kilovar-hours

Multi-channel meters also provide frequency and power factor when returned by the meter. Three-phase models provide phase A, B, and C measurements. WEM2067 provides channels A and B, without channel C.

If the meter returns NET measurements, additional sensors provide net voltage, active power, import energy, export energy, frequency, and power factor. A NET current sensor is not provided.

Optional sensors are added when their measurements first appear. If a previously reported measurement is absent from a later response, its sensor becomes unavailable. It recovers when the measurement returns. Missing measurements are not reported as zero.

### Power factor

Power factor uses a unitless ratio by default, such as `0.95`. Earlier versions displayed the same reading as `95%`. If your automations or templates use percentage thresholds, adjust them to match the sensor's unit. An explicitly selected percentage unit is retained.

## Data updates

The integration polls the meter every 30 seconds. There is no integration-specific polling interval setting. An old `scan_interval` value in YAML is ignored, matching the previous integration's fixed polling behavior.

If a read fails, the affected sensors become unavailable. They recover automatically after a successful poll.

## Known limitations

- The meter must return a serial number or a valid, stable MAC address so that the integration can identify it.

## Troubleshooting

### The meter cannot be reached

Check that the meter is connected to your network and that its local monitoring endpoint is reachable from Home Assistant. Check the host, protocol, and port, particularly if the meter's address has changed. A temporary connection failure recovers on a later successful poll.

### The meter rejects authentication

If the meter rejects its configured credentials, Home Assistant asks you to authenticate again. Enter the credentials used for the meter's monitoring access. Leave both credential fields blank if the meter uses anonymous access or the automatic legacy authentication path.

### The address returns a different meter

The integration shows a repair notification if polling returns a different meter identity. Readings continue, so check the configured address promptly to avoid combining readings from different meters in one history. Use **Reconfigure** to restore the original meter's connection. The notification clears when the original meter responds again.

To use a replacement meter, add it separately.

## Community notes

For an overview of other ways to connect IAMMETER meters to Home Assistant, see the [community guide to integration methods](https://community.home-assistant.io/t/four-ways-to-integrate-the-electricity-usage-monitor-iammeter-into-the-home-assistant/485520).

## Removing the integration

{% include integrations/remove_device_service.md %}

If an old IAMMETER YAML entry is still present, remove it as well to prevent it from being imported again after a restart.
