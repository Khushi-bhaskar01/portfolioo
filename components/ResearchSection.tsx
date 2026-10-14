export function ResearchSection() {
  return (
    <section id="research" className="research editorial-block reveal">
      <div className="section-kicker">RESEARCH / 04</div>

      <div className="research-grid">
        <div className="research-copy">
          <h3>Transformer-Based Sentiment Analysis Utilizing DistilBERT</h3>
          <p>
            An NLP-focused research project exploring transformer-based sentiment classification, model selection, and practical deployment workflows.
          </p>
        </div>

        <div className="research-meta">
          <div><span>MODEL</span><strong>DistilBERT</strong></div>
          <div><span>TASK</span><strong>SENTIMENT CLASSIFICATION</strong></div>
          <div><span>DATASET</span><strong>IMDb</strong></div>
          <div><span>DOMAIN</span><strong>NLP / TRANSFORMERS</strong></div>
        </div>
      </div>

      <div className="research-note">
        Accepted and presented at ICICC 2026. DOI: {" "}
        <a href="https://link.springer.com/chapter/10.1007/978-3-032-28307-8_18" target="_blank" rel="noreferrer">
          10.1007/978-3-032-28307-8_18 ↗
        </a>
      </div>
    </section>
  );
}
