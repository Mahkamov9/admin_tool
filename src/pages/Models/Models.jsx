import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

export default function Models() {
  // Modall
  const openModal = () => {
    setIsOpen(true);
  };
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };


  // Get modals

  const [malumot, setMalumot] = useState("");

  const getModels = () => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
      .then((res) => res.json())
      .then((data) => { setMalumot(data?.data) })
  }

  useEffect(() => {
    getModels();
  }, [])

  console.log(malumot);


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
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Actions</th>
                  <th>
                    <Button onClick={openModal}>Add</Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.name}</td>
                    <td>{item?.slug} <td />
                    </td>
                    <td>
                      <Button
                        style={{ backgroundColor: "blue", margin: 2, padding: 3, color: "white" }}
                      >Edit</Button>
                      <Button
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
              <div>
                <div>
                  <h2></h2>
                  <label >Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter title"
                  />
                  <label>Select Brand</label>
                  <select >
                    <option value="1">id</option>
                  </select>
                  <div>
                    <button>
                      Add
                    </button>
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