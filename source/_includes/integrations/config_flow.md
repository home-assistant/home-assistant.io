{% capture name %}{{ include.name | default: page.title }}{% endcapture %}
{% capture domain %}{{ include.domain | default: page.ha_domain }}{% endcapture %}

## Configuration

Adding {{ name }} to your Home Assistant instance can be done via the user
interface, by using this My button:

{% my config_flow_start badge domain=domain %}

{% if include.discovery or page.ha_dhcp or page.ha_homekit or page.ha_ssdp or page.ha_zeroconf or page.ha_mqtt %}
{{ name }} can be auto-discovered by Home Assistant. If an instance was found,
it will be shown as **Discovered**. You can then set it up right away.
{% endif %}

{% details "Manual configuration steps" %}
{% if include.discovery or page.ha_dhcp or page.ha_homekit or page.ha_ssdp or page.ha_zeroconf or page.ha_mqtt %}
If it wasn't discovered automatically, don't worry! You can set up a
manual integration entry:
{% else %}
If the above My button doesn't work, you can also perform the following steps
manually:
{% endif %}

- Browse to your Home Assistant instance.
- In the sidebar, select **{% my config icon %}**.
- From the configuration menu, select **{% my integrations %}**.
{% if page.ha_integration_type == 'helper' %}
- In top of the screen, select the tab: **{% my helpers %}**.
- In the bottom right, select the
  **{% my config_flow_start icon domain=domain title="Create helper" %}** button.
{% else %}
- In the bottom right, select the
  **{% my config_flow_start icon domain=domain %}** button.
{% endif %}
- From the list, search and select **{{ name }}**.
- Follow the instructions on screen to complete the setup.

{% enddetails %}
