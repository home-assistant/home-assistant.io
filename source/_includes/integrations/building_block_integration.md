{% capture name %}{{ include.name | default: page.title }}{% endcapture %}
{% capture domain %}{{ include.domain | default: page.ha_domain }}{% endcapture %}

<div class='note info'>

**Building block integration**

This {{ name | downcase }} building block integration cannot be directly added to your Home Assistant. It is a generic building block that other integrations use to create {{ domain | replace: "_", " " }} entities for you. See the "category" links in the sidebar to see all {{ name | downcase }} integrations built from it that you can use. The automation triggers, actions, and other information on this page can be used with all of those integrations whose entities support them, and some integrations add extra functionality.

</div>
