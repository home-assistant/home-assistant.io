---
title: Azure Data Explorer
description: Setup for Azure Event Hub integration
ha_category:
  - History
ha_release: 
ha_iot_class: Cloud Push
ha_codeowners:
  - '@eavanvalkenburg'
ha_domain: azure_data_explorer
---

The `Azure Data Explorer` integration allows you to hook into the Home Assistant event bus and send events to [Azure Data Explorer](https://azure.microsoft.com/en-us/services/data-explorer/) 

## First time setup

* An Azure subscription. Create a [free Azure account](https://azure.microsoft.com/free/).
* Create [a cluster and database](create-cluster-database-portal.md).
* Azure Data Explorer Cluster setup:
    * Create Azure Active Directory (Azure AD) app by [provisioning an Azure AD application](./provision-azure-ad-app.md).
    * Grant access to your Azure AD App on your Azure Data Explorer database by [managing Azure Data Explorer database permissions](manage-database-permissions.md).
* Create a table in the database


## Configuration

Optinaly add the following lines to your `configuration.yaml` file for filtering what to send.:

```yaml
# Example configuration.yaml entry
azure_event_hub:
  filter:
    include_domains:
    - homeassistant
    - light
    - media_player
```

{% configuration %}
filter:
  description: Filter domains and entities for Event Hub. ([Configure Filter](#configure-filter))
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

<div class='note warning'>
Not filtering domains or entities will send every event to Azure Data Explorer.
</div>

<div class='note warning'>
Event Hubs have a retention time of at most 7 days, if you do not capture or use the events they are deleted automatically from the Event Hub, the default retention is 1 day.
</div>

### Configure Filter

By default, no entity will be excluded. To limit which entities are being exposed to `Azure Data Explorer`, you can use the `filter` parameter.

```yaml
# Example filter to include specified domains and exclude specified entities
azure_event_hub:
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

1. No includes or excludes - pass all entities
2. Includes, no excludes - only include specified entities
3. Excludes, no includes - only exclude specified entities
4. Both includes and excludes:
   - Include domain and/or glob patterns specified
      - If domain is included, and entity not excluded or match exclude glob pattern, pass
      - If entity matches include glob pattern, and entity does not match any exclude criteria (domain, glob pattern or listed), pass
      - If domain is not included, glob pattern does not match, and entity not included, fail
   - Exclude domain and/or glob patterns specified and include does not list domains or glob patterns
      - If domain is excluded and entity not included, fail
      - If entity matches exclude glob pattern and entity not included, fail
      - If entity does not match any exclude criteria (domain, glob pattern or listed), pass
   - Neither include or exclude specifies domains or glob patterns
      - If entity is included, pass (as #2 above)
      - If entity include and exclude, the entity exclude is ignored


## Using the data in Azure
