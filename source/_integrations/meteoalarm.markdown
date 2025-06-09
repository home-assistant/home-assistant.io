---
title: MeteoAlarm
description: Instructions on how to set up MeteoAlarm binary sensors within Home Assistant.
ha_category:
  - Binary sensor
ha_release: 0.93
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@rolfberkenbosch'
ha_domain: meteoalarm
ha_platforms:
  - binary_sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

The `MeteoAlarm` platform allows one to watch for weather alerts in Europe from [MeteoAlarm](https://www.meteoalarm.org) (EUMETNET). To use this binary sensor, you need the country and the province name from  [MeteoAlarm](https://feeds.meteoalarm.org). Please note that it is crucial to write the country name exactly as it appears in the URL starting with https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-, including any hyphens used in the name. Failure to do so may result in errors or incorrect data.

The binary sensor state shows the warning message if applicable. The details are available as attribute.

## Configuration

To enable this binary sensor, add the following lines to your {% term "`configuration.yaml`" %}:

```yaml
binary_sensor:
  - platform: meteoalarm
    country: "netherlands"
    province: "Groningen"
```

{% configuration %}
name:
  description: Binary sensor name
  required: false
  default: meteoalarm
  type: string
country:
  description: The fullname of your country in English format (lowercases)
  required: true
  type: string
province:
  description: The province
  required: true
  type: string
language:
  description: "The ISO code of your language, please be aware that this is only possible in the current country. So 'nl-NL' or 'nl-BE' is only possible in Netherlands or Belgium"
  required: false
  type: string
  default: "en-US"
{% endconfiguration %}


Example output

You will find an example below when the state is "on".

```yaml
attribution: Information provided by MeteoAlarm
language: en-GB
category: Met
event: Severe forest-fire warning
responseType: Monitor
urgency: Immediate
severity: Severe
certainty: Likely
effective: 2019-05-02T22:00:00+00:00
onset: 2019-05-02T22:00:00+00:00
expires: 2019-05-03T21:59:00+00:00
senderName: Stig Carlsson
headline: Orange forest-fire for Hedmark, Oppland
description: High grass and heather fire hazard in areas without snow until significant amount of precipitation.
Consequences: Vegetation is very easily ignited and very large areas may be affected.
instruction: Be very careful with open fire. Follow the instructions from the local authorities. Emergency services should assess a necessary level of alertness.
awareness_level: 3; orange; Severe
awareness_type: 8; forest-fire
unit_of_measurement:
friendly_name: meteoalarm
icon: mdi:alert
```

There are a few awareness levels:

- 2; yellow; Moderate
- 3; orange; Severe
- 4; red; High

Example automation

{% raw %}

```yaml
automation:
  - alias: "Alert me about weather warnings"
    triggers:
      - trigger: state
        entity_id: binary_sensor.meteoalarm
        from: "off"
    actions:
      - action: notify.notify
        data:
          title: "{{state_attr('binary_sensor.meteoalarm', 'headline')}}"
          message: "{{state_attr('binary_sensor.meteoalarm', 'description')}} is effective on {{state_attr('binary_sensor.meteoalarm', 'effective')}}"
```

{% endraw %}

{% note %}
This integration is not affiliated with MeteoAlarm and retrieves data from the website by using the XML feeds. Use it at your own risk.
{% endnote %}
