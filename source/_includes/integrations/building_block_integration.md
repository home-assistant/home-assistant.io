{% capture name %}{{ include.name | default: page.title }}{% endcapture %}
{% capture domain %}{{ include.domain | default: page.ha_domain }}{% endcapture %}

<div class='note info'>

**Building block integration**

The {{ name | downcase }} integration cannot be directly used to create entities. This integration is a building block for other integrations to use, enabling them to create {{ domain | replace: "_", " " }} entities for you. See the integration list category in the sidebar to see all {{ name | downcase }} integrations built from it that you can use. The automation triggers, services, and other information here can be used with all of these integrations if their entities support them, and some integrations add additional functionality.

</div>
