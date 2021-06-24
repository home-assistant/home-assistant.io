{% tabbed_block %}

- title: Install
  content: |

    ```bash
    docker run --init -d \
      --name homeassistant \
      --privileged \
      --restart=unless-stopped \
      -v /etc/localtime:/etc/localtime:ro \
      -v /PATH_TO_YOUR_CONFIG:/config \
      --network=host \
      {{ include.image | default: site.installation.container.base }}:{{ include.tag | default: 'stable' }}
    ```

- title: Update
  content: |

    ```bash
    # if this returns "Image is up to date" then you can stop here
    docker pull {{ include.image }}
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
    docker run --init -d \
      --name homeassistant \
      --restart=unless-stopped \
      --privileged \
      -v /PATH_TO_YOUR_CONFIG:/config \
      -v /etc/localtime:/etc/localtime:ro \
      --network=host \
      {{ include.image | default: site.installation.container.base }}:{{ include.tag | default: 'stable' }}
    ```

{% endtabbed_block %}
