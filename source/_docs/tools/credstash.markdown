---
layout: page
title: "credstash"
description: "Script to store credentials securely in AWS"
release_date: 2017-02-23 11:00:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /docs/configuration/secrets/#storing-passwords-securely-in-aws
---

Using [Credstash](https://github.com/fugue/credstash) is an alternative way to `secrets.yaml`. They can be managed from the command line via the credstash script.

Before using credstash, you need to set up AWS credentials either via the `aws` command line tool or using environment variables as explained in the [AWS CLI docs](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) as well as creating a KMS key named `credstash` as explained in the [credstash Readme](https://github.com/fugue/credstash#setting-up-kms). After that is complete, you can use the provided script to add secrets to your Home Assistant secret store in credstash.

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

