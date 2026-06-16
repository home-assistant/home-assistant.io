---
title: "Add default links"
action: insteon.add_default_links
domain: insteon
description: "Adds the default links between a device and the Insteon Modem."
related_actions:
  - insteon.add_all_link
  - insteon.delete_all_link
---

The **Add default links** action adds the default set of links between a device and the Insteon Modem (IM). These links let the modem and the device communicate properly.

This is useful when a device is not responding as expected and you want to restore the standard links between it and the modem.

{% include actions/ui_header.md %}

To add default links from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Insteon: Add default links**.
6. Enter the **Entity** to link.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Only users with administrator rights can run this action.

### Options in the UI

{% options_ui %}
Entity:
  description: The device to add the default links for.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `insteon.add_default_links`. A basic example looks like this:

{% example %}
action: |
  action: insteon.add_default_links
  data:
    entity_id: light.1a2b3c
{% endexample %}

This adds the default links between the given device and the modem.

### Options in YAML

{% options_yaml %}
entity_id:
  description: >
    The device to add the default links for.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
