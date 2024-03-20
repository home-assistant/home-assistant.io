---
title: Transport for London
description: Display arrivals for stops in the TfL network such as bus, underground, DLR, within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_quality_scale: Gold
ha_release: 2023.11.4
ha_domain: tfl
ha_platforms:
  - sensor
ha_integration_type: integration
ha_codeowners:
  - '@pwheel'
ha_config_flow: true
---

The `tfl` sensor will display the next arrival times of services (bus, train, underground, etc) to a given stop in the TfL (Transport for London) network.

## Prerequisites

You can optionally register an application with TfL's API at [api.tfl.gov.uk](https://api.tfl.gov.uk/). Anonymous API access allows 50 requests per minute which should be more than enough.

You'll need to look up the *stop point id* of the stop you're interested in. You can do this by searching for the stop on the [TfL website](https://tfl.gov.uk/travel-information/stations-stops-and-piers/). You should end up on a page that has a URL like this for one of the bus stops at London Bridge - <https://tfl.gov.uk/bus/stop/490000139M/london-bridge>. In this example, the *stop id* is *490000139M*.
You can test the stop id is correct by testing it with a request to the API like this in your browser - <https://api.tfl.gov.uk/StopPoint/490000139M/arrivals>.

You can add as many stop points as you like, for whichever services you like.

A sensor will be created for each stop point you add.

## Displaying stop arrivals in a dashboard

To display your stop arrivals in a dashboard, you can use a Markdown card. Here is an example that will display the next 3 arrivals; replace `YOUR_STOP_POINT_SENSOR_NAME` with the name of your sensor. This example does some rounding down so you don't get caught out and displays *Due* if the arrival is imminent (less than 1 minute).

{% raw %}

        Buses:
          {% for arrival in state_attr("sensor.YOUR_STOP_POINT_SENSOR_NAME", "next_3") %}
          1. {{arrival.line_name}} - {{arrival.destination_name}} - {% if arrival.time_to_station < 60 %} Due {% elif arrival.time_to_station < 120 %} 1 min {% else %} {{(arrival.time_to_station / 60)|round(0, 'floor')}} mins {% endif %}
          {%- endfor %}

{% endraw %}

{% include integrations/config_flow.md %}

Powered by TfL Open Data [TFL](https://api.tfl.gov.uk/).
