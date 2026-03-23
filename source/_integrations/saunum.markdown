---
title: Saunum
description: Instructions on how to integrate Saunum sauna control units into Home Assistant.
ha_iot_class: Local Polling
ha_release: 2025.12
ha_codeowners:
  - '@mettolen'
ha_domain: saunum
ha_integration_type: device
ha_config_flow: true
ha_quality_scale: platinum
related:
  - url: https://www.saunum.com/
    title: Saunum
  - url: https://saunum.com/en/product/control-devices/
    title: Saunum Leil product page
ha_category:
  - Climate
ha_platforms:
  - binary_sensor
  - climate
  - diagnostics
  - light
  - number
  - sensor
---

The **Saunum** {% term integration %} integrates your [Saunum Leil](https://saunum.com/en/product/control-devices/) sauna control unit with Home Assistant. [Saunum](https://saunum.com/) is an Estonian company that creates advanced sauna heaters and control systems with smart features.

With the Leil control unit, you can precisely control temperature, customize your sauna experience, and monitor your sauna's operation.

## Supported devices

The following devices are known to be supported by the integration:

- Saunum Leil touch screen control panel

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

{% details "Changing temperature unit" %}

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

{% enddetails %}

## Using the sauna

### Starting a sauna session

1. **Turn on the session** by setting the **Sauna** climate entity to heat mode.
2. **Adjust the target temperature** using climate entity temperature dial (40-100°C / 104-212°F).
3. **Adjust the fan mode** (optional) to control the sauna air circulation fan speed.

Once started, the sauna begins heating to the target temperature and automatically turns off after the configured duration. During an active session, you cannot change the sauna type, sauna duration, or fan duration settings.

{% note %}
You cannot start a sauna session when the sauna door is open. The control unit will prevent heating from starting as a safety measure. Close the sauna door before attempting to start a heating session. You can monitor the door status using the **Door open** binary sensor.
{% endnote %}

### Sauna type preset modes

The Saunum Leil control unit supports three sauna type presets that can store different configurations for temperature, sauna duration, and fan duration. These presets allow you start your sauna session with different settings quickly.

You can select the active preset using the climate entity's preset mode control. The preset determines the default values for temperature, duration, and fan settings when starting a sauna session.

{% note %}
The preset mode (sauna type) can only be changed when the sauna session is not active.
{% endnote %}

#### Customizing preset names

Preset names can be configured on the Saunum Leil control unit itself. You can also customize the preset names in Home Assistant to match the names configured on your device:

1. Go to the Saunum integration in {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select **Configure** for your Saunum Leil device.
3. Enter custom names for each of the three sauna type presets to match those configured on your Leil touch panel (for example, **Finnish Sauna**, **Quick Session**, **Deep Heat**).
4. Select **Submit** to save your changes.

The custom preset names will immediately appear in the climate entity's preset mode selector, making it easier to identify and select your preferred sauna configuration.

### Fan mode settings

The sauna heater has a built-in ventilation fan that helps circulate air and maintain even temperature distribution. You can adjust the fan speed during an active sauna session using the climate entity's fan mode control:

- **Off** (0): Fan is turned off
- **Low** (1): Low fan speed
- **Medium** (2): Medium fan speed
- **High** (3): High fan speed

{% note %}
The fan mode can only be changed when a sauna session is active (heating mode is on). When the sauna is off, the fan mode setting is not available.
{% endnote %}

{% warning %}
**Fire and burn hazards**: Flammable materials such as towels, clothes, or cleaning supplies left on or near the sauna heater can ignite and cause fire, leading to property damage, serious injury, or death. Hot sauna surfaces can cause severe burns.

Never leave a heating sauna unattended for extended periods. Always ensure proper ventilation and never place flammable materials near or on the sauna heater. Keep the sauna area clear of combustible items before starting a heating session.

{% details "Remote control safety guidelines" %}

When controlling your sauna remotely through Home Assistant:

- Always verify the sauna is empty before starting a remote heating session.
- Ensure no flammable materials have been left in or near the sauna.
- Set appropriate session durations to prevent prolonged unattended operation.
- Monitor alarm sensors regularly for any safety issues.
- Sauna surfaces, especially near the heater, can cause severe burns. Use caution when the sauna is hot.

{% enddetails %}

{% endwarning %}

## Supported functionality

The **Saunum** integration provides the following entities.

### Climate

- **Sauna**
  - **Description**: Main climate control for your sauna, allowing you to set target temperature and control heating.
  - **Features**: Temperature control, HVAC modes (off, heat), fan mode (off, low, medium, high), preset mode (sauna type selection).

### Lights

- **Sauna light**
  - **Description**: Control the sauna lighting if light is connected to the control unit.
  - **Features**: Turn the sauna light on or off.

### Numbers

- **Sauna duration**
  - **Description**: Configure how long the sauna session will run before automatically turning off.
  - **Unit**: Minutes
  - **Range**: 1-720 minutes (0-12 hours)
  - **Default**: 120 minutes (2 hours) when not set
  - **Remarks**: Cannot be changed during an active sauna session.

- **Fan duration**
  - **Description**: Configure how long the sauna air circulation fan runs before automatically turning off.
  - **Unit**: Minutes
  - **Range**: 1-30 minutes
  - **Default**: 15 minutes when not set
  - **Remarks**: Cannot be changed during an active sauna session.

### Sensors

- **Temperature**
  - **Description**: Current temperature inside the sauna.
  - **Unit**: °C (Celsius) or °F (Fahrenheit) depending on your Home Assistant unit system.

- **Heater elements active**
  - **Description**: Number of active heating elements (0-3).
  - **Use case**: Monitor heating intensity and power consumption.

- **On time**
  - **Description**: Total accumulated operating time of the Leil touch screen control panel since last restart.
  - **Unit**: Seconds
  - **Remarks**: This sensor is disabled by default. Enable it in the entity settings if you want to track usage statistics.

### Binary sensors

- **Door open**
  - **Description**: Indicates whether the sauna door is currently open.
  - **Device class**: Door
  - **Use case**: Monitor sauna door status for safety and automation purposes.

- **Door open during heating alarm**
  - **Description**: Safety alarm triggered when the sauna door is opened while the heater is actively running.
  - **Device class**: Problem
  - **Category**: Diagnostic
  - **Use case**: Important safety alert to prevent overheating and ensure safe operation.

- **Door open too long alarm**
  - **Description**: Alarm triggered when the sauna door has been left open for an extended period.
  - **Device class**: Problem
  - **Category**: Diagnostic
  - **Use case**: Alerts you to potential energy waste or forgotten open door.

- **Thermal cutoff alarm**
  - **Description**: Critical safety alarm triggered when the thermal safety cutoff has activated due to excessive heat.
  - **Device class**: Problem
  - **Category**: Diagnostic
  - **Use case**: Immediate attention required - indicates a serious overheating condition.

- **Internal temperature alarm**
  - **Description**: Alarm triggered when the internal electronics temperature is too high.
  - **Device class**: Problem
  - **Category**: Diagnostic
  - **Use case**: Indicates potential ventilation or cooling issues with the control unit.

- **Temperature sensor shorted alarm**
  - **Description**: Diagnostic alarm indicating the temperature sensor has a short circuit.
  - **Device class**: Problem
  - **Category**: Diagnostic
  - **Use case**: Sensor malfunction requiring technical service.

- **Temperature sensor disconnected alarm**
  - **Description**: Diagnostic alarm indicating the temperature sensor is disconnected or has an open circuit.
  - **Device class**: Problem
  - **Category**: Diagnostic
  - **Use case**: Sensor connection issue requiring technical service.

{% important %}
Monitor the alarm binary sensors regularly. Any active alarm sensor indicates a potential safety or operational issue that should be addressed immediately. The sauna heater will automatically shut down when safety alarms are triggered.
{% endimportant %}

## Actions

The **Saunum** integration provides the following actions.

### Action: Start session

The `saunum.start_session` action starts a sauna session with custom duration, target temperature, and fan duration. This action provides more granular control than the climate entity, allowing you to specify all session parameters in a single call.

- **Data attribute**: `entity_id`
  - **Description**: The entity ID of the Saunum climate entity.
  - **Required**: Yes

- **Data attribute**: `duration`
  - **Description**: Session duration as a time period (for example, `{"hours": 2}`). Defaults to 2 hours.
  - **Required**: No

- **Data attribute**: `target_temperature`
  - **Description**: Target temperature in Celsius (40-100). Defaults to 80.
  - **Required**: No

- **Data attribute**: `fan_duration`
  - **Description**: Fan duration as a time period (for example, `{"minutes": 10}`). Defaults to 10 minutes.
  - **Required**: No

{% note %}
You cannot start a sauna session when the sauna door is open. The control unit will prevent heating as a safety measure.
{% endnote %}

#### Example

```yaml
action: saunum.start_session
target:
  entity_id: climate.saunum_leil
data:
  duration:
    hours: 2
  target_temperature: 80
  fan_duration:
    minutes: 10
```

## Automations

Examples of automations you can create using the Saunum integration.

### Sauna ready notification with light

Send a notification and turn on the sauna light when the target temperature is reached.

<!-- markdownlint-disable MD034 -->
{% my blueprint_import badge blueprint_url="https://community.home-assistant.io/t/sauna-ready-notification-with-light-saunum/986784" %}
<!-- markdownlint-enable MD034 -->

{% details "Example YAML configuration" %}

{% raw %}

```yaml
alias: "Sauna ready notification with light"
description: >-
  Sends a notification and turns on the sauna light when the target
  temperature is reached.

mode: restart

variables:
  sauna_climate: climate.saunum_leil
  notification_title: "Sauna is Ready!"
  notification_message: "Your sauna has reached {target_temperature}°C. Enjoy!"

triggers:
  - trigger: state
    entity_id: climate.saunum_leil
    to: "heat"
    from: "off"
    id: session_start

actions:
  - wait_template: >-
      {% set current = state_attr(sauna_climate, 'current_temperature') | float(0) %}
      {% set target = state_attr(sauna_climate, 'temperature') | float(0) %}
      {{ current >= target }}
    continue_on_timeout: false
  - action: light.turn_on
    target:
      entity_id: light.saunum_leil
  - action: notify.mobile_app_your_phone
    data:
      title: "{{ notification_title }}"
      message: >-
        {% set target_temperature = state_attr(sauna_climate, 'temperature') | int %}
        {{ notification_message.replace('{target_temperature}', target_temperature | string) }}

```

{% endraw %}

{% enddetails %}

## Data updates

The **Saunum** integration {% term polling polls %} data from the control unit every 1 minute by default.

## Known limitations

- The integration communicates with the control unit using the Modbus TCP protocol. Ensure your network allows communication on port 502.
- When the sauna session is active, the sauna duration, fan duration, and sauna type cannot be changed.
- The integration does not provide the ability to reboot, which can instead be done via the Leil touch screen control panel.

## Troubleshooting

{% details "Cannot connect to the device" %}

**Symptom:** "Failed to connect to the device"

When trying to set up the integration, you receive an error message that the connection failed.

This typically means the control unit is not reachable on your network, or the Modbus TCP settings are incorrect.

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

{% enddetails %}

{% details "Entities show as unavailable" %}

**Symptom:** All entities show as "unavailable"

After successful setup, the entities appear but show unavailable status.

This indicates the integration successfully connected initially but is now unable to communicate with the control unit.

1. Check that the control unit is still powered on.
2. Verify network connectivity between Home Assistant and the control unit.
3. Check if the IP address of the control unit has changed (DHCP):
   - Consider setting a static IP address for the control unit in your router.
   - If the IP address changed, remove and re-add the integration with the new address.
4. Restart the Saunum Leil control unit if communication issues persist.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
