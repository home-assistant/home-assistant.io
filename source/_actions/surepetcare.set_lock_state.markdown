---
title: "Set lock state"
action: surepetcare.set_lock_state
domain: surepetcare
description: "Changes the locking state of a Sure Petcare flap."
---

Use this action to change the locking state of a cat or pet flap.

{% include actions/ui_header.md %}

To set the lock state from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Sure Petcare: Set lock state**.
6. Enter the **Flap ID** and select a **Lock state**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Flap ID:
  description: The ID of the flap to lock or unlock.
  required: true
Lock state:
  description: "The new lock state: locked_all, locked_in, locked_out, or unlocked."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `surepetcare.set_lock_state`. A basic example looks like this:

{% example %}
action: |
  action: surepetcare.set_lock_state
  data:
    flap_id: 123456
    lock_state: locked_in
{% endexample %}

This sets the flap to "in only", so pets can come in but not go back out.

### Options in YAML

{% options_yaml %}
flap_id:
  description: The ID of the flap to lock or unlock.
  required: true
  type: integer
lock_state:
  description: >
    The new lock state. One of `unlocked` (pets are allowed both in and out),
    `locked_in` (pets can come in but not go back out), `locked_out` (pets can
    go out but not back in), or `locked_all` (the flap is locked both ways).
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- To find a flap's ID, log in to [surepetcare.io](https://surepetcare.io/), open the sidebar, and select your flap. The flap ID is the last part of the URL, for example `https://surepetcare.io/control/device/FLAP-ID`.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
