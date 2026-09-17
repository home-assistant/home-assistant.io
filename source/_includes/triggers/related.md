{% if page.related_triggers %}
{% assign all_triggers = site.triggers %}
{% assign has_related = false %}
{% for trigger_name in page.related_triggers %}
  {% assign trg = all_triggers | where: "trigger", trigger_name | first %}
  {% if trg %}{% assign has_related = true %}{% endif %}
{% endfor %}
{% if has_related %}
## Related triggers

These triggers work well alongside this one:

{% for trigger_name in page.related_triggers %}
  {% assign trg = all_triggers | where: "trigger", trigger_name | first %}
  {% if trg %}
- [{{ trg.title }}]({{ trg.url }}): {{ trg.description }}
  {% endif %}
{% endfor %}
{% endif %}
{% endif %}
