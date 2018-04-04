---
layout: page
title: "IBM Watson IoT Platform"
description: "Record events in the IBM Watson IoT Platform."
date: 2018-04-03 22:09
sidebar: true
comments: false
sharing: true
footer: true
ha_category: History
ha_release: 0.67
---

The `watson_iot` component enables you to link the devices in home-assistant
with an [IBM Watson IoT Platform instance](https://www.ibm.com/us-en/marketplace/internet-of-things-cloud).

## {% linkable_title Configuration %}

To use this component, you first need to register a gateway device type and then
a gateway device in your IoT platform instance. For instructions on how to do
this check the [official documentation](https://console.bluemix.net/docs/services/IoT/gateways/dashboard.html#IoT_connectGateway)
which provides the details on doing this. After you register the gateway device
for your home-assistant you'll need 5 pieces of information:
 - Organization ID
 - Gateway device Type
 - Gateway device ID
 - Authentication Token

With this basic information you can configure the component:

```yaml
# Example configuration.yaml entry:
watson_iot:
  organization: 'organization_id'
  type: 'device_type'
  id: 'device_id'
  token: 'auth_token'
```

Configuration variables:

- **organization** (*Required*): The Organization ID for your Watson IoT Platform instance
- **type** (*Required*): The device type for the gateway device to use
- **id** (*Required*): The device id for the gateway device to use
- **token** (*Required*): The authentication token for the gateway device
- **exclude** (*Optional*): Configure which components should be excluded from recording to Watson IoT Platform.
  - **entities** (*Optional*): The list of entity ids to be excluded from recording to Watson IoT Platform.
  - **domains** (*Optional*): The list of domains to be excluded from recording to Watson IoT Platform.
- **include** (*Optional*): Configure which components should be included in recordings to Watson IoT Platform. If set, all other entities will not be recorded to Watson IoT Platform. Values set by the **blacklist** option will prevail.
  - **entities** (*Optional*): The list of entity ids to be included from recordings to Watson IoT Platform.
  - **domains** (*Optional*): The list of domains to be included from recordings to Watson IoT Platform.

## {% linkable_title Examples %}

### {% linkable_title Full configuration %}

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
