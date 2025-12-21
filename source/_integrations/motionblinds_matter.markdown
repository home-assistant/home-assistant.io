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

## Supported devices

### Motionblinds with Bluetooth & 433MHz

To connect to these motors via Matter you will need the Motionblinds Matter bridge (CM-55).

- [CMD-02 Motionblinds Tubular Battery Motor 0.2Nm](https://motionblinds.com/products/roller)
- [CMD-02-P Motionblinds Tubular Battery Motor 0.2Nm](https://motionblinds.com/products/roller)
- [CMD-03 Motionblinds Tubular Battery Motor 0.5Nm](https://motionblinds.com/products/roller)
- [CM-03 Motionblinds Tubular Battery Motor 1.1Nm](https://motionblinds.com/products/roller)
- [CM-04 Motionblinds Tubular Battery/Wired Motor 1.1Nm](https://motionblinds.com/products/roller)
- [CM-05 Motionblinds Tubular Battery Motor 2.0Nm](https://motionblinds.com/products/roller)
- [CM-06 Motionblinds Tubular Battery Motor 6.0Nm](https://motionblinds.com/products/venetian)
- [CM-07 Motionblinds Mid Motor Battery/Wired 0.8Nm](https://motionblinds.com/products/roman)
- [CM-07V2 Motionblinds Mid Motor Battery/Wired 0.8Nm](https://motionblinds.com/products/roman)
- [CM-08 Motionblinds Honeycomb Battery Motor 0.6Nm](https://motionblinds.com/products/honeycomb)
- [CM-09 Motionblinds Tubular Wired Motor 6.0Nm](https://motionblinds.com/products/roller)
- [CM-10 Motionblinds Tubular Wired Motor 8.0Nm](https://motionblinds.com/products/venetian)
- [CM-34 Motionblinds Smart Switch](https://support.motionblinds.com/motionblinds-smart-switch-cm-34)
- [CM-35 Motionblinds Curtain Wired Motor 1.2Nm](https://motionblinds.com/products/curtains)
- [CM-36 Motionblinds Curtain Battery Motor 0.8Nm](https://motionblinds.com/products/curtains)
- [CM-40 Motionblinds Vertical Battery/Wired Motor 0.35Nm](https://motionblinds.com/products/vertical)
- [CM-45 Motionblinds Tubular Battery Motor 0.5Nm](https://motionblinds.com/products/roller)
- [CM-52 Motionblinds Smart Frame Motor 0.5Nm](https://motionblinds.com/blog/motionblinds-smart-frame-wins-r-t-innovation-award)
- [CM-57 Motionblinds Curtain Wired Motor 1.1Nm](https://motionblinds.com/products/curtains)

### Eve Motionblinds with Matter & Thread

Matter-based Motionblinds devices powered by Eve need a Thread Border Router to connect to the network. For more information about Thread, refer to the [Thread documentation](/integrations/thread/).

- [CM-03-E Eve Motionblinds Tubular Battery Motor 1.1Nm](https://motionblinds.com/products/roller)
- [CM-05-E Eve Motionblinds Tubular Battery Motor 2.0Nm](https://motionblinds.com/products/roller)
- [CM-06-E-R Eve Motionblinds Tubular Battery Motor 6.0Nm](https://motionblinds.com/products/roller)
- [CM-06-E-V Eve Motionblinds Venetian Battery Motor 6.0Nm](https://motionblinds.com/products/venetian)
- [CM-07-E-R Eve Motionblinds Venetian Mid Motor Battery/Wired 0.8Nm](https://motionblinds.com/products/venetian)
- [CM-07-E-V Eve Motionblinds Venetian Mid Motor Battery/Wired 0.8Nm](https://motionblinds.com/products/venetian)
- [CM-08-E Eve Motionblinds Honeycomb Battery Motor 0.6Nm](https://motionblinds.com/products/honeycomb)
- [CM-36-E Eve Motionblinds Curtain Battery Motor 1.1Nm](https://motionblinds.com/products/curtains)
- [CM-45-E Eve Motionblinds Tubular Battery Motor 0.5Nm](https://motionblinds.com/products/roller)
- [CM-50-E-R Eve Motionblinds Tubular Wired Motor 6.0Nm](https://motionblinds.com/products/roller)
- [CM-50-E-V Eve Motionblinds Venetian Wired Motor 6.0Nm](https://motionblinds.com/products/venetian)
- [CM-51-E Eve Motionblinds Curtain Wired Motor 1.2Nm](https://motionblinds.com/products/curtains)



To find where to buy these motors with custom made blinds, visit the [Motionblins store locator](https://motionblinds.com/stores).

To know more about the motors and the technical information visit the [Motionblinds website](https://motionblinds.com/smart-connectivity/home-assistant).
