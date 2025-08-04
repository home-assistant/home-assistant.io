---
title: Paperless-ngx
description: Instructions on how to integrate Paperless-ngx into Home Assistant
ha_release: 2025.6
ha_category:
  - Sensor
  - Update
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: paperless_ngx
ha_codeowners:
  - '@fvgarrel'
ha_integration_type: service
ha_quality_scale: silver
related:
  - url: https://docs.paperless-ngx.com/
    title: Paperless-ngx
ha_platforms:
  - diagnostics
  - sensor
  - update
---

The **Paperless-ngx** {% term integration %} allows you to connect your [Paperless-ngx](https://docs.paperless-ngx.com/) instance to Home Assistant and monitor its status and activity.

## Prerequisites

{% important %}
This integration is only fully supported with **Paperless-ngx version 2.15 or later**. Earlier versions are not supported.
{% endimportant %}

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
URL:
  description: "URL to connect to the Paperless-ngx instance."
API key:
  description: "API key to connect to the Paperless-ngx API."
Verify SSL certificate:
  description: "Verify the SSL certificate of the Paperless-ngx instance. Disable this option if you're using a self-signed certificate."
{% endconfiguration_basic %}

## Use cases

The integration can be used to build automations to help and notify you of new documents in your paperless instance.
The update sensor could notify you if a new paperless-ngx version is available.

## Supported functionality

The Paperless-ngx integration provides statistic and diagnostic entities to Home Assistant.
Below is an overview of these entities and their function.

## Sensors

This integration provides {% term sensors %} for the following information from Paperless-ngx:

| Sensor                   | Description                                                                    |
|--------------------------|--------------------------------------------------------------------------------|
| **Correspondents**       | Indicates the total number of defined correspondents.                          |
| **Document types**       | Indicates the total number of defined document types.                          |
| **Documents in inbox**   | Indicates the number of documents currently in the inbox.                      |
| **Tags**                 | Indicates the total number of defined tags                                     |
| **Total characters**     | Indicates the total number of characters extracted from all documents.         |
| **Total documents**      | Indicates the total number of documents stored.                                |
| **Total storage**        | Indicates the total disk space used by Paperless-ngx.                          |
| **Available storage**    | Indicates the remaining available disk space for Paperless-ngx.                |
| **Status database**      | Indicates whether the database is reachable and functioning correctly.         |
| **Status index**         | Indicates whether the document indexing service is operational.                |
| **Status classifier**    | Indicates whether the document classifier service is running properly.         |
| **Status Celery**        | Indicates whether the Celery task queue is active and processing tasks.        |
| **Status Redis**         | Indicates whether the Redis service used for task queuing is available.        |
| **Status sanity**        | Indicates the sanity of the Paperless-ngx documents.                           |
| **Software**             | Indicates whether a new Paperless-ngx update ist available.                    |

## Example automations

{% details "Send a push notification if a new document is available" %}
{% raw %}

```yaml
alias: New document push notification
description: Sends a push notification if a new document is available
triggers:
  - entity_id: sensor.paperless_documents_inbox
    to: null
    trigger: state
conditions:
  - condition: template
    value_template: |
      {% if trigger.from_state is not none and trigger.to_state is not none %}
        {{ trigger.to_state.state > trigger.from_state.state }}
      {% else %}
        false
      {% endif %}
actions:
  - action: notify.mobile_app_iphone
    metadata: {}
    data:
      message: A new document is available.
```

{% endraw %}
{% enddetails %}

## Data updates

This integration retrieves data using a pull-based mechanism.

- **Statistic sensors** are pulled every **120 seconds**  
- **Diagnostic sensors** are pulled every **300 seconds**  
- **Update checks** to detect new Paperless-ngx versions are performed **every 24 hours**

## Known limitations

There are a few known limitations for using the integration:

- This integration is only fully supported with **Paperless-ngx version 2.15 or later**. Earlier versions are not supported.
- To enable monitoring of diagnostic sensors, you must have **administrator permissions**. Without administrator rights, specific API endpoints cannot be accessed, and the sensor states will not be available.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Troubleshooting

{% details "Message: 'Invalid hostname or IP address'" %}

If you get the message **Invalid hostname or IP address**, try the following steps:
1. Make sure you enter a complete URL, such as `https://paperless.example.com` or `https://192.168.178.11:8011`.

2. SSL is enabled by default. If you're using an unencrypted connection, you must explicitly use `http://` instead of `https://` in the URL.

3. If you're using a self-signed certificate, disable the **Verify SSL certificate** option.

{% enddetails %}

{% details "Message: 'The token does not have permission to access the API'" %}

If you get the message **The token does not have permission to access the API**, try the following steps:
1. Verify whether the token is still valid and correctly assigned to the user.

2. Test the token using the Swagger interface available at
`https://paperless.example.com/api/schema/view/`
   - Click on **"Authorize"** in the Swagger UI to enter your token at **tokenAuth (apiKey)**.
   - Then, try accessing the relevant endpoints like `/api/statistics/` to ensure they respond as expected.

3. If everything works correctly in Swagger but the integration still fails, check whether a reverse proxy (e.g., NGINX) is returning an **HTTP 403 error**. If so, the integration may also report this as a permission issue.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
