---
title: OpenPlantbook
description: Instructions on how to setup OpenPlantbook with Home Assistant.
ha_category:
  - Environment
ha_iot_class: Cloud Polling
ha_release: 0.116
ha_quality_scale: internal
ha_codeowners:
  - '@Olen'
ha_domain: openplantbook
---

The `openplantbook` component allows you to search and get data from the [OpenPlantbook API](https://open.plantbook.io/) 

## Configuration

The integration is set up using the GUI.  You must have a valid `client_id` and `secret` from OpenPlantbook to set up the integration.

{% configuration %}
client_id:
  type: string
  description: The Client ID from https://open.plantbook.io/apikey/show/
secret:
  type: string
  description: The Client Secret from https://open.plantbook.io/apikey/show/
{% endconfiguration %}


## Examples

Two service calls are added by this integration:

`openplantbook.search` searches the API for plants matching a string. The search result is added to the entity `openplantbook.search_result` with the number of returned results as the `state` and a list of results in the state attributes.

{% raw %}

```yaml
service: openplantbook.search
data:
  alias: Capsicum
```

{% endraw %}

The result can then be read back from the attributes of the entity `openplantbook.search_result` once the search completes:

{% raw %}

```jinja2
Number of plants found: {{ states('openplantbook.search_result') }}
{%- for pid in states.openplantbook.search_result.attributes %}
  {%- set name = state_attr('openplantbook.search_result', pid) %}
  * {{pid}} -> {{name}}
{%- endfor %}
```

{% endraw %}

Which would produce 

Number of plants found: 40
  * capsicum annuum -> Capsicum annuum
  * capsicum baccatum -> Capsicum baccatum
  * capsicum bomba yellow red -> Capsicum Bomba yellow red
  * capsicum chinense -> Capsicum chinense
(...)


`openplantbook.get` gets detailed data for a single plant. It takes the `pid` from `openplantbook.search_result` as a parameter and the result is added to the entity `openplantbook.<species name>` with the different max/min values etc. set as attributes.

{% raw %}

```yaml
service: openplantbook.get
data:
  species: capsicum annuum
```

{% endraw %}

And the results can be found in `openplantbook.capsicum_annuum`:

{% raw %}

```jinja2
Details for plant {{ states('openplantbook.capsicum_annuum') }}
* Max moisture: {{ state_attr('openplantbook.capsicum_annuum', 'max_soil_moist') }}
* Min moisture: {{ state_attr('openplantbook.capsicum_annuum', 'min_soil_moist') }}
* Max temperature: {{ state_attr('openplantbook.capsicum_annuum', 'max_temp') }}
* Image: {{ state_attr('openplantbook.capsicum_annuum', 'image_url') }}
```

{% endraw %}

Which gives

Details for plant Capsicum annuum
* Max moisture: 65
* Min moisture: 20
* Max temperature: 35
* Image: https://.../capsicum%20annuum.jpg

## Caching
All plant data is cached as it is not expected to change much.  However fresh plant data is fetched if the `get` service is run on a species where the previous get was done more than 24 hours ago. If you have done many requests, and have a lot of entries under the `openplantbook.<species>` hierarchy, you can clean up the cache by issuing a `openplantbook.clean_cache` service.  The service takes one paramater - the age of the data to keep cached (defaults to 24).


{% raw %}

```yaml
service: openplantbook.clean_cache
data:
  hours: 6
```

{% endraw %}
This will remove all `openplantbook.*` entries older than 6 hours from the cache.
