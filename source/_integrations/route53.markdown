---
title: AWS Route53
description: Automatically update your AWS Route53 DNS records.
ha_category:
  - Network
ha_iot_class: Cloud Push
ha_release: 0.81
ha_domain: route53
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

With the `route53` {% term integration %} can you keep your AWS Route53 DNS records up to date.

The integration will run every hour, but can also be started manually by using the `route53.update_records` action.

Please note that this platform uses the API from [ipify.org](https://www.ipify.org/) to set the public IP address.

## Setup

You will need to configure your AWS Account with a suitable IAM policy and API keys for this to function.

If you are familiar with this process, you can skip the next section and head directly to the configuration section.

On the AWS side, you need to do the following;

1. Create a suitable zone for a domain that you own and manage in Route53, the domain `home.yourdomain.com` is used as an example.

2. Once created, write down the Hosted Zone ID value for the domain. This is needed for the plugin and IAM configuration.

3. Create an IAM Policy that provides update and query access to this domain explicitly and has no other permissions to the AWS account.

Here is an IAM Policy sample, don't forget to update your Zone ID on the Resource line.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "route53:GetHostedZone",
                "route53:ChangeResourceRecordSets",
                "route53:ListResourceRecordSets"
            ],
            "Resource": "arn:aws:route53:::hostedzone/YOURZONEIDGOESHERE"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": "route53:TestDNSAnswer",
            "Resource": "*"
        }
    ]
}
```

4. Once this has been done, create a new user called `homeassistant` and add the IAM policy to the user, allowing it to manage this DNS resource.

5. Under the security credentials tab for the `homeassistant` user, create a set of access keys for placement in the integration definition YAML.

## Configuration

To use the {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
route53:
  aws_access_key_id: ABC123
  aws_secret_access_key: DEF456
  zone: ZONEID678
  domain: yourdomain.com
  records:
    - vpn
    - hassio
    - home
```

{% configuration route53 %}
aws_access_key_id:
  description: The AWS access key ID for the account that has IAM access to the domain.
  required: true
  type: string
aws_secret_access_key:
  description: The AWS secret access key for the account that has IAM access to the domain.
  required: true
  type: string
zone:
  description: The AWS zone ID for the domain in Route53.
  required: true
  type: string
domain:
  description: The domain name for the domain in Route53.
  required: true
  type: string
records:
  description: A list of records you want to update. Use `.` to update the default record ie. *yourdomain.com*.
  required: true
  type: list
ttl:
  description: The TTL value for the DNS records.
  required: false
  type: integer
  default: 300
{% endconfiguration %}

## Actions

### Action `route53.update_records`

Use this action to manually trigger an update of the DNS records.
