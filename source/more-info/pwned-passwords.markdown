---
title: "Pwned passwords and secrets"
description: "More information on detected pwned secrets in Home Assistant."
---

We are using the [Have I Been Pwned (HIBP)](https://haveibeenpwned.com/Passwords) service for detecting leaked or compromised secrets, like passwords.

If you get a warning about it, it means that you are using secrets in your configuration which have been leaked and are publicly known. It is strongly advised to change these secrets with a more secure alternative as soon as possible.

Please note; this feature does not send out your secrets to check this. Your secrets and privacy is guaranteed by a [K-Anonymity][k-anonymity]. Your secrets are hashed, the first 5 characters of the hash result are used to query Have I Been Pwned. Have I Been Pwned returns the results of possible password hashes that match, we check the last part of the password hash against this list locally.

[Read more about K-Anonymity on this CloudFlare blog post][k-anonymity].

[k-anonymity]: https://blog.cloudflare.com/validating-leaked-passwords-with-k-anonymity/
