<p align="center">
  <img src="assets/esgenius-logo.png" alt="ESGenius logo" width="132">
</p>

<h1 align="center">ESGenius</h1>

<p align="center">
  <strong>Benchmarking LLMs on Environmental, Social, and Governance (ESG) and Sustainability Knowledge</strong>
</p>

<p align="center">
  EMNLP 2025 Main Conference Oral | Resource and Theme Paper Award nominations (Top 1%)
</p>

<p align="center">
  <a href="https://angel-ntu.github.io/ESGenius/">Website</a> |
  <a href="https://angel-ntu.github.io/ESGenius/heatmap.html">Interactive Heatmap</a> |
  <a href="https://aclanthology.org/2025.emnlp-main.739/">ACL Anthology</a> |
  <a href="https://aclanthology.org/2025.emnlp-main.739.pdf">PDF</a> |
  <a href="docs/evaluation.md">Evaluation Guide</a> |
  <a href="data/README.md">Dataset Docs</a>
</p>

---

ESGenius is a multiple-choice benchmark for evaluating whether large language models understand ESG and sustainability knowledge at the level needed for standards-aware reasoning. It contains expert-written questions, source-grounded references, reproducible evaluation scripts, published result figures, and a lightweight GitHub Pages site for fast inspection.

## At a Glance

| Item | Details |
| --- | --- |
| Paper | EMNLP 2025 Main Conference Oral |
| Recognition | Nominated for Resource and Theme Paper Awards (Top 1%) |
| Benchmark size | 1,136 multiple-choice questions |
| Answer protocol | `A`, `B`, `C`, `D`, plus `Z` for "Not sure" |
| Model results | 50 evaluated models with ranking figures and a question-level heatmap |
| References | Source document names, page references, and supporting excerpts in the reference CSV |
| License | Apache 2.0 |

## Why ESGenius?

Sustainability and ESG work is full of specialized terminology, reporting standards, and source-dependent distinctions. ESGenius is designed to test that knowledge directly rather than relying on generic factual recall.

- Covers sustainability reporting, climate disclosure, biodiversity, energy, governance, and standards-driven ESG reasoning.
- Draws on IPCC, GRI, SASB, ISO, IFRS/ISSB, TCFD, CDP, and related sustainability sources.
- Keeps a `Z` option for abstention-style behavior when a model is unsure.
- Provides both plain benchmark files and reference-aware files for retrieval or audit experiments.
- Includes open evaluation paths for local Hugging Face models, reference-aware prompting, and Dashscope-compatible Qwen APIs.

## Repository Map

| Path | Purpose |
| --- | --- |
| `index.html` | Fast project homepage for GitHub Pages |
| `heatmap.html` | Full interactive Plotly heatmap for model-question inspection |
| `assets/` | Homepage styles, JavaScript, and ESGenius logo |
| `data/ESGenius_1136q.csv` | Plain question set in CSV |
| `data/ESGenius_1136q.json` | Plain question set in JSON |
| `data/ESGenius_w_ref_1136q.csv` | Questions with source references and supporting excerpts |
| `docs/evaluation.md` | Detailed evaluation workflow guide |
| `evaluation_utils.py` | Shared loading, prompting, parsing, metrics, and Excel export utilities |
| `eval_opensource.py` | Local Hugging Face evaluation path |
| `eval_opensource_rag.py` | Simple reference-aware RAG evaluation path |
| `eval_qwen_api.py` | Dashscope-compatible Qwen API evaluation path |
| `figures/` | Paper and site figures |
| `results/` | Published result images and generated evaluation outputs |
| `CITATION.cff` | Repository and preferred paper citation metadata |

## Quick Start

Create an environment:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Copy the environment template:

```bash
cp .env.example .env
```

Run a small local smoke test:

```bash
python eval_opensource.py \
  --dataset ESGenius_1136q.csv \
  --models Qwen/Qwen2.5-0.5B-Instruct \
  --limit 10
```

Results are written to `results/` as Excel workbooks with `summary` and `details` sheets.

