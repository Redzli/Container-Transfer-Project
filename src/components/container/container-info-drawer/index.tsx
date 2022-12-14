import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Button, Modal } from "antd";
import { getContainerInfo } from "../../../apis";
import DisplayInfo, { DisplayProps } from "../../display-info";
import styles from "./index.module.scss";
import ContainerEditModal from "../container-edit-modal";

interface IProps {
  containerId: number;
  nodes: any;
}

const ContainerInfoModal = (props: IProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [containerData, setContainerData] = useState<any>();
  const { containerId, nodes } = props;

  // get container information
  const fetchData = (newNodes = nodes) => {
    if (containerId) {
      //@ts-ignore
      const data = getContainerInfo(containerId, newNodes);
      //@ts-ignore
      setContainerData(data?.[0]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displayData: DisplayProps[] = [
    {
      label: "Container ID",
      value: containerData?.id,
    },
    {
      label: "Operator Note",
      value: containerData?.operator_note,
    },
    {
      label: "Container Type ID",
      value: containerData?.container_type_id,
    },
    {
      label: "Solution Name",
      value: containerData?.solution_name,
    },
    {
      label: "Solution Initial Volume in ml",
      value: containerData?.solution_initial_volume_mL,
    },
    {
      label: "Inventory Location",
      value: containerData?.inventory_location,
    },
    {
      label: "Solution Description",
      value: containerData?.solution_description,
    },
  ];

  const closeModal = () => {
    setModalVisible(false);
  };

  if (!containerData) return null;

  return (
    <div className={styles.container}>
      <Button
        onClick={() => setModalVisible(true)}
        className={styles.button}
        type="primary"
      >
        {" "}
        Edit Container{" "}
      </Button>

      {displayData?.map((data: DisplayProps) => {
        return (
          <DisplayInfo key={data.label} label={data.label} value={data.value} />
        );
      })}

      <Modal
        title="Container Information"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => setModalVisible(false)}
        destroyOnClose
        footer={null}
      >
        <ContainerEditModal
          closeModal={closeModal}
          data={containerData}
          fetchData={fetchData}
          nodes={nodes}
        />
      </Modal>
    </div>
  );
};

export default ContainerInfoModal;
