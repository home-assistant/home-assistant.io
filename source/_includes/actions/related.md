{% if page.related_actions %}
{% assign all_actions = site.actions %}
{% assign has_related = false %}
{% for action_name in page.related_actions %}
  {% assign act = all_actions | where: "action", action_name | first %}
  {% if act %}{% assign has_related = true %}{% endif %}
{% endfor %}
{% if has_related %}
## Related actions

These actions work well alongside this one:

{% for action_name in page.related_actions %}
  {% assign act = all_actions | where: "action", action_name | first %}
  {% if act %}
- [{{ act.title }}]({{ act.url }}): {{ act.description }}
  {% endif %}
{% endfor %}
{% endif %}
{% endif %}
