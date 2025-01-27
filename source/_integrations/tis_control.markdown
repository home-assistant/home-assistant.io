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
  - '@karimtis'
  - '@Mustafa744'

ha_integration_type: integration
---

The TIS Control integration makes it possible to integrate and control TIS Control devices within Home Assistant.
For full list of the products visit https://www.tiscontrol.com/.
currently the integration only supports switch devices aka (RCU, RELAY) devices.
To use the integration you need to have one or more supported device connected to the same local network and know which communication port they are using (default for TIS Control devices is udp 6000).

## Configuration

To enable the integration, go to the integrations page inside the configuration panel and add the TIS Control integration. You will be asked to enter the port number for the UDP communication. The default port is 6000.
After this the integration will scan the network and add the devices automatically to your Home Assistant device list under the TIS Control Integration.