### Running a specific version

{% assign current_version = site.current_major_version | append: "." | append: site.current_minor_version | append: "." | append: site.current_patch_version  %}

{% if page.installation != "os" %}

To see which version your system is running, go to {% my info title="**Settings** > **About**" %}.

In the event that a Home Assistant Core version doesn't play well with your hardware setup, you can downgrade to a previous release. In this example `{{current_version}}` is used as the target version but you can choose the version you desire to run.

{% endif %}

{% if page.installation == "os"%}

To upgrade to a specific version, you can use the command line (CLI). The example below shows how to upgrade to `{{current_version}}`. To learn how to get started with the command line in Home Assistant, refer to the [SSH add-on setup instructions](/common-tasks/os/#installing-and-using-the-ssh-add-on).

```bash
ha core update --version {{current_version}} --backup
```

_The_ `--backup` _flag here ensures that you have a partial backup of your current setup in case you need to downgrade later._

To downgrade your installation, do a [partial restore of a backup](/common-tasks/general/#backups) instead.

{% elsif page.installation == "container" %}

```bash
docker pull {{ site.installation.container }}:{{current_version}}
```

**[You then need to recreate the container with the new image.](/installation/linux#install-home-assistant-container)**

{% endif %}
