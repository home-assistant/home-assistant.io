#!/usr/bin/env python3
"""Audit every occurrence of "cloud" on the Home Assistant website.

Home Assistant Cloud is being renamed to Home Assistant Link. This script finds
every occurrence of "cloud" (case-insensitive) in the repository, records the
sentence around it, classifies whether it refers to Home Assistant Cloud, and
suggests a replacement where it does.

Usage (from the repository root):

    python3 tools/cloud-to-link-audit/audit.py

Output: tools/cloud-to-link-audit/occurrences.csv

The occurrence is wrapped in « » in the Context and Suggested replacement
columns. Manual decisions live in overrides.csv, keyed by file, line, and
column, and take precedence over the automatic classification.
"""

from __future__ import annotations

import csv
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import quote

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
OUT = HERE / "occurrences.csv"
OVERRIDES = HERE / "overrides.csv"

REPO_URL = "https://github.com/home-assistant/home-assistant.io"
SITE_URL = "https://www.home-assistant.io"
NEW_NAME = "Home Assistant Link"
RENAME_POST = "2026-10-02"

SKIP_PREFIXES = ("tools/cloud-to-link-audit/",)
SKIP_FILES = {"package-lock.json", "Gemfile.lock"}

CLOUD = re.compile(r"cloud", re.I)
HA_CLOUD = re.compile(r"Home[\s\-]Assistant(?:'s|’s)?\s+Cloud", re.I)
NC_CLOUD = re.compile(r"Nabu\s*Casa(?:'s|’s)?\s+Cloud", re.I)
SENT_SPLIT = re.compile(r"(?<=[.!?])[\"”)]?\s+(?=[A-Z\[*\"“(<{_`])")

# Spans that are not prose.
RE_MD_URL = re.compile(r"\]\(([^)\s]*)[^)]*\)")
RE_REF_URL = re.compile(r"^\s*\[[^\]]+\]:\s*(\S+)")
RE_ATTR_URL = re.compile(
    r"\b(?:href|src|srcset|poster|data-src|content|action|url|link|image|og_image|logo|permalink|redirect_from|feedback_link)\s*[=:]\s*[\"']?([^\"'\s>]+)", re.I
)
RE_BARE_URL = re.compile(r"(?:https?:)?//[^\s\"'<>)\]]+|(?<![\w.])/(?:[\w.\-]+/)+[\w.\-#]*")
RE_INLINE_CODE = re.compile(r"`[^`]+`")
RE_HTML_ATTR = re.compile(r"\b(?:class|id|value|name|for|data-[\w\-]+)\s*=\s*(\"[^\"]*\"|'[^']*')")
RE_HASH_KEY = re.compile(r"[\"'][\w\-]*[\"']\s*(?==>)")
RE_LIQUID = re.compile(r"\{%.*?%\}|\{\{.*?\}\}")
RE_MY = re.compile(r"\{%\s*my\s+(\w+)")

PR_TITLE = re.compile(r"^\s*[-*]\s.*\(\[@[\w\-]+\]\s*-\s*\[[\w\-]*#\d+\]\)")
PROSE_KEYS = {"title", "description", "excerpt", "categories", "og_description", "subtitle", "tagline"}
HA_CLOUD_DOCS = re.compile(r"\(\[cloud docs\]\)")
HA_SENTENCE = re.compile(r"Home Assistant Cloud|Nabu Casa|nabucasa", re.I)
HA_URL = re.compile(
    r"(^|[\"'(\s]|home-assistant\.io)/cloud(/|#|$|[\"')\s])"
    r"|/integrations/cloud(?![\w])"
    r"|/redirect/cloud"
    r"|voice_remote_cloud_assistant"
    r"|home-assistant-cloud"
    r"|nabucasa\.com"
    r"|/images/cloud/"
    r"|home-assistant/cloud"
    r"|hass-nabucasa",
    re.I,
)
HA_CODE = re.compile(
    r"\bcloud\.(remote_connect|remote_disconnect)\b"
    r"|\b(tts|stt)\.(home_assistant_)?cloud\w*"
    r"|\bcloud_say\b"
    r"|media-source://tts/cloud"
    r"|^\s*cloud:\s*$"
    r"|\b(domain|ha_domain|platform|engine|integration)\s*[:=]\s*[\"']?cloud\b"
    r"|\bcloudhook"
    r"|home_assistant_cloud"
    r"|\bhass_nabucasa\b",
    re.I,
)
WEATHER_TOKEN = re.compile(
    r"^(cloudy|clouds|cloudiness|cloudless|clouded|cloudcover|cloudburst)$"
    r"|cloud[_\- ]?(cover|coverage|base|ceiling|layer|height|area|fraction|amount)"
    r"|partly[_\- ]?cloudy|mostly[_\- ]?cloudy|cloudy",
    re.I,
)
WEATHER_NEXT = re.compile(
    r"^cloud\s+(cover|coverage|base|ceiling|layers?|height|area|fraction|amount|conditions?|density|formation|type|opacity)\b",
    re.I,
)
IOT_CLASS = re.compile(r"cloud[\s_\-]+(polling|push)\b|\b(local|assumed)\s*(/|or|and)\s*cloud\b", re.I)

