import "./login.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
let is_Admin = false;

export const Login = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required("This is required"),
    password: yup.string().min(6).max(20).required("Password is required")
  });
  const [user_, setuser_] = useState([]);

  const useref = collection(db, "Users");

  const getuseres = async () => {
    const datum = await getDocs(useref);
    datum.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      setuser_((prev) => {
        return [...prev, { user: doc.data(), id: doc.id }];
      });
      //console.log(user_[3])
    });
    user_.map((us, k) => {
      //console.log(us.user.email)

      if (us.user.email === userc.email) {
        console.log(us.id);
        console.log("Enters");
        if (us.user.isAdmin) {
          is_Admin = true;
          console.log(is_Admin);
        }
      }
    });

    console.log();
  };
  useEffect(() => {
    getuseres();
  }, []);

  const [userc, setUserc] = useState({
    email: "",
    password: ""
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });
  const oSubmit = (data) => {
    console.log(data);
    console.log(userc);
    signInWithEmailAndPassword(auth, userc.email, userc.password).then(
      (res) => {
        console.log(res);
        console.log(is_Admin);
        is_Admin ? navigate("/alanding") : navigate("/ulanding");
      }
    );
  };
  const navigate = useNavigate();
  const gotoSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="form-c">
      this is login module
      <form onSubmit={handleSubmit(oSubmit)}>
        <input
          type="text"
          placeholder="Email"
          {...register("email")}
          onChange={(e) => {
            setUserc((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <p style={{ color: "red" }}>{errors.email?.message}</p>
        <input
          type="Password"
          placeholder="Password"
          {...register("password")}
          onChange={(e) => {
            setUserc((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        <p style={{ color: "red" }}>{errors.password?.message}</p>
        <input type="submit" />
      </form>
      <h4>
        New user? <button onClick={gotoSignup}>signup here</button>
      </h4>{" "}
    </div>
  );
};
