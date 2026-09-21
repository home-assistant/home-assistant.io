---
title: "Light set delayed turn off"
action: xiaomi_miio.light_set_delayed_turn_off
domain: xiaomi_miio
description: "Schedules a Xiaomi Philips light to turn off after a delay."
related_actions:
  - xiaomi_miio.light_set_scene
---

The **Light set delayed turn off** action schedules a Xiaomi Philips light to turn off automatically after a set amount of time.

{% include actions/ui_header.md %}

To schedule a delayed turn off from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Xiaomi Home: Light set delayed turn off**.
6. Enter the **Time period** after which the light turns off.
7. Select **Save**.

This action does not support targets. In the UI, use the **Entity ID** field to choose which Xiaomi Philips light to act on. If you leave it empty, the action applies to all of them.

### Options in the UI

{% options_ui %}
Entity ID:
  description: The Xiaomi Philips light to act on. If you leave this empty, all of them are affected.
Time period:
  description: "The delay after which the light turns off, as a number of seconds or as a time in the format HH:MM:SS."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `xiaomi_miio.light_set_delayed_turn_off`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_miio.light_set_delayed_turn_off
  data:
    entity_id: light.philips_light
    time_period: "00:05:00"
{% endexample %}

This turns off `light.philips_light` after five minutes.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The Xiaomi Philips light to act on. If you leave this out, all of them are affected.
  required: false
  type: [string, list]
time_period:
  description: "The delay after which the light turns off, as a number of seconds or as a time in the format HH:MM:SS."
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
