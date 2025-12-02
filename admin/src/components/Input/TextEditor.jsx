import { useRef } from "react";
import JoditEditor from "jodit-pro-react";
import { useMemo } from "react";

const TextEditor = ({
  label,
  name,
  value = "",
  onChange = () => { },
  readonly = false,
  placeholder = "",
  height = 400,
  required = false,
  error = "",
}) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly,
      height,
      placeholder,
      uploader: {
        url: "https://xdsoft.net/jodit/finder/?action=fileUpload",
      },
      filebrowser: {
        ajax: {
          url: "https://xdsoft.net/jodit/finder/",
        },
        height: 580,
      },
    }),
    [readonly, height, placeholder]
  );

  return (
    <div className="form-wrap mb-3">
      {label && (
        <label className="col-form-label" htmlFor={name}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <div className={`border rounded ${error ? "border-danger" : "border-secondary"}`}>
        <JoditEditor
          ref={editor}
          value={value}
          config={config}
          tabIndex={1}
          onBlur={(content) => onChange(content)}
          onChange={() => { }}
        />
      </div>

      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default TextEditor;
