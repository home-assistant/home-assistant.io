---
title: Home Assistant Labs
description: Try new preview features before they become standard in Home Assistant.
ha_category:
  - Other
ha_release: 2025.12
ha_iot_class: Calculated
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: labs
ha_integration_type: system
related:
  - docs: /docs/configuration/basic/
    title: Configuration basics
---

The **Labs** {% term integration %} provides a dedicated panel where you can play with new Home Assistant features while they are still being shaped. Labs is Home Assistant's way of building in the open with its community: instead of waiting until a feature is finished and polished, you get to try it early, use it in your own setup, and help steer its direction.

Preview features in Labs are fully functional and tested for stability before they land there. They are not half-broken experiments. If a feature looks interesting to you, we encourage you to enable it and play with it. Your real-world use is exactly what helps decide where a feature goes next.

Labs is different from beta testing:

- **Beta testing** focuses on the stability of an upcoming Home Assistant release.
- **Labs** invites you to try, test, and influence new ideas while they are still being forged. Preview features are already tested and usable, but their direction and behavior may still be refined based on what you and other users experience.

## About Labs

Labs allows you to:

- Preview new functionality before it becomes standard.
- Experience upcoming features in your own setup, with your own devices.
- Provide real-world feedback that directly shapes the final direction of a feature.

All preview features in Labs share a few common properties:

- Optional: They are disabled by default. You choose which ones to turn on.
- Functional: They are already usable in real setups. You are not signing up for broken software.
- Subject to change: Their feature set, behavior, and direction may evolve based on community feedback.
- Reversible: You can disable them at any time.

## About preview features

Each preview feature section in Labs includes:

- **Name** and **Description**: What the feature does.
- **Enable/Disable** button: Turn the feature on or off.

Optionally they include:

- **Feedback** link: Share your experience with the community.
- **Documentation** link: Learn more about the feature.
- **Report issue** link: Report bugs or problems.

## Enabling a preview feature

### Prerequisites

- You need administrator rights to access this panel.
- Some preview features require specific integrations to be installed and configured.
  - If a feature is unavailable with a message indicating a required integration, set up that integration and try again.

### To enable a preview feature

1. Go to {% my labs title="**Settings** > **System** > **Labs**" %}.
2. Find the feature you want to try.
3. Select **Enable**.
4. When prompted, you can create a [backup](/integrations/backup/) as a quick safety net before enabling the feature.
   - This gives you an easy one-click way to return to exactly how things were, so you can freely experiment and play with the new feature knowing you can roll back at any time.
   - Creating a backup is optional, but it makes trying out preview features even more relaxed. You get all the fun of exploring something new, without thinking about having to manually undo anything later.

You can also use My Home Assistant links to directly go to a specific feature in Labs. For example:

```text
https://my.home-assistant.io/redirect/labs/?domain=kitchen_sink&preview_feature=special_repair
```

These links are useful in release notes, documentation, or when sharing specific features with others.

## Disabling a preview feature

### Prerequisites

- You need administrator rights to access this panel.
- You have enabled a preview feature.

### To disable a preview feature

1. Go to {% my labs title="**Settings** > **System** > **Labs**" %}.
2. Find the enabled feature.
3. Select **Disable**.

## Providing feedback

Feedback is what makes Labs work. Preview features evolve based on what real users run into, so a few minutes describing your experience directly influences the final design of the feature.

When you enable a preview feature:

1. Use the **Give feedback** link to share your experience on the community forum.
2. Use the **Report issue** link to report bugs on GitHub.
3. Be specific about what works well and what could be improved.
4. Include relevant details such as your Home Assistant version and your setup.

Honest feedback is the most useful kind. Even a short note saying "this worked for me" or "this did not fit my setup because X" helps the developers decide how a feature should evolve.

## Known limitations

- Preview features may change between releases based on user feedback.
- Feature design and behavior can be refined without prior notice.
- Some features may require specific integrations to be installed.

## Removing the integration

This integration is a core part of Home Assistant and cannot be removed.
