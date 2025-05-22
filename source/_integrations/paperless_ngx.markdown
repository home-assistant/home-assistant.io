---
title: Paperless-ngx
description: Instructions on how to integrate Paperless-ngx into Home Assistant
ha_release: 2025.6
ha_category:
  - Sensor
ha_iot_class: Local Polling
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

{% details "Create an access token" %}

1. Log in to your **Paperless-ngx** instance.
2. In the upper-right corner, select your profile icon.
3. Select **My Profile**.
4. Under **API Auth Token**, select the right **Refresh** button next to the textbox to generate a new token. Confirm with **yes**.
5. Copy the token and use it during the integration setup in Home Assistant.

{% enddetails %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: "URL to connect to the Paperless-ngx instance."
API key:
  description: "API key to connect to the Paperless-ngx API."
{% endconfiguration_basic %}

## Sensors

This integration provides {% term sensors %} for the following information from Paperless-ngx:

| Sensor                   | Description                                                              |
|--------------------------|--------------------------------------------------------------------------|
| **Correspondents**       | Indicates the total number of defined correspondents.                    |
| **Document types**       | Indicates the total number of defined document types.                    |
| **Documents in inbox**   | Indicates the number of documents currently in the inbox.                |
| **Tags**                 | Indicates the total number of defined tags                               |
| **Total characters**     | Indicates the total number of characters extracted from all documents.   |
| **Total documents**      | Indicates the total number of documents stored.                          |


## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
