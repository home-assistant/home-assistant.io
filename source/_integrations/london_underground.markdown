---
title: London Underground
description: Display the current status of London underground & overground lines within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.49
ha_domain: london_underground
ha_platforms:
  - sensor
ha_integration_type: service
ha_codeowners:
  - '@jpbede'
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
ha_config_flow: true
---

The **London Underground** {% term integration %} will display the status of London underground lines, as well as the overground lines and the DLR.

There 20 possible values that the line can report:
- `Special Service`
- `Closed`
- `Suspended`
- `Part Suspended`
- `Planned Closure`
- `Part Closure`
- `Severe Delays`
- `Reduced Service`
- `Bus Service`
- `Minor Delays`
- `Good Service`
- `Part Closed`
- `Exit Only`
- `No Step Free Access`
- `Change of frequency`
- `Diverted`
- `Not Running`
- `Issues Reported`
- `No Issues`
- `Information`
- `No Service`

Each line also has an associated `Description` attribute which describes any issues in free text - this can be helpful for notifying users.

{% include integrations/config_flow.md %}

{% configuration_basic %}
line:
    description: "A list of the lines to be monitored"
{% endconfiguration_basic %}

### Automation example:

This automation triggers when the status of the Victoria line changes to something significant, and just before commutes are likely to begin. To avoid spam, it only runs if the commuter is at home in the morning or away from home in the evening.

{% raw %}

```yaml
alias: Notify Paulus if there are issues on the Victoria line
mode: single
triggers:
  - entity_id:
      - sensor.victoria
    trigger: state
  - at: "08:00:00"
    trigger: time
  - at: "16:30:00"
    trigger: time
conditions:
  - condition: not
    alias: If Victoria is NOT reporting minor delays or good service
    conditions:
      - condition: or
        conditions:
          - condition: state
            entity_id: sensor.victoria
            state: Good Service
          - condition: state
            entity_id: sensor.victoria
            state: Minor Delays
          - condition: state
            entity_id: sensor.victoria
            state: unavailable
          - condition: state
            entity_id: sensor.victoria
            state: unknown
  - condition: or
    alias: If Paulus at Home in the morning OR away in the afternoon
    conditions:
      - condition: and
        alias: If Paulus at home in the morning
        conditions:
          - condition: time
            before: "14:00:00"
            after: "07:00:00"
          - condition: state
            entity_id: person.paulus
            state: home
      - condition: and
        alias: If Paulus away in the afternoon
        conditions:
          - condition: time
            before: "19:00:00"
            after: "13:00:00"
          - condition: state
            entity_id: person.paulus
            state: home
actions:
  - data:
      title: "{{'Victoria Line: ' + states.sensor.victoria.state}}"
      message: "{{states.sensor.victoria.attributes.Description}}"
    action: notify.mobile_app_pixel_7

```

{% endraw %}

Powered by TfL Open Data [TFL](https://api.tfl.gov.uk/).
