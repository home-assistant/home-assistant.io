---
layout: page
title: "Tools"
description: "Description of tools which helps when using Home Assistant."
release_date: 2017-02-23 11:00:00
sidebar: true
comments: false
sharing: true
footer: true
---

The command-line and the frontend which simplify common tasks, are helping with migrations, and ensure that Home Assistant runs properly. Please do not confuse those with Home Assistant's [script](/docs/scripts/) feature.

### {% linkable_title Configuration check %}

Test any changes to your `configuration.yaml` file before launching Home Assistant. This script allows you to test changes without the need to restart Home Assistant.

```bash
$ hass --script check_config
```

### {% linkable_title Existence of configuration %}

This script checks if the `configuration.yaml` file exists. If the file is not available, one is created.

```bash
$ hass --script ensure_config
```

### {% linkable_title Secrets %}

There is a method to store secrets outside of your `configuration.yaml` file. For further details, please refer to the [Storing Secrets](/docs/configuration/secrets/) documentation.

```bash
$ hass --script keyring
```

### {% linkable_title Benchmark %}

For testing the performance of Home Assistant the Benchmark script runs until you exit using Control+C.

Firing and handling of a million events.

```bash
$ hass --script benchmark async_million_events
```

### {% linkable_title Old scripts %}

Usually those scripts were only used when a massive update happened and was announced in the release notes.

- `db_migrator`: Migrate an existing SQLite database to the new schema.
- `influxdb_migrator`: Convert an old InfluxDB to the new format.
