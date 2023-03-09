## Run a specific version

{% assign current_version = site.current_major_version | append: "." | append: site.current_minor_version | append: "." | append: site.current_patch_version  %}

{% if page.installation != "os" and page.installation != "supervised" %}

In the event that a Home Assistant Core version doesn't play well with your hardware setup, you can downgrade to a previous release. In this example `{{current_version}}` is used as the target version but you can choose the version you desire to run.

{% endif %}

{% if page.installation == "os" or page.installation == "supervised" %}

You can use the CLI to upgrade to a specific version (`{{current_version}}` in this example), to downgrade your installation you should do a partial restore of a [backup](#backups) instead.

```bash
ha core update --version {{current_version}} --backup
```

_The_ `--backup` _flag here ensures that you have a partial backup of your current setup incase you need to downgrade._

{% elsif page.installation == "container" %}

```bash
docker pull {{ site.installation.container }}:{{current_version}}
```

**[You then need to recreate the container with the new image.](/installation/linux#install-home-assistant-container)**

{% elsif page.installation == "core" %}

1. Stop the Home Assistant service.

2. Switch to the user that is running Home Assistant

    ```bash
    sudo -u homeassistant -H -s
    ```

3. Activate the virtual environment that Home Assistant is running in

    ```bash
    source /srv/homeassistant/bin/activate
    ```

4. Download and install the version you want

    ```bash
    pip3 install homeassistant=={{current_version}}
    ```

5. When that is complete start the service again for it to use the new files.

{% endif %}
