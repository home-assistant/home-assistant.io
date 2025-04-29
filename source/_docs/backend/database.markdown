---
title: "Database"
description: "Details about the database used by Home Assistant."
---

Home Assistant uses databases to store {% term events %} and parameters for history and tracking. The default database used is [SQLite](https://www.sqlite.org/).

The database file is stored in your [configuration directory](/docs/configuration/#to-find-the-configuration-directory) (e.g., `<path to config dir>/home-assistant_v2.db`); however, other databases can be used. If you prefer to run a database server (e.g.,  PostgreSQL), use the [`recorder`](/integrations/recorder/) integration.

To work with SQLite database manually from the command-line, you will need an [installation](https://www.sqlitetutorial.net/download-install-sqlite/) of `sqlite3`. Alternatively [DB Browser for SQLite](https://sqlitebrowser.org/) provides a viewer for exploring the database data and an editor for executing SQL commands.
First load your database with `sqlite3`:

```bash
$ sqlite3 home-assistant_v2.db
SQLite version 3.13.0 2016-05-18 10:57:30
Enter ".help" for usage hints.
sqlite>
```

It helps to set some options to make the output more readable:

```bash
sqlite> .header on
sqlite> .mode column
```

You could also start `sqlite3` and attach the database later. Not sure what database you are working with? Check it, especially if you are going to delete data.

```bash
sqlite> .databases
seq  name             file
---  ---------------  ----------------------------------------------------------
0    main             /home/fab/.homeassistant/home-assistant_v2.db
```

### Schema

Get all available tables from your current Home Assistant database:

```bash
sqlite> SELECT sql FROM sqlite_master;

-------------------------------------------------------------------------------------
CREATE TABLE event_data (
        data_id INTEGER NOT NULL,
        hash BIGINT,
        shared_data TEXT,
        PRIMARY KEY (data_id)
)

CREATE TABLE event_types (
        event_type_id INTEGER NOT NULL,
        event_type VARCHAR(64),
        PRIMARY KEY (event_type_id)
)

CREATE TABLE state_attributes (
        attributes_id INTEGER NOT NULL,
        hash BIGINT,
        shared_attrs TEXT,
        PRIMARY KEY (attributes_id)
)

CREATE TABLE states_meta (
        metadata_id INTEGER NOT NULL,
        entity_id VARCHAR(255),
        PRIMARY KEY (metadata_id)
)

CREATE TABLE statistics_meta (
        id INTEGER NOT NULL,
        statistic_id VARCHAR(255),
        source VARCHAR(32),
        unit_of_measurement VARCHAR(255),
        has_mean BOOLEAN,
        has_sum BOOLEAN,
        name VARCHAR(255),
        PRIMARY KEY (id)
)

CREATE TABLE recorder_runs (
        run_id INTEGER NOT NULL,
        start DATETIME NOT NULL,
        "end" DATETIME,
        closed_incorrect BOOLEAN NOT NULL,
        created DATETIME NOT NULL,
        PRIMARY KEY (run_id)
)

CREATE TABLE migration_changes (
        migration_id VARCHAR(255) NOT NULL,
        version SMALLINT NOT NULL,
        PRIMARY KEY (migration_id)
)



CREATE TABLE schema_changes (
        change_id INTEGER NOT NULL,
        schema_version INTEGER,
        changed DATETIME NOT NULL,
        PRIMARY KEY (change_id)
)

CREATE TABLE statistics_runs (
        run_id INTEGER NOT NULL,
        start DATETIME NOT NULL,
        PRIMARY KEY (run_id)
)

CREATE TABLE events (
        event_id INTEGER NOT NULL,
        event_type CHAR(0),
        event_data CHAR(0),
        origin CHAR(0),
        origin_idx SMALLINT,
        time_fired CHAR(0),
        time_fired_ts FLOAT,
        context_id CHAR(0),
        context_user_id CHAR(0),
        context_parent_id CHAR(0),
        data_id INTEGER,
        context_id_bin BLOB,
        context_user_id_bin BLOB,
        context_parent_id_bin BLOB,
        event_type_id INTEGER,
        PRIMARY KEY (event_id),
        FOREIGN KEY(data_id) REFERENCES event_data (data_id),
        FOREIGN KEY(event_type_id) REFERENCES event_types (event_type_id)
)

CREATE TABLE states (
        state_id INTEGER NOT NULL,
        entity_id CHAR(0),
        state VARCHAR(255),
        attributes CHAR(0),
        event_id SMALLINT,
        last_changed CHAR(0),
        last_changed_ts FLOAT,
        last_reported_ts FLOAT,
        last_updated CHAR(0),
        last_updated_ts FLOAT,
        old_state_id INTEGER,
        attributes_id INTEGER,
        context_id CHAR(0),
        context_user_id CHAR(0),
        context_parent_id CHAR(0),
        origin_idx SMALLINT,
        context_id_bin BLOB,
        context_user_id_bin BLOB,
        context_parent_id_bin BLOB,
        metadata_id INTEGER,
        PRIMARY KEY (state_id),
        FOREIGN KEY(old_state_id) REFERENCES states (state_id),
        FOREIGN KEY(attributes_id) REFERENCES state_attributes (attributes_id),
        FOREIGN KEY(metadata_id) REFERENCES states_meta (metadata_id)
)

CREATE TABLE statistics (
        id INTEGER NOT NULL,
        created CHAR(0),
        created_ts FLOAT,
        metadata_id INTEGER,
        start CHAR(0),
        start_ts FLOAT,
        mean FLOAT,
        min FLOAT,
        max FLOAT,
        last_reset CHAR(0),
        last_reset_ts FLOAT,
        state FLOAT,
        sum FLOAT,
        PRIMARY KEY (id),
        FOREIGN KEY(metadata_id) REFERENCES statistics_meta (id) ON DELETE CASCADE
)

CREATE TABLE statistics_short_term (
        id INTEGER NOT NULL,
        created CHAR(0),
        created_ts FLOAT,
        metadata_id INTEGER,
        start CHAR(0),
        start_ts FLOAT,
        mean FLOAT,
        min FLOAT,
        max FLOAT,
        last_reset CHAR(0),
        last_reset_ts FLOAT,
        state FLOAT,
        sum FLOAT,
        PRIMARY KEY (id),
        FOREIGN KEY(metadata_id) REFERENCES statistics_meta (id) ON DELETE CASCADE
)

CREATE TABLE sqlite_stat1(tbl,idx,stat)

CREATE INDEX ix_event_data_hash ON event_data (hash)

CREATE UNIQUE INDEX ix_event_types_event_type ON event_types (event_type)

CREATE INDEX ix_state_attributes_hash ON state_attributes (hash)

CREATE UNIQUE INDEX ix_states_meta_entity_id ON states_meta (entity_id)

CREATE UNIQUE INDEX ix_statistics_meta_statistic_id ON statistics_meta (statistic_id)

CREATE INDEX ix_recorder_runs_start_end ON recorder_runs (start, "end")

CREATE INDEX ix_statistics_runs_start ON statistics_runs (start)

CREATE INDEX ix_events_data_id ON events (data_id)

CREATE INDEX ix_events_event_type_id_time_fired_ts ON events (event_type_id, time_fired_ts)

CREATE INDEX ix_events_context_id_bin ON events (context_id_bin)

CREATE INDEX ix_events_time_fired_ts ON events (time_fired_ts)

CREATE INDEX ix_states_attributes_id ON states (attributes_id)

CREATE INDEX ix_states_metadata_id_last_updated_ts ON states (metadata_id, last_updated_ts)

CREATE INDEX ix_states_old_state_id ON states (old_state_id)

CREATE INDEX ix_states_context_id_bin ON states (context_id_bin)

CREATE INDEX ix_states_last_updated_ts ON states (last_updated_ts)

CREATE UNIQUE INDEX ix_statistics_statistic_id_start_ts ON statistics (metadata_id, start_ts)

CREATE INDEX ix_statistics_start_ts ON statistics (start_ts)

CREATE INDEX ix_statistics_short_term_start_ts ON statistics_short_term (start_ts)

CREATE UNIQUE INDEX ix_statistics_short_term_statistic_id_start_ts ON statistics_short_term (metadata_id, start_ts)
```

To only show the details about the `states` table (since we are using that one in the next examples):

```bash
sqlite> SELECT sql FROM sqlite_master WHERE type = 'table' AND tbl_name = 'states';
```

### Query

The identification of the available columns in the table is done and we are now able to create a query. Let's list your Top 10 entities:

```bash
sqlite> .width 30, 10,
sqlite> SELECT states_meta.entity_id, COUNT(*) as count FROM states INNER JOIN states_meta ON states.metadata_id = states_meta.metadata_id GROUP BY states_meta.entity_id ORDER BY count DESC LIMIT 10;
entity_id                       count
------------------------------  ----------
sensor.cpu                      28874
sun.sun                         21238
sensor.time                     18415
sensor.new_york                 18393
cover.kitchen_cover             17811
switch.mystrom_switch           14101
sensor.internet_time            12963
sensor.solar_angle1             11397
sensor.solar_angle              10440
group.all_switches              8018
```

### Delete

If you don't want to keep certain entities, you can delete them permanently by using the [actions provided by the recorder](/integrations/recorder/#action-purge_entities).

For a more interactive way of working with the database, check the [Data Science Portal](https://data.home-assistant.io/).
