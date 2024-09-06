---
title: Fing
description: "Instructions on integrating your Fing Agent with Home Assistant"
ha_release: "0.1"
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

Integrate [Fing Agents](https://www.fing.com/fing-agent/) with Home Assistant to enhance your presence detection.

## Fing Local API

This integration leverages the [Local API](https://help.fing.com/hc/en-us/articles/10212457020060-Connect-3rd-Party-Apps-to-Fing-Local-API#h_01HA9YA44XMDDESE68FWAZXX96) provided by the Fing Agent to seamlessly connect Home Assistant with the device information gathered by the Agent, so make sure the Local API is enabled on your Fing Agent for proper functionality.

To configure the integration you will need the IP address, port, and API key of your Fing Agent.

{% include integrations/config_flow.md %}

## Troubleshooting

If you encounter issues while using the Fing integration, consider the following steps:

- Ensure that the Fing agent is running and accessible on the network.
- Verify that the IP address and port configured in the integration settings are correct.
- Ensure that the local API version is 1.1.0 or newer.
