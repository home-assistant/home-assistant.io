---
title: Switchgrid
description: Instructions on how to set up your switches with Home Assistant.
ha_category:
  - Calendar
  - Energy
ha_release: 2024.1
ha_domain: switchgrid
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_platforms:
  - calendar
ha_codeowners:
  - '@licarth'
ha_integration_type: integration
---


[Switchgrid](https://switchgrid.tech) is a service that allows French users to get paid for their electric flexibility.

This integration brings the information about load shed events to Home Assistant, so that you can automatically reduce your electric consumption based on these events.

<div class='note warning'>
  This integration is only useful in France, for now.
</div>

{% include integrations/config_flow.md %}

## YAML configuration

Alternatively, this integration can be configured and set up manually via YAML
instead. To enable the Switchgrid integration in your installation, add the
following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switchgrid:
```

## How it works

Every event (aka. load shed event) in this calendar corresponds to a potentially tensed period on the French electric grid. During these periods, users are encouraged to reduce their electric consumption. In exchange, they will be paid by Switchgrid, and Switchgrid gets paid by the electric grid operator (RTE).

To take part, French households that have a Linky Electric Meter can subscribe to the service and give their consent [on Switchgrid's website](https://app.switchgrid.tech). The service is free and does not require any hardware installation.

## Calendar-based automations

This integration will set up a Calendar platform. The calendar entity is called `calendar.switchgrid_events`.

It is encouraged to set-up calendar-based automations to reduce electric consumption based on events in the calendar. For example, you could turn off your electric heating, your electric water heater, or your electric car charger when an event starts, and resume normal operation when the event ends.

At every event, the Switchgrid integration will create an event in calendar `calendar.switchgrid_events`. The event corresponds to a period of time where electric consumption is expected to be reduced.

Events usually last 1 to 2 hours and are added to the calendar a few hours in advance, if not the day before.

### Simple automation example

Let's imagine you're controlling a heating system with a `climate` entity. You could set up two automations to reduce the temperature when an event starts, and to restore it when the event ends.

```yaml
alias: Load shedding starts
trigger:
  - platform: calendar
    event: start
    entity_id: calendar.switchgrid_events
action:
  - service: climate.set_temperature
    data:
      entity_id: climate.heating
      temperature: 18
mode: single
```

```yaml
alias: Load shedding ends
trigger:
  - platform: calendar
    event: start
    entity_id: calendar.switchgrid_events
action:
  - service: climate.set_temperature
    data:
      entity_id: climate.heating
      temperature: 20
mode: single
```

### Automation optimizations

Instead of just cutting off your electric consumption during the event period, it could be even more interesting (and rewarding) to shift your consumption to a just before and a just after the period. This way, you can minimize impact on your comfort and still get paid by Switchgrid.

```yaml
alias: Load shedding will start in 45 minutes
trigger:
  - platform: calendar
    event: start
    offset: "-0:45:0"
    entity_id: calendar.switchgrid_events
action:
  [...] // Increase room temperature by 1 degree
mode: single
```

```yaml
alias: Load shedding starts
trigger:
  - platform: calendar
    event: start
    entity_id: calendar.switchgrid_events
action:
  [...] // Decrease room temperature by 2 degrees
mode: single
```

```yaml
alias: Load shedding ends
trigger:
  - platform: calendar
    event: end
    entity_id: calendar.switchgrid_events
action:
  [...] // Restore room temperature
mode: single
```
