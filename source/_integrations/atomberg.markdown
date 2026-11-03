---
title: Atomberg
description: Instructions on how to integrate Atomberg fans, water purifiers, and smart locks with Home Assistant.
ha_categories:
  - climate.fans_ventilation
  - water.water_treatment
  - security_safety.locks_access
ha_release: 2026.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@ratulbmg'
ha_domain: atomberg
ha_platforms:
  - binary_sensor
  - button
  - fan
  - light
  - number
  - select
  - sensor
  - switch
  - time
ha_integration_type: hub
ha_quality_scale: bronze
related:
  - url: https://developer.atomberg-iot.com/
    title: Atomberg developer portal
  - url: https://github.com/home-assistant/core/issues?q=label%3A%22integration%3A+atomberg%22
    title: Issues list for the Atomberg integration
---

The **Atomberg** {% term integration %} connects Home Assistant to your [Atomberg](https://atomberg.com/) smart devices through the Atomberg cloud. You can control your fans, adjust and monitor your water purifiers, and check your smart locks from Home Assistant, and use them in your automations.

## Supported devices

The integration supports the device types offered by the [Atomberg public API](https://developer.atomberg-iot.com/):

- Atomberg smart fans, including models with an LED light.
- Atomberg smart water purifiers.
- Atomberg smart locks. Smart locks are read-only, apart from generating a guest PIN. See [Known limitations](#known-limitations).

Which entities you get depends on what your device reports and supports.

## Prerequisites

You need an API key and a refresh token from your Atomberg account.

1. Install the **Atomberg Home** app and add your devices to it.
2. In the app, enable developer mode.
3. Generate your API key and refresh token. See the [Atomberg developer portal](https://developer.atomberg-iot.com/) for the current steps.

Keep your API key and refresh token private. Anyone who has them can control your devices.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "The API key you generated in the Atomberg Home app."
Refresh token:
  description: "The refresh token you generated in the Atomberg Home app."
{% endconfiguration_basic %}

After you enter your credentials, Home Assistant adds all supported devices on your account.

## Supported functionality

The **Atomberg** integration provides the following entities. You only get the entities your device supports.

### Binary sensors

Available for water purifiers.

- **Filter choked**
  - **Description**: Shows when the filter is choked.
- **Valve fault**
  - **Description**: Shows when the purifier reports a valve fault.
- **System fault**
  - **Description**: Shows when the purifier reports a system fault.
- **No water**
  - **Description**: Shows when the purifier reports no incoming water.
- **Tank full**
  - **Description**: Shows when the tank is full.

### Buttons

- **Generate guest PIN**
  - **Description**: Creates a guest PIN for your smart lock. The PIN is shown in a notification in Home Assistant. It is not stored as a sensor or attribute.
  - **Available for**: smart locks.
  - **Remarks**: For some lock models, the PIN is valid for 4 hours.

### Fans

- **Fan**
  - **Description**: Turn the fan on and off, and set its speed (6 speeds).
  - **Available for**: fans.

### Lights

- **LED**
  - **Description**: Turn the fan light on and off. If your fan supports it, you can also set the brightness and the light mode (daylight, cool, or warm).
  - **Available for**: fans with a light.

### Numbers

- **TDS threshold**
  - **Description**: Sets the TDS threshold for your purifier (between 100 and 300).
  - **Available for**: water purifiers.

### Selects

- **Timer**
  - **Description**: Sets a timer for the fan.
  - **Options**: Off, 1 hour, 2 hours, 3 hours, 6 hours
  - **Available for**: fans that support a timer.
- **Purification mode**
  - **Description**: Chooses how the purifier treats the water.
  - **Options**: RO only, Adaptive, TasteTune 50-100 ppm, TasteTune 75-125 ppm, TasteTune 100-150 ppm, Vacation
  - **Available for**: water purifiers.
- **Fallback mode**
  - **Description**: Chooses the mode the purifier uses as a fallback.
  - **Options**: RO only, TasteTune 50-100 ppm, TasteTune 75-125 ppm, TasteTune 100-150 ppm
  - **Available for**: water purifiers.

### Sensors

- **Input TDS**
  - **Description**: TDS of the incoming water.
  - **Available for**: water purifiers.
- **Tank TDS**
  - **Description**: TDS of the water in the tank.
  - **Available for**: water purifiers.
- **Last reported**
  - **Description**: When the purifier last reported its state to the cloud.
  - **Available for**: water purifiers.
- **Unlock count**
  - **Description**: Number of times the lock has been unlocked.
  - **Available for**: smart locks.
- **Firmware version**
  - **Description**: Firmware version of the lock.
  - **Available for**: smart locks.
- **Battery**
  - **Description**: Battery level of the lock.
  - **Available for**: smart locks.

### Switches

- **Sleep mode**
  - **Description**: Turns the purifier sleep mode on and off.
  - **Available for**: water purifiers.
- **Idle display sleep**
  - **Description**: Turns off the purifier display while it is idle.
  - **Available for**: water purifiers.
- **Sleep window**
  - **Description**: Turns the daily sleep window on and off. Set the start and end time first.
  - **Available for**: water purifiers.

### Times

- **Sleep window start**
  - **Description**: The time the daily sleep window starts.
  - **Available for**: water purifiers.
- **Sleep window end**
  - **Description**: The time the daily sleep window ends.
  - **Available for**: water purifiers.

## Data updates

The **Atomberg** integration {% term polling polls %} the Atomberg cloud every 30 minutes. One request returns the state of all your devices.

When you change something in Home Assistant, the integration shows the new value right away. It does not request an update again.

Atomberg limits the public API to 100 requests per day for your account. The Atomberg Home app and other tools that use the same account count toward this limit. Because of this, changes you make outside Home Assistant, for example with the app or a remote, can take up to 30 minutes to show up.

## Known limitations

- The integration needs an internet connection. The Atomberg public API does not offer local control.
- Smart locks are read-only. You can't lock or unlock a lock from Home Assistant, because the Atomberg API does not offer it.
- State changes made outside Home Assistant can take up to 30 minutes to appear. See [Data updates](#data-updates).

## Troubleshooting

{% details "Can't set up the integration" %}

### Symptom: "Invalid authentication"

When you set up the integration, the form shows the message "Invalid authentication".

#### Description

The API key or refresh token isn't valid. They might be mistyped, expired, or from a different account.

#### Resolution

1. Generate a new API key and refresh token in the Atomberg Home app.
2. Enter them again, copying them carefully.

{% enddetails %}

{% details "Home Assistant asks me to re-authenticate" %}

### Symptom: A repair or notification asks you to sign in again

#### Description

Atomberg rejected your credentials. This can happen when the refresh token is replaced or expires.

#### Resolution

1. Generate a new API key and refresh token in the Atomberg Home app.
2. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Atomberg** integration.
3. Follow the prompt to re-authenticate. Use credentials from the same Atomberg account.

{% enddetails %}

{% details "Values are slow to update or commands fail" %}

### Symptom: Values don't update, or commands stop working

#### Description

The Atomberg public API allows 100 requests per day. If other tools or the Atomberg Home app use the same account, you can reach this limit.

#### Resolution

Wait until the limit resets, and avoid other tools that use the same API key.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, you can also revoke or regenerate your API key and refresh token in the Atomberg Home app.
