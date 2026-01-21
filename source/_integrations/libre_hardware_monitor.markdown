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
  - sensor
ha_integration_type: device
ha_quality_scale: silver
---

The **Libre Hardware Monitor** {% term integration %} uses your [Libre Hardware Monitor](https://github.com/LibreHardwareMonitor/LibreHardwareMonitor) installation as a source for sensors to display that system information in Home Assistant.

Libre Hardware Monitor, a fork of Open Hardware Monitor, is free software that can monitor the temperature sensors, fan speeds, voltages, load and clock speeds of your computer.

## Prerequisites

- Libre Hardware Monitor is installed on the system (host) you want to monitor.
- Libre Hardware Monitor must be running during setup.
- In Libre Hardware Monitor, make sure **Remote web server** is active.
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
host:
  description: IP address or hostname of the system where Libre Hardware Monitor is running. This is the system you want to monitor.
port:
  description: The port of your Libre Hardware Monitor API. Defaults to 8085.
{% endconfiguration_basic %}

## Configuration options

All sensors will be grouped by the device they belong to. If you do not want all sensors for a device, you can disable entities via the UI after setup.

## Known limitations

Currently, setting up authentication for the Libre Hardware Monitor remote web server is not supported.

## Troubleshooting

### Problem with connection during setup

Check if the Libre Hardware Monitor remote web server is running and accessible.
On a device that is **not** the device running Libre Hardware Monitor (a smartphone is sufficient), open a browser and navigate to `http://<IP address>:<Port>`.
Make sure you can see and refresh the data there.

### Sensors change to `unavailable` status

This is expected behavior when the system you are monitoring is not reachable. Usually, because it is turned off.
Sensors will resume their data readings once the system is reachable again.  
Note that connection loss to the host will not trigger error logs. If you want to be notified in case the connection is lost,
you can create an automation that triggers if a sensor's state switches to `unavailable`.

### Integration stops working

Make sure the IP address of the system you are monitoring has not changed. Ideally, set a static IP address for that system in your router.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
