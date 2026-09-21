---
title: "Print IM All-Link database"
action: insteon.print_im_all_link_database
domain: insteon
description: "Prints the All-Link database for the Insteon Modem."
related_actions:
  - insteon.load_all_link_database
  - insteon.print_all_link_database
---

The **Print IM All-Link database** action prints the All-Link database (ALDB) for the Insteon Modem (IM) to the Home Assistant log.

This is useful when you want to review which links the modem itself has stored, for example to troubleshoot how your Insteon network is set up.

{% include actions/ui_header.md %}

To print the modem All-Link database from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Insteon: Print IM All-Link database**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

This action has no additional options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `insteon.print_im_all_link_database`. A basic example looks like this:

{% example %}
action: |
  action: insteon.print_im_all_link_database
{% endexample %}

This prints the modem All-Link database to the log.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
