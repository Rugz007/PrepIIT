import { Button, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { History } from "history";
const { REACT_APP_NODEJS_URL } = process.env;

interface EFormModalProps {
  EForm: {
    name: string;
    email: string;
    number: string;
    standard: string;
    type: string;
    enqid: Number;
  };
}

async function deleteEnquiry(
  enqid: Number,
  history: History<unknown> | string[]
) {
  try {
    const response = await axios({
      method: "DELETE",
      url: `http://${REACT_APP_NODEJS_URL}/admin/enquiry`,
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        enqid: enqid,
      },
    });
    console.log(response);
    history.push("/login");
    history.push("/dashboard");
  } catch (e) {
    console.log(e);
  }
}

export const EFormModal: React.FC<EFormModalProps> = ({ EForm }) => {
  let history = useHistory();
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button
        type="primary"
        style={{ marginRight: "2%" }}
        onClick={() => setVisible(true)}
      >
        View
      </Button>
      <Modal visible={visible} footer={null} onCancel={() => setVisible(false)}>
        <Row>
          <br />
          Name: {EForm.name}
          <br />
          Class: {EForm.standard}
          <br />
          Email: {EForm.email}
          <br />
        </Row>
        <Row>
          <Button
            type="primary"
            onClick={() => deleteEnquiry(EForm.enqid, history)}
            danger
          >
            Delete
          </Button>
        </Row>
      </Modal>
    </>
  );
};
