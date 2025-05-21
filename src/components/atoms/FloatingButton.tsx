import CloseIcon from "@mui/icons-material/Close";
import { Fab } from "@mui/material";
import { styled } from "@mui/system";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { AppContext } from "../../context/AppContext";
import { AppDispatch } from "../../redux/store";
import { toggle } from "../../redux/toggleSlice";
import { clearComponents } from "../../services/tabsService";

const StyledFab = styled(Fab)({
  position: "fixed",
  bottom: 16,
  right: 16,
  zIndex: 9999,
});

const FloatingButton = () => {
  const { setMessages } = useContext(AppContext)!;
  const dispatch = useDispatch<AppDispatch>();

  const onClear = async () => {
    await clearComponents("tab1");
    dispatch(toggle());
    setMessages([]);
  };
  return (
    <StyledFab color="primary" aria-label="add" onClick={onClear}>
      <CloseIcon />
    </StyledFab>
  );
};

export default FloatingButton;
