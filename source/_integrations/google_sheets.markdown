---
title: Google Sheets
description: Instructions on how to use Google Sheets in Home Assistant.
ha_category:
  - Utility
ha_iot_class: Cloud Polling
ha_release: '2022.10'
ha_config_flow: true
ha_domain: google_sheets
ha_codeowners:
  - '@tkdrob'
ha_integration_type: service
google_dev_console_link: https://console.developers.google.com/start/api?id=drive
api: Google Drive API
api_link: https://console.developers.google.com/start/api?id=drive
api2: Google Sheets API
api2_link: https://console.cloud.google.com/apis/enableflow?apiid=sheets.googleapis.com
---

The Google Sheets integration allows you to connect your [Google Drive](https://drive.google.com) to Home Assistant. The integration adds a service to allow you to append rows to a Sheets document. The idea is that you can store data on there for further processing. When you set up a config entry, your drive will have a new sheet called Home Assistant. You can then rename this to whatever you like.

**Note**:
The integration currently only has access to that one document that is created during setup.

## Prerequisites

You need to configure developer credentials to allow Home Assistant to access your Google Account.
These credentials are the same as the ones for [Nest](/integrations/nest), [YouTube](/integrations/youtube) and [Google Mail](/integrations/google_mail).
These are not the same as the one for [Google Calendar](/integrations/google).
If you have already set up the correct credentials, you can do step 1 and then skip to step 13 on the below instructions.

{% include integrations/google_client_secret.md %}

{% include integrations/config_flow.md %}

The integration setup will next give you instructions to enter the [Application Credentials](/integrations/application_credentials/) (OAuth Client ID and Client Secret) and authorize Home Assistant to access your Google Sheets.

{% details "OAuth and Device Authorization steps" %}

1. Continue through the steps of selecting the account you want to authorize.

2. **NOTE**: You may get a message telling you that the app has not been verified and you will need to acknowledge that in order to proceed.

3. You can now see the details of what you are authorizing Home Assistant to access with two options at the bottom. Click **Continue**.

4. The page will now display *Link account to Home Assistant?*, note *Your instance URL*. If this is not correct, please refer to [My Home Assistant](/integrations/my). If everything looks good, click **Link Account**.

5. You may close the window, and return back to Home Assistant where you should see a *Success!* message from Home Assistant.

{% enddetails %}

## Troubleshooting

If you have an error with your credentials you can delete them in the [Application Credentials](/integrations/application_credentials/) user interface.

### Video Tutorial
This video tutorial explains how to set up the Google Sheets integration and how you can add data from Home Assistant to a Google Sheet.

<lite-youtube videoid="hgGMgoxLYwo" videotitle="How to use Google Sheets in Home Assistant - TUTORIAL" posterquality="maxresdefault"></lite-youtube>

### Service `google_sheets.append_sheet`

You can use the service `google_sheets.append_sheet` to add a row of data to the Sheets document created at setup.

{% details "Create Event Service details" %}

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `config_entry` | no | Config entry to use.
| `worksheet` | yes | Name of the worksheet. Defaults to the first one in the document. | Sheet1
| `data` | no | Data to be appended to the worksheet. This puts the data on a new row, one value per column. | {"hello": world, "cool": True, "count": 5}

{% raw %}

```yaml
# Example service call
service: google_sheets.append_sheet
data:
  config_entry: 1b4a46c6cba0677bbfb5a8c53e8618b0
  worksheet: "Car Charging"
  data:
    Date: "{{ now().strftime('%-d-%b-%y') }}"
    KWh: "{{ states('input_number.car_charging_kwh')|float(0) }}"
    Cost: "{{ states('input_number.car_charging_cost')|float(0) }}"
```

{% endraw %}

{% enddetails %}
