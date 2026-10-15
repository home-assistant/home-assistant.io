---
title: Rotarex DIMES SRG
description: Instructions on how to integrate your Rotarex DIMES SRG gas tank monitors into Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.11
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@kangnieric'
ha_domain: rotarex
ha_platforms:
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
related:
  - url: https://rotarexsrg.com/category/digital-measurement-system
    title: Rotarex digital measurement system product page
---

The **Rotarex DIMES SRG** {% term integration %} lets you monitor your [Rotarex DIMES SRG](https://rotarexsrg.com/category/digital-measurement-system) camping gas tanks in Home Assistant. For each tank, you can see how much gas is left and the battery level of its monitoring device.

Use case: Get a notification when a tank is running low, so you can replace it before it runs empty.

## Supported devices

- Rotarex DIMES SRG camping gas tanks added to your Rotarex account

## Prerequisites

1. Install the **Rotarex DIMES SRG Camping** app on your phone.
2. Create a Rotarex account, then sign in.
3. Add your tanks to the app and check that they sync.
4. Give each tank a name in the app. Home Assistant uses these names for the devices it creates, which makes your tanks easy to tell apart.
5. Have the email address and password of your app account ready.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: "The email address you use to sign in to the Rotarex DIMES SRG Camping app."
Password:
  description: "The password you use to sign in to the Rotarex DIMES SRG Camping app."
{% endconfiguration_basic %}

## Supported functionality

The **Rotarex DIMES SRG** integration creates a device for each tank in your Rotarex account. Each device provides the following entities.

### Sensors

- **Level**
  - **Description**: The amount of gas left in the tank, in %.
- **Battery**
  - **Description**: The battery level of the tank's monitoring device, in %.
  - **Remarks**: This is a diagnostic entity.

## Rotarex DIMES SRG automation examples

Here is an idea to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Get notified when a tank is running low

Get a notification on your phone when the gas level of a tank drops below 20%, so you have time to replace it.

- **Trigger**: Numeric state
  - **Entity**: Camping tank Level (`sensor.camping_tank_level`)
  - **Below**: 20
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a low gas level notification" %}

{% example %}
automation: |
  alias: "Notify when the gas tank is running low"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.camping_tank_level
      below: 20
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The camping gas tank is below 20%. Time to replace it."
{% endexample %}

{% enddetails %}

## Data updates

The **Rotarex DIMES SRG** integration {% term polling polls %} the Rotarex cloud every 15 minutes. Your tanks send their measurements to the Rotarex cloud on their own schedule, so Home Assistant shows the most recent values your tanks have sent.

## Known limitations

- The integration needs an internet connection. Local access to the tanks is not supported.
- Tanks that you add to your Rotarex account after setting up the integration appear after you reload the integration.
- A tank that has not sent any measurements yet shows its sensors as unavailable until its first synchronization.

## Troubleshooting

{% details "Can't sign in" %}

### Symptom: "Invalid authentication"

When you set up the integration, the form shows the message "Invalid authentication".

#### Description

The Rotarex cloud does not accept the email address or password you entered.

#### Resolution

1. Check your email address and password.
2. Sign in to the Rotarex DIMES SRG Camping app with the same email address and password to make sure they work.
3. If you changed your password after setting up the integration, remove the integration and add it again with your new password.

{% enddetails %}

{% details "Can't connect to the Rotarex cloud" %}

### Symptom: "Failed to connect"

When you set up the integration, the form shows the message "Failed to connect".

#### Description

Home Assistant cannot reach the Rotarex cloud.

#### Resolution

1. Make sure Home Assistant is connected to the internet.
2. Check that the Rotarex DIMES SRG Camping app can load your tanks.
3. Wait a few minutes and try again.

{% enddetails %}

{% details "Tanks are missing in Home Assistant" %}

### Symptom: A tank from the app does not appear in Home Assistant

#### Description

Home Assistant only shows the tanks of the Rotarex account used to set up the integration. Tanks added to the account later appear after a reload.

#### Resolution

1. Make sure the tank is visible and up to date in the Rotarex DIMES SRG Camping app.
2. Make sure you use the same Rotarex account in the app and in the integration.
3. Go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Rotarex DIMES SRG**, and reload the integration.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
