---
description: Instructions on how to integrate brottsplatskartan.se into Home Assistant.
ha_release: 0.85
ha_domain: brottsplatskartan
---

The **Brottsplatskartan** {% term integration %} allows one to track reported incidents occurring in a given area. Incidents include anything reported to [Brottsplatskartan](https://brottsplatskartan.se). The sensor only counts incidents from the current day.

{% include integrations/config_flow.md %}

## Notes

### Area

Brottsplatskartan captures all incidents in a region, for example, Stockholms län. If the area parameter is defined, any latitude and longitude parameters are ignored.

### Latitude and Longitude

The radius is set to 5 km when using latitude and longitude to monitor an area. It's not possible to explicitly set radius to another value.
