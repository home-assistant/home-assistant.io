---
description: Instructions on how to integrate Vitesy devices into Home Assistant.
ha_release: '2026.10'
ha_domain: vitesy
---

The **Vitesy** {% term integration %} connects Home Assistant to your [Vitesy](https://vitesy.com/) air quality devices through the Vitesy Hub cloud service.

Vitesy makes smart air purifiers and air quality monitors. This integration reads the air quality score, environmental measurements, battery level and charging state, and maintenance schedule that each device in your Vitesy Hub account reports to the cloud.

## Use cases

- Keep an eye on the air quality inside your refrigerator and get notified when it drops.
- Track temperature, humidity, and carbon dioxide in a room, for example to know when to open a window.
- Track how often and how long the refrigerator door is opened.
- Switch the purifier mode from Home Assistant, for example to boost after a grocery run.
- Get a reminder when the purification filter is due to be cleaned or replaced.
- Reset the maintenance reminders from Home Assistant after cleaning the filter or the refrigerator.

## Supported devices

The following devices are supported:

- Vitesy Shelfy (the refrigerator air purifier)
- Vitesy Natede
- Vitesy Eteria

## Prerequisites

- A Vitesy Hub account. Create one in the **Vitesy Hub** mobile app.
- Add your device to the Vitesy Hub app and make sure it is online.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: "The email address of your Vitesy Hub account."
Password:
  description: "The password of your Vitesy Hub account."
{% endconfiguration_basic %}

## Supported functionality

Each device in your Vitesy Hub account is added as a separate device in Home Assistant, with the following entities.

### Sensors

- **Air quality score**
  - **Description**: Overall air quality score reported by the device (in percent %), from 0 (poor) to 100 (excellent).
- **Fridge temperature**
  - **Description**: Temperature measured inside the refrigerator.
  - **Available for**: Shelfy
- **Door openings**
  - **Description**: Number of refrigerator door openings counted during the latest measurement period.
  - **Available for**: Shelfy
- **Door open duration**
  - **Description**: Total time the refrigerator door was open during the latest measurement period.
  - **Available for**: Shelfy
- **Temperature**
  - **Description**: Temperature measured in the room.
  - **Available for**: Natede, Eteria
- **Humidity**
  - **Description**: Relative humidity measured in the room.
  - **Available for**: Natede, Eteria
- **Volatile organic compounds parts**
  - **Description**: Concentration of volatile organic compounds (VOC) in the air, in parts per million (ppm).
  - **Available for**: Natede, Eteria
- **Carbon dioxide**
  - **Description**: Carbon dioxide (CO₂) concentration in the air, in parts per million (ppm).
  - **Available for**: Natede, Eteria
- **Carbon monoxide**
  - **Description**: Carbon monoxide (CO) concentration in the air, in parts per million (ppm).
  - **Available for**: Natede models with a carbon monoxide sensor
- **PM2.5**
  - **Description**: Concentration of fine particulate matter (PM2.5) in the air, in micrograms per cubic meter (µg/m³).
  - **Available for**: Natede
- **Battery**
  - **Description**: Battery charge level. Shown as diagnostic information on the device page.
  - **Available for**: Shelfy
- **Filter change due**
  - **Description**: Date the purification filter is next due to be cleaned or replaced. Shown as diagnostic information on the device page.
- **Fridge cleaning due**
  - **Description**: Date the refrigerator is next due to be cleaned. Shown as diagnostic information on the device page.
  - **Available for**: Shelfy

### Binary sensors

- **Charging**
  - **Description**: Shows whether the battery is currently charging. Shown as diagnostic information on the device page.
  - **Available for**: Shelfy

### Buttons

- **Mark filter as changed**
  - **Description**: Tells Vitesy Hub that you cleaned or replaced the purification filter. This starts a new maintenance period and updates the **Filter change due** date. Shown in the configuration section of the device page.
- **Mark fridge as cleaned**
  - **Description**: Tells Vitesy Hub that you cleaned the refrigerator. This starts a new maintenance period and updates the **Fridge cleaning due** date. Shown in the configuration section of the device page.
  - **Available for**: Shelfy

### Selects

- **Mode**
  - **Description**: Operating mode of the purifier: **Eco**, **Shelf**, or **Boost**. The device applies a new mode the next time it wakes up, which can take a few minutes. Until then, the select already shows the mode you chose.
  - **Available for**: Shelfy

## Data updates

The **Vitesy** integration {% term polling polls %} the Vitesy Hub cloud service every 5 minutes.

## Vitesy automation examples

The sensors this integration exposes are a good basis for air quality and maintenance automations.
Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Notify when the air quality drops

Send a notification to your phone when the air quality score falls below a threshold.

- **Trigger**: Numeric state crossed threshold
  - **Target**: Air quality score (`sensor.shelfy_air_quality_score`)
  - **Below**: `40`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying when the air quality drops" %}

{% example %}
automation: |
  alias: "Notify when the Vitesy air quality drops"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.shelfy_air_quality_score
      below: 40
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The air quality score has dropped to
          {{ states('sensor.shelfy_air_quality_score') }}.
{% endexample %}

{% enddetails %}

### Automation: Remind me to clean the filter

Send a notification on the day the purification filter is due for maintenance.

- **Trigger**: Time
  - **Target**: Filter change due (`sensor.shelfy_filter_change_due`)
  - **At time**: Shelfy filter change due sensor
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a filter maintenance reminder" %}

{% example %}
automation: |
  alias: "Remind me to clean the Vitesy filter"
  triggers:
    - trigger: time
      at: sensor.shelfy_filter_change_due
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "It's time to clean the Vitesy filter."
{% endexample %}

{% enddetails %}

## Known limitations

- Home Assistant only creates the environmental sensors that a device reports to Vitesy Hub. The exact set depends on the model and its sensor hardware.
- The integration relies on the Vitesy Hub cloud service and needs an active internet connection.

## Troubleshooting

### Cannot authenticate

#### Symptom: "Invalid authentication" during setup, or a reauthentication notification appears later

Setup fails with an invalid authentication message, or Home Assistant asks you to reauthenticate an entry that was working before.

#### Description

The Vitesy Hub credentials stored in Home Assistant are no longer accepted by the cloud service. This usually happens after the account password is changed in the Vitesy Hub app.

#### Resolution

1. Confirm you can sign in to the **Vitesy Hub** mobile app with the same email and password.
2. In Home Assistant, go to **{% my integrations title="Settings > Devices & services" %}**.
3. Select the **Vitesy** integration.
4. If a **Reconfigure** or **Reauthenticate** prompt is shown, follow it and enter the current password.

### No devices or sensors are created

#### Symptom: The integration sets up, but no devices or entities appear

#### Description

Home Assistant only creates devices for hardware that the Vitesy Hub account has reported at least once.

#### Resolution

1. Open the **Vitesy Hub** mobile app and confirm the device is shown and online.
2. Wait for the device to publish a fresh measurement, then reload the **Vitesy** integration from **Settings** > **Devices & services**.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
