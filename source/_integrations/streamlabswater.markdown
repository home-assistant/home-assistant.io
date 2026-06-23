---
title: StreamLabs
description: Instructions on how to integrate Streamlabs Water devices with Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
ha_release: '0.95'
ha_iot_class: Cloud Polling
ha_domain: streamlabswater
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: service
---

The **StreamLabs** {% term integration %} is used to interact with [StreamLabs water monitoring devices](https://www.streamlabswater.com/) to retrieve usage information and manage the away mode of the device. The [StreamLabs Water API](https://developer.streamlabswater.com) is used to retrieve daily, monthly, and yearly water usage along with the current away mode.

{% important %}
Access to the StreamLabs Water API is not free, you must have a StreamPlus™ subscription level that enables API access. Visit [https://streamlabswater.com/subscription](https://streamlabswater.com/subscription) for more information.
{% endimportant %}

There is currently support for the following device types within Home Assistant:

- Binary sensor
- Sensor

In preparation for using this integration you will need to request an API key following the instructions in the [StreamLabs API Getting Started Section](https://developer.streamlabswater.com/docs/getting-started.html). Be sure to request an API key and not an OAuth token.

{% include integrations/config_flow.md %}

{% include integrations/actions.md %}
