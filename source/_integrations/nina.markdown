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
  - sensor
  - diagnostics
ha_integration_type: service
ha_quality_scale: silver
---

The [NINA](https://www.bbk.bund.de/DE/Warnung-Vorsorge/Warn-App-NINA/warn-app-nina_node.html) {% term integration %} displays warnings from the [Bundesamt für Bevölkerungsschutz und Katastrophenhilfe](https://www.bbk.bund.de/) in Germany.

For each county/city it creates warning slots that change to Unsafe when warnings are present. The details of the warning are provided in separate entities.

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

## Actions

The integration provides the following actions.

### Action: Get affected areas

The `nina.get_affected_areas` action is used to fetch all affected areas of a warning.

- **Target**: NINA binary sensor entity
  - **Description**: The NINA warning binary sensor to get the recommended actions for.
  - **Optional**: No

#### Response data

The response data is a string containing all areas as provided by NINA.

### Action: Get description

The `nina.get_description` action is used to fetch the description of a warning.

- **Target**: NINA binary sensor entity
  - **Description**: The NINA warning binary sensor to get the recommended actions for.
  - **Optional**: No

#### Response data

The response data is a string with the description as provided by NINA.

### Action: Get recommended actions

The `nina.get_recommended_actions` action is used to fetch the recommended actions of a warning.

- **Target**: NINA binary sensor entity
  - **Description**: The NINA warning binary sensor to get the recommended actions for.
  - **Optional**: No

#### Response data

The response data is a string with the recommended actions as provided by NINA.

## Examples

{% details "Example usage" %}
{% raw %}

```yaml
alias: "Notify on NINA warning with full affected areas"
description: "When a NINA warning becomes active, fetch the full list of affected areas and send a notification."
triggers:
  - trigger: state
    entity_id: binary_sensor.nina_warning_1
    to: "on"
actions:
  - action: nina.get_affected_areas
    target:
      entity_id: binary_sensor.nina_warning_1
    response_variable: warning_data
  - action: notify.mobile_app
    data:
      title: "NINA warning active"
      message: "Affected areas: {{ warning_data['binary_sensor.nina_warning_1'] }}"
```

{% endraw %}
{% enddetails %}

## Data updates

The integration checks for warnings every 5 minutes.

## Known limitations

This integration may only work with an Internet connection that supports IPv4.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
