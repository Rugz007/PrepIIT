import { Button, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { QuestionAnalysis } from "../../Analysis/QuestionAnalysis";

interface LiveTestPreviewModalProps {
  id: string;
  subjectsallowed: Array<string>;
}

export const LiveTestPreviewModal: React.FC<LiveTestPreviewModalProps> = ({
  id,
  subjectsallowed,
}) => {
  const [state, setState] = useState(undefined);
  const [visible, setVisible] = useState(false);

  const fetchQuestions = (id: string) => {
    axios
      .get(
        `http://${process.env.REACT_APP_NODEJS_URL}/admin/getlivequestions/${id}`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((resp) => {
        setState(resp.data);
      });
  };
  useEffect(() => {
    fetchQuestions(id);
  }, [id]);
  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        Preview Test
      </Button>
      <Modal visible={visible} onCancel={() => setVisible(false)}>
        {state && (
          <QuestionAnalysis
            questions={state}
            subjectsallowed={subjectsallowed}
          />
        )}
      </Modal>
    </>
  );
};
