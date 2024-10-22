---
title: Fing
description: "Instructions on integrating your Fing Agent with Home Assistant"
ha_release: "2024.11"
ha_category: 
    - Presence detection
ha_platforms:
    - device_tracker
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Lorenzo-Gasparini'
ha_domain: fing
ha_integration_type: integration
---

The [Fing](https://www.fing.com/) {% term integration %} enables you to retrieve device data from your network, create your personal device inventory, and use it to optimize your automations. The **Fing integration** allows you to retrieve device information through the [local API](https://www.fing.com/developers/local-api/) exposed by Fing agents ([Fing Agent](https://www.fing.com/fing-agent/), Fingbox, [Fing Desktop](https://www.fing.com/fing-desktop/)). 

## Prerequisites

- This integration leverages the [Local API](https://www.fing.com/developers/local-api/) provided by the Fing Agent to seamlessly connect Home Assistant with the device information gathered by the Agent, so make sure the Local API is enabled on your Fing Agent for proper functionality.

- To configure the integration you will need the IP address, port, and API key of your Fing Agent.

{% include integrations/config_flow.md %}

## Troubleshooting

If you encounter issues while using the Fing integration, consider the following steps:

- Ensure that the Fing agent is running and accessible on the network.
- Verify that the IP address and port configured in the integration settings are correct.
- Ensure that the local API version is 1.1.0 or newer.
