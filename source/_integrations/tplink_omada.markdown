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

The TP-Link Omada SDN Controller integration allows you to control your [TP-Link Omada SDN Devices](https://www.tp-link.com/omada-sdn/) such as network switches, access points, and internet gateways. It requires a local Omada controller (software or hardware controllers) and does not currently support the paid-for TP-Link Omada Cloud Management SAAS Platform.

The integration provides basic configuration and status of Omada devices controlled by the controller. All supported devices connected to the controller will be added to Home Assistant.

{% include integrations/config_flow.md %}

- Host: Enter the URL of the Omada management interface.
- Verify SSL Certificates: Enable to check the validity of the certificate presented by the Omada controller.
- Username/Password: A user account with permissions to view & configure the site is required.

{% note %}
A local account must be used for login. Do not turn on two-factor authentication for local accounts, or the integration will not be able to log in.
{% endnote %}

### Multiple Sites

If you have multiple sites managed by your controller, you will be prompted to choose which site to manage.

## Supported Controllers

TP-Link Omada Controller:

- OC200
- OC300
- Software Controller

Controller versions 5.1.0 and later are supported.

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

If you want to increase the polling frequency of client updates, follow [these instructions](https://www.home-assistant.io/common-tasks/general/#defining-a-custom-polling-interval). You only need to request a refresh from one of the tracked devices, all of the tracked devices will be refreshed at the same time.

Note: The TP-Link Omada controller takes a few minutes to detect when a client disconnects from the Wi-Fi network, even with more regular polling updates.
