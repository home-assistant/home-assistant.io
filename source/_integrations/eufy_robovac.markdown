---
title: Eufy RoboVac
description: Instructions on how to integrate Eufy RoboVac devices into Home Assistant.
ha_category:
  - Vacuum
ha_iot_class: Local Polling
ha_release: 2026.10
ha_config_flow: true
ha_codeowners:
  - '@m17kea'
ha_domain: eufy_robovac
ha_platforms:
  - vacuum
ha_integration_type: device
ha_quality_scale: bronze
---

The **Eufy RoboVac** {% term integration %} allows you to monitor and control a supported Eufy RoboVac through Home Assistant.

Your Eufy account credentials are used during setup to discover the vacuum and retrieve the local connection details. The credentials are not stored. After setup, Home Assistant polls and controls the vacuum directly over your local network.

## Supported devices

The integration supports the Eufy RoboVac G30 Hybrid (`T2253`). Other Eufy RoboVac models are not supported.

## Prerequisites

- Add the vacuum to your Eufy account using the Eufy app before setting up the integration.
- Connect Home Assistant and the vacuum to networks that can communicate with each other.
- Assign the vacuum a Dynamic Host Configuration Protocol (DHCP) reservation or static IP address so its address does not change.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: "Email address for your Eufy account. It is used only during setup and is not stored."
Password:
  description: "Password for your Eufy account. It is used only during setup and is not stored."
RoboVac:
  description: "RoboVac discovered from your Eufy account that you want to add."
Host:
  description: "IP address or hostname of the selected RoboVac. If discovery does not find its current address, enter it manually."
Protocol version:
  description: "Local Tuya protocol version used by the RoboVac. The T2253 uses version `3.3`."
{% endconfiguration_basic %}

## Data updates

The integration polls the vacuum over the local network every 30 seconds.

## Supported functionality

The vacuum entity reports its current activity and supports the following controls:

- Start cleaning
- Pause cleaning
- Return to base

## Eufy RoboVac automation examples

To start cleaning at 09:00 every weekday, use an automation such as this:

```yaml
automation:
  - alias: "Start weekday vacuum cleaning"
    triggers:
      - trigger: time
        at: "09:00:00"
    conditions:
      - condition: time
        weekday:
          - mon
          - tue
          - wed
          - thu
          - fri
    actions:
      - action: vacuum.start
        target:
          entity_id: vacuum.hall_vacuum
```

Replace `vacuum.hall_vacuum` with your vacuum entity ID.

## Known limitations

- Only the Eufy RoboVac G30 Hybrid (`T2253`) is supported.
- Home Assistant must be able to reach the vacuum on the local network for state updates and commands.
- If the vacuum's network address changes, remove and add the integration again with the current host address.
- The Eufy and Tuya interfaces used for discovery and local control are unofficial and may change without notice.

## Troubleshooting

### The vacuum cannot be reached during setup

Confirm that the vacuum is online and reachable from the Home Assistant network. If discovery shows an incorrect host, enter the vacuum's current IP address. Keep protocol version `3.3` for the T2253.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

Removing the integration from Home Assistant does not remove the vacuum from your Eufy account and does not factory-reset the device.
