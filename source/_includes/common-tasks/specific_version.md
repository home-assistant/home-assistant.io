## Run a specific version

{% assign current_version = site.current_major_version | append: "." | append: site.current_minor_version | append: "." | append: site.current_patch_version  %}

In the event that a Home Assistant Core version doesn't play well with your hardware setup, you can downgrade to a previous release. In this example `{{current_version}}` is used as the target version but you can choose the version you desire to run.

{% if page.installation == "os" or page.installation == "supervised" %}

```bash
ha core update --version {{current_version}}
```

{% elsif page.installation == "container" %}

```bash
ha os update --version {{current_version}}
```

{% elsif page.installation == "core" %}

1. Switch to the user that is running Home Assistant

    ```bash
    sudo -u homeassistant -H -s
    ```

2. Activate the virtual environment that Home Assistant is running in

    ```bash
    source /srv/homeassistant/bin/activate
    ```

3. Download and install the version you want

    ```bash
    pip3 install homeassistant=={{current_version}}
    ```

4. When that is complete restart the service for it to use the new files.

{% endif %}
