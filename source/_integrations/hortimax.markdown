---
title: Ridder HortiMaX Pro
description: Instructions on how to integrate Ridder HortiMaX Pro greenhouse controllers into Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@wildekek'
ha_domain: hortimax
ha_platforms:
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Ridder HortiMaX Pro** {% term integration %} reads measurements from
[Ridder](https://www.ridder.com/) greenhouse process controllers through the
HortOS Automation API.

A HortiMaX Pro controller runs the climate, irrigation, screening, and
lighting of a greenhouse. This integration makes everything the controller measures —
air and pipe temperatures, humidity, vent and screen positions, irrigation
volumes, weather station readings, gas and electricity use — available in Home
Assistant as sensors.

The integration is **read-only**: it never writes setpoints or otherwise
changes how the controller runs the greenhouse. Growing decisions stay in
HortiMaX Pro.

{% important %}
This is a community-built integration. It is not an official Ridder product,
is not certified by Ridder, and Ridder does not support it.

Ridder's support covers the HortOS Automation API itself. Anything about this
integration is a matter for the Home Assistant community.
{% endimportant %}

## Prerequisites

You need an API key for the HortOS Automation API. Request one from your
Ridder account manager; it is not something you can generate yourself in the
HortiMaX Pro interface. The API key and the API are Ridder's; obtaining and
using them is separate from installing this integration.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "The API key for the HortOS Automation API, which gives access to every controller in your organization."
API base URL:
  description: "Leave this at the default to use the HortOS cloud API. Change it only if you run HortOS on premises, in which case enter the address of that server."
{% endconfiguration_basic %}

One config entry covers a whole organization, so all controllers your API key
can reach are added at once.

## Devices and entities

The integration mirrors the two levels of the HortOS data model:

- Each **controller** becomes a device.
- Each **source** inside a controller — a weather station, a ventilation
  group, a valve group, a screen, a meter — becomes its own device, linked to
  its controller.
- Each **readout** of a source becomes a sensor.

A controller reports a few dozen distinct readouts per source, which
multiplies into several hundred sensors once every source is counted. Readouts
whose meaning is understood get a device class, a unit and a sensible display
precision. Readouts that are internal status or override codes are created
**disabled**, so a controller does not flood your instance with entities that
mean nothing outside HortiMaX Pro. You can enable any of them from the device
page if you know what a particular code means.

Sensors whose identifier ends in `ActualSetting` report a configured setpoint
rather than a measurement, and are shown in the diagnostic section of their
device.

## Data updates

The integration polls the HortOS API once a minute per controller, which
matches how often a controller publishes changed readouts. A readout whose
value does not change keeps its previous timestamp for up to five minutes.

## Known limitations

- The HortOS Automation API is still evolving, and Ridder does not guarantee
  backward compatibility for community integrations. An API change can
  therefore rename, alter, or remove sensors between releases.
- The integration is read-only. There is no way to change a setpoint from
  Home Assistant, by design.
- Some readouts are encoded as numbers that index a lookup table the API does
  not expose, for example a weather status code. Wind direction is decoded
  into a bearing; the remaining coded readouts are shown as the raw number.
- Sensor names are derived from the readout identifiers the controller
  reports, and are in English regardless of the language of your Home
  Assistant instance.

## Troubleshooting

### The integration cannot connect

Check that the API key is still valid and that the HortOS API is reachable
from your Home Assistant instance. The API allows 100 requests per 15 seconds
per key; if you use the same key elsewhere, the two can interfere.

### A sensor is missing

Readouts that could not be classified are disabled by default. Open the device
page, select the line that shows how many entities are hidden (for example,
**+ 12 entities not shown**), and then enable the sensor you need.

If a readout is missing entirely, the controller is not reporting it through
the API. Check in HortiMaX Pro whether the source is enabled.

### Where to ask for help

Ridder supports the HortOS Automation API, not this integration. Take
questions about the API — including how to obtain an API key or why a
controller reports a particular value — to your Ridder account manager.

For the integration itself, use the Home Assistant
[community forum](https://community.home-assistant.io/) or the issue tracker
linked in the sidebar of this page.

## Removing the integration

This integration follows standard integration removal. No extra steps are
required.

{% include integrations/remove_device_service.md %}
