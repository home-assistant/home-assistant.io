---
title: "Pwned passwords and secrets"
description: "What the warning about insecure secrets in an app means, how to find and replace the leaked password, and how the check protects your privacy."
---

On installations that use the {% term "Home Assistant Supervisor" %}, such as {% term "Home Assistant Operating System" %}, Home Assistant can check whether the passwords in your app configurations have appeared in known data breaches. It uses the [Pwned Passwords](https://haveibeenpwned.com/Passwords) service of Have I Been Pwned (HIBP) for this check. A password that has appeared in a data breach is also called pwned.

Your passwords are never sent anywhere. Home Assistant only sends the first 5 characters of a fingerprint of each password, from which the password can't be read back. For details, refer to [How the check protects your passwords](#how-the-check-protects-your-passwords).

Starting with Supervisor 2026.10.3, the check is off by default. On older versions, or if security settings were previously saved with the check enabled, it can run even if you did not turn it on explicitly. For the steps to turn it on or off, refer to [Turning the check on or off](#turning-the-check-on-or-off).

## What the warning means

If the check finds a leaked password, Home Assistant shows a repair under {% my repairs title="**Settings** > **System** > **Repairs**" %}: **Insecure secrets detected in app configuration**. It tells you which app uses a password that has appeared in a data breach. For example: "App Samba share uses secrets/passwords in its configuration which are detected as not secure."

In this warning, secrets are the passwords in the configuration of an app. These are the options that the app shows as password fields. If an app reads a password from your `secrets.yaml` file, that password is checked too.

The warning names the app, but not the option or the account. The check only compares passwords, so it doesn't know which option or account a password belongs to. For example, if Mosquitto broker has several logins, the warning doesn't say which login uses the leaked password.

A leaked password is publicly known, so it makes your system easier to break into. Replace it as soon as possible.

## Finding and replacing a leaked password

1. Go to {% my supervisor title="**Settings** > **Apps**" %}, and select the app that the warning names.
2. Open the **Configuration** tab.
   - Under **Options**, look for the password fields. An app with a list, such as the logins of Mosquitto broker, can have a password field for each entry.
3. Find out which password is leaked:
   - If a password is short, common, or one that you also use elsewhere, it's the most likely candidate.
   - To check a password, enter it on the [Pwned Passwords](https://haveibeenpwned.com/Passwords) page. The page checks it in your browser, in the same private way as Home Assistant. For details, refer to [How the check protects your passwords](#how-the-check-protects-your-passwords).
   - If you can't tell which password it is, replace all of them.
4. Replace the leaked password with a new, unique password, and select **Save**.
   - If the password comes from your `secrets.yaml` file, change it there instead.
5. Update the password everywhere you use it. For example, in the devices that log in to Mosquitto broker, or on the computers that connect to the Samba share.
6. Restart the app.
   - Home Assistant checks the password again within about an hour. If it's no longer leaked, the warning goes away.

## How the check protects your passwords

The check never sends your passwords anywhere. It uses a method called [k-anonymity][k-anonymity]:

1. Home Assistant creates a SHA-1 hash of each password. A hash is a fingerprint of the password, from which the password can't be read back.
2. Home Assistant sends only the first 5 characters of that hash to the Pwned Passwords service.
3. The service returns all leaked password hashes that start with those 5 characters. That's usually hundreds of hashes.
4. Home Assistant compares them with the complete hash on your own system.

The service never sees your password or its complete hash, so it can't tell which password you checked.

[Read more about k-anonymity in this Cloudflare blog post][k-anonymity].

<a id="turning-off-the-pwned-secrets-check"></a>

## Turning the check on or off

The check is off by default since Supervisor 2026.10.3. If you turned it on or off yourself before, your choice stays as it is.

### Prerequisites

- An installation that uses the {% term "Home Assistant Supervisor" %}, such as {% term "Home Assistant Operating System" %}.
  - Other installation types, such as Home Assistant Container, don't have apps and don't run this check.
- Access to the [command line](/common-tasks/os/#home-assistant-via-the-command-line) of Home Assistant.

### To turn the check on or off

1. Open the command line of Home Assistant.
2. Run one of the following commands:
   - To turn the check on:

     ```bash
     ha security options --pwned=true
     ```

   - To turn the check off:

     ```bash
     ha security options --pwned=false
     ```

[k-anonymity]: https://blog.cloudflare.com/validating-leaked-passwords-with-k-anonymity/
