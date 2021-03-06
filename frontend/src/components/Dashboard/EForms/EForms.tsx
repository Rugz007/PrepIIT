import { Card, Table, Button, Popover, Popconfirm } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { EFormModal } from "./EFormModal";
import env from "react-dotenv";

interface EFormInterface {
  name: string;
  email: string;
  number: string;
  standard: string;
  type: string;
  enqid: Number;
}



export const EForms: React.FC = () => {
  const [forms, setForms] = useState<EFormInterface[] | undefined>([]);
  useEffect(() => {
    fetchForms();
  }, []);


  const fetchForms = async () => {
    try {
      const res = await axios.get(`https://${env.NODEJS_URL}/admin/enquiry`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setForms(res.data);
    } catch (e) {
      console.log("Forms not loaded!");
    }
  };
  const deleteEnquiry = async (
    enqid: Number,
    forms: any[] | undefined,
    setForms: React.Dispatch<React.SetStateAction<EFormInterface[] | undefined>>
  ) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `https://${env.NODEJS_URL}/admin/enquiry`,
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          enqid: enqid,
        },
      });
      console.log(response);
      if (forms) {
        const newState = forms.filter(
          (item: { enqid: Number }) => item.enqid !== enqid
        );
        setForms(newState);
      }
    } catch (e) {
      console.log(e);
    }
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Class",
      dataIndex: "standard",
      key: "standard",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (text: any, record: EFormInterface) => (
        <>
          <EFormModal EForm={record} />
          <Popconfirm
            title="Are you sure you want to delete this question?"
            onConfirm={() => deleteEnquiry(record.enqid, forms, setForms)}>
            <Button

              type="primary"
              danger
            >
              Delete
          </Button>
          </Popconfirm>

        </>
      ),
    },
  ];
  return (
    <div style={{ textAlign: "left" }}>
      <h1 style={{ fontSize: "40px" }}>Enquiry Forms</h1>
      <Card style={{ textAlign: "left", borderRadius: "10px" }}>
        <h1 style={{ fontSize: "30px" }}>View Latest Enquiry Forms</h1>
        <Table columns={columns} dataSource={forms} style={{ width: "100%" }} />
      </Card>
    </div>
  );
};
