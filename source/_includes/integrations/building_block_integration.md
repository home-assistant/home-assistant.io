{% capture name %}{{ include.name | default: page.title }}{% endcapture %}
{% capture domain %}{{ include.domain | default: page.ha_domain }}{% endcapture %}

<div class='note info'>

**Building block integration**

This {{ name | downcase }} building block integration cannot be directly added to your Home Assistant. It is a generic building block that other integrations use to provide {{ domain | replace: "_", " " }} entities for you. The services, actions, and other elements documented here apply to integrations that use this building block. The **Categories** section in the sidebar lists {{ name | downcase }} integration categories that may use this building block.

</div>

