---
title: NINA
description: Instructions on how to set up NINA warnings in Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
ha_release: 2022.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@DeerMaximum'
ha_domain: nina
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: service
ha_quality_scale: silver
---

The [NINA](https://www.bbk.bund.de/DE/Warnung-Vorsorge/Warn-App-NINA/warn-app-nina_node.html) {% term integration %} displays warnings from the [Bundesamt für Bevölkerungsschutz und Katastrophenhilfe](https://www.bbk.bund.de/) in Germany.

For each county/city it creates warning slots that change to Unsafe when warnings are present. The details of the warning are provided in separate entities.

Use case: Make your home react to official warnings. For example, you can turn off your ventilation system to help prevent smoke from entering your home when a fire is reported, or close the skylights when a storm is expected.

{% include integrations/config_flow.md %}

{% configuration_basic %}
City/county:
  description: "City/county to receive warnings for. Grouped for better searchability."
Maximum warnings:
  description: "Maximum warnings fetched per city/county"
Affected area filter:
  description: "Whitelist regex to filter warnings based on affected areas. For details see below."
Headline blocklist:
  description: "Blacklist regex to filter warning based on headlines. For details see below."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
City/county:
  description: "City/county to receive warnings for. Grouped for better searchability."
Maximum warnings:
  description: "Maximum warnings fetched per city/county"
Affected area filter:
  description: "Whitelist regex to filter warnings based on affected areas. For details see below."
Headline blocklist:
  description: "Blacklist regex to filter warning based on headlines. For details see below."
{% endconfiguration_basic %}

## Filter

The integration includes the possibility to filter warnings in two ways via a regex.

{% note %}
All filters are applied to lowercase text only.
{% endnote %}

### Headline blocklist

This blocklist filters warnings based on the headline. In other words, if the regular expression matches the headline of the warning, the warning will be **ignored**.

Default: Match nothing (`/(?!)/`)

#### Example

Ignore warnings that contain the word `corona`

Regex: `.*corona.*` <br>
Headline: `corona-verordnung des landes: warnstufe durch landesgesundheitsamt ausgerufen`

### Affected area filter

This filter **whitelists** warnings based on the affected area. In other words, if the regular expression matches the area, the warning will be **displayed**.

Default: Match all (`.*`)

#### Example

Show only warnings from the city of nagold.

Regex: `.*nagold.*` <br>
Areas: `gemeinde oberreichenbach, gemeinde neuweiler, stadt nagold`

## Supported functionality

This integration provides the following entities for each warning slot.

### Sensors

- **Affected areas**:
  - **Description**: Areas affected by the warning.
  - **Remarks**: Shortened to 250 chars. To get all areas please use the `nina.get_affected_areas` action.
- **Expires**:
  - **Description**: Expiration timestamp of the warning.
- **Headline**:
  - **Description**: Headline of the warning.
- **More information URL**:
  - **Description**: URL with further information about the warning.
- **Sender**:
  - **Description**: Sender of the warning.
- **Sent**:
  - **Description**: Transmission timestamp of the warning.
- **Severity**:
  - **Description**: Severity of the warning.
  - **Options**: Extreme, Severe, Moderate, Minor, Unknown
- **Start**:
  - **Description**: Starting timestamp of the warning.

### Binary sensors

- **Warning**:
  - **Description**: Presence of a warning.
  - **Attributes**: Available attributes are listed below.

### Attributes

The following attributes are available for the warnings.

- **Attributes**:
  - `id`: Individual ID for each warning.

#### Response data

The response data is a string with the description as provided by NINA.

## Data updates

The integration checks for warnings every 5 minutes.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
