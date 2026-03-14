import mermaid from 'mermaid';

// Markdown parsers emit <pre><code class="language-mermaid">…</code></pre>.
// Mermaid.js expects <div class="mermaid">, so rewrite those elements first.
document.querySelectorAll('pre > code.language-mermaid').forEach(code => {
    const div = document.createElement('div');
    div.className = 'mermaid';
    div.textContent = code.textContent;
    code.closest('pre').replaceWith(div);
});

mermaid.initialize({ startOnLoad: true });

