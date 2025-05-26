import React, { useState, useRef, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
const Header: React.FC = () => {
  const [searchActive, setSearchActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();


  const openSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSearchActive(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const closeSearch = () => setSearchActive(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = inputRef.current?.value.trim();
    if (q) {
      setSearchActive(false);
      history.push(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  return (
    <header className="header">
      <div className="header-bar">
        <div className="logo">last.fm</div>
        <nav className="nav">
          <button className="search-toggle" aria-label="Search" onClick={openSearch}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="7" stroke="#fff" strokeWidth="2" />
              <line x1="14.5" y1="14.5" x2="19" y2="19" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <form
            className={`search-form${searchActive ? " active" : ""}`}
            onSubmit={onSubmit}
            onBlur={closeSearch}
          >
            <input
              type="text"
              className="search-input"
              placeholder="Search music, artists..."
              ref={inputRef}
              required
            />
          </form>
          <Link to="/">Home</Link>
          <a href="#">Live</a>
          <a href="#">Music</a>
          <a href="#">Charts</a>
          <a href="#">Events</a>
          <a href="#">Features</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
