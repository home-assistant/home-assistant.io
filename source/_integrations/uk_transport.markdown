---
title: UK Transport
description: Display the current status of UK train and bus departures.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: '0.50'
ha_domain: uk_transport
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `uk_transport` {% term integration %} will display the time in minutes until the next departure in a specified direction from of a configured train station or bus stop. The sensor uses [transportAPI](https://www.transportapi.com/) to query live departure data and requires a developer application ID and key which can be obtained [here](https://developer.transportapi.com/). The [free tier](https://www.transportapi.com/blog/2022/08/introducing-the-home-use-plan-for-transportapi/) allows 30 requests a day, which is sufficient for a single sensor refreshing every 48 minutes.

{% note %}
Additional sensors can be added but at the expense of a reduced refresh rate. 2 sensors can be updated every 2*48 = 96 minutes, and so on. Calculating and setting this rate is automatically handles by the integration.
{% endnote %}

Queries are entered as a list, with the two transport modes available being `bus` and `train`.

Train departure sensors require three character long `origin` and `destination` station codes which are searchable on the [National Rail enquiries](https://www.nationalrail.co.uk/times_fares/ldb.aspx) website (e.g., `WAT` is London Waterloo). The validity of a route can be checked by performing a GET request to `/uk/train/station/{station_code}/live.json` in the [API reference webpage](https://developer.transportapi.com/docs?raml=https://transportapi.com/v3/raml/transportapi.raml#request_uk_train_station_station_code_live_json).

To add a single train departure {% term integration %} add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry for a single sensor
sensor:
  - platform: uk_transport
    app_id: YOUR_APP_ID
    app_key: YOUR_APP_KEY
    queries:
      - mode: train
        origin: MAL
        destination: WAT
```

{% configuration %}
app_id:
  description: Your application ID.
  required: true
  type: string
app_key:
  description: Your application Key.
  required: true
  type: string
queries:
  description: At least one entry required.
  required: true
  type: list
  keys:
    mode:
      description: One of `bus` or `train`.
      required: true
      type: list
    origin:
      description: Specify the three character long origin station code.
      required: true
      type: string
    destination:
      description: Specify the three character long destination station code.
      required: true
      type: string
{% endconfiguration %}

A large amount of information about upcoming departures is available within the attributes of the sensor. The example above creates a sensor with ID `sensor.next_train_to_wat` with the attribute `next_trains` which is a list of the next 25 departing trains.

These attributes are available for each departing train:

- `origin_name`
- `destination_name`
- `status`
- `scheduled`: (API attribute is `aimed_departure_time`)
- `estimated`: (API attribute is `expected_departure_time`)
- `platform`
- `operator_name`

Refer to the [API reference webpage](https://developer.transportapi.com/docs?raml=https://transportapi.com/v3/raml/transportapi.raml##request_uk_train_station_station_code_live_json) for definitions.

Attributes can be accessed using the [template sensor](/integrations/template) as per this example:

{% raw %}

```yaml
# Example configuration.yaml entry for a template sensor to access the attributes of the next departing train.
template:
  - sensor:
    - name: Next train status
      state: >- 
        {{state_attr('sensor.next_train_to_wat', 'next_trains')[0].status}}
    - name: Next train origin
      state: >-
        {{state_attr('sensor.next_train_to_wat', 'next_trains')[0].origin_name}}
    - name: Next train estimated
      state: >- 
        {{state_attr('sensor.next_train_to_wat', 'next_trains')[0].estimated}}
    - name: Next train scheduled
      state: >-
        {{state_attr('sensor.next_train_to_wat', 'next_trains')[0].scheduled}}
    - name: Next train platform
      state: >-
        {{state_attr('sensor.next_train_to_wat', 'next_trains')[0].platform}}
```

{% endraw %}

Bus sensors require as their `origin` a bus stop ATCO code which can be found by browsing OpenStreetMap data as
follows:

1. On [OpenStreetMap.org](https://www.openstreetmap.org/) zoom right in on a bus stop you're interested in.
2. Click the layers picker button on the right hand side.
3. Tick the 'map data' layer, and wait for clickable objects to load.
4. Click the bus stop node to reveal its tags on the left.

The `destination` must be a valid location in the "direction" field returned by a GET query to `/uk/bus/stop/{atcocode}/live.json` as described in the [API reference webpage](https://developer.transportapi.com/docs?raml=https://transportapi.com/v3/raml/transportapi.raml##bus_information). A bus sensor is added in the following {% term "`configuration.yaml`" %} file entry:

```yaml
# Example configuration.yaml entry for multiple sensors
sensor:
  - platform: uk_transport
    app_id: YOUR_APP_ID
    app_key: YOUR_APP_KEY
    queries:
      - mode: bus
        origin: 340000368SHE
        destination: Wantage
      - mode: train
        origin: MAL
        destination: WAT
```

And the template sensor for viewing the next bus attributes.

{% raw %}

```yaml
# Example configuration.yaml entry for a template sensor to access the attributes of the next departing bus.
template:
  - sensor:
    - name: Next bus route
      state: "{{state_attr('sensor.next_bus_to_wantage', 'next_buses')[0].route}}"
    - name: Next bus direction
      state: "{{state_attr('sensor.next_bus_to_wantage', 'next_buses')[0].direction}}"
    - name: Next bus scheduled
      state: "{{state_attr('sensor.next_bus_to_wantage', 'next_buses')[0].scheduled}}"
    - name: Next bus estimated
      state: "{{state_attr('sensor.next_bus_to_wantage', 'next_buses')[0].estimated}}"
```

{% endraw %}

## Managing API requests

If you wish to manage the rate of API requests (e.g., to disable requests when you aren't interested in travel, so that you can request updates more frequently when you do travel) set a really long `scan_interval` in the configuration options, and use the `homeassistant.update_entity` action to request the update of an {% term entity %}, rather than waiting for the next scheduled update.

Powered by [transportAPI](https://www.transportapi.com/)
