{% tabbed_block %}

- title: Install
  content: |

    ```bash
    docker run -d \
      --name homeassistant \
      --privileged \
      --restart=unless-stopped \
      -e TZ=MY_TIME_ZONE \
      -v /PATH_TO_YOUR_CONFIG:/config \
      -p 8123:8123 \
      {{ site.installation.container }}:{{ include.tag | default: 'stable' }}
    ```

- title: Update
  content: |

    ```bash
    # if this returns "Image is up to date" then you can stop here
    docker pull {{ site.installation.container }}:{{ include.tag | default: 'stable' }}
    ```

    ```bash
    # stop the running container
    docker stop homeassistant
    ```

    ```bash
    # remove it from Docker's list of containers
    docker rm homeassistant
    ```

    ```bash
    # finally, start a new one
    docker run -d \
      --name homeassistant \
      --restart=unless-stopped \
      --privileged \
      -e TZ=MY_TIME_ZONE \
      -v /PATH_TO_YOUR_CONFIG:/config \
      --network=host \
      {{ site.installation.container }}:{{ include.tag | default: 'stable' }}
    ```

{% endtabbed_block %}