# Words that can precede "Cloud" at the start of a phrase without being a brand.
NOT_BRAND = {
    "the", "a", "an", "your", "our", "use", "using", "with", "in", "for", "and", "or", "to",
    "via", "this", "if", "when", "that", "their", "its", "no", "not", "new", "from", "on",
    "by", "of", "is", "are", "as", "any", "both", "all", "some", "other", "through", "without",
    "requires", "require", "optional", "local", "home", "assistant", "casa", "nabu", "note",
    "updated", "added", "fixed", "improved", "remove", "removed", "add", "fix", "update", "support",
    "supports", "official", "unofficial", "free", "paid", "private", "public", "legacy", "native",
    "disable", "enable", "enabled", "disabled", "only", "also", "but", "it", "you", "we", "they",
    "open", "smart", "big", "tech", "voice", "assist", "important", "warning", "tip", "info",
    "these", "those", "every", "each", "many", "most", "more", "less", "than", "into", "over",
    "can", "may", "will", "does", "do", "has", "have", "be", "been", "being", "at", "so", "because",
    "which", "where", "while", "after", "before", "then", "now", "still", "even", "one", "two",
    "direct", "remote", "external", "internet", "online", "vendor", "manufacturer", "manufacturers",
    "third-party", "proprietary", "hybrid", "secure", "encrypted", "full", "partial", "between",
    "my", "his", "her", "what", "why", "how", "who", "yes", "see", "set", "get", "make", "run",
    "running", "connect", "connected", "connecting", "about", "against", "per", "non", "pure",
    "integration", "integrations", "device", "devices", "service", "services", "api", "apis",
    "account", "there", "here", "was", "were", "should", "must", "need", "needs", "like", "such",
    "same", "different", "own", "another", "up", "out", "off", "just", "avoid", "bypass",
    "wi-fi", "wifi", "bluetooth", "zigbee", "z-wave", "matter", "thread", "mqtt", "lan",
    "say", "said", "called", "named", "name", "word", "term",
}
# Words after "cloud" that suggest the Home Assistant Cloud product when the
# page is about Home Assistant Cloud.
PRODUCT_NEXT = re.compile(
    r"^cloud\s+(subscription|subscriber|subscribers|account|login|backup|backups|tts|stt|speech|voice|voices|"
    r"webhook|webhooks|remote|ui|settings|panel|configuration|integration|component|support|features?|trial|"
    r"connection status|status|plan|storage|assist|pipeline|agent|servers?|team|users?|customers?|ice servers)\b",
    re.I,
)


def git_files() -> list[str]:
    out = subprocess.run(["git", "ls-files"], cwd=ROOT, capture_output=True, text=True, check=True)
    return out.stdout.splitlines()


def git_sha() -> str:
    # Link to the commit that last changed the audited content, not to the
    # commit that adds the audit itself.
    out = subprocess.run(
        ["git", "log", "-1", "--format=%H", "--", ".", ":(exclude)tools/cloud-to-link-audit"],
        cwd=ROOT, capture_output=True, text=True, check=True,
    )
    return out.stdout.strip()


