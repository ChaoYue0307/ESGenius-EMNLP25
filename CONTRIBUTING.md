# Contributing

Thanks for improving ESGenius. This repository is small by design, so contributions should keep the benchmark easy to inspect and reproduce.

## Good Contributions

- Fixes to dataset documentation or schema explanations.
- Evaluation script improvements that preserve existing output formats.
- Result visualizations or website improvements that keep source files lightweight.
- Bug reports with model name, command, dataset file, environment, and traceback.

## Development Checks

Run these before opening a pull request:

```bash
python -m py_compile evaluation_utils.py eval_opensource.py eval_opensource_rag.py eval_qwen_api.py
python -m http.server 8000
```

Then open `http://localhost:8000/` and confirm the homepage, figures, dataset links, and `heatmap.html` load.

## Data Changes

Dataset changes should explain:

- Which file changed.
- How many rows changed.
- Whether `query_id` values stayed stable.
- Whether references or source excerpts changed.
- How the change affects existing result files.
