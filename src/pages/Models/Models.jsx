import "./Models.css";
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'


export default function Models() {
  const [isOpen, setIsOpen] = useState(false);
  const [modelName, setModelName] = useState("");
  const [brandId, setBrandId] = useState();
  const [malumot, setMalumot] = useState();
  const [brands, setBrands] = useState();
  const [updateData, setUpdateData] = useState();
  const [isEditModal, setIsEditModal] = useState(false);



  const token = localStorage.getItem("tokenbek")
  useEffect(() => {
    if (!token) {
      toast.error("Token mavjud emas, iltimos tizimga qayta kiring.");
    }
  }, [token])



  // GET METHOD Models
  const getModels = () => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
      .then((res) => res.json())
      .then((data) => { setMalumot(data?.data) })
  }
  // GET METHOD Brands ID
  const getBrands = () => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
      .then((res) => res.json())
      .then((data) => { setBrands(data?.data) })
  }
  useEffect(() => {
    getModels();
    getBrands();
  }, [])

  // Modal
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  // Edit Modal
  const openEditModal = () => {
    setIsEditModal(true)
  }

  const closeEditModal = () => {
    setIsEditModal(false)
  }

  function handeClickEdit(item) {
    editModels(item?.id)
    openEditModal()
    console.log(item.id)

  }

  // POST METHOD Models
  const postModels = (e) => {
    e.preventDefault();

    if (!modelName || !brandId) { toast.error('Iltimos, barcha maydonlarni to‘ldiring.'); return; }

    const formData = new FormData();
    formData.append("name", modelName);
    formData.append("brand_id", brandId);

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models", {
      method: "POST",
      headers: {
        "Authorization": ` Bearer ${token}`
      },
      body: formData,
    }).then((res) => res.json())
      .then((data) => {
        if (data.success) {
          getModels();
          toast.success(data?.message)
          closeModal()
        } else {
          toast.error(data?.message)
        }
      }).catch((error) => {
        console.log("Error POST", error);
        toast.error("Error")
      });
  };

  // PUT METHOD Models           ?.!
  const editModels = () => {
    const formData = new FormData();
    formData.append("name", modelName);
    formData.append("brand_id", brandId);
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${updateData?.id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    }).then((res) => res.json())
      .then(data => {
        if (data.success) {
          toast.success(data?.message)
          getModels()
          closeEditModal()
        } else {
          toast.error(data?.message)
        }
      }).catch((error) => {
        console.error("PUT Request Error:", error);
      })
  }

  // DELETE METHOD Models
  const deleteModels = (id) => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": ` Bearer ${token}`
      },
    }).then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          getModels()
          toast.success(data?.message)
        } else {
          toast.error(data?.message)
        }
      }).catch((error) => {
        console.log(data.message)
      })
  }
  const handleClickDelete = (model) => {
    getModels();
    deleteModels(model?.id)
  }

  return (
    <>
      <ToastContainer />
      <section>
        <div className="category">
          <div className='category-table-box'>
            <h2>Models</h2>
            <table>
              <thead>
                <tr>
                  <th>Brand title</th>
                  <th>name</th>
                  <th>Actions</th>
                  <th>
                    <Button onClick={openModal}>Add</Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {malumot?.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.brand_title}</td>
                    <td>{item?.name} <td />
                    </td>
                    <td>
                      <Button
                        onClick={() => { handeClickEdit(item); setUpdateData(item) }}
                        style={{ backgroundColor: "blue", margin: 2, padding: 3, color: "white" }}
                      >Edit</Button>
                      <Button
                        onClick={() => { handleClickDelete(item) }}
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
              <div className='model_modal_box'>
                <div className='model_modal'>
                  <h2>Add models</h2>
                  <label >Name</label>
                  <input
                    onChange={(e) => setModelName(e?.target?.value)}
                    type="text"
                    required
                    placeholder="model name"
                    minLength={5}
                  />
                  <label>Select Brand</label>
                  <select value={brandId || ""} onChange={(e) => setBrandId(e?.target?.value)}>
                    <option aria-disabled >Tanlang</option>
                    {brands?.map((item, index) => (
                      <option key={index} value={item?.id}>{item?.title}</option>
                    ))}
                  </select>
                  <div className='models_buttons'>
                    <button onClick={postModels}>Add</button>
                    <button onClick={closeModal}>Close</button>
                  </div>
                </div>
              </div>
            )}

            {isEditModal && (
              <div className='model_modal_box'>
                <div className='model_modal'>
                  <h2>Edit models</h2>
                  <label >Name</label>
                  <input
                    defaultValue={updateData.name}
                    onChange={(e) => setModelName(e?.target?.value)}
                    type="text"
                    required
                    placeholder="model name"
                  />
                  <label>Select Brand</label>
                  {/* <select value="" onChange={(e)=>setBrandId(e?.target?.value)}>
                    <option aria-disabled >Tanlang</option>
                  </select> */}
                  <select defaultValue={updateData.brand_id} onChange={(e) => setBrandId(e?.target?.value)}>
                    <option aria-disabled >Tanlang</option>
                    {brands?.map((item, index) => (
                      <option key={index} value={item?.id}>{item?.title}</option>
                    ))}
                  </select>
                  <div className='models_buttons'>
                    <button onClick={editModels}>Edit</button>
                    <button onClick={closeEditModal}>Close</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
