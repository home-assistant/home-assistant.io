---
title: Remove privacy zone
action: unifiprotect.remove_privacy_zone
domain: unifiprotect
description: "Removes a privacy zone from a UniFi Protect camera."
---

With this action, you can remove a privacy zone from a UniFi Protect camera. Privacy zones block out parts of the camera view, and this action deletes one by name.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **UniFi Protect: Remove privacy zone**.
6. In the **Camera** field, select the camera you want to change.
7. In the **Privacy zone** field, enter the name of the zone to remove.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Camera:
  description: The camera you want to remove the privacy zone from.
Privacy zone:
  description: The name of the privacy zone to remove.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `unifiprotect.remove_privacy_zone`. A basic example looks like this:

{% example %}
action: |
  action: unifiprotect.remove_privacy_zone
  data:
    device_id: 1234567890abcdef1234567890abcdef
    name: "Neighbor window"
{% endexample %}

This removes the privacy zone named "Neighbor window" from the selected camera.

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of the camera you want to remove the privacy zone from.
  required: true
  type: string
name:
  description: The name of the privacy zone to remove. It must match the zone name exactly.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The zone name must match exactly. If no zone with that name exists on the camera, the action reports an error.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: clear a privacy zone when you leave home

Remove a privacy zone so a camera can see your driveway while you are away.

- **Trigger**: A person's location changes to away
- **Action**: UniFi Protect: Remove privacy zone

{% details "YAML example for removing a privacy zone when away" %}

{% example %}
automation: |
  alias: "Clear driveway privacy zone when away"
  triggers:
    - trigger: state
      entity_id: person.alex
      to: "not_home"
  actions:
    - action: unifiprotect.remove_privacy_zone
      data:
        device_id: 1234567890abcdef1234567890abcdef
        name: "Driveway"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
