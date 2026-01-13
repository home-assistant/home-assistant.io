---
title: Servicio Meteorológico Nacional de Argentina (SMN)
description: Instructions on how to integrate SMN within Home Assistant.
ha_category:
  - Weather
ha_release: 2026.1
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@catastrophicode'
ha_domain: smn_argentina
ha_platforms:
  - weather
ha_integration_type: service
---

The **Servicio Meteorológico Nacional de Argentina (SMN)** {% term integration %} uses [smn.gob.ar](https://smn.gob.ar) web services as a source for meteorological data for your location. The weather forecast is delivered by the [National Weather Service of Argentina](https://www.argentina.gob.ar/smn).

{% include integrations/config_flow.md %}

## Data

SMN provides daily weather forecasts for four time slots: early morning (3 AM), morning (9 AM), afternoon (3 PM), and night (9 PM). 

## Actions

The integration provides the following actions.

### Action: Get alerts for location

Get weather alerts for a specific **SMN location ID** (for example `4864` queries for alerts for Buenos Aires City). Returns active alerts with severity levels, descriptions, and instructions for use in automations.

{% configuration_basic %}
location_id:
  description: SMN location ID (displayed in the URL when viewing "More details" from a location)
{% endconfiguration_basic %}  

## Examples

The following is an example of an action call and response for a location experiencing a severe weather alert.  

```yaml
action: smn_argentina.get_alerts_for_location
data:
  location_id: "9655"
```


```yaml
active_alerts:
  - event_id: 41
    event_name: tormenta
    max_level: 3
    level_name: amarillo
    color: amarillo
    severity: warning
    date: "2026-01-10"
    description: >
      El área será afectada por tormentas de variada intensidad, algunas
      localmente fuertes. Las mismas estarán acompañadas por frecuente actividad
      eléctrica, ocasional caída de granizo, ráfagas que pueden alcanzar los 70
      km/h y abundante caída de agua en cortos períodos.

      Se prevén valores de precipitación acumulada entre 40 y 70 mm, que pueden
      ser superados en forma puntual.
    instruction: >
      1- Evitá salir.

      2- No saques la basura y limpiá desagües y sumideros.

      3- Desconectá los electrodomésticos y cortá el suministro eléctrico si
      ingresa agua

      4- Cerrá y alejate de puertas y ventanas.

      5- Retirá o asegurá objetos que puedan ser arrastrados por el viento.

      6- Si estás al aire libre, buscá refugio inmediato en un edificio, casa o
      vehículo cerrado.
max_severity: warning
max_level: 3
area_id: 3402
updated: "2026-01-10T14:11:51-03:00"
```

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}