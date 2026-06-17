---
title: "Use a transformation item"
action: habitica.transformation
domain: habitica
description: "Uses a transformation item on a Habitica party member or yourself."
---

Use this action to use a transformation item from your Habitica character's inventory on a member of your party or on yourself.

{% include actions/ui_header.md %}

To use a transformation item from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Habitica: Use a transformation item**.
6. Select the **Config entry** of the character, the **Transformation item** to use, and the **Target character** to use it on.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

The available transformation items are:

- **Snowball**: `snowball` (transforms into a snowfriend)
- **Spooky sparkles**: `spooky_sparkles` (transforms into a ghost)
- **Seafoam**: `seafoam` (transforms into a starfish)
- **Shiny seed**: `shiny_seed` (transforms into a flower)

### Options in the UI

{% options_ui %}
Select character:
  description: The Habitica character that uses the transformation item.
  required: true
Transformation item:
  description: "The transformation item to use. The item must be in the character's inventory."
  required: true
Target character:
  description: The character to use the transformation item on. Matches by display name, username, or user ID.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `habitica.transformation`:

{% example %}
action: |
  action: habitica.transformation
  data:
    config_entry: 6b4be47a1fa7c3764f14cf756dc9899d
    item: snowball
    target: "Bob"
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry:
  description: The Habitica character that uses the transformation item.
  required: true
  type: string
item:
  description: >
    The transformation item to use. One of snowball, spooky_sparkles,
    The transformation item to use. One of `snowball`, `spooky_sparkles`,
    `seafoam`, or `shiny_seed`. The item must be in the character's inventory.
  required: true
  type: string
target:
  description: >
    The character to use the transformation item on. Matches by display name,
    username, or user ID.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
