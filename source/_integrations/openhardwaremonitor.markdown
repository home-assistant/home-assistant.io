---
title: Open Hardware Monitor
description: Instructions on how to integrate Open Hardware Monitor within Home Assistant.
ha_category:
  - System monitor
ha_release: 0.48
ha_iot_class: Local Polling
ha_domain: openhardwaremonitor
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `openhardwaremonitor` {% term integration %} uses your [Open Hardware Monitor](https://openhardwaremonitor.org/) installation as a source for sensors that will display system information.

## Setup

OpenHardwareMonitor must be running on the host, with "Remote web server" active. You also need to open inbound port (TCP 8085) on the host..

To open port (on Windows):

1. Navigate to Control Panel, System and Security and Windows Firewall.
2. Select **Advanced settings** and highlight **Inbound Rules** in the left pane.
3. Right click Inbound Rules and select New Rule.
4. Add the port you need to open and click Next.
5. Add the protocol (TCP) and the port number (8085) into the next window and click Next.
6. Select Allow the connection in the next window and hit Next.
7. Select the network type as you see fit and click Next.
8. Name the rule and click Finish.

To open port with `firewalld` (Linux):

```bash
sudo firewall-cmd --permanent --add-port=8085/tcp
sudo firewall-cmd --reload
```

## Configuration

To add Open Hardware Monitor to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: openhardwaremonitor
    host: IP_ADDRESS
```

{% configuration %}
  host:
    description: The IP address or hostname of the system where Open Hardware Monitor is running.
    required: true
    type: string
  port:
    description: The port of your Open Hardware Monitor API. Defaults to 8085.
    required: false
    type: integer
{% endconfiguration %}
