---
title: Lutron Homeworks
description: How to use Lutron Homeworks Series 4 & 8 with Home Assistant.
ha_category:
  - Hub
  - Button
  - Light
ha_release: 0.85
ha_iot_class: Local Push
ha_domain: homeworks
ha_platforms:
  - button
  - light
ha_integration_type: integration
---

[Lutron](https://www.lutron.com/) is an American lighting control company. The Lutron Homeworks Series 4 & 8 systems are relatively old (~2003), and use RS-232 connections to communicate with home automation systems.  The `homeworks` integration in Home Assistant is responsible for communicating with the main controller for these systems.  Communication is through an ethernet to serial converter (NPort, for example).

Only a subset of the Homeworks system is supported - lights and keypads.

Lutron has created many systems over the years, each with their own unique interfacing protocol.  There are three Homeworks systems - QS, Series 4 & 8, and original.  This platform is only for Series 4 & 8.  There is another integration [lutron](/integrations/lutron/) which handles Lutron RadioRA 2 systems.

Homeworks keypad buttons are momentary switches.  The button is pressed and released, meaning that there is no "state".  Buttons generate `homeworks_button_press` and `homeworks_button_release` events.  These events contain the "id", "name", and "button" of the button that was pressed.  "id" is derived from "name", and "button" is the number of the button on the keypad (starting at 1). In addition, it's possible to add button entities which can be used to trigger the actions bound to a keypad button.

{% include integrations/config_flow.md %}

The protocol for automatically extracting device information from the controller isn't documented, so lights and keypads need to be added manually, this is done by configuring the integration after it has been added.
