---
title: "Set person away"
action: netatmo.set_person_away
domain: netatmo
description: "Marks a person as away for a Netatmo Indoor camera."
related_actions:
  - netatmo.set_persons_home
  - netatmo.set_camera_light
---

Use this action to mark a person as away for a Netatmo Indoor (Welcome) camera. If you don't provide a name, the whole home is marked as empty.

{% include actions/ui_header.md %}

To mark a person as away from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Netatmo Indoor camera you want to control.
6. From the actions shown for that target, select **Set person away**.
7. _Optional_: Enter the **Person** you want to mark as away. Leave it empty to mark the whole home as empty.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Person:
  description: The name of the person to mark as away. It must match a person known by the camera. Leave empty to mark the whole home as empty.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `netatmo.set_person_away`. A basic example looks like this:

{% example %}
action: |
  action: netatmo.set_person_away
  target:
    entity_id: camera.living_room
  data:
    person: Bob
{% endexample %}

This marks Bob as away for `camera.living_room`.

### Options in YAML

{% options_yaml %}
person:
  description: The name of the person to mark as away. It must match a person known by the camera. Omit to mark the whole home as empty.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- If you leave the person empty, the whole home is marked as empty instead of a single person being marked as away.

{% include actions/try_it.md %}

{% include actions/related.md %}
