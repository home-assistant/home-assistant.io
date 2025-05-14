---
title: Paperless-ngx
description: Instructions on how to setup the Paperless-ngx integration
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

To ensure full functionality of this integration, the user must have **read permissions** for all document-related resources, including documents, tags, document types, and correspondents.

To enable monitoring of diagnostic sensors, the user must have **admin permissions**. Without admin rights, specific API endpoints cannot be accessed, and the sensor states will not be available.

{% details "Create an access token" %}

1. Log in to your **Paperless-ngx** instance.
2. Click on your profile icon in the upper-right corner.
3. Select **My Profile**.
4. Under **API Auth Token**, click the right **Refresh** button next to the textbox to generate a new token. Confirm with **yes**.
5. Copy the token and use it during the integration setup in Home Assistant.

{% enddetails %}


{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The host to connect to"
Access token:
  description: "The access token for Paperless-ngx user."
{% endconfiguration_basic %}

## Sensors

This integration provides {% term sensors %} for the following information from Paperless-ngx:

- Number of documents
- Number of document with inbox tags
- Status of the database with errors
- Status of Redis with errors
- Status of Celery
- Status of classifier with errors
- Status of index with errors
- Storage Total
- Storage Available

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
