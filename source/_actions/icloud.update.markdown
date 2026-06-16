---
title: "Update"
action: icloud.update
domain: icloud
description: "Requests a location and state update for the devices on an Apple Account."
related_actions:
  - icloud.play_sound
  - icloud.display_message
  - icloud.lost_device
---

The **Update** action requests a fresh location and state update for the devices linked to an Apple Account.

To save battery, Home Assistant polls your devices on a dynamic interval. This action is useful when you need an up to date location right away, for example to check whether anyone is home when a door opens.

{% include actions/ui_header.md %}

To request an update from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Apple iCloud: Update**.
6. Optionally, enter the **Account** to update. Leave it empty to update every configured Apple Account.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Account:
  description: The Apple Account username (email) to update. Leave empty to update every configured account.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `icloud.update`. A basic example looks like this:

{% example %}
action: |
  action: icloud.update
  data:
    account: "steve@apple.com"
{% endexample %}

This requests an update for all devices on the given account.

### Options in YAML

{% options_yaml %}
account:
  description: >
    The Apple Account username (email) to update. Leave empty to update every
    configured account.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: check presence when the front door opens

When the front door opens, request a location update so the presence detection reflects the latest position.

- **Trigger**: The front door opens
- **Action**: Apple iCloud: Update

{% details "YAML example for requesting an update on door open" %}

{% example %}
automation: |
  alias: "Update iCloud location on door open"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  actions:
    - action: icloud.update
      data:
        account: "steve@apple.com"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