def content_type(path: str) -> str:
    p = path
    if p.startswith("source/_posts/"):
        return "Blog post"
    if p.startswith("source/changelogs/"):
        return "Changelog"
    if p.startswith("source/_integrations/"):
        return "Integration page"
    if p.startswith("source/_data/integrations/"):
        return "Integration metadata"
    if p.startswith("source/_data/"):
        return "Site data"
    if p.startswith(("source/_actions/", "source/_triggers/", "source/_conditions/",
                     "source/_template_functions/", "source/_building_blocks/", "source/_connectivity/")):
        return "Reference page"
    if p.startswith(("source/_docs/", "source/_faq/", "source/getting-started/", "source/installation/",
                     "source/common-tasks/", "source/voice_control/", "source/cloud/", "source/more-info/",
                     "source/_dashboards/", "source/dashboards/", "source/docs/", "source/faq/",
                     "source/help/", "source/security/", "source/android/", "source/ios/")):
        return "Documentation"
    if p.startswith(("source/_includes/", "source/_layouts/", "plugins/", "astro/", "sass/",
                     "source/javascripts/", "source/stylesheets/")):
        return "Site template or code"
    if p in ("source/_redirects", "source/_headers"):
        return "Site data"
    if p.startswith("source/"):
        return "Website page"
    return "Repository file"


def page_url(path: str, front: dict[str, str]) -> str:
    """Best-effort URL of the published page for a source file."""
    if "permalink" in front:
        return SITE_URL + front["permalink"]
    m = re.match(r"source/_posts/(\d{4})-(\d{2})-(\d{2})-(.+)\.(markdown|md)$", path)
    if m:
        return f"{SITE_URL}/blog/{m[1]}/{m[2]}/{m[3]}/{m[4]}/"
    collections = {
        "_integrations": "integrations", "_docs": "docs", "_faq": "faq", "_dashboards": "dashboards",
        "_actions": "actions", "_triggers": "triggers", "_conditions": "conditions",
        "_template_functions": "template-functions", "_building_blocks": "building-blocks",
        "_connectivity": "connectivity",
    }
    m = re.match(r"source/(_\w+)/(.+)\.(markdown|md|html)$", path)
    if m and m[1] in collections:
        return f"{SITE_URL}/{collections[m[1]]}/{m[2]}/"
    m = re.match(r"source/([^_].*)\.(markdown|md|html)$", path)
    if m:
        rel = re.sub(r"(^|/)index$", "", m[1])
        return f"{SITE_URL}/{rel}/".replace("//", "/").replace("https:/", "https://") if rel else SITE_URL + "/"
    return ""


def spans(regex: re.Pattern, line: str, group: int = 0) -> list[tuple[int, int]]:
    return [m.span(group) for m in regex.finditer(line)]


def inside(pos: int, ranges: list[tuple[int, int]]) -> bool:
    return any(a <= pos < b for a, b in ranges)


def sentence_bounds(line: str, start: int, end: int) -> tuple[int, int]:
    a, b = 0, len(line)
    for m in SENT_SPLIT.finditer(line):
        if m.end() <= start:
            a = m.end()
        elif m.start() >= end:
            b = m.start()
            break
    return a, b


def clip(line: str, s: int, e: int, start: int, end: int, limit: int = 300) -> tuple[str, int, int]:
    """Return the sentence text, clipped around the match, and the match offsets in it."""
    lead = len(line[s:e]) - len(line[s:e].lstrip())
    s += lead
    text = line[s:e].rstrip()
    ms, me = start - s, end - s
    if len(text) > limit:
        half = (limit - (me - ms)) // 2
        a = max(0, ms - half)
        b = min(len(text), me + half)
        if a > 0:
            sp = text.find(" ", a)
            a = sp + 1 if 0 <= sp < ms else a
        if b < len(text):
            sp = text.rfind(" ", me, b)
            b = sp if sp > me else b
        pre = "… " if a > 0 else ""
        post = " …" if b < len(text) else ""
        text = pre + text[a:b] + post
        ms, me = ms - a + len(pre), me - a + len(pre)
    return text, ms, me


