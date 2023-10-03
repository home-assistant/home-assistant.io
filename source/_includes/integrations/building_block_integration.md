{% capture name %}{{ include.name | default: page.title }}{% endcapture %}

**Building block integration**: The {{ name | downcase }} integration cannot be directly used. You cannot create your own {{ name | downcase }} entities using this integration. This integration is a building block for other integrations to use, enabling them to create event entities for you.
