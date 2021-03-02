import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import { decodeToken } from '../../services/authUser';
import  Paper  from '@material-ui/core/Paper';

// const data = [
//     ["Element", "Density", { role: "style" }],
//     ["Copper", 8.94, "#B87333"], // RGB value
//     ["Silver", 10.49, "silver"], // English color name
//     ["Gold", 19.3, "gold"],
//     ["Platinum", 21.45, "color: #E5E4E2"] // CSS-style declaration
//   ];
function ChartPage() {
    const token = localStorage.getItem("token");
    const decodedToken = decodeToken(token);
    const headers = {
        //'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
    const options = {
        title: "Number of Completed orders in Restaurant",
        pieHole: 0.4,
        is3D: false
    };
    const [dataColumnChart, setDataColumnChart] = useState([]);
    const [dataPieChart, setDataPieChart] = useState([]);
    useEffect(() => {
        (async function () {
            if (decodedToken.role == "DE") {
                const res = await axios.get('http://localhost:5000/delivery/monthlybasedratingfordeliveryexecutive', {
                    headers: headers
                });
                const data1 = res.data;
                data1.unshift(["Month", "Rating", { role: "style" }])
                console.log("Response for chart", data1);
                setDataColumnChart(data1);
                const res1 = await axios.get('http://localhost:5000/delivery/countnumberofrestaurantorderbydeliverexecutive', {
                    headers: headers
                });
                const data2 = res1.data;
                data2.unshift(["Restaurant", "Completed Orders"],)
                console.log("Response for pie chart", data2);
                setDataPieChart(data2);
            } else {
                const res1 = await axios.get('http://localhost:5000/user/countnumberofrestaurantorderbyuser', {
                    headers: headers
                });
                const data2 = res1.data;
                data2.unshift(["Restaurant", "Completed Orders"],)
                console.log("Response for pie chart", data2);
                setDataPieChart(data2);
            }
        })()
    }, [])
    return (
        <div >
            {
                dataPieChart.length>1
                ?
                <Paper>
                    <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={dataPieChart}
                options={options}
            />
                </Paper>
                :<>You haven't placed any order yet!!!</>
            }
            {
                    decodedToken.role == "DE"
                    ?(
                        dataColumnChart.length>1
                    ?<Paper>
                         <Chart
                        chartType="ColumnChart"
                        width="100%"
                        height="400px"
                        data={dataColumnChart}
                    /></Paper>
                    : <>You haven't completed any order Yet!!!</>
                    )
                    :<></> 
            }
        </div>
    );
}
export default ChartPage;
