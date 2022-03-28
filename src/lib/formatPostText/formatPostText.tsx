import React, { ReactElement } from 'react';

export default function formatPostText(textContent: string): ReactElement[] {
  let textExludeLineBreaks = textContent.split(/\r\n/);

  if (textExludeLineBreaks.length === 1) {
    textExludeLineBreaks = textContent.split(/\n/);
  }
  if (textExludeLineBreaks.length === 1) {
    textExludeLineBreaks = textContent.split(/\r/);
  }

  const contentArray: ReactElement[] = [];
  textExludeLineBreaks.forEach((val, index) => {
    if (index !== 0) {
      const linebreakKey = index * 2 - 1;
      const linebreakElement = (<br key={linebreakKey} />);
      contentArray.push(linebreakElement);
    }
    const spanKey = index * 2;
    const spanElement = (<span key={spanKey}>{val}</span>);
    contentArray.push(spanElement);
  });

  return contentArray;
}
