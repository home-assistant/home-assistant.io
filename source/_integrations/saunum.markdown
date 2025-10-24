---
title: Saunum Leil
description: Instructions on how to integrate Saunum Leil sauna control units into Home Assistant.
ha_iot_class: Local Polling
ha_release: 2025.12.0
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

The **Saunum Leil** {% term integration %} integrates your [Saunum Leil](https://saunum.com/en/product/control-devices/) sauna control unit with Home Assistant. [Saunum](https://saunum.com/) is an Estonian company that creates advanced sauna heaters and control systems with smart features.

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
Port:
    description: "The port number for Modbus TCP communication (default: 502)."
{% endconfiguration_basic %}

## Configuration options

After initial setup, you can customize the sauna type names to match the names configured on your Leil touch panel through the integration options:

{% configuration_basic %}
Sauna type 1 name:
    description: Custom display name for sauna type 1 (default is "Sauna type 1").
Sauna type 2 name:
    description: Custom display name for sauna type 2 (default is "Sauna type 2").
Sauna type 3 name:
    description: Custom display name for sauna type 3 (default is "Sauna type 3").
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

There are two ways to start a sauna session through Home Assistant:

#### Method 1: Using a sauna type preset

1. **Select a sauna type** using the **Sauna type** select entity (Sauna type 1, 2, or 3).
   - This automatically configures the target temperature, sauna duration, and fan duration based on the preset configured on your Leil touch panel.
2. **Ensure the sauna door is closed**. The session cannot start if the door is open.
3. **Turn on the session** by activating the **Session active** switch entity or setting the **Sauna** climate entity to heat mode.

#### Method 2: Using manual settings

1. **Set the target temperature** using the **Target temperature** number entity (40-100°C / 104-212°F).
2. **Configure session duration** using the **Sauna duration** number entity (0-720 minutes).
3. **Configure fan duration** using the **Fan duration** number entity (0-30 minutes).
4. **Ensure the sauna door is closed**. The session cannot start if the door is open.
5. **Turn on the session** by activating the **Session active** switch entity or setting the **Sauna** climate entity to heat mode.

Once started, the sauna begins heating to the target temperature and automatically turns off after the configured duration. During an active session, you cannot change the sauna type, sauna duration, or fan duration settings.

{% important %}
Never leave a heating sauna unattended for extended periods. Always ensure proper ventilation and never place flammable materials near or on the sauna heater. Sauna surfaces, especially near the heater, can cause severe burns. Use caution when the sauna is hot.

When controlling your sauna remotely through Home Assistant:

- Always verify the sauna is empty before starting a remote heating session.
- Ensure no flammable materials have been left in or near the sauna.
- Set appropriate session durations to prevent prolonged unattended operation.
- Monitor alarm sensors regularly for any safety issues.
{% endimportant %}

## Supported functionality

The **Saunum Leil** integration provides the following entities for controlling and monitoring your sauna.

### Climate

- **Sauna**
  - **Description**: Main climate control for your sauna, allowing you to set target temperature and control heating.
  - **Features**: Temperature control, HVAC modes (off, heat).

### Switches

- **Session active**
  - **Description**: Starts or stops a sauna session. When turned on, the sauna heats to the target temperature and runs for the configured duration. The session cannot start when the sauna door is open.

### Lights

- **Light**
  - **Description**: Controls the sauna interior lighting if the light is connected.

### Binary sensors

- **Door**

  - **Description**: Shows whether the sauna door is open or closed.

- **Alarm door open**

  - **Description**: Indicates if the door has been left open too long during heating.

- **Alarm door sensor**

  - **Description**: Indicates a malfunction with the door sensor.

- **Alarm thermal cutoff**

  - **Description**: Indicates the thermal safety cutoff has been triggered.

- **Alarm internal temperature**

  - **Description**: Indicates the internal temperature has exceeded safe limits.

- **Alarm temperature sensor shorted**

  - **Description**: Indicates the temperature sensor has a short circuit.

- **Alarm temperature sensor not connected**
  - **Description**: Indicates the temperature sensor is not properly connected.

### Sensors

- **Current temperature**

  - **Description**: The current temperature inside the sauna.

- **On time**

  - **Description**: Total time the Leil touch panel has been running since the last reset.

- **Remaining time**

  - **Description**: Time remaining in the current sauna session.

- **Heater elements active**

  - **Description**: Number of heater elements currently active.

- **Fan speed**

  - **Description**: Current fan speed setting as an integer.

- **Sauna type**
  - **Description**: Current sauna type as an integer.

### Numbers

- **Target temperature**

  - **Description**: Set the desired sauna temperature (40-100°C / 104-212°F).

- **Sauna duration**

  - **Description**: Sets how long the sauna session should run (0-720 minutes). Cannot be changed when the sauna session is active.

- **Fan duration**
  - **Description**: Sets how long the fan should run when turned on (0-30 minutes). Cannot be changed when the sauna session is active.

### Selects

- **Fan speed**

  - **Description**: Starts the fan with the selected speed when the sauna session is active. The fan cannot be started when the sauna session is not active.
  - **Options**: Off, Low, Medium, High.

- **Sauna type**
  - **Description**: Selects a preset sauna experience type. Cannot be changed when the sauna session is active. Sauna type settings can be changed from the Leil touch panel.
  - **Options**: Sauna type 1, Sauna type 2, Sauna type 3 (names can be customized in configuration options).

## Data updates

The **Saunum Leil** integration {% term polling polls %} data from the control unit every 5 seconds by default to ensure responsive control and monitoring.

## Known limitations

- The integration communicates with the control unit using the Modbus TCP protocol. Ensure your network allows communication on the configured port (default 502).
- Temperature readings and controls are provided in the native Celsius scale, with automatic conversion to Fahrenheit for display when needed.
- When the sauna session is active, the sauna duration, fan duration, and sauna type cannot be changed.

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
4. Verify the port number (default is 502):
   - Some networks may require a different port.
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

### Alarm sensors are triggered

#### Symptom: One or more alarm binary sensors show an active state

#### Description

The control unit has detected a safety issue or malfunction.

#### Resolution

1. Check the specific alarm that is triggered:
   - **Door alarms**: Ensure the door is properly closed and the sensor is functioning.
   - **Temperature sensor alarms**: Check sensor connections and wiring.
   - **Thermal cutoff alarm**: Allow the unit to cool down and check for ventilation issues.
   - **Internal temperature alarm**: Stop using the sauna and investigate overheating causes.
2. Consult the Saunum Leil user manual for detailed troubleshooting of specific alarms.
3. Contact [Saunum support](https://saunum.com/en/contact-us/) if alarms persist after basic troubleshooting.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
