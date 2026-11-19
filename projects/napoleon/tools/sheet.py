import json, sys, os
from PIL import Image, ImageDraw
files = json.load(open(sys.argv[1])); out = sys.argv[2]
W, H, per = 640, 360, 8
rows = [files[i:i + 3] for i in range(0, len(files), 3)]
for si in range(0, len(rows), per):
    chunk = rows[si:si + per]; sheet = Image.new('RGB', (W * 3, (H + 24) * len(chunk)), 'black'); d = ImageDraw.Draw(sheet)
    for r, row in enumerate(chunk):
        for c, fn in enumerate(row):
            sheet.paste(Image.open(fn).resize((W, H)), (c * W, r * (H + 24) + 24))
        d.text((6, r * (H + 24) + 4), os.path.basename(row[0])[:-6], fill='white')
    sheet.save(os.path.join(out, f'sheet_{si // per:02d}.jpg'), quality=85)
