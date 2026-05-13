---
title: "Press button"
action: button.press
domain: button
description: "Presses a button entity."
---

Use this action when an integration exposes a button entity and you want an automation to press it for you. This is useful for tasks like restarting a device, starting an update, or running another one-time device action.

{% include actions/ui_header.md %}

To press a button from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the area, floor, device, label, or entity you want to control.
6. From the actions shown for that target, select **Press button**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `button.press`. A basic example looks like this:

{% example %}
action: |
  action: button.press
  target:
    entity_id: button.router_restart
{% endexample %}

This presses `button.router_restart`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with button entities.
- If the button entity is `unavailable`, the action cannot run until the entity is available again.
- Button actions do not take extra fields. You only need to select the target.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: restart a router when the internet is down

Use this automation to press a restart button after the internet connection has been down for a while.

- **Trigger**: Internet connection turns off for 10 minutes
- **Action**: Press button
   - **Target**: Router restart button

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Restart the router when the internet has been down"
    triggers:
      - trigger: state
        entity_id: binary_sensor.internet_connection
        to: "off"
        for: "00:10:00"
    actions:
      - action: button.press
        target:
          entity_id: button.router_restart
{% endexample %}

{% enddetails %}

### Automation: run a firmware update overnight

Use this automation when a device exposes an update button and you want to run it at a quiet time.

- **Trigger**: Time: 03:00
- **Condition**: Garden controller firmware update is available
- **Action**: Press button
   - **Target**: Garden controller update button

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Run the garden controller firmware update overnight"
    triggers:
      - trigger: time
        at: "03:00:00"
    conditions:
      - condition: state
        entity_id: update.garden_controller_firmware
        state: "on"
    actions:
      - action: button.press
        target:
          entity_id: button.garden_controller_update
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
