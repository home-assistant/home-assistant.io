---
title: "Beolink all standby"
action: bang_olufsen.beolink_allstandby
domain: bang_olufsen
description: "Sets all connected Beolink devices to standby."
related_actions:
  - bang_olufsen.beolink_leave
  - bang_olufsen.beolink_join
  - bang_olufsen.beolink_expand
---

The **Beolink all standby** action sets all devices connected to the [Beolink](https://support.bang-olufsen.com/hc/en-us/articles/4411572883089-What-is-Beolink-Multiroom) experience to standby.

This is useful for turning off a whole multiroom group at once, for example when you leave the house.

{% include actions/ui_header.md %}

To set all Beolink devices to standby from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Bang & Olufsen device you want to control. You can also select an area, a device, or a label.
6. From the actions shown for that target, select **Beolink all standby**.
7. Select **Save**.

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `bang_olufsen.beolink_allstandby`. A basic example looks like this:

{% example %}
action: |
  action: bang_olufsen.beolink_allstandby
  target:
    entity_id: media_player.beosound_balance_12345678
{% endexample %}

This action has no additional options.

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
