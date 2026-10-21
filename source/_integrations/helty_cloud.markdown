---
title: Helty Flow Cloud
description: Instructions on how to integrate cloud-connected Helty Flow ventilation units with Home Assistant.
ha_categories:
  - climate.fans_ventilation
ha_release: 2026.11
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@ebaschiera'
ha_domain: helty_cloud
ha_platforms:
  - binary_sensor
  - fan
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Helty Flow Cloud** {% term integration %} lets you control [Helty Flow](https://www.heltyair.com/) decentralized heat-recovery ventilation units (also known as <abbr title="Mechanical ventilation with heat recovery">MVHR</abbr> units) that are fitted with the recent control panel, the one managed through the Helty Home app.

That panel does not accept connections on your local network. It opens a connection of its own to the manufacturer's cloud and reports to it, which makes the cloud the only way to reach the unit. The integration therefore signs in to your Helty Home account and works through it, and needs a working internet connection.

If your unit has the older panel, which does answer on your local network, use the [Helty Flow](/integrations/helty/) integration instead. It talks to the unit directly and keeps working without internet access.

## Supported devices

Any unit in the Helty Flow line that is paired with the recent control panel and appears in the Helty Home app is expected to work, including:

- FlowPLUS
- FlowULTRA
- Flow40
- Flow120
- FlowMANHATTAN

The integration was developed and verified against a FlowPLUS. The other models are controlled by the same panel and are expected to be compatible.

If your account holds more than one unit, each one is added as a separate device.

## Unsupported devices

Units with the older panel are not supported here, because that panel does not report to the cloud. Use the [Helty Flow](/integrations/helty/) integration for those.

Units without any smart interface, such as models that only offer an RS-485 connection, are not supported by either integration, as they expose no network protocol.

## Prerequisites

You need a Helty Home account, the one you use with the Helty Home app, with your unit already set up in it.

1. Open the app store and install the **Helty Home** app.
2. Create an account.
3. Add your ventilation unit to the app.
4. Check that the app can control the unit.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
    description: "The email address of your Helty Home account."
Password:
    description: "The password of your Helty Home account."
{% endconfiguration_basic %}

## Supported functionality

The integration creates one device per ventilation unit on the account, each exposing a fan entity.

### Fans

- **Ventilation**
  - **Description**: Turns the ventilation on and off, sets one of four speeds, and selects a preset mode (**Boost**, **Night**, or **Free cooling**). The fan entity has the same name as its device, so it appears under your unit's name. The four speeds correspond to 25%, 50%, 75%, and 100%. If you turn the fan on without choosing a speed or preset, it always starts at speed 1, not at the last speed you used.

### Binary sensors

- **Filter**
  - **Description**: Turns on when the unit raises its filter alarm, meaning the filter is due for replacement. Helty Flow units raise this alarm on the volume of air the filter has treated, not on hours of use. The sensor turns off again once the filter has been replaced and reset on the unit.

## Data updates

The unit's panel reports to the cloud on its own: whenever something changes noticeably, and on a timer besides. Home Assistant {% term polling polls %} the cloud every 5 minutes and reads the most recent of those reports, so a change you make at the panel itself, or through the app, appears within a few minutes rather than instantly.

When you send a command from Home Assistant, the integration asks the panel to report straight after, so the new speed or preset shows up in a few seconds rather than at the next poll.

## Known limitations

### Cloud dependency

The integration depends on the manufacturer's cloud. If your internet connection or the Helty cloud is unavailable, the unit cannot be controlled from Home Assistant, even though it is on the same network as your Home Assistant instance. The unit keeps ventilating on its own and can still be controlled from its panel.

### Auto and panel state

Units with the recent panel cannot report whether their **Auto** function is switched on, nor the state of the panel itself. This is a limitation of this generation of machines, confirmed by the manufacturer, and not something the integration can work around. If you run the unit in Auto, Home Assistant shows the speed the unit has settled on, but gives no way to tell Auto apart from that speed having been set by hand.

### Sensor values

Besides ventilation, only the filter alarm is available for now. The temperature, humidity, and treated-air values the panel reports are not yet exposed.

### Undocumented cloud API

The cloud API is not documented by the manufacturer and has been reverse-engineered. It may change without notice.

## Troubleshooting

### Setup fails with an authentication error

The integration signs in with the same credentials as the Helty Home app. Check that the app can still sign in with them. If you changed your Helty Home password, remove the integration and add it again with the new password.

### The entities are unavailable

The entities become unavailable when Home Assistant cannot get a recent report for the unit from the Helty cloud. This happens when your internet connection or the Helty cloud is down, or when the panel has not reported to the cloud for 2 hours.

1. Check that your Home Assistant instance has a working internet connection.
2. Check that the unit is powered on and that its panel is connected to your Wi-Fi network.
3. Open the Helty Home app and check that it shows current values for the unit.

A panel that has lost its Wi-Fi connection keeps ventilating, but the unit itself gives no sign of the problem.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
