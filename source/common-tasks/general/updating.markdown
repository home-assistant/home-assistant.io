---
title: "Updating Home Assistant, apps, and devices"
description: "How to find and install updates for Home Assistant, apps, integrations, and devices, update several at once, skip an update, and let apps update automatically."
related:
  - docs: /common-tasks/os/#updating-home-assistant
    title: Updating Home Assistant Operating System
  - docs: /common-tasks/container/#update
    title: Updating Home Assistant Container
  - docs: /common-tasks/general/backups/#app-update-backups
    title: App update backups
  - docs: /integrations/update/
    title: Update integration
---

Home Assistant shows the available updates for your integrations and devices in one place. On {% term "Home Assistant Operating System" %}, this includes updates for Home Assistant itself and your apps. You decide when to install them. You can install one update at a time, or all updates of an integration or of your apps at once.

You need an administrator account to install or skip updates.

## Finding available updates

Home Assistant checks for updates regularly, and shows them on the **Settings** page and on the **Updates** page.

1. Go to {% my updates title="**Settings** > **System** > **Updates**" %}.
   - The updates are grouped on cards:
     - **Home Assistant**: Updates of Home Assistant itself. Only on {% term "Home Assistant Operating System" %}.
     - One card for each integration that has updates, for example, **ESPHome** for the firmware of your ESPHome devices.
     - **Apps**: Updates of your apps. Only on {% term "Home Assistant Operating System" %}.
2. To check for updates now, in the top-right corner, select **Check for updates** {% icon "mdi:refresh" %}.

## Updating Home Assistant itself

Before you update Home Assistant itself, prepare a backup and check the release notes for changes that affect your setup. The steps depend on your installation type:

- {% term "Home Assistant Operating System" %}: Refer to [Updating Home Assistant Core](/common-tasks/os/#updating-home-assistant-core) and [Updating the Home Assistant Operating System](/common-tasks/os/#updating-the-home-assistant-operating-system).
- {% term "Home Assistant Container" %}: You update the container. Home Assistant itself doesn't show on the **Updates** page. Refer to [Updating Home Assistant Container](/common-tasks/container/#update).

## Updating an app, integration, or device

You install updates of apps, integrations, and devices from the **Updates** page. To update Home Assistant itself, refer to [Updating Home Assistant itself](#updating-home-assistant-itself).

1. Go to {% my updates title="**Settings** > **System** > **Updates**" %} and select the update.
   - The dialog shows the installed version, the new version, and the release notes, if the update has them.
2. For an app, choose whether to keep a backup of the current version. Turn **Keep backup of the last version** on or off.
   - For details, refer to [App update backups](/common-tasks/general/backups/#app-update-backups).
3. Select **Update**.

## Installing all updates of a card

If an integration or your apps have several updates, you can install all of them at once.

1. Go to {% my updates title="**Settings** > **System** > **Updates**" %}.
2. On the card, select **Update all**.
   - Home Assistant installs all updates of that card. It doesn't create backups first, not even for apps.
   - The **Home Assistant** card doesn't have this button. Install those updates one at a time.

## Skipping an update

If you don't want to install an update, you can skip it. Home Assistant then hides the update until a newer version comes out.

### To skip an update from the UI

1. Go to {% my updates title="**Settings** > **System** > **Updates**" %} and select the update.
2. Select **Skip**.
   - If the app updates automatically, you can't skip the update. To skip it, first turn off **Auto update** for the app.

### To see skipped updates

1. Go to {% my updates title="**Settings** > **System** > **Updates**" %}.
2. In the top-right corner, select the three dots {% icon "mdi:dots-vertical" %} menu, and then select **Show skipped updates**.
   - Result: The skipped updates show on their own card.
3. To install a skipped update, select it, and then select **Clear skipped**.
   - The update shows on its card again. To install it, refer to [Updating an app, integration, or device](#updating-an-app-integration-or-device).

### To skip updates from an automation or a script

Use the [**Skip update**](/actions/update.skip/) and [**Clear skipped update**](/actions/update.clear_skipped/) actions.

## Updating apps automatically

On {% term "Home Assistant Operating System" %}, apps can update automatically. Home Assistant itself and the operating system only update when you install the update.

1. Go to {% my supervisor title="**Settings** > **Apps**" %} and select the app.
2. On the **Info** tab, turn on **Auto update**.
   - Home Assistant waits at least one day after a new version is released before it updates the app.
   - It creates an [app update backup](/common-tasks/general/backups/#app-update-backups) before each update.
   - If the app's developer marked a version as a breaking change, the app doesn't update automatically to that version. Install that update yourself.

## Updates you can't install from Home Assistant

Some integrations let you know about an update, but you can't install it from Home Assistant. These updates show on a separate card on the **Updates** page. To install such an update, use the app or the website of the device's manufacturer.
