import { Addbook } from "./addbook";
import { useNavigate } from "react-router-dom";
import { is_Admin } from "../authentication/login";
import { useEffect } from "react";
export const Landing = () => {
  const navigate = useNavigate();
  useEffect(()=>{
        console.log(is_Admin)
    },[])
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
