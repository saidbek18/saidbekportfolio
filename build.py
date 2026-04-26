import os
import shutil
from app import app
from flask import render_template

OUTPUT_DIR = "dist"

PAGES = [
    ("index.html", "/"),
    ("about.html", "/about"),
    ("skills.html", "/skills"),
    ("projects.html", "/projects"),
    ("contact.html", "/contact"),
]

def build():
    # dist papkani tozalash
    if os.path.exists(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # static fayllarni ko‘chirish
    shutil.copytree("static", os.path.join(OUTPUT_DIR, "static"))

    # HTML sahifalarni render qilish
    with app.test_request_context():
        for filename, route in PAGES:
            html = app.view_functions[app.url_map.bind('').match(route)[0]]()
            if not isinstance(html, str):
                html = render_template(filename.replace(".html", ".html"))

            file_path = os.path.join(OUTPUT_DIR, filename)
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(html)

    print("✅ Build completed! dist/ created.")

if __name__ == "__main__":
    build()