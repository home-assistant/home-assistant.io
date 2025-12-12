---
title: "DNS server issues"
description: "More information on why issues with a DNS server marks the installation as unsupported."
---

## The issue

Home Assistant requires a working DNS server to function. Without one it may be
unable to provide functionality like checking and executing updates, showing
documentation, reach external services required by add-ons and integrations, etc.

## The solution

The easiest solution is to re-enable the fallback DNS option by executing the following
command in the CLI:

```sh
ha dns options --fallback=true
```

Alternatively review your system issues by executing the following command in the
CLI:

```sh
ha resolution info
```

You will see one or more issues with a context of `dns_server`. For each such issue,
take the following actions based on the issue type.

### `dns_server_failed`

1. Ensure the DNS server is operating normally
2. Ensure the DNS server has internet access
3. Ensure the hostname `_checkdns.home-assistant.io` is not blocked

### `dns_server_ipv6_error`

If you see this that means the application you are using for DNS is not handling
A and AAAA requests correctly. You can test this by executing the following commands:

```sh
server="<IP address of DNS server>"
dig "@$server" _checkdns.home-assistant.io +noall +comments +answer A
dig "@$server" _checkdns.home-assistant.io +noall +comments +answer AAAA
```

A DNS server handling A and AAAA requests correctly will respond with status `NOERROR`
for both of those queries even though there are no answers for the AAAA request.
A DNS server mishandling this request will only return a `NOERROR` response for
the first one and will return `NXDOMAIN`, `REFUSED`, `SERVFAIL` or some other error
status for the second.

It is important to use a DNS server that handles this situation correctly since
Home Assistant uses alpine for many of its containers. Alpine follows the DNS spec
and will treat the entire domain as if it can't be resolved if it receives an error
status for either query. Home Assistant will run into many unexpected issues in
this situation, particularly around updates and installing software.
