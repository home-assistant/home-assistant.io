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

When an update of Home Assistant is available, go to {% my updates title="**Settings** > **System** > **Updates**" %}. The Home Assistant update shows how many backward-incompatible changes concern your setup, including general changes. Select the update to see the **What's new** card. It lists the integrations you use that have backward-incompatible changes, a single entry for the general changes, and the integrations you use that are being removed. Select an entry to go straight to its changes, or select **Details and what to do for each change** to open the page with every change.

The upgrade check is only shown while a Home Assistant update is waiting to be installed. Once you are up to date, it disappears until the next update.

## What it shows

The page with every change groups the changes into sections. Each change links to the release notes it comes from, so you can always read the full story.

- **Breaking changes for your setup**: Changes that may need you to take action, grouped per integration. Changes that are not tied to a single integration, such as changes to dashboards or automations, are grouped under **General changes**. These concern every installation, so the **What's new** card only shows how many there are. Read these before you update.
- **Removed integrations you use**: Integrations you use that are no longer part of Home Assistant, with the release that removed them and what you can use instead. These stop working after the update, so they are also listed on the **What's new** card.
- **Improvements for your integrations**: New features and improvements in the integrations you use, grouped per integration.
- **Quality scale achievements for your integrations**: Integrations you use that reached a higher tier on the [integration quality scale](/docs/quality_scale/), together with the contributors who made it happen.

## Data updates

The upgrade check reads the release notes from the [Home Assistant website](/blog/categories/release-notes/) the first time you open it for an update, and keeps them until a different update is available. It only downloads the public release notes. Which integrations you use is checked on your own Home Assistant, and is not sent anywhere.

## Known limitations

- The upgrade check works with the Home Assistant update that the Supervisor offers, like on Home Assistant OS. On installation types without the Supervisor, such as Home Assistant Container, Home Assistant does not offer its own update, so the upgrade check does not show anything.
- The texts of the changes come straight from the release notes, which are only available in English.
- Only the changes listed in the release notes of each monthly release are included. Changes from patch releases, such as 2026.11.1, are not included.
- The release notes do not always name the integration a change is about. Such changes may be missing from the upgrade check, so the full release notes remain the best place to check before a big update.

## Troubleshooting

### Symptom: "Can't check this update for your setup"

The upgrade check shows **Can't check this update for your setup** instead of the changes.

Home Assistant could not read the release notes. This can happen when:

- Your Home Assistant has no internet connection.
- The website hosting the release notes is temporarily unavailable or limits the number of requests.
- The update is offered before its release notes are published. This can happen for a short while on release day.

Check the internet connection of your Home Assistant, and try again later. Nothing is stored until the release notes of every release up to the update could be read, so a later try picks up the full set. In the meantime, you can read the release notes on the [Home Assistant website](/blog/categories/release-notes/).

