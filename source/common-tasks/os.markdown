---
title: "Common tasks - Operating System"
description: "Common tasks for Home Assistant Operating System"
installation: os
installation_name: "Operating System"
related:
  - docs: /docs/configuration/
---
This section will provide guides to some common tasks and information which you will need in order to run, maintain, and edit your Home Assistant OS system. For further details on any particular subject, make sure to refer to the documentation for specific add-ons or topics listed here.

{% include common-tasks/file_access.md %}
{% include common-tasks/backups.md %}

## Updating Home Assistant

If you have the {% term "Home Assistant Operating System" %} installed, you receive update notifications from different components:

- {% term "Home Assistant Operating System" %}
- {% term "Home Assistant Supervisor" %}
- {% term "Home Assistant Core" %}
- Add-ons, if you have any installed

### Updating the Home Assistant Operating System

Updates of the {% term "Home Assistant Operating System" %} are independent of other updates. They do not trigger repair issues and are usually backward-compatible.

#### Prerequisites

- [Backup](/common-tasks/os/#backups) your installation.
  - Make sure the backup is downloaded and stored outside of the system.
  - So that you can restore from that backup in case there is an issue with the system.

#### To update the Home Assistant Operating System

{% tabbed_block %}

- title: Using the UI
  content: |

    1. Open the **Settings** panel.
    2. On the top you will be presented with an update notification.

    _If you do not see that notification, in the top right, select the three dots menu and select **Check for updates**"._

- title: Using the CLI
  content: |

    ```bash
    ha os update
    ```

    _This updates to the latest version. If you want to update to a specific version instead, use  `ha os update --version 12.0`._

{% endtabbed_block %}

#### About boot slots used during the update

The {% term "Home Assistant Operating System" %} uses two boot slots. On first installation, boot slot A is used. After that, on each Operating System update, the other boot slot is updated and reboot is triggered. On that reboot, the system boots from the other boot slot (A ➝ B ➝ A,...). When booting fails, the system automatically uses the previous boot slot, so that it boots from the last working operating system.

#### Changing the boot slot used

You can manually define that the previous boot slot is used. This can be useful in cases where the system boots but something still seems wrong. For example, when the device is no longer correctly detected or you see another issue that might be related to the latest update of the operating system.

1. To check which boot slot is currently in use and what OS versions are installed in the individual slots, in the Home Assistant command line, enter the following command:

    ```bash
    ha os info
    ```

2. To change the boot slot, enter the following command:
   - This will boot into the other (previous) OS version.

    ```bash
    ha os boot-slot other
    ```

### Updating Home Assistant Core

{% include common-tasks/update.md %}

{% include common-tasks/network_storage.md %}
{% include common-tasks/lost_password.md %}
{% include common-tasks/third-party-addons.md %}
{% include common-tasks/configuration_check.md %}

## Home Assistant versions

To see which version your system is running, go to {% my info title="**Settings** > **About**" %}.

{% include common-tasks/specific_version.md %}
{% include common-tasks/beta_version.md %}
{% include common-tasks/development_version.md %}

{% include common-tasks/data_disk.md %}

<!-- Accessing Home Assistant from the commandline-->
{% include common-tasks/commandline.md %}

<!-- Enabling i2c-->
{% include common-tasks/enable_i2c.md %}
