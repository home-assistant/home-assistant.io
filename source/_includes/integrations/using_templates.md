### Using templates

For incoming data, a value template translates incoming JSON or raw data to a valid payload.
Incoming payloads are rendered with possible JSON values, so when rendering, the `value_json` can be used to access the attributes in a JSON based payload, otherwise the `value` variable can be used for non-json based data.

Additional, the `this` can be used as variables in the template. The `this` attribute refers to the current [entity state](/docs/configuration/state_object) of the entity.
Further information about `this` variable can be found in the [template documentation](/integrations/template/#template-and-action-variables)

{% note %}

**Example value template with json:**

With given payload:

```json
{ "state": "ON", "temperature": 21.902 }
```

Template {% raw %}`{{ value_json.temperature | round(1) }}`{% endraw %} renders to `21.9`.

{% endnote %}