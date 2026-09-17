---
title: "Lock 'n' Go"
action: nuki.lock_n_go
domain: nuki
description: "Unlocks a Nuki lock, waits a few seconds, then locks it again."
related_actions:
  - nuki.set_continuous_mode
---

Use this action to unlock a Nuki Smart Lock, let it stay open for a short moment, then automatically lock it again. This is handy for letting someone in without leaving the door unlocked. The wait period (20 seconds by default) is set in the Nuki app.

{% include actions/ui_header.md %}

To run Lock 'n' Go from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the area, floor, device, label, or entity you want to control.
6. From the actions shown for that target, select **Lock 'n' Go**.
7. To also pull the latch open when unlocking, turn on **Unlatch**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Unlatch:
  description: "Whether to also unlatch the door when unlocking it. The default is off."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `nuki.lock_n_go`. A basic example looks like this:

{% example %}
action: |
  action: nuki.lock_n_go
  target:
    entity_id: lock.front_door
{% endexample %}

This runs Lock 'n' Go on `lock.front_door`.

### Options in YAML

{% options_yaml %}
unlatch:
  description: "Whether to also unlatch the door when unlocking it."
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

## Good to know

- Adjust the wait time between unlocking and re-locking in the Nuki app.
- Unlatching pulls the door latch open. Only enable it if your installation supports it and you want the door to swing free.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: let a guest in with a single button

Use this automation to run Lock 'n' Go when you press a dashboard button, so a visitor can come in without the door staying unlocked.

- **Trigger**: Guest entry button pressed
- **Action**: Lock 'n' Go
  - **Target**: Front door lock

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Let a guest in with Lock 'n' Go"
    triggers:
      - trigger: state
        entity_id: input_button.guest_entry
    actions:
      - action: nuki.lock_n_go
        target:
          entity_id: lock.front_door
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
