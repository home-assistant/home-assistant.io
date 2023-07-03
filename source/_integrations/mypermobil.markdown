---
title: MyPermobil
description: Instructions on how to integrate Permobil wheelchair into Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: '2023.6.3'
ha_domain: permobil
ha_codeowners:
  - '@IsakNyberg'
ha_config_flow: true
ha_platforms:
  - Sensor
ha_integration_type: hub
---

The MyPermobil integration allows you to view various sensors with information about your wheelchair, such as battery status, distance traveled, number of seating adjustments, etc.  The values of the sensors may be delayed by several minutes and should not be relied on for any crucial applications.

{% include integrations/config_flow.md %}

## Configuration

Configure the integration by entering your email associated with your MyPermobil account, then select your region from the dropdown list. When proceeding to the next step you will receive a 6 digit code to the email you entered, this code needs to be entered in the final step. If everything works as it should, MyPermobil should be added to your list of integrations.

## Sensors

The sensors will update periodically with information about your wheelchair. The updates may be delayed by several minutes and should not be relied on for any crucial applications.

A total of 13 sensors are available:

### Battery Charge

The current battery state of the wheelchair as a percentage.

### Battery Health

The maximum amount of charge the battery can hold measured as a percentage of the battery's original capacity.

### is Charging

A boolean value that indicates true if the battery is currently charging. The wheelchair needs to have been charged at least once for this sensor to work.

### Charge Time Left

A number indicating how many hours the battery needs until it is fully charged. The battery needs to be currently charging for this sensor to work.

### Distance Left

The distance the wheelchair can travel on its current charge. The unit of measurement is the same as you have selected in your MyPermobil account. This figure is an estimate and should not be relied upon.

### Indoor Drive Time

The estimated number of hours of indoor drive time that is left on the current battery charge.

### Battery Max Watt Hours

The number of watt hours of energy stored in the battery when it is at max capacity.

### Watt Hours Left

The number of watt hours of energy stored in the battery on its current charge.

### Full Charge Distance

The distance the wheelchair can travel on a full charge. The unit of distance is the same as you have selected in your MyPermobil account. This figure is an estimate and should not be relied upon.

### Distance Traveled

The distance the wheelchair has traveled today. The unit of distance is the same as you have selected in your MyPermobil account.

### Number of Adjustments

The number of adjustments sessions today. Multiple different adjustment within a short time period are counted as a single one.

### Record Distance Traveled

The record distance traveled in a single day.

### Record Number of Adjustments

The record number of adjustments in a single day.
