---
title: "Set velocity"
action: velux.set_velocity
domain: velux
description: "Sets the velocity mode for a Velux opening device, such as a window or cover."
---

The **Set velocity** action sets the velocity mode for a Velux opening device. This controls how fast the device moves when operated: the default speed, a slower silent mode, or a faster mode.

{% include actions/ui_header.md %}

To set the velocity from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Velux: Set velocity**.
6. Select the **Device** you want to change the velocity for.
7. Choose the desired **Velocity**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The opening device whose velocity to set.
  required: true
Velocity:
  description: The velocity mode to use when operating the device.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `velux.set_velocity`. A basic example looks like this:

{% example %}
action: |
  action: velux.set_velocity
  data:
    device_id: "abc123"
    velocity: "silent"
{% endexample %}

This sets the velocity on the specified device to silent mode.

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of the opening device whose velocity to set.
  required: true
  type: string
velocity:
  description: The velocity mode. One of `default`, `silent`, or `fast`.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
