import styles from "../components/QuoteGenerator.module.css";
import React, { useState, useRef, useEffect } from "react";
import { url, key, utter } from "../utils";

const QuoteGenerator = () => {
  const [quote, setQuote] = useState({ author: "", category: "", quote: "" });
  const [idx, setIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [show, setShow] = useState(false);

  const element = useRef<HTMLHeadingElement>(null);
  let interval: number | undefined;

  async function handleGenerateQuote(ev: React.MouseEvent) {
    ev.preventDefault();
    setIsTyping(true);
    if (element.current !== null) {
      element.current.textContent = "";
    }
    const quote = await fetch(url, {
      headers: { "X-Api-Key": key },
    });
    const response = await quote.json();
    setQuote.apply(null, response);
    setIdx(0);
    utter(response[0]);
  }

  function typeWriter() {
    if (idx < quote.quote.length && element.current !== null) {
      element.current.textContent += quote.quote.charAt(idx);
      setIdx((a) => a + 1);
    } else {
      setIsTyping(false);
    }
  }
  useEffect(() => {
    interval = setTimeout(typeWriter, Math.random() * (60 - 30) + 30);
    return () => {
      clearInterval(interval);
    };
  }, [idx, quote]);
  return (
    <div className={styles.center}>
      <h1 className={styles.head}>Welcome to Quote Generator</h1>

      <div className={styles.quoteWrapper}>
        <div className={styles.quote}>
          <h3 className={styles.cursor} ref={element}></h3>
        </div>
      </div>

      <div className={styles.metaData}>
        <div className={styles.author}>
          <span>
            Author:{" "}
            <a
              className={styles.anchor}
              target="_blank"
              onMouseEnter={() => {
                setShow(true);
              }}
              onMouseLeave={() => {
                setShow(false);
              }}
              href={`https://en.wikipedia.org/wiki/${quote.author.replaceAll(
                " ",
                "_"
              )}`}
            >
              {quote.author}
              <iframe
                className={styles.description}
                style={{ display: show ? "block" : "none" }}
                src={`https://en.wikipedia.org/wiki/${quote.author.replaceAll(
                  " ",
                  "_"
                )}`}
              ></iframe>
            </a>
          </span>
        </div>
        <div className={styles.category}>
          <span>Category: {quote.category}</span>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <button onClick={handleGenerateQuote} disabled={isTyping}>
          Generate
        </button>
      </div>
    </div>
  );
};

export default QuoteGenerator;
