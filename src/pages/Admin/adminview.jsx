import "./view.css";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import is_Admin from "../authentication/login";

function MyVerticallyCenteredModal(props) {
  const navigate = useNavigate();
  const { daataa } = props;
  const [T, sett] = useState();
  const [Au, setau] = useState();
  const [Pu, setPu] = useState();
  const [Pr, setpr] = useState();
  const [C, setc] = useState();
  const [Av, setav] = useState();
  const booke = {
    Title: daataa.data.Title,
    Author: daataa.data.Author,
    Publisher: daataa.data.Publisher,
    Price: daataa.data.Price,
    Category: daataa.data.Category,
    Avaliable: daataa.data.Avaliable
  };
  console.log("Check this ==> ");
  console.log({ daataa });
  const abc = daataa.Id;

  const deletedocu = async () => {
    await deleteDoc(doc(db, "Books", abc)).then((res) => {
      window.location.reload(false);
      toast.success("Deleted Successfully");
    });
  };

  const handleChange = () => {
    const upref = doc(db, "Books", abc);
    updateDoc(upref, {
      Title: T ? T : booke.Title,
      Author: Au ? Au : booke.Author,
      Publisher: Pu ? Pu : booke.Publisher,
      Price: Pr ? Pr : booke.Price,
      Category: C ? C : booke.Category,
      Avaliable: Av ? Av : booke.Avaliable
    })
      .then((res) => {
        toast.success("Book Updated Successfully");
        window.location.reload(false);
      })
      .catch((Error) => {
        toast.success("Failed");
      });
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Update</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          defaultValue={booke?.Title}
          placeholder="Title of Book"
          onChange={(e) => {
            sett(e.target.value);
          }}
        />
        <input
          type="text"
          defaultValue={booke?.Author}
          placeholder="Author"
          onChange={(e) => {
            setau(e.target.value);
          }}
        />
        <input
          type="text"
          defaultValue={booke?.Publisher}
          placeholder="Publisher"
          onChange={(e) => {
            setPu(e.target.value);
          }}
        />
        <input
          type="number"
          defaultValue={booke?.Price}
          placeholder="Price"
          onChange={(e) => {
            setpr(e.target.value);
          }}
        />
        <input
          type="text"
          defaultValue={booke?.Category}
          placeholder="Category"
          onChange={(e) => {
            setc(e.target.value);
          }}
        />
        <input
          type="boolean"
          defaultValue={booke?.Avaliable}
          placeholder="Avaliable"
          onChange={(e) => {
            setav(e.target.value);
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleChange}>Update</Button>
        <Button onClick={deletedocu}>
          <AiOutlineDelete />
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export const Adminview = () => {
  const isA = is_Admin;
  const getbookref = collection(db, "Books");
  const [bookd, setBookd] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [datae, setDatae] = useState({
    data: {
      Title: "",
      Author: "",
      Publisher: "",
      Price: 0,
      Category: "",
      Avaliable: true
    },
    Id: ""
  });
  const navgate = useNavigate();

  const getpost = async () => {
    const data = await getDocs(getbookref);
    data.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setBookd((prev) => {
        return [...prev, { data: doc.data(), Id: doc.id }];
      });
    });

    console.log(bookd);
  };
  var i = 0;

  useEffect(() => {
    getpost();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          navgate("/alanding");
        }}
      >
        back
      </button>
      <ToastContainer />
      {isA ? (
        <>
          List of Books
          <div>
            {bookd ? (
              <table>
                <tr>
                  <th>SNo</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Price</th>
                  <th>Publisher</th>
                  <th>Avaliable</th>
                  <th>ID</th>
                  <th>Edit</th>
                </tr>
                {bookd.map((bk, k) => {
                  return (
                    <tr>
                      <td>{++i}</td>
                      <td>{bk.data.Title}</td>
                      <td>{bk.data.Author}</td>
                      <td>{bk.data.Price}</td>
                      <td>{bk.data.Publisher}</td>
                      <td>{bk.data.Avaliable}</td>
                      <td>{bk.Id}</td>
                      <td>
                        <>
                          <Button
                            variant="primary"
                            onClick={() => {
                              console.log("Button pressed ==>");
                              setDatae({
                                data: {
                                  Title: bk.data.Title,
                                  Author: bk.data.Author,
                                  Publisher: bk.data.Publisher,
                                  Price: bk.data.Price,
                                  Category: bk.data.Category,
                                  Avaliable: bk.data.Avaliable
                                },
                                Id: bk.Id
                              });
                              setModalShow(true);
                            }}
                          >
                            <BiEditAlt />
                          </Button>

                          <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            daataa={datae}
                          />
                        </>
                      </td>
                    </tr>
                  );
                })}
              </table>
            ) : (
              <h1>No book found</h1>
            )}
          </div>
        </>
      ) : (
        navgate("/*vu")
      )}
    </div>
  );
};
