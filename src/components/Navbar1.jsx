import { useRef, useState } from "react";

import "./Navbar1.css";

const items = [
  {
    name: "Shop",
    items: ["Nike", "Jordan", "Adidas"],
  },
  {
    name: "About",
  },
];

const Link = ({ item, activeItem, onHover }) => {
  const linkRef = useRef();

  const handleHover = () => {
    const rect = linkRef.current.getBoundingClientRect();
    onHover(item, `${rect.x}px`);
  };

  return (
    <a
      className={item?.name === activeItem?.name ? "active" : ""}
      ref={linkRef}
      onMouseEnter={handleHover}
    >
      {item.name}
    </a>
  );
};

const Search = () => (
  <div className="navbar-3-search">
    <span className="material-symbols-outlined"></span>
    <input type="text" placeholder="Search" />
  </div>
);

export const Navbar1 = () => {
  const [translateX, setTranslateX] = useState("0");
  const [activeItem, setActiveItem] = useState(null);

  const handleLinkHover = (item, x) => {
    setActiveItem(item || null);
    setTranslateX(x);
  };

  return (
    <section className="page navbar-3-page">
      <nav className="navbar-3">
        <img src="" />
        <div className="navbar-3-menu">
          {items.map((item) => (
            <Link
              activeItem={activeItem}
              item={item}
              onHover={handleLinkHover}
            />
          ))}
          <div
            style={{
              translate: `${translateX} 0`,
            }}
            className={`navbar-3-dropdown ${activeItem ? "visible" : ""}`}
          >
            {activeItem?.items?.map((link) => (
              <a key={link}>{link}</a>
            ))}
          </div>
        </div>
        <Search />
      </nav>
    </section>
  );
};

export default Navbar1