#!/usr/bin/env python3
"""Convert a Google Docs HTML export (File > Download > Web page) to Markdown.

Google Docs HTML exports store bold and italics as CSS classes on <span>
elements instead of <b>/<i> tags. This script resolves those classes so the
author's inline formatting survives, and writes Markdown in the same shape as
a Google Docs Markdown export, so the rest of the create-blog-post process
can treat both the same way.

Usage:
    python3 -I gdoc_html_to_markdown.py INPUT.html [OUTPUT.md]

Without OUTPUT.md, the Markdown is written to standard output. With
OUTPUT.md, the file is only written after the conversion succeeds.

Only the Python standard library is used.
"""

from __future__ import annotations

import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import parse_qs, urlparse

VOID_TAGS = {"br", "img", "hr", "meta", "link", "input", "col", "area", "base", "wbr"}
BLOCK_TAGS = {"p", "h1", "h2", "h3", "h4", "h5", "h6", "li", "div", "table", "tr", "td", "th", "ul", "ol", "hr", "body"}


class Node:
    def __init__(self, tag: str, attrs: dict[str, str] | None = None, parent: Node | None = None):
        self.tag = tag
        self.attrs = attrs or {}
        self.parent = parent
        self.children: list[Node | str] = []

    @property
    def classes(self) -> list[str]:
        return self.attrs.get("class", "").split()


class TreeBuilder(HTMLParser):
    """Build a small DOM tree. Google Docs exports are well-formed enough for this."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.root = Node("root")
        self.current = self.root
        self.css = ""
        self._in_style = False

    def handle_starttag(self, tag, attrs):
        if tag == "style":
            self._in_style = True
            return
        node = Node(tag, {k: (v or "") for k, v in attrs}, self.current)
        self.current.children.append(node)
        if tag not in VOID_TAGS:
            self.current = node

    def handle_startendtag(self, tag, attrs):
        node = Node(tag, {k: (v or "") for k, v in attrs}, self.current)
        self.current.children.append(node)

    def handle_endtag(self, tag):
        if tag == "style":
            self._in_style = False
            return
        if tag in VOID_TAGS:
            return
        node = self.current
        while node is not self.root and node.tag != tag:
            node = node.parent
        if node is not self.root:
            self.current = node.parent

    def handle_data(self, data):
        if self._in_style:
            self.css += data
        else:
            self.current.children.append(data)


def parse_css_classes(css: str) -> tuple[set[str], set[str]]:
    """Return the sets of class names that make text bold and italic."""
    bold: set[str] = set()
    italic: set[str] = set()
    for selectors, body in re.findall(r"([^{}]+)\{([^{}]*)\}", css):
        names = re.findall(r"^\s*\.([\w-]+)\s*$", selectors.replace(",", "\n"), re.M)
        if not names:
            continue
        body = body.replace(" ", "").lower()
        weight = re.search(r"font-weight:(\w+)", body)
        is_bold = bool(weight) and (weight.group(1) == "bold" or (weight.group(1).isdigit() and int(weight.group(1)) >= 600))
        is_italic = "font-style:italic" in body
        for name in names:
            if is_bold:
                bold.add(name)
            if is_italic:
                italic.add(name)
    return bold, italic


def clean_url(href: str) -> str:
    """Remove Google's redirect wrapper: https://www.google.com/url?q=REAL&sa=..."""
    parsed = urlparse(href)
    if parsed.netloc in ("www.google.com", "google.com") and parsed.path == "/url":
        target = parse_qs(parsed.query).get("q")
        if target:
            return target[0]
    return href


def is_comment_anchor(node: Node) -> bool:
    return node.tag == "a" and (
        node.attrs.get("href", "").startswith("#cmnt") or node.attrs.get("id", "").startswith("cmnt")
    )


def contains(node: Node, predicate) -> bool:
    for child in node.children:
        if isinstance(child, Node) and (predicate(child) or contains(child, predicate)):
            return True
    return False


def is_comment_block(node: Node) -> bool:
    """The comment text at the end of the export: a <div> holding an <a id="cmntN">."""
    return node.tag == "div" and contains(
        node, lambda n: n.tag == "a" and re.fullmatch(r"cmnt\d+", n.attrs.get("id", "")) is not None
    )


