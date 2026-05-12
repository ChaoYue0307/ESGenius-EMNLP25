const figures = {
  main: {
    src: "figures/main_results.png",
    alt: "Main ESGenius benchmark results",
    caption: "Main ESGenius benchmark results."
  },
  size: {
    src: "figures/acc_vs_model_size.png",
    alt: "Accuracy plotted against model size",
    caption: "Accuracy by model size across evaluated systems."
  },
  questions: {
    src: "figures/ESGenius_QA_question_wordcloud.png",
    alt: "Word cloud of ESGenius question terms",
    caption: "Question-term distribution across ESGenius prompts."
  },
  sources: {
    src: "figures/ESGenius_Source_Text_wordcloud.png",
    alt: "Word cloud of ESGenius source text terms",
    caption: "Source-term distribution from reference excerpts."
  }
};

const figureImage = document.querySelector("#figure-image");
const figureCaption = document.querySelector("#figure-caption");
const figureButtons = document.querySelectorAll("[data-figure]");

figureButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = figures[button.dataset.figure];
    if (!selected || !figureImage || !figureCaption) return;

    figureButtons.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-selected", "false");
    });

    button.classList.add("is-active");
    button.setAttribute("aria-selected", "true");
    figureImage.src = selected.src;
    figureImage.alt = selected.alt;
    figureCaption.textContent = selected.caption;
  });
});

const copyButtons = document.querySelectorAll("[data-copy-target]");

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    const text = target?.textContent?.trim();
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      const previousLabel = button.textContent;
      button.textContent = "Copied";
      button.classList.add("is-copied");
      window.setTimeout(() => {
        button.textContent = previousLabel;
        button.classList.remove("is-copied");
      }, 1800);
    } catch {
      button.textContent = "Select BibTeX";
      target.focus?.();
    }
  });
});
