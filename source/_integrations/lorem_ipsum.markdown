---
title: Lorem ipsum
description: Example document structure and text blocks for integration documentation.
ha_release: 2025.02
ha_iot_class: Local Push
ha_codeowners:
  - '@home-assistant/core'
ha_domain: lorem_ipsum
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

The **Lorem ipsum** {% term integration %} is not an actual integration but a documentation page about creating integration documentation. It shows examples of the available documentation features (such as inline icons, text box, links to related topics, and glossary entries). It also shows how the documentation could be structured.

Much of this content you have already encountered in the developer documentation, under [Documentation standard](https://developers.home-assistant.io/docs/documenting/standards) or in the documentation rules of the [Integration Quality Scale](https://developers.home-assistant.io/docs/core/integration-quality-scale/rules/). This page here is meant to be used as a hands-on copy-paste-then-edit type of template.

## Inline text elements

This section shows elements you can use within your text.

### My links

To indicate a location in the UI, you can use a [My link](/docs/tools/quick-bar/#my-links). Selecting that link opens that page in the user's installation. For example: "Go to {% my integrations title="**Settings** > **Devices & services**" %} and select your integration."

Here are a few examples:

- {% my areas title="**Settings** > **Areas, labels & zones**" %}
- {% my automations title="**Settings** > **Automations & scenes**" %}
- {% my backup title="**Settings** > **System** > **Backups**" %}
- {% my general title="**Settings** > **System** > **General**" %}
- {% my logs title="**Settings** > **System** > **Logs**" %}
- {% my network title="**Settings** > **System** > **Network**" %}
- {% my profile title="**User profile**" %}

To identify a My link, in Home Assistant, open the page of interest and press the `m` key.

### Formatting

- Use bold when referring to UI strings: **Settings**, **Areas, labels & zones**
- Use backtick when referring to file paths, file names, variable names, or a text that you enter in a field: the `/boot/config.txt` file, the `this` variable, enter `/newbot`.

### Glossary term reference

Some Home Assistant terms and concepts are explained in a Glossary. If you add a reference to the definition of such a term, the term definition is shown as a tooltip. For example: {% term integration %}, {% term entity %}, and {% term "Home Assistant Operating System" %}. You can find the full list of glossary terms on the [Glossary](/docs/glossary/) page. To learn more about using glossary terms, refer to the [Glossary section in the developer documentation](/docs/documenting/standards#glossary--terminology-tooltips).

### Acronyms

If possible, try to avoid using abbreviations and acronyms.

If you want to use an acronym or abbreviation, you can add an abbreviation tag to show the full term as a tooltip. For example: <abbr title="Audio & video">A/V</abbr>, <abbr title="current transformers">CT</abbr>, <abbr title="Dutch smart meter requirement">DSMR</abbr>, <abbr title="embedded MultiMediaCard">eMMC</abbr>, <abbr title="flash video">FLV</abbr>, <abbr title="Large Language Models">LLMs</abbr>, <abbr title="Model Context Protocol">MCP</abbr>, <abbr title="pan, tilt, and zoom">PTZ</abbr>, <abbr title="real-time messaging protocol">RTMP</abbr>, <abbr title="real-time streaming protocol">RTSP</abbr>, or <abbr title="USB-On-The-Go">USB-OTG</abbr>.

### Inline icons

To refer to an icon in the UI, you can use icons from the [Iconify library](https://icon-sets.iconify.design/mdi/). Here are some examples:

- Three dots menu: {% icon "mdi:dots-vertical" %}
- Hamburger menu: {% icon "mdi:menu" %}
- Edit: {% icon "mdi:edit" %}
- Revert {% icon "mdi:restore" %}
- Eye: {% icon "mdi:eye" %}
- Trash: {% icon "mdi:trash" %}
- Cog: {% icon "mdi:cog" %}
- Cog outline: {% icon "mdi:cog-outline" %}
- Drag: {% icon "mdi:drag" %}
- Move-cursor: {% icon "mdi:cursor-move" %}
- Arrow left: {% icon "mdi:arrow-left-bold" %}
- Arrow right: {% icon "mdi:arrow-right-bold" %}
- Checkbox list: {% icon "mdi:order-checkbox-ascending" %}
- Upload network: {% icon "mdi:upload-network" %}
- Security network: {% icon "mdi:security-network" %}
- Routes: {% icon "mdi:routes" %}

## Collapsible text block

Use a details block to make a text block collapsible:

{% details "Generate Client ID and Client Secret" %}

1. Your Fitbit account must be registered as a Developer account at the [Fitbit Developer Portal](https://dev.fitbit.com), and have a verified email address.
2. Visit the [fitbit developer page](https://dev.fitbit.com/apps/new) to register an application.
3. Enter an **Application Name** of your choosing, for example **Home Assistant**.
4. ...
{% enddetails %}

## Text boxes

{% note %}
You can use a note to highlight a section.
{% endnote %}

{% important %}
You can use "important" to highlight a section that you feel is very important.
{% endimportant %}

## Images

Markdown syntax to add an image, for example to illustrate a step:

1. To adjust the light temperature and brightness, move the sliders:
    ![Screenshot of tile cards with features](/images/dashboards/features/screenshot-tile-feature-grid.png)
2. Then do this ...

To add an image legend you can use HTML:

<p class='img'><img src='/images/dashboards/features/screenshot-tile-feature-grid.png' alt="Screenshot of tile cards with features.">
Screenshot of tile cards with features.
</p>

## Videos

Use the following syntax to reference a video from Youtube:

<lite-youtube videoid="ZgoaoTpIhm8" videoStartAt="3907" videotitle="Introducing the Home Assistant Voice Preview Edition - Voice: Chapter 8"></lite-youtube>

## Document structure with dummy content

This section shows outlines the document structure and provides some example text. The example text includes some reusable text blocks (includes) such as `include integrations/config_flow.md` and styling elements such as `configuration_basic`.

The examples are taken from the [Integration Quality Scale](https://developers.home-assistant.io/docs/core/integration-quality-scale/rules/).

### Basic structure

- Introduction
  - Use case
- [Supported/unsupported devices](#supported-devices)
- [Prerequisites](#prerequisites)
- Configuration
- [Configuration options](#configuration-options)
- [Supported functionality](#supported-functionality)
- [Actions](#actions)
- [Examples](#examples)
- [Data updates](#data-updates)
- [Known limitations](#known-limitations)
- [Troubleshooting](#troubleshooting)
- [Community notes](#community-notes)
- [Removing the integration](#removing-the-integration)

### Example text below

The **my integration** {% term integration %} is used to integrate with the devices of [MyCompany](https://www.mycompany.com). MyCompany creates various smart home appliances and devices and are known for their MyProduct.
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

In case your integration is used via a config flow:

{% configuration_basic %}
Host:
    description: "The IP address of your bridge. You can find it in your router or in the Integration app under **Bridge Settings** > **Local API**."
Local access token:
    description: "The local access token for your bridge. You can find it in the Integration app under **Bridge Settings** > **Local API**."
{% endconfiguration_basic %}

In case an integration is set up via YAML in the {% term "`configuration.yaml`" %}:

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

The XY integration provides the following entities.

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
  - **Available for machines**: Linea Micra#### Updates

- **Gateway firmware**
  - **Description**: Firmware status of the gateway.
  - **Available for machines**: all

## Actions

The integration provides the following actions.

### Action: Get schedule

The `my_integration.get_schedule` service is used to fetch a schedule from the integration.

| Data attribute    | Optional | Description                                          |
| ----------------- | -------- | ---------------------------------------------------- |
| `config_entry_id` | No       | The ID of the config entry to get the schedule from. |

## Examples

### Turning off the LEDs during the night

The status LEDs on the device can be quite bright.
To tackle this, you can use this blueprint to easily automate the LEDs turning off when the sun goes down.

link to blueprint.

## Data updates

The **My** integration fetches data from the device every 5 minutes by default.
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

## Community notes

Note that some users have reported issues creating Home Assistant containers on ARM QNAP systems (for example, TS-233) with Container Station 3. A possible workaround is the "Docker compose" approach based on a YAML file (see section "Docker compose").

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the app of the manufacturer and remove the Home Assistant integration from there as well.
