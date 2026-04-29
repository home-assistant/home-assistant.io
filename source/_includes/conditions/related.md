{% if page.related_conditions %}
{% assign all_conditions = site.conditions %}
{% assign has_related = false %}
{% for condition_name in page.related_conditions %}
  {% assign cnd = all_conditions | where: "condition", condition_name | first %}
  {% if cnd %}{% assign has_related = true %}{% endif %}
{% endfor %}
{% if has_related %}
## Related conditions

These conditions work well alongside this one:

{% for condition_name in page.related_conditions %}
  {% assign cnd = all_conditions | where: "condition", condition_name | first %}
  {% if cnd %}
- [{{ cnd.title }}]({{ cnd.url }}): {{ cnd.description }}
  {% endif %}
{% endfor %}
{% endif %}
{% endif %}
