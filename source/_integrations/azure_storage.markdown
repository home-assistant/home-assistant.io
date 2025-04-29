---
title: Azure Storage
description: Instructions on how to setup Azure storage accounts to be used with backups.
ha_release: 2025.3
ha_category:
  - Backup
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: azure_storage
ha_codeowners:
  - '@zweckj'
ha_integration_type: service
ha_quality_scale: bronze
---

This integration allows you to use [Azure storage accounts](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview) for use with Home Assistant Backups.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Storage account name:
  description: "The name of the storage account. Only the name, nothing else."
Container name:
  description: "Blob container name to store the backups. If the container does not exist, it will be created. Defaults to `hass-backups`."
Storage account key:
  description: "One of the two storage account keys. Used to authenticate against the storage account"
{% endconfiguration_basic %}


## Known Limitations

- Only storage accounts that have a default URL `storageaccountname.blob.core.windows.net` are supported at this point
- Since only key based authentication is possible, this has to be enabled in your storage account.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Troubleshooting

{% details "Authentication failure" %}

Check that your storage account allows [`Shared Key` access](https://learn.microsoft.com/en-us/azure/storage/common/shared-key-authorization-prevent?tabs=portal#remediate-authorization-via-shared-key).

{% enddetails %}
