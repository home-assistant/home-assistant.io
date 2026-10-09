---
title: Libre Hardware Monitor
description: Instructions on how to integrate Libre Hardware Monitor within Home Assistant.
ha_category:
  - System monitor
ha_release: '2025.10'
ha_config_flow: true
ha_codeowners:
  - '@Sab44'
ha_iot_class: Local Polling
ha_domain: libre_hardware_monitor
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: device
ha_quality_scale: silver
---

The **Libre Hardware Monitor** {% term integration %} uses your [Libre Hardware Monitor](https://github.com/LibreHardwareMonitor/LibreHardwareMonitor) installation as a source for sensors to display that system information in Home Assistant.

Libre Hardware Monitor, a fork of Open Hardware Monitor, is free software that can monitor the temperature sensors, fan speeds, voltages, load and clock speeds of your computer.

Use this integration to keep an eye on your computer from anywhere, for example while gaming or running heavy workloads. You can also use it to get notified when a value crosses a threshold, such as a GPU running hot.

## Supported devices

Any hardware that Libre Hardware Monitor detects is supported, such as CPUs, GPUs, motherboards, memory, storage drives, and network adapters.

## Prerequisites

- Libre Hardware Monitor version 0.9.5 or later is installed on the system (host) you want to monitor. Earlier versions are not supported. You can download the latest release from the [Libre Hardware Monitor releases page](https://github.com/LibreHardwareMonitor/LibreHardwareMonitor/releases).
- Libre Hardware Monitor must be running during setup.
- In Libre Hardware Monitor, make sure **Options** > **Remote web server** > **Run** is active.
  - Optionally, set up authentication for the web server. You might have to restart the server for this to take effect.
- Make sure to open the inbound port (8085 by default) on the host system's firewall.
- In Libre Hardware Monitor, go to **File** > **Hardware** and check the devices you want to monitor.

### To open a port (on Windows Firewall)

1. In Windows, navigate to **Control Panel** > **System and Security** > **Windows Defender Firewall**.
2. Select **Advanced settings** and highlight **Inbound Rules** in the left pane.
3. Right-click **Inbound Rules** and select **New Rule**.
4. Add the port you need to open and select **Next**.
5. Add the protocol (TCP) and the port number (8085 by default) into the next window and select **Next**.
6. In the next window, select **Allow the connection**, then select **Next**.
7. Select the network type as you see fit and select **Next**.
8. Name the rule and select **Finish**.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: IP address or hostname of the system where Libre Hardware Monitor is running. This is the system you want to monitor.
Port:
  description: The port of your Libre Hardware Monitor API. Defaults to 8085.
{% endconfiguration_basic %}

## Configuration options

The integration provides the following configuration options only if authentication is required:

{% configuration_basic %}
Username:
  description: The username used to access the Libre Hardware Monitor server. Note that this is **not** your Windows username.
Password:
  description: The password used to access the Libre Hardware Monitor server. Note that this is **not** your Windows password.
{% endconfiguration_basic %}

## Supported functionality

The integration mirrors all hardware and sensors that Libre Hardware Monitor shows for the monitored system.

- Each hardware component, such as the CPU or a drive, becomes a device in Home Assistant. The device name starts with the computer name, for example `[MY-PC] NVIDIA GeForce RTX 4080`.
- Each sensor of that hardware becomes a sensor entity, for example temperatures, loads, clock speeds, fan speeds, voltages, power, and data sizes.
- Each sensor has the **Min value** and **Max value** attributes, which show the lowest and highest values recorded by Libre Hardware Monitor.
- When you add or remove hardware in Libre Hardware Monitor (**File** > **Hardware**), the matching devices are added to or removed from Home Assistant automatically.

If you do not require all sensors of a device, you can disable the corresponding entities in the UI.

## Libre Hardware Monitor automation examples

Below are example automations to get notified when something needs your attention.

{% include docs/paste_yaml_tip.md %}

### Automation: Get notified when your GPU is too hot

This automation sends a notification to your phone when the GPU temperature goes above 95 °C.

- **Trigger**: Temperature crossed threshold
  - **Target**: GPU Core (`sensor.my_pc_nvidia_geforce_rtx_4080_gpu_core_temperature`)
  - **Threshold type**: Above (95 °C)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: Your GPU temperature is above 95 °C.

{% details "YAML example for a GPU temperature alert" %}

{% example %}
automation: |
  alias: "Notify when the GPU exceeds safe temperature"
  triggers:
    - trigger: temperature.crossed_threshold
      target:
        entity_id: sensor.my_pc_nvidia_geforce_rtx_4080_gpu_core_temperature
      options:
        threshold:
          type: above
          value:
            number: 95
            unit_of_measurement: "°C"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Your GPU temperature is above 95 °C."
{% endexample %}

{% enddetails %}

### Automation: Get notified when a drive is almost full

This automation sends a notification to your phone when the free space on an NVMe drive drops below 100 GiB. The **Below** value uses the unit the sensor is displayed in, which is GiB by default.

- **Trigger**: Numeric state
  - **Entity**: Free disk space (`sensor.my_pc_samsung_ssd_990_pro_2tb_free_space_data`)
  - **Below**: 100
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: Your NVMe drive has less than 100 GiB of free space left.

{% details "YAML example for a low disk space alert" %}

{% example %}
automation: |
  alias: "Notify when a drive is almost full"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.my_pc_samsung_ssd_990_pro_2tb_free_space_data
      below: 100
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Your NVMe drive has less than 100 GiB of free space left."
{% endexample %}

{% enddetails %}

## Data updates

The integration {% term polling polls %} data from Libre Hardware Monitor every 10 seconds.

When the monitored system is not reachable, for example because it is turned off, its sensors change to `unavailable`. They resume updating once the system is reachable again. If you want to be notified when the connection is lost, create an automation that triggers when a sensor changes to `unavailable`.

## Known limitations

- If Home Assistant starts while the monitored system is offline, the integration shows an error state. It recovers automatically once the system is reachable again.
- A lost connection to the monitored system is not logged as an error, because computers are usually not online all the time.

## Troubleshooting

### Problem with connection during setup

Check if the Libre Hardware Monitor remote web server is running and accessible.
On a device that is **not** the device running Libre Hardware Monitor (a smartphone is sufficient), open a browser and navigate to `http://<IP address>:<Port>`.
Make sure you can see and refresh the data there.

### Libre Hardware Monitor version is not supported

During integration setup, the form might show this message:

> Your version of Libre Hardware Monitor is no longer supported. Please update to version 0.9.5 or later.

Note that Libre Hardware Monitor versions before 0.9.5 do not provide stable sensor data. The integration does not support these versions.

#### Resolution

1. Download version 0.9.5 or later from the [Libre Hardware Monitor releases page](https://github.com/LibreHardwareMonitor/LibreHardwareMonitor/releases).
2. On the system you want to monitor, close Libre Hardware Monitor.
3. Install or extract the new version, then start Libre Hardware Monitor again.
4. Check that **Options** > **Remote web server** > **Run** is still active. You might have to enable it again.
5. In Home Assistant, set up the integration again. If it was set up before, go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Libre Hardware Monitor**, and select **Reload**.

### Integration stops working

Make sure the IP address of the system you are monitoring has not changed. Ideally, set a static IP address for that system in your router.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
