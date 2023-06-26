import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import TableLayout from "./TableLayout";

import {
  useFetchDataQuery,
  usePostDataMutation,
  useDeleteDataMutation,
  useEditDataMutation,
} from "src/features/RestaurantLayoutApi";

const RestaurantLayout = () => {
  //Redux Toolkit Queries ile ilgili state ler
  const { data, isLoading, isError } = useFetchDataQuery();
  const [
    postData,
    {
      data: postingSectionData,
      isLoading: postingNow,
      isSuccess: postingSectionSuccesful,
      isError: postingError,
    },
  ] = usePostDataMutation();
  const [deleteData] = useDeleteDataMutation();
  const [editData] = useEditDataMutation();
  //UI ile ilgili bölümlerin state lari
  const [addNewSectionForm, setAddNewSectionForm] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [tableTotal, setTableTotal] = useState("");
  //edit
  const [editModeId, setEditModeId] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedTotal, setEditedTotal] = useState("");

  //Redux Toolkit query durumları
  if (isLoading) {
    return <div>İşlem Yapılıyor...</div>;
  }

  if (isError) {
    return <div>Hata Oluştu</div>;
  }

  const closeAndResetInputs = () => {
    setSectionName("");
    setTableTotal("");
    setAddNewSectionForm(false);
  };

  //Buraya server a gidecek veriler işlenecek
  async function addNewSectionHandler() {
    postData({
      sectionName: sectionName,
      tableCount: tableTotal,
    });

    closeAndResetInputs();
  }

  // useEffect(() => {
  //   if (postingSectionData) {
  //     console.log(postingSectionData);
  //     let newSectionId = postingSectionData.data.id;
  //     let newSectionName = postingSectionData.data.sectionName;
  //     let newSectionTableCount = postingSectionData.data.tableCount;
  //     // for (let i = 0; i < newSectionTableCount; i++) {
  //     //   postTable({
  //     //     tableName: `${newSectionName}-${i + 1}`,
  //     //     sectionId: newSectionId,
  //     //   });
  //     // }
  //   }
  // }, [postingSectionData]);

  const deleteSectionHandler = (id) => {
    deleteData([id]);
  };

  //Edit modundaki section card a ait function ler
  const editSectionHandler = (id) => {
    editData({
      id: id,
      sectionName: editedName,
      tableCount: editedTotal,
    });
    closeAndResetEdits();
  };

  const closeAndResetEdits = () => {
    setEditModeId("");
    setEditedName("");
    setEditedTotal("");
  };

  return (
    <>
      <Container className="mt-4">
        <Row className="justify-content-center">
          {data.data.map((item) => {
            if (editModeId == item.id) {
              return (
                <Col xs={6} sm={4} md={3} className="mb-3">
                  <div className="sectionbox">
                    <Form.Group className="mb-1" controlId="formBasicText">
                      <Form.Control
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        type="text"
                        placeholder="Bölüm Adı"
                      />
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="formBasicText">
                      <Form.Control
                        value={editedTotal}
                        onChange={(e) => setEditedTotal(e.target.value)}
                        type="number"
                        min="1"
                        placeholder="Masa Sayısı"
                      />
                    </Form.Group>
                    <div className="sectionbox_toolbox">
                      <CheckIcon
                        onClick={() => editSectionHandler(item.id)}
                        style={{ cursor: "pointer" }}
                      />
                      <CancelOutlinedIcon
                        onClick={closeAndResetEdits}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </Col>
              );
            } else {
              return (
                <Col xs={6} sm={4} md={3} className="mb-3" key={item.id}>
                  <div className="sectionbox">
                    <h4>{item.sectionName}</h4>
                    <p>Masa Sayısı : {item.tableCount}</p>
                    <div className="sectionbox_toolbox">
                      <div
                        onClick={() => deleteSectionHandler(item.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <DeleteIcon />
                      </div>
                      <div
                        onClick={() => setEditModeId(item.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <EditIcon />
                      </div>
                    </div>
                  </div>
                </Col>
              );
            }
          })}

          {addNewSectionForm ? (
            <Col xs={6} sm={4} md={3} className="mb-3">
              <div className="sectionbox">
                <Form.Group className="mb-1" controlId="formBasicText">
                  <Form.Control
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    type="text"
                    placeholder="Bölüm Adı"
                  />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicText">
                  <Form.Control
                    value={tableTotal}
                    onChange={(e) => setTableTotal(e.target.value)}
                    type="number"
                    min="1"
                    placeholder="Masa Sayısı"
                  />
                </Form.Group>
                <div className="sectionbox_toolbox">
                  <CheckIcon
                    onClick={addNewSectionHandler}
                    style={{ cursor: "pointer" }}
                  />
                  <CancelOutlinedIcon
                    onClick={closeAndResetInputs}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </Col>
          ) : (
            <Col xs={6} sm={4} md={3} className="mb-3">
              <div
                className="sectionbox"
                onClick={() => setAddNewSectionForm(true)}
              >
                <div style={{ fontSize: "66px", cursor: "pointer" }}>+</div>
              </div>
            </Col>
          )}
        </Row>
      </Container>
      <TableLayout></TableLayout>
    </>
  );
};

export default RestaurantLayout;

// let newSectionId;
// try {
//   await fetch("http://194.62.40.78/api/admin/Section/Create", {
//     method: "POST",
//     body: JSON.stringify({
//       sectionName: sectionName,
//       tableCount: tableTotal,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error("section post edilemedi");
//       }
//     })
//     .then((data) => {
//       newSectionId = data.data.id;
//     });
// } catch (error) {
//   console.error("Error:", error);
// }

// if (newSectionId !== "") {
//   for (let i = 0; i < tableTotal; i++) {
//     await fetch("http://194.62.40.78/api/admin/Table/Create", {
//       method: "POST",
//       body: JSON.stringify({
//         tableName: `${sectionName}-${i + 1}`,
//         sectionId: newSectionId,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((error) => {
//         console.error("Hata:", error);
//       });
//   }
// }
