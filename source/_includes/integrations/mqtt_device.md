device:
  description: "Information about the device this {{ include.item | default: 'entity' }} is a part of, to tie it into the [device registry](https://contributors.home-assistant.io/core/integrations/device-registry/).{% unless include.unique_id == false %} Only works when [`unique_id`](#unique_id) is set.{% endunless %} See [MQTT device configuration](/integrations/mqtt/#mqtt-device-configuration) for the device options and how to set them for each configuration method."
  required: {% if include.required %}true{% else %}false{% endif %}
  type: map
