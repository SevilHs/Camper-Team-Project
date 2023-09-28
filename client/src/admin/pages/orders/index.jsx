import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Modal, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Search from "antd/es/input/Search";
import {
  getUserBookingData,
  searchUserBooking,
} from "../../../redux/userBookingSlice";

const Orders = () => {
  const [detailsUserBooking, setDetailsUserBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const userBooking = useSelector((state) => state.userBooking.data);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserBookingData());
  }, [dispatch]);

  const columns = [
    {
      title: "Tour Title",
      dataIndex: "tourTitle",
      render: (element) => <span>{element.slice(0, 25)}...</span>,
      key: "tourTitle",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "User Email",
      dataIndex: "contactDetails",
      render: (element) => <span> {element.email},</span>,
      key: "userEmail",
    },
    {
      title: "Traveller",
      dataIndex: "traveller",
      render: (element) => (
        <span>
          {element[0].gender} {element[0].firstName}, {element[0].lastName}...
        </span>
      ),
      key: "traveller",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="actions">
          <button onClick={() => showModal(record)}>
            <AiOutlineEye />
          </button>
        </div>
      ),
      key: "actions",
    },
  ];
  const showModal = (newsObj) => {
    setIsModalOpen(true);
    setDetailsUserBooking(newsObj);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onSearch = (value) => {
    dispatch(searchUserBooking(value));
  };
  return (
    <>
      <Modal
        className="admin-modal"
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <div className="modal-body-left">
          <div className="author-title">
            <h2>{detailsUserBooking?.tourTitle}</h2>
          </div>
          <h3 className="text-title">User Details</h3>
          <p className="release-day-title">
            Name, Lastname, Username:{" "}
            <span>
              {detailsUserBooking?.contactDetails.firstName}{" "}
              {detailsUserBooking?.contactDetails.lastName},{" "}
              {detailsUserBooking?.userName}
            </span>
          </p>
          <p className="release-day-title">
            User Email: <span>{detailsUserBooking?.contactDetails.email}</span>
          </p>
          <p className="release-day-title">
            User Address:{" "}
            <span>
              {detailsUserBooking?.contactDetails.country},{" "}
              {detailsUserBooking?.contactDetails.adress}
            </span>
          </p>
          <h3 className="text-title">Traveller</h3>
          {detailsUserBooking?.traveller.map((item, index) => (
            <p>
              {index + 1}. {item.gender}
              {item.firstName},{item.lastName}
            </p>
          ))}
        </div>
      </Modal>
      <div className="admin-data-table">
        <div className="remove-search">
          <div className="remove-search-left">
            <button>Remove</button>
            <span>Item: {selectedRowKeys.length}</span>
          </div>
          <div className="search-add">
            <Search placeholder="Search now..." onSearch={onSearch} />
          </div>
        </div>
        <Table
          style={{ width: "90%" }}
          rowSelection={rowSelection}
          rowKey={"id"}
          dataSource={userBooking}
          columns={columns}
        />
      </div>
    </>
  );
};

export default Orders;