## Dataset

The public dataset lives in `data/`.

| File | Use |
| --- | --- |
| `ESGenius_1136q.csv` | Main CSV benchmark for standard evaluation |
| `ESGenius_1136q.json` | JSON mirror of the plain benchmark |
| `ESGenius_w_ref_1136q.csv` | Reference-aware version with `ref_page`, `ref_doc`, and `source_text` |

Core fields:

| Column | Description |
| --- | --- |
| `query_id` | Stable question identifier |
| `new_id` | Sequential question index |
| `query` | Question stem |
| `A`, `B`, `C`, `D` | Candidate answer options |
| `Z` | "Not sure" option |
| `answer` | Gold option label |
| `ref_page`, `ref_doc`, `source_text` | Reference metadata and excerpt in the reference CSV |

See [data/README.md](data/README.md) for schema notes and usage guidance.

## Evaluation

The repository provides three evaluation paths with shared parsing, normalization, metrics, and workbook-export utilities.

| Path | Script | Typical use |
| --- | --- | --- |
| Local open-source models | `eval_opensource.py` | Run Hugging Face causal language models locally |
| Reference-aware prompting | `eval_opensource_rag.py` | Prepend source snippets from the reference CSV |
| Qwen API | `eval_qwen_api.py` | Evaluate Dashscope-compatible Qwen models with retry handling |

Reference-aware smoke test:

```bash
python eval_opensource_rag.py \
  --dataset ESGenius_w_ref_1136q.csv \
  --models Qwen/Qwen2.5-0.5B-Instruct \
  --limit 10
```

Qwen API smoke test:

```bash
python eval_qwen_api.py \
  --dataset ESGenius_1136q.csv \
  --models Qwen2.5-Max \
  --limit 10
```

For all options, output structure, and reproducibility notes, see [docs/evaluation.md](docs/evaluation.md).

## Results and Webpage

The project website keeps the overview lightweight and sends detailed inspection to the full heatmap page:

- [Project homepage](https://angel-ntu.github.io/ESGenius/)
- [Interactive heatmap](https://angel-ntu.github.io/ESGenius/heatmap.html)
- [ACL Anthology record](https://aclanthology.org/2025.emnlp-main.739/)

<p align="center">
  <img src="figures/main_results.png" alt="Main ESGenius benchmark results" width="760">
</p>

<p align="center">
  <em>Main ESGenius benchmark results. Additional figures are available in <code>figures/</code> and on the project website.</em>
</p>

Validate the static site locally:

```bash
python scripts/check_static_site.py
python -m http.server 8000
```

Then open `http://127.0.0.1:8000/`.

## Citation

If you use ESGenius, please cite the EMNLP 2025 paper and repository metadata in [CITATION.cff](CITATION.cff).

```bibtex
@inproceedings{he-etal-2025-esgenius,
  title = "{ESG}enius: Benchmarking {LLM}s on Environmental, Social, and Governance ({ESG}) and Sustainability Knowledge",
  author = "He, Chaoyue and Zhou, Xin and Wu, Yi and Yu, Xinjia and Zhang, Yan and Zhang, Lei and Wang, Di and Lyu, Shengfei and Xu, Hong and Xiaoqiao, Wang and Liu, Wei and Miao, Chunyan",
  editor = "Christodoulopoulos, Christos and Chakraborty, Tanmoy and Rose, Carolyn and Peng, Violet",
  booktitle = "Proceedings of the 2025 Conference on Empirical Methods in Natural Language Processing",
  month = nov,
  year = "2025",
  address = "Suzhou, China",
  publisher = "Association for Computational Linguistics",
  url = "https://aclanthology.org/2025.emnlp-main.739/",
  doi = "10.18653/v1/2025.emnlp-main.739",
  pages = "14612--14653",
  ISBN = "979-8-89176-332-6"
}
```

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidance. For vulnerability reporting, see [SECURITY.md](SECURITY.md).

## License

This project is released under the [Apache 2.0 License](LICENSE).
