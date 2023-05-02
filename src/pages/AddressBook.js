import React from "react";
import "../styles/AddressBook.css";
import SideMenu from "../components/SideMenu";

function AddressBook() {
    return (
        <div className="contact">
            <div className="leftSide">
                <SideMenu />
            </div>
            <div className="rightSide">
                <div className="address">
                    <h2>Sổ địa chỉ</h2>
                    <div className="cover-address">
                        <div className="address-info">
                            <p id="name">Trần Văn Quý - 0889201726</p>
                            <p>Trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM,
                                Phường Linh Trung, Quận Thủ Đức, Hồ Chí Minh</p>
                        </div>
                        <div className="edit">
                            <i class="fas fa-edit"></i>
                            <i class="fas fa-trash-alt"></i>
                        </div>
                    </div>
                    
                    <div className="cover-address">
                        <div className="address-info">
                            <p id="name">Trần Văn Quý - 0889201726</p>
                            <p>Trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM,
                                Phường Linh Trung, Quận Thủ Đức, Hồ Chí Minh</p>
                        </div>
                        <div className="edit">
                            <i class="fas fa-edit"></i>
                            <i class="fas fa-trash-alt"></i>
                        </div>
                    </div>
                </div>

                <div className="btn_add_address">
                    <button >Thêm địa chỉ mới</button>
                </div>
            </div>
        </div>
    );
}

export default AddressBook;