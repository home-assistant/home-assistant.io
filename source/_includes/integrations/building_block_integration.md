{% capture name %}{{ include.name | default: page.title }}{% endcapture %}
{% capture domain %}{{ include.domain | default: page.ha_domain }}{% endcapture %}

{% note %}

**Building block integration**

This {{ name | downcase }} is a building block integration that cannot be added to your Home Assistant directly but is used and provided by other integrations.

A building block integration differs from the typical integration that connects to a device or service. Instead, other integrations that do integrate a device or service into Home Assistant use this {{ name | downcase }} building block to provide entities, services, and other functionality that you can use in your automations or dashboards.

If one of your integrations features this building block, this page documents the functionality the {{ name | downcase }} building block offers.

{% endnote %}

