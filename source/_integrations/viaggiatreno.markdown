---
title: Trenitalia ViaggiaTreno
description: Instructions on how to integrate Italian Railroads data (from ViaggiaTreno API) into Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.58
ha_domain: viaggiatreno
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `viaggiatreno` sensor will give you information about configured train ids and stations using the public [ViaggiaTreno](http://viaggiatreno.it) API.

To activate the sensor you need at least two parameters: the `train_id` and the `station_id`.

The first is available just looking at the [ViaggiaTreno](http://viaggiatreno.it/) timetable, the latter can be obtained using the dedicated API endpoint:
`http://www.viaggiatreno.it/infomobilita/resteasy/viaggiatreno/autocompletaStazione/<Station name>`
(e.g., `http://www.viaggiatreno.it/infomobilita/resteasy/viaggiatreno/autocompletaStazione/ROMA` will list all station names (with ids) that starts with *ROMA*).

<div class='note'>

Note that the `station_id` is referred to the train's **departing station**. If a train number does not match with the station id, no data will be returned to the sensor.

</div>

Then add the data to your `configuration.yaml` file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: viaggiatreno
    train_id: 12279
    station_id: S08409
```

{% configuration %}
train_id:
  description: The ID of the train.
  required: true
  type: integer
station_id:
  description: The ID of the starting station.
  required: true
  type: integer
train_name:
  description: The name of the sensor. Defaults to 'Train <train id> from <station id>'.
  required: false
  type: string
{% endconfiguration %}

<div class='note'>
In a future implementation, the station name could be used to automatically search best-matching station id, without the need to specify it.
</div>

The public timetables are coming from [ViaggiaTreno](http://viaggiatreno.it).

<div class='note'>

Instructions (in Italian) for the API are available at:
https://github.com/bluviolin/TrainMonitor/wiki/API-del-sistema-Viaggiatreno

</div>
