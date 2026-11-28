---
description: Follow the prices of Spanish fuel stations in Home Assistant with the official data of the Spanish Ministry (Geoportal Gasolineras).
ha_release: 2027.1
ha_domain: geoportal_gasolineras
related:
  - url: https://geoportalgasolineras.es
    title: Geoportal Gasolineras
  - url: https://datos.gob.es/en/catalogo/e05068001-precio-de-carburantes-en-las-gasolineras-espanolas
    title: Fuel prices open data (datos.gob.es)
---

The **Spain fuel prices (Geoportal Gasolineras)** {% term integration %} shows the prices of fuel stations in Spain. It uses the official fuel prices service of the Spanish Ministry, the same data shown on the [Geoportal Gasolineras](https://geoportalgasolineras.es) website. Every fuel station in Spain with public sales must report its prices to the Ministry.

Use it to:

- Know the price of your usual fuel stations.
- Compare stations before filling up.
- Get notified when the price of your fuel drops.

This integration only covers fuel stations in Spain.

## Prerequisites

No account or API key is needed.

{% include integrations/config_flow.md %}

Adding the integration creates a single **Spain fuel prices** entry. Then add your fuel stations to it.

### Add a fuel station

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Spain fuel prices**.
2. Select **Add fuel station**.
3. Select the province, the municipality and the fuel station.

{% configuration_basic %}
Province:
  description: Province where the fuel station is.
Municipality:
  description: Municipality where the fuel station is.
Fuel station:
  description: Fuel station whose prices you want to follow. Stations already added are not listed.
{% endconfiguration_basic %}

## Supported functionality

Each fuel station is a {% term device %}, named after its brand and municipality, such as "Repsol La Roda de Andalucía". If you add two stations with the same name, the address is added to the second one.

### Sensors

- **Price sensors**: one sensor for each fuel the station sells, in €/L (€/kg for natural gas, biogas, hydrogen and ammonia). If the station starts selling a new fuel, its sensor is added automatically.

## Examples

### Notify when diesel is cheap

```yaml
alias: "Cheap diesel"
triggers:
  - trigger: numeric_state
    entity_id: sensor.repsol_la_roda_de_andalucia_diesel_a
    below: 1.5
actions:
  - action: notify.mobile_app_phone
    data:
      message: "Diesel A is at {{ states('sensor.repsol_la_roda_de_andalucia_diesel_a') }} €/L"
```

## Data updates

The integration {% term polling polls %} the Ministry every 30 minutes, which is how often the Ministry publishes new prices. It makes one request for each municipality, however many stations you have in it.

The integration does not modify the prices.

## Known limitations

- Only stations with public sales are listed. Stations that only sell to members or fleets, such as agricultural cooperatives, are not included in the Ministry's open data.

## Troubleshooting

### Cannot connect

The Ministry's service is sometimes slow or unavailable. The integration tries again on the next update; until then, the sensors are unavailable.

### A price sensor is unavailable

The station stopped selling that fuel, or it is no longer listed by the Ministry. If it sells the fuel again, the sensor becomes available again.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

To remove a single fuel station, select the {% icon "mdi:dots-vertical" %} menu next to it and select **Delete**.

{% include integrations/remove_device_service.md %}
