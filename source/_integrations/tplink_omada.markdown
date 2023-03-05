---
title: TP-Link Omada
description: Instructions on integrating TP-Link Omada SDN networking devices to Home Assistant.
ha_category:
  - Hub
ha_release: 2023.3
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@MarkGodwin'
ha_domain: tplink_omada
ha_platforms:
  - switch
ha_integration_type: hub
---

The TP-Link Omada SDN Controller integration allows you to control your [TP-Link Omada SDN Devices](https://www.tp-link.com/us/omada-sdn/) such as network switches, access points, and internet gateways. It requires a local Omada controller (software or hardware controllers) and does not currently support the paid-for TP-Link Omada Cloud Management SAAS Platform.

The integration provides basic configuration and status of Omada devices controlled by the controller. All supported devices connected to the controller will be added to Home Assistant.

{% include integrations/config_flow.md %}

- Host: Enter the URL of the Omada management interface.
- Verify SSL Certificates: Enable to check the validity of the certificate presented by the Omada controller.
- Username/Password: A user account with permissions to view & configure the site is required.

### Multiple Sites
If you have multiple sites managed by your controller, you will be prompted to choose which site to manage.

## Supported Controllers

TP-Link Omada Controller:

- OC200
- OC300
- Software Controller.

Controller versions 5.0.0 and later are supported.

## Supported Omada devices

### Network Switches

- Support for enabling/disabling Power over Ethernet on a per-port basis.

### Access Points

- Not currently supported.

### Internet Gateways

- Not currently supported.

## Device Trackers

- Not currently supported.
