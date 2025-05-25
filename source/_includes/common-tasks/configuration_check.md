## Configuration check

{% if page.installation == "os" or page.installation == "supervised" %}

After changing configuration or automation files, check if the configuration is valid before restarting Home Assistant Core.

### Running a configuration check from the UI

1. Go to {% my profile title="your user profile" %} and enable **Advanced Mode**.
2. Go to {% my server_controls title="**Developer tools** > **YAML**" %} and in the **Configuration validation** section, select the **Check configuration** button.
   - This is to make sure there are no syntax errors before restarting Home Assistant.
   - It checks for valid {% term YAML %} and valid config structures.
3. If you need to do a more comprehensive configuration check, [run the check from the CLI](#to-run-a-configuration-check-from-the-cli).

### Running a configuration check from the CLI

Use the following command to check if the configuration is valid. The command line configuration check validates the {% term YAML %} files and checks for valid config structures, as well as some other elements.

```bash
ha core check
```

{% elsif page.installation == "container" %}

After changing configuration files, check if the configuration is valid before restarting Home Assistant Core.

_If your container name is something other than `homeassistant`, change that part in the examples below._

Run the full check:

```bash
docker exec homeassistant python -m homeassistant --script check_config --config /config
```

Listing all loaded files:

```bash
docker exec homeassistant python -m homeassistant --script check_config --files
```

Viewing an integration’s configuration ([`light`](/integrations/light) in this example):

```bash
docker exec homeassistant python -m homeassistant --script check_config --info light
```

Or all integrations’ configuration

```bash
docker exec homeassistant python -m homeassistant --script check_config --info all
```

You can get help from the command line using:

```bash
docker exec homeassistant python -m homeassistant --script check_config --help
```

{% elsif page.installation == "core" %}

After changing configuration files, check if the configuration is valid before restarting Home Assistant Core.

1. Switch to the user that is running Home Assistant.

    ```bash
    sudo -u homeassistant -H -s
    ```

2. Activate the virtual environment that Home Assistant is running in.

    ```bash
    source /srv/homeassistant/bin/activate
    ```

3. Run the configuration check.

    Run the full check:

    ```bash
    hass --script check_config
    ```

    Listing all loaded files:

    ```bash
    hass --script check_config --files
    ```

    Viewing a integration’s configuration ([`light`](/integrations/light) in this example):

    ```bash
    hass --script check_config --info light
    ```

    Or all integrations’ configuration

    ```bash
    hass --script check_config --info all
    ```

    You can get help from the command line using:

    ```bash
    hass --script check_config --help
    ```

4. When that is complete, restart the service for it to use the new files.

{% endif %}
