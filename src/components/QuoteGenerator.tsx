import styles from "../components/QuoteGenerator.module.css";
import React, { useState, useRef, useEffect } from "react";
import { url, key } from "../utils";

const QuoteGenerator = () => {
  const [quote, setQuote] = useState({ author: "", category: "", quote: "" });
  const [idx, setIdx] = useState(0);

  const element = useRef<HTMLHeadingElement>(null);
  let interval: number | undefined;

  async function handleGenerateQuote(ev: React.MouseEvent) {
    ev.preventDefault();
    if (element.current !== null) {
      element.current.textContent = "";
    }
    const quote = await fetch(url, {
      headers: { "X-Api-Key": key },
    });
    const response = await quote.json();
    setQuote.apply(null, response);
    setIdx(0);
  }

  function typeWriter() {
    if (idx < quote.quote.length && element.current !== null) {
      element.current.textContent += quote.quote.charAt(idx);
      setIdx((a) => a + 1);
    }
  }
  useEffect(() => {
    console.log("rerender");
    interval = setTimeout(typeWriter, 66);
    return () => {
      clearInterval(interval);
    };
  }, [idx, quote]);
  return (
    <div className={styles.center}>
      <h1 className={styles.head}>Welcome to Quote Generator</h1>

      <div className={styles.quoteWrapper}>
        <div className={styles.quote}>
          <h3 ref={element}></h3>
        </div>
      </div>

      <div className={styles.metaData}>
        <div className={styles.author}>
          <span>Author: {quote.author}</span>
        </div>
        <div className={styles.category}>
          <span>Category: {quote.category}</span>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <button onClick={handleGenerateQuote}>Generate</button>
      </div>
    </div>
  );
};

export default QuoteGenerator;
