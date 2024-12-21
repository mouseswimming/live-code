import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import React from "react";

function Document() {
  return (
    <div>
      <Header>
        <div className="flex items-center justify-between w-fit gap-2">
          <p className="document-title">Fake doc</p>
        </div>
      </Header>
      <Editor />
    </div>
  );
}

export default Document;
