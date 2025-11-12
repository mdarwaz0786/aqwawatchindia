import { useState } from "react";
import TextEditor from "./components/Input/TextEditor";

const Test = () => {
  const [content, setContent] = useState("");

  return (
    <div className="container mt-4">
      <h5 className="mb-3">Write your blog content</h5>
      <TextEditor
        value={content}
        onChange={setContent}
        placeholder="Write your blog post here..."
      />
      <button
        className="btn btn-primary mt-3"
        onClick={() => console.log(content)}
      >
        Save Post
      </button>
    </div>
  );
};

export default Test;
