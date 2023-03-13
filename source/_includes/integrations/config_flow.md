{% capture name %}{{ include.name | default: page.title }}{% endcapture %}
{% capture domain %}{{ include.domain | default: page.ha_domain }}{% endcapture %}

## Configuration

Adding {{ name }} to your Home Assistant instance can be done via the user
interface, by using this My button:

{% my config_flow_start badge domain=domain %}

{% if include.discovery or page.ha_dhcp or page.ha_homekit or page.ha_ssdp or page.ha_zeroconf or page.ha_mqtt %}
{{ name }} can be auto-discovered by Home Assistant. If an instance was found,
it will be shown as _"Discovered"_, which you can select to set it up right
away.
{% endif %}

{% details "Manual configuration steps" %}
{% if include.discovery or page.ha_dhcp or page.ha_homekit or page.ha_ssdp or page.ha_zeroconf or page.ha_mqtt %}
If there wasn't any discovered automatically, don't worry! You can set up a
manual integration entry:
{% else %}
If the above My button doesn't work, you can also perform the following steps
manually:
{% endif %}

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
- Follow the instruction on screen to complete the set up.

{% enddetails %}
