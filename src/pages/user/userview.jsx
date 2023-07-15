import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
//import { doc,updateDoc } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function MyVerticallyCenteredModal(props) {
  const navigate = useNavigate();
  const { daataa } = props;
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

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Borrow</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Confirm Borrow ?</h3>
      </Modal.Body>
      <Modal.Footer>
        <Button>Yes</Button>

        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export const UserV = () => {
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
  const navgate = useNavigate();
  var i = 0;
  useEffect(() => {
    getpost();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          navgate("/ulanding");
        }}
      >
        back
      </button>
      <ToastContainer />
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
                        Borrow
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
    </div>
  );
};
