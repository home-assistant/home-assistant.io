---
title: Dreo
description: Instructions on how to set up Dreo fans within Home Assistant.
ha_category:
  - Fan
ha_release: 0.66
ha_config_flow: true
ha_domain: dreo
ha_platforms:
  - fan
ha_integration_type: integration
---

The `**Dreo** integration enables you to control smart switches and outlets connected to the Dreo App.

The devices must be added to the Dreo App before this integration can discover them.

The following platforms are supported:

- **fan

## Supported devices

This integration supports devices controllable by the Dreo App.  The following devices are supported by this integration:

### Fans

- DR-HTF001S: Tower Fan
- DR-HTF002S: Tower Fan
- DR-HTF004S: Tower Fan
- DR-HTF005S: Tower Fan
- DR-HTF007S: Tower Fan
- DR-HTF008S: Tower Fan
- DR-HTF009S: Tower Fan
- DR-HTF010S: Tower Fan

## Prerequisite

Before you can use this integration, all devices must be registered with the
Dreo App. Once registration is complete,  Added dreo integration in Home Assistant.

## Fan exposed attributes

Dreo Tower Fan will expose the following details depending on the features supported by the model:

| Attribute | Description                                                  | Example |
| --------- | ------------------------------------------------------------ | ------- |
| `mode`    | The current mode the device is in. (DR-HTF001S/002S/004S/005S/007S/008S/009S/010S) | manual  |
| `speed`   | The current speed setting of the device. (DR-HTF001S/002S/004S/005S/007S/008S/009S/010S) | 1       |
| oscillate | The current oscillate setting of the device. (DR-HTF001S/002S/004S/005S/007S/008S/009S/010S) | true    |
