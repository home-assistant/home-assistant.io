---
title: TIS Control
description: Instructions on how to integrate your TIS Control devices with home assistant.
ha_release: 0.1.4
ha_category:
  - Network
  - Notifications
ha_iot_class: Local Polling
ha_domain: tis_control
ha_platforms:
  - switch
ha_codeowners:
  - '@Mustafa744'
ha_integration_type: integration
---

The TIS Control integration makes it possible to integrate and control TIS Control devices within Home Assistant.

## Configuration

To enable the integration, go to the integrations page inside the configuration panel and add the TIS Control integration. You will be asked to enter the port number for the UDP communication. The default port is 6000.
After this you can use TIS Device manager to add the devices you want to control.
