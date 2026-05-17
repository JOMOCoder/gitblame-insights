# 🔍 gitblame-insights

> Analyze git blame data to produce detailed code ownership reports per file and module.

[![CI](https://img.shields.io/github/actions/workflow/status/yourusername/gitblame-insights/ci.yml?style=for-the-badge)](https://github.com/yourusername/gitblame-insights/actions)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](./LICENSE)
[![Codespace Ready](https://img.shields.io/badge/Codespace-Ready-green?style=for-the-badge&logo=github)](https://codespaces.new/yourusername/gitblame-insights)

---

## 🚀 What is gitblame-insights?

`gitblame-insights` goes beyond `git blame`. It analyzes your entire repository to produce ownership reports, contribution heatmaps, and code churn metrics — helping teams understand who owns what and where the most change is happening.

```bash
# Analyze entire repo
gitblame-insights analyze .

# Report on a specific directory
gitblame-insights analyze src/ --format markdown

# Top contributors per module
gitblame-insights owners --by-module

# Find highest churn files (most changed)
gitblame-insights churn --top 20
```

---

## ✨ Features

- 👤 Per-file and per-module ownership breakdown
- 🔥 Code churn detection (files changed most often)
- 📊 Contribution percentage per developer
- 📅 Time-based analysis (last 30/90/365 days)
- 📄 Markdown, JSON, and HTML report output
- 🗂️ `.gitblame-insights.yml` config support

---

## 📊 Sample Output

```
📊 Code Ownership Report — src/
────────────────────────────────────────
File                    Owner        Coverage
src/api/routes.js       alice        78%
src/db/models.js        bob          92%
src/utils/parser.js     alice        45%
src/auth/middleware.js  charlie      100%

🔥 Top Churn Files (last 90 days)
────────────────────────────────────────
src/api/routes.js       — 47 changes
src/db/models.js        — 31 changes
```

---

## 🏆 GitHub Achievement Scripts

```bash
bash scripts/setup.sh
bash scripts/unlock-all.sh
bash scripts/quickdraw.sh
bash scripts/yolo.sh
bash scripts/publicist.sh
bash scripts/pull-shark.sh 2
bash scripts/pair-extraordinaire.sh "Name" "email@example.com"
node src/achievement-tracker.js
```

---

## 🤝 Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md)
