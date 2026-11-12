---
description: Instructions on how to get weather warnings for a European region from MeteoAlarm in Home Assistant.
ha_release: 0.93
ha_domain: meteoalarm
---

The **MeteoAlarm** {% term integration %} shows the weather warnings that national weather services in Europe publish on [MeteoAlarm](https://meteoalarm.org) (EUMETNET). It creates a binary sensor for a region you choose. The sensor is on while the region has a current warning, and its attributes describe the most severe one, such as its level, type, headline and instructions. You can use it to get notified about storms, heavy rain, heat or snow, or to show warnings on a dashboard.

The integration fetches each country's public MeteoAlarm feed every 5 minutes. No account or API key is needed.

## Prerequisites

You need the name of your region as MeteoAlarm uses it, or its EMMA_ID code:

1. Open [MeteoAlarm](https://meteoalarm.org) and find your region on the map. Its name is shown when you select it.
2. Alternatively, look up the region's EMMA_ID code, such as `ES098` for Sierra Sur de Sevilla, with the [MeteoAlarm EMMA_ID region explorer](https://saratoga-weather.org/meteoalarm-map/).

A code is the safest choice: some names appear in more than one region, and the name is matched as a regular expression.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Country:
    description: "The country whose MeteoAlarm feed to use."
Region:
    description: "The region's name as MeteoAlarm shows it, or its EMMA_ID code."
Language:
    description: "The language code for the warning texts, such as `en` or `de`. The default is `en`. Not every country publishes warnings in every language. If a warning isn't available in your language, the text is shown in the first language the feed has."
{% endconfiguration_basic %}

Home Assistant checks that it can load the country's feed before it adds the region. It can't check the region itself, because MeteoAlarm's feeds only list regions that currently have a warning. If the sensor never turns on when MeteoAlarm shows a warning for your region, check the region name or code.

You can add several regions, but each one only once.

## Supported functionality

### Binary sensor

For each region, the integration creates a binary sensor:

- **On**: the region has at least one current warning.
- **Off**: there's no current warning. A warning that has expired doesn't turn the sensor on, even if the feed still lists it.

While the sensor is on, its attributes describe the most severe current warning. Warnings are ranked by their awareness level, then by severity. The attributes come from the warning's [CAP](https://en.wikipedia.org/wiki/Common_Alerting_Protocol) message and depend on the country, but usually include:

- `awareness_level`: the level and color, such as `3; orange; Severe`. Warnings are yellow (2), orange (3) or red (4).
- `awareness_type`: the type of weather, such as `1; Wind` or `8; forest-fire`.
- `event`, `headline`, `description` and `instruction`: the warning's texts.
- `onset`, `effective` and `expires`: when the weather is expected to start, when the warning takes effect, and when it ends.
- `severity`, `certainty` and `urgency`: the CAP classification.
- `identifier`, `message_type`, `references` and `sent`: the CAP message fields. They identify each warning and link an update or cancellation to the warning it replaces.

An example of the attributes while the sensor is on:

```yaml
awareness_level: 3; orange; Severe
awareness_type: 8; forest-fire
event: Severe forest-fire warning
headline: Orange forest-fire for Hedmark, Oppland
description: >-
  High grass and heather fire hazard in areas without snow until significant
  amount of precipitation.
instruction: >-
  Be very careful with open fire. Follow the instructions from the local
  authorities.
onset: "2019-05-02T22:00:00+00:00"
expires: "2019-05-03T21:59:00+00:00"
severity: Severe
certainty: Likely
urgency: Immediate
identifier: 2.49.0.0.578.0.NO.190502140112.2805_190502
message_type: Alert
attribution: Information provided by MeteoAlarm
```

## Data updates

The integration polls the country's MeteoAlarm feed every 5 minutes. If MeteoAlarm can't be reached, the sensor becomes unavailable until the next successful update.

## MeteoAlarm automation examples

The binary sensor turns on when your region gets a warning, so you can use it to be told about new weather warnings. Here is an idea to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Get notified about a new warning

Get a notification on your phone when your region gets a weather warning, with its headline, description and timing.

- **Trigger**: Entity: State
  - **Entity**: Your MeteoAlarm binary sensor
  - **From**: Off
  - **To**: On
- **Action**: Notifications: Send a notification message
  - **Target**: Your phone
  - **Title** and **Message**: Templates that read the sensor's `headline`, `description`, `onset` and `expires` attributes, as in the YAML example below.

Using **From**: Off means you get one notification for each new warning, and none when the sensor comes back from unavailable while the same warning is still current.

{% details "YAML example for a new warning notification" %}

{% example %}
automation: |
  alias: "Notify me about weather warnings"
  triggers:
    - trigger: state
      entity_id: binary_sensor.meteoalarm
      from: "off"
      to: "on"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_phone
      data:
        title: "{{ state_attr('binary_sensor.meteoalarm', 'headline') }}"
        message: >
          {{ state_attr('binary_sensor.meteoalarm', 'description') }}
          From {{ state_attr('binary_sensor.meteoalarm', 'onset') }}
          until {{ state_attr('binary_sensor.meteoalarm', 'expires') }}.
{% endexample %}

{% enddetails %}

Replace `binary_sensor.meteoalarm` with your sensor's entity ID, and `notify.my_phone` with your phone's notify entity.

## Known limitations

- The sensor shows one warning, the most severe one. When several warnings are current at once, the others aren't shown.
- Regions are matched by name or EMMA_ID code. Matching by location isn't supported yet.
- Not every country uses the same region names or codes in its feed, and some feeds keep warnings for a while after they expire.

## Troubleshooting

### The MeteoAlarm YAML configuration import failed

Earlier versions of this integration were set up in YAML. When Home Assistant starts, it imports your YAML configuration and keeps the sensor's entity ID, `binary_sensor.meteoalarm` by default. After the import, remove the `meteoalarm` binary sensor from your {% term "`configuration.yaml`" %} file and restart Home Assistant.

If the import fails, a repair issue explains why:

- **MeteoAlarm could not be reached**: check your internet connection and restart Home Assistant to try again.
- **MeteoAlarm has no feed for that country**: correct the country in your YAML configuration and restart Home Assistant. The country must be written as in MeteoAlarm's feed address, `https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-<country>`, for example `united-kingdom`.

Alternatively, remove the YAML configuration and add the integration in the UI.

### The sensor never turns on

MeteoAlarm's feeds only list regions that currently have a warning, so Home Assistant can't check the region you entered. When MeteoAlarm shows a warning for your region but the sensor stays off, remove the region and add it again with its EMMA_ID code.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

{% note %}
This integration is not affiliated with MeteoAlarm or EUMETNET.
{% endnote %}
