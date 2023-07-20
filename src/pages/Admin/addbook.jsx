import { db } from "../../config/firebase";
import { useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {is_Admin} from "../authentication/login";
import * as yup from "yup";
export const Addbook = () => {
  const [bookr, setBook] = useState({
    Title: "",
    Author: "",
    Publisher: "",
    Price: 0,
    Category: "",
    Avaliable: true
  });
  const navigate = useNavigate();

  const schema = yup.object().shape({
    Title: yup.string().required(),
    Author: yup.string().required(),
    Publisher: yup.string().required(),
    Price: yup.number().min(10).required(),
    Category: yup.string().required()
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const bColref = collection(db, "Books");

  const Onsubmit = async () => {
    addDoc(bColref, {
      Title: bookr.Title,
      Author: bookr.Author,
      Publisher: bookr.Publisher,
      Price: bookr.Price,
      Category: bookr.Category,
      Avaliable: true
    });
    alert("Book Successfully added!!");
    navigate("/addbook");
  };

  return (
    <div>
      {is_Admin ? (
        <>
          <form onSubmit={handleSubmit(Onsubmit)}>
            <input
              type="text"
              placeholder="Title of Book"
              {...register("Title")}
              onChange={(e) => {
                setBook((prev) => ({ ...prev, Title: e.target.value }));
              }}
            />
            <p style={{ color: "red" }}>{errors.Title?.message}</p>
            <input
              type="text"
              placeholder="Author"
              {...register("Author")}
              onChange={(e) => {
                setBook((prev) => ({ ...prev, Author: e.target.value }));
              }}
            />
            <p style={{ color: "red" }}>{errors.Author?.message}</p>
            <input
              type="text"
              placeholder="Publisher"
              {...register("Publisher")}
              onChange={(e) => {
                setBook((prev) => ({ ...prev, Publisher: e.target.value }));
              }}
            />
            <p style={{ color: "red" }}>{errors.Publisher?.message}</p>
            <input
              type="number"
              placeholder="Price"
              {...register("Price")}
              onChange={(e) => {
                setBook((prev) => ({ ...prev, Price: e.target.value }));
              }}
            />
            <p style={{ color: "red" }}>{errors.Price?.message}</p>
            <input
              type="text"
              placeholder="Category"
              {...register("Category")}
              onChange={(e) => {
                setBook((prev) => ({ ...prev, Category: e.target.value }));
              }}
            />
            <p style={{ color: "red" }}>{errors.Category?.message}</p>
            <input type="submit" value="Submit" />
          </form>
        </>
      ) : (
        navigate("/judadasx")
      )}
    </div>
  );
};
