import React, { useState, useEffect } from "react";
import "../styles/AddCake.css"
// import { collection, getDocs,getDoc, addDoc, updateDoc, deletDoc,doc } from 'firebase/firestore';
// import { collection, addDoc } from "firebase/firestore";
import { collection,addDoc , getDocs,updateDoc, doc } from 'firebase/firestore/lite'; 
import { storage, db } from "../firebase";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import SideMenuAdmin from "./SideMenuAdmin";

function UploadImg() {
    const [name,setName]=useState("");
    const [category,setCategory]=useState("");
    const [price,setPrice]=useState("");
    const [describe,setDescribe]=useState("");
    const [detail,setDetail]=useState("");
    const [imgs, setImgs] = useState([]);
    const [file, setFile] = useState("");
    const [file1, setFile1] = useState("");
    const [file2, setFile2] = useState("");
    const [file3, setFile3] = useState("");

    const [message,setMessage]=useState({error:false,msg:""});// Hiển thị thông báo
    // progress
    const [percent, setPercent] = useState(0);
    function handleChange(event) {
        // setFile(event.target.files[0]);

        const file = event.target.files[0];
        setFile(file);

        const reader = new FileReader();
        reader.onload = function (e) {
            setImgs((prevImgs) => {
            const newImgs = [...prevImgs];
            newImgs[0] = e.target.result;
            return newImgs;
            });
        };
        reader.readAsDataURL(file);
        
    }
    function handleChange1(event) {
        const file = event.target.files[0];
        setFile1(file);

        const reader = new FileReader();
        reader.onload = function (e) {
            setImgs((prevImgs) => {
            const newImgs = [...prevImgs];
            newImgs[1] = e.target.result;
            return newImgs;
            });
        };
        reader.readAsDataURL(file);
    }
      
      function handleChange2(event) {
        const file = event.target.files[0];
        setFile2(file);

        const reader = new FileReader();
        reader.onload = function (e) {
            setImgs((prevImgs) => {
            const newImgs = [...prevImgs];
            newImgs[2] = e.target.result;
            return newImgs;
            });
        };
        reader.readAsDataURL(file);
    }
      
      function handleChange3(event) {
        const file = event.target.files[0];
        setFile3(file);

        const reader = new FileReader();
        reader.onload = function (e) {
            setImgs((prevImgs) => {
            const newImgs = [...prevImgs];
            newImgs[3] = e.target.result;
            return newImgs;
            });
        };
        reader.readAsDataURL(file);
    }
    function ChangeName(value) {
       setName(value);
    }
    function ChangeCategory(value) {
        setCategory(value);
    }
    function ChangePrice(value) {
        setPrice(value);
    }
    function ChangeDescribe(value) {
      setDescribe(value);
   }
   function ChangeDetail(value) {
    setDetail(value);
 }
    function UploadImg(value) {
        setImgs((prevImgs) => [...prevImgs, value]);
      }
      

    // Handle file upload event and update state
    const handleUpload = async(e) => {

        e.preventDefault();
        setMessage("");
        if(name===""||category===""||price===""){
            setMessage({error:true,msg:"Bạn cần điền đầy đủ tất cả thông tin!"});
            return;
        }

        setName("");
        setCategory("");
        setPrice("");
        setDescribe("");
        setDetail("");
        



        // if (!file) {
        //     alert("Please upload an image first!");
        // }
 
        // const storageRef = ref(storage, `/files/${file.name}`);
        // const uploadTask = uploadBytesResumable(storageRef, file);
 
        // uploadTask.on(
        //     "state_changed",
        //     (snapshot) => {
        //         const percent = Math.round(
        //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //         );
        //         setPercent(percent);
        //     },
        //     (err) => console.log(err),
        //     async() => {
        //         try {
        //             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        //             const cakesCol = collection(db, "cakes");
        //             console.log("Image uploaded and URL saved to Firestore successfully!");
        //             setImg(downloadURL); // Gán URL hình ảnh cho img
        //             const newCake={
        //                 name,
        //                 category,
        //                 price,
        //                 img:downloadURL,
        //             }
        //             await addDoc(cakesCol, newCake);
        //             console.log(newCake);
                    
        //           } catch (error) {
        //             console.error("Error saving image URL to Firestore:", error);
        //           }
        //     }
        // ); 
        const uploadTasks = [];
        const uploadPercentages = []; // Mảng lưu trữ phần trăm tải lên từng tệp


        if (file) {
            const storageRef = ref(storage, `/files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  uploadPercentages[0] = percent;
                  setPercent(Math.max(...uploadPercentages)); // Cập nhật phần trăm lớn nhất trong mảng
                },
                (error) => {
                  console.error("Error uploading file:", error);
                }
              );
            
            uploadTasks.push(uploadTask);
          }
          
          if (file1) {
            const storageRef1 = ref(storage, `/files/${file1.name}`);
            const uploadTask1 = uploadBytesResumable(storageRef1, file1);

            uploadTask1.on(
                "state_changed",
                (snapshot) => {
                  const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  uploadPercentages[0] = percent;
                  setPercent(Math.max(...uploadPercentages)); // Cập nhật phần trăm lớn nhất trong mảng
                },
                (error) => {
                  console.error("Error uploading file:", error);
                }
              );

            uploadTasks.push(uploadTask1);
          }
          
          if (file2) {
            const storageRef2 = ref(storage, `/files/${file2.name}`);
            const uploadTask2 = uploadBytesResumable(storageRef2, file2);

            uploadTask2.on(
                "state_changed",
                (snapshot) => {
                  const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  uploadPercentages[0] = percent;
                  setPercent(Math.max(...uploadPercentages)); // Cập nhật phần trăm lớn nhất trong mảng
                },
                (error) => {
                  console.error("Error uploading file:", error);
                }
              );

            uploadTasks.push(uploadTask2);
          }
          
          if (file3) {
            const storageRef3 = ref(storage, `/files/${file3.name}`);
            const uploadTask3 = uploadBytesResumable(storageRef3, file3);

            uploadTask3.on(
                "state_changed",
                (snapshot) => {
                  const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  uploadPercentages[0] = percent;
                  setPercent(Math.max(...uploadPercentages)); // Cập nhật phần trăm lớn nhất trong mảng
                },
                (error) => {
                  console.error("Error uploading file:", error);
                }
              );

            uploadTasks.push(uploadTask3);
          }  
          const downloadURLs = [];
          try {
            for (let i = 0; i < uploadTasks.length; i++) {
              const snapshot = await uploadTasks[i];
              const downloadURL = await getDownloadURL(snapshot.ref);
              downloadURLs.push(downloadURL);
            }
          
            const cakesCol = collection(db, "cakes");
            const newCake = {
              idcake: "",
              name,
              category,
              price: parseFloat(price),
              describe,
              detail,
              img1: downloadURLs[0] || '',
              img2: downloadURLs[1] || '',
              img3: downloadURLs[2] || '',
              img4: downloadURLs[3] || '',
            };
            
            const docRef = await addDoc(cakesCol, newCake);
            const generatedId = docRef.id;
            await updateDoc(doc(cakesCol, generatedId), { idcake: generatedId });
            // await addDoc(cakesCol, newCake);
            console.log(newCake);
            console.log("Images uploaded and URLs saved to Firestore successfully!");
          } catch (error) {
            console.error("Error saving image URLs to Firestore:", error);
          }
    };
    const closeMessage = () => {
        setMessage(null);
    };
 
    return (
      <div className="Add_Cake">
        <div className="SideMenu_Admin">
          <SideMenuAdmin />
        </div>
        <div className="Add_Cake_div">
          <div className="UploadImg_header">
            <h1>Thêm sản phẩm</h1>
          </div>
          <div className="input_info">
            <div className="input_Name_div">
              <p>Tên bánh: </p>
              <input className="input_Name" type="text"
                value={name}
                onChange={(e) => ChangeName(e.target.value)}></input>

            </div>
            <div className="input_Name_div">
              <p>Giá: </p>
              <input className="input_Price" value={price}
                onChange={(e) => ChangePrice(e.target.value)}></input>

            </div>
            <div className="input_Name_div">
              <p>Thể loại: </p>
              <input className="input_Category" value={category}
                onChange={(e) => ChangeCategory(e.target.value)}></input>

            </div>
            <div className="input_Name_div">
              <p>Mô tả sản phẩm: </p>
              <input className="input_MoTa" value={describe}
                onChange={(e) => ChangeDescribe(e.target.value)}></input>

            </div>
            <div className="input_Name_div">
              <p>Chi tiết sản phẩm: </p>
              <input className="input_ChiTiet" value={detail}
                onChange={(e) => ChangeDetail(e.target.value)}></input>

            </div>


          </div>

          <div className="upload_imgs_div">
            <div className="upload_imgs">
              <input type="file" onChange={handleChange} accept="image/*" />
              {imgs[0] && <img className="upload_img" src={imgs[0]} alt="Uploaded Image" />}
            </div>
            <div className="upload_imgs">
              <input type="file" onChange={handleChange1} accept="image/*" />
              {imgs[1] && <img className="upload_img" src={imgs[1]} alt="Uploaded Image" />}
            </div>
            <div className="upload_imgs">
              <input type="file" onChange={handleChange2} accept="image/*" />
              {imgs[2] && <img className="upload_img" src={imgs[2]} alt="Uploaded Image" />}
            </div>
            <div className="upload_imgs">
              <input type="file" onChange={handleChange3} accept="image/*" />
              {imgs[3] && <img className="upload_img" src={imgs[3]} alt="Uploaded Image" />}
            </div>

          </div>

          <button onClick={handleUpload}>Lưu</button>
          {/* {!isFormValid && (
              <div className="message error">
                <span className="message-text">Please fill in all fields.</span>
              </div>
            )} */}

          {/* <input type="file" onChange={handleChange} value={img} accept="/image/*" />
            <button onClick={handleUpload}>Upload to Firebase</button> */}
          <p>{percent} "% done"</p>
          {message && (
            <div className={`message ${message.error ? "error" : "success"}`}>
              <span className="message-text">{message.msg}</span>
              <button className="message-close" onClick={closeMessage}>
                X
              </button>
            </div>
          )}
        </div>

      </div>


    
  );
}
export default UploadImg;
