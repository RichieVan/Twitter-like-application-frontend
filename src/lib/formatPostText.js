import React from "react";

export default function FormatPostText (textContent) {
    let textExludeLineBreaks = textContent.split(/\r\n/);

    if (textExludeLineBreaks.length == 1) {
        textExludeLineBreaks = textContent.split(/\n/);
    }
    if (textExludeLineBreaks.length == 1) {
        textExludeLineBreaks = textContent.split(/\r/);
    }

    let contentArray = [];
    textExludeLineBreaks.map((val, index) => {
        if (index !== 0) {
            contentArray.push(<br key={index * 2 - 1}/>);
        }
        contentArray.push(<span key={index * 2}>{val}</span>);
    });

    return contentArray;
}