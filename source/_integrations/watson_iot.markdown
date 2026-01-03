---
title: IBM Watson IoT Platform
description: Record events in the IBM Watson IoT Platform.
ha_category:
  - History
ha_release: 0.72
ha_domain: watson_iot
ha_iot_class: Cloud Push
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **IBM Watson IoT Platform** {% term integration %} enables you to link the devices in Home Assistant
with an [IBM Watson IoT Platform instance](https://www.ibm.com/us-en/marketplace/internet-of-things-cloud).

## Configuration

To use this {% term integration %}, you first need to register a gateway device type and then
a gateway device in your IoT platform instance. For instructions on how to do
this check the [official documentation](https://cloud.ibm.com/docs/services/IoT?topic=iot-platform-getting-started#IoT_connectGateway)
which provides the details on doing this. After you register the gateway device
for your Home Assistant instance you'll need four pieces of information:

- Organization ID
- Gateway device Type
- Gateway device ID
- Authentication Token

With this basic information you can add the {% term integration %} to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry:
watson_iot:
  organization: "organization_id"
  type: "device_type"
  id: "device_id"
  token: "auth_token"
```

{% configuration %}
organization:
  description: The Organization ID for your Watson IoT Platform instance.
  required: true
  type: string
type:
  description: The device type for the gateway device to use.
  required: true
  type: string
id:
  description: The device id for the gateway device to use.
  required: true
  type: string
token:
  description: The authentication token for the gateway device.
  required: true
  type: string
exclude:
  description: Configure which integrations should be excluded from recording to Watson IoT Platform.
  required: false
  type: map
  keys:
    entities:
      description: The list of entity ids to be excluded from recording to Watson IoT Platform.
      required: false
      type: list
    domains:
      description: The list of domains to be excluded from recording to Watson IoT Platform.
      required: false
      type: list
include:
  description: Configure which integrations should be included in recordings to Watson IoT Platform. If set, all other entities will not be recorded to Watson IoT Platform. Values set by the **exclude** option will prevail.
  required: false
  type: map
  keys:
    entities:
      description: The list of entity ids to be included from recordings to Watson IoT Platform.
      required: false
      type: list
    domains:
      description: The list of domains to be included from recordings to Watson IoT Platform.
      required: false
      type: list
{% endconfiguration %}

## Examples

### Full configuration

```yaml
watson_iot:

  exclude:
    entities:
       - entity.id1
       - entity.id2
    domains:
       - automation
  include:
    entities:
       - entity.id3
       - entity.id4
```
