import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Button, Modal } from "antd";
import { getContainerInfo, getTransferInfo } from "../../../apis";
import DisplayInfo, { DisplayProps } from "../../display-info";
import { TreeNodeProps } from "antd";
import styles from "./index.module.scss";
import TransferEditModal from "../transfer-edit-modal";
import { container } from "webpack";
import { OperationMode } from "../../../apis/api-definition";

interface IProps {
  transferId: number;
  transfers: any;
}

const TransferInfoDrawer = (props: IProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [transferData, setTransferData] = useState<any>();
  const { transferId, transfers } = props;

  // get transfer information
  const fetchData = (newTransfers = transfers) => {
    if (transferId) {
      //@ts-ignore
      const data = getTransferInfo(transferId, newTransfers);
      //@ts-ignore
      setTransferData(data?.[0]);
      // debugger;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displayData: DisplayProps[] = [
    {
      label: "Transfer ID",
      value: transferData?.id,
    },
    {
      label: "Destination Container ID",
      value: transferData?.target,
    },
    {
      label: "Source Container ID",
      value: transferData?.source,
    },
    {
      label: "Amount Transferred Unit",
      value: transferData?.amount_transferred_unit,
    },
    {
      label: "Amount Transferred",
      value: transferData?.amount_transferred,
    },
  ];

  const closeModal = () => {
    setModalVisible(false);
  };

  // if (!transferData) return null;

  return (
    <div className={styles.container}>
      <Button
        onClick={() => setModalVisible(true)}
        className={styles.button}
        type="primary"
      >
        {" "}
        Edit Transfer{" "}
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
        <TransferEditModal
          closeModal={closeModal}
          operationMode={OperationMode.EDIT}
          data={transferData}
          fetchData={fetchData}
          transfers={transfers}
        />
      </Modal>
    </div>
  );
};

export default TransferInfoDrawer;
