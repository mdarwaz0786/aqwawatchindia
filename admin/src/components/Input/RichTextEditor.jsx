/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Link } from "@tiptap/extension-link";
import { Image } from "@tiptap/extension-image";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Node } from "@tiptap/core";

/* 🔹 Custom video embed extension */
const Video = Node.create({
  name: "video",
  group: "block",
  selectable: true,
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [{ tag: "iframe" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "iframe",
      {
        ...HTMLAttributes,
        width: "100%",
        height: "315",
        frameborder: "0",
        allowfullscreen: "true",
      },
    ];
  },

  addCommands() {
    return {
      setVideo:
        (options) =>
          ({ commands }) => {
            return commands.insertContent({
              type: this.name,
              attrs: options,
            });
          },
    };
  },
});

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      Color.configure({ types: [TextStyle.name] }),
      TextStyle,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Video, // ✅ added custom extension
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value]);

  if (!editor) return null;

  return (
    <div className="border rounded p-3 bg-white">
      {/* Toolbar */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="btn btn-sm btn-outline-dark"
        >
          <b>B</b>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="btn btn-sm btn-outline-dark"
        >
          <i>I</i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="btn btn-sm btn-outline-dark"
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="btn btn-sm btn-outline-dark"
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#ff0000").run()}
          className="btn btn-sm btn-outline-danger"
        >
          Red
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 2, cols: 2, withHeaderRow: true })
              .run()
          }
          className="btn btn-sm btn-outline-dark"
        >
          Table
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .setImage({ src: prompt("Enter Image URL:") })
              .run()
          }
          className="btn btn-sm btn-outline-dark"
        >
          Image
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .setVideo({
                src: prompt(
                  "Enter Video Embed URL (e.g. https://www.youtube.com/embed/ID):"
                ),
              })
              .run()
          }
          className="btn btn-sm btn-outline-dark"
        >
          Video
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .setLink({ href: prompt("Enter Link URL:") })
              .run()
          }
          className="btn btn-sm btn-outline-dark"
        >
          Link
        </button>
      </div>

      {/* Editor content */}
      <EditorContent editor={editor} className="form-control" style={{ minHeight: "200px" }} />
    </div>
  );
};

export default RichTextEditor;
