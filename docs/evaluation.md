# Evaluation Guide

This guide documents the three public evaluation paths in the repository.

## Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Fill in only the keys needed for the evaluation path you plan to run.

## Local Hugging Face Evaluation

```bash
python eval_opensource.py \
  --dataset ESGenius_1136q.csv \
  --models Qwen/Qwen2.5-0.5B-Instruct \
  --limit 10
```

Useful options:

- `--dataset`: CSV filename inside `data/`.
- `--models`: one or more Hugging Face model IDs.
- `--limit`: first N rows for a smoke test.
- `--results-folder`: output directory for Excel workbooks.
- `--force`: re-run even if a matching results workbook exists.

## Reference-Aware RAG Evaluation

```bash
python eval_opensource_rag.py \
  --dataset ESGenius_w_ref_1136q.csv \
  --models Qwen/Qwen2.5-0.5B-Instruct \
  --limit 10
```

The RAG path uses `source_text` from the reference CSV and prepends the most overlapping source snippet to each prompt. It is intentionally simple so the retrieval behavior is easy to audit.

## Qwen API Evaluation

```bash
python eval_qwen_api.py \
  --dataset ESGenius_1136q.csv \
  --models Qwen2.5-Max \
  --limit 10
```

This path uses `DASHSCOPE_API_KEY` from `.env` and writes the same Excel workbook structure as the local evaluation paths.

## Outputs

Each model produces an Excel workbook in `results/` unless a different folder is passed:

- `summary`: total questions, correct count, invalid count, wrong count, and accuracy.
- `details`: raw model output, normalized prediction, gold answer, question text, options, and any available reference columns.

## Reproducibility Notes

- Generation uses deterministic settings from `evaluation_utils.py`.
- Random seeds are set before evaluation.
- Existing result files are skipped by default to avoid accidental overwrites.
- Use `--force` only when intentionally regenerating outputs.