def text_fragment(line: str, start: int, end: int) -> str:
    """Plain-text snippet around the match for a #:~:text= link (best effort)."""
    if line[:start].count("<") > line[:start].count(">"):
        return ""  # Inside an HTML tag, such as image alt text.
    plain = re.compile(r"[A-Za-z0-9 ,’\-]")
    a, b = start, end
    while a > 0 and plain.match(line[a - 1]) and start - a < 40:
        a -= 1
    while b < len(line) and plain.match(line[b]) and b - end < 30:
        b += 1
    # Trim to whole words.
    if a > 0 and re.match(r"\w", line[a - 1]):
        sp = line.find(" ", a, start)
        a = sp + 1 if sp >= 0 else start
    if b < len(line) and re.match(r"\w", line[b]):
        sp = line.rfind(" ", end, b)
        b = sp if sp >= 0 else end
    snippet = line[a:b].strip(" ,-")
    return quote(snippet, safe="").replace("-", "%2D") if snippet else ""


def classify(o: dict) -> None:
    """Fill in category, rewrite, confidence, replacement, and notes for one occurrence."""
    line, start, end = o["_line"], o["_start"], o["_end"]
    token, ext, loc = o["_token"], o["_ext"], o["location"]
    tl = token.lower()
    after = line[start:]
    before = line[:start]
    sentence = o["_sentence"]
    o["confidence"] = "High"
    o["notes"] = ""
    o["_new"] = None

    def done(cat: str, rewrite: str, note: str = "", conf: str = "High", new: str | None = None,
             span: tuple[int, int] | None = None):
        o["category"], o["rewrite"], o["notes"], o["confidence"] = cat, rewrite, note, conf
        o["_new"] = new
        if span:
            o["_start"], o["_end"] = span

    # 0. The product name wrapped across two lines.
    prev_line = o["_prev_line"].rstrip()
    wrapped = None
    if loc in ("Body text", "Data text"):
        if tl == "cloud" and not before.strip() and re.search(r"Home Assistant(?:'s|’s)?$", prev_line):
            wrapped = (start, end, "Link", "“Home Assistant” is at the end of the previous line.")
        m = re.match(r"\s*(Assistant(?:'s|’s)?\s+)Cloud", line)
        if m and m.start(1) <= start <= m.end() and prev_line.endswith("Home") and tl == "cloud":
            wrapped = (start, end, "Link", "“Home” is at the end of the previous line.")
    pr_title = bool(PR_TITLE.search(line))
    if wrapped and not pr_title:
        note = wrapped[3]
        if o["content_type"] in ("Blog post", "Changelog") and o["_date"] < RENAME_POST:
            note += " Published before the rename. Decide whether archived posts and release notes get updated."
        return done("Product name: Home Assistant Cloud", "Yes", note, new=wrapped[2], span=wrapped[:2])

    # 1. The product name in full, wherever it appears in readable text.
    for rx, label in ((HA_CLOUD, "Product name: Home Assistant Cloud"), (NC_CLOUD, "Product name: Nabu Casa Cloud")):
        for m in rx.finditer(line):
            if m.start() <= start < m.end():
                if loc in ("URL or file path", "Code block", "Inline code"):
                    break
                if pr_title:
                    return done("Pull request title in release notes", "No",
                                "Verbatim pull request title from Home Assistant Core. Historical record.",
                                span=m.span())
                if re.search(r"Home Assistant Link|formerly", sentence, re.I) or RENAME_POST in o["path"]:
                    return done("Old name kept on purpose", "No",
                                "The sentence explains the rename or says “formerly”. Keep the old name here.",
                                span=m.span())
                note = ""
                if o["content_type"] in ("Blog post", "Changelog"):
                    note = "Published before the rename. Decide whether archived posts and release notes get updated."
                if o["_date"] and o["_date"] >= RENAME_POST:
                    note = "Published after the rename was announced."
                if loc == "Heading":
                    note = (note + " " if note else "") + "Heading: changing it changes the anchor link. Add a fragment redirect."
                return done(label, "Yes", note, new=NEW_NAME, span=m.span())

    # 2. URLs and paths.
    if loc == "URL or file path":
        if HA_URL.search(ext) or HA_URL.search(o["_url"] or ""):
            return done("Home Assistant Cloud: URL, anchor, or file path", "No",
                        "Not copy. Changes only if the page, anchor, or file is renamed, and then needs a redirect.")
        return done("URL or file path (other)", "No")

    # 3. Code.
    if loc in ("Code block", "Inline code", "Liquid tag"):
        if HA_CODE.search(line) and (tl == "cloud" or "cloudhook" in tl or "home_assistant_cloud" in tl
                                     or tl in ("cloud_say",)):
            return done("Home Assistant Cloud: code identifier", "No",
                        "Entity ID, action, or configuration key. Follows Home Assistant Core, not the website copy.")
        if loc == "Liquid tag" and RE_MY.search(line) and tl == "cloud":
            return done("Home Assistant Cloud: URL, anchor, or file path", "No", "My link target.")
        if WEATHER_TOKEN.search(tl):
            return done("Weather", "No")
        return done("Code or identifier (other)", "No")

    # 4. Front matter and metadata keys.
    key = o["_key"]
    if key in ("ha_iot_class", "iot_class") or IOT_CLASS.search(line[max(0, start - 12): end + 10]):
        return done("IoT class (Cloud Polling, Cloud Push)", "No")
    if key in ("ha_domain", "ha_codeowners", "ha_platforms", "ha_integration_type", "ha_quality_scale",
               "connectivity", "requirements", "domain", "ha_config_flow", "ha_dhcp", "ha_zeroconf",
               "integration_type", "name") and o["content_type"] == "Integration metadata":
        return done("Code or identifier (other)", "No")
    if loc == "Front matter" and key not in PROSE_KEYS:
        if tl == "cloud" and (o["_ha_page"] or o["path"].startswith("source/_actions/cloud.")):
            return done("Home Assistant Cloud: code identifier", "No",
                        "Front matter value. Follows Home Assistant Core, not the website copy.")
        return done("Code or identifier (other)", "No")
    if key == "categories" and o["content_type"] == "Blog post" and tl == "cloud":
        return done("Blog category: Cloud", "Yes",
                    "Blog category label. Renaming it moves /blog/categories/cloud/ and needs a redirect.",
                    conf="Review", new="Link")

    # 5. Words that only contain "cloud".
    if "cloudhook" in tl:
        return done("Home Assistant Cloud: feature term (cloudhook)", "No",
                    "Feature name used in the product UI and Core. Follows the product, not the website copy.",
                    conf="Review")
    if WEATHER_TOKEN.search(tl) or WEATHER_NEXT.search(after):
        return done("Weather", "No")
    if tl != "cloud":
        if re.fullmatch(r"cloud-(based|connected|free|independent|dependent|only|first|hosted|native|enabled|"
                        r"managed|powered|reliant|to-cloud|side|less|linked|controlled|backed|driven|provided|"
                        r"related|agnostic|optional|level|scale|specific|centric|stored|synced|required)", tl) \
                or re.fullmatch(r"(non|no|local|multi|inter|pre|anti)-?cloud(-\w+)*", tl) \
                or re.fullmatch(r"cloud-?to-?cloud|cloud2cloud", tl):
            return done("Generic cloud (concept or other vendors)", "No")
        return done("Third-party or integration name", "No")

    # 6. The bare word "cloud".
    prev = re.search(r"([A-Za-z][\w.\-+&']*)\s+$", before)
    prev_word = prev.group(1) if prev else ""
    sent_start = o["_sent_start"]
    prev_is_first = bool(prev) and prev.start(1) <= sent_start + 1
    cap = token[0].isupper()

    if prev_word and prev_word[0].isupper() and prev_word.lower().strip("'’s") not in NOT_BRAND \
            and not (prev_is_first and (prev_word.lower() in NOT_BRAND or bool(PR_TITLE.search(line)))):
        return done("Third-party product or service name", "No",
                    f"Part of “{prev_word} {token}”." if not prev_is_first else
                    f"Part of “{prev_word} {token}” (first words of the sentence, check).",
                    conf="High" if not prev_is_first or re.search(r"[\[*(]$", before[:prev.start(1)]) else "Review")
    nxt = re.match(r"cloud\s+([A-Z][\w\-]+)", after)
    if cap and nxt and nxt.group(1) in ("Platform", "Storage", "Speech", "Vision", "Console", "Functions",
                                        "Pub/Sub", "Run", "Connect", "Messaging", "Services", "API", "APIs",
                                        "Foundry", "MQTT", "Key", "Sync", "Print", "Drive", "Translation"):
        return done("Third-party product or service name", "No", f"Part of “{token} {nxt.group(1)}”.", conf="Review")

    ha_page = o["_ha_page"]
    ha_file = o["_ha_file"]
    ha_sentence = bool(HA_SENTENCE.search(sentence))
    at_start = start <= sent_start + 2 or loc in ("Heading", "Front matter")
    if pr_title:
        if HA_CLOUD_DOCS.search(line) or (ha_file and PRODUCT_NEXT.match(after) and "docs])" not in line):
            return done("Pull request title in release notes", "No",
                        "Verbatim pull request title from Home Assistant Core about the Cloud integration. Historical record.")
        return done("Generic cloud (concept or other vendors)", "No", "Pull request title in release notes.")
    if cap and token != "CLOUD":
        if ha_page or ha_sentence:
            return done("Short name: Cloud", "Yes",
                        "Page about Home Assistant Cloud." if ha_page else "The sentence also names Home Assistant Cloud or Nabu Casa.",
                        conf="Review", new="Link")
        if not at_start and ha_file and o["content_type"] in ("Blog post", "Changelog", "Documentation", "Website page"):
            return done("Short name: Cloud", "Yes",
                        "Capitalized mid-sentence on a page that mentions Home Assistant Cloud.",
                        conf="Review", new="Link")
        if not at_start:
            return done("Third-party product or service name", "No",
                        "Capitalized mid-sentence: a product name or a label in another vendor's app.",
                        conf="Review")
        return done("Generic cloud (concept or other vendors)", "No",
                    "Capitalized because it starts a sentence, heading, or title.",
                    conf="Review" if ha_file else "High")
    archived = o["content_type"] in ("Blog post", "Changelog")
    if archived and (ha_page or (ha_file and PRODUCT_NEXT.match(after))):
        return done("Describes the service as “cloud” (lowercase)", "No",
                    "Archived post. Lowercase description of the service, not the product name.", conf="Review")
    if ha_page or (ha_sentence and PRODUCT_NEXT.match(after)):
        return done("Describes the service as “cloud” (lowercase)", "Yes",
                    "Lowercase “cloud” used for the service or its features. Check whether it means Home Assistant Cloud.",
                    conf="Review", new=NEW_NAME)
    if ha_file and PRODUCT_NEXT.match(after):
        return done("Generic cloud (concept or other vendors)", "No",
                    "Lowercase before a product word on a page that mentions Home Assistant Cloud. Check.",
                    conf="Review")
    return done("Generic cloud (concept or other vendors)", "No")


