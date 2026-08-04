---
title: "Beolink expand"
action: bang_olufsen.beolink_expand
domain: bang_olufsen
description: "Adds devices to the current Beolink experience."
related_actions:
  - bang_olufsen.beolink_unexpand
  - bang_olufsen.beolink_join
  - bang_olufsen.beolink_leave
---

The **Beolink expand** action adds one or more devices to the [Beolink](https://support.bang-olufsen.com/hc/en-us/articles/4411572883089-What-is-Beolink-Multiroom) experience that the target device is hosting.

This is useful for extending the audio that is already playing on a device to other rooms.

{% include actions/ui_header.md %}

To expand a Beolink experience from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Bang & Olufsen device you want to control. You can also select an area, a device, or a label.
6. From the actions shown for that target, select **Beolink expand**.
7. Enable **All discovered**, or enter the **Beolink JIDs** to add. Set only one of the two.
8. Select **Save**.

### Options in the UI

{% options_ui %}
All discovered:
  description: Expand the experience to all devices discovered by the target device.
  required: false
Beolink JIDs:
  description: The Beolink JIDs of the devices to add to the experience.
  required: false
{% endoptions_ui %}

Set either **All discovered** or **Beolink JIDs**, not both.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `bang_olufsen.beolink_expand`. A basic example looks like this:

{% example %}
action: |
  action: bang_olufsen.beolink_expand
  target:
    entity_id: media_player.beosound_balance_12345678
  data:
    all_discovered: true
{% endexample %}

This expands the experience to every device the target device has discovered.

### Options in YAML

{% options_yaml %}
all_discovered:
  description: >
    Expand the experience to all devices discovered by the target device. Set
    either this or beolink_jids, not both.
  required: false
  type: boolean
  default: false
beolink_jids:
  description: >
    The Beolink JIDs of the devices to add to the experience. Set either this
    or all_discovered, not both.
  required: false
  type: list
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- Calling the `media_player.join` action with the entity IDs of other Bang & Olufsen media players in `group_members` has the same effect.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Expand to specific devices

{% example %}
action: |
  action: bang_olufsen.beolink_expand
  target:
    entity_id: media_player.beosound_balance_12345678
  data:
    beolink_jids:
      - 1111.2222222.33333333@products.bang-olufsen.com
      - 4444.5555555.66666666@products.bang-olufsen.com
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
