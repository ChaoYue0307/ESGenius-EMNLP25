# Security Policy

## Supported Versions

The public `main` branch is the supported branch for security reports.

## Reporting a Vulnerability

Please report security issues through the GitHub repository issue tracker or by contacting the repository maintainers through the associated organization.

Do not include private API keys, model credentials, or unpublished dataset material in public reports.

## Secrets

Evaluation scripts load credentials from `.env`. Do not commit real values for:

- `HF_TOKEN`
- `DASHSCOPE_API_KEY`
- `DEEPSEEK_API_KEY`
- `OPENAI_API_KEY`
