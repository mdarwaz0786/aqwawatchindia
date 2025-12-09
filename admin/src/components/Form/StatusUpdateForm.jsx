const StatusUpdateForm = ({
  id,
  currentStatus,
  status,
  approving,
  onChange,
  onSubmit,
  options = []
}) => {
  return (
    <form
      style={{ display: "flex", columnGap: "0.5rem" }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(id);
      }}
    >
      <select
        value={status[id] || currentStatus}
        onChange={(e) => onChange(id, e.target.value)}
        className="form-select"
      >
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={approving[id]}
      >
        Update
      </button>
    </form>
  );
};

export default StatusUpdateForm;
