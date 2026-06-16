---
title: "LED"
action: lcn.led
domain: lcn
description: "Sets the LED state."
related_actions:
  - lcn.relays
  - lcn.pck
---

The **LED** action sets the state of one of the LEDs on an LCN module. You can turn an LED on or off, or make it blink or flicker, which is handy for status indication.

{% include actions/ui_header.md %}

To set the state of an LED from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **LCN: LED**.
6. Select the LCN module or group in the **Device** field, choose the **LED** port, and choose the **State**.
7. Select **Save**.

This action does not support targets. Instead, you select the LCN module or group through the **Device** field.

### Options in the UI

{% options_ui %}
Device:
  description: The LCN module or group to send the command to.
  required: true
LED:
  description: "The LED port of the module, from `led1` to `led12`."
  required: true
State:
  description: "The LED state to set. One of: `on`, `off`, `blink`, `flicker`."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lcn.led`. A basic example looks like this:

{% example %}
action: |
  action: lcn.led
  data:
    device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
    led: led6
    state: blink
{% endexample %}

This makes LED 6 of the selected module blink.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The device ID of the LCN module or group.
  required: true
  type: string
led:
  description: >
    The LED port of the module, from `led1` to `led12`.
  required: true
  type: string
state:
  description: >
    The LED state to set. See [States](/integrations/lcn/#states).
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
