---
title: Saunum
description: Instructions on how to integrate Saunum sauna control units into Home Assistant.
ha_iot_class: Local Polling
ha_release: 2025.12
ha_codeowners:
  - "@mettolen"
ha_domain: saunum
ha_integration_type: device
ha_config_flow: true
ha_quality_scale: bronze
related:
  - url: https://www.saunum.com/
    title: Saunum
  - url: https://saunum.com/en/product/control-devices/
    title: Saunum Leil product page

---

The **Saunum** {% term integration %} integrates your [Saunum Leil](https://saunum.com/en/product/control-devices/) sauna control unit with Home Assistant. [Saunum](https://saunum.com/) is an Estonian company that creates advanced sauna heaters and control systems with smart features.

With the Leil control unit, you can precisely control temperature, customize your sauna experience, and monitor your sauna's operation.

## Prerequisites

Before setting up the integration, you need to:

1. Have a Saunum Leil sauna control unit installed and connected to your network.
2. Know the IP address of your control unit. You can find this on the Leil touch panel:
   - Navigate to **Settings** > **Modbus Settings**
   - Note the IP address displayed

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The IP address of your Saunum Leil control unit. You can find it in the Leil touch panel under **Settings** > **Modbus Settings**."
{% endconfiguration_basic %}

## Changing temperature unit

The temperature unit displayed in Home Assistant is controlled by your Home Assistant system settings, not by the integration or the Leil touch panel settings.

To change between Celsius and Fahrenheit:

1. Go to {% my general title="**Settings** > **System** > **General**" %}.
2. Under **Unit system**, select either:
   - **Metric** for Celsius (°C)
   - **Imperial** for Fahrenheit (°F)
3. The temperature entities will automatically update to display in your chosen unit.

The Saunum Leil control unit natively operates in Celsius, even if Fahrenheit is selected in the Leil touch panel display settings. Home Assistant automatically converts and displays temperatures in Fahrenheit when the Imperial unit system is selected. Temperature ranges are:

- Celsius: 40-100°C
- Fahrenheit: 104-212°F

## Using the sauna

### Starting a sauna session

1. **Turn on the session** by setting the **Sauna** climate entity to heat mode.
2. **Adjust the target temperature** using climate entity temperature dial (40-100°C / 104-212°F).
3. **Adjust the fan mode** (optional) to control the sauna air circulation fan speed.

Once started, the sauna begins heating to the target temperature and automatically turns off after the configured duration. During an active session, you cannot change the sauna type, sauna duration, or fan duration settings.

### Fan mode settings

The sauna heater has a built-in ventilation fan that helps circulate air and maintain even temperature distribution. You can adjust the fan speed during an active sauna session using the climate entity's fan mode control:

- **Off** (0): Fan is turned off
- **Low** (1): Low fan speed
- **Medium** (2): Medium fan speed
- **High** (3): High fan speed

{% note %}
The fan mode can only be changed when a sauna session is active (heating mode is on). When the sauna is off, the fan mode setting is not available.
{% endnote %}

{% important %}
Never leave a heating sauna unattended for extended periods. Always ensure proper ventilation and never place flammable materials near or on the sauna heater. Sauna surfaces, especially near the heater, can cause severe burns. Use caution when the sauna is hot.

When controlling your sauna remotely through Home Assistant:

- Always verify the sauna is empty before starting a remote heating session.
- Ensure no flammable materials have been left in or near the sauna.
- Set appropriate session durations to prevent prolonged unattended operation.
- Monitor alarm sensors regularly for any safety issues.
{% endimportant %}

## Supported functionality

The **Saunum** integration provides the following entities for controlling and monitoring your sauna.

### Climate

- **Sauna**
  - **Description**: Main climate control for your sauna, allowing you to set target temperature and control heating.
  - **Features**: Temperature control, HVAC modes (off, heat), fan mode (off, low, medium, high).

## Supported devices

The following devices are known to be supported by the integration:

- Saunum Leil touch screen control panel

## Data updates

The **Saunum** integration {% term polling polls %} data from the control unit every 1 minute by default.

## Known limitations

- The integration communicates with the control unit using the Modbus TCP protocol. Ensure your network allows communication on port 502.
- When the sauna session is active, the sauna duration, fan duration, and sauna type cannot be changed.
- The integration does not provide the ability to reboot, which can instead be done via the Leil touch screen control panel.

## Troubleshooting

### Cannot connect to the device

#### Symptom: "Failed to connect to the device"

When trying to set up the integration, you receive an error message that the connection failed.

#### Description

This typically means the control unit is not reachable on your network, or the Modbus TCP settings are incorrect.

#### Resolution

To resolve this issue, try the following steps:

1. Verify the control unit is powered on and connected to your network.
2. Check the IP address on the Leil touch panel:
   - Go to **Settings** > **Modbus Settings**.
   - Verify the IP address matches what you entered.
3. Ensure your Home Assistant instance can reach the control unit:
   - Try pinging the IP address from your Home Assistant host system.
   - Check for firewalls or network segmentation blocking communication.
4. Verify the port **502** is accessible:
   - Check your router and firewall settings.
5. Ensure no other device or software is already communicating with the control unit on the same Modbus connection.

### Entities show as unavailable

#### Symptom: All entities show as "unavailable"

After successful setup, the entities appear but show unavailable status.

#### Description

This indicates the integration successfully connected initially but is now unable to communicate with the control unit.

#### Resolution

1. Check that the control unit is still powered on.
2. Verify network connectivity between Home Assistant and the control unit.
3. Check if the IP address of the control unit has changed (DHCP):
   - Consider setting a static IP address for the control unit in your router.
   - If the IP address changed, remove and re-add the integration with the new address.
4. Restart the Saunum Leil control unit if communication issues persist.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
