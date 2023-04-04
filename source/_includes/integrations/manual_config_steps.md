{% capture name %}{{ include.name | default: page.title }}{% endcapture %}
{% capture domain %}{{ include.domain | default: page.ha_domain }}{% endcapture %}


{% details "Manual configuration steps" %}
{% if include.discovery or page.ha_dhcp or page.ha_homekit or page.ha_ssdp or page.ha_zeroconf or page.ha_mqtt %}
If it wasn't discovered automatically, don't worry! You can set up a
manual integration entry:
{% else %}
If the above My button doesn't work, you can also perform the following steps
manually:
{% endif %}

Use this My button:

{% my config_flow_start badge domain=domain %}, or follow these steps:
- Browse to your Home Assistant instance.
- In the sidebar click on _**{% my config icon %}**_.
- From the configuration menu select: _**{% my integrations %}**_.
{% if page.ha_integration_type == 'helper' %}
- In top of the screen click the tab: _**{% my helpers %}**_.
- In the bottom right, click on the
  _**{% my config_flow_start icon domain=domain title="Create helper" %}**_ button.
{% else %}
- In the bottom right, click on the
  _**{% my config_flow_start icon domain=domain %}**_ button.
{% endif %}
- From the list, search and select _**"{{ name }}"**_.
- Follow the instructions on screen to complete the set up.

{% enddetails %}
