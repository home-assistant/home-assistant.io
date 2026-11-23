{% comment %}
Reusable "Good to know" bullet for entity conditions with the Any/All behavior.
Explains how unavailable and unknown targets are handled.

Parameters:
  entities  Plural name of the targeted entities, in lowercase. For example: "lights".
            Default: "entities".
{% endcomment %}
{%- assign entities = include.entities | default: "entities" -%}
- {{ entities | capitalize }} that are `unavailable` or `unknown` are skipped. With **Any**, the condition passes if at least one of the other targeted {{ entities }} matches. With **All**, it passes if all the other targeted {{ entities }} match. If all targeted {{ entities }} are `unavailable` or `unknown`, **All** passes and **Any** fails.
{%- comment %} Strips the final newline, so the bullet stays part of the surrounding list. {% endcomment -%}
