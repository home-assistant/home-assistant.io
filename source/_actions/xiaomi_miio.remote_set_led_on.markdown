---
title: "Remote set LED on"
action: xiaomi_miio.remote_set_led_on
domain: xiaomi_miio
description: "Turns on the blue LED of a Xiaomi IR remote."
related_actions:
  - xiaomi_miio.remote_set_led_off
  - xiaomi_miio.remote_learn_command
---

The **Remote set LED on** action turns on the blue status LED of a Xiaomi IR remote.

{% include actions/ui_header.md %}

To turn on the LED from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Xiaomi IR remote you want to control.
6. From the actions shown for that target, select **Remote set LED on**.
7. Select **Save**.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `xiaomi_miio.remote_set_led_on`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_miio.remote_set_led_on
  target:
    entity_id: remote.xiaomi_miio_remote
{% endexample %}

This turns on the blue LED of `remote.xiaomi_miio_remote`.

{% include actions/targets.md domain="remote" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
