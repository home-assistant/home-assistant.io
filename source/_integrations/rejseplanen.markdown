---
title: Rejseplanen
description: Instructions on how to integrate timetable data for Danish Rejseplanen within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.88
ha_domain: rejseplanen
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `rejseplanen` {% term integration %} will provide you with travel details for Danish public transport, using multidepartureborad data from [Rejseplanen](https://www.rejseplanen.dk/). 
ou will ahve to setup the central entity that contains the API key and then subsequent sub-entries for each stop/station you want to see. The API will be called from the central entity, ensuring the limit ot the free access is not breached.
All setup for this integration is done in UI configuration.

## Prerequisites
In order to use the integration you must uptain an API key from Rejseplanen.dk. You can apply for this by using the [request form](https://labs.rejseplanen.dk/hc/da/requests/new) on their webpage. Follow the steps for the application and remember to request it as a provate user.
Keep in mind, the private API key allows for 50.000 calls/month. 


## stop_id

The stop id is used in the sub entry config flow know as "stop". The integration will not get data if there are no stop defined in the config.
Stop ID's can be obtained using multiple methods. The methods described here are based on text search or coordinate search. Both need the API key provided by Rejseplanen.

### By string search
The stop_id can be found from searching for the city or general area from which you would like to obtain the stop id number.
- open a webbrowser.
- fill in the URL with appropriate data such as API key and stop name e.g. Roskilde [https://www.rejseplanen.dk/api/location.name?input=<search_string>&accessId=<YOUR_API_KEY>](https://www.rejseplanen.dk/api/location.name?input=input=<search_string>&accessId=<YOUR_API_KEY>)
- Look for the "extid" parameter in the response.

The response will look something like this
```xml
<LocationList xmlns="http://hacon.de/hafas/proxy/hafas-proxy" serverVersion="2.49.1" dialectVersion="2.45-Rejseplanen" requestId="r2gm7s2iiist82wg">
  <TechnicalMessages>
  <TechnicalMessage key="requestTime">2025-06-16 11:53:58</TechnicalMessage>
  <TechnicalMessage key="backendInfo">ttp=16601#16676 plancode0=72z27 planid=1749820065 planid0=1749820065 planid_adr=1746438686 plancode_adr=52iz0 planid_poi=1746518115 plancode_poi=538ad srvv=5.45.Rejseplanen.17.3.12 (customer/hcudk/release/2025.2.0.3) [2025-04-21] tlibv=TRFVER: rel/dk/11.00.8 2025-02-10 16:37:34 +0100 Rejsekort v11.0.8 jno=1</TechnicalMessage>
  </TechnicalMessages>
  <StopLocation id="A=1@O=Roskilde St.@X=12088550@Y=55639093@U=86@L=8600617@B=1@p=1749820065@" extId="8600617" isMainMast="true" name="Roskilde St." lon="12.08855" lat="55.639093" weight="22212" products="239" minimumChangeDuration="PT5M">
    ...
  </StopLocation>
  ...
</LocationList>
```

### By coordinates

- Go to [https://www.openstreetmap.org](https://www.openstreetmap.org)
- Make a search and fill in the location you want to find for.
- The URL will look like this [https://www.openstreetmap.org/#map=18/56.15756/10.20674](https://www.openstreetmap.org/#map=18/56.15756/10.20674)
- Now insert the coordinates for the location in the URL, in this example it will be: [https://www.rejseplanen.dk/api/location.nearbystops?originCoordLong=12.088367&originCoordLat=55.637912&maxNo=5&accessId=<YOUR_API_KEY>](https://www.rejseplanen.dk/api/location.nearbystops?originCoordLong=12.088367&originCoordLat=55.637912&maxNo=5&accessId=<YOUR_API_KEY>)
- You will now see the 5 stops closest to your input location.
  
You will see an output like this:

```xml
<LocationList xmlns="http://hacon.de/hafas/proxy/hafas-proxy" serverVersion="2.49.1" dialectVersion="2.45-Rejseplanen" requestId="m54u7sm8gq4pww8x">
  <TechnicalMessages>
  <TechnicalMessage key="requestTime">2025-06-16 12:28:27</TechnicalMessage>
  <TechnicalMessage key="backendInfo">ttp=16601#16676 plancode0=72z27 planid=1749820065 planid0=1749820065 planid_adr=1746438686 plancode_adr=52iz0 planid_poi=1746518115 plancode_poi=538ad srvv=5.45.Rejseplanen.17.3.12 (customer/hcudk/release/2025.2.0.3) [2025-04-21] tlibv=TRFVER: rel/dk/11.00.8 2025-02-10 16:37:34 +0100 Rejsekort v11.0.8 jno=1</TechnicalMessage>
  </TechnicalMessages>
  <StopLocation id="A=1@O=Roskilde St. (togbus)@X=12088388@Y=55637826@U=86@L=8651617@" extId="8651617" name="Roskilde St. (togbus)" lon="12.088388" lat="55.637826" weight="1563" dist="10" products="8" minimumChangeDuration="PT5M">
    ...
  </StopLocation>
  <StopLocation id="A=1@O=Roskilde St. (togbus)@X=12088334@Y=55637799@U=86@L=8650617@" extId="8650617" name="Roskilde St. (togbus)" lon="12.088334" lat="55.637799" weight="1563" dist="13" products="8" minimumChangeDuration="PT5M">
    ...
  </StopLocation>
</LocationList>
```

Find the name of your stop in the list and the "id" is the parameter marked as extid to be used in the `stop_id:` list.

## Examples

A more extensive example on how to use this sensor:

```yaml
# Example configuration.yaml entry with the correct use of authentication.
sensor:
  - platform: rejseplanen
    name: "Roskilde St."
    authentication: "YOUR_API_KEY"
    stop_id:
      - 860061707
```

The sensor can filter the timetables by one or more types. The known types are listed in the table below.

| Departure type | Description             |
| -------------- | ----------------------- |
| BUS            | Normal bus              |
| EXB            | Express bus             |
| TB             | Harbour bus             |
| LET            | Letbanen                |
| M              | Metro                   |
| S              | S-train                 |
| REG            | Regional train          |
| IC             | Intercity train         |
| LYN            | Intercity express train |
| TOG            | Other trains            |

## Attributes

| Attribute         | Description                                                                      |
| ----------------- | -------------------------------------------------------------------------------- |
| `due_in`          | Minutes until departure                                                          |
| `due_at`          | Departure date and time                                                          |
| `scheduled_at`    | Scheduled departure date and time                                                |
| `real_time_at`    | Real time departure date and time (in cases where it's different from scheduled) |
| `type`            | Transport type                                                                   |
| `route`           | Route code                                                                       |
| `direction`       | Destination stop                                                                 |
| `final_stop`      | Final stop (if departure doesn't go all the way to the destination stop)         |
| `stop`            | Departure stop                                                                   |
| `stop_id`         | ID of departure stop                                                             |
| `track`           | Departure track (if available)                                                   |
| `attribution`     | Attribution (required by data source)                                            |
| `next_departures` | List of further departures                                                       |

### `next_departures`

| Attribute      | Description                                                                      |
| -------------- | -------------------------------------------------------------------------------- |
| `due_in`       | Minutes until departure                                                          |
| `due_at`       | Departure date and time                                                          |
| `scheduled_at` | Scheduled departure date and time                                                |
| `real_time_at` | Real time departure date and time (in cases where it's different from scheduled) |
| `type`         | Transport type                                                                   |
| `route`        | Route code                                                                       |
| `direction`    | Destination stop                                                                 |
| `final_stop`   | Final stop (if departure doesn't go all the way to the destination stop)         |
| `stop`         | Departure stop                                                                   |
| `track`        | Departure track (if available)                                                   |
