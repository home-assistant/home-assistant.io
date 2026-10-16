An MQTT {{ include.item }} can be set up in the following ways:
{% if include.subentry %}
- By [adding an MQTT device as a subentry](/integrations/mqtt/#configuration-via-subentries) in the UI.
{%- endif %}
- Through [device discovery](/integrations/mqtt/#device-discovery-payload), as a component with `"platform": "{{ include.platform }}"` (`p`) in the discovery payload of the device.
- Through [single component discovery](/integrations/mqtt/#single-component-discovery-payload), on the discovery topic `<discovery_prefix>/{{ include.platform }}/[<node_id>/]<object_id>/config`.
{%- unless include.yaml == false %}
- [Manually in YAML](/integrations/mqtt/#manual-configured-mqtt-items), by adding the configuration to your {% term "`configuration.yaml`" %} file, as shown in the example below.
{%- endunless %}

The configuration variables below apply to discovery{% unless include.yaml == false %} and YAML{% endunless %}. How the device information is set depends on the configuration method. See [MQTT device configuration](/integrations/mqtt/#mqtt-device-configuration).
{%- unless include.yaml == false %}

{% include integrations/restart_ha_after_config_inclusion.md %}
{%- endunless %}
