---
layout: page
title: "Storing secrets"
description: "Storing secrets outside of your configuration.yaml."
date: 2016-07-01 08:30
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /topics/secrets/
---

The `configuration.yaml` file is a plain-text file, thus it is readable by anyone who has access to the file. The file contains passwords and API tokens which need to be redacted if you want to share your configuration. By using `!secrets` you can remove any private information from you configuration files. This separation can also help you to keep easier track of your passwords and API keys. As they are all stored at one place and no longer spread across the `configuration.yaml` file or even multiple yaml files if you [split up your configuration](/docs/configuration/splitting_configuration/).

### {% linkable_title Using secrets.yaml %}

The workflow for moving private information to `secrets.yaml` is very similar to the [splitting of the configuration](/docs/configuration/splitting_configuration/). Create a `secrets.yaml` file in your Home Assistant [configuration directory](/docs/configuration/).

The entries for password and API keys in the `configuration.yaml` file usually looks like the example below.

```yaml
http:
  api_password: YOUR_PASSWORD
```

Those entries need to be replaced with `!secret` and an identifier.

```yaml
http:
  api_password: !secret http_password
```

The `secrets.yaml` file contains the corresponding password assigned to the identifier.

```yaml
http_password: YOUR_PASSWORD
```

### {% linkable_title Debugging secrets %}

When you start splitting your configuration into multiple files, you might end up with configuration in sub folders. Secrets will be resolved in this order:

- A `secrets.yaml` located in the same folder as the YAML file referencing the secret,
- next, parent folders will be searched for a `secrets.yaml` file with the secret, stopping at the folder with the main `configuration.yaml`,
- lastly, `keyring` will be queried for the secret (more info below)

To see where secrets are being loaded from you can either add an option to your `secrets.yaml` file or use the `check_config` script.

*Option 1*: Print where secrets are retrieved from to the Home Assistant log by adding the following to `secrets.yaml`:

```yaml
logger: debug
```
This will not print the actual secret's value to the log.

*Option 2*: View where secrets are retrieved from and the contents of all `secrets.yaml` files used, you can use the `check_config` script from the command line:

```bash
$ hass --script check_config --secrets
```
This will print all your secrets.

### {% linkable_title Storing passwords in a keyring managed by your OS %}

Using [Keyring](https://github.com/jaraco/keyring) is an alternative way to `secrets.yaml`. They can be managed from the command line via the `keyring` script.

```bash
$ hass --script keyring --help
```

To store a password in keyring, replace your password or API key with `!secret` and an identifier in `configuration.yaml` file.

```yaml
http:
  api_password: !secret http_password
```

Create an entry in your keyring.

```bash
$ hass --script keyring set http_password
```

If you launch Home Assistant now, you will be prompted for the keyring password to unlock your keyring.

```bash
$ hass
Config directory: /home/fab/.homeassistant
Please enter password for encrypted keyring:
```

<p class='note warning'>
  If you are using the Python Keyring, [autostarting](/getting-started/autostart/) of Home Assistant will no longer work.
</p>

### {% linkable_title Storing passwords securely in AWS %}

Using [Credstash](https://github.com/fugue/credstash) is an alternative way to `secrets.yaml`. They can be managed from the command line via the credstash script.

Before using credstash, you need to set up AWS credentials either via the `aws` command line tool, or using environment variables as explained in the [AWS CLI docs](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) as well as creating a KMS key named 'credstash' as explained in the [credstash readme](https://github.com/fugue/credstash#setting-up-kms). After that is complete, you can use the provided script to add secrets to your Home Assistant secret store in credstash

```bash
$ hass --script credstash --help
```

To store a password in credstash, replace your password or API key with `!secret` and an identifier in `configuration.yaml` file.

```yaml
http:
  api_password: !secret http_password
```

Create an entry in your credstash store.

```bash
$ hass --script credstash set http_password
```
