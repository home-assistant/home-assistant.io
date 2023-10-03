{% capture name %}{{ include.name | default: page.title }}{% endcapture %}
{% capture domain %}{{ include.domain | default: page.ha_domain }}{% endcapture %}

**Building block integration**: The {{ name | downcase }} integration cannot be directly used. You cannot create your own {{ domain }} entities using this integration. This integration is a building block for other integrations to use, enabling them to create {{ domain }} entities for you.
