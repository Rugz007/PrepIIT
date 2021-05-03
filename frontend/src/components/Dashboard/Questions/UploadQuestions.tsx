import React from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
const { REACT_APP_NODEJS_URL } = process.env;

const { Dragger } = Upload;

interface UploadQuestionsProps {}

export const UploadQuestions: React.FC<UploadQuestionsProps> = () => {
  const props = {
    name: "QuestionBank",
    multiple: false,
    action: `http://${REACT_APP_NODEJS_URL}/admin/excelupload`,
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    onChange(info: any) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other band files
      </p>
    </Dragger>
  );
};
