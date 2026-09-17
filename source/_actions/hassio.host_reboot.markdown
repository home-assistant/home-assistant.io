---
title: "Reboot the host system"
action: hassio.host_reboot
domain: hassio
description: "Reboots the host system."
related_actions:
  - hassio.host_shutdown
---

Use this action to reboot the host system that Home Assistant runs on. This restarts the whole machine, not just Home Assistant, so every app and the operating system restart with it.

{% caution %}
Rebooting the host makes Home Assistant and all your apps unavailable for a while. Anyone in your household relying on Home Assistant at that moment loses access until the system is back up.
{% endcaution %}

{% include actions/ui_header.md %}

To reboot the host from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Reboot the host system**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hassio.host_reboot`. It takes no options:

{% example %}
action: |
  action: hassio.host_reboot
{% endexample %}

### Options in YAML

This action has no options.

## Good to know

- Only administrators can run this action.
- This action is only available when you run {% term "Home Assistant Operating System" %} or the Supervised installation method. It is not available on {% term "Home Assistant Container" %} or {% term "Home Assistant Core" %}.
- You usually run this action manually from {% my developer_services title="**Settings** > **Tools** > **Actions**" %} when you need a clean restart of the whole machine.

{% include actions/stuck.md %}

{% include actions/related.md %}
