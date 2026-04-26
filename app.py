from flask import Flask, render_template, jsonify
import os

app = Flask(__name__)

# Projects data
projects = [
    {
        "id": 1,
        "title": "Telegram Bot Platformasi",
        "desc": "Python va aiogram asosida qurilgan multifunksional Telegram bot. Foydalanuvchi boshqaruvi, avtomatik javoblar, buyruq tizimi, admin panel va inline klaviatura bilan.",
        "tags": ["Python", "aiogram", "Telegram API", "SQLite"],
        "icon": "robot",
        "color": "#7b5ea7",
        "year": "2024",
        "type": "Bot Development",
        "featured": True
    },
    {
        "id": 2,
        "title": "Landing Page",
        "desc": "Zamonaviy va to'liq responsive landing page. Smooth scroll, CSS animatsiyalar va chiroyli UI bilan.",
        "tags": ["HTML", "CSS", "JavaScript"],
        "icon": "globe",
        "color": "#00ffc8",
        "year": "2024",
        "type": "Frontend",
        "featured": False
    },
    {
        "id": 3,
        "title": "React Dashboard",
        "desc": "React hooks, state management va API integratsiyasi bilan qurilgan dinamik admin dashboard.",
        "tags": ["React", "JavaScript", "CSS"],
        "icon": "layout-dashboard",
        "color": "#7b5ea7",
        "year": "2024",
        "type": "React",
        "featured": False
    },
    {
        "id": 4,
        "title": "UI/UX Dizayn",
        "desc": "Figma va Adobe Illustrator yordamida yaratilgan professional dizayn loyihalari. Wireframe va prototip.",
        "tags": ["Figma", "Illustrator", "Photoshop"],
        "icon": "pen-tool",
        "color": "#ff4f6e",
        "year": "2024",
        "type": "Design",
        "featured": False
    },
    {
        "id": 5,
        "title": "E-commerce Site",
        "desc": "To'liq funksional onlayn do'kon. Mahsulot katalogi, savat va to'lov tizimi bilan.",
        "tags": ["Python", "Flask", "JavaScript", "CSS"],
        "icon": "shopping-cart",
        "color": "#f5c542",
        "year": "2024",
        "type": "Fullstack",
        "featured": False
    },
    {
        "id": 6,
        "title": "3D Portfolio Scene",
        "desc": "Blender yordamida yaratilgan interaktiv 3D portfolio sahnasi va animatsiyalar.",
        "tags": ["Blender", "3D", "Animation"],
        "icon": "box",
        "color": "#ff7f00",
        "year": "2024",
        "type": "3D Design",
        "featured": False
    }
]

skills = [
    {"name": "HTML5", "icon": "html5", "cat": "frontend", "level": 95},
    {"name": "CSS3", "icon": "css3", "cat": "frontend", "level": 90},
    {"name": "JavaScript", "icon": "square-js", "cat": "frontend", "level": 80},
    {"name": "React", "icon": "react", "cat": "frontend", "level": 75},
    {"name": "Python", "icon": "python", "cat": "backend", "level": 85},
    {"name": "Flask", "icon": "flask-conical", "cat": "backend", "level": 75},
    {"name": "Telegram Bot", "icon": "bot", "cat": "backend", "level": 90},
    {"name": "SQLite", "icon": "database", "cat": "backend", "level": 70},
    {"name": "Figma", "icon": "figma", "cat": "design", "level": 85},
    {"name": "Photoshop", "icon": "image", "cat": "design", "level": 80},
    {"name": "Illustrator", "icon": "pen-tool", "cat": "design", "level": 75},
    {"name": "Blender", "icon": "box", "cat": "design", "level": 65},
    {"name": "Canva", "icon": "layers", "cat": "design", "level": 90},
    {"name": "GitHub", "icon": "github", "cat": "tools", "level": 80},
    {"name": "VS Code", "icon": "code-2", "cat": "tools", "level": 95},
    {"name": "Git", "icon": "git-branch", "cat": "tools", "level": 78},
]

# Get music files dynamically
def get_music_files():
    music_dir = os.path.join(app.static_folder, 'assets', 'music')
    tracks = []
    image_exts = ['.jpg', '.jpeg', '.png', '.webp']
    if os.path.exists(music_dir):
        files = sorted(os.listdir(music_dir))
        audio_files = [f for f in files if f.lower().endswith(('.mp3', '.ogg', '.wav', '.flac'))]
        for i, f in enumerate(audio_files):
            name = os.path.splitext(f)[0]
            parts = name.split(' - ', 1)
            # Check for matching cover image (same base name, any image ext)
            cover = None
            for ext in image_exts:
                img_path = os.path.join(music_dir, name + ext)
                if os.path.exists(img_path):
                    cover = f"/static/assets/music/{name}{ext}"
                    break
            tracks.append({
                "id": i + 1,
                "title": parts[1].strip() if len(parts) > 1 else name,
                "artist": parts[0].strip() if len(parts) > 1 else "Unknown",
                "src": f"/static/assets/music/{f}",
                "cover": cover  # None if no image found
            })
    # Fallback demo tracks if no music files
    if not tracks:
        tracks = [
            {"id": 1, "title": "Lo-Fi Beats", "artist": "ChillMix", "src": "", "cover": None},
            {"id": 2, "title": "Dark Ambient", "artist": "NightWave", "src": "", "cover": None},
            {"id": 3, "title": "Code Vibes", "artist": "DevBeats", "src": "", "cover": None},
        ]
    return tracks

@app.route('/')
def home():
    return render_template('index.html',
        featured=[p for p in projects if p['featured']],
        recent_projects=projects[:3]
    )

@app.route('/projects')
def projects_page():
    return render_template('projects.html', projects=projects)

@app.route('/skills')
def skills_page():
    return render_template('skills.html', skills=skills)

@app.route('/contact')
def contact_page():
    return render_template('contact.html')

@app.route('/about')
def about_page():
    return render_template('about.html')

@app.route('/api/music')
def api_music():
    return jsonify(get_music_files())

@app.route('/api/projects')
def api_projects():
    return jsonify(projects)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)