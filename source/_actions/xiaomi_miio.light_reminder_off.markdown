---
title: "Light reminder off"
action: xiaomi_miio.light_reminder_off
domain: xiaomi_miio
description: "Disables the eye fatigue reminder on a Xiaomi Philips Eyecare Smart Lamp 2."
related_actions:
  - xiaomi_miio.light_reminder_on
---

The **Light reminder off** action disables the eye fatigue reminder notification. This action only works with the Philips Eyecare Smart Lamp 2.

{% include actions/ui_header.md %}

To disable the reminder from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Xiaomi Home: Light reminder off**.
6. Select **Save**.

This action does not support targets. In the UI, use the **Entity ID** field to choose which Eyecare Smart Lamp 2 to act on. If you leave it empty, the action applies to all of them.

### Options in the UI

{% options_ui %}
Entity ID:
  description: The Eyecare Smart Lamp 2 to act on. If you leave this empty, all of them are affected.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `xiaomi_miio.light_reminder_off`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_miio.light_reminder_off
  data:
    entity_id: light.eyecare_lamp
{% endexample %}

This disables the eye fatigue reminder on `light.eyecare_lamp`.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The Eyecare Smart Lamp 2 to act on. If you leave this out, all of them are affected.
  required: false
  type: [string, list]
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
