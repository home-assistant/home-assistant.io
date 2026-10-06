---
title: "Disable Home Assistant Link remote access"
action: cloud.remote_disconnect
domain: cloud
description: "Turns off remote access to your Home Assistant through Home Assistant Link."
related_actions:
  - cloud.remote_connect
---

Use this action to turn off remote access through Home Assistant Link. With remote access off, you can no longer reach your Home Assistant from outside your home network through your Nabu Casa URL. Other Home Assistant Link features, like voice assistants and backups, keep working.

This does the same as the toggle on the **Remote connection** card under {% my cloud title="**Settings** > **Home Assistant Link**" %} > **Remote access**. The setting is kept, also after a restart.

{% include actions/ui_header.md %}

To disable remote access from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Home Assistant Link: Disable Home Assistant Link remote access**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `cloud.remote_disconnect`. A basic example looks like this:

{% example %}
action: |
  action: cloud.remote_disconnect
{% endexample %}

### Options in YAML

This action has no additional options in YAML.

## Good to know

- You need to be signed in to [Home Assistant Link](/integrations/cloud/) for remote access to work.
- Only administrators can run this action.
- If you run this action while you're away from home, you lose remote access right away. To be able to turn it back on remotely, enable **Allow external activation of remote access** under **Remote access** first.
- To turn remote access on again, use [Enable Home Assistant Link remote access](/actions/cloud.remote_connect/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn off remote access when you get home

When you're home, you reach Home Assistant on your local network. This automation turns remote access off when you arrive.

- **Trigger**: Zone
  - **Entity with location**: You (`person.you`)
  - **Zone**: Home
  - **Event**: Enter
- **Action**: Home Assistant Link: Disable Home Assistant Link remote access

{% details "YAML example for turning off remote access when you get home" %}

{% example %}
automation: |
  alias: "Turn off remote access when I get home"
  triggers:
    - trigger: zone
      entity_id: person.you
      zone: zone.home
      event: enter
  actions:
    - action: cloud.remote_disconnect
{% endexample %}

{% enddetails %}

### Automation: turn off remote access at night

Turn off remote access every night at midnight. Pair it with an automation that turns it back on in the morning.

- **Trigger**: Time
  - **At time**: 00:00
- **Action**: Home Assistant Link: Disable Home Assistant Link remote access

{% details "YAML example for turning off remote access at night" %}

{% example %}
automation: |
  alias: "Turn off remote access at night"
  triggers:
    - trigger: time
      at: "00:00:00"
  actions:
    - action: cloud.remote_disconnect
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
