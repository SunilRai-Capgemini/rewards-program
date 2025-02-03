export const styles = {
  mainContainer: {
    minHeight: "100vh",
    padding: "2rem 0",
  },
  contentContainer: {
    borderRadius: 4,
    padding: "2rem",
    background: "#000",
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(0, 0, 0, 0.18)",
  },
  headerText: {
    textAlign: "center",
    fontWeight: 600,
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    py: 4,
    mb: 2,
  },
  formControl: {
    mb: 4,
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#2196F3",
      },
    },
  },
  inputLabel: {
    color: "#fff",
    "&.Mui-focused": {
      color: "#2196F3",
    },
  },
  select: {
    color: "#fff",
    ".MuiSelect-icon": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2196F3",
    },
  },
  menuItem: {
    "&:hover": {
      backgroundColor: "#e3f2fd",
    },
  },
  card: {
    mb: 4,
    borderRadius: 2,
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
    },
  },
  cardTitle: {
    fontWeight: 600,
    mb: 2,
    color: "#2196F3",
  },
  tableHeader: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    color: "white",
  },
  tableRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: "rgba(245, 245, 245, 0.9)",
    },
    "&:hover": {
      backgroundColor: "#e3f2fd",
    },
    transition: "background-color 0.2s ease",
  },
  totalRow: {
    backgroundColor: "#e3f2fd",
  },
  totalCell: {
    fontWeight: "bold",
  },
}; 