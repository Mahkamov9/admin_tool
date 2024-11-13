import React, { useEffect, useState } from 'react';
import "./Category.css";
import axios from 'axios';
import { Modal, Button } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Category = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nameEn, setNameEn] = useState('');
  const [nameRu, setNameRu] = useState('');
  const [image, setImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [clickId, setClickId] = useState(null);
  const token = localStorage.getItem("tokenbek")

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (isEditMode) {
      editCategory();
    } else {
      postCategory();
    }
    setIsModalVisible(false);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
  };



  // GET categories
  const getCategory = () => {
    axios.get("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch(error => {
        console.error("Ma'lumotlarni olishda xato:", error);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);



  // POST Category
  const postCategory = () => {
    const formData = new FormData();
    formData.append("name_en", nameEn);
    formData.append("name_ru", nameRu);
    formData.append("images", image);

    axios.post("https://autoapi.dezinfeksiyatashkent.uz/api/categories", formData, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => {
        toast.success("Kategoriya muvaffaqiyatli qo'shildi!");
        getCategory();
      })
      .catch((error) => {
        toast.error("Kategoriya qo'shishda xato!");
        console.error("Kategoriya qo'shishda xato:", error?.message);
      });
  };

  // DELETE Category

  const deleteCategory = (id) => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success(item.message)
          getCategory()
        } else {
          toast.error(item?.message)
        }
      })
  }

  // EDIT Category
  const editCategory = (e) => {
    const formData = new FormData();
    formData.append("name_en", nameEn);
    formData.append("name_ru", nameRu);
    if (image) formData.append("images", image);

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${clickId}`, {
      method: 'PUT',
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6InJlZnJlc2giLCJpYXQiOjE3MTE4MDM2NDYsImV4cCI6MTc0MzMzOTY0Nn0.mGv7sWLps6F5WpZEZQ5FL18Mcixh-ETV6lUIR-TCpxA"
      },
      body: formData,
    }).then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success(item.message);
          getCategory();
        } else {
          toast.error(item?.message);
        }
      });
  };

  const handleEditClick = (item) => {
    setClickId(item?.id);
    setNameEn(item?.name_en);
    setNameRu(item?.name_ru);
    setImage(null);
    setIsEditMode(true);
    showModal();
  };

  return (
    <>
      <ToastContainer />
      <section>
        <div className="category">
          <div className='category-table-box'>
            <h2>Categories table</h2>
            <table>
              <thead>
                <tr>
                  <th>Name EN</th>
                  <th>Name RU</th>
                  <th>Image</th>
                  <th>Harakat</th>
                  <th>
                    <Button onClick={() => { setIsEditMode(false); showModal(); }}>Add</Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.name_en}</td>
                    <td>{item?.name_ru}</td>
                    <td><img src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`} alt="Kategoriya" /></td>
                    <td>
                      <Button
                        onClick={() => handleEditClick(item)}
                        style={{ backgroundColor: "blue", margin: 2, padding: 3, color: "white" }}
                      >Edit</Button>
                      <Button
                        onClick={() => deleteCategory(item?.id)}
                        style={{ backgroundColor: "red", margin: 2, padding: 3, color: "white" }}
                      >Delete</Button>
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Modal
          title={isEditMode ? "Tahrirlash  " : "Categoriya qo'shish"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{isEditMode ? "Kategoriyani o'zgartirish:" : "Kategoriyani qo'shish uchun maydonlarni kiriting:"}</p>
          <input
            value={nameEn}
            onChange={(e) => setNameEn(e?.target?.value)}
            type="text"
            placeholder="Name EN"
            style={{ width: "100%", margin: "10px 0" , height: "40px", padding: "10px" }}
          />
          <input
            value={nameRu}
            onChange={(e) => setNameRu(e?.target?.value)}
            type="text"
            placeholder="Name RU"
            style={{ width: "100%", margin: "10px 0" , height: "40px", padding: "10px" }}
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            style={{ width: "100%", margin: "10px 0" }}
          />
        </Modal>
      </section>
    </>
  );
};
