---
layout: page
title: "Automation Editor"
description: "Instructions on how to use the new automation editor."
date: 2016-04-24 08:30 +0100
sidebar: true
comments: false
sharing: true
footer: true
---

In Home Assistant 0.45 we have introduced the first version of our automation editor. The editor is still in a very early stage and rough around the edges. For now we are only supporting Chrome but better browser support is planned for the future.

If you just created a new configuration with Home Assistant then you're all set! Go to the UI and enjoy.

From the UI choose **Automation** which is located in the sidebar. Press the **+** sign in the lower right corner to get started. This example is based on the manual steps described in the [Getting started section](/getting-started/automation/) for a [`random` sensor](/components/sensor.random/).

Choose a meaningful name for your automation rules.

<p class='img'>
  <img src='{{site_root}}/images/docs/automation-editor/new-automation.png' />
</p>

If the value of the sensor is greater than 10 then the automation rule should apply.

<p class='img'>
  <img src='{{site_root}}/images/docs/automation-editor/new-trigger.png' />
</p>

Firing a [persistent notification](/components/persistent_notification/) is the result.

<p class='img'>
  <img src='{{site_root}}/images/docs/automation-editor/new-action.png' />
</p>

As "Service Data" we want a simple text that is shown as part of the notification.

```json
{ 
  "message": "Sensor value greater than 10"
}
```

Don't forget to save your new automation rule.

## {% linkable_title Updating your configuration to use the editor %}

The automation editor reads and writes to the file `automations.yaml` in your [configuration](/docs/configuration/) folder. Make sure that you have set up the automation component to read from it:

```yaml
# Configuration.yaml example
automation: !include automations.yaml
```

If you still want to use your old automation section, add a label to the old entry:

```yaml
automation old:
- trigger:
    platform: ...
```

## {% linkable_title Migrating your automations to `automations.yaml` %}

If you want to migrate your old automations to use the editor, you'll have to copy them to `automations.yaml`. Make sure that `automations.yaml` remains a list! For each automation that you copy over you'll have to add an `id`. This can be any string as long as it's unique.

```yaml
# Example automations.yaml entry
- id: my_unique_id  # <-- Required for editor to work.
  alias: Hello world
  trigger:
  - entity_id: sun.sun
    from: below_horizon
    platform: state
    to: above_horizon
  condition:
  - above: 17
    below: 25
    condition: numeric_state
    entity_id: sensor.temperature
    value_template: '{% raw %}{{ float(state.state) + 2 }}{% endraw %}'
  action:
  - service: light.turn_on
```

<p class='note'>
Any comments in the YAML file will be lost when you update an automation via the editor.
</p>

