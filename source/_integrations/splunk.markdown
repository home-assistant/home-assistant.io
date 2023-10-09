---
title: Splunk
description: Record events in Splunk.
ha_category:
  - History
ha_iot_class: Local Push
ha_release: 0.13
ha_domain: splunk
ha_codeowners:
  - '@Bre77'
ha_integration_type: integration
---

The Splunk integration sends all state changes in Home Assistant to an external [Splunk](https://splunk.com/) instance using it's HTTP Event Collector (HEC) feature.

## Prerequisites

A HTTP Event Collector compatible endpoint and token, for example [Splunk Enterprise](https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector), [Splunk Cloud](https://docs.splunk.com/Documentation/SplunkCloud/latest/Data/UsetheHTTPEventCollector), [Splunk Edge Processor](https://docs.splunk.com/Documentation/SplunkCloud/latest/EdgeProcessor/HECSource), [Cribl](https://docs.cribl.io/stream/sources-splunk-hec/), [Vector](https://vector.dev/docs/reference/configuration/sources/splunk_hec/), or [LogScale](https://library.humio.com/integrations/log-shippers-hec.html).

{% include integrations/config_flow.md %}

