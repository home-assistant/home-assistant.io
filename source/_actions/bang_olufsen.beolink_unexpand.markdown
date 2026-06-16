---
title: "Beolink unexpand"
action: bang_olufsen.beolink_unexpand
domain: bang_olufsen
description: "Removes devices from the current Beolink experience."
related_actions:
  - bang_olufsen.beolink_expand
  - bang_olufsen.beolink_leave
  - bang_olufsen.beolink_join
---

The **Beolink unexpand** action removes one or more devices from the [Beolink](https://support.bang-olufsen.com/hc/en-us/articles/4411572883089-What-is-Beolink-Multiroom) experience that the target device is hosting.

This is useful for dropping a specific room from a multiroom group while keeping the rest playing.

{% include actions/ui_header.md %}

To remove devices from a Beolink experience from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Bang & Olufsen device you want to control.
6. From the actions shown for that target, select **Beolink unexpand**.
7. Enter the **Beolink JIDs** to remove.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Beolink JIDs:
  description: The Beolink JIDs of the devices to remove from the experience.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `bang_olufsen.beolink_unexpand`. A basic example looks like this:

{% example %}
action: |
  action: bang_olufsen.beolink_unexpand
  target:
    entity_id: media_player.beosound_balance_12345678
  data:
    beolink_jids:
      - 1111.2222222.33333333@products.bang-olufsen.com
{% endexample %}

This removes the given device from the experience.

### Options in YAML

{% options_yaml %}
beolink_jids:
  description: >
    The Beolink JIDs of the devices to remove from the experience.
  required: true
  type: list
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Remove multiple devices

{% example %}
action: |
  action: bang_olufsen.beolink_unexpand
  target:
    entity_id: media_player.beosound_balance_12345678
  data:
    beolink_jids:
      - 1111.2222222.33333333@products.bang-olufsen.com
      - 4444.5555555.66666666@products.bang-olufsen.com
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
