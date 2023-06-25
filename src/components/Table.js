import "../styles/Table.css"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Cake from "../assets/AB.png";
import Cake1 from "../assets/Tiramisu_Category.png";
import Cake2 from "../assets/img_Cake_Category.png";
import Cake3 from "../assets/img_Cookies_Category.png";
import Cake4 from "../assets/img_Mochi_Category.png";
const List = () => {
  const rows = [
    {
      id: 1143155,
      product: "Bánh Tiramisu",
      img: Cake,
      customer: "Nguyen Van A",
      date: "24/6",
      amount: 5,
      status: "Đã xác nhận",
    },
    {
      id: 2235235,
      product: "Bánh kem",
      img: Cake1,
      customer: "Nguyễn Văn B",
      date: "24/6",
      amount: 2,
      status: "Chưa xác nhận",
    },
    {
      id: 2342353,
      product: "Cookie",
      img: Cake2,
      customer: "Nguyễn Văn C",
      date: "25/6",
      amount: 30,
      status: "Đã xác nhận",
    },
    {
      id: 2357741,
      product: "Bánh mì thanh long",
      img: Cake3,
      customer: "Nguyễn Văn D",
      date: "25/4",
      amount: 20,
      status: "Đang vận chuyển",
    },
    {
      id: 2342355,
      product: "Donut",
      img: Cake4,
      customer: "Nguyễn Văn E",
      date: "24/6",
      amount: 200,
      status: "Đang vận chuyển",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID Đơn hàng</TableCell>
            <TableCell className="tableCell">Sản phẩm</TableCell>
            <TableCell className="tableCell">Khách hàng</TableCell>
            <TableCell className="tableCell">Ngày</TableCell>
            <TableCell className="tableCell">Số lượng</TableCell>
            <TableCell className="tableCell">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
