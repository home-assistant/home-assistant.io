---
title: Azure Data Explorer
description: Setup for Azure Data Explorer integration
ha_category:
  - History
ha_release: 2024.6
ha_config_flow: true
ha_iot_class: Cloud Push
ha_codeowners:
  - '@kaareseras'
ha_domain: azure_data_explorer
related:
  - docs: /docs/configuration/
ha_integration_type: integration
---

[Azure Data Explorer](https://azure.microsoft.com/en-us/services/data-explorer/) is a high-performance time-series database, query engine, and dashboarding tool. The Home Assistant **Azure Data Explorer** {% term integration %} allows you to hook into the Home Assistant event bus and forward events to Azure Data Explorer for analytics and dashboarding. From here, data can be viewed in building dashboards, PowerBi, and Grafana, among others.

## Prerequisites

Before you can add Azure Data Explorer to Home Assistant, you need to set up an Azure account, create a Service Principal, create a cluster, and add a database.

### Creating a free Azure account

Create a [free Azure account](https://azure.microsoft.com/). You will be asked for credit card information, but all resources created here are free.

### Creating a Service Principal (App registration)

For Home Assistant to authenticate with Azure Data Explorer, it needs a *Service Principal*.
1. To create a Service Principal, follow the guide on [Creating Microsoft Entra application registration](https://docs.microsoft.com/en-us/azure/data-explorer/provision-azure-ad-app), steps 1-7.
2. Copy values for later use:
   - Application (client) ID: From App registration overview
   - Directory (tenant) ID: From App registration overview
   - Secret value: From when the secret was created in step 1.7

### Creating a Free Azure Data Explorer cluster and database

There are two ways of creating an Azure Data Explorer Cluster: **Pay as you go (PAYG)** or **Free**.
To create a paid cluster, follow the instructions from the [Microsoft Quickstart Guide](https://docs.microsoft.com/en-us/azure/data-explorer/create-cluster-database-portal). 
However, Microsoft has released a free offer, and this guide describes how to set up a free Azure Data Explorer Cluster and database:

There are a few differences between the **PAYG** and **Free** versions:

| Feature         | PAYG cluster           | Free cluster                    |
| --------------- | ---------------------- | ------------------------------- |
| Ingestion       | Streaming and queueing | Queueing only (for now)         |
| Cluster size    | Fully scalable         | 4 vCPU, 8 GB Memory, ~100 GB data |

1. Go to [aka.ms/kustofree](https://aka.ms/kustofree).
2. Go to **My Cluster**.
3. Select **Create Cluster**.
4. Name the cluster and database.
5. Copy the **database name** for later use.
6. Check the **Terms and Conditions** (after reading them) and select **Create Cluster**.
   - Within a minute, you will have an Azure Data Explorer cluster ready.
7. After the database has been created, copy the **Data ingestion URI** from the top of the page.

### Creating an Azure data table

1. Go to [aka.ms/kustofree](https://aka.ms/kustofree).
2. Go to **Query**.
3. Write and perform the following statements one by one, replacing the placeholder content between the <> with the copied values (including the brackets).

```KQL
// Give the Service Pricipal write access to the database
.add database ['<databasename>'] ingestors ('aadapp=<ApplicationID>;<DirectoryID>');

// Give the Service Pricipal read access to database (used for connectivity checks) 
.add database ['<databasename>'] viewers ('aadapp=<ApplicationID>;<DirectoryID>');

// Create a table for the data to be ingested into (replace the name and copy inserted *name* for later use)
.create table ['<name_to_be_replaced>'] (entity_id: string, state: string, attributes: dynamic, last_changed: datetime, last_updated: datetime, context: dynamic)

// Creat a mapping from the incoming JSON to the table and columns just created (replace the name with the table name from the previous step)
.create table ['<name_to_be_replaced>'] ingestion json mapping 'ha_json_mapping' '[{"column":"entity_id","path":"$.entity_id"},{"column":"state","path":"$.state"},{"column":"attributes","path":"$.attributes"},{"column":"last_changed","path":"$.last_canged"},{"column":"last_updated","path":"$.last_updated"},{"column":"context","path":"$.context"}]'
```

This is an example with a free cluster for reference:

```KQL
.add database ['HomeAssistant'] ingestors ('aadapp=b5253d02-c8f4-1234-a0f0-818491ba2a1f;72f123bf-86f1-41af-91ab-2d7cd011db93');

.add database ['HomeAssistant'] viewers ('aadapp=b5253d02-c8f4-1234-a0f0-818491ba2a1f;72f123bf-86f1-41af-91ab-2d7cd011db93');

.create table ['raw'] (entity_id: string, state: string, attributes: dynamic, last_changed: datetime, last_updated: datetime, context: dynamic)

.create table ['raw'] ingestion json mapping 'ha_json_mapping' '[{"column":"entity_id","path":"$.entity_id"},{"column":"state","path":"$.state"},{"column":"attributes","path":"$.attributes"},{"column":"last_changed","path":"$.last_canged"},{"column":"last_updated","path":"$.last_updated"},{"column":"context","path":"$.context"}]'
```

{% include integrations/config_flow.md %}

If using a free cluster, check the **Use Queueing client** in the form.

After the flow has been completed, Home Assistant sends data to Azure Data Explorer. 

By default, Home Assistant buffers for 5 seconds before sending, and the Batching Policy in Azure Data Explorer will further batch up for default.

## Filters

Optionally, add the following lines to your {% term "configuration.yaml" %} file for filtering data ingested into Azure Data Explorer:

```yaml
# Example configuration.yaml entry
azure_data_explorer:
  filter:
    include_domains:
    - homeassistant
    - light
    - media_player
```

{% configuration %}
filter:
  description: Filter domains and entities for Data Explorer. ([Configure Filter](#configure-filter))
  required: true
  type: map
  default: Includes all entities from all domains
  keys:
    include_domains:
      description: List of domains to include (e.g., `light`).
      required: false
      type: list
    exclude_domains:
      description: List of domains to exclude (e.g., `light`).
      required: false
      type: list
    include_entity_globs:
      description: Include all entities matching a listed pattern (e.g., `sensor.weather_*`).
      required: false
      type: list
    exclude_entity_globs:
      description: Exclude all entities matching a listed pattern (e.g., `sensor.weather_*`).
      required: false
      type: list
    include_entities:
      description: List of entities to include (e.g., `light.attic`).
      required: false
      type: list
    exclude_entities:
      description: List of entities to include (e.g., `light.attic`).
      required: false
      type: list
{% endconfiguration %}

{% warning %}
Not filtering domains or entities will send every event to Azure Data Explorer.
{% endwarning %}

### Configuring a filter

By default, no entity will be excluded. To limit which entities are being exposed to `Azure Data Explorer`, you can use the `filter` parameter.

```yaml
# Example filter to include specified domains and exclude specified entities
azure_data_explorer:
  filter:
    include_domains:
      - alarm_control_panel
      - light
    include_entity_globs:
      - binary_sensor.*_occupancy
    exclude_entities:
      - light.kitchen_light
```

Filters are applied as follows:

1. No includes or excludes - pass all entities.
2. Includes, no excludes - only include specified entities.
3. Excludes, no includes - only exclude specified entities.
4. Both includes and excludes:
   - Include domain and/or glob patterns specified:
      - If the domain is included, and the entity is not excluded or matches the exclude glob pattern, pass.
      - If the entity matches include glob pattern, and the entity does not match any exclude criteria (domain, glob pattern, or listed), pass.
      - If the domain is not included, the glob pattern does not match, and the entity not included, fail.
   - Exclude domain and/or glob patterns specified and include does not list domains or glob patterns
      - If the domain is excluded and the entity is not included, fail.
      - If the entity matches an exclude glob pattern and the entity is not included, fail.
      - If the entity does not match any exclude criteria (domain, glob pattern, or listed), pass.
   - Neither include or exclude specifies domains or glob patterns
      - If the entity is included, pass (as #2 above).
      - If the entity matches both an include and an exclude pattern, the entity exclude is ignored.


## Using Azure Data Explorer

Once the setup is complete, data is being sent to Azure Data Explorer, and you can start exploring your data.
Here are some resources to help you learn how to use Azure Data Explorer:

- MS Learn: [https://aka.ms/learn.kql](https://aka.ms/learn.kql), [https://aka.ms/learn.adx](https://aka.ms/learn.adx)
- YouTube: [Official Microsoft Azure Data Explorer YouTube channal](https://www.youtube.com/channel/UCPgPN-0DLaImaaDR_TtKR8A)
- Blog: [Official Microsoft Data Explorer blog](https://techcommunity.microsoft.com/t5/azure-data-explorer-blog/bg-p/AzureDataExplorer)
