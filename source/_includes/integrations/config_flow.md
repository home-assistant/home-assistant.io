{% capture name %}{{ include.name | default: page.title }}{% endcapture %}
{% capture domain %}{{ include.domain | default: page.ha_domain }}{% endcapture %}

## Configuration

To add the **{{ name }}** {% unless page.ha_integration_type == 'hardware' or page.ha_integration_type == 'virtual' %}{{ page.ha_integration_type | default: "integration" }}{% else %}integration{% endunless %} to your Home Assistant instance, use this My button:

{% my config_flow_start badge domain=domain %}

{% if include.discovery or page.ha_dhcp or page.ha_homekit or page.ha_ssdp or page.ha_zeroconf or page.ha_mqtt %}
{{ name }} can be auto-discovered by Home Assistant. If an instance was found,
it will be shown as **Discovered**. You can then set it up right away.
{% endif %}

{% details "Manual configuration steps" icon="mdi:cursor-hand" %}
{% if include.discovery or page.ha_dhcp or page.ha_homekit or page.ha_ssdp or page.ha_zeroconf or page.ha_mqtt %}
If it wasn't discovered automatically, don't worry! You can set up a
manual integration entry:
{% else %}
If the above My button doesn't work, you can also perform the following steps
manually:
{% endif %}

- Browse to your Home Assistant instance.
- Go to **{% my integrations icon title="Settings > Devices & Services" %}**.
{% if page.ha_integration_type == 'helper' %}
- At the top of the screen, select the tab: **{% my helpers %}**.
- In the bottom right corner, select the
  **{% my config_flow_start icon domain=domain title="Create helper" %}** button.
{% else %}
- In the bottom right corner, select the
  **{% my config_flow_start icon domain=domain %}** button.
{% endif %}
- From the list, select **{{ name }}**.
- Follow the instructions on screen to complete the setup.

{% enddetails %}
