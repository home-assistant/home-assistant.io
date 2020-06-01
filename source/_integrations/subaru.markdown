---
title: Subaru 
description: Instructions on how to integrate Subaru car into Home Assistant.
ha_category:
  - Car
  - Lock
  - Sensor
ha_release: 0.111
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@G-Two'
ha_domain: subaru
---

The `Subaru` integration connects to the [MySubaru](https://www.mysubuaru.com) cloud service to provide vehicle sensor information as well as the capability to remotely actuate door locks. This integration requires an active subscription to the MySubaru service.

This integration provides the following platforms:

- Lock - Lock and Unlock Doors.
- Sensors - Such as Outside temperature, odometer, estimated range, and EV information (battery level, range, charging rate).

## Configuration

The Subaru integration offers configuration through the Home Assistant UI:
    
**Configuration** -> **Integrations** -> **Add** -> **Subaru**

When prompted, enter the following configuration parameters:

- **Email Address:** The email address associated with your MySubaru account.
- **Password:** The password associated with your MySubaru account.
- **PIN:** The PIN associated with your MySubaru account. 
  - Note: If your account includes multiple vehicles, the same PIN will need to be used for all vehicles.

First-time validation of your credentials may take up to 15 seconds. 

## Options

Subaru integration options are set via:

**Configuration** -> **Integrations** -> **Subaru** -> **Options**.

The options are:

- **Seconds between API polling *[Default: 300, Minimum: 60]*:** Controls how frequently Home Assistant will poll the MySubaru API for vehicle data they have cached on their servers. This does not invoke a remote service request to your vehicle, and the data may be stale. Your vehicle will still send new information during certain state changes, such as being turned off or having a charging cable plugged in.  Excessive API calls will not yield fresh data.
- **Seconds between vehicle polling *[Default: 7200, Minimum: 300]*:** Controls how frequently Home Assistant will poll the MySubaru API and invoke a remote service request to be sent to your vehicle to obtain an information update. This involves "waking up" your vehicle and powering on some on-board systems. Performing this action too frequently may drain your battery.
