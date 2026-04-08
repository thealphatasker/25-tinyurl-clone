import { useState, useEffect } from "react";
import "./BodyMain1.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faHighlighter } from "@fortawesome/free-solid-svg-icons";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://tinyurl1.up.railway.app";

function BodyMain1() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentLinks, setRecentLinks] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/urls`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setRecentLinks(
            data.urls.map((u) => ({
              longUrl: u.longUrl,
              shortUrl: `${API_BASE}/${u.shortId}`,
            })),
          );
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl }),
      });
      const data = await res.json();
      if (data.ok) {
        setShortUrl(data.shortURL);
        setRecentLinks((prev) =>
          [{ longUrl, shortUrl: data.shortURL }, ...prev].slice(0, 5),
        );
        setLongUrl("");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Could not reach the server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (shortUrl) => {
    const shortId = shortUrl.split("/").pop();
    try {
      await fetch(`${API_BASE}/urls/${shortId}`, { method: "DELETE" });
      setRecentLinks((prev) => prev.filter((l) => l.shortUrl !== shortUrl));
    } catch {
      // silently fail
    }
  };

  return (
    <div className="body-part1">
      {/* Main Body Left Part */}
      <div className="body-p-left">
        <div className="bpl-heading">
          <h1>
            URL Shortener, Branded <br /> Short Links & Analytics
          </h1>
          <br />
        </div>

        <div className="bpl-paragraph">
          <p className="bpl-paragraph1">
            Welcome to the original link shortener — simplifying the Internet{" "}
            <br />
            through the power of the URL since 2002.
          </p>

          <p className="bpl-paragraph2">
            You can use branded domains for fully custom links, track link
            analytics, <br /> and enjoy other powerful features with our paid
            plans.
          </p>
        </div>

        <div className="bpl-btn">
          <button className="bpl-btn-plans">View Plans</button>
          <button className="bpl-btn-account">Create Free Account</button>
        </div>

        {/* Main Body Bottom Part */}
        <div className="main-body-bottom">
          <h2>Your Recent Links:</h2>

          {recentLinks.length === 0 ? (
            <div className="recent-links-alert">
              <i className="fa-solid fa-circle-exclamation alert-icon"></i>
              No links yet in your history
            </div>
          ) : (
            <div className="recent-links-list">
              {recentLinks.map((link, i) => (
                <div className="recent-link-item" key={i}>
                  <span className="recent-link-long">
                    {link.longUrl.length > 40
                      ? link.longUrl.slice(0, 40) + "…"
                      : link.longUrl}
                  </span>
                  <a
                    className="recent-link-short"
                    href={link.shortUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.shortUrl}
                  </a>
                  <button
                    className="delete-link-btn"
                    onClick={() => handleDelete(link.shortUrl)}
                    title="Remove"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="body-p-right">
        <button className="bpr-shorten-btn">
          <i
            className="bpr-shorten-btn-icon fa-solid fa-link"
            style={{ color: "#000000" }}
          ></i>
          Shorten a Link
        </button>
        <button className="bpr-qr-btn">
          <i
            className="bpr-qr-btn-icon fa-solid fa-qrcode"
            style={{ color: "rgb(0, 0, 0)" }}
          ></i>
          Generate QR Code
        </button>

        {/* Rightside Box */}
        <div className="Rightside-box">
          <form className="body-p-right-form" onSubmit={handleSubmit}>
            {/* Input 1 */}
            <div className="bpr-form-input1">
              <label className="bpr-form-label" htmlFor="user-url">
                <i
                  className="bpr-form-label-icon fa-solid fa-location-arrow"
                  style={{ color: "rgb(0, 0, 0)" }}
                ></i>
                Long URL
              </label>
              <br />
              <input
                className="bpr-form-input"
                type="text"
                name="user-rule"
                id="user-url"
                placeholder="Paste your long URL here"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                required
              />
            </div>
            <br />
            <div className="bottom-input">
              <div className="bpr-form-p2">
                <label className="bpr-form-label" htmlFor="bpr-form-select1">
                  <FontAwesomeIcon
                    className="bpr-form-label-icon"
                    icon={faGlobe}
                    style={{ color: "rgb(0, 0, 0)" }}
                  />
                  Domain
                </label>
                <br />
                <select
                  className="bpr-form-select"
                  name="bpr-form-select1"
                  id="bpr-form-select1"
                >
                  <option value="tinyurl.com">tinyurl.com</option>
                  <option value="theahsan.com">theahsan.com</option>
                </select>
              </div>
              <div className="bpr-form-p2-input2">
                <label className="bpr-form-label" htmlFor="alias-url">
                  <FontAwesomeIcon
                    className="bpr-form-label-icon"
                    icon={faHighlighter}
                    style={{ color: "rgb(0, 0, 0)" }}
                  />
                  Alias (optional)
                </label>
                <br />
                <input
                  className="bpr-form-input2"
                  type="text"
                  name="alias-rule"
                  id="alias-url"
                  placeholder="Add alias here"
                />
                <br />
                <label className="bpr-form-4" htmlFor="alias-url">
                  Must be at least 5 characters
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="bpr-form-submit-btn"
              disabled={loading}
            >
              {loading ? "Shortening..." : "Shorten Link"}
            </button>
            <br />
            {shortUrl && (
              <div className="short-url-result">
                <span>Short URL: </span>
                <a href={shortUrl} target="_blank" rel="noreferrer">
                  {shortUrl}
                </a>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() => navigator.clipboard.writeText(shortUrl)}
                >
                  Copy
                </button>
              </div>
            )}
            {error && <p className="short-url-error">{error}</p>}
            <br />
            <p className="bpr-form-p-terms">
              By clicking Shorten Link, you agree with our Terms of Service,
              Privacy Policy, <br /> and Use of Cookies.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BodyMain1;
