import mermaid from 'mermaid';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.css';
import './styles/articles.scss';

// Markdown parsers emit <pre><code class="language-mermaid">…</code></pre>.
// Mermaid.js expects <div class="mermaid">, so rewrite those elements before
// highlight.js runs — converted blocks are no longer <pre><code> and are
// therefore invisible to hljs.highlightAll().
document.querySelectorAll('pre > code.language-mermaid').forEach(code => {
  const div = document.createElement('div');
  div.className = 'mermaid';
  div.textContent = code.textContent;
  code.closest('pre').replaceWith(div);
});

// Highlight all remaining code blocks.
// Blocks with a language-* class get explicit syntax highlighting;
// unlabelled blocks fall back to highlight.js auto-detection.
hljs.highlightAll();

mermaid.initialize({ startOnLoad: true });


