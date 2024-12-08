---
title: Azure Event Hub
description: Setup for Azure Event Hub integration
ha_category:
  - History
ha_release: 0.94
ha_iot_class: Cloud Push
ha_codeowners:
  - '@eavanvalkenburg'
ha_domain: azure_event_hub
ha_config_flow: true
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `Azure Event Hub` integration allows you to hook into the Home Assistant event bus and send events to [Azure Event Hub](https://azure.microsoft.com/products/event-hubs/) or to an [Azure IoT Hub](https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-messages-read-builtin).

## First time setup

This assumes you already have an Azure account. Otherwise create a Free account [here](https://azure.microsoft.com/free/).

You need to create an Event Hub namespace and an Event Hub in that namespace, you can follow [this guide](https://learn.microsoft.com/azure/event-hubs/event-hubs-create). Alternatively you can directly deploy an ARM template with the namespace and the Event Hub [from here](https://github.com/Azure/azure-quickstart-templates/tree/master/quickstarts/microsoft.eventhub/event-hubs-create-event-hub-and-consumer-group).

You must then create a Shared Access Policy for the Event Hub with 'Send' claims or use the RootManageAccessKey from your namespace (this key has additional claims, including managing the event hub and listening, which are not needed for this purpose), for more details on the security of Event Hubs [go here](https://learn.microsoft.com/azure/event-hubs/authenticate-shared-access-signature).

Once you have the name of your namespace, instance, Shared Access Policy and the key for that policy, you can setup the integration itself.

The alternative approach is to use a connection string and instance name, this can be retrieved in the same way as the Shared Access Policy and this can also be gotten for a device in an IoT Hub (Event Hub-compatible connection string). In the case of IoT Hub, you need to put the Device ID as the instance name.

The final thing to consider is how often you want the integration to send messages in a batch to your hub, this is set with the `send_interval`, with a default of 5 seconds. Since this component runs in an asynchronous way there is no guarantee that the sending happens exactly on time, and because your Home Assistant might be very busy with lots of events happening it might discard several events that are older then 20 seconds plus the `send_interval`.

{% include integrations/config_flow.md %}

You can setup [filters](#filter-configuration) through the {% term "`configuration.yaml`" %}.

{% warning %}
Not filtering domains or entities will send every event to Azure Event Hub, thus taking up a lot of space and bandwidth.
{% endwarning %}

{% note %}
Event Hubs have a retention time of at most 7 days, if you do not capture or use the events they are deleted automatically from the Event Hub, the default retention is 1 day.
{% endnote %}

### Filter configuration

By default, no entity will be excluded. To limit which entities are being exposed to `Azure Event Hub`, you can use the `filter` parameter.

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

{% include common-tasks/filters.md %}

{% configuration %}
filter:
  description: Filter domains and entities for Event Hub.
  required: false
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

## Using the data in Azure

There are a number of ways to stream the data that comes into the Event Hub into storages in Azure, the easiest way is to use the built-in Capture function and this allows you to capture the data in Azure Blob Storage or Azure Data Lake store, [details here](https://learn.microsoft.com/azure/event-hubs/event-hubs-capture-overview).

Other storages in Azure (and outside) are possible with an [Azure Stream Analytics job](https://learn.microsoft.com/azure/stream-analytics/stream-analytics-define-inputs#stream-data-from-event-hubs), for instance for [Cosmos DB](https://learn.microsoft.com/azure/stream-analytics/stream-analytics-documentdb-output), [Azure SQL DB](https://learn.microsoft.com/azure/stream-analytics/stream-analytics-sql-output-perf), [Azure Table Storage](https://learn.microsoft.com/azure/stream-analytics/stream-analytics-define-outputs), custom writing to [Azure Blob Storage](https://learn.microsoft.com/azure/stream-analytics/stream-analytics-custom-path-patterns-blob-storage-output) and [Topic and Queues](https://learn.microsoft.com/azure/stream-analytics/stream-analytics-quick-create-portal#configure-job-output).

On the analytical side, Event Hub can be directly fed into [Azure Databricks Spark](https://learn.microsoft.com/azure/databricks/structured-streaming/streaming-event-hubs), [Azure Time Series Insights](https://learn.microsoft.com/azure/time-series-insights/how-to-ingest-data-event-hub) and [Microsoft Power BI](https://learn.microsoft.com/azure/stream-analytics/stream-analytics-real-time-fraud-detection).

The final way to use the data in Azure is to connect an Azure Function to the Event Hub using the [Event Hub trigger binding](https://learn.microsoft.com/azure/azure-functions/functions-bindings-event-hubs).
