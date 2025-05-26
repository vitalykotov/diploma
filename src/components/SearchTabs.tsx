import React from "react";

interface SearchTabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

const SearchTabs: React.FC<SearchTabsProps> = ({ activeTab, onChange }) => {
  const tabs = [
    { id: "top", label: "Top Results" },
    { id: "artists", label: "Artists" },
    { id: "albums", label: "Albums" },
    { id: "tracks", label: "Tracks" },
  ];

  return (
    <div className="search-tabs">
      {tabs.map(tab => (
        <span
          key={tab.id}
          className={`tab${activeTab === tab.id ? " active" : ""}`}
          onClick={() => onChange(tab.id)}
          data-tab={tab.id}
          role="button"
          tabIndex={0}
          onKeyDown={e => { if (e.key === "Enter") onChange(tab.id); }}
        >
          {tab.label}
        </span>
      ))}
    </div>
  );
};

export default SearchTabs;
