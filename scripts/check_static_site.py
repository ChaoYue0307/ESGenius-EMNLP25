from html.parser import HTMLParser
from pathlib import Path


class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ("href", "src"):
            if key in attrs:
                self.refs.append(attrs[key])


def is_external(ref):
    return ref.startswith(("http://", "https://", "#", "mailto:"))


def clean_ref(ref):
    return ref.split("#", 1)[0].split("?", 1)[0]


def main():
    root = Path(".")
    pages = ("index.html", "heatmap.html")
    failures = []

    for page in pages:
        page_path = root / page
        if not page_path.exists():
            failures.append(f"missing page: {page}")
            continue

        parser = LinkParser()
        parser.feed(page_path.read_text(encoding="utf-8", errors="ignore"))
        for ref in parser.refs:
            if is_external(ref):
                continue
            target = clean_ref(ref)
            if target and not (root / target).exists():
                failures.append(f"{page}: missing {ref}")

    if failures:
        raise SystemExit("\n".join(failures))
    print("Static references OK")


if __name__ == "__main__":
    main()