def scan_file(path: str, sha: str) -> list[dict]:
    raw = (ROOT / path).read_bytes()
    if b"\0" in raw[:8000]:
        return []
    try:
        text = raw.decode("utf-8")
    except UnicodeDecodeError:
        return []
    if not CLOUD.search(text):
        return []
    lines = text.split("\n")
    is_page = path.endswith((".markdown", ".md", ".html")) and path.startswith("source/")
    ctype = content_type(path)

    # Front matter.
    front: dict[str, str] = {}
    fm_end = 0
    if is_page and lines and lines[0].strip() == "---":
        for i in range(1, len(lines)):
            if lines[i].strip() == "---":
                fm_end = i
                break
            m = re.match(r"^(\w+):\s*(.*)$", lines[i])
            if m:
                front[m[1]] = m[2].strip().strip("\"'")
    url = page_url(path, front) if is_page and not path.startswith(("source/_includes", "source/_layouts")) else ""
    date = ""
    m = re.match(r"source/_posts/(\d{4}-\d{2}-\d{2})-", path)
    if m:
        date = m[1]
    ha_mentions = len(HA_CLOUD.findall(text)) + len(NC_CLOUD.findall(text))
    ha_file = ha_mentions > 0 or "nabucasa" in text.lower() or "Nabu Casa" in text
    ha_page = (
        path.startswith("source/cloud/")
        or path in ("source/_integrations/cloud.markdown",)
        or "voice_remote_cloud_assistant" in path
        or bool(re.search(r"Home Assistant Cloud|Nabu Casa", front.get("title", ""), re.I))
    )

    rows: list[dict] = []
    in_code = False
    key = ""
    is_data = path.endswith((".json", ".yml", ".yaml", ".toml", ".rb", ".js", ".ts", ".astro", ".scss", ".css")) \
        or "/" not in path or path in ("source/_redirects", "source/_headers")
    for idx, line in enumerate(lines):
        stripped = line.strip()
        in_front = is_page and 0 < idx < fm_end
        if not in_front and not is_data and re.match(r"^\s*(```|~~~)", line):
            in_code = not in_code
            if not CLOUD.search(line):
                continue
        if in_front or path.endswith((".json", ".yml", ".yaml")):
            m = re.match(r"^\s*-?\s*[\"']?([\w\-]+)[\"']?\s*:", line)
            if m:
                key = m[1]
        elif not in_front:
            key = ""
        if not CLOUD.search(line):
            continue

        url_spans = spans(RE_MD_URL, line, 1) + spans(RE_ATTR_URL, line, 1) + spans(RE_BARE_URL, line) \
            + spans(RE_REF_URL, line, 1)
        code_spans = spans(RE_INLINE_CODE, line) + spans(RE_HTML_ATTR, line, 1) + spans(RE_HASH_KEY, line)
        liquid_spans = spans(RE_LIQUID, line)

        for m in CLOUD.finditer(line):
            start, end = m.span()
            # Whole word containing the match.
            a, b = start, end
            while a > 0 and re.match(r"[\w\-]", line[a - 1]):
                a -= 1
            while b < len(line) and re.match(r"[\w\-]", line[b]):
                b += 1
            token = line[a:b].strip("-")
            a = line.index(token, a)
            b = a + len(token)
            ea, eb = a, b
            while ea > 0 and re.match(r"[\w\-./:#@%?=&~+]", line[ea - 1]):
                ea -= 1
            while eb < len(line) and re.match(r"[\w\-./:#@%?=&~+]", line[eb]):
                eb += 1
            ext = line[ea:eb]

            if inside(start, url_spans):
                loc = "URL or file path"
            elif in_code and not in_front:
                loc = "Code block"
            elif inside(start, code_spans):
                loc = "Inline code"
            elif inside(start, liquid_spans):
                loc = "Liquid tag"
            elif in_front:
                loc = "Front matter"
            elif is_data:
                prose_key = key in ("title", "description", "excerpt", "answer", "question", "definition",
                                    "term", "label", "text", "content", "summary", "name", "aliases", "alt",
                                    "caption", "note", "subtitle", "tagline", "body", "heading", "cta")
                is_string = bool(re.search(r"[A-Za-z]{3,}\s+[A-Za-z]{2,}\s+[A-Za-z]{2,}", line))
                if path.startswith("source/_data/integrations/") or path == "CODEOWNERS":
                    loc = "Data value"
                elif prose_key or (is_string and not re.match(r"^\s*(//|#|/\*|\*)", line)
                                   and not path.endswith((".rb", ".js", ".ts", ".scss", ".css"))):
                    loc = "Data text"
                elif HA_CLOUD.search(line) or NC_CLOUD.search(line):
                    loc = "Data text"
                elif re.search(r"[\w)]\s*[_./]\s*$", line[:a]) or "_" in token or re.match(r"^\s*(//|#|/\*|\*)", line):
                    loc = "Code block"
                else:
                    loc = "Data value" if not path.endswith((".rb", ".js", ".ts", ".astro", ".scss", ".css")) else "Code block"
            elif re.match(r"^\s*#{1,6}\s", line):
                loc = "Heading"
            else:
                loc = "Body text"
            if loc == "Data value" and tl_is_identifier(token, line, a):
                loc = "Code block"

            the_url = ""
            for us in url_spans:
                if us[0] <= start < us[1]:
                    the_url = line[us[0]:us[1]]

            s, e = sentence_bounds(line, a, b)
            o = {
                "path": path, "line": idx + 1, "col": start + 1, "matched": token,
                "content_type": ctype, "location": loc, "page_url": url,
                "_line": line, "_start": a, "_end": b, "_token": token, "_ext": ext, "_key": key,
                "_url": the_url, "_date": date, "_ha_file": ha_file, "_ha_page": ha_page,
                "_sent_start": s + (len(line[s:e]) - len(line[s:e].lstrip(" -*>#|\t\"“"))),
                "_sentence": line[s:e],
                "_prev_line": lines[idx - 1] if idx else "",
            }
            classify(o)
            ov = OV.get((path, str(idx + 1), str(start + 1)))
            if ov:
                ov["_used"] = True
                o["rewrite"] = ov["rewrite"] or o["rewrite"]
                o["category"] = ov["category"] or o["category"]
                o["notes"] = ov["notes"] or o["notes"]
                o["confidence"] = "Checked"
                if o["rewrite"] == "No":
                    o["_new"] = None
                else:
                    if ov["old"]:
                        at = line.rfind(ov["old"], 0, end + len(ov["old"]))
                        if at < 0 or not (at <= start < at + len(ov["old"])):
                            raise SystemExit(f"override text not found: {path}:{idx + 1}:{start + 1} {ov['old']!r}")
                        o["_start"], o["_end"] = at, at + len(ov["old"])
                    o["_new"] = ov["new"] or o["_new"] or NEW_NAME
            a2, b2 = o["_start"], o["_end"]
            s, e = sentence_bounds(line, a2, b2)
            ctx, ms, me = clip(line, s, e, a2, b2)
            o["context"] = ctx[:ms] + "«" + ctx[ms:me] + "»" + ctx[me:]
            o["matched"] = ctx[ms:me] if o["_new"] else token
            o["suggestion"] = (ctx[:ms] + "«" + o["_new"] + "»" + ctx[me:]) if o["_new"] else ""
            o["source_link"] = f"{REPO_URL}/blob/{sha}/{quote(path)}#L{idx + 1}"
            frag = text_fragment(line, a2, b2) if loc in ("Body text", "Heading") and url else ""
            o["live_link"] = (url + "#:~:text=" + frag) if frag else url
            rows.append(o)
    return rows


