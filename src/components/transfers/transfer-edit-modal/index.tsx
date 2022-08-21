import React, { useContext, useEffect } from "react";
import "antd/dist/antd.css";
import { Button, message, Modal, Select } from "antd";
import { Input, TreeNodeProps, Form } from "antd";
import styles from "./index.module.scss";
import { TransferContext } from "../../../App";
import { createTransfer, editTranfers } from "../../../apis";
import { OperationMode } from "../../../apis/api-definition";

interface IProps {
  data?: TreeNodeProps;
  transfers: any;
  operationMode: OperationMode; // distinguish between creating or editing a transfer
  closeModal: () => void;
  fetchData?: () => void;
}
const { Option } = Select;

const ContainerEditModal = (props: IProps) => {
  const { transfers, operationMode, data, closeModal, fetchData } = props;
  // use context api to avoid props drilling
  const updateTransfers = useContext(TransferContext);
  console.log("UPDATE", updateTransfers);
  console.log("FORM DATA", data);
  const { id } = data || {};
  const [form] = Form.useForm();

  // initialise form values
  useEffect(() => {
    console.log("mode mode", operationMode, data);
    if (operationMode == OperationMode.EDIT && data) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, []);

  const onFinish = () => {
    if (operationMode === OperationMode.EDIT) {
      // call api to update nodes
      editTranfers(
        {
          ...form.getFieldsValue(),
          id,
        },
        transfers
      )
        .then((res) => {
          message.success("Success!");
          closeModal();
          // update transfers on the UI
          //@ts-ignore
          updateTransfers(res);
          // refresh data in the drawer
          //@ts-ignore
          fetchData && fetchData(res);
        })
        .catch((error) => console.error(error));
    } else {
      createTransfer(
        {
          ...form.getFieldsValue(),
        },
        transfers
      )
        .then((res) => {
          console.log("NEW TRAN", res);
          message.success("Success!");
          closeModal();
          // update transfers on the UI
          //@ts-ignore
          updateTransfers(res);
          // refresh data in the drawer
          //@ts-ignore
          fetchData && fetchData(res);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className={styles.container}>
      <Form onFinish={onFinish} form={form}>
        {operationMode == OperationMode.EDIT && (
          <Form.Item label="ID" name="id">
            {id}
          </Form.Item>
        )}
        <Form.Item label="Source Container ID" name="source">
          <Input />
        </Form.Item>

        <Form.Item label="Destination Container ID" name="target">
          <Input />
        </Form.Item>

        <Form.Item
          label="Amount Transferred Unit"
          name="amount_transferred_unit"
        >
          <Select defaultValue="ml" style={{ width: 120 }}>
            <Option value="ml">ml</Option>
            <Option value="L">L</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Amount Transferred" name="amount_transferred">
          <Input />
        </Form.Item>

        <Form.Item>
          <div className={styles.buttonWrapper}>
            <Button type="primary" htmlType="submit" className={styles.button}>
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContainerEditModal;
