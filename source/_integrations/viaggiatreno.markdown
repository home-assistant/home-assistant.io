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
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **Trenitalia ViaggiaTreno** {% term integration %} will give you information about configured train ids and stations using the public [ViaggiaTreno](http://viaggiatreno.it) API.

To activate the {% term integration %}, you need at least two parameters: the `train_id` and the `station_id`.

The first is available just looking at the [ViaggiaTreno](http://viaggiatreno.it/) timetable, the latter can be obtained using the dedicated API endpoint:
`http://www.viaggiatreno.it/infomobilita/resteasy/viaggiatreno/autocompletaStazione/<Station name>`
(e.g., `http://www.viaggiatreno.it/infomobilita/resteasy/viaggiatreno/autocompletaStazione/ROMA` will list all station names (with ids) that starts with *ROMA*).

{% note %}
The `station_id` is referred to the train's **departing station**. If a train number does not match with the station id, no data will be returned to the sensor.
{% endnote %}

Then add the data to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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

{% note %}
In a future implementation, the station name could be used to automatically search best-matching station id, without the need to specify it.
{% endnote %}

The public timetables are coming from [ViaggiaTreno](http://viaggiatreno.it).

{% note %}
Instructions (in Italian) for the API are available at:
https://github.com/bluviolin/TrainMonitor/wiki/API-del-sistema-Viaggiatreno
{% endnote %}