def tl_is_identifier(token: str, line: str, a: int) -> bool:
    return "_" in token or bool(re.search(r"[./]$", line[:a]))


COLUMNS = [
    ("id", "ID"), ("rewrite", "Rewrite?"), ("confidence", "Confidence"), ("category", "Category"),
    ("context", "Context"), ("suggestion", "Suggested replacement"), ("matched", "Matched text"),
    ("content_type", "Content type"), ("location", "Where in the file"), ("path", "File"),
    ("line", "Line"), ("source_link", "Source link"), ("live_link", "Live page link"), ("notes", "Notes"),
]


OV: dict[tuple[str, str, str], dict] = {}


def main() -> int:
    sha = git_sha()
    if OVERRIDES.exists():
        with OVERRIDES.open(newline="", encoding="utf-8") as fh:
            for r in csv.DictReader(fh):
                OV[(r["file"], r["line"], r["col"])] = r
    rows: list[dict] = []
    for path in git_files():
        if path.startswith(SKIP_PREFIXES) or path in SKIP_FILES:
            continue
        if not (ROOT / path).is_file():
            continue
        rows.extend(scan_file(path, sha))

    order = {"Yes": 0, "No": 1}
    type_order = ["Documentation", "Integration page", "Reference page", "Website page", "Site data",
                  "Site template or code", "Blog post", "Changelog", "Integration metadata", "Repository file"]
    rows.sort(key=lambda o: (order[o["rewrite"]], type_order.index(o["content_type"]), o["path"], o["line"], o["col"]))
    for i, o in enumerate(rows, 1):
        o["id"] = i

    with OUT.open("w", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh, lineterminator="\n")
        w.writerow([h for _, h in COLUMNS] + ["Position in line"])
        for o in rows:
            w.writerow([o[k] for k, _ in COLUMNS] + [o["col"]])
    yes = sum(1 for o in rows if o["rewrite"] == "Yes")
    print(f"{len(rows)} occurrences in {len({o['path'] for o in rows})} files; {yes} to rewrite; "
          f"{sum(1 for v in OV.values() if v.get('_used'))}/{len(OV)} overrides applied", file=sys.stderr)
    for k, v in OV.items():
        if not v.get("_used"):
            print("unused override:", *k, file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
