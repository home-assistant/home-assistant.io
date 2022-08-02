{% capture name %}{{ include.name | default: page.title }}{% endcapture %}

Support for devices by {{ name }} in Home Assistant is provided by the
[{{ page.ha_supporting_integration }}](/integrations/{{ page.ha_supporting_domain }})
integration.

{{ name }} devices are either rebranded devices or devices that share a common
communication protocol, making it possible to use them using the
[{{ page.ha_supporting_integration }}](/integrations/{{ page.ha_supporting_domain }})
integration.

{% include integrations/config_flow.md domain=page.ha_supporting_domain %}
