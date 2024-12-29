---
title: S3 Backup
description: Instructions on how to setup S3 backup accounts to be used with backups.
ha_release: 2025.2
ha_category:
  - Backup
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: s3backup
ha_codeowners:
  - '@mkohns'
ha_integration_type: service
---

This integration allows you to use S3 compatible storage accounts with Home Assistant Backups.

{% include integrations/config_flow.md %}

{% configuration_basic %}
S3 endpoint URL:
  description: "The http(s) URL of your S3 storage endpoint without bucket name"
Access Key:
  description: "The access key provided by your S3 storage provider"
Secret Key:
  description: "The secret key provided by your S3 storage provider"
Bucket Name:
  description: "The bucket name your credentials have access to"
{% endconfiguration_basic %}


## Known Limitations

- none

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Troubleshooting

{% details "Authentication failure" %}

Make sure your credentials (access key/secret key) have read/write access to your bucket.

{% enddetails %}