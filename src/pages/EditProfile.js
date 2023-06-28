import React from "react";
import SideMenu from "../components/SideMenu";
import "../styles/EditProfile.css"
import { Link } from "react-router-dom";
import user1 from "../assets/user1.png";
function EditProfile() {
    return (
        <div className="edit_profile">
            <div className="leftSide">
                <SideMenu />
            </div>
            <div className="rightSide">
                <div className="title_edit">
                    <h2>Chỉnh sửa thông tin</h2>
                </div>
            
                <div className="infomation">
                    
                    <div className="info-user">
                        
                        <table>
                            <tr>
                                <td>
                                    <label>Tên: </label>
                                </td>
                                <td id = "input_field">
                                    <input ></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Email: </label>
                                </td>
                                <td id = "input_field">
                                    <input ></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Số điện thoại: </label>
                                </td>
                                <td id = "input_field">
                                    <input ></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Giới tính: </label>
                                </td>
                                <td>
                                    <select>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                        <button>
                            Lưu
                        </button>

                    </div>
                    <div className="avarta" >
                        <img className="user1" src={user1}></img>
                        <button>
                            Chọn ảnh
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
