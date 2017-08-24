---
layout: page
title: "Lutron QSE"
description: "Instructions how to use Lutron QSE devices with Home Assistant."
date: 2017-08-24 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lutron.png
ha_category: Hub
featured: False
ha_release: 0.52
ha_iot_class: "Local Push"
---

[Lutron Electronics](http://www.lutron.com/) offers several lines of home automation devices that manage light switches/dimmers, window shades, occupancy sensors, HVAC controls, etc.

The `lutron_qse` component in Home Assistant is responsible for communicating with the Lutron [QSE-CI-NWK-E Control Interface](http://www.lutron.com/TechnicalDocumentLibrary/qse-ci-nwk-e_ENG_24_09_2009.pdf), which is compatible with *wired* Lutron QS devices, including [Sivoia QS](http://www.lutron.com/en-US/Products/Pages/ShadingSystems/SivoiaQS/Components.aspx) shades and blinds. A full list of compatible devices is availble in the [Lutron Integration Protocol](http://www.lutron.com/TechnicalDocumentLibrary/040249.pdf) (search: "QS Standalone"). Currently only Sivoia QS Roller Shades are supported. 

The QSE controller exposes a local telnet interface. Device state changes are immediately pushed to the telnet connection. When configured, the `lutron_qse` component will automatically discover devices and assign display names based on either the pre-assigned integration id (see integration protocol above).

``` yaml
# Example configuration.yaml entry
lutron:
  host: IP_ADDRESS
  ignore: ['0x00000001']
```

Configuration variables:

- **host** (*Required*): The IP address of QSE controller.
- **ignore** (*Optional*): List of device serial numbers to exclude from discovery.

<p class='note'>
The QSE controller is *not* typically present in a home installation. Check with your Lutron service provider. Or, if you are feeling adventerous, it can be purchased from ebay for around $100 and wired into your [QS Power Panel](http://www.lutron.com/TechnicalDocumentLibrary/045-310%20QSPS-P1-10-60%2002-23-10%20B.pdf) and home ethernet.
</p>

<p class='note'>
It is recommended to assign a static IP address to your QSE controller.
</p>
