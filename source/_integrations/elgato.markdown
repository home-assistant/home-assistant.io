---
title: Elgato Key Light
description: Instructions on how to integrate an Elgato Key Light with Home Assistant.
ha_category:
  - Light
ha_release: 0.104
ha_iot_class: Local Polling
ha_qa_scale: platinum
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_quality_scale: platinum
ha_domain: elgato
---

The [Elgato Key Light](https://www.elgato.com/en/gaming/key-light) sets the
bar for high-end studio lightning. With 80 LEDs, that put out a massive
2500 lumens, and can change the color temperature as well.

The LED light panel is created specifically, and designed for streamers
and content creators, many of whom operate on platforms like YouTube and Twitch.

## Configuration

This integration can be configured using the integrations in the
Home Assistant frontend.

Menu: **Configuration** -> **Integrations**.

In most cases, Elgato Key Lights devices will be automatically discovered by
Home Assistant. Those automatically discovered devices are listed
on the integrations page.

If for some reason (e.g., due to lack of mDNS support on your network),
the Elgato Key Light isn't discovered, it can be added manually.

Click on the `+` sign to add an integration and click on **Elgato Key Light**.
After completing the configuration flow, the Key Light integration will be
available.

## Lights

This integration adds the Key Light device as a light in Home Assistant, and
allows you to control the color temperature, brightness, and its on/off state.
