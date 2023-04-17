---
title: "No URL Available"
description: "More information on how to resolve the No URL Available message in Home Assistant."
---

When Home Assistant serves you the "No URL Available" message, you are
probably trying to set up or configuring an integration that requires your
account to be linked.

## What happened

The authentication method for linking such an account is called OAuth2, and
is a modern and more common way of linking systems together, by logging in with
the provider of the data.

This means Home Assistant will redirect you to the provider to log in. After the
login is successful, the third-party provider will redirect you back to your
Home Assistant instance.

For the third-party to be able to redirect/link you back to Home Assistant
after authentication, Home Assistant needs to tell the third-party application
about the URL to access Home Assistant on / to redirect back to. Unfortunately,
if the "No URL Available" error occurs, Home Assistant hasn't been able to figure out
that URL.

## How to solve it

Home Assistant will try to find the URL you are currently using in your browser
to use as this redirect URL for the authentication. However, Home Assistant
is only able to determine this, if the URL is known in the configuration.

There are multiple options to consider:

### Using Nabu Casa Home Assistant Cloud

If you have Nabu Casa's Home Assistant Cloud, the easiest way to resolve this,
is by visiting your Home Assistant instance from the remote UI URL.

Go to **Settings** -> **Home Assistant Cloud**.

Visit your instance on the remote URL. Now you can set up the integration as normal, without getting the No URL
Available message.

### Using your instance by IP address

If you are on your home network, you can visit your instance using the IP
address of your instance.

For example, `https://192.168.1.2:8123`

Replace the IP with the IP address of your Home Assistant instance. If you
don't know this, you could also skip this and try the next solution.

Now you can set up the integration as normal, without getting the No URL
Available message.

### Configuring the instance URL

Another good solution is configuring the Home Assistant instance URL in
Home Assistant. By letting Home Assistant know about the URL you use to
access it, Home Assistant will be able to deal with that in a situation
like this.

Please note, you'll need to enable advanced mode in your user profile in order
to set this up.

Go to **Settings** -> **System** -> **Network**.

On this page, two fields that can resolve this issue: "Local Network"
and "Internet".

- **Local Network**: The URL you type in your browser when you are **at home**,
connected to your home network, e.g., `http://homeassistant.local:8123`
- **Internet**: The URL you type in your browser when you are **not home**,
connected to your home network, e.g., `https://example.duckdns.org`

Some additional notes:

- Don't use the Nabu Casa remote UI URL in any of these fields. The remote UI
  will automatically be handled correctly.
- If the address you use, is the same for both the "**at home**" and
  "**not home**" situations, it is recommend to only use the External URL field.
- The internal URL should preferably not use SSL (have `https://`) in it, as it
  might cause problems with casting to media devices.
- If you do not have an external address for your Home Assistant instance,
  leave that field empty.
- Ensure that the URL you provide matches the true address your browser uses to
  reach the instance. Many popular browsers will hide the www subdomain; if you
  try to configure `http://foo.bar`, but you're actually at `http://www.foo.bar`,
  OAuth will fail and you will receive this error. You can always check the
  actual domain by pasting `javascript:alert(document.location)` in your address
  bar and pressing enter.

After setting the URLs, click save. There is no need to restart Home Assistant
your changes are applied immediately.

Now you can set up the integration as normal, without getting the No URL
Available message.
