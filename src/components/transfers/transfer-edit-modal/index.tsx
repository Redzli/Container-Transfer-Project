import React, { useContext, useEffect } from "react";
import "antd/dist/antd.css";
import { Button, message } from "antd";
import { Input, TreeNodeProps, Form } from "antd";
import styles from "./index.module.scss";
import { TransferContext } from "../../../App";
import { editTranfers } from "../../../apis";

interface IProps {
  data: TreeNodeProps;
  transfers: any;
  closeModal: () => void;
  fetchData: () => void;
}

const ContainerEditModal = (props: IProps) => {
  const { transfers, data, closeModal, fetchData } = props;
  // use context api to avoid props drilling
  const updateTransfers = useContext(TransferContext);
  console.log("FORM DATA", data);
  const { id } = data;

  const [form] = Form.useForm();

  // initialise form values
  useEffect(() => {
    form.setFieldsValue({
      ...data,
    });
  }, []);

  const onFinish = () => {
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
        //@ts-ignore
        updateTransfers(res);
        //@ts-ignore
        fetchData(res);
        console.log("LIST heyhey", res);
      })
      .catch((error) => console.error(error));
  };

  if (!data) return null;

  return (
    <div className={styles.container}>
      <Form onFinish={onFinish} form={form}>
        <Form.Item label="ID" name="id">
          {id}
        </Form.Item>
        <Form.Item label="Source Container ID" name="source_container_id">
          <Input />
        </Form.Item>

        <Form.Item
          label="Destination Container ID"
          name="destination_container_id"
        >
          <Input />
        </Form.Item>

        <Form.Item label="Amount Transferred" name="amount_transferred_unit">
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
