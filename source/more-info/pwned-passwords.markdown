---
title: "Pwned passwords and secrets"
description: "More information on detected pwned secrets in Home Assistant."
---

Home Assistant can check whether the secrets you use, such as passwords, are known to have been leaked in public data breaches. It uses the [Have I Been Pwned (HIBP)](https://haveibeenpwned.com/Passwords) service for this check.

Your secrets are never sent anywhere. The check uses an algorithm called [K-Anonymity][k-anonymity] that makes sure the service never sees your password, not even its complete hash. Your secrets and privacy stay protected.

It looks at app options that are marked as passwords and warns you if any of them appear in known breaches.

If you get a warning, it means you are using a secret that has been leaked and is publicly known. It is strongly advised to replace it with a more secure alternative as soon as possible. Reusing a leaked password makes your system easier to compromise.

[Read more about K-Anonymity in this Cloudflare blog post][k-anonymity].

## Turning off the pwned secrets check

{% note %}
This option is available on installations that use the {% term "Home Assistant Supervisor" %}, such as {% term "Home Assistant Operating System" %}.
{% endnote %}

The check is on by default. If you prefer not to run it, you can turn it off using the [command line](/common-tasks/os/#home-assistant-via-the-command-line):

```bash
ha security options --pwned=false
```

To turn the check back on again, run:

```bash
ha security options --pwned=true
```

[k-anonymity]: https://blog.cloudflare.com/validating-leaked-passwords-with-k-anonymity/
