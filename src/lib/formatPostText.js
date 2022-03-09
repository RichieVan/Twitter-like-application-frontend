import React from 'react';

export default function FormatPostText(textContent) {
  let textExludeLineBreaks = textContent.split(/\r\n/);

  if (textExludeLineBreaks.length === 1) {
    textExludeLineBreaks = textContent.split(/\n/);
  }
  if (textExludeLineBreaks.length === 1) {
    textExludeLineBreaks = textContent.split(/\r/);
  }

  const contentArray = [];
  textExludeLineBreaks.forEach((val, index) => {
    if (index !== 0) {
      const linebreakKey = index * 2 - 1;
      contentArray.push(<br key={linebreakKey} />);
    }
    const spanKey = index * 2;
    contentArray.push(<span key={spanKey}>{val}</span>);
  });

  return contentArray;
}
