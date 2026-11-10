---
title: Solyx Energy Cloud
description: Instructions on how to monitor your Solyx Energy Nymo devices in Home Assistant.
ha_release: 2026.11
ha_categories:
  - energy.meters_monitoring
  - energy.solar_batteries
ha_platforms:
  - sensor
ha_iot_class: Cloud Polling
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@MartinaeyNL'
ha_domain: solyx_energy_cloud
ha_integration_type: hub
related:
  - url: https://www.solyxenergy.nl
    title: Solyx Energy website
  - url: https://www.solyxenergy.nl/faq/
    title: Frequently asked questions
  - url: https://www.solyxenergy.nl/contact/
    title: Ask a question or report device issues
  - url: https://github.com/home-assistant/core/issues?q=label%3A%22integration%3A+solyx_energy_cloud%22
    title: Issues list for the Solyx Energy Cloud integration
---

The **Solyx Energy Cloud** {% term integration %} is used to integrate with Nymo devices from [Solyx Energy](https://www.solyxenergy.nl). The Nymo controls an electric boiler with exactly the amount of solar energy that would otherwise be fed back into the grid. It allows households to store their surplus solar power and minimize feed-in, without huge investments.

## Prerequisites

1. Open the app store on your Android or iOS device, and install the **Solyx Energy** app.
2. Create an account.
3. Add a new device to the app, and follow the instructions to set up your Nymo.
4. Once finished, go to the home screen and select the Nymo you have added. Go to the **Settings** tab.
5. Scroll down to the **Connect your Home Assistant** section, and press **Connect**.
6. Copy the Client ID and Client Secret, and use them when adding the integration in Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Client ID:
    description: "The Client ID of your Solyx Energy account. You can find it under the **Settings tab** of a device in the Solyx Energy app."
Client Secret:
    description: "The Client Secret of your Solyx Energy account. You can find it under the **Settings tab** of a device in the Solyx Energy app."
{% endconfiguration_basic %}

## Supported functionality

The **Solyx Energy Cloud** integration provides the following entities.

### Sensors

- **Boiler current**
  - **Description**: Measures the electrical current drawn by the boiler in amperes (A).

- **Boiler power**
  - **Description**: Measures the boiler's electrical power consumption in watts (W).

- **Boiler voltage**
  - **Description**: Measures the electrical voltage supplied to the boiler in volts (V).

- **Days since maximum temperature**
  - **Description**: Shows how many days have passed since the boiler last reached its maximum temperature.

- **Grid power**
  - **Description**: Measures the power exchanged with the electrical grid in watts (W). This can be a positive or negative value.

- **Days since last legionella prevention**
  - **Description**: Number of days since the boiler last ran its legionella prevention cycle, in days (d).

- **Saved today**
  - **Description**: Shows the amount of energy saved during the current day, in watt-hours (Wh).

- **Saved this week**
  - **Description**: Shows the amount of energy saved during the current week, in kilowatt-hours (kWh).

- **Saved this month**
  - **Description**: Shows the amount of energy saved during the current month, in kilowatt-hours (kWh).

## Data updates

The **Solyx Energy Cloud** integration polls data from the device every minute. Since it uses a cloud connection, an internet connection is required for the integration to work.

## Known limitations

The integration uses a cloud connection; therefore, full local control is not possible.

## Troubleshooting

### Can’t set up the device

#### Authentication error

Verify that you have copied the correct credentials from the Solyx Energy app. To re-authenticate, remove the integration and set it up again.

#### Couldn't retrieve device data due to a communication error

A communication error may appear when configuring the device. This is often caused by no data being available to be retrieved or sent by Home Assistant. If the device has been set up very recently (less than 30 minutes ago), it might help to wait and try again.

### Device data is not updating

If the data in the Solyx Energy app does not correspond with the Home Assistant data, check your internet connection. Be aware that a cloud connection is required, and data is only updated once per minute.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
