---
title: "Power off the host system"
action: hassio.host_shutdown
domain: hassio
description: "Powers off the host system."
related_actions:
  - hassio.host_reboot
---

Use this action to power off the host system that Home Assistant runs on. This shuts down the whole machine, including the operating system and every app.

{% warning %}
After a power off, the system stays off until you turn it back on physically. Home Assistant cannot start itself again, so only use this action when you have a way to power the machine back on.
{% endwarning %}

{% include actions/ui_header.md %}

To power off the host from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Power off the host system**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hassio.host_shutdown`. It takes no options:

{% example %}
action: |
  action: hassio.host_shutdown
{% endexample %}

### Options in YAML

This action has no options.

## Good to know

- Only administrators can run this action.
- This action is only available when you run {% term "Home Assistant Operating System" %} or the Supervised installation method. It is not available on {% term "Home Assistant Container" %} or {% term "Home Assistant Core" %}.
- A common use is a safe shutdown before you unplug or move the machine, for example triggered by a low battery on an <abbr title="uninterruptible power supply">UPS</abbr> during a power outage.

{% include actions/stuck.md %}

{% include actions/related.md %}
