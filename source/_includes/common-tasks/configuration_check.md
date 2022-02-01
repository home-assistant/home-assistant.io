## Configuration check

{% if page.installation == "os" or page.installation == "supervised" %}

```bash
ha core check
```

{% elsif page.installation == "container" %}

_If your container name is something other than `homeassistant`, change that part in the examples below._

Run the full check:

```bash
docker exec homeassistant python -m homeassistant --script check_config --config /config
```

Listing all loaded files:

```bash
docker exec homeassistant python -m homeassistant --script check_config --files
```

Viewing a component’s configuration ([`light`](/integrations/light) in this example):

```bash
docker exec homeassistant python -m homeassistant --script check_config --info light
```

Or all components’ configuration

```bash
docker exec homeassistant python -m homeassistant --script check_config --info all
```

You can get help from the command line using:

```bash
docker exec homeassistant python -m homeassistant --script check_config --help
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

3. Run the configuration check

    Run the full check:

    ```bash
    hass --script check_config
    ```

    Listing all loaded files:

    ```bash
    hass --script check_config --files
    ```

    Viewing a component’s configuration ([`light`](/integrations/light) in this example):

    ```bash
    hass --script check_config --info light
    ```

    Or all components’ configuration

    ```bash
    hass --script check_config --info all
    ```

    You can get help from the command line using:

    ```bash
    hass --script check_config --help
    ```

4. When that is complete restart the service for it to use the new files.

{% endif %}
