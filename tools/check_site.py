"""Validate Odoo page routes, fragments, local assets and release/legal invariants."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]
PAGES = ['odoo-mobile.html', 'odoo-mobile-support.html', 'odoo-mobile-privacy.html', 'odoo-mobile-showcase.html', 'odoo/terms/index.html']

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path, self.ids, self.links, self.duplicates = path, set(), [], []
        self.feed(path.read_text(encoding='utf-8'))
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            if attrs['id'] in self.ids:
                self.duplicates.append(attrs['id'])
            self.ids.add(attrs['id'])
        for key in ('href', 'src', 'poster'):
            if key in attrs:
                self.links.append(attrs[key])

errors, checked = [], 0
for name in PAGES:
    page = Page(ROOT / name)
    errors.extend(f'{name}: duplicate id {value}' for value in page.duplicates)
    for link in page.links:
        url = urlsplit(link)
        if url.scheme or url.netloc:
            continue
        target = (ROOT / unquote(url.path.lstrip('/'))) if url.path.startswith('/') else (page.path.parent / unquote(url.path)) if url.path else page.path
        if target.is_dir():
            target /= 'index.html'
        checked += 1
        if not target.is_file():
            errors.append(f'{name}: missing {link}')
        elif url.fragment and target.suffix == '.html' and url.fragment not in Page(target).ids:
            errors.append(f'{name}: missing fragment {link}')

product = (ROOT / PAGES[0]).read_text(encoding='utf-8')
terms = (ROOT / PAGES[-1]).read_text(encoding='utf-8')
assert '0.29.33' in product and 'internal testing' in product
assert 'v0.29.18' not in product and 'Show overdue summary now' in product
assert product.count('/odoo/terms/') >= 2
assert len([i for i in Page(ROOT / PAGES[-1]).ids if i not in ('main','menu-toggle','navigation')]) == 16
assert 'mandatory consumer rights' in terms and 'data loss is not categorically excluded' in terms
assert 'Google Play billing and promo redemption' in (ROOT / PAGES[2]).read_text(encoding='utf-8')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'PASS: {len(PAGES)} Odoo pages, {checked} local asset/route/fragment references, release and legal checks.')
