### Running a development version

If you want to stay on the bleeding-edge Home Assistant Core development branch, you can upgrade to `dev`.

{% caution %}
The `dev` branch is likely to be unstable. Potential consequences include loss of data and instance corruption.
{% endcaution %}

{% if page.installation == "os" %}

1. Join the dev channel.

    ```bash
    ha supervisor options --channel dev
    ```

2. Reload the {% term "Home Assistant Supervisor" %}.

    ```bash
    ha supervisor reload
    ```

3. Update {% term "Home Assistant Core" %} to the latest dev version.

    ```bash
    ha core update --backup
    ```

    _The_ `--backup` _flag here ensures that you have a partial backup of your current setup incase you need to downgrade._

{% elsif page.installation == "container" %}

```bash
docker pull {{ site.installation.container }}:dev
```

**[You then need to recreate the container with the new image.](/installation/linux#install-home-assistant-container)**

{% endif %}
