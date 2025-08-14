---
title: "Security"
description: "Home Assistant takes its security seriously. This page contains information about how we handle security issues, how to report them, and also information on past security issues."
---

Home Assistant takes its security seriously. We will do everything in our power to ensure that our users are safe.

This page is intended to provide information about how to report security issues with us, and how they are handled. Additionally, it provides details about reported security issues we have [handled in the past](#past-advisories).

## Reporting a vulnerability

So, you have found a security vulnerability in Home Assistant? Please, be sure to [**responsibly disclose**](https://en.wikipedia.org/wiki/Coordinated_vulnerability_disclosure) it to us by [reporting a vulnerability using GitHub's Security Advisory](https://github.com/home-assistant/core/security/advisories/new).

**DO NOT MAKE A PUBLIC ISSUE FOR SECURITY VULNERABILITIES!**

We are mostly interested in reports by actual Home Assistant users that are familiar with the platform, but all high quality contributions are welcome. Please do your best to describe a clear and realistic impact for your report.

For the sake of the security of our users, please 🙏 do not make vulnerabilities public without notifying us and giving us at least 90 days to release a fixed version. We will do our best to respond to your report within 7 days and also to keep you informed of the progress of our efforts to resolve the issue, but understand that Home Assistant, like many open source projects, is relying heavily on volunteers that aren't full-time resources. We may not be able to respond as quickly as you would like due to other responsibilities.

If you are going to write about Home Assistant’s security, please [get in touch](mailto:hello@home-assistant.io), so we can ensure that all claims are correct.

### Non-qualifying vulnerabilities

We will not accept reports of vulnerabilities of the following types:

- Reports from automated tools or scanners.
- Theoretical attacks without proof of exploitability.
- Attacks that are the result of a third-party application or library (these should instead be reported to the library maintainers).
- Social engineering.
- Attacks that require the user to have access to the Home Assistant host system.
- Attacks involving physical access to a user’s device, or involving a device or network that’s already seriously compromised (like, man-in-the-middle).
- Attacks that require the user to install a malicious other software, like a third-party integration, add-on, or plugin.
- Attacks that the user can only perform against their own setup.
- Privilege escalation attacks for logged in users. Home Assistant assumes every user is trusted and does not enforce user privileges. It assumes every logged in user has the same access as an owner account ([more information](/docs/authentication/#user-accounts)).

### Supported versions

We only accept reports against the latest stable & official versions of Home Assistant or any versions beyond that are currently in development or beta test. The latest version can be found on our [GitHub releases page](https://github.com/home-assistant/core/releases).

We do not accept reports against forks of Home Assistant.

### Severity scoring

If you are familiar with [CVSS3.1](https://www.first.org/cvss/v3.1/specification-document), please provide the vulnerability score in your report in the shape of a vector string. There’s a [calculator](https://www.first.org/cvss/calculator/3.1) that can be helpful. If you are unsure how or unable to score a vulnerability, state that in your report, and we will look into it.

If you intend to provide a score, please familiarize yourself with CVSS first (we strongly recommend reading the [Specification](https://www.first.org/cvss/v3.1/specification-document) and [Scoring Guide](https://www.first.org/cvss/v3.1/user-guide#Scoring-Guide)), as we will not accept reports that use it incorrectly.

### Public disclosure & CVE assignment

We will publish GitHub Security Advisories and through those, will also request CVEs, for valid vulnerabilities that meet the following criteria:

- The vulnerability is in Home Assistant itself, not a third-party library.
- The vulnerability is not already known to us.
- The vulnerability is not already known to the public.
- CVEs will only be requested for vulnerabilities with a severity of medium or higher.

### Bounties

As an open source project, Home Assistant cannot offer bounties for security vulnerabilities. However, if so desired, we of course will credit the discoverer of a vulnerability.

## Past advisories

The following is a list of past security advisories that have been published by the Home Assistant project.

**2025-02-18: SSL validation for outgoing requests in core and used libs not correct**  
Severity: _High (CVSS: 7.0)_  
Detailed information: _[Security advisory](https://github.com/home-assistant/core/security/advisories/GHSA-m3pm-rpgg-5wj6)_  
Assigned CVE: _[CVE-2025-25305](https://nvd.nist.gov/vuln/detail/CVE-2025-25305)_  
Discovered by: _[ReneNulschDE](https://github.com/ReneNulschDE)_  
Fixed in: _Home Assistant Core 2024.1.6_  

**2023-12-14: User accounts disclosed to unauthenticated actors on the LAN**  
Severity: _Moderate (CVSS: 4.2)_  
Detailed information: _[Security advisory](https://github.com/home-assistant/core/security/advisories/GHSA-jqpc-rc7g-vf83)_  
Assigned CVE: _[CVE-2023-50715](https://nvd.nist.gov/vuln/detail/CVE-2023-50715)_  
Discovered by: _[r01k](https://github.com/r01k)_  
Fixed in: _Home Assistant Core 2023.12.3_  

**2023-10-19: Actions expression injection in `helpers/version/action.yml`**  
Severity: _Low (This is an internal project)_  
Detailed information: _[Security advisory](https://github.com/home-assistant/core/security/advisories/GHSA-jff5-5j3g-vhqc)_  
Discovered by: _[Jorge Rosillo](https://github.com/jorgectf), [Peter Stöckli](https://github.com/p-) ([GitHub Security Lab](https://securitylab.github.com/))_  
Fixed in: _Home Assistant GitHub Actions released on September 5, 2023_  

**2023-10-19: Arbitrary URL load in Android WebView in `MyActivity.kt`**  
Severity: _High (CVSS: 8.6)_  
Detailed information: _[Security advisory](https://github.com/home-assistant/core/security/advisories/GHSA-jvpm-q3hq-86rg)_  
Assigned CVE: _[CVE-2023-41898](https://nvd.nist.gov/vuln/detail/CVE-2023-41898)_  
Discovered by: _[Tony Torralba](https://github.com/atorralba) ([GitHub Security Lab](https://securitylab.github.com/))_  
Fixed in: _Home Assistant for Android 2023.9.2_  

**2023-10-19: Partial Server-Side Request Forgery in Core**  
Severity: _Low_  
Detailed information: _[Security advisory](https://github.com/home-assistant/core/security/advisories/GHSA-4r74-h49q-rr3h)_  
Assigned CVE: _[CVE-2023-41899](https://nvd.nist.gov/vuln/detail/CVE-2023-41899)_  
Discovered by: _[Alvaro Muñoz](https://github.com/pwntester) ([GitHub Security Lab](https://securitylab.github.com/))_  
Fixed in: _Home Assistant Core 2023.9_  

**2023-10-19: Client-Side Request Forgery in iOS/macOS native Apps**  
Severity: _High (CVSS: 8.6)_  
Detailed information: _[Security advisory](https://github.com/home-assistant/core/security/advisories/GHSA-h2jp-7grc-9xpp)_  
Assigned CVE: _[CVE-2023-44385](https://nvd.nist.gov/vuln/detail/CVE-2023-44385)_  
Discovered by: _[Alvaro Muñoz](https://github.com/pwntester) ([GitHub Security Lab](https://securitylab.github.com/))_  
Fixed in: _Home Assistant for iOS 2023.7_  

**2023-10-19: Account takeover via auth_callback login**  
Severity: _Low_  
Detailed information: _[Security advisory](https://github.com/home-assistant/core/security/advisories/GHSA-qhhj-7hrc-gqj5)_  
Assigned CVE: _[CVE-2023-41893](https://nvd.nist.gov/vuln/detail/CVE-2023-41893)_  
Discovered by: _[Cure53](https://cure53.de/) (Funded by [Nabu Casa](https://www.nabucasa.com/))_  
Fixed in: _Home Assistant Core 2023.9_  

**2023-10-19: Full takeover via javascript URI in auth_callback login**  
Severity: _Critical_  
Detailed information: _[Security advisory](https://github.com/home-assistant/core/security/advisories/GHSA-jvxq-x42r-f7mv)_  
Assigned CVE: _[CVE-2023-41895](https://nvd.nist.gov/vuln/detail/CVE-2023-41895)_  
Discovered by: _[Cure53](https://cure53.de/) (Funded by [Nabu Casa](https://www.nabucasa.com/))_  
Fixed in: _Home Assistant Core 2023.9_  

**2023-10-19: Local-only webhooks externally accessible via SniTun**  
Severity: _Low_  
Detailed information: _[Security advisory](https://github.com/home-assistant/core/security/advisories/GHSA-wx3j-3v2j-rf45)_  
Assigned CVE: _[CVE-2023-41894](https://nvd.nist.gov/vuln/detail/CVE-2023-41894)_  
Discovered by: _[Cure53](https://cure53.de/) (Funded by [Nabu Casa](https://www.nabucasa.com/))_  
Fixed in: _Home Assistant Core 2023.9_  

**2023-10-19: Fake WS server installation permits full takeover**  
Severity: _Critical_  
Detailed information: _[Security advisory](https://github.com/home-assistant/core/security/advisories/GHSA-cr83-q7r2-7f5q)_  
Assigned CVE: _[CVE-2023-41896](https://nvd.nist.gov/vuln/detail/CVE-2023-41896)_  
Discovered by: _[Cure53](https://cure53.de/) (Funded by [Nabu Casa](https://www.nabucasa.com/))_  
Fixed in: _Home Assistant Core 2023.9 & `home-assistant-js-websocket` 8.2.0 (npm)_  

**2023-10-19: Lack of XFO header allows clickjacking**  
Severity: _Critical_  
Detailed information: _[Security advisory](https://github.com/home-assistant/core/security/advisories/GHSA-935v-rmg9-44mw)  
Assigned CVE: _[CVE-2023-41897](https://nvd.nist.gov/vuln/detail/CVE-2023-41897)_  
Discovered by: _[Cure53](https://cure53.de/) (Funded by [Nabu Casa](https://www.nabucasa.com/))_  
Fixed in: _Home Assistant Core 2023.9_  

**2023-03-08: Authentication bypass Supervisor API**  
Severity: _Critical (CVSS: 10.0)_  
Detailed information: _[Security advisory](https://github.com/home-assistant/core/security/advisories/GHSA-2j8f-h4mr-qr25)_  
Assigned CVE: _[CVE-2023-27482](https://nvd.nist.gov/vuln/detail/CVE-2023-27482)_  
Discovered by: _[Joseph Surin](https://jsur.in/) from [elttam](https://www.elttam.com/)_  
Fixed in: _Home Assistant Core 2023.3.2, Home Assistant Supervisor 2023.03.3_  

**2017-10-11: Cross-site scripting in Markdown output**  
Severity: _Medium (CVSS: 6.1)_  
Detailed information: _[Pull request](https://github.com/home-assistant/frontend/pull/514)_  
Assigned CVE: _[CVE-2017-16782](https://nvd.nist.gov/vuln/detail/CVE-2017-16782)_  
Discovered by: _Marcin Teodorczyk from [intive.com](https://intive.com/)_  
Fixed in: _Home Assistant Core 0.57_  

---

_This security page is heavily inspired by the one from [OctoPrint](https://octoprint.org). ❤️ If you are into 3D printing, check them out!_
