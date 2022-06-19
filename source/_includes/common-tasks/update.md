## Update

Best practice for updating a Home Assistant installation:

1. Backup your installation{% if page.installation == "os" or page.installation == "supervised" %}, using the backup functionality Home Assistant offers{% endif %}.
1. Check the release notes for breaking changes on [Home Assistant release notes](/blog/categories/core/). Be sure to check all release notes between the version you are running and the one you are upgrading to. Use the search function in your browser (`CTRL + f` / `CMD + f`) and search for **Breaking Changes**.
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
    2. Navigate to the Settings panel
    3. On the top you will be presented with an update notification

    _If you do not see that notification you can click the overflow menu in the top right and select "Check for updates"._

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
    docker pull {{ site.installation.container }}:stable
    ```

    **[You then need to recreate the container with the new image.](/installation/linux#install-home-assistant-container)**

- title: Docker Compose
  content: |

    ```bash
    docker-compose pull homeassistant
    docker-compose up -d
    ```

{% endtabbed_block %}

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

4. Download and install the new version

    ```bash
    pip3 install --upgrade homeassistant
    ```

5. When that is complete start the service again for it to use the new files.

{% endif %}
