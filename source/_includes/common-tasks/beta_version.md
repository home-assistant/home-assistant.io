### Running a beta version

If you would like to test next release before anyone else, you can install the beta version.

{% if page.installation == "os" or page.installation == "supervised" %}

{% tabbed_block %}

- title: From the UI
  content: |

    1. In Home Assistant, go to {% my updates title="**System** > **Updates**" %}.
    2. In the top-right corner, select the three-dots menu.
    3. Select **Join beta**.
    4. Go to the {% my configuration title="**Configuration**" %} panel.
    5. Install the update that is presented to you.
       - **Troubleshooting**: If you do not see that notification:
         - In the top right corner, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Check for updates**.
         - Go to {% my updates title="**System** > **Updates**" %}.
           - Select the update notification.
           - Select the cogwheel {% icon "mdi:cog-outline" %}, then set **Visible** to active.

- title: From the CLI
  content: |

    1. Join the beta channel.

        ```bash
        ha supervisor options --channel beta
        ```

    2. Reload Home Assistant Supervisor.

        ```bash
        ha supervisor reload
        ```

    3. Update Home Assistant Core to the latest beta version.

        ```bash
        ha core update --backup
        ```

        _The_ `--backup` _flag here ensures that you have a partial backup of your current setup in case you need to downgrade._

{% endtabbed_block %}

{% elsif page.installation == "container" %}

```bash
docker pull {{ site.installation.container }}:beta
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

4. Download and install the beta version.

    ```bash
    pip3 install --pre --upgrade homeassistant
    ```

5. When that is complete, start the service again for it to use the new files.

{% endif %}
