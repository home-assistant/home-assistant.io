---
title: "Query"
action: sql.query
domain: sql
description: "Executes a read-only SQL query and returns the result."
---

The **Query** action runs a read-only `SELECT` query against a database and returns the rows it finds.

This is useful when you want an automation or script to pull data on demand, for example to look up recent history or summarize values, without creating a dedicated sensor for it. Only `SELECT` statements are allowed.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Instead, you enter the query to run, and optionally the database to run it against.

{% include actions/ui_header.md %}

To run a query from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **SQL: Query**.
6. Enter the **Query**, and optionally a **Database URL**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Query:
  description: The `SELECT` query to run. Only `SELECT` statements are allowed.
  required: true
Database URL:
  description: The URL of the database to connect to. If not provided, the default Home Assistant recorder database is used.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sql.query`. Because this action returns data, use `response_variable` to capture the result. A basic example looks like this:

{% example %}
action: |
  action: sql.query
  data:
    query: |-
      SELECT
        states.state,
        last_updated_ts
      FROM
        states
        INNER JOIN states_meta ON
          states.metadata_id = states_meta.metadata_id
      WHERE
        states_meta.entity_id = 'sun.sun'
      ORDER BY
        last_updated_ts DESC
      LIMIT
        3;
  response_variable: sun_history
{% endexample %}

This runs the query and stores the result in the `sun_history` variable.

### Options in YAML

{% options_yaml %}
query:
  description: >
    The `SELECT` query to run. Only `SELECT` statements are allowed.
  required: true
  type: string
db_url:
  description: >
    The URL of the database to connect to. If not provided, the default
    Home Assistant recorder database is used.
  required: false
  type: string
{% endoptions_yaml %}

## Response data

The action returns a `result`, which is a list of rows. Each row is a mapping of column names to their values.

The data returned by the database is converted to be compatible with the action response. The following conversions are applied:

- `Decimal` types are converted to floats.
- `date` and `datetime` objects are converted to ISO 8601 formatted strings.
- `bytes` and `bytearray` are converted to a hexadecimal string prefixed with `0x`.
- All other basic types (string, integer, float, and boolean) are returned as is.

For the example above, the response looks similar to this:

{% example %}
output: |
  result:
    - state: below_horizon
      last_updated_ts: 1760634101.8498254
    - state: below_horizon
      last_updated_ts: 1760633981.849044
    - state: below_horizon
      last_updated_ts: 1760633861.848531
{% endexample %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
