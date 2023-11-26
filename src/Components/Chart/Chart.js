import React, { useState, useEffect } from "react";
import ReactApexChart from 'react-apexcharts';
import { inputStyle } from '../Navbar/Switch';
import { useLanguage } from '../Navbar/LanguageContext';
import ComboBox from "./ComboBox";

const Report = () => {

    const { lang } = useLanguage();
    const [messageList, setMessageList] = useState([]);
    const [totalMessageCount, setTotalMessageCount] = useState(0);

    const refreshMessages = () => {
        fetch("http://localhost:8080/messages")
            .then(res => res.json())
            .then(
                (result) => {
                    setMessageList(result);
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    useEffect(() => {
        refreshMessages()
    }, [])

    useEffect(() => {
        const totalCount = messageList.length;
        setTotalMessageCount(totalCount);
    }, [messageList]);

    const prepareChartData = (messages) => {
        const groupedData = {};

        messages.forEach((message) => {
            const sendDate = new Date(message.sendDate);
            const month = sendDate.getMonth() + 1;

            if (!groupedData[month]) {
                groupedData[month] = { successful: 0, failed: 0, total: 0 };
            }

            if (message.statusCode <= 400) {
                groupedData[month].successful++;
            } else {
                groupedData[month].failed++;
            }

            groupedData[month].total++;
        });

        const categories = Object.keys(groupedData).map((month) => parseInt(month));
        const data = categories.map((month) => {
            return groupedData[month] ? groupedData[month].failed : 0;
        });

        const totalData = categories.map((month) => {
            return groupedData[month] ? groupedData[month].total : 0;
        });

        return {
            categories,
            data,
            totalData,
        };
    };

    const groupedData = prepareChartData(messageList);

    const barChartData = {
        options: {
            grid: {
                borderColor: inputStyle.color
              },
            tooltip: {
                theme: 'dark'
              },
            chart: {
                type: 'column',
                foreColor: inputStyle.color
            },
            xaxis: {
                categories: groupedData.categories,
            },
        },
        series: [
            {
                name: lang.totalCount,
                data: groupedData.totalData,
            }
        ],
    };

    const pieChartData = {
        options: {
            tooltip: {
                theme: 'dark'
              },
            chart: {
                foreColor: inputStyle.color
            },
            labels: [lang.success, lang.fail],
            colors: ['#00E396', '#D7263D'],
        },
        series: [totalMessageCount - groupedData.data.reduce((acc, count) => acc + count, 0), groupedData.data.reduce((acc, count) => acc + count, 0)],
    };

    return (
        <div>
            <div style={{
                position: 'absolute', 
                top: '100px', 
                right: '20px' }}>
                <ComboBox />
            </div>
            <h1 style={{color: inputStyle.color}}>{totalMessageCount} {lang.message}</h1>
            <div style={{color: inputStyle.color}}>
                <h2>{lang.table1}</h2>
                <ReactApexChart options={barChartData.options} series={barChartData.series} type="bar" height={350} />
            </div>
            <div style={{color: inputStyle.color}}>
                <h2>{lang.success} vs. {lang.fail} {lang.message}</h2>
                <ReactApexChart options={pieChartData.options} series={pieChartData.series} type="donut" height={350} />
            </div>
        </div>
    );
};

export default Report;
