---
title: "credstash"
description: "Script to store credentials securely in AWS"
---

Using [Credstash](https://github.com/fugue/credstash) is an alternative way to `secrets.yaml`. They can be managed from the command line via the credstash script.

Before using credstash, you need to set up AWS credentials either via the `aws` command line tool or using environment variables as explained in the [AWS CLI documentation](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) as well as creating a KMS key named `credstash` as explained in the [credstash Readme](https://github.com/fugue/credstash#setting-up-kms). After that is complete, you can use the provided script to add secrets to your Home Assistant secret store in credstash.

```bash
hass --script credstash --help
```

To store a password in credstash, replace your password or API key with `!secret` and an identifier in `configuration.yaml` file.

```yaml
example:
  password: !secret example_password
```

Create an entry in your credstash store.

```bash
hass --script credstash put http_password 123
```

List your secrets.

```bash
hass --script credstash list
```
