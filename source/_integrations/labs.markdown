---
title: Home Assistant Labs
description: Try new preview features before they become standard in Home Assistant.
ha_category:
  - Other
ha_release: 2025.12
ha_iot_class: ~
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: labs
ha_integration_type: system
related:
  - docs: /docs/configuration/basic/
    title: Configuration basics
---

The **Labs** {% term integration %} provides a dedicated panel where you can preview and test new features before they become standard in Home Assistant. These preview features are fully functional and free of critical bugs, but may still undergo design changes based on user feedback.

Labs preview features are different from beta testing:

- *Beta testing* evaluates the stability of upcoming Home Assistant releases.
- *Labs preview features* are preview features being refined through real-world usage and feedback.

{% include integrations/config_flow.md %}

## About Labs preview features

Labs allows you to:

- Preview new functionality before it becomes standard.
- Experience upcoming features in your setup.
- Provide feedback to help shape the final design.

All preview features in Labs are:

- Optional: Disabled by default, you must explicitly enable them.
- Free of critical bugs: Fully functional and free of critical bugs.
- Subject to change: Feature set may be extended, and design and behavior may be refined based on feedback.
- Reversible: Can be disabled at any time.

## Accessing Labs

To access the Labs panel:

1. Go to {% my labs title="**Settings** > **System** > **Labs**" %}.
2. Only admin users can access this panel.

## Using preview features

Each preview feature in Labs includes:

- **Name** and **Description**: What the feature does.
- **Enable/Disable** button: Turn the feature on or off.

Optionally they include:

- Feedback link: Share your experience with the community.
- Documentation link: Learn more about the feature.
- Report issue link: Report bugs or problems.

### Enabling a feature

1. Navigate to {% my labs title="the Labs panel" %}.
2. Find the feature you want to try.
3. Select the **Enable** button.

You can also use My Home Assistant links to navigate directly to a specific feature in Labs. For example:

```text
https://my.home-assistant.io/redirect/labs/?domain=kitchen_sink&preview_feature=special_repair
```

These links are useful in release notes, documentation, or when sharing specific features with others.

### Disabling a feature

1. Return to {% my labs title="the Labs panel" %}.
2. Find the enabled feature.
3. Select the **Disable** button.

## Feature requirements

Some preview features require specific integrations to be installed and configured. If a feature is unavailable with a message indicating a required integration, you must first set up that integration before you can enable the feature.

## Providing feedback

Your feedback helps improve these features! When you enable a preview feature:

1. Use the **Give Feedback** link to share your experience in the community forum.
2. Use the **Report Issue** link to report bugs on GitHub.
3. Be specific about what works well and what could be improved.
4. Include relevant details like your Home Assistant version and setup.

## Known limitations

- Preview features may change between releases based on user feedback.
- Feature design and behavior can be refined without prior notice.
- Some features may require specific integrations to be installed.

## Removing the integration

This integration is a core part of Home Assistant and cannot be removed.
