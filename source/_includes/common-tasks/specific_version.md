### Running a specific version

{% assign current_version = site.current_major_version | append: "." | append: site.current_minor_version | append: "." | append: site.current_patch_version  %}

{% if page.installation != "os" and page.installation != "supervised" %}

To see which version your system is running, go to {% my info title="**Settings** > **About**" %}.

In the event that a Home Assistant Core version doesn't play well with your hardware setup, you can downgrade to a previous release. In this example `{{current_version}}` is used as the target version but you can choose the version you desire to run.

{% endif %}

{% if page.installation == "os" or page.installation == "supervised" %}

To upgrade to a specific version, you can use the CLI. The example below shows how to upgrade to `{{current_version}}`.

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

{% elsif page.installation == "core" %}

1. Stop the Home Assistant service.

2. Switch to the user that is running Home Assistant.

    ```bash
    sudo -u homeassistant -H -s
    ```

3. Activate the virtual environment that Home Assistant is running in.

    ```bash
    source /srv/homeassistant/bin/activate
    ```

4. Download and install the version you want.

    ```bash
    pip3 install homeassistant=={{current_version}}
    ```

5. When that is complete start the service again for it to use the new files.

{% endif %}
