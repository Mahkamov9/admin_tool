import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

export const Brands = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBrandId, setCurrentBrandId] = useState(null);

  const getBrands = () => {
    axios.get("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
      .then((res) => {
        setData(res?.data?.data || []);
      });
  };

  useEffect(() => {
    getBrands();
  }, []);

  // POST Brands

  const token = localStorage.getItem("tokenbek")
  const postBrands = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("images", file);

    const requestOptions = {
      method: isEditing ? "PUT" : "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    };

    const url = isEditing
      ? `https://autoapi.dezinfeksiyatashkent.uz/api/brands/${currentBrandId}`
      : "https://autoapi.dezinfeksiyatashkent.uz/api/brands";

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((element) => {
        if (element?.success) {
          toast.success(element?.message);
          getBrands();
          closeModal();
        } else {
          toast.error(element?.message);
          closeModal();
        }
      })
      .catch((error) => {
        toast.error("An error occurred while processing the request.");
        console.error(error);
      });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTitle('');
    setFile(null);
    setIsEditing(false);
    setCurrentBrandId(null);
  };


  const deleteBrands = (id) => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        console.log("Response status:", res.status); // Javob holatini ko'rish
        if (!res.ok) {
          throw new Error("Failed to delete brand");
        }
        return res.json();
      })
      .then((data) => {
        console.log("API response data:", data); // API javob ma'lumotlarini ko'rish
        if (data.success) {
          toast.success("Brand deleted successfully!");
          setData((prevData) => prevData.filter((brand) => brand.id !== id));
        } else {
          toast.error(data.message || "Failed to delete brand");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred while deleting the brand.");
      });
  };


  // Open Edit Modal and Set Existing Data
  const handleClickEdit = (brand) => {
    setTitle(brand.title);
    setCurrentBrandId(brand.id);
    setIsEditing(true);
    openModal();
    console.log(brand);

  };

  const handleClickDelete = (brand) => {
    deleteBrands(brand?.id)
    // console.log(brand?.id);
  }

  const styles = {
    openButton: {
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '20px',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modal: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      width: '400px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    title: {
      color: "black",
      marginBottom: '15px',
      fontSize: '20px',
      fontWeight: 'bold',
    },
    label: {
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      marginBottom: '10px',
    },
    fileInput: {
      padding: '5px',
      fontSize: '16px',
      marginBottom: '10px',
    },
    closeButton: {
      padding: '10px 20px',
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      alignSelf: 'flex-end',
    },
    addButton: {
      marginRight: "25px",
      padding: '10px 20px',
      backgroundColor: 'green',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      alignSelf: 'flex-end',
    },
    boxBtn: {
      display: "flex",
      justifyContent: "end",
    },
  };

  return (
    <>
      <ToastContainer />
      <section>
        <div className="category">
          <div className='category-table-box'>
            <h2>Brands</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Actions</th>
                  <th>
                    <Button onClick={() => {
                      setIsEditing(false);
                      openModal();
                    }}>Add</Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.title}</td>
                    <td>
                      <img
                        src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`}
                        alt="Brand"
                        style={{ width: '100px', height: 'auto' }}
                      />
                    </td>
                    <td>
                      <Button
                        onClick={() => handleClickEdit(item)}
                        style={{ backgroundColor: "blue", margin: 2, padding: 3, color: "white" }}
                      >Edit</Button>
                      <Button
                        onClick={() => handleClickDelete(item)}
                        style={{ backgroundColor: "red", margin: 2, padding: 3, color: "white" }}
                      >Delete</Button>
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal */}
            {isOpen && (
              <div style={styles.overlay}>
                <div style={styles.modal}>
                  <h2 style={styles.title}>{isEditing ? "Edit Brand" : "Add New Brand"}</h2>
                  <label style={styles.label}>Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={styles.input}
                    required
                    placeholder="Enter title"
                  />
                  <label style={styles.label}>Upload File</label>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={styles.fileInput}
                    required={!isEditing} 
                  />
                  <div style={styles.boxBtn}>
                    <button onClick={postBrands} style={styles.addButton}>
                      {isEditing ? "Update" : "Add"}
                    </button>
                    <button onClick={closeModal} style={styles.closeButton}>Close</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
