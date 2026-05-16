---
title: Huum
description: Instructions on how to integrate Huum saunas into Home Assistant.
ha_release: 2024.2
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@frwickst'
  - '@vincentwolsink'
ha_domain: huum
ha_integration_type: device
ha_config_flow: true
ha_quality_scale: silver
related:
  - url: https://huum.eu/
    title: Huum
  - url: https://huum.eu/products/uku-wifi/
    title: Huum UKU WiFi smart sauna control system
ha_platforms:
  - binary_sensor
  - climate
  - diagnostics
  - light
  - number
  - sensor
ha_category:
  - Binary sensor
  - Climate
  - Light
  - Number
  - Sensor
---

The **Huum** {% term integration %} lets you monitor and control your [Huum](https://huum.eu/) sauna from Home Assistant. Huum manufactures electric sauna heaters with smart connectivity, allowing you to adjust the temperature and, when your sauna controller supports these features, control the light and manage the steamer humidity level right from your dashboard.

Use case: Preheat your sauna before you get home, and, when your controller includes light or steamer control, automate the light and humidity based on schedules, or monitor the sauna temperature from anywhere.

## Prerequisites

Before setting up this integration, make sure you have:

1. A Huum UKU WiFi sauna control system installed and connected to the internet.
2. A Huum account. You can create one in the **Huum** app. Your username is usually your email address.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
    description: "The username of your Huum account, which is usually your email address."
Password:
    description: "The password of your Huum account."
{% endconfiguration_basic %}

## Supported functionality

The **Huum** integration provides the following entities.

### Binary sensors

- **Door**
  - **Description**: Indicates whether the sauna door is open or closed.

### Climate

- **Sauna heater**
  - **Description**: Controls the sauna heater. You can adjust the target temperature within the range configured on the sauna controller (defaults to 40–110 °C, with a step of 1 °C).
  - **Modes**: Heat, Off
  - **Remarks**: The target temperature can only be changed while the sauna is in heat mode.

### Lights

- **Light**
  - **Description**: Turns the sauna light on or off.
  - **Remarks**: Only available if the sauna controller is configured with a light or a steamer and light combination.

### Numbers

- **Humidity**
  - **Description**: Controls the steamer duty cycle (0–10) to adjust the sauna humidity level.
  - **Remarks**: Only available if the sauna controller is configured with a steamer or a steamer and light combination. The humidity level can only be changed while the sauna is actively heating.

### Sensors

- **Temperature**
  - **Description**: Shows the current sauna temperature in degrees Celsius.

## Examples

Examples of automations you can create using the Huum integration.

### Sauna ready notification with light

Send a notification and turn on the sauna light when the target temperature is reached.

{% details "Example YAML configuration" %}

```yaml
alias: "Sauna ready notification with light"
description: >-
  Sends a notification and turns on the sauna light when the target
  temperature is reached.

mode: restart

variables:
  notification_title: "Sauna is Ready!"
  notification_message: "Your sauna has reached {target_temperature}°C. Enjoy!"

triggers:
  - trigger: state
    entity_id: climate.huum_sauna
    to: heat
    from: "off"

actions:
  - wait_template: >-
      {% set current = state_attr('climate.huum_sauna', 'current_temperature') | float(0) %}
      {% set target = state_attr('climate.huum_sauna', 'temperature') | float(0) %}
      {{ current >= target }}
    continue_on_timeout: false
  - action: light.turn_on
    target:
      entity_id: light.huum_sauna_light
  - action: notify.mobile_app_your_phone
    data:
      title: "{{ notification_title }}"
      message: >-
        {% set target_temperature = state_attr('climate.huum_sauna', 'temperature') | int %}
        {{ notification_message.replace('{target_temperature}', target_temperature | string) }}

```

{% enddetails %}

## Data updates

The **Huum** integration {% term polling polls %} the Huum cloud service every 30 seconds for status updates.

## Known limitations

- The light and steamer entities are only available when the corresponding hardware is configured on the sauna controller.
- The steamer humidity level can only be adjusted while the sauna is actively heating.
- The target temperature can only be changed while the sauna is in heat mode.
- The integration applies the same safety measures as the Huum app. If a safety condition is triggered (for example, the sauna door is open), the sauna will not turn on.

## Troubleshooting

{% details "Connection error during setup" %}

**Symptom:** Configuration flow shows a connection error

1. Ensure your Home Assistant instance has an active internet connection.
2. Double-check that you entered the correct username and password. Try logging in to the Huum app to confirm.
3. The Huum cloud service may occasionally be unavailable. Wait a few minutes and try again.

{% enddetails %}

{% details "Invalid credentials" %}

**Symptom:** "Invalid authentication" error during setup

1. Make sure your username (usually your email address) has no extra spaces or typos.
2. If you're unsure of your password, reset it through the Huum app, then try setting it up again.
3. Confirm you can log in to the Huum app with the same credentials.

{% enddetails %}

{% details "Sauna not appearing after setup" %}

**Symptom:** Setup completes but no sauna device appears

1. Open the Huum app and verify your sauna is shown as connected, not just registered.
2. Ensure your sauna is linked to the same Huum account you used during setup.
3. Power cycle the UKU WiFi controller, wait for it to reconnect, then try setting it up again.

{% enddetails %}

{% details "Sauna becomes unavailable" %}

**Symptom:** Entities show as unavailable

1. Ensure your Home Assistant instance and the UKU WiFi controller both have a stable internet connection.
2. Open the Huum app and verify the sauna is shown as online. If not, check the controller's power and Wi‑Fi connection.
3. Go to {% my integrations title="**Settings** > **Devices & services**" %}, select the **Huum** integration, then select the three-dot menu {% icon "mdi:dots-vertical" %} and choose **Reload**.

{% enddetails %}

{% details "Cannot adjust temperature or humidity" %}

**Symptom:** Changing the target temperature or humidity level has no effect

1. The target temperature and humidity level can only be changed while the sauna is in heat mode. Make sure the sauna is actively heating.
2. If the door sensor indicates the door is open, the sauna will not turn on. Close the door and try again.
3. Confirm you can adjust the settings through the Huum app. If the app also shows restrictions, the issue is with the sauna controller.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
