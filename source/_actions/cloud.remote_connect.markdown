---
title: "Enable Home Assistant Cloud remote access"
action: cloud.remote_connect
domain: cloud
description: "Turns on remote access to your Home Assistant through Home Assistant Cloud."
related_actions:
  - cloud.remote_disconnect
---

Use this action to turn on remote access through Home Assistant Cloud. With remote access on, you can reach your Home Assistant from outside your home network, using your Nabu Casa URL.

This does the same as the toggle on the **Remote connection** card under {% my cloud title="**Settings** > **Home Assistant Cloud**" %} > **Remote access**. The setting is kept, also after a restart.

{% include actions/ui_header.md %}

To enable remote access from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Home Assistant Cloud: Enable Home Assistant Cloud remote access**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `cloud.remote_connect`. A basic example looks like this:

{% example %}
action: |
  action: cloud.remote_connect
{% endexample %}

### Options in YAML

This action has no additional options in YAML.

## Good to know

- You need to be signed in to [Home Assistant Cloud](/integrations/cloud/) for remote access to work.
- Only administrators can run this action.
- To turn remote access off again, use [Disable Home Assistant Cloud remote access](/actions/cloud.remote_disconnect/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn on remote access when you leave home

Only open up remote access when you actually need it. This automation turns it on when you leave home.

- **Trigger**: Zone
  - **Entity with location**: You (`person.you`)
  - **Zone**: Home
  - **Event**: Leave
- **Action**: Home Assistant Cloud: Enable Home Assistant Cloud remote access

{% details "YAML example for turning on remote access when you leave" %}

{% example %}
automation: |
  alias: "Turn on remote access when I leave"
  triggers:
    - trigger: zone
      entity_id: person.you
      zone: zone.home
      event: leave
  actions:
    - action: cloud.remote_connect
{% endexample %}

{% enddetails %}

### Automation: turn on remote access every morning

If you turn remote access off at night, this automation turns it back on at 07:00, so it's ready when you head out.

- **Trigger**: Time
  - **At time**: 07:00
- **Action**: Home Assistant Cloud: Enable Home Assistant Cloud remote access

{% details "YAML example for turning on remote access every morning" %}

{% example %}
automation: |
  alias: "Turn on remote access every morning"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: cloud.remote_connect
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
