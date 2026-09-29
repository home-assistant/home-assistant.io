---
title: "Print All-Link database"
action: insteon.print_all_link_database
domain: insteon
description: "Prints the All-Link database for a device."
related_actions:
  - insteon.load_all_link_database
  - insteon.print_im_all_link_database
---

The **Print All-Link database** action prints the All-Link database (ALDB) for a device to the Home Assistant log. This requires that the database is loaded into memory first.

This is useful when you want to review which links a device has stored, for example to troubleshoot how your Insteon devices are linked together.

To load the database into memory first, use the [Load All-Link database](/actions/insteon.load_all_link_database/) action.

{% include actions/ui_header.md %}

To print an All-Link database from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Insteon: Print All-Link database**.
6. Select the **Entity** to print.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Entity:
  description: The device to print.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `insteon.print_all_link_database`. A basic example looks like this:

{% example %}
action: |
  action: insteon.print_all_link_database
  data:
    entity_id: light.1a2b3c
{% endexample %}

This prints the All-Link database for the given device to the log.

### Options in YAML

{% options_yaml %}
entity_id:
  description: >
    The device to print.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
