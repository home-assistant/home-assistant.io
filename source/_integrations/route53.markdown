---
title: AWS Route53
description: Keep your AWS Route53 DNS records in sync with your public IP address.
ha_category:
  - Network
ha_iot_class: Cloud Polling
ha_release: 0.81
ha_domain: route53
ha_integration_type: integration
ha_quality_scale: legacy
ha_config_flow: true
---

The **AWS Route53** {% term integration %} keeps DNS records in your AWS Route53 hosted zone pointed at your current public IP address, acting as a dynamic DNS updater.

The integration will run every hour, but can also be started manually by using the `route53.update_records` action.

This platform uses the API from [ipify.org](https://www.ipify.org/) to set the public IP address.

## Setup

You will need to configure your AWS Account with a suitable IAM policy and API keys for this to function.

If you are familiar with this process, you can skip the next section and head directly to the configuration section.

On the AWS side, you need to do the following;

1. Create a suitable zone for a domain that you own and manage in Route53, the domain `home.yourdomain.com` is used as an example.

2. Once created, write down the Hosted Zone ID value for the domain. This is needed for the plugin and IAM configuration.

3. Create an IAM policy that only grants what the integration actually uses: permission to look up the hosted zone during setup, and permission to upsert `A` records within that zone.

Here is an IAM policy sample, don't forget to update your Zone ID on the Resource lines.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowGetHostedZone",
            "Effect": "Allow",
            "Action": "route53:GetHostedZone",
            "Resource": "arn:aws:route53:::hostedzone/YOURZONEIDGOESHERE"
        },
        {
            "Sid": "AllowUpsertARecords",
            "Effect": "Allow",
            "Action": "route53:ChangeResourceRecordSets",
            "Resource": "arn:aws:route53:::hostedzone/YOURZONEIDGOESHERE",
            "Condition": {
                "ForAllValues:StringEquals": {
                    "route53:ChangeResourceRecordSetsActions": ["UPSERT"],
                    "route53:ChangeResourceRecordSetsRecordTypes": ["A"]
                }
            }
        }
    ]
}
```

{% note %}
Older versions of this sample policy also granted `route53:ListResourceRecordSets` and `route53:TestDNSAnswer`. The integration doesn't call either of these, so they've been dropped in favor of the narrower policy above.
{% endnote %}

4. Once this has been done, create a new user called `homeassistant` and add the IAM policy to the user, allowing it to manage this DNS resource. Don't set up console access or a password for this user; it only needs programmatic access.

5. Under the security credentials tab for the `homeassistant` user, create a set of access keys to enter during setup of the integration. AWS generally recommends using short-lived credentials via an IAM role instead of a long-term access key, but that isn't an option for an application running outside AWS like Home Assistant; this is one of the cases where a dedicated IAM user with an access key is the accepted pattern. Treat the key as a secret, and periodically check the user's [access key last used information](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) to confirm it's still only being used the way you expect, rotating it if you ever suspect it's been exposed.

## Configuration

{% include integrations/config_flow.md %}

You will be asked for the following information during setup:

- **AWS Access Key ID** and **AWS Secret Access Key**: The access keys for the `homeassistant` IAM user created above.
- **Zone**: The Hosted Zone ID for the domain in Route53.
- **Domain**: The domain name you want to update, for example `home.yourdomain.com`.
- **Records**: One or more records to update. Use `.` to update the domain itself instead of a subdomain.
- **TTL**: The TTL, in seconds, to use for the DNS records. Defaults to 300 seconds.

## Migrating from YAML configuration

{% warning %}
YAML configuration for AWS Route53 is deprecated and will be removed in a future release.
{% endwarning %}

If you previously configured AWS Route53 using YAML in your `configuration.yaml` file, your configuration is automatically imported into the UI. To complete the migration:

1. Remove the `route53` configuration from your `configuration.yaml` file.
2. Restart Home Assistant.

The integration will continue to work using the imported configuration. If the import fails, for example because of invalid AWS credentials, Home Assistant creates a repair issue guiding you to set up the integration manually.

{% include integrations/actions.md %}

## Known limitations

The integration only manages IPv4 `A` records. The public address is looked up over IPv4, and record changes are always submitted as `A` records, so `AAAA` records for IPv6 addresses are neither created nor updated.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
