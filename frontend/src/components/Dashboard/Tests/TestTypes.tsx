import { Card, Table, Button, Space, message } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { TestTypeModal } from "./TestTypeModal";

export const TestTypes: React.FC = () => {
    return (
        <div style={{ textAlign: "left" }}>
                  <h1 style={{ fontSize: "40px" }}>Static Tests</h1>

      <Card
        style={{ textAlign: "left", borderRadius: "10px" }}
        title={<h1 style={{ fontSize: "30px" }}>Test Types</h1>}
        extra={
          <Space>
            <TestTypeModal />
          </Space>
        }
      >
        {/* <Table
          columns={columns}
          dataSource={questions}
          style={{ width: "100%" }}
        /> */}
      </Card>
    </div>
    );
}