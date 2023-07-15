import "./login.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
//import { useAuthState } from "react-firebase-hooks/auth";
export const SignUp = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required(),
    phnumber: yup.number().min(999999999).max(10000000000).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(20).required(),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords donot match")
      .required()
  });
  const useCollref = collection(db, "Users");
  const [userc, setUserc] = useState({
    email: "",
    password: "",
    name: "",
    phoneNo: ""
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });
  const naviagate = useNavigate();
  const oSubmit = async (data) => {
    console.log(data);
    console.log(userc);
    await createUserWithEmailAndPassword(
      auth,
      userc.email,
      userc.password
    ).then((res) => {
      console.log(res);
    }),
      addDoc(useCollref, {
        name: userc.name,
        email: userc.email,
        password: userc.password,
        isAdmin: false,
        phoneno: userc.phoneNo
      });
    naviagate("/");
  };
  const navtoSigin = () => {
    naviagate("/login-module");
  };

  return (
    <div className="form-c">
      this is signup module
      <form onSubmit={handleSubmit(oSubmit)}>
        <input
          type="text"
          placeholder="fullName"
          {...register("fullName")}
          onChange={(e) => {
            setUserc((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
        <p style={{ color: "red" }}>{errors.fullName?.message}</p>
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
          type="text"
          placeholder="PhoneNumber"
          {...register("phnumber")}
          onChange={(e) => {
            setUserc((prev) => ({ ...prev, phoneNo: e.target.value }));
          }}
        />
        <p style={{ color: "red" }}>{errors.phnumber?.message}</p>
        <input
          type="Password"
          placeholder="Password"
          {...register("password")}
        />
        <p style={{ color: "red" }}>{errors.password?.message}</p>
        <input
          type="Password"
          placeholder="Confirm Password"
          {...register("confirmpassword")}
          onChange={(e) => {
            setUserc((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        <p style={{ color: "red" }}>{errors.confirmpassword?.message}</p>
        <input type="submit" />
      </form>
      <h4>
        Already have an Accuont ? <button onClick={navtoSigin}>SignIn</button>
      </h4>
    </div>
  );
};
