---
title: "Integrating individual device energy usage"
description: "Learn how to add information about individual device energy usage to Home Assistant home energy management."
---

Home Assistant can integrate the energy usage of individual devices into Home Assistant. That way you can see the impact of individual devices on your total energy consumption.

## Hardware

### Smart plugs

Smart plugs sit between the device and the outlet and measure the energy flowing through the device.

Depending on what protocols you use at home, you can use Zigbee, Z-Wave or Wi-Fi based plugs.

### Smart relays

Smart relays sit behind your "normal" switches and make them smart. It allows you to control the devices via Home Assistant and via the connected buttons/switches.

## Devices with power (W) sensors

Some smart devices, such as air conditioning, boilers, and others, may provide a power sensor, measured in Watts. You can use the [Integration (Riemann sum integral) integration](/integrations/integration/#energy) to calculate the energy your device is using. You can then use the energy sensor in the Energy Dashboard, as individual devices. For information on setting up an entity for use in the **Energy** dashboard, refer to the [energy FAQ](/docs/energy/faq/#troubleshooting-missing-entities).

<img src='/images/docs/energy/devices.png' alt='Graphic showing energy flowing from the home to individual devices.' style='border: 0;box-shadow: none; display: block; max-height: 400px; margin: 0 auto;'>

## Upstream devices and hierarchies

You can create a hierarchy of devices by setting one device as an "upstream device" of another. This means you can now establish parent-child relationships between devices within your energy configuration.

For example, imagine having a breaker monitoring the total energy consumption of a circuit, but also separately tracking individual devices connected to that circuit. Without setting the device hierarchies, Home Assistant might double-count this usage. By setting the hierarchy, it understands these relationships and accurately shows the individual device usage without duplication.
To set up an upstream device relationship:

1. Add an energy consumption entity as an individual device.
2. Then, when configuring other individual devices, you can select the previously added individual entity as their upstream device.

This hierarchical view helps you understand which devices are consuming power from which sources and prevents energy from being counted multiple times.

{% important %}
To set up a hierarchy, you must first add all related entities as individual devices in the energy dashboard. Only devices that are already listed under individual devices can be selected as "upstream device" for other devices.
{% endimportant %}
