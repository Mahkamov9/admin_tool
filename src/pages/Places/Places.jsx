import React, { useEffect, useState } from 'react'
import "./Places.css"
import { toast, ToastContainer } from 'react-toastify';
import { Button } from 'antd';
import axios from 'axios';



export default function Places() {

  const [malumot, setMalumot] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState();
  const [text, setText] = useState();
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("tokenbek")


  // Modal
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  // Location GET method
  function getLocation() {
    axios.get("https://autoapi.dezinfeksiyatashkent.uz/api/locations")
      .then((res) => { setMalumot(res?.data?.data) })
  }
  useEffect(() => {
    getLocation()
  }, [])


  // Location POST method
  const postLocation = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("text", text);
    formData.append("images", image);
    axios.post("https://autoapi.dezinfeksiyatashkent.uz/api/locations", formData, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      if (res?.data?.success) {
        toast.success(res?.data?.message)
        closeModal()
        getLocation()
      } else {
        toast.error(res?.data?.message)
      }
    })
      .catch((error) => {
        console.error("POST da xatolik", error)
      })
  }


  // DELETE

  const deleteLocation = (id)=>{
    axios.delete(`https://autoapi.dezinfeksiyatashkent.uz/api/locations/${id}`,{
      headers:{
        "Authorization": `Bearer ${token}`
      }
    }).then((res)=>{
      console.log(res?.data)
      console.log(id)
      toast.success(res?.data?.message)
      getLocation()
    }).catch((error)=>{
      toast.error(res?.data?.message)
      console.error(error, "detele method failed")
    })
  }


  return (
    <>
      <ToastContainer />
      <section>
        <div className="category">
          <div className='category-table-box'>
            <h2>Places</h2>
            <table>
              <thead>
                <tr>
                  <th>Brand title</th>
                  <th>name</th>
                  <th>Images</th>
                  <th>Actions</th>
                  <th>
                    <Button onClick={openModal}>Add</Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {malumot?.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.name}</td>
                    <td>{item?.text} </td>
                    <td><img src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`} alt="Kategoriya" /></td>
                    <td>
                      <Button
                        style={{ backgroundColor: "blue", margin: 2, padding: 3, color: "white" }}
                      >Edit</Button>
                      <Button
                        onClick={()=>{deleteLocation(item?.id)}}
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
                    onChange={(e) => setName(e?.target?.value)}
                    type="text"
                    required
                    placeholder="model name"
                    minLength={5}
                  />
                  <label>Select Brand</label>
                  <input
                    onChange={(e) => setText(e?.target?.value)}
                    type="text"
                    required
                    placeholder="model name"
                    minLength={5}
                  />
                  <label>Select image</label>
                  <input
                    onChange={(e) => setImage(e?.target?.files[0])}
                    type="file"
                    accept='image/png'
                    required
                  />
                  <div className='models_buttons'>
                    <button onClick={postLocation}>Add</button>
                    <button onClick={closeModal}>Close</button>
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
