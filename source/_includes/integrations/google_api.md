{% capture name %}{{ include.name | default: page.title }}{% endcapture %}
{% capture domain %}{{ include.domain | default: page.ha_domain }}{% endcapture %}
{% capture google_dev_console_link %}{{ include.google_dev_console_link | default: page.google_dev_console_link }}{% endcapture %}
{% capture api %}{{ include.api | default: page.api }}{% endcapture %}
{% capture api_link %}{{ include.api_link | default: page.api_link }}{% endcapture %}


1. Go the Google Developers Console [{{ api }}]({{ api_link }}) {% if page.api2 %} and [{{ page.api2 }}]({{ page.api2_link }}) {% endif %}.
2. Confirm the project and **Enable** the API.
