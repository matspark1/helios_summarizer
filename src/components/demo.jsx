import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="article-section">
      {/* Search */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <img src={linkIcon} alt="link_icon" className="link-icon" />
        <input
          type="url"
          placeholder="Place your link here"
          value={article.url}
          onChange={(e) =>
            setArticle({
              ...article,
              url: e.target.value,
            })
          }
          required
          className="url_input"
        />
        <button type="submit">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </form>

      {/* Results */}
      <div className="loader">
        {isFetching ? (
          <img src={loader} alt="loader" />
        ) : error ? (
          <p>
            {" "}
            Looks like we've ran into an error... <br />
            <span>{error?.data?.error}</span>
          </p>
        ) : (
          article.summary && (
            <div className="article-holder">
              <h2>Article Summary</h2>
              <div>
                <div
                  className="copy-btn2"
                  onClick={() => handleCopy(article.summary)}
                >
                  <img
                    src={copied === article.summary ? tick : copy}
                    alt="copy_icon"
                    className="w-[40%] h-[40%] object-contain"
                  />
                </div>
                <p>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
      {/* URL History */}
      <div className="links-holder">
        <h2 className="past">Past Articles</h2>
        {allArticles.map((item, index) => (
          <div
            className="all-links"
            key={`link-${index}`}
            onClick={() => setArticle(item)}
          >
            <div className="copy-btn" onClick={() => handleCopy(item.url)}>
              <img src={copied === item.url ? tick : copy} alt="copy_icon" />
            </div>
            <p>{item.url}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Demo;
