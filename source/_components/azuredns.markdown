---
layout: page
title: "AzureDNS"
description: "Keep your Azure DNS IP address in sync with your external IP address"
date: 2019-02-23 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: azure.png
ha_category: Network
featured: false
ha_release: 0.90
---

With the `azuredns` component, users can keep their external IPv4 address in sync with an Azure DNS record. To use this component, you need:
- An Azure account & subscription
- An Azure AD App Registration, [which can be configured in the Azure Portal](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#create-an-azure-active-directory-application)
- An Azure DNS Zone with an A-record, [which can be configured in the Azure Portal as well](https://docs.microsoft.com/en-us/azure/dns/dns-getstarted-portal)

You also need to assign the DNS Zone Contributor role to the Azure AD App. You can do this within the record on the Azure AD Portal.

## {% linkable_title Configuration %}

To use the component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
azuredns:
  domain: example.com
  host: hass
  tenant: example.com
  url: 'https://management.azure.com/subscriptions/<YourSubscriptionId>/resourceGroups/<YourResourceGroupName>/providers/Microsoft.Network/dnsZones/<Domain>/A/<host>?api-version=2018-03-01-preview'
  clientid: "0id0fa49-1234-09kd-ufa8-uf8903kf0a23"
  clientsecret: "d89uFDy8fDYbaufdas8fd9dyADFS8yfhsdfh89sd8Ff="
```

{% configuration %}
  domain:
    description: Your domain name (example.com).
    required: true
    type: string
  host:
    description: The host part or "subdomain" part you want to update.
    required: false
    type: string
  tenant:
    description: The domain name of your Azure Tenant (example.com).
    required: true
    type: string
  clientid:
    description: The client ID of your Azure AD App.
    required: true
    type: string
  clientsecret:
    description: The client secret of your Azure AD App.
    required: true
    type: string
{% endconfiguration %}

<p class='note warning'>
This component is not affiliated with Microsoft Azure. 
</p>