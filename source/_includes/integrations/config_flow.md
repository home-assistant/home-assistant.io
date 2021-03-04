{% capture name %}{{ include.name | default: page.title }}{% endcapture %}

## Configuration

Adding {{ name }} to your Home Assistant instance can be done via the user
interface, by taking the following steps:

- Browse to your Home Assistant instance.
- In the sidebar click on _**{% my config icon %}**_.
- From the configuration menu select: _**{% my integrations icon %}**_.

{% if include.discovery or page.ha_dhcp or page.ha_homekit or page.ha_ssdp or page.ha_zeroconf %}
{{ name }} can be auto-discovered by Home Assistant. If an instance was found,
it will be shown in the top of the list of integrations as _"Discovered"_.
If that is the case click on the _**Configure**_ button to start setting up
the discovered instance.

If there wasn't any discovered automatically, don't worry! You can set up a
manual integration entry:
{% endif %}

- In the bottom right, click on the
  _**{% my config_flow_start icon domain=page.ha_domain %}**_ button.
- From the list, search and select _**"{{ name }}"**_.
- Follow the instruction on screen to complete the set up.

After completing, the {{ name }} integration will be immediately available for use.
