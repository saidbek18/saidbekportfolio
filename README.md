# Saidbek Kamolov — Portfolio

Flask-da qurilgan multi-page portfolio sayt.

## 📁 Papka Tuzilishi

```
portfolio/
├── app.py                    # Flask asosiy fayl
├── requirements.txt
├── templates/
│   ├── base.html             # Navbar, footer, music player
│   ├── index.html            # Bosh sahifa
│   ├── about.html            # Men haqimda
│   ├── skills.html           # Ko'nikmalar
│   ├── projects.html         # Loyihalar
│   └── contact.html          # Aloqa
└── static/
    ├── css/
    │   └── base.css
    ├── js/
    │   └── base.js
    └── assets/
        ├── images/
        │   └── avatar.jpg    # ← RASMINGIZNI SHU YERGA QO'YING
        └── music/
            ├── Artist - Song.mp3   # ← MUSIQA FAYLLARINI SHU YERGA
            └── ...
```

## 🖼️ Rasm Qo'shish

`static/assets/images/` papkasiga rasmingizni `avatar.jpg` deb saqlang.
(PNG ham bo'lsa, `avatar.jpg` deb nomi o'zgartiring yoki base.html'da kengaytmani o'zgartiring)

## 🎵 Musiqa Qo'shish

`static/assets/music/` papkasiga MP3 fayllarini soling.

**Tavsiya etilgan nom formati:** `Artist - Song Title.mp3`
Masalan:
- `Lofi - Chill Beats.mp3`
- `NightWave - Dark Ambient.mp3`

Flask avtomatik ravishda papkadan o'qiydi va music player'ga qo'shadi.

## 🚀 Ishga Tushirish

### 1. VS Code Terminal ochish
Terminal → New Terminal

### 2. Portfolio papkasiga kirish
```bash
cd portfolio
```

### 3. Virtual environment yaratish (tavsiya etiladi)
```bash
python -m venv venv
```

### 4. Virtual environmentni faollashtirish
**Windows:**
```bash
venv\Scripts\activate
```
**Mac/Linux:**
```bash
source venv/bin/activate
```

### 5. Kutubxonalarni o'rnatish
```bash
pip install -r requirements.txt
```

### 6. Saytni ishga tushirish
```bash
python app.py
```

### 7. Brauzerda ochish
```
http://localhost:5000
```

## 📄 Sahifalar

| URL | Sahifa |
|-----|--------|
| `/` | Bosh sahifa |
| `/about` | Men haqimda |
| `/skills` | Ko'nikmalar |
| `/projects` | Loyihalar |
| `/contact` | Aloqa |
| `/api/music` | Musiqa API (JSON) |
| `/api/projects` | Loyihalar API (JSON) |

## ✏️ Ma'lumotlarni O'zgartirish

Barcha ma'lumotlar (projects, skills, kontakt) `app.py` faylida joylashgan.
`projects` va `skills` listlarini o'zgartirish orqali sahifalar avtomatik yangilanadi.

## 🌐 Deploy Qilish

### PythonAnywhere (bepul)
1. pythonanywhere.com'ga ro'yxatdan o'ting
2. Files → Upload your project
3. Web → Add new web app → Flask
4. WSGI faylini sozlang

### Render.com (bepul)
1. render.com'da hisob oching
2. New → Web Service
3. GitHub repoga ulang
4. Build: `pip install -r requirements.txt`
5. Start: `python app.py`
