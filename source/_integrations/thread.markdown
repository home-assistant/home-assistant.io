---
title: Thread
ha_category:
  - Other
ha_release: 2023.2
ha_codeowners:
  - '@home-assistant/core'
ha_domain: thread
ha_iot_class: Local Polling
ha_integration_type: service
ha_config_flow: true
ha_platforms:
  - diagnostics
ha_zeroconf: true
---

The Thread integration helps you track the different Thread networks in your home and helps you manage their credentials. It is currently a work in progress.

Thread is a low-power mesh networking standard which allows users to connect their devices within a home network. It uses the same RF technology as Zigbee, but provides IP connectivity similar to Wi-Fi. Unlike Zigbee, Thread does not allow to control devices directly: It is just a communication protocol. A higher level protocol such as Matter or HomeKit is required to control Thread enabled devices. Thread allows devices to communicate with each other without the need for a central gateway or router. This makes it ideal for home automation, where a large number of devices may need to be connected.

To connect a Thread network to Home Assistant, Thread Border Routers (TBRs) are used. TBRs are devices that bridge the Thread network to a local Wi-Fi or Ethernet network. To add a TBR to Home Assistant, you can use our [Home Assistant Yellow](/yellow/) hub or the [Home Assistant SkyConnect](/skyconnect/) Zigbee/Thread stick.

Home Assistant communicates with TBRs over the local network. This means that TBRs do not have to be physically attached to Home Assistant to be used. You might already have a TBR as part of other products in your home, like a Google Nest Hub Gen 2 or Apple HomePod Mini. Each vendor forms their own network when you start using their products, so you can end up having a Home Assistant, an Apple, and a Google Thread network in your home. These are all separate networks using different credentials, which prevents devices to roam between TBRs.

It is possible to align credentials for TBRs from different vendors and have them form a single network together. This allows you to freely move devices between rooms without losing connectivity. To do this, you need to make sure that all TBRs use the same credentials. Sadly, this works differently for each TBR vendor.

Home Assistant will sync the Thread credentials with Google when starting to commission a Matter device via the Home Assistant Companion app. For other vendors, if the vendor allows you to see the operational dataset in TLV format, you can import it to Home Assistant from the Thread panel.
