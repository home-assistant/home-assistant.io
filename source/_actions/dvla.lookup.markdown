---
title: "Lookup"
action: dvla.lookup
domain: dvla
description: "Looks up UK vehicle information from the DVLA Vehicle Enquiry Service."
---

Use this action to perform an ad-hoc lookup of a UK vehicle registration number.

The action returns the vehicle information in a response variable. It does not add the vehicle to Home Assistant and does not create entities.

{% include actions/ui_header.md %}

To look up a vehicle from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. In the **Then do** section, select **Add action**.
4. Search for and select **DVLA: Lookup**.
5. Enter the vehicle registration number.
6. In the **Response variable** field, enter a name to store the data, such as `vehicle`.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Registration number:
  description: The UK vehicle registration number to look up.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `dvla.lookup`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: dvla.lookup
  data:
    reg_number: AB12CDE
  response_variable: vehicle
{% endexample %}

### Options in YAML

{% options_yaml %}
reg_number:
  description: The UK vehicle registration number to look up.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response contains the vehicle fields returned by DVLA. Available fields depend on the vehicle record.

Common fields include:

- `registrationNumber`
- `make`
- `taxStatus`
- `taxDueDate`
- `motStatus`
- `motExpiryDate`
- `yearOfManufacture`
- `engineCapacity`
- `co2Emissions`
- `fuelType`
- `color`

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
