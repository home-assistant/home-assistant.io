---
title: Repairs
description: Home Assistant Repairs informs you about issues it has found in your Home Assistant installation.
ha_release: 2022.8
ha_category:
  - Other
ha_codeowners:
  - '@home-assistant/core'
ha_domain: repairs
ha_integration_type: system
ha_quality_scale: internal
---

The Home Assistant Repairs integration will inform you about issues it has found
in your Home Assistant instance that should be fixed to ensure your instance
stays healthy and running for now and in the future.

## Configuration

The repairs integration is by default enabled. No action is required to
enable it. You can find the Home Assistant Repairs dashboard in 
{% my repairs title="**Settings** -> **System** -> **Repairs**" %}.

{% my repairs badge %}

## How to use

If Home Assistant finds an issue in your Home Assistant instance that
requires your intervention to fix, it will create a new issue in the repairs
dashboard.

Just like [updates](/integrations/update/), the number of issues pending
in the repairs dashboard is shown in the sidebar on the "Settings" menu item.

<p class='img'>
<img class="no-shadow" src='/images/integrations/repairs/number-of-repairs.png' alt='Screenshot showing the number of updates and repairs pending on the settings menu item in the sidebar'>
The settings menu item shows the number of pending updates and repairable issues.
</p>

Navigate to {% my repairs title="**Settings** -> **System** -> **Repairs**" %}
to see the list of issues that need your attention.

Each issue listed will either provide you the opportunity to fix the issue
straight from the dashboard or provide you with information on how to resolve
the reported issue.

Keeping your system updated and free of issues will help you maintain and keep
it stable and future-proof.
