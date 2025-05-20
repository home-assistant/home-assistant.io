---
title: Paperless-ngx
description: Instructions on how to integrate Paperless-ngx into Home Assistant
ha_release: 2025.7
ha_category:
  - Sensor
ha_iot_class: Local Pull
ha_config_flow: true
ha_domain: paperless_ngx
ha_codeowners:
  - '@fvgarrel'
ha_integration_type: service
ha_quality_scale: bronze
related:
  - url: https://docs.paperless-ngx.com/
    title: Paperless-ngx
---

The **Paperless-ngx** {% term integration %} allows you to connect your [Paperless-ngx](https://docs.paperless-ngx.com/) instance to Home Assistant and monitor its status and activity.

## Prerequisites

To ensure full functionality of this integration, you must have **read permissions** for all document-related resources, including documents, tags, document types, and correspondents.

To enable monitoring of diagnostic sensors, you must have **administrator permissions**. Without administrator rights, specific API endpoints cannot be accessed, and the sensor states will not be available.

{% details "Create an access token" %}

1. Log in to your **Paperless-ngx** instance.
2. In the upper-right corner, select your profile icon.
3. Select **My Profile**.
4. Under **API Auth Token**, select the right **Refresh** button next to the textbox to generate a new token. Confirm with **yes**.
5. Copy the token and use it during the integration setup in Home Assistant.

{% enddetails %}


{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The host to connect to"
API key:
  description: "The API key for the Paperless-ngx user."
{% endconfiguration_basic %}

## Sensors

This integration provides {% term sensors %} for the following information from Paperless-ngx:

| Sensor       | Description                                                              |
| ------------ | ------------------------------------------------------------------------ |
| **Firmware** | Displays the installed and latest version of the Paperless-ngx instance. |


## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
