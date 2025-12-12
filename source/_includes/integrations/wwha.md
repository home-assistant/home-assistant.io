{% capture name %}{{ include.name | default: page.title }}{% endcapture %}
{% capture url %}{{ include.url }}{% endcapture %}

{% for type in page.works_with %}
  {% case type %}
    {% when "zwave" %}{% assign formatted_type = "Z-Wave" %}
    {% when "zigbee" %}{% assign formatted_type = "Zigbee" %}
    {% when "matter" %}{% assign formatted_type = "Matter" %}
    {% else %}{% assign formatted_type = type | capitalize %}
  {% endcase %}
  {% if forloop.first %}
    {% assign formatted_types = formatted_type %}
  {% elsif forloop.last %}
    {% assign formatted_types = formatted_types | append: " and " | append: formatted_type %}
  {% else %}
    {% assign formatted_types = formatted_types | append: ", " | append: formatted_type %}
  {% endif %}
{% endfor %}

{% if url and url != "" %}[{{ name }}]({{ url }}){% else %}{{ name }}{% endif %} is a member of the Works with Home Assistant partner program for their {{ formatted_types }} products. {{ name }} is committed to making sure their products are up-to-date and ready to use in Home Assistant.

{% if page.works_with contains "zwave" %}
  {{ name }} Z-Wave devices work locally and integrate seamlessly with the Z-Wave integration in Home Assistant (Z-Wave stick required). As all connectivity is happening locally, status updates and controlling your devices happen instantly in Home Assistant.

  {% my add_zwave_device badge domain=page.ha_domain %}

  [Learn more about Z-Wave in Home Assistant.](/integrations/zwave_js/)

{% endif %}

{% if page.works_with contains "zigbee" %}
  {{ name }} Zigbee devices work locally and integrate seamlessly with the Zigbee integration in Home Assistant (Zigbee stick required). As all connectivity is happening locally, status updates and controlling your devices happen instantly in Home Assistant.

  {% my add_zigbee_device badge brand=page.ha_domain %}

  [Learn more about Zigbee in Home Assistant.](/integrations/zha/)

{% endif %}

{% if page.works_with contains "matter" %}
  {{ name }} Matter devices work locally and integrate seamlessly with the Matter integration in Home Assistant. As all connectivity is happening locally, status updates and controlling your devices happen instantly in Home Assistant.

  {% my add_matter_device badge domain=page.ha_domain %}

  [Learn more about Matter in Home Assistant.](/integrations/matter/)
{% endif %}
