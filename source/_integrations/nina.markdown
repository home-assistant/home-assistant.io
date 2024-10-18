---
title: NINA
description: Instructions on how to set up NINA warnings in Home Assistant.
ha_category:
  - Binary sensor
ha_release: 2022.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@DeerMaximum'
ha_domain: nina
ha_platforms:
  - binary_sensor
ha_integration_type: integration
---

The [NINA](https://www.bbk.bund.de/DE/Warnung-Vorsorge/Warn-App-NINA/warn-app-nina_node.html) integration displays warnings from the [Bundesamt für Bevölkerungsschutz und Katastrophenhilfe](https://www.bbk.bund.de/) in Germany.

For each county/city it creates warning slots that change to Unsafe when warnings are present. The text of the warning and the metadata are stored in the attributes of the slots.

{% important %}
This integration may only work with an Internet connection that supports IPv4.
{% endimportant %}

{% include integrations/config_flow.md %}

### Filter

The integration includes the possibility to filter warnings in two ways via a regex.

{% note %}
All filters are applied to lowercase text only.
{% endnote %}

#### Headline filter

This filter filters warnings based on the headline as a **blacklist**. In other words, if the regular expression matches the headline of the warning, the warning will be **ignored**.

Default: Match nothing (`/(?!)/`)

##### Example

Ignore warnings that contain the word `corona`

Regex: `.*corona.*` <br>
Headline: `corona-verordnung des landes: warnstufe durch landesgesundheitsamt ausgerufen`

#### Affected area filter

This filter **whitelists** warnings based on the affected area. In other words, if the regular expression matches the area, the warning will be **displayed**.

Default: Match all (`.*`)

##### Example

Show only warnings from the city of nagold.

Regex: `.*nagold.*` <br>
Areas: `gemeinde oberreichenbach, gemeinde neuweiler, stadt nagold`

### Attributes

| Attribute    | Description                            |
| ------------ | -------------------------------------- |
| `headline` | *(str)* Official headline of the warning. |
| `description` | *(str)* Official description of the warning. |
| `sender` | *(str)* Sender of the warning. Can be empty. |
| `severity` | *(str)* Severity of the warning. <br>Extreme - Extraordinary threat to life or property <br>Severe - Significant threat to life or property <br>Moderate - Possible threat to life or property <br>Minor – Minimal to no known threat to life or property <br>Unknown - Severity unknown |
| `recommended_actions` | *(str)* The recommendations for action. |
| `affected_areas` | *(str)* Areas where the warning applies. |
| `id` | *(str)* Individual ID for each warning. |
| `sent` | *(time)* Transmission time and date (UTC) of the issued warning. |
| `start` | *(time)* Starting time and date (UTC) of the issued warning. Can be empty. |
| `expires` | *(time)* Expiration time and date (UTC) of the issued warning. Can be empty. |
