---
title: TP-Link Omada
description: Instructions on integrating TP-Link Omada SDN networking devices to Home Assistant.
ha_category:
  - Hub
  - Update
ha_release: 2023.3
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@MarkGodwin'
ha_domain: tplink_omada
ha_platforms:
  - binary_sensor
  - device_tracker
  - sensor
  - switch
  - update
ha_integration_type: hub
---

The **TP-Link Omada** {% term integration %} allows you to control your [TP-Link Omada SDN Devices](https://www.tp-link.com/omada-sdn/) such as network switches, access points, and internet gateways.

The integration provides basic configuration and status of Omada devices controlled by the controller. All supported devices connected to the controller will be added to Home Assistant.

## Prerequisites

- You need a local TP-Link Omada SDN infrastructure
- A local Omada controller
  - The TP-Link Omada Cloud Management SaaS Platform is not supported
- It is recommended to create a dedicated account for Home Assistant to use
  - The user needs permissions to view and configure the site that you want to manage

{% note %}
A local account must be used for login. Do not turn on two-factor authentication for local accounts, or the integration will not be able to log in.
{% endnote %}

### Supported Controllers

TP-Link Omada Controller:

- OC200
- OC300
- Software Controller

Controller versions 5.1.0 and later are supported.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "Enter the URL of the Omada management interface. You can get this from your Omada web management interface."
Verify SSL Certificates:
    description: "Un-check this box if you are using an HTTPS URL and you have not installed a matching device certificate for the Omada controller."
Username:
    description: "Enter the username of the Omada controller user for Home Assistant to connect as. Make sure the user has sufficient privileges to manage the Omada network."
Password:
    description: "Enter the password for the user."
Site:
    description: "If your controller manages multiple sites, you will need to select which site to manage from the drop-down."
{% endconfiguration_basic %}

### Multiple Sites

The integration manages all of the devices in an Omada site. If you have multiple sites managed by your controller, you can set up an instance of the integration to manage each site, if needed.

## Supported Omada devices

All adopted Omada devices expose:

- Device status sensors
- CPU and Memory percentage sensors
- Firmware updates

### Network switches

- Support for enabling/disabling Power over Ethernet on a per-port basis

### Internet gateways

- WAN/LAN Port connectivity sensors
- WAN Port Online detection sensors
- WAN Port Connect/Disconnect switches
- LAN Port PoE activity sensor

## Device trackers

The integration can track Wi-Fi devices connected to access points managed by the TP-Link Omada controller. All known Wi-Fi clients will be initially created in a disabled state. You then need to enable the entities that you want to track.

### Data updates

The TP-Link Omada integration fetches data from the Omada Controller every 5 minutes by default. If you want to increase the polling frequency of client updates, follow [these instructions](https://www.home-assistant.io/common-tasks/general/#defining-a-custom-polling-interval). You only need to request a refresh from one of the tracked devices, all of the tracked devices will be refreshed at the same time.

Note: The TP-Link Omada controller takes a few minutes to detect when a client disconnects from the Wi-Fi network, even with more regular polling updates.

## Actions

The integration provides the following actions.

### Action: Reconnect client

The `tplink_omada.reconnect_client` action is used to force a Wi-Fi client to reconnect to the network. This is useful if you have a troublesome client network connection that needs to be reset.

- **Data attribute**: `config_entry_id`
  - **Description**: The instance of the Omada integration that the Wi-Fi client is connected to.
  - **Optional**: Yes
- **Data attribute**: `mac`
  - **Description**: The MAC address of the Wi-Fi client to reconnect.
  - **Optional**: No

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

If you created a user account on your Omada controller for the integration to use, you could remove this.
