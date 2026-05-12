# ESGenius

[Website](https://angel-ntu.github.io/ESGenius/) | [Interactive heatmap](https://angel-ntu.github.io/ESGenius/heatmap.html) | [Paper](https://arxiv.org/pdf/2506.01646) | [License](LICENSE)

ESGenius is a benchmark for evaluating large language models on Environmental, Social, and Governance (ESG) and sustainability knowledge. It includes 1,136 multiple-choice questions, source-linked reference data, evaluation scripts, result figures, and a lightweight GitHub Pages site.

## Highlights

- 1,136 ESG and sustainability questions with A-D answer options plus `Z` for "Not sure".
- Source-grounded reference CSV with document names, page numbers, and supporting text snippets.
- Coverage across IPCC, GRI, SASB, ISO, IFRS/ISSB, TCFD, CDP, and related sustainability sources.
- Evaluation paths for local Hugging Face models, simple reference-aware RAG, and Dashscope-compatible Qwen APIs.
- Published visual results and a full interactive Plotly heatmap for 50 evaluated models.

## Repository Layout

```text
.
|-- index.html                         # Fast project homepage for GitHub Pages
|-- heatmap.html                       # Full interactive Plotly heatmap report
|-- assets/                            # Homepage CSS and JavaScript
|-- data/
|   |-- ESGenius_1136q.csv             # Plain question set
|   |-- ESGenius_1136q.json            # Plain question set in JSON
|   |-- ESGenius_w_ref_1136q.csv       # Questions with source references
|   `-- README.md                      # Dataset documentation
|-- figures/                           # Paper/result figures used by README and site
|-- results/                           # Published result images
|-- docs/evaluation.md                 # Evaluation workflow guide
|-- evaluation_utils.py                # Shared loading, prompts, metrics, and Excel export
|-- eval_opensource.py                 # Local Hugging Face zero-shot evaluation
|-- eval_opensource_rag.py             # Simple reference-aware RAG evaluation
`-- eval_qwen_api.py                   # Dashscope-compatible Qwen API evaluation
```

## Quick Start

Create an environment and install dependencies:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Copy the environment template and add credentials as needed:

```bash
cp .env.example .env
```

Run a small smoke test with a single local model:

```bash
python eval_opensource.py \
  --dataset ESGenius_1136q.csv \
  --models Qwen/Qwen2.5-0.5B-Instruct \
  --limit 10
```

Run the reference-aware RAG path:

```bash
python eval_opensource_rag.py \
  --dataset ESGenius_w_ref_1136q.csv \
  --models Qwen/Qwen2.5-0.5B-Instruct \
  --limit 10
```

Run the Qwen API path:

```bash
python eval_qwen_api.py \
  --dataset ESGenius_1136q.csv \
  --models Qwen2.5-Max \
  --limit 10
```

Results are written to `results/` as Excel workbooks with `summary` and `details` sheets.

Validate the static site locally:

```bash
python scripts/check_static_site.py
python -m http.server 8000
```

## Dataset

The primary dataset files are:

- `data/ESGenius_1136q.csv`
- `data/ESGenius_1136q.json`
- `data/ESGenius_w_ref_1136q.csv`

Core columns:

```csv
"query_id","new_id","query","answer","A","B","C","D","Z","ref_page","ref_doc","source_text"
```

See [data/README.md](data/README.md) for schema notes and usage guidance.

## Webpage

The GitHub Pages site is designed as a fast homepage with the full heavy report split out:

- `index.html` loads the project overview, dataset links, figures, and evaluation commands.
- `heatmap.html` preserves the original interactive Plotly report for detailed model/question inspection.
- `assets/site.css` and `assets/site.js` provide the responsive UI and figure selector.

## Figures

![Main results](figures/main_results.png)

![Accuracy versus model size](figures/acc_vs_model_size.png)

Additional figures are available in `figures/` and on the project website.

## Citation

If you use ESGenius, please cite the paper and repository metadata in [CITATION.cff](CITATION.cff).

```bibtex
@misc{he2025esgenius,
  title = {ESGenius: Benchmarking LLMs on Environmental, Social, and Governance (ESG) and Sustainability Knowledge},
  author = {He, Chaoyue and Zhou, Xin and Wu, Yi and Yu, Xinjia and Zhang, Yan and Zhang, Lei and Wang, Di and Lyu, Shengfei and Xu, Hong and Wang, Xiaoqiao and Liu, Wei and Miao, Chunyan},
  year = {2025},
  eprint = {2506.01646},
  archivePrefix = {arXiv},
  primaryClass = {cs.CL}
}
```

## License

This project is released under the [Apache 2.0 License](LICENSE).
