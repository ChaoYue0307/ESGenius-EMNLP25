---
license: apache-2.0
language:
  - en
task_categories:
  - question-answering
  - text-classification
pretty_name: ESGenius
size_categories:
  - 1K<n<10K
configs:
  - config_name: plain
    data_files:
      - split: test
        path: data/ESGenius_1136q.csv
  - config_name: reference
    data_files:
      - split: test
        path: data/ESGenius_w_ref_1136q.csv
tags:
  - esg
  - sustainability
  - climate-disclosure
  - governance
  - benchmark
  - llm-evaluation
  - multiple-choice
  - emnlp-2025
---

# ESGenius

ESGenius is an EMNLP 2025 Main Conference Oral benchmark for evaluating large language models on Environmental, Social, and Governance (ESG) and sustainability knowledge. The paper was nominated for the EMNLP 2025 Resource and Theme Paper Awards, Top 1%.

- Paper: https://aclanthology.org/2025.emnlp-main.739/
- Project site: https://angel-ntu.github.io/ESGenius/
- GitHub repository: https://github.com/ANGEL-NTU/ESGenius
- Interactive heatmap: https://angel-ntu.github.io/ESGenius/heatmap.html

## Dataset Summary

The release contains 1,136 expert multiple-choice questions with an A-D answer protocol and a `Z` option for uncertainty. The benchmark covers sustainability reporting, climate disclosure, biodiversity, energy, governance, and ESG reasoning across major standards and disclosure contexts including IPCC, GRI, SASB, ISO, IFRS/ISSB, TCFD, and CDP.

## Files

| Path | Description |
| --- | --- |
| `data/ESGenius_1136q.csv` | Main plain CSV benchmark for standard evaluation |
| `data/ESGenius_1136q.json` | JSON mirror of the plain benchmark |
| `data/ESGenius_w_ref_1136q.csv` | Reference-aware benchmark with source document metadata and supporting excerpts |
| `data/README.md` | Dataset schema and usage notes |
| `eval_opensource.py` | Local Hugging Face model evaluation |
| `eval_opensource_rag.py` | Reference-aware prompting evaluation |
| `eval_qwen_api.py` | Dashscope-compatible Qwen API evaluation |
| `evaluation_utils.py` | Shared loading, prompting, parsing, metrics, and export utilities |
| `docs/evaluation.md` | Evaluation guide |

## Schema

| Column | Description |
| --- | --- |
| `query_id` | Stable question identifier used for evaluation and result joins |
| `new_id` | Sequential question index |
| `query` | Multiple-choice question stem |
| `answer` | Gold option label |
| `A`, `B`, `C`, `D` | Candidate answer options |
| `Z` | "Not sure" option |
| `ref_page` | Page reference for the supporting source, reference CSV only |
| `ref_doc` | Source document name, reference CSV only |
| `source_text` | Supporting excerpt, reference CSV only |

## Usage

Download the release:

```bash
hf download cy0307/ESGenius \
  --type dataset \
  --local-dir ESGenius-HF
```

Run a local smoke test:

```bash
python eval_opensource.py \
  --dataset ESGenius_1136q.csv \
  --models Qwen/Qwen2.5-0.5B-Instruct \
  --limit 10
```

Run a reference-aware smoke test:

```bash
python eval_opensource_rag.py \
  --dataset ESGenius_w_ref_1136q.csv \
  --models Qwen/Qwen2.5-0.5B-Instruct \
  --limit 10
```

## Reproducibility Notes

- Treat `query_id` as a string when loading data so identifiers remain stable.
- Keep the `Z` option in prompts; it is part of the benchmark protocol.
- Use deterministic generation settings from `evaluation_utils.py`.
- Use the reference-aware CSV when an experiment depends on source snippets.
- Report both accuracy and invalid or abstention behavior when comparing models.

## Citation

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
