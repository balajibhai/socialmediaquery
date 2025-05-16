import CloseIcon from "@mui/icons-material/Close";
import { Fab } from "@mui/material";
import { styled } from "@mui/system";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { AppContext } from "../../context/AppContext";
import { AppDispatch } from "../../redux/store";
import { removeComponent } from "../../redux/tabsSlice";

const StyledFab = styled(Fab)({
  position: "fixed",
  bottom: 16,
  right: 16,
  zIndex: 9999,
});

const FloatingButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { setMessages } = useContext(AppContext)!;

  const onClear = () => {
    dispatch(removeComponent({ key: "tab1" }));
    setMessages([]);
  };
  return (
    <StyledFab color="primary" aria-label="add" onClick={onClear}>
      <CloseIcon />
    </StyledFab>
  );
};

export default FloatingButton;
