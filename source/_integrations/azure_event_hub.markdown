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
---

The `Azure Event Hub` integration allows you to hook into the Home Assistant event bus and send events to [Azure Event Hub](https://azure.microsoft.com/en-us/services/event-hubs/) or to a [Azure IoT Hub](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-messages-read-builtin). 

## First time setup

This assumes you already have a Azure account. Otherwise create a Free account [here](https://azure.microsoft.com/en-us/free/).

You need to create a Event Hub namespace and a Event Hub in that namespace, you can follow [this guide](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-create). Alternatively you can directly deploy an ARM template with the namespace and the Event Hub [from here](https://github.com/Azure/azure-quickstart-templates/tree/master/201-event-hubs-create-event-hub-and-consumer-group/).

You must then create a Shared Access Policy for the Event Hub with 'Send' claims or use the RootManageAccessKey from your namespace (this key has additional claims, including managing the event hub and listening, which are not needed for this purpose), for more details on the security of Event Hubs [go here](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-authentication-and-security-model-overview).

Once you have the name of your namespace, instance, Shared Access Policy and the key for that policy, you can setup the integration itself.

The alternative approach is to use a connection string, this can be retrieved in the same way as the Shared Access Policy and this can also be gotten for a device in an IoT Hub (Event Hub-compatible connection string).

The final thing to consider is how often you want the integration to send messages in a batch to your hub, this is set with the `send_interval`, with a default of 5 seconds. The other thing to look at is what the maximum delay you want to use, since this component runs in a asynchronous way there is no guarantee that the sending happens exactly on time, so depending on your semantics you might want messages discarded. The actual check of the time happens with `max_delay` plus `send_interval`, so that even with a long `send_interval` the semantics are the same.

## Configuration

Add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
azure_event_hub:
  event_hub_namespace: NAMESPACE_NAME
  event_hub_instance_name: EVENT_HUB_INSTANCE_NAME
  event_hub_sas_policy: SAS_POLICY_NAME
  event_hub_sas_key: SAS_KEY
  filter:
    include_domains:
    - homeassistant
    - light
    - media_player
```

{% configuration %}
event_hub_namespace:
  description: The name of your Event Hub namespace.
  required: exclusive
  type: string
event_hub_instance_name:
  description: The name of your Event Hub instance.
  required: exclusive
  type: string
event_hub_sas_policy:
  description: The name of your Shared Access Policy.
  required: exclusive
  type: string
event_hub_sas_key:
  description: The key for the Shared Access Policy.
  required: exclusive
  type: string
event_hub_connection_string:
  description: The connection string to your event hub.
  required: exclusive
  type: string
send_interval:
  description: The interval in seconds should events be sent to the Event Hub.
  required: false
  type: integer
  default: 5
max_delay:
  description: The time in seconds after which a message is to be discarded.
  required: false
  type: integer
  default: 30
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
Not filtering domains or entities will send every event to Azure Event Hub, thus taking up a lot of space.
</div>

<div class='note warning'>
Event Hubs have a retention time of at most 7 days, if you do not capture or use the events they are deleted automatically from the Event Hub, the default retention is 1 day.
</div>

### Configure Filter

By default, no entity will be excluded. To limit which entities are being exposed to `Azure Event Hub`, you can use the `filter` parameter.

```yaml
# Example filter to include specified domains and exclude specified entities
azure_event_hub:
  event_hub_namespace: NAMESPACE_NAME
  event_hub_instance_name: EVENT_HUB_INSTANCE_NAME
  event_hub_sas_policy: SAS_POLICY_NAME
  event_hub_sas_key: SAS_KEY
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

### Advanced configuration

This is what the configuration will look like when using a connection string directly, instead of the four parameters. It also shows how to set the send_interval and max_delay to something other than the default. This means once every minute the integration will connect to your hub and send messages, but the messages have to be less than 65 seconds old at the time of sending for them to be counted (send_interval + max_delay).

```yaml
# Connection string config with non-defaults for send_interval and max_delay
azure_event_hub:
  event_hub_connection_string: CONNECTION_STRING
  send_interval: 60
  max_delay: 5
```

## Using the data in Azure

There are a number of ways to stream the data that comes into the Event Hub into storages in Azure, the easiest way is to use the built-in Capture function and this allows you to capture the data in Azure Blob Storage or Azure Data Lake store, [details here](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-capture-overview).

Other storages in Azure (and outside) are possible with a [Azure Stream Analytics job](https://docs.microsoft.com/en-us/azure/stream-analytics/stream-analytics-define-inputs#stream-data-from-event-hubs), for instance for [Cosmos DB](https://docs.microsoft.com/en-us/azure/stream-analytics/stream-analytics-documentdb-output), [Azure SQL DB](https://docs.microsoft.com/en-us/azure/stream-analytics/stream-analytics-sql-output-perf), [Azure Table Storage](https://docs.microsoft.com/en-us/azure/stream-analytics/stream-analytics-define-outputs#table-storage), custom writing to [Azure Blob Storage](https://docs.microsoft.com/en-us/azure/stream-analytics/stream-analytics-custom-path-patterns-blob-storage-output) and [Topic and Queues](https://docs.microsoft.com/en-us/azure/stream-analytics/stream-analytics-quick-create-portal#configure-job-output).

On the analytical side, Event Hub can be directly fed into [Azure Databricks Spark](https://docs.microsoft.com/en-us/azure/azure-databricks/databricks-stream-from-eventhubs?toc=https%3A%2F%2Fdocs.microsoft.com%2Fen-us%2Fazure%2Fevent-hubs%2FTOC.json&bc=https%3A%2F%2Fdocs.microsoft.com%2Fen-us%2Fazure%2Fbread%2Ftoc.json), [Azure Time Series Insights](https://docs.microsoft.com/en-us/azure/time-series-insights/time-series-insights-how-to-add-an-event-source-eventhub) and [Microsoft Power BI](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-tutorial-visualize-anomalies).

The final way to use the data in Azure is to connect a Azure Function to the Event Hub using the [Event Hub trigger binding](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-hubs).