class Converter:
    def __init__(self, bold_classes: set[str], italic_classes: set[str]):
        self.bold_classes = bold_classes
        self.italic_classes = italic_classes
        self.blocks: list[str] = []
        # Marker of the list at each nesting level, used to indent nested items.
        self.list_markers: dict[int, str] = {}
        self.last_list_id: str | None = None

    # ---- inline content -------------------------------------------------

    def collect_runs(self, node: Node, bold=False, italic=False, href=None, runs=None):
        """Flatten inline content into (text, bold, italic, href) runs."""
        if runs is None:
            runs = []
        for child in node.children:
            if isinstance(child, str):
                text = re.sub(r"\s+", " ", child.replace("\xa0", " "))
                if text:
                    runs.append((text, bold, italic, href))
                continue
            if is_comment_anchor(child) or (child.tag == "sup" and contains(child, is_comment_anchor)):
                continue
            if child.tag == "br":
                runs.append(("\n", False, False, None))
                continue
            if child.tag == "img":
                runs.append((self.image_ref(child), False, False, None))
                continue
            classes = set(child.classes)
            child_bold = bold or child.tag in ("b", "strong") or bool(classes & self.bold_classes)
            child_italic = italic or child.tag in ("i", "em") or bool(classes & self.italic_classes)
            child_href = href
            if child.tag == "a" and child.attrs.get("href") and not child.attrs["href"].startswith("#"):
                child_href = clean_url(child.attrs["href"])
            self.collect_runs(child, child_bold, child_italic, child_href, runs)
        return runs

    @staticmethod
    def image_ref(node: Node) -> str:
        name = Path(urlparse(node.attrs.get("src", "")).path).stem
        return f"![][{name}]" if name else ""

    @staticmethod
    def wrap(text: str, bold: bool, italic: bool) -> str:
        """Wrap text in emphasis markers, keeping outer spaces outside the markers."""
        if not (bold or italic) or not text.strip() or text.startswith("![]"):
            return text
        marker = "***" if bold and italic else "**" if bold else "*"
        lead = text[: len(text) - len(text.lstrip())]
        trail = text[len(text.rstrip()) :]
        return f"{lead}{marker}{text.strip()}{marker}{trail}"

    def render_runs(self, runs) -> str:
        # Merge neighbouring runs with the same formatting, so a phrase Google
        # split across several spans comes out as one emphasized phrase.
        merged: list[list] = []
        for text, bold, italic, href in runs:
            # Whitespace-only runs take the formatting of the run before them,
            # so they don't break up an emphasized phrase.
            if merged and not text.strip() and text != "\n":
                merged[-1][0] += text
                continue
            if merged and merged[-1][1:] == [bold, italic, href]:
                merged[-1][0] += text
            else:
                merged.append([text, bold, italic, href])

        out: list[str] = []
        i = 0
        while i < len(merged):
            href = merged[i][3]
            if href:
                # Group every run that belongs to the same link.
                group = []
                while i < len(merged) and merged[i][3] == href:
                    group.append(merged[i])
                    i += 1
                inner = "".join(self.wrap(t, b, it) for t, b, it, _ in group)
                lead = inner[: len(inner) - len(inner.lstrip())]
                trail = inner[len(inner.rstrip()) :]
                out.append(f"{lead}[{inner.strip()}]({href}){trail}")
            else:
                text, bold, italic, _ = merged[i]
                out.append(self.wrap(text, bold, italic))
                i += 1
        text = "".join(out)
        text = re.sub(r" *\n *", "\n", text)
        return re.sub(r" {2,}", " ", text).strip()

    def inline(self, node: Node) -> str:
        return self.render_runs(self.collect_runs(node))

    # ---- block content --------------------------------------------------

    @staticmethod
    def list_id_and_level(node: Node) -> tuple[str | None, int]:
        for cls in node.classes:
            match = re.match(r"lst-kix_(\w+)-(\d+)$", cls)
            if match:
                return match.group(1), int(match.group(2))
        return None, 0

    def render_list(self, node: Node) -> None:
        list_id, level = self.list_id_and_level(node)
        # Google exports each nesting level of one list as a separate <ul>/<ol>
        # that shares the same lst-kix id. Only those belong to one Markdown list.
        continues_list = list_id is not None and list_id == self.last_list_id and self.blocks and self.blocks[-1].startswith("\x00list")
        if not continues_list:
            self.blocks.append("\x00list")
            self.list_markers = {}
        self.last_list_id = list_id
        ordered = node.tag == "ol"
        number = int(node.attrs.get("start", "1") or 1)
        indent = "".join(" " * len(self.list_markers.get(lvl, "- ")) for lvl in range(level))
        for child in node.children:
            if not isinstance(child, Node) or child.tag != "li":
                continue
            marker = f"{number}. " if ordered else "- "
            self.list_markers[level] = marker
            text = self.inline(child).replace("\n", "\n" + indent + " " * len(marker))
            if text:
                separator = "" if self.blocks[-1] == "\x00list" else "\n"
                self.blocks[-1] += f"{separator}{indent}{marker}{text}"
            number += 1

    def render_block(self, node: Node) -> None:
        for child in node.children:
            if isinstance(child, str):
                if child.strip():
                    self.blocks.append(self.render_runs([(child, False, False, None)]))
                continue
            tag = child.tag
            if tag in ("head", "script", "style", "title") or is_comment_block(child):
                continue
            if re.fullmatch(r"h[1-6]", tag):
                text = self.inline(child)
                if text:
                    self.blocks.append("#" * int(tag[1]) + " " + text.replace("\n", " "))
            elif tag == "p":
                text = self.inline(child)
                if not text:
                    continue
                if "title" in child.classes:
                    text = "# " + text.replace("\n", " ")
                self.blocks.append(text)
            elif tag in ("ul", "ol"):
                self.render_list(child)
            elif tag == "hr":
                if "display:none" not in child.attrs.get("style", "").replace(" ", ""):
                    self.blocks.append("---")
            elif tag == "img":
                self.blocks.append(self.image_ref(child))
            elif tag in BLOCK_TAGS or tag in ("html", "tbody", "thead", "table"):
                self.render_block(child)
            else:
                text = self.inline(child)
                if text:
                    self.blocks.append(text)

    def convert(self, root: Node) -> str:
        self.render_block(root)
        blocks = [b.replace("\x00list", "", 1) for b in self.blocks]
        blocks = [b for b in blocks if b.strip()]
        return "\n\n".join(blocks) + "\n"


def convert_html(html: str) -> str:
    builder = TreeBuilder()
    builder.feed(html)
    builder.close()
    bold, italic = parse_css_classes(builder.css)
    return Converter(bold, italic).convert(builder.root)


def main(argv: list[str]) -> int:
    if len(argv) not in (2, 3):
        print(__doc__.strip().split("\n\n")[1], file=sys.stderr)
        print("\n" + __doc__.strip().split("\n\n")[2], file=sys.stderr)
        return 2
    source = Path(argv[1])
    if not source.is_file():
        print(f"Input file not found: {source}", file=sys.stderr)
        return 1
    markdown = convert_html(source.read_text(encoding="utf-8"))
    if len(argv) == 3:
        Path(argv[2]).write_text(markdown, encoding="utf-8")
    else:
        sys.stdout.write(markdown)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
