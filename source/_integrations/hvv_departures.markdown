---
title: HVV Departures
description: Display the departures of buses, trains and ferries in Hamburg within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.112
ha_config_flow: true
ha_codeowners:
  - '@vigonotion'
ha_domain: hvv_departures
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

The `hvv_departures` sensor will display the departures of buses, trains and ferries in Hamburg.

{% include integrations/config_flow.md %}


Need your API credentials? See [how to get the API credentials](#how-to-get-the-api-credentials).

## Options

Menu: *Configuration* > *Integrations* > *Select your new integration* > *Press the cog in the upper left corner*

- **select lines**: filter the departures on the station to only show departures for the selected lines.
- **offset**: set this if you want to list the departures some minutes in the future, for example, if you live ten minutes away from the station.
- **use realtime data**: enable this to include delay and cancellation information.

## Departure sensors

The integration creates one sensor for the departures at the selected station.

### States

The state is a timestamp representing the time for the next departure, not including delays.

### Attributes

| Attribute   | Description                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| `line`      | Line number of the next departure                                                                                        |
| `origin`    | The station where the transport started from                                                                             |
| `direction` | The station where the transport ends                                                                                     |
| `type`      | Type of the transportation, for example, `Bus` or `S`                                                                     |
| `id`        | A unique identifier for the line. In most cases, `line` is sufficient to identify the line                               |
| `delay`     | Real-time data about the delay of the transport in seconds. Add this to the departure time to get the real departure time |
| `next`      | A list of the upcoming departures. Each element has the above attributes and `departure` containing the timestamp        |

## Elevator sensors

If the selected station has elevators, binary sensors will be available.

### States

- OK (`off`): The elevator is working.
- Problem (`on`): The elevator is out of order. See the cause attribute for more information.

### Attributes

| Attribute       | Description                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `cabin_width`   | Width of the elevator cabin                                                                                                                |
| `cabin_length`  | Length of the elevator cabin                                                                                                               |
| `door_width`    | Width of the elevator doors                                                                                                                |
| `elevator_type` | Type of the elevator                                                                                                                       |
| `button_type`   | Type of the elevator buttons, can be one of the following: <br/><ul><li>`BRAILLE`</li><li>`ACUSTIC`</li><li>`COMBI`</li><li>`UNKNOWN`</li> |
| `cause`         | If the state of the sensor is `on` ("Problem"), the `cause` attribute may contain further information about the cause                      |
| `lines`         | List of lines that can be reached using this elevator                                                                                      |

## How to get the API credentials

You have to apply for credentials via the HVV website. You can see their official guide [here](https://www.hvv.de/de/fahrplaene/abruf-fahrplaninfos/datenabruf) (the page is only available in German).

In your mail, tell them you are using your API credentials for use within Home Assistant.  They will subsequently send your API credentials in a follow-up response.
## Data

Data is provided by [HVV](https://www.hvv.de/).
