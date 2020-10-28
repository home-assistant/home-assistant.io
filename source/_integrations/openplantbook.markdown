---
title: OpenPlantbook
description: Instructions on how to setup OpenPlantbook with Home Assistant.
ha_category:
  - Environment
ha_iot_class: Cloud Polling
ha_release: 0.116
ha_quality_scale: no score
ha_codeowners:
  - '@Olen'
ha_domain: openplantbook
---

The `openplantbook` component allows you to search and get data from the [OpenPlantbook API](https://open.plantbook.io/) 

## Configuration

The integration is set up using the GUI.  You must have a valid `Client ID` and `Client Secret` from OpenPlantbook to set up the integration.

### 1. Register at OpenPlantbook

* Go to https://open.plantbook.io/apikey/show/
* You can either create an account, or log in using other 3. party services like Github, Google or Facebook.
* After signing in, click on "API keys" on the left side Navigation menu.
* Click "Generate" under API Credentials to create a new Client ID and Client Secret.

### 2. Set up the integration in Home Assistant

* Go to Configuration -> Integrations.
* Click on the + in the bottom right corner to add a new integration.
* Search and select the OpenPlantbook integration from the list.
* Add the Client ID and Secret from the fist step, and click `Submit`.

## Services

Two services are added by this integration:

`openplantbook.search` searches the API for plants with an `alias` matching a search string. The search result is added to the entity `openplantbook.search_result` with the number of returned results as the `state` and a list of results in the state attributes.

```yaml
service: openplantbook.search
data:
  alias: Capsicum
```

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


`openplantbook.get` gets detailed data for a single plant. It takes a `spieces` (the same value that is used as `pid` in the `openplantbook.search_result`) as a parameter and the result is added to the entity `openplantbook.<species name>` with the different max/min values etc. set as attributes.

```yaml
service: openplantbook.get
data:
  species: capsicum annuum
```

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
All plant data is cached as it is not expected to change much.  However fresh plant data is fetched if the `get` service is run on a species where the data from a previous get is more than 24 hours old. If you have done many requests, and have a lot of entries under the `openplantbook.<species>` hierarchy, you can clean up the cache by issuing a `openplantbook.clean_cache` service.  The service accepts one (optional) paramater `hours` - the age of the data to keep cached (defaults to 24).


```yaml
service: openplantbook.clean_cache
data:
  hours: 6
```

This will remove all `openplantbook.*` entries older than 6 hours from the cache.
