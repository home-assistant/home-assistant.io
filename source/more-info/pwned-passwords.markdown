---
title: "Pwned passwords and secrets"
description: "More information on detected pwned secrets in Home Assistant."
---

We are using the [Have I Been Pwned (HIBP)](https://haveibeenpwned.com/Passwords) service for detecting leaked secrets.

If you are getting a warning, it means that you are using secrets in your configuration which have been leaked and are publicly known.
You should immediately update this secrets.

We use [K-Anonymity](https://blog.cloudflare.com/validating-leaked-passwords-with-k-anonymity/) to send secure and anonyme 5 characters from a 40 characters hashed password.
