# ESGenius Dataset

This directory contains the public ESGenius question set in CSV and JSON formats.

## Files

- `ESGenius_1136q.csv`: plain benchmark questions.
- `ESGenius_1136q.json`: the same plain benchmark questions in JSON format.
- `ESGenius_w_ref_1136q.csv`: questions with reference metadata and source snippets.

## Plain Schema

| Column | Description |
| --- | --- |
| `query_id` | Stable question identifier used for evaluation and result joins. |
| `new_id` | Sequential question index. |
| `query` | Multiple-choice question stem. |
| `answer` | Gold option label. |
| `A`, `B`, `C`, `D` | Candidate answer options. |
| `Z` | Fallback option for "Not sure". |

## Reference Schema

The reference CSV includes the plain schema plus:

| Column | Description |
| --- | --- |
| `ref_page` | Page reference for the supporting source. |
| `ref_doc` | Source document name. |
| `source_text` | Supporting excerpt used for inspection or RAG experiments. |

## Usage Notes

- Treat `query_id` as a string when loading data so identifiers remain stable.
- The evaluation scripts normalize predictions to uppercase option labels.
- Use `ESGenius_w_ref_1136q.csv` for retrieval-augmented or citation-aware experiments.
- Keep the `Z` option in prompts. It is part of the benchmark protocol.
