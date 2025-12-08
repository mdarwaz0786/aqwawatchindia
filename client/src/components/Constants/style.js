export const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "50px",
    height: "50px",
    paddingLeft: "8px",
    borderColor: state.isFocused ? "#df4738" : "#ccc",
    boxShadow: state.isFocused ? "0 0 0 1px #df4738" : "none",
    "&:hover": { borderColor: "#df4738" },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 8px",
    height: "50px",
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor:
      state.isFocused || state.isSelected ? "#df4738" : "white",
    color: state.isFocused || state.isSelected ? "white" : "black",
    cursor: "pointer",
    padding: "10px 12px",
  }),
};
