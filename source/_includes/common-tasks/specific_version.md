### Running a specific version

{% assign current_version = site.current_major_version | append: "." | append: site.current_minor_version | append: "." | append: site.current_patch_version  %}

{% if page.installation != "os" %}

To see which version your system is running, go to {% my info title="**Settings** > **About**" %}.

{% endif %}

You don't have to run the latest version of Home Assistant Core. You can also run a specific version. For example, an update can cause a problem with an integration you use. You can then stay on the previous version until a fix is released. To go back to an earlier version, refer to [Downgrading to an earlier version](#downgrading-to-an-earlier-version).

{% if page.installation == "os"%}

To install a specific version of Home Assistant Core, follow these steps:

1. Go to {% my tools_actions title="**Settings** > **Tools** > **Actions**" %}.
2. Search for and select the **Install update** action.
3. Under **Targets**, select **Add target**, and search for `Home Assistant Core`. Then, select the **Update** entity of the **Home Assistant Core** device.
4. Select **Version**, and enter the version you want to install.
   - For example: `{{current_version}}`
5. Optional: To create a backup of your current setup first, select **Backup**, and turn it on.
6. Select **Perform action**.
   - Result: Home Assistant installs the version and restarts.

You can also use the command line (CLI). The example below shows how to upgrade to `{{current_version}}`. To learn how to get started with the command line in Home Assistant, refer to the [SSH app setup instructions](/common-tasks/os/#installing-and-using-the-ssh-app).

```bash
ha core update --version {{current_version}} --backup
```

The `--backup` flag first creates a backup of your current setup. You can restore it if you need to go back later.

{% elsif page.installation == "container" %}

The example below uses version `{{current_version}}`. Replace it with the version you want to run.

```bash
docker pull {{ site.installation.container }}:{{current_version}}
```

**[You then need to recreate the container with the new image.](/installation/linux#install-home-assistant-container)**

{% endif %}

#### Downgrading to an earlier version

To go back to an earlier version, restore a backup. Use a backup that you made while you were running that version. For the steps, refer to [Restoring a backup](/common-tasks/general/backups/#restoring-a-backup).

You can also install an earlier version without a backup. But this doesn't undo the changes that the newer version made to your data. For example, an update can convert your database to a new format. It can also convert the settings of some integrations. An earlier version can't read the new format. Your history then stops recording, and some integrations don't load.

For the default database, use a backup that includes both your Home Assistant settings and the database. If you use a database hosted on an external server, also restore a separate database backup made while you were running the earlier version. Restoring these backups brings the included data back to the time you made them. Any later changes to that data are lost.

{% if page.installation == "os" %}

Restoring a backup also brings back the Home Assistant version you ran at that time. This happens when you restore the Home Assistant settings from the backup.

{% elsif page.installation == "container" %}

Restoring a backup doesn't change the version of your container. First, recreate the container with the image of the earlier version. Then, restore the backup. Until you restore the backup, Home Assistant can show errors, because your data is still in the newer format.

{% endif %}
