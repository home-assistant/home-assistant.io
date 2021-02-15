## Update

Best practice for updating a Home Assistant installation:

1. Backup your installation{% if page.installation == "os" or page.installation == "supervised" %}, using the snapshot functionality Home Assistant offers{% endif %}.
1. Check the release notes for breaking changes on [Home Assistant release notes](https://github.com/home-assistant/home-assistant/releases). Be sure to check all release notes between the version you are running and the one you are upgrading to. Use the search function in your browser (`CTRL + f` / `CMD + f`) and search for **Breaking Changes**.
{% if page.installation == "os" or page.installation == "supervised" %}
1. Check your configuration using the [Check Home Assistant configuration](/addons/check_config/) add-on.
1. If the check passes, you can safely update. If not, update your configuration accordingly.
1. Update Home Assistant.
{% endif %}

{% if page.installation == "os" or page.installation == "supervised" %}

To update Home Assistant Core when you run Home Assistant {{ page.installation_name }} you have 2 options.

{% tabbed_block %}

- title: Using the UI
  content: |

    1. Open your Home Assistant UI
    2. Navigate to the Supervisor panel
    3. On the Dashboard tab you will be presented with an update notification

    _If you do not see that notification you can navigate to the System tab. and click the "Reload Supervisor" button._

- title: Using the CLI
  content: |

    ```bash
    ha core update
    ```

{% endtabbed_block %}

{% elsif page.installation == "container" %}

{% tabbed_block %}

- title: Docker CLI
  content: |

    **First start with pulling the new container.**

    ```bash
    docker pull homeassistant/home-assistant:stable
    ```

    You can also use spesific containers for your hardware. Like Raspberry pi 4:

    ```bash
    docker pull homeassistant/raspberrypi4-homeassistant:stable
    ```

    **[You then need to recreate the container with the new image.](/getting-started/installation)**

- title: Docker Compose
  content: |

    ```bash
    docker-compose pull homeassistant
    docker-compose up -d
    ```

{% endtabbed_block %}

{% elsif page.installation == "core" %}

1. Switch to the user that is running Home Assistant

    ```bash
    sudo -u homeassistant -H -s
    ```

2. Activate the virtual environment that Home Assistant is running in

    ```bash
    source /srv/homeassistant/bin/activate
    ```

3. Download and install the new version

    ```bash
    pip3 install --upgrade homeassistant
    ```

4. When that is complete restart the service for it to use the new files.

{% endif %}
