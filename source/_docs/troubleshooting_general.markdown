---
title: "General troubleshooting"
description: "General troubleshooting information"
---

This page provides some information about troubleshooting topics that are not related to the installation itself but are of a more generic nature.

## Home Assistant went into recovery mode


### Symptom: Home Assistant is in recovery mode

It can happen that Home Assistant appears in **Recovery mode**. If this is the case, you will see a red banner on top of the page. On the **Overview** page, you see a **Recovery mode** notification.

![image](/images/docs/troubleshooting/recovery_mode_active.png)

### Description

When Home Assistant is in recovery mode, it means there was an issue with the configuration.

Recovery mode loads a few minimal integrations and parts of the configuration of the last time when it did start. It will show you a user interface, the settings, and add-ons.

### Resolution

You need to identify the issue in the configuration files and fix it there. The issue could be caused by something as simple as an invalid YAML file.

- If you are still logged in, you can [edit your configuration](/docs/configuration/#editing-configurationyaml). If needed, you can install an add-on such as VS code to edit the configuration file.
- If you are locked out because you forgot your password, you cannot edit the configuration file from the user interface. Follow the steps to [reset your password](/docs/locked_out/).

## Restarting Home Assistant in safe mode

If your Home Assistant is acting up and you cannot identify a root cause, you can use **Safe mode** to narrow down the field of possible causes.
Safe mode loads Home Assistant Core, but no custom integrations, no custom cards, and no custom themes. If the issue does not persist in Safe mode, the issue is not with Home Assistant Core. Before reporting an issue, check if the issue persists in Safe mode.

To enable Safe mode, go to **Settings** > **System** > **Restart Home Assistant** (top right) > **Restart Home Assistant in safe mode**.

## Related topics

- [Editing your configuration](/docs/configuration/#editing-configurationyaml)
- [Recovery mode integration](/integrations/recovery_mode/)
- [Resetting your password](/docs/locked_out/)