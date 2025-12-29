---
title: eGauge
description: eGauge Energy Monitors
ha_release: 2026.1
ha_category:
  - Energy
ha_quality_scale: bronze
ha_iot_class: Local Polling
ha_codeowners:
  - '@neggert'
ha_domain: egauge
ha_integration_type: device
related:
  - url: https://www.egauge.net/
    title: eGauge Home
ha_platforms:
  - sensor
ha_config_flow: true
---

The **eGauge** {% term integration %} is used to integrate with [eGauge energy monitors](https://www.egauge.net). eGauge provides energy monitors for residential and commercial applications. They are commonly used with solar energy installations. The eGauge integration can expose sensor readings from eGauge devices into Home Assistant, including energy meters that work with the Energy Dashboard.

## Supported devices

This integration supports all eGauge energy monitors running firmware version 4.2 or newer. For instructions on how to check and upgrade the firmware on eGauge devices, see the [eGauge knowledge base](https://kb.egauge.net/configuration/how-to-check-and-upgrade-firmware).

## Prerequisites

### Creating a read-only user account for Home Assistant

This setup is optional but recommended as a security best practice.

1. Go to your eGauge's web dashboard.
2. Select **Settings**, then **Access Control**.
3. Add a new user with privileges set to **Allowed to view all data and settings**.
4. Select **Save**.
5. Select **Change Password** to create a password for the new account.

### Configuring eGauge registers

This setup is optional, but required for integration with the Energy Dashboard.

While eGauge meters are usually configured to measure net usage, Home Assistant needs separate sensors for energy consumed and generated. This section describes how to configure your eGauge to produce these measurements for common installations.

Consult the [eGauge Configuration Guide](https://www.egauge.net/media/support/docs/config-guide.pdf) or ask your installer to determine which type of installation you have. First, follow the basic configuration instructions in the guide. Then, you'll need to create `grid_in` and `grid_out` registers for use with Home Assistant. Note that you can name these whatever you want; you'll select them in the Energy Dashboard configuration screen.

#### Split-phase back-fed

In this installation, solar inverters are wired into your electrical panel.

- `grid_in  = [= ] max(0, $"grid")`
- `grid_out = [= ] max(0, -$"grid")`

#### Direct-feed

In this installation, solar inverters feed directly into the grid.

- `grid_in = [= ] max(0, $"grid"-$"solar")`
- `grid_out = [= ] max(0, $"solar"-$"grid")`

#### Other installations

For prerequisites of other installation types, consult the [eGauge configuration guide](https://www.egauge.net/media/support/docs/config-guide.pdf).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The hostname or IP address of your eGauge device."
Username:
    description: "Username that Home Assistant should use to access your eGauge device. This user must have permission to view data and settings."
Password:
    description: "The password for the configured user."
Uses an SSL certificate:
    description: "Use SSL for a secure connection to the eGauge device. Leave this on if you're not sure."
Verify SSL certificate:
    description: "Verify that the eGauge device's SSL certificate is signed by a trusted certificate authority. By default, eGauge devices use a self-signed certificate, so leave this off unless you've uploaded a custom certificate to your eGauge."
{% endconfiguration_basic %}

## Supported functionality

The **eGauge** integration provides the following entities:

### Sensors

- **Power and energy**: Each power register on the eGauge will appear as two Home Assistant sensors: one reporting current power and the other reporting cumulative total energy usage.

### Data updates

The **eGauge** integration {% term polling polls %} the device every 30 seconds.

## Known limitations

- The integration currently only supports power registers.
- The integration is currently read-only and cannot modify settings on the eGauge device.

## Troubleshooting

### Can’t set up the device

#### Symptom: "Failed to connect"

When trying to set up the integration, the form shows the message "Failed to connect".

##### Resolution

This means that Home Assistant cannot find an eGauge device at the configured host. Double-check the hostname or IP address and make sure it can be reached from your Home Assistant server. You can also check to ensure that Verify SSL certificate is turned off or that the eGauge has been configured with a custom certificate signed by a certificate authority that the Home Assistant server trusts.

#### Symptom: "Invalid authentication"

When trying to set up the integration, the form shows the message "Invalid authentication".

##### Resolution

This means that Home Assistant failed to authenticate using the provided username and password. Double-check that the provided credentials are correct and that the configured user has permission to view data and settings.

### Unexpected sensor values

Check that your eGauge registers are configured correctly for your installation.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
