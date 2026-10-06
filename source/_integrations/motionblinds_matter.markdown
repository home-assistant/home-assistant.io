---
title: Motionblinds Matter
description: Control your Motionblinds Matter devices using the Matter integration.
ha_category:
  - Cover
ha_domain: motionblinds_matter
ha_release: '2025.4'
ha_codeowners:
  - '@home-assistant/matter'
ha_config_flow: true
ha_platforms:
  - cover
ha_iot_class: Local Push
ha_integration_type: virtual
works_with:
  - matter
ha_iot_standard:
  - matter
---

[Motionblinds](https://motionblinds.com) is a member of the Works with Home Assistant partner program for their Matter products. Motionblinds is committed to making sure their products are up-to-date and ready to use in Home Assistant.

Motionblinds Matter devices work locally and integrate seamlessly with the Matter integration in Home Assistant. As all connectivity is happening locally, status updates and controlling your devices happen instantly in Home Assistant.

{% my add_matter_device badge domain=page.ha_domain %}

[Learn more about Matter in Home Assistant.](/integrations/matter/)

## Works with Home Assistant certified devices

### Motionblinds with Bluetooth & 433MHz

To connect to these motors via Matter you will need the Motionblinds Matter bridge (CM-55).

{% include integrations/device_list.html brand="motionblinds" protocol="Vendor Hub / Bridge" %}

### Eve Motionblinds with Matter & Thread

Matter-based Motionblinds devices powered by Eve need a Thread Border Router to connect to the network. For more information about Thread, refer to the [Thread documentation](/integrations/thread/).

{% include integrations/device_list.html brand="motionblinds" protocol="Matter over Thread" %}

## Supported devices

In addition to the certified devices, the following device is also supported via the Motionblinds Matter bridge (CM-55):

- [CM-52 Motionblinds Smart Frame Motor 0.5Nm](https://motionblinds.com/blog/motionblinds-smart-frame-wins-r-t-innovation-award)

To find where to buy these motors with custom made blinds, visit the [Motionblinds store locator](https://motionblinds.com/stores).

To know more about the motors and the technical information visit the [Motionblinds website](https://motionblinds.com/smart-connectivity/home-assistant).
