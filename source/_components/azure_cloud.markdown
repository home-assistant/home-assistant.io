---
layout: page
title: "Azure Cloud"
description: "Instructions on how to setup the Azure Cloud component."
date: 2018-08-28 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: microsoft_azure.png
ha_category: Others
featured: true
ha_release: 0.77.1
ha_iot_class: "Hub"
---

[Microsoft Azure](https://azure.microsoft.com) is fast becoming a popular choice as a cloud provider.
 
The `azure_cloud` component is designed to let you interface your Home Assistant host with the Microsoft Azure cloud platform.

To integrate a Microsoft Azure Subscription with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
azure_cloud:
  client_id: 96b9XXXX-XXXX-XXXX-XXXX-XXXXcef0eff8
  client_secret: SECRET-PASSWORD
  tenant_id: 7912XXXX-XXXX-XXXX-XXXX-XXXX69bbace1
  subscription_id: f231XXXX-XXXX-XXXX-XXXX-XXXXa3299dea

```

{% configuration %}
client_id:
  description: The Azure service principal application id.
  required: true
  type: string
client_secret:
  description: The Azure service principal secret.
  required: true
  type: string
tenant_id:
  description: The Azure tenant id for the subscription.
  required: true
  type: string
subscription_id:
  description: The Azure subscription id.
  required: true
  type: string
{% endconfiguration %}


You can create a Service Principal using the following command

```bash
PS Azure:\> az ad sp create-for-rbac --name "hassio-principal" --password "SECRET-PASSWORD"
Retrying role assignment creation: 1/36
{
  "appId": "96b9XXXX-XXXX-XXXX-XXXX-XXXXcef0eff8",
  "displayName": "hassio-principal",
  "name": "http://hassio-principal",
  "password": "SECRET-PASSWORD",
  "tenant": "7912XXXX-XXXX-XXXX-XXXX-XXXX69bbace1"
}
```

