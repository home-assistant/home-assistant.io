---
title: Ohme
description: Instructions to configure the Ohme integration into Home Assistant.
ha_category:
  - Sensor
  - Car
ha_release: 2025.1
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@dan-r'
ha_config_flow: true
ha_domain: ohme
ha_platforms:
  - sensor
  - switch
  - number
  - time
  - button
  - binary_sensor
---

The **Ohme** {% term integration %} allows you to connect your Ohme EV charger to Home Assistant.


## Prerequisites

- A compatible charger. This integration has been tested with:
  - Ohme Home Pro
  - Ohme Home
  - Ohme Go
  - Ohme ePod

- An Ohme account. If you used Google to sign up for Ohme, [reset your password](https://api.ohme.io/fleet/index.html#/authentication/forgotten-password) before configuring this integration. 

{% include integrations/config_flow.md %}

{% configuration_basic %}
Never update an ongoing session:
  description: "Override the default behavior of the target time, percentage and preconditioning inputs and only ever update the schedule, not the current session."
Don't collapse charge slots:
  description: "By default, adjacent slots are merged into one. This option shows every slot, as shown in the Ohme app."
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Binary Sensor
The {% term integration %} provides the following binary sensors:

- Car Connected - On when a car is plugged in
- Car Charging - On when a car is connected and drawing power
- Pending Approval - On when a car is connected and waiting for approval
- Charge Slot Active - On when a charge slot is in progress according to the Ohme-generated charge plan
- Charger Online - On if charger is online and connected to the internet

## Sensor
The {% term integration %} provides the following sensors:

- Power Draw (Watts) - Power draw of connected car
- Current Draw (Amps) - Current draw of connected car
- Voltage (Volts) - Voltage reading
- Charge Slots - A comma separated list of assigned charge slots 
- Next Charge Slot Start - The next time your car will start charging according to the Ohme-generated charge plan
- Next Charge Slot End - The next time your car will stop charging according to the Ohme-generated charge plan
- CT Reading (Amps) - Reading from attached CT clamp
- Energy Usage (kWh) - Energy used in the current/last session. *This is supported by the energy dashboard.*
- Battery State of Charge (%) - If your car is API connected this is read from the car, if not it is how much charge Ohme thinks it has added

## Switch
The {% term integration %} provides the following switches:

- Lock Buttons - Locks buttons on charger
- Require Approval - Require approval to start a charge
- Sleep When Inactive - Charger screen & lights will automatically turn off
- Solar Boost
- Max Charge - Forces the connected car to charge regardless of set schedule
- Pause Charge - Pauses an ongoing charge
- Enable Price Cap - Whether price cap is applied. _Due to changes by Ohme, this will not show for Intelligent Octopus users._

## Number
The {% term integration %} provides the following number inputs:

- Target Percentage - Change the target battery percentage
- Preconditioning - Change pre-conditioning time. 0 is off
- Price Cap - Maximum charge price. _Due to changes by Ohme, this will not show for Intelligent Octopus users._

## Time
The {% term integration %} provides the following time inputs:

- Target Time - Change the target time

## Button
The {% term integration %} provides the following buttons:

- Approve Charge - Approves a charge when 'Pending Approval' is on
