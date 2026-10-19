---
title: "Docker gateway unprotected"
description: "How to resolve issues when gateway firewall rules cannot be applied."
---

## The issue

Home Assistant Supervisor was unable to apply firewall rules that restrict access to the internal Docker network gateway. As a safety measure, apps that use host networking will not start until this issue is resolved.

This can happen when:

- The `iptables` or `ip6tables` command is not available on the host system.
- The systemd service responsible for applying the rules failed to execute.
- There is a D-Bus communication issue with systemd.

## The solution

Try rebooting your system by going to {% my hardware title="**Settings** > **System** > **Hardware**" %}, opening the menu in the top right corner, and selecting **Reboot system**.

If the issue persists after a reboot, please [open an issue](https://github.com/home-assistant/supervisor/issues) and include the full Supervisor logs. You can download them from {% my logs title="**Settings** > **System** > **Logs**" %} by selecting **Supervisor** from the log source dropdown.
