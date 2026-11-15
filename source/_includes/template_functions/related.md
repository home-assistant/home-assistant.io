{% if page.related_functions %}
{% assign all_functions = site.template_functions %}
{% assign has_related = false %}
{% for func_name in page.related_functions %}
  {% assign func = all_functions | where: "function_name", func_name | first %}
  {% if func %}{% assign has_related = true %}{% endif %}
{% endfor %}
{% if has_related %}
## Related template functions

These functions work well alongside this one:

{% for func_name in page.related_functions %}
  {% assign func = all_functions | where: "function_name", func_name | first %}
  {% if func %}
- [{{ func.title }}]({{ func.url }}) - {{ func.description }}
  {% endif %}
{% endfor %}
{% endif %}
{% endif %}
