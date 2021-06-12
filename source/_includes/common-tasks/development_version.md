## Run a development version

If you want to stay on the bleeding-edge Home Assistant Core development branch, you can upgrade to `dev`.

<div class='note warning'>

  The `dev` branch is likely to be unstable. Potential consequences include loss of data and instance corruption.

</div>

{% if page.installation == "os" or page.installation == "supervised" %}

1. Join the dev channel

    ```bash
    ha supervisor options --channel dev
    ```

2. Reload the supervisor

    ```bash
    ha supervisor reload
    ```

3. Update Home Assistant core to the latest dev version

    ```bash
    ha core update
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
    pip3 install --upgrade git+git://github.com/home-assistant/core.git@dev
    ```

4. When that is complete restart the service for it to use the new files.

{% endif %}
