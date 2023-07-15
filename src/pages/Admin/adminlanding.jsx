import { Addbook } from "./addbook";
import { useNavigate } from "react-router-dom";
export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div>
      <input
        type="button"
        value="ADD BOOKS"
        onClick={() => navigate("/addbook")}
      />
      <input
        type="button"
        value="VIEW BOOKS"
        onClick={() => navigate("/adminview")}
      />
    </div>
  );
};
