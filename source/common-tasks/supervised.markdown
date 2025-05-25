---
title: "Common tasks - Supervised"
description: "Common tasks for Home Assistant Supervised"
installation: supervised
installation_name: Supervised
related:
  - docs: /docs/configuration/
---


{% include common-tasks/file_access.md %}

## Backup

To learn how to back up the system or how to restore a system from a backup, refer to the backup documentation under [common tasks](/common-tasks/general/#backups).

### Alternative: Creating a backup using the Home Assistant Command Line Interface

In general, to create or restore from a backup, follow the steps described under [common tasks](/common-tasks/general/#backups). However, If you have the {% term "Home Assistant Supervised" %} installed, you can also create a backup from the command line. Follow these steps:

1. `ha backups list` - lists backups and their slugnames
2. `ha backups restore slugname` - restores a specific backup
3. `ha backups new --name nameofbackup` - create a backup

For additional information about command line usage, use the `ha help` command or refer to the [Home Assistant Command Line documentation](/common-tasks/supervised/#home-assistant-via-the-command-line).

## Update

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

{% include common-tasks/commandline.md %}