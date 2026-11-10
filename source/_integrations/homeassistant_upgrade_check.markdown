---
title: Home Assistant Upgrade Check
description: Home Assistant Upgrade Check shows which changes in an upcoming Home Assistant update affect your integrations, before you install it.
ha_release: '2026.12'
ha_codeowners:
  - '@home-assistant/core'
ha_domain: homeassistant_upgrade_check
ha_integration_type: system
related:
  - docs: /integrations/default_config/
    title: Default config
  - docs: /common-tasks/general/updating/
    title: Updating Home Assistant, apps, and devices
---

The **Home Assistant Upgrade Check** {% term integration %} shows which changes in an upcoming Home Assistant update affect the {% term integrations %} you use, before you install the update.

Every release comes with release notes that list what changed. When you skip a few releases, those notes add up quickly. The upgrade check reads the release notes of every release between the version you run and the version you are about to install, and picks out the parts that matter for your installation. That way, you know what to look out for, such as a backward-incompatible change in an integration you rely on.

## Where to find it

When an update of Home Assistant is available, the upgrade check shows up in two places:

- **In the update dialog**: Go to {% my updates title="**Settings** > **System** > **Updates**" %} and select the Home Assistant update. Below the version numbers, a short summary tells you how many changes affect your integrations, and how many of them are backward-incompatible. Select **Show what changes for you** to see them all.
- **On the updates page**: At the bottom of {% my updates title="**Settings** > **System** > **Updates**" %}, the **Before you upgrade** card lists every change that affects your integrations.

The upgrade check is only shown while a Home Assistant update is waiting to be installed. Once you are up to date, it disappears until the next update.

## What it shows

The **Before you upgrade** card groups the changes into sections. Each change links to the release notes it comes from, so you can always read the full story.

- **Backward-incompatible changes**: Changes that may need you to take action, grouped per integration. Changes that are not tied to a single integration, such as changes to dashboards or automations, are grouped under **General changes**. Read these before you update.
- **Noteworthy improvements**: New features and improvements in the integrations you use, grouped per integration.
- **Quality scale changes**: Integrations you use that reached a higher tier on the [integration quality scale](/docs/quality_scale/), together with the contributors who made it happen.
- **Removed integrations**: Integrations you use that are no longer part of Home Assistant, with the release that removed them and what you can use instead.

Changes that only mention one of your integrations, without being about it, are listed separately under **Also mentions your integrations**.

## Data updates

The upgrade check reads the release notes from the [Home Assistant website](/blog/categories/release-notes/) the first time you open it for an update, and keeps them until a different update is available. It only downloads the public release notes. Which integrations you use is checked on your own Home Assistant, and is not sent anywhere.

## Known limitations

- The upgrade check works with the Home Assistant update that the Supervisor offers, like on Home Assistant OS. On installation types without the Supervisor, such as Home Assistant Container, Home Assistant does not offer its own update, so the upgrade check does not show anything.
- The texts of the changes come straight from the release notes, which are only available in English.
- Only the changes listed in the release notes of each monthly release are included. Changes from patch releases, such as 2026.11.1, are not included.
- The release notes do not always name the integration a change is about. Such changes may be missing from the upgrade check, so the full release notes remain the best place to check before a big update.

## Troubleshooting

### Symptom: "Unable to read the release notes right now"

The **Before you upgrade** card shows **Unable to read the release notes right now. Try again later.** instead of the changes.

Home Assistant could not download the release notes. This can happen when your Home Assistant has no internet connection, or when the website hosting the release notes is temporarily unavailable or limits the number of requests. Check the internet connection of your Home Assistant, and try again later. In the meantime, you can read the release notes on the [Home Assistant website](/blog/categories/release-notes/).

