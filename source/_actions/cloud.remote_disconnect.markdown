---
title: "Disable Home Assistant Cloud remote access"
action: cloud.remote_disconnect
domain: cloud
description: "Turns off remote access to your Home Assistant through Home Assistant Cloud."
related_actions:
  - cloud.remote_connect
---

Use this action to turn off remote access through Home Assistant Cloud. With remote access off, you can no longer reach your Home Assistant from outside your home network through your Nabu Casa URL. Other Home Assistant Cloud features, like voice assistants and backups, keep working.

This does the same as the toggle on the **Remote connection** card under {% my cloud title="**Settings** > **Home Assistant Cloud**" %} > **Remote access**. The setting is kept, also after a restart.

{% include actions/ui_header.md %}

To disable remote access from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Home Assistant Cloud: Disable Home Assistant Cloud remote access**.
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

## Good to know

- You need to be signed in to [Home Assistant Cloud](/integrations/cloud/) for remote access to work.
- Only administrators can run this action.
- If you run this action while you're away from home, you lose remote access right away. To be able to turn it back on remotely, enable **Allow external activation of remote access** under **Remote access** first.
- To turn remote access on again, use [Enable Home Assistant Cloud remote access](/actions/cloud.remote_connect/).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
