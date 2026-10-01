---
title: "Trigger"
action: ifttt.trigger
domain: ifttt
description: "Sends an event to IFTTT, to start your IFTTT applets."
related_actions:
  - ifttt.push_alarm_state
---

Use this action to send an event to [IFTTT](/integrations/ifttt/). In IFTTT, an applet with the **Webhooks** trigger listens for that event and runs its action, for example sending a notification or adding a row to a spreadsheet. You can send up to three values with the event, which the applet can use.

This action is only available when you added your IFTTT key to your {% term "`configuration.yaml`" %} file. See [Sending events to IFTTT](/integrations/ifttt/#sending-events-to-ifttt).

{% include actions/ui_header.md %}

To send an event to IFTTT from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Trigger**.
6. In **Event**, enter the name of the event your IFTTT applet listens for.
7. Optional: Enter up to three values in **Value 1**, **Value 2**, and **Value 3**.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Event:
  description: The name of the event to send. It must match the event name of the Webhooks trigger in your IFTTT applet.
  required: true
Value 1:
  description: A value to send with the event. Your applet can use it as `Value1`.
  required: false
Value 2:
  description: A second value to send with the event. Your applet can use it as `Value2`.
  required: false
Value 3:
  description: A third value to send with the event. Your applet can use it as `Value3`.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ifttt.trigger`. A basic example looks like this:

{% example %}
action: |
  action: ifttt.trigger
  data:
    event: home_assistant_started
    value1: "Hello from Home Assistant"
{% endexample %}

This sends the `home_assistant_started` event to IFTTT.

### Options in YAML

YAML has one more option that is not available in the UI: `target`, to choose which IFTTT keys to send the event to.

{% options_yaml %}
event:
  description: The name of the event to send. It must match the event name of the Webhooks trigger in your IFTTT applet.
  required: true
  type: string
value1:
  description: A value to send with the event.
  required: false
  type: string
value2:
  description: A second value to send with the event.
  required: false
  type: string
value3:
  description: A third value to send with the event.
  required: false
  type: string
target:
  description: The name of the IFTTT key, or a list of key names, to send the event to. Only useful if you set up [multiple IFTTT keys](/integrations/ifttt/#multiple-ifttt-keys). If omitted, the event is sent to all your keys.
  required: false
  type: [string, list]
{% endoptions_yaml %}

## Good to know

- If a key name in `target` doesn't exist in your configuration, Home Assistant logs an error and skips that key.
- If IFTTT can't be reached, the action fails with an error.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: tell IFTTT when Home Assistant starts

Send an event to IFTTT every time Home Assistant starts. In IFTTT, an applet with the **Webhooks** trigger for the `home_assistant_started` event can then send you a notification.

- **Trigger**: Home Assistant
  - **Event**: Start
- **Action**: Trigger
  - **Event**: `home_assistant_started`
  - **Value 1**: `Home Assistant is up and running`

{% details "YAML example for telling IFTTT when Home Assistant starts" %}

{% example %}
automation: |
  alias: "Tell IFTTT when Home Assistant starts"
  triggers:
    - trigger: homeassistant
      event: start
  actions:
    - action: ifttt.trigger
      data:
        event: home_assistant_started
        value1: "Home Assistant is up and running"
{% endexample %}

{% enddetails %}

### Automation: tell IFTTT when the front door opens

Send an event to IFTTT when the front door opens, for example to log it in a spreadsheet with an IFTTT applet.

- **Trigger**: State changed
  - **Entity**: Front door (`binary_sensor.front_door`)
  - **To**: Open
- **Action**: IFTTT: Trigger
  - **Event**: `front_door_opened`
  - **Value 1**: `Front door`

{% details "YAML example for telling IFTTT when the front door opens" %}

{% example %}
automation: |
  alias: "Tell IFTTT when the front door opens"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  actions:
    - action: ifttt.trigger
      data:
        event: front_door_opened
        value1: "Front door"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
