---
layout: page
title: "Scripts"
description: "Instructions on how to setup scripts within Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Automation
ha_qa_scale: internal
---

The `script` component allows users to specify a sequence of actions to be executed by Home Assistant when turned on. The script component will create an entity for each script and allow them to be controlled via services.

The sequence of actions is specified using the [Home Assistant Script Syntax](/getting-started/scripts/).

```yaml
# Example configuration.yaml entry
script:
  message_temperature:
    sequence:
      # This is Home Assistant Script Syntax
      - service: notify.notify
        data_template:
          message: Current temperature is {% raw %}{{ states.sensor.temperature.state }}{% endraw %}
```
<p class='note'>
Script names (e.g., `message_temperature` in the example above) are not allowed to contain capital letters, or dash (minus) characters, i.e. `-`. The preferred way to separate words for better readability is to use underscore (`_`) characters. 
</p>

```yaml
script: 
  # Turns on the bedroom lights and then the living room lights 1 minute later
  wakeup:
    alias: Wake Up
    sequence:
      # This is Home Assistant Script Syntax
      - event: LOGBOOK_ENTRY
        event_data:
          name: Paulus
          message: is waking up
          entity_id: device_tracker.paulus
          domain: light
      - alias: Bedroom lights on
        service: light.turn_on
        data:
          entity_id: group.bedroom
          brightness: 100
      - delay:
          # supports seconds, milliseconds, minutes, hours
          minutes: 1
      - alias: Living room lights on
        service: light.turn_on
        data:
          entity_id: group.living_room
```

### {% linkable_title Passing variables to scripts %}

As part of the service, variables can be passed along to a script so they become available within templates in that script.

There are two ways to achieve this. One way is using the generic `script.turn_on` service. To pass variables to the script with this service, call it with the desired variables:

```yaml
# Example configuration.yaml entry
automation:
  trigger:
    platform: state
    entity_id: light.bedroom
    from: 'off'
    to: 'on'
  action:
    service: script.turn_on
    entity_id: script.notify_pushover
    data:
      variables:
        title: 'State change'
        message: 'The light is on!'
```

The other way is calling the script as a service directly. In this case, all service data will be made available as variables. If we apply this approach on the script above, it would look like this:

```yaml
# Example configuration.yaml entry
automation:
  trigger:
    platform: state
    entity_id: light.bedroom
    from: 'off'
    to: 'on'
  action:
    service: script.notify_pushover
    data:
      title: 'State change'
      message: 'The light is on!'
```

Using the variables in the script requires the use of `data_template`:

```yaml
# Example configuration.yaml entry
script:
  notify_pushover:
    sequence:
      - condition: state
        entity_id: switch.pushover_notifications
        state: 'on'
      - service: notify.pushover
        data_template:
          title: "{% raw %}{{ title }}{% endraw %}"
          message: "{% raw %}{{ message }}{% endraw %}"
```

### {% linkable_title In the Overview %}

Scripts in the Overview panel will be displayed with an **EXECUTE** button if the device has no `delay:` or `wait:` statement, and as a toggle switch if it has either of those.

This is to enable you to stop a running script.
