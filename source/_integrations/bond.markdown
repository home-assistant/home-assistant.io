---
title: Bond
description: Instructions on setting up Bond Bridge within Home Assistant.
ha_category:
  - Hub
  - Cover
  - Fan
  - Light
  - Switch
ha_iot_class: Local Pull
ha_release: 0.113
ha_domain: bond
ha_codeowners:
  - '@prystupa'
ha_config_flow: true
ha_quality_scale: platinum
---

The Bond integration allows you to control appliances through your [Bond Bridge](https://bondhome.io/). Duplicates your RF remote control.

Supported devices (see Requirements section below):

- Ceiling fans
- Shades
- Fireplaces

## Configuration

To use Bond controlled devices in your installation, add your Bond hub host and access token from the integrations page. Instructions for how to obtain an access token can be found on the [Bond Local API](http://docs-local.appbond.com/#section/Getting-Started/Get-Device-Information) documentation, which includes a section for how to obtain the [IP address of the device](http://docs-local.appbond.com/#section/Getting-Started/Finding-the-Bond-IP) which you will need to obtain the access token.

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **Bond** (use typeahead if necessary).
After completing the configuration flow, the Bond integration will be available.

## Requirements

This integration supports Bond bridges with firmware v2.10.x and up.
Bond bridges with firmware v2.9.x and lower will **not** work correctly. Please
upgrade your firmware from Bond app before adding this integration.
