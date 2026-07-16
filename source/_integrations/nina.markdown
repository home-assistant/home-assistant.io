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

### Action: Get warning details

The `nina.get_details` action is used to fetch all details of a warning.

- **Target**: NINA binary sensor entity
  - **Description**: The NINA warning binary sensor to get the recommended actions for.
  - **Optional**: No

#### Response data

The response data is an object containing all the warning data. Returns `null` when no warning is active.

```json
{
  {
  "binary_sensor.bad_ditzenbach_goppingen_baden_wurttemberg_warning_1": {
    "headline": "Amtliche WARNUNG vor extremer HITZE",
    "description": "Am Freitag wird eine extreme Wärmebelastung bis zu einer Höhe von 400m erwartet.<br/><br/>Am Samstag wird eine extreme Wärmebelastung bis zu einer Höhe von 600m erwartet.<br/><br/>Heute ist der 9. Tag der Warnsituation in Folge.",
    "sender": "Zentrum für Medizin-Meteorologische Forschung",
    "severity": "Severe",
    "recommended_actions": "Hitzebelastung kann für den menschlichen Körper gefährlich werden und zu einer Vielzahl von gesundheitlichen Problemen führen. Vermeiden Sie nach Möglichkeit die Hitze, trinken Sie ausreichend Wasser und halten Sie die Innenräume kühl.",
    "affected_areas": "Gemeinde Oberreichenbach, Gemeinde Neuweiler, Gemeinde Simmersfeld, Gemeinde Simmozheim, Gemeinde Rohrdorf, Gemeinde Ostelsheim, Gemeinde Egenhausen, Gemeinde Dobel, Gemeinde Schopfloch, Stadt Haiterbach, Gemeinde Gechingen, Gemeinde Wörnersberg, Gemeinde Enzklösterle, Gemeinde Seewald, Gemeinde Waldachtal, Stadt Bonndorf im Schwarzwald, Stadt Engen, Gemeinde Eigeltingen, Mitgliedsgemeinde in Verwaltungsgemeinschaft Pfofeld, Stadt Pappenheim und 229 weitere.",
    "web": "https://dwd.de/warnungen",
    "id": "dwd.2.49.0.0.276.0.DWD.PVW.1782460800000.559ba8f2-38a1-484f-b6e7-1424f85d1441.MUL",
    "sent": "2026-06-26T09:59:50+02:00",
    "start": "2026-06-26T10:00:00+02:00",
    "expires": "2026-06-27T19:00:00+02:00"
  }
}
```

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
  - action: nina.get_details
    target:
      entity_id: binary_sensor.nina_warning_1
    response_variable: warning_data
  - action: notify.mobile_app
    data:
      title: "NINA warning active"
      message: "Affected areas: {{ warning_data['binary_sensor.nina_warning_1']['affected_areas'] }}"
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
