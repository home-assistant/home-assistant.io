device:
  description: "Information about the device this {{ include.item | default: 'entity' }} is a part of, to tie it into the [device registry](https://developers.home-assistant.io/docs/device_registry_index/).{% unless include.unique_id == false %} Only works when [`unique_id`](#unique_id) is set. To link the entity to a part of the device, like an outlet of a power strip, add a [`child_device`](/integrations/mqtt/#child-devices) to the device.{% endunless %} See [MQTT device configuration](/integrations/mqtt/#mqtt-device-configuration) for the device options and how to set them for each configuration method."
  required: {% if include.required %}true{% else %}false{% endif %}
  type: map
