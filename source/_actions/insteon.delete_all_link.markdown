---
title: "Delete All-Link"
action: insteon.delete_all_link
domain: insteon
description: "Removes an All-Link record from the Insteon Modem and a device."
related_actions:
  - insteon.add_all_link
  - insteon.add_default_links
---

The **Delete All-Link** action tells the Insteon Modem (IM) to remove an All-Link record from its own All-Link database and from a device.

This is useful when you want to unlink a device from the modem, for example when you are removing a device or cleaning up links that are no longer needed.

After starting this action, press the SET button on the corresponding device to complete the process.

{% include actions/ui_header.md %}

To remove an All-Link from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Insteon: Delete All-Link**.
6. Enter the **Group** number to remove.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Only users with administrator rights can run this action.

### Options in the UI

{% options_ui %}
Group:
  description: The All-Link group number.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `insteon.delete_all_link`. A basic example looks like this:

{% example %}
action: |
  action: insteon.delete_all_link
  data:
    group: 1
{% endexample %}

This removes the All-Link record for group 1.

### Options in YAML

{% options_yaml %}
group:
  description: >
    The All-Link group number.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
