## Run a beta version

If you would like to test next release before anyone else, you can install the beta version.

{% if page.installation == "os" or page.installation == "supervised" %}

{% tabbed_block %}

- title: From the UI
  content: |

   1. In your Home Assistant UI navigate to {% my updates title="System > Updates" %}
   2. Click the operflow menu in the top right corner
   3. Click "Join beta"
   4. Navigate to Configuration panel
   5. Install the update that is presented to you

- title: From the CLI
  content: |

    1. Join the beta channel

        ```bash
        ha supervisor options --channel beta
        ```

    2. Reload the supervisor

        ```bash
        ha supervisor reload
        ```

    3. Update Home Assistant core to the latest beta version

        ```bash
        ha core update
        ```

{% endtabbed_block %}

{% elsif page.installation == "container" %}

```bash
docker pull {{ site.installation.container }}:beta
```

**[You then need to recreate the container with the new image.](/installation/linux#install-home-assistant-container)**

{% elsif page.installation == "core" %}

1. Switch to the user that is running Home Assistant

    ```bash
    sudo -u homeassistant -H -s
    ```

2. Activate the virtual environment that Home Assistant is running in

    ```bash
    source /srv/homeassistant/bin/activate
    ```

3. Download and install the beta version

    ```bash
    pip3 install --pre --upgrade homeassistant
    ```

4. When that is complete restart the service for it to use the new files.

{% endif %}
