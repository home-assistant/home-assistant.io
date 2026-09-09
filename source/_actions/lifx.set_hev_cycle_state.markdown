---
title: Set HEV cycle state
action: lifx.set_hev_cycle_state
domain: lifx
description: "Start or stop a HEV (Clean) cycle on a LIFX Clean bulb."
related_actions:
  - lifx.set_state
---

Use this action to start or stop a HEV cycle, also called a Clean cycle, on LIFX Clean bulbs. You can run the cycle for the bulb's configured default duration or for a custom duration you set when you call the action. If you target a bulb that does not support HEV cycles, Home Assistant returns or logs an error.

{% include actions/ui_header.md %}

To start or stop a HEV cycle from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the LIFX Clean bulbs you want to control.
6. From the actions shown for that target, select **Set HEV cycle state**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Enable:
  description: Turn the option on to start a Clean cycle, or off to stop one.
Duration:
  description: How long the HEV LEDs stay on, in seconds. Uses the configured default duration if you leave it out.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.set_hev_cycle_state`. A basic example looks like this:

{% example %}
action: |
  action: lifx.set_hev_cycle_state
  target:
    entity_id: light.bathroom
  data:
    power: true
    duration: 3600
{% endexample %}

This starts a one-hour Clean cycle on the bathroom bulb.

### Options in YAML

{% options_yaml %}
power:
  description: Set to true to start a Clean cycle, or false to stop one.
  required: true
  type: boolean
  default: false
duration:
  description: How long the HEV LEDs stay on, in seconds. Uses the configured default duration if you leave it out.
  required: false
  type: integer
  default: 7200
{% endoptions_yaml %}

## Good to know

- To find out whether a HEV cycle is running, use the Clean cycle binary sensor that Home Assistant creates for every HEV-enabled bulb. To reduce network load, this status is only checked every 10 seconds, so it may not update instantly.

{% include actions/targets.md domain="light" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
