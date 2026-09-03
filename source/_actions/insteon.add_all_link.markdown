---
title: "Add All-Link"
action: insteon.add_all_link
domain: insteon
description: "Puts the Insteon Modem into All-Linking mode to link a device."
related_actions:
  - insteon.delete_all_link
  - insteon.add_default_links
---

The **Add All-Link** action puts the Insteon Modem (IM) into All-Linking mode so you can link a device to it. The modem can be linked as a controller or as a responder.

This is useful when you want to manually build an All-Link between the modem and a device, for example to extend or repair the links that let your Insteon devices talk to each other.

After starting this action, complete the link on the device: if the modem is a controller, put it into linking mode and then press the SET button on the device. If the modem is a responder, press the SET button on the device and then put the modem into linking mode.

{% include actions/ui_header.md %}

To start All-Linking mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Insteon: Add All-Link**.
6. Enter the **Group** number and choose the **Mode**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Only users with administrator rights can run this action.

### Options in the UI

{% options_ui %}
Group:
  description: The All-Link group number.
  required: true
Mode:
  description: The linking mode of the Insteon Modem, either `controller` or `responder`.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `insteon.add_all_link`. A basic example looks like this:

{% example %}
action: |
  action: insteon.add_all_link
  data:
    group: 1
    mode: controller
{% endexample %}

This puts the modem into All-Linking mode as a controller for group 1.

### Options in YAML

{% options_yaml %}
group:
  description: >
    The All-Link group number.
  required: true
  type: integer
mode:
  description: >
    The linking mode of the Insteon Modem. Set to `controller` or `responder`.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
