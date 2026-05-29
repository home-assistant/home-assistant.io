---
title: Recovery mode
description: How Home Assistant starts in recovery mode when the configuration cannot be loaded.
ha_category: []
ha_release: 0.105
ha_codeowners:
  - '@home-assistant/core'
ha_domain: recovery_mode
ha_quality_scale: internal
ha_integration_type: system
related:
  - docs: /docs/troubleshooting_general/
    title: General troubleshooting
  - docs: /docs/configuration/troubleshooting/#debug-logs-and-diagnostics
    title: Debug logs and diagnostics
---

The **Recovery mode** {% term integration %} is an internal integration that Home Assistant activates automatically when, in rare cases, something unexpected prevents it from starting normally. It is a safety net. Home Assistant is designed to handle updates, configuration changes, and day-to-day operation without needing recovery mode, and in practice, you are unlikely to ever see it.

When it is needed, recovery mode gives you a minimal but working Home Assistant so you can investigate and fix the problem without having to edit files directly on disk.

You do not install or configure this integration. Home Assistant starts it for you when needed.

{% important %}
Recovery mode does not delete, reset, or modify your configuration, {% term entities %}, or history. Your data is safe. Recovery mode only starts with a minimal set of {% term integrations %} so you can reach the UI and fix whatever went wrong.
{% endimportant %}

## When Home Assistant starts in recovery mode

Recovery mode is rarely needed. Home Assistant only falls back to it when something unexpected prevents a normal startup, for example:

- The {% term "`configuration.yaml`" %} file cannot be parsed because of a YAML syntax error.
- A manually edited configuration file contains options that are no longer valid.
- One or more core {% term integrations %}, such as the frontend, fail to load due to an unexpected environmental issue.
- The configuration storage was corrupted, for example, after a sudden power loss.

When recovery mode is active, Home Assistant loads only a minimal set of system {% term integrations %} (such as the frontend, backup, and cloud) and skips all your user-configured {% term integrations %}. You see a **Recovery Mode** notification on the dashboard when you sign in.

## What to do when you are in recovery mode

1. Open {% my logs title="**Settings** > **System** > **Logs**" %} and look for the error that caused the problem. The log entry usually points at the exact line in {% term "`configuration.yaml`" %} or the {% term integration %} that failed.
2. Fix the reported issue. This often means:
   - Correcting a YAML syntax error in {% term "`configuration.yaml`" %}.
   - Removing or updating a configuration option that was changed. Check the [backward-incompatible changes](/blog/categories/core/) of a recent release if the issue appeared after an update.
   - Restoring a [backup](/integrations/backup/) from before the problem started.
3. Restart Home Assistant from {% my general title="**Settings** > **System**" %} by selecting **Restart Home Assistant**, or by rebooting your host.
4. If Home Assistant starts normally, the issue is resolved. If recovery mode reactivates, the underlying issue is still there. Check the logs again for the current error.

{% tip %}
If you are unsure how to fix the error, copy the relevant log lines and search the [Home Assistant Community Forum](https://community.home-assistant.io/). Many recovery mode errors, especially after an update, have been reported and solved by other users.
{% endtip %}

## Common causes

When recovery mode does happen, these are the most common reasons:

- **YAML syntax errors**: incorrect indentation, missing colons, or unmatched quotes in {% term "`configuration.yaml`" %} or any included YAML files.
- **Missing include files**: an `!include` reference in {% term "`configuration.yaml`" %} points to a file that no longer exists.
- **Backward-incompatible changes after an update**: a manually configured option was changed or removed in a release. Check the [backward-incompatible changes](/blog/categories/core/) section of the release notes for the version you upgraded to.
- **Corrupted configuration storage**: it can happen after a sudden power loss during a write.

## Known limitations

- In recovery mode, your {% term integrations %}, {% term devices %}, {% term automations %}, and {% term "scripts" %} are not active. Recovery mode is only meant for fixing the problem, not for continuing to run Home Assistant.
- The recovery mode notification disappears as soon as Home Assistant starts normally again.
