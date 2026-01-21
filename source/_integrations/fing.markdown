---
title: Fing
description: Instructions on integrating your Fing Agent with Home Assistant
ha_release: '2025.11'
ha_category:
  - Presence detection
ha_platforms:
  - device_tracker
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Lorenzo-Gasparini'
ha_domain: fing
ha_integration_type: service
ha_quality_scale: bronze
---

The **Fing** {% term integration %} allows Home Assistant to retrieve detailed information about the devices on your local network. [Fing](https://www.fing.com/) helps home users and IT professionals monitor, protect, and understand their networks with intuitive tools that make connectivity management simple and effective. 
By connecting through the [Local API](https://www.fing.com/developers/local-api/), Fing automatically builds and synchronizes an inventory of devices to detect online presence and trigger automations.

## Prerequisites

- Ensure that the [Local API](https://www.fing.com/developers/local-api/) is enabled on your Fing Agent ([Fing Agent](https://www.fing.com/agent/), Fingbox, or [Fing Desktop](https://www.fing.com/desktop/)).
- You will need your Fing Agent’s IP address, port, and API key to complete the setup.

{% include integrations/config_flow.md %}

## Troubleshooting

If you experience issues with the **Fing integration**, try the following:

- Confirm that the Fing Agent is running and reachable on your network.
- Verify that the configured IP address and port in Home Assistant match your Fing Agent’s actual settings.
- Make sure your Local API version is **1.1.0** or newer.

## Removing the integration

You can remove this integration following the standard Home Assistant procedure.

{% include integrations/remove_device_service.md %}

Once the integration is deleted, you may also disable the Fing Local API on your network if you no longer plan to use it.
