// file contents: provdies a modal to edit containers
import React, { useContext, useEffect } from "react";
import "antd/dist/antd.css";
import { Button, message } from "antd";
import { Input, TreeNodeProps, Form } from "antd";
import styles from "./index.module.scss";
import { ContainerContext } from "../../../App";
import { editContainer } from "../../../apis";

interface IProps {
  data: TreeNodeProps;
  nodes: any;
  closeModal: () => void;
  fetchData: () => void;
}

const ContainerEditModal = (props: IProps) => {
  const { nodes, data, closeModal, fetchData } = props;
  // use context api to avoid props drilling
  const updateNodes = useContext(ContainerContext);
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
    editContainer(
      {
        ...form.getFieldsValue(),
        id,
      },
      nodes
    )
      .then((res) => {
        message.success("Success!");
        closeModal();
        //@ts-ignore
        updateNodes(res);
        //@ts-ignore
        fetchData(res);
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
        <Form.Item label="Container Type ID" name="container_type_id">
          <Input />
        </Form.Item>

        <Form.Item label="Operator Note" name="operator_note">
          <Input />
        </Form.Item>

        <Form.Item label="Solution Name" name="solution_name">
          <Input />
        </Form.Item>

        <Form.Item
          label="Solution Initial Volume"
          name="solution_initial_volume_mL"
        >
          <Input />
        </Form.Item>

        <Form.Item label="Inventory Location" name="inventory_location">
          <Input />
        </Form.Item>

        <Form.Item label="Solution Description" name="solution_description">
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
