---
title: Zestimate
description: Instructions on how to integrate the Zestimate sensor into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.65
ha_iot_class: Cloud Polling
ha_domain: zestimate
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

The `zestimate` sensor allows one to track the Zestimate® value of properties using the [Zillow API](https://www.zillow.com/howto/api/APIOverview.htm). According to Zillow's website, a Zestimate® home valuation is Zillow's estimated market value. It is not an appraisal. Use it as a starting point to determine a home's value. The Zestimate® is provided by [Zillow](https://www.zillow.com), a website primarily for listing homes to buy/sell/rent in the United States.

This integration adds one entity per zpid specified, named `sensor.zestimate` with numbers appended if you choose to track more than one Zestimate.

## Configuration

You will need to sign up for the Zillow API at the following link [Zillow API](https://www.zillow.com/howto/api/APIOverview.htm). You will also need the Zillow property ID for each property you'd like to track. This information is available from the URL of a property you are interested in. If you're the owner of this property, it's recommended to claim the listing and update the property information to help the information be as accurate as possible.

For example, the White House zpid is 84074482 and can be found in its Zillow URL: [https://www.zillow.com/homedetails/1600-Pennsylvania-Ave-NW-Washington-DC-20006/84074482_zpid/](https://www.zillow.com/homedetails/1600-Pennsylvania-Ave-NW-Washington-DC-20006/84074482_zpid/)

To enable this sensor, add the following lines to your {% term "`configuration.yaml`" %}.

```yaml
sensor:
  - platform: zestimate
    api_key: YOUR_API_KEY
    zpid:
      - YOUR_ZPID_1
      - YOUR_ZPID_2
```

{% configuration %}
api_key:
  description: The API key to access the service. Obtain yours using the [Zillow API](https://www.zillow.com/howto/api/APIOverview.htm).
  required: true
  type: string
zpid:
  description: Property IDs to track in the front end. Can be found in its Zillow URL as described above. Include only the numbers, do not include the "_zpid".
  required: true
  type: list
{% endconfiguration %}

### Additional attributes

The following additional attributes are also available via the sensor.

These attributes are available:

- Last update
- 30 Day change in value
- Valuation Range High
- Valuation Range Low
- Address
- Currency
- Amount

Example screenshot:

<img src="/images/integrations/zestimate/zestimateexample.png" />
