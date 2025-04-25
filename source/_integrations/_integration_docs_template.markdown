---
title: My integration
description: Example document structure and text blocks for integration documentation.
ha_release: 2025.3
ha_iot_class: Local Push
ha_codeowners:
  - '@home-assistant/core'
ha_domain: my_integration
ha_integration_type: integration
related:
  - url: https://developers.home-assistant.io/docs/documenting/standards
    title: Documentation standard
  - url: https://developers.home-assistant.io/docs/core/integration-quality-scale/rules/
    title: Integration Quality Scale - Rules
  - docs: /docs/glossary/
    title: Glossary
  - docs: /docs/tools/quick-bar/#my-links
    title: My link
---

<!--- The integration documentation template provides a documentation structure as well as some example content per section. The example content is meant for inspiration, it may not apply for your integration or will at least have to be adapted. -->

<!--- Use this template together with the developer documentation, under [Documentation standard](https://developers.home-assistant.io/docs/documenting/standards) and the documentation rules of the [Integration Quality Scale](https://developers.home-assistant.io/docs/core/integration-quality-scale/rules/). -->

The **My integration** {% term integration %} is used to integrate with the devices of [MyCompany](https://www.mycompany.com). MyCompany creates various smart home appliances and devices and are known for their MyProduct.
Use case: When you combine it with their other device you can do x.

## Supported devices

The following devices are known to be supported by the integration:

- Device 1
- Device 2
- Every appliance that runs MyOS

## Unsupported devices

The following devices are not supported by the integration:

- Device 3
- Appliances built before 2010

## Prerequisites

1. Open the app store and install the **MyProduct** app.
2. Create an account.
3. Add a device to the app.
4. Open the app and go to the **Settings** page.
5. Select **Expose API**.

{% include integrations/config_flow.md %}

<!--- The next section is about documenting configuration variables. For details, refer to the [documentation standard on configuration variables](/docs/documenting/standards#configuration-variables). -->

<!--- In case your integration is used via a config flow: -->

{% configuration_basic %}
Host:
    description: "The IP address of your bridge. You can find it in your router or in the Integration app under **Bridge Settings** > **Local API**."
Local access token:
    description: "The local access token for your bridge. You can find it in the Integration app under **Bridge Settings** > **Local API**."
{% endconfiguration_basic %}

<!--- In case an integration is set up via YAML in the {% term "`configuration.yaml`" %}: -->

{% configuration %}
Host:
    description: "The IP address of your bridge. You can find it in your router or in the Integration app under **Bridge Settings** > **Local API**."
    required: false
    type: string
Local access token:
    description: "The local access token for your bridge. You can find it in the Integration app under **Bridge Settings** > **Local API**."
    required: false
    type: string
{% endconfiguration %}

## Configuration options

The integration provides the following configuration options:

{% configuration_basic %}
Country code:
  description: You can specify the country code (NL or BE) of the country to display on the camera.
Timeframe:
  description: Minutes to look ahead for precipitation forecast sensors (minimum 5, maximum 120).
{% endconfiguration_basic %}

## Supported functionality

### Entities

The **My integration** integration provides the following entities.

#### Buttons

- **Start backflush**
  - **Description**: Starts the backflush process on your machine. You got 15 seconds to turn the paddle after activation.
  - **Available for machines**: all

#### Numbers

- **Dose**
  - **Description**: Dosage (in ticks) for each key
  - **Available for machines**: GS3 AV, Linea Mini.
  - **Remarks**: GS3 has this multiple times, one for each physical key (1-4), and the entities are disabled by default.

#### Sensors

- **Current coffee temperature**
  - **Description**: Current temperature of the coffee boiler.
  - **Available for machines**: all
  - **Remarks**: When the machine reaches temperature, this will be approximately 3 degrees higher than the `Coffee target temperature`, due to different measurement points.

- **Current steam temperature**
  - **Description**: Current temperature of the steam boiler.
  - **Available for machines**: Linea Micra, GS3 AV, GS3 MP.
  - **Remarks**: -

#### Selects

- **Prebrew/-infusion mode**
  - **Description**: Whether to use prebrew, preinfusion, or neither.
  - **Options**: Disabled, Prebrew, Preinfusion
  - **Available for machines**: Linea Micra, Linea Mini, GS3 AV

- **Steam level**
  - **Description**: The level your steam boiler should run at.
  - **Options**: 1, 2, 3
  - **Available for machines**: Linea Micra

#### Updates

- **Gateway firmware**
  - **Description**: Firmware status of the gateway.
  - **Available for machines**: all

## Actions

The integration provides the following actions.

### Action: Get schedule

The `my_integration.get_schedule` action is used to fetch a schedule from the integration.

- **Data attribute**: `config_entry_id`
  - **Description**: The ID of the config entry to get the schedule from.
  - **Optional**: No

## Examples

### Turning off the LEDs during the night

The status LEDs on the device can be quite bright.
To tackle this, you can use this blueprint to easily automate the LEDs turning off when the sun goes down.

link to the blueprint on the [blueprints
    exchange](https://community.home-assistant.io/c/blueprints-exchange/53)

## Data updates

The **My integration** integration fetches data from the device every 5 minutes by default.
Newer devices (the ones running MyOS) have the possibility to push data.
In this case, pushing data is enabled when the integration is started. If enabling data push fails, the integration uses data {% term polling %}.

## Known limitations

The integration does not provide the ability to reboot, which can instead be done via the manufacturer's app.

## Troubleshooting

### Can’t set up the device

#### Symptom: “This device can’t be reached”

When trying to set up the integration, the form shows the message “This device can’t be reached”.

##### Description

This means the settings on the device are incorrect, since the device needs to be enabled for local communication.

##### Resolution

To resolve this issue, try the following steps:

1. Make sure your device is powered up (LEDs are on).
2. Make sure your device is connected to the internet:
   - Make sure the app of the manufacturer can see the device.
3. Make sure the device has the local communication enabled:
   - Check the device’s settings.
   - Check the device’s manual.
...

### I can't see my devices

Make sure the devices are visible and controllable via the manufacturer's app.
If they are not, check the device's power and network connection.

### The device goes unavailable after a day

Make sure you turned off the device's power-saving mode.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the app of the manufacturer and remove the Home Assistant integration from there as well.
