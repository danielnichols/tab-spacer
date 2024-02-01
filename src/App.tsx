import React, { useState, useEffect } from "react";
import _ from "lodash";

import "./styles.scss";

function createTabTitle(
  title = "",
  prefix = "",
  suffix = "",
  targetLength = 25
) {
  // Calculate Padding
  const padLength = Math.floor(
    (targetLength - title.length - prefix.length - suffix.length) / 2
  );
  const pad = "\u205f​​​".repeat(Math.max(padLength, 1));

  // Assemble Title
  const newTitle = `${prefix}${pad}${title}${pad}${suffix}`;
  return newTitle;
}

function setTitle(title: string) {
  document.title = title;
}

const setTitleDebounced = _.debounce(setTitle, 1000);

export default function App() {
  // Set up state for title segments
  const url = new URL(document.location.href);
  const [titleState, setTitleState] = useState(
    (url.searchParams.get("title") as unknown as string) || ""
  );
  const [prefixState, setPrefixState] = useState(
    (url.searchParams.get("prefix") as unknown as string) || "///"
  );
  const [suffixState, setSuffixState] = useState(
    (url.searchParams.get("suffix") as unknown as string) || "///"
  );
  const [targetLengthState, setTargetLengthState] = useState(
    url.searchParams.get("targetLength") || "30"
  );

  // Field width state
  const [columnState, setColumnState] = useState({
    prefix: prefixState?.length + 2 || 5,
    title: (titleState?.length <= 0 ? 3 : titleState.length) + 2 || 5,
    suffix: suffixState?.length + 2 || 5,
  });

  // Handle form value changes
  function handlePrefixChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPrefixState(e.target.value);
    const columns = columnState;
    const length = e.target.value.length;
    columns.prefix = length <= 0 ? 5 : length + 2;
    setColumnState(columns);
  }
  function handleTitleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTitleState(e.target.value);
    // console.log(columnState, e.target.scrollWidth, e.target.cols);
    const columns = columnState;
    const length = e.target.value.length;
    columns.title = length <= 0 ? 5 : length + 2;
    setColumnState(columns);
  }
  function handleSuffixChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setSuffixState(e.target.value);
    const columns = columnState;
    const length = e.target.value.length;
    columns.suffix = length <= 0 ? 5 : length + 2;
    setColumnState(columns);
  }
  function handleTargetLengthChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTargetLengthState(e.target.value);
  }

  useEffect(() => {
    // Set page title
    const newTitle = createTabTitle(
      titleState,
      prefixState,
      suffixState,
      Number.parseInt(targetLengthState)
    );
    setTitleDebounced(newTitle);

    // Update URL with new data
    url.searchParams.set("title", titleState);
    url.searchParams.set("prefix", prefixState);
    url.searchParams.set("suffix", suffixState);
    url.searchParams.set("targetLength", targetLengthState as string);
    window.history.pushState("", "", url.href);
  });

  return (
    <>
      <div className="titleTextWrapper">
        <textarea
          value={prefixState}
          placeholder="Prefix"
          onChange={handlePrefixChange}
          rows={1}
          cols={columnState.prefix}
        />
        <textarea
          value={titleState}
          placeholder="Title"
          onChange={handleTitleChange}
          rows={1}
          cols={columnState.title}
        />
        <textarea
          value={suffixState}
          placeholder="Suffix"
          onChange={handleSuffixChange}
          rows={1}
          cols={columnState.suffix}
        />
      </div>
      <div className="targetLengthWrapper">
        <input
          type="range"
          value={Number.parseInt(targetLengthState)}
          onChange={handleTargetLengthChange}
          min={0}
          max={99}
        />
        <input
          type="number"
          value={Number.parseInt(targetLengthState)}
          onChange={handleTargetLengthChange}
          min={0}
          max={99}
        />
      </div>
    </>
  );
}
