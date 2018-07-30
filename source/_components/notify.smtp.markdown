---
layout: page
title: "SMTP"
description: "Instructions on how to add e-mail notifications to Home Assistant."
date: 2015-06-03 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: smtp.png
ha_category: Notifications
ha_release: pre 0.7
---


The `smtp` platform allows you to deliver notifications from Home Assistant to an e-mail recipient.

To enable notification by e-mail in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: smtp
    sender: YOUR_SENDER
    recipient: YOUR_RECIPIENT
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **sender** (*Required*): E-mail address of the sender.
- **recipient** (*Required*): E-mail address of the recipient of the notification. This can be a recipient address or a list of addresses for multiple recipients.
- **server** (*Optional*): SMTP server which is used to end the notifications. Defaults to `localhost`.
- **port** (*Optional*): The port that the SMTP server is using. Defaults to 587.
- **timeout** (*Optional*): The timeout in seconds that the SMTP server is using. Defaults to 5.
- **username** (*Optional*): Username for the SMTP account.
- **password** (*Optional*): Password for the SMTP server that belongs to the given username. If the password contains a colon it need to be wrapped in apostrophes.
- **encryption** (*Optional*): Set mode for encryption, `starttls`, `tls` or `none`. Defaults to `starttls`.
- **sender_name** (*Optional*): Sets a custom 'sender name' in the emails headers (*From*: Custom name <example@mail.com>).
- **debug** (*Optional*): Enables Debug, eg. `true` or `false`. Defaults to `false`.

A sample configuration entry for Google Mail.

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: smtp
    server: smtp.gmail.com
    port: 587
    timeout: 15
    sender: john@gmail.com
    encryption: starttls
    username: john@gmail.com
    password: thePassword
    recipient:
      - james@gmail.com
      - bob@gmail.com
    sender_name: My Home Assistant
```

Keep in mind that Google has some extra layers of protection which need special attention (Hint: 'Less secure apps'). If you have 2-step verification enabled on your Google account, you'll need to use [an application-specific password](https://support.google.com/mail/answer/185833?hl=en).

To use the SMTP notification, refer to it in an automation or script like in this example:

```yaml
  burglar:
    alias: Burglar Alarm
    sequence:
      - service: shell_command.snapshot
      - delay:
            seconds: 1
      - service: notify.NOTIFIER_NAME
        data:
            title: 'Intruder alert'
            message: 'Intruder alert at apartment!!'
            data:
                images:
                    - /home/pi/snapshot1.jpg
                    - /home/pi/snapshot2.jpg
```

The optional `images` field adds in-line image attachments to the email. This sends a text/HTML multi-part message instead of the plain text default.

The optional `html` field makes a custom text/HTML multi-part message, allowing total freedom for sending rich html emails. In them, if you need to attach images, you can pass both arguments (`html` and `images`), the attachments will be joined with the basename of the images, so they can be included in the html page with `src="cid:image_name.ext"`.

```yaml
  burglar:
    alias: Burglar Alarm
    sequence:
      - service: shell_command.snapshot
      - delay:
            seconds: 1
      - service: notify.NOTIFIER_NAME
        data_template:
            message: 'Intruder alert at apartment!!'
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
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/js/bootstrap.min.js"></script>
                </html>

```
Obviously, this kind of complex html email reporting is done much more conveniently using Jinja2 templating from an [AppDaemon app](/docs/ecosystem/appdaemon/tutorial/), for example.

This platform is fragile and not able to catch all exceptions in a smart way because of the large number of possible configuration combinations.

A combination that will work properly is port 587 and STARTTLS. It's recommended to enable STARTTLS, if possible.

Keep in mind that if the password contains a colon, it needs to be wrapped in apostrophes in the `configuration.yaml` file.

For Google Mail (smtp.gmail.com) an additional step in the setup process is needed. Google has some extra layers of protection
which need special attention. By default, the usage by external applications, especially scripts, is limited. Visit the [Less secure apps](https://www.google.com/settings/security/lesssecureapps) page and enable it.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
