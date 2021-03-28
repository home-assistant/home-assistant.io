## Configuration check

{% if page.installation == "os" or page.installation == "supervised" %}

```bash
ha core check
```

{% elsif page.installation == "container" %}

```bash
docker exec homeassistant python -m homeassistant --script check_config --config /config
```

_If your container name is something other than `homeassistant`, change that part._

{% elsif page.installation == "core" %}

1. Switch to the user that is running Home Assistant

    ```bash
    sudo -u homeassistant -H -s
    ```

2. Activate the virtual environment that Home Assistant is running in

    ```bash
    source /srv/homeassistant/bin/activate
    ```

3. Run the configuration check

    ```bash
    hass --script check_config
    ```

4. When that is complete restart the service for it to use the new files.

{% endif %}
