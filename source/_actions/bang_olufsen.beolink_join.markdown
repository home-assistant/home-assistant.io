---
title: "Beolink join"
action: bang_olufsen.beolink_join
domain: bang_olufsen
description: "Joins a Beolink experience."
related_actions:
  - bang_olufsen.beolink_expand
  - bang_olufsen.beolink_leave
  - bang_olufsen.beolink_allstandby
---

The **Beolink join** action makes a Bang & Olufsen device join an active [Beolink](https://support.bang-olufsen.com/hc/en-us/articles/4411572883089-What-is-Beolink-Multiroom) multiroom experience.

This is useful for grouping a device with others that are already playing, so the same audio plays in another room.

{% include actions/ui_header.md %}

To join a Beolink experience from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Bang & Olufsen device you want to control. You can also select an area, a device, or a label.
6. From the actions shown for that target, select **Beolink join**.
7. Optionally, set the **Beolink JID** and **Source** to join a specific experience or source.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Beolink JID:
  description: The Beolink JID of the experience to join. Leave empty to join the closest active experience.
  required: false
Source:
  description: The source to join. Behavior varies between hardware platforms. A Beolink JID is required when you set a source.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `bang_olufsen.beolink_join`. A basic example looks like this:

{% example %}
action: |
  action: bang_olufsen.beolink_join
  target:
    entity_id: media_player.beosound_balance_12345678
{% endexample %}

Without any data, this joins the closest active Beolink experience. Calling it repeatedly cycles through the available devices.

### Options in YAML

{% options_yaml %}
beolink_jid:
  description: >
    The Beolink JID of the experience to join. Leave empty to join the closest
    active experience.
  required: false
  type: string
source_id:
  description: >
    The source to join. Behavior varies between hardware platforms. A Beolink
    JID is required when you set a source. One of: beoradio, deezer, spotify,
    tidal, radio, tp1, tp2, cd, aux_a, or ph.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- Calling this action with an empty list of `group_members` on the `media_player.join` action has the same effect.
- The available sources depend on the hardware platform of the device you join:
  - ASE: `beoradio`
  - ASE and Mozart: `deezer`, `spotify`
  - Mozart: `tidal`
  - Beolink Converter NL/ML: `radio`, `tp1`, `tp2`, `cd`, `aux_a`, `ph`

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Join a specific Beolink experience

{% example %}
action: |
  action: bang_olufsen.beolink_join
  target:
    entity_id: media_player.beosound_balance_12345678
  data:
    beolink_jid: 1111.2222222.33333333@products.bang-olufsen.com
{% endexample %}

### Join the radio source on a Beolink Converter NL/ML

{% example %}
action: |
  action: bang_olufsen.beolink_join
  target:
    entity_id: media_player.beosound_balance_12345678
  data:
    beolink_jid: 1111.2222222.33333333@products.bang-olufsen.com
    source_id: radio
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
