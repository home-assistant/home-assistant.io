---
title: "Beolink leave"
action: bang_olufsen.beolink_leave
domain: bang_olufsen
description: "Leaves a Beolink experience."
related_actions:
  - bang_olufsen.beolink_join
  - bang_olufsen.beolink_allstandby
  - bang_olufsen.beolink_unexpand
---

The **Beolink leave** action makes the target Bang & Olufsen device leave the [Beolink](https://support.bang-olufsen.com/hc/en-us/articles/4411572883089-What-is-Beolink-Multiroom) experience it is part of.

This is useful for taking a single device out of a multiroom group.

{% include actions/ui_header.md %}

To leave a Beolink experience from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Bang & Olufsen device you want to control. You can also select an area, a device, or a label.
6. From the actions shown for that target, select **Beolink leave**.
7. Select **Save**.

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `bang_olufsen.beolink_leave`. A basic example looks like this:

{% example %}
action: |
  action: bang_olufsen.beolink_leave
  target:
    entity_id: media_player.beosound_balance_12345678
{% endexample %}

This action has no additional options.

{% include actions/targets.md domain="media_player" %}

## Good to know

- Calling the `media_player.unjoin` action on the device has the same effect.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
