---
title: AWS S3
description: Instructions on how to setup AWS S3 bucket to be used as a backup location.
ha_release: 2025.5
ha_category:
  - Backup
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: aws_s3
ha_codeowners:
  - '@tomasbedrich'
ha_integration_type: service
ha_quality_scale: bronze
---

The **AWS S3** {% term integrations %} allows you to use [AWS S3](https://aws.amazon.com/s3/) bucket with Home Assistant Backups.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Access Key ID:
  description: "The access key ID for your AWS S3 account."
Secret Access Key:
  description: "The secret access key for your AWS S3 account."
Bucket Name:
  description: "S3 bucket name to store the backups. Bucket must already exist and be writable by the provided credentials."
Prefix:
  description: Prefix to use for the backup keys in the bucket. This is optional.⚠️ Be sure to use a unique, non-overlapping prefix to avoid issues with backup assignment. See [known limitation](#assignment-of-backups-to-home-assistant-instances-and-config-entries).
  default: ""
Endpoint URL:
  description: "Endpoint URL provided to [Boto3 Session](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html). Region-specific [AWS S3 endpoints](https://docs.aws.amazon.com/general/latest/gr/s3.html) are available in their documentation. Defaults to `https://s3.eu-central-1.amazonaws.com/`."
{% endconfiguration_basic %}

## Known limitations

The AWS S3 integration has the following limitations:

### Assignment of backups to Home Assistant instances and config entries

#### ❗ The Problem

S3 uses prefix-based paths to organize objects, but it does not enforce true directory structures. If multiple configurations use the same bucket without a prefix, or use overlapping prefixes such as:

- `homeassistant/prod/`
- `homeassistant/test/`
- `homeassistant/`

This causes two issues:

##### Across Instances

When different Home Assistant instances use overlapping prefixes in the same S3 bucket, backups may be incorrectly shown in the wrong instance’s UI.

Example:

- Instance A uses the prefix `homeassistant/prod/`  
- Instance B uses the prefix `homeassistant/`

Since `homeassistant/` includes all sub-prefixes like `prod/` and `test/`, Instance B will also see the backups created by Instance A. As a result, backups from multiple instances may appear mixed together — even though they were stored in their correct locations.

##### Within a Single Instance

When multiple S3 configuration entries are defined in the same Home Assistant instance, overlapping prefixes make it difficult to accurately assign backups to the correct configuration in the UI.

Example:

- One S3 config uses `homeassistant/`  
- Another uses `homeassistant/test/`

Because `homeassistant/` includes everything under it (including `test/`), Home Assistant may incorrectly associate backups stored under `homeassistant/test/` with the `homeassistant/` config. This leads to backups being shown under the wrong config entry in the UI. The backups are still stored in the correct S3 location — this is purely a display/assignment issue in the UI.

#### ✅ Recommended Solution

To avoid cross-listing of backups, use **unique, non-overlapping prefixes** for each instance.

Correct usage:

- `homeassistant/prod/`
- `homeassistant/test/`
- `homeassistant/dev/`

Avoid using generic prefixes like `homeassistant/` unless that is your only backup location.
This ensures that each Home Assistant instance only sees its own backups, and not those from other environments or configurations.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
