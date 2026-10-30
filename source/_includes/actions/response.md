{% if page.response == "required" %}
This action always returns data, so the response variable is required. If you leave it out, the action fails when it runs. Use the response variable to store the data for later steps of the same automation or script. For details, refer to [Action response data](/docs/automation/action/#action-response-data).
{% elsif page.response == "optional" %}
This action can return data. The response variable is optional. If you set it, you can use the data in later steps of the same automation or script. For details, refer to [Action response data](/docs/automation/action/#action-response-data).
{% endif %}
