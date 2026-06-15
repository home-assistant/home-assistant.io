---
title: "Set persons at home"
action: netatmo.set_persons_home
domain: netatmo
description: "Marks a list of people as at home for a Netatmo Indoor camera."
related_actions:
  - netatmo.set_person_away
  - netatmo.set_camera_light
---

Use this action to mark one or more people as at home for a Netatmo Indoor (Welcome) camera. The names you provide must match people the camera already knows.

{% include actions/ui_header.md %}

To mark people as at home from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Netatmo Indoor camera you want to control.
6. From the actions shown for that target, select **Set persons at home**.
7. Enter the **Persons** you want to mark as at home.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Persons:
  description: A list of names to mark as at home. Each name must match a person known by the camera.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `netatmo.set_persons_home`. A basic example looks like this:

{% example %}
action: |
  action: netatmo.set_persons_home
  target:
    entity_id: camera.living_room
  data:
    persons:
      - Alice
      - Bob
{% endexample %}

This marks Alice and Bob as at home for `camera.living_room`.

### Options in YAML

{% options_yaml %}
persons:
  description: A list of names to mark as at home. Each name must match a person known by the camera.
  required: true
  type: list
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- You add and name people in the Netatmo app. The names you use here must match those known faces exactly.

{% include actions/try_it.md %}

{% include actions/related.md %}
