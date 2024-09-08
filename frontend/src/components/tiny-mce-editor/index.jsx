import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const CommonTinyMCEEditor = ({ value, onChange }) => {
  return (
    <Editor
      value={value}
      apiKey="hf3si7t0jhbl7j2j18f1mz5q7yurlyzy9d5zf8gpf2h9kp4n"
      init={{
        height: 300,
        plugins: "autoresize link image",
        toolbar:
          "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        setup: (editor) => {
          editor.on("change", () => {
            const content = editor.getContent();
            onChange(content);
          });
        },
      }}
      onEditorChange={(content) => {
        onChange(content);
      }}
    />
  );
};

export default CommonTinyMCEEditor;
