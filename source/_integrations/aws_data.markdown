---
title: AWS Data
description: Description on How an what AWS Data monitors
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
Right now, it's monitoring only [EC2](https://aws.amazon.com/ec2/), [S3](https://aws.amazon.com/S3/), [Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer/).

## Setup

In order to make the `aws_data` integration work you need to set up an access key.
The best way to create the key is going to the console's [IAM](https://us-east-1.console.aws.amazon.com/iam/home) page, creating the appropriate user with minimal permissions for the services, also producing the key is on the created user's page.

**Appropriate permissions for each service:**

- `Account: ListRegions` to produce enabled region list in the account.
- `EC2: DescribeInstances` to produce a list of instances.
- `CloudWatch: GetMetricData` to get EC2 Instance statistics.
- `S3: ListAllMyBuckets` to list all S3 buckets in the account.
- `Cost Explorer: GetCostAndUsage` to view general cost in the account.

**Note:** `CloudWatch` and `Cost Explorer` can accumulate costs with API Inquiry, Please see Documentation on [CloudWatch](https://aws.amazon.com/cloudwatch/pricing/) and [Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer/pricing/).

## Monitoring

Currently, the available metrics in each service are:

- **EC2:**  CPUUtilization, NetworkOut, EBSWriteBytes, EBSReadBytes.
- **S3:** Number Of Objects, Bucket Size.
- **Cost Explorer**: Monthly Cost.

The services are monitored per `Account`(Account Number Can Be found in [IAM](https://us-east-1.console.aws.amazon.com/iam/home) page) and depending on the service it can be monitored per `Region`.
Each Monitor has a default interval retrieving data which can be changes in a configuration file after adding from integration page.

## Configuration

To se tup the integration you should provide the access key and secret, with the correct permissions it should produce your account's region list, choosing a region and a service is required.
Each time you se tup the integration which linked to the same account will add to the existing integration with the current configurations.

### Configuration file

Adding a setting in your {% term "`configuration.yaml`" %} file gives you the ability to filter out or include specific services by the appropriate ids, also the ability to change the interval of the sensors.

```yaml
aws_data:
  filter:
   - name: ec2 | s3 (ce cant be here, general metric)
     account: account id
     id:
      - service id 1
      - service id 2
     reason: Include | Exclude

  interval:
   - name: ec2 | s3 | ce
     seconds: 60
```

Choosing to have a `reason` with the `Include`, unlike `Exclude` which filters out services by id, will make the integration to create sensors only for the ids in the `Include` and will ignore the rest ids for the service. Interval changes the refresh time for the sensor's data per service.
