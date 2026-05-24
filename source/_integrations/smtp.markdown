---
title: SMTP
description: Instructions on how to add email notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: pre 0.7
ha_domain: smtp
ha_platforms:
  - notify
ha_integration_type: integration
ha_quality_scale: legacy
---

The **SMTP** {% term integration %} allows you to deliver notifications from Home Assistant to an email recipient.

{% include integrations/config_flow.md %}

Check your email provider configuration or help pages to get the correct SMTP settings.
{% configuration %}
Sender email:
    description: "Email address that will appear in the From field."
    required: true
    type: string
Sender name:
    description: "Display name shown as the email sender."
    required: false
    type: string
Host:
    description: "Hostname or IP address of the SMTP server."
    required: true
    type: string
Port:
    description: "SMTP server port number."
    required: true
    type: string
Connection security:
    description: "Encryption method used for the SMTP connection."
    required: true
    type: string
Username:
    description: "Username used to authenticate with the SMTP server."
    required: false
    type: string
Password:
    description: "Password or app-specific password for the SMTP account."
    required: false
    type: string
Verify SSL certificate:
    description: "Enable certificate verification for secure SSL/TLS connections."
    required: true
    type: string
{% endconfiguration %}

### Usage

A notify integration will be created using the entry name without spaces. To use the SMTP notification, refer to it in an automation or script like in this example:

```yaml
- alias: "Send E-Mail Every Morning"
  triggers:
    - platform: time
      at: "08:00:00"
  actions:
    - action: notify.NOTIFIER_NAME
      data:
          title: "Good Morning"
          message: "Rise and shine"
          target:
            - "morning@example.com"
```

The optional `target` field is used to specify recipient(s) for this specific action. When `target` field is not used, this message will be sent to default recipient(s), specified as recipient subentries in integration. Line breaks can be added in the body part of the email by using `\r\n`, for instance `message: "Rise and shine\r\n\r\nIt's a brand new day!"`

Another example attaching images stored locally in a script:

```yaml
burglar:
  alias: "Burglar Alarm"
  sequence:
    - action: shell_command.snapshot
    - delay:
          seconds: 1
    - action: notify.NOTIFIER_NAME
      data:
          title: "Intruder alert"
          message: "Intruder alert at apartment!!"
          target:
            - "my_intruder_alert@example.com"
          data:
              images:
                  - /home/pi/snapshot1.jpg
                  - /home/pi/snapshot2.jpg
```

The optional `html` field makes a custom text/HTML multi-part message, allowing total freedom for sending rich HTML emails by defining the HTML content. In them, if you need to include images, you can pass both arguments (`html` and `images`). The images will be attached with the basename of the images, so they can be included in the html page with `src="cid:image_name.ext"`.

The optional `images` field adds image attachments to the email. If `html` is defined, the images need to be added to the message in-line as described above (and as shown in the example below). If `html` is not defined, images will be added as separate attachments.

{% important %}
When adding images, make sure the folders containing the attachments are added to `allowlist_external_dirs`.<br>See: [Setup basic documentation](/integrations/homeassistant/#allowlist_external_dirs)
{% endimportant %}

```yaml
burglar:
  alias: "Burglar Alarm"
  sequence:
    - action: shell_command.snapshot
    - delay:
          seconds: 1
    - action: notify.NOTIFIER_NAME
      data:
          message: "Intruder alert at apartment!!"
          data:
            images:
              - /home/pi/snapshot1.jpg
              - /home/pi/snapshot2.jpg
            html: >
              <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
              <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
                  <head>
                      <meta charset="UTF-8">
                      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Intruder alert</title>
                      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css">
                      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
                      <style type="text/css">
                          @font-face {
                            font-family: 'Open Sans';
                            font-style: normal;
                            font-weight: 300;
                            src: local('Open Sans Light'), local('OpenSans-Light'), url(http://fonts.gstatic.com/s/opensans/v13/DXI1ORHCpsQm3Vp6mXoaTZS3E-kSBmtLoNJPDtbj2Pk.ttf) format('truetype');
                          }
                          h1,h2,h3,h4,h5,h6 {
                              font-family:'Open Sans',Arial,sans-serif;
                              font-weight:400;
                              margin:10px 0
                          }
                      </style>
                  </head>
                  <body>
                    <div class="jumbotron jumbotron-fluid" style="background-color: #f00a2d; color: white;">
                        <div class="container py-0">
                            <h1>Intruder alert at apartment!!</h1>
                        </div>
                    </div>
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-xs-12 col-md-6 px-0">
                          <img class="rounded" style="width: 100%;"
                              alt="snapshot1" src="cid:snapshot1.jpg" />
                        </div>
                        <div class="col-xs-12 col-md-6 px-0">
                          <img class="rounded" style="width: 100%;"
                              alt="snapshot2" src="cid:snapshot2.jpg" />
                        </div>
                      </div>
                      <br>
                    </div>
                  </body>
                  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js" integrity="sha384-6ePHh72Rl3hKio4HiJ841psfsRJveeS+aLoaEf3BWfS+gTF0XdAqku2ka8VddikM" crossorigin="anonymous"></script>
                  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/js/bootstrap.min.js" integrity="sha384-BLiI7JTZm+JWlgKa0M0kGRpJbF2J8q+qreVrKBC47e3K6BW78kGLrCkeRX6I9RoK" crossorigin="anonymous"></script>
              </html>
```

To learn more about how to use notifications in your automations, please see the [getting started with automation page](/getting-started/automation/).

## Specific email provider configuration

Check below some configurations examples for specific email providers.
If you are in doubt about the SMTP settings required, check your email provider configuration or help pages for more information about its specific SMTP configuration.

### Google Mail

Example configuration for Google Mail.

| **Parameter** | Value |
| -------- | ------------- |
| **Host** | smtp.gmail.com |
| **Port** | 587 |
| **Sender email** | YOUR_USERNAME@gmail.com |
| **Sender name** | SENDER_NAME |
| **Connection security** | STARTTLS |
| **Username** | YOUR_USERNAME@gmail.com |
| **Password** | YOUR_APP_PASSWORD |

Google has some extra layers of protection that need special attention. You must use [an application-specific password](https://support.google.com/mail/answer/185833) in your notification configuration.

If any of the following conditions are met you will not be able to create an app password:

- You do not have 2-step verification enabled on your account.
- You have 2-step verification enabled but have only added a security key as an authentication mechanism.
- Your Google account is enrolled in Google's [Advanced Protection Program](https://landing.google.com/advancedprotection/).
- Your Google account belongs to a Google Workspace that has disabled this feature. Accounts owned by a school, business, or other organization are examples of Google Workspace accounts.
