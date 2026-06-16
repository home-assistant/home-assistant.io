---
title: "Load All-Link database"
action: insteon.load_all_link_database
domain: insteon
description: "Loads the All-Link database for a device into memory."
related_actions:
  - insteon.print_all_link_database
  - insteon.print_im_all_link_database
---

The **Load All-Link database** action loads the All-Link database (ALDB) for a device into memory, so Home Assistant can read the links stored on that device.

This is useful when you want to inspect or work with the links on a device, for example before printing the database or troubleshooting how devices are linked together.

{% caution %}
Loading a device All-Link database is time consuming and can be inconsistent. It may take a long time and may need to be repeated to obtain all records.
{% endcaution %}

{% include actions/ui_header.md %}

To load an All-Link database from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Insteon: Load All-Link database**.
6. Enter the **Entity** to load. Optionally, turn on **Reload** to clear and reload all records.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Entity:
  description: The device to load. Use `all` to load the database of all devices.
  required: true
Reload:
  description: If turned on, all current records are cleared from memory (this does not affect the device) and reloaded. Otherwise, the existing records are kept and only missing records are added.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `insteon.load_all_link_database`. A basic example looks like this:

{% example %}
action: |
  action: insteon.load_all_link_database
  data:
    entity_id: light.1a2b3c
{% endexample %}

This loads the All-Link database for the given device into memory.

### Options in YAML

{% options_yaml %}
entity_id:
  description: >
    The device to load. Use `all` to load the database of all devices.
  required: true
  type: string
reload:
  description: >
    If set to `true`, all current records are cleared from memory (this does
    not affect the device) and reloaded. Otherwise, the existing records are
    kept and only missing records are added.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
