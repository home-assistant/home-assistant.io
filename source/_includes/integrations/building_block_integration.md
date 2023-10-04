{% capture name %}{{ include.name | default: page.title }}{% endcapture %}
{% capture domain %}{{ include.domain | default: page.ha_domain }}{% endcapture %}

<div class='note info'>

**Building block integration**

The {{ name | downcase }} integration cannot be directly used. You cannot create your own {{ domain | replace: "_", " " }} entities using this integration. This integration is a building block for other integrations to use, enabling them to create {{ domain | replace: "_", " " }} entities for you.

</div>
