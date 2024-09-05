---
title: AWS Data
description: Learn how to monitor AWS services like EC2, S3, and Cost Explorer using the aws_data integration.
ha_category:
  - Sensor
ha_iot_class: Cloud Pull
ha_release: '2024.09'
ha_domain: aws_data
ha_platforms:
  - Sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `aws_data` gives you an option to monitor services inside your [Amazon Web Services](https://aws.amazon.com/) account.
The `aws_data` integration currently monitors  [EC2](https://aws.amazon.com/ec2/), [S3](https://aws.amazon.com/S3/), [Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer/).

## Setup

To set up the `aws_data` integration, you need an access key.
The best way to create the key is going to the console's [IAM](https://us-east-1.console.aws.amazon.com/iam/home) page, creating the appropriate user with minimal permissions for the services, also producing the key is on the created user's page.

**Appropriate permissions for each service:**

- `Account: ListRegions` to produce enabled region list in the account.
- `EC2: DescribeInstances` to produce a list of instances.
- `CloudWatch: GetMetricData` to get EC2 Instance statistics.
- `S3: ListAllMyBuckets` to list all S3 buckets in the account.
- `Cost Explorer: GetCostAndUsage` to view general cost in the account.

> **Important:** `CloudWatch` and `Cost Explorer` can accumulate costs with API Inquiry, Please see Documentation on [CloudWatch](https://aws.amazon.com/cloudwatch/pricing/) and [Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer/pricing/).

## Monitoring

Currently, the available metrics in each service are:

- **EC2:**  CPUUtilization, NetworkOut, EBSWriteBytes, EBSReadBytes.
- **S3:** Number Of Objects, Bucket Size.
- **Cost Explorer**: Monthly Cost.

The services are monitored per `Account`(Account Number Can Be found in [IAM](https://us-east-1.console.aws.amazon.com/iam/home) page) and depending on the service it can be monitored per `Region`.
Each Monitor has a default interval retrieving data which can be changes in a configuration file after adding from integration page.

## Configuration

To set up the integration, you should provide the access key and secret. With the correct permissions, it should produce your account's region list. Choosing a region and a service is required. Each time you set up the integration linked to the same account, it will add to the existing integration with the current configurations.

### Configuration file

Adding a setting in your {% term "`configuration.yaml`" %} file gives you the ability to filter out or include specific services by the appropriate ids, also the ability to change the interval of the sensors.

```yaml
aws_data:
  filter:
   - name: ec2 | s3 (ce cant be here, it's a general metric)
     account: account id
     id:
      - service id 1
      - service id 2
     reason: Include | Exclude

  interval:
   - name: ec2 | s3 | ce
     seconds: 60
```

The `filter` parameter, let's you choose the services you want to monitor or exclude. Each `name` mentioned in the `filter` only corresponds to relevant service. The `reason` gives the option to `Include` or `Exclude` a service found during the integration set up. While `Exclude` removes an `id`, `Include` will monitor only the `id` found in the integration.
