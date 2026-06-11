# Item Images

Place full-size item PNG files in this folder:

```text
public/images/db/items/<imageName>.png
```

After copying your backup, run:

```bash
npm run images:thumbs
```

This generates 30x30 thumbnails in `public/images/db/items/thumbs/`.

The app serves these files directly as static assets. No remote domain or Vercel image optimization is required.
