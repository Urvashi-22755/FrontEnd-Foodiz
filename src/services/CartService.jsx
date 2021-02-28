import axios from "axios";

const token = localStorage.getItem("token");
const headers = {
  // "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export async function fetchUserCartDeatails(headers) {
    

    const res = await axios
        .get("http://localhost:5000/cart/getcart", {
            headers: headers,
        });
    return res.data;

}
