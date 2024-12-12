## Install Home Assistant Container

{% if page.installation_type != 'alternative' %}
These below instructions are for an installation of {% term "Home Assistant Container" %} running in your own container environment, which you manage yourself. Any [OCI](https://opencontainers.org/) compatible runtime can be used, however this guide will focus on installing it with Docker.

{% note %}
This installation method **does not have access to add-ons**. If you want to use add-ons, you need to use another installation method. The recommended method is {% term "Home Assistant Operating System" %}. Checkout the [overview table of installation types](https://www.home-assistant.io/installation/#advanced-installation-methods) to see the differences.
{% endnote %}

{% important %}

<b>Prerequisites</b>
This guide assumes that you already have an operating system setup and a container runtime installed (like Docker).

If you are using Docker then you need to be on at least version 19.03.9, ideally an even higher version, and `libseccomp` 2.4.2 or newer. Docker _Desktop_ will not work, you must use Docker _Engine_.

{% endimportant %}

### Platform installation

Installation with Docker is straightforward. Adjust the following command so that:

- `/PATH_TO_YOUR_CONFIG` points at the folder where you want to store your configuration and run it. Make sure that you keep the `:/config` part.
- `MY_TIME_ZONE` is a [tz database name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones), like `TZ=America/Los_Angeles`.
- D-Bus is optional but required if you plan to use the [Bluetooth integration](/integrations/bluetooth).

{% endif %}

{% if page.installation_type == 'alternative' %}
  {% include installation/container/alternative.md %}
{% else %}
  {% include installation/container/cli.md %}
{% endif %}

Once the Home Assistant Container is running Home Assistant should be accessible using `http://<host>:8123` (replace <host> with the hostname or IP of the system). You can continue with onboarding.

{% include getting-started/next_step.html step="Onboarding" link="/getting-started/onboarding/" %}

### Restart Home Assistant

If you change the configuration, you have to restart the server. To do that you have 3 options.

1. In your Home Assistant UI, go to the **Settings** > **System** and click the **Restart** button.
2. You can go to the **Developer Tools** > **Actions**, select `homeassistant.restart` and select **Perform action**.
3. Restart it from a terminal.

{% tabbed_block %}

- title: Docker CLI
  content: |

    ```bash
    docker restart homeassistant
    ```

- title: Docker Compose
  content: |

    ```bash
    docker compose restart
    ```

{% endtabbed_block %}

### Docker compose

{% tip %}
`docker compose` should [already be installed](https://www.docker.com/blog/announcing-compose-v2-general-availability/) on your system. If not, you can [manually](https://docs.docker.com/compose/install/linux/) install it.
{% endtip %}

As the Docker command becomes more complex, switching to `docker compose` can be preferable and support automatically restarting on failure or system restart. Create a `compose.yml` file:

{% include installation/container/compose.md %}

Start it by running:

```bash
docker compose up -d
```

Once the Home Assistant Container is running, Home Assistant should be accessible using `http://<host>:8123` (replace <host> with the hostname or IP of the system). You can continue with onboarding.

{% include getting-started/next_step.html step="Onboarding" link="/getting-started/onboarding/" %}

### Exposing devices

In order to use Zigbee or other integrations that require access to devices, you need to map the appropriate device into the container. Ensure the user that is running the container has the correct privileges to access the `/dev/tty*` file, then add the device mapping to your container instructions:

{% tabbed_block %}

- title: Docker CLI
  content: |

    ```bash
    docker run ... --device /dev/ttyUSB0:/dev/ttyUSB0 ...
    ```

- title: Docker Compose
  content: |

    ```yaml
    services:
      homeassistant:
        ...
        devices:
          - /dev/ttyUSB0:/dev/ttyUSB0
    ```

{% endtabbed_block %}

### Optimizations

The Home Assistant Container is using an alternative memory allocation library [jemalloc](http://jemalloc.net/) for better memory management and Python runtime speedup.

As the jemalloc configuration used can cause issues on certain hardware featuring a page size larger than 4K (like some specific ARM64-based SoCs), it can be disabled by passing the environment variable `DISABLE_JEMALLOC` with any value, for example:

{% tabbed_block %}

- title: Docker CLI
  content: |

    ```bash
    docker run ... -e "DISABLE_JEMALLOC=true" ...
    ```

- title: Docker Compose
  content: |

    ```yaml
    services:
      homeassistant:
      ...
        environment:
          DISABLE_JEMALLOC: true
    ```

{% endtabbed_block %}

The error message `<jemalloc>: Unsupported system page size` is one known indicator.
