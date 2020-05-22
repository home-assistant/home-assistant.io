---
title: "Automation Editor"
description: "Instructions on how to use the automation editor."
---

In Home Assistant 0.45 we introduced the first version of our automation editor. If you just created a new configuration with Home Assistant, then you're all set! Go to the UI and enjoy.

From the UI choose **Configuration** which is located in the sidebar, then click on **Automation** to go to the automation editor. Press the **+** sign in the lower right corner to get started. This example is based on the manual steps described in the [Getting started section](/getting-started/automation/) for a [`random` sensor](/integrations/random#sensor).

Choose a meaningful name for your automation rules.

<p class='img'>
  <img src='{{site_root}}/images/docs/automation-editor/new-automation.png' />
</p>

If the value of the sensor is greater than 10, then the automation rule should apply.

<p class='img'>
  <img src='{{site_root}}/images/docs/automation-editor/new-trigger.png' />
</p>

Firing a [persistent notification](/integrations/persistent_notification/) is the result.

<p class='img'>
  <img src='{{site_root}}/images/docs/automation-editor/new-action.png' />
</p>

As "Service Data" we want a simple text that is shown as part of the notification.

```json
{ 
  "message": "Sensor value greater than 10"
}
```

The Automation Editor does not currently support 'data_template' as a "Service Data" entry. For these actions, it will be necessary to edit as YAML. This can be achieved by clicking the menu (3 vertical dots) and selecting "Edit as YAML"

```
data_template:
  message: >
    Paulus just changed from {{ trigger.from_state.state }}
    to {{ trigger.to_state.state }}
```

Don't forget to save your new automation rule. For your saved automation rule to come into effect, you will need to go to the **Configuration** page and click on **Reload Automation**.

## Updating your configuration to use the editor

First, check that you have activated the configuration editor.

```yaml
# Activate the configuration editor
config:
```

The automation editor reads and writes to the file `automations.yaml` in the root of your [configuration](/docs/configuration/) folder. 
Currently, both the name of this file and its location are fixed.
Make sure that you have set up the automation integration to read from it:

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

You can use the `automation:` and `automation old:` sections at the same time:
 - `automation old:` to keep your manual designed automations
 - `automation:` to save the automation created by the online editor

```yaml
automation: !include automations.yaml
automation old: !include_dir_merge_list automations
```


## Migrating your automations to `automations.yaml`

If you want to migrate your old automations to use the editor, you'll have to copy them to `automations.yaml`. Make sure that `automations.yaml` remains a list! For each automation that you copy over, you'll have to add an `id`. This can be any string as long as it's unique.

For example, the below automation will be triggered when the sun goes from below the horizon to above the horizon. Then, if the temperature is between 17 and 25 degrees, a light will be turned on.

```yaml
# Example automations.yaml entry
- id: my_unique_id  # <-- Required for editor to work, for automations created with the editor the id will be automatically generated.
  alias: Hello world
  trigger:
  - platform: state 
    entity_id: sun.sun
    from: below_horizon
    to: above_horizon
  condition:
  - condition: numeric_state
    entity_id: sensor.temperature
    above: 17
    below: 25
    value_template: '{% raw %}{{ float(state.state) + 2 }}{% endraw %}'
  action:
  - service: light.turn_on
```

<div class='note'>
Any comments in the YAML file will be lost and templates will be reformatted when you update an automation via the editor.
</div>
