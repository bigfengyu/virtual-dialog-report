import React from "react"
import { Layout, Table } from "antd"
import "./index.css"
import "./layout.css"

const { Header, Content } = Layout

const columns = [
  {
    title: "Image",
    dataIndex: "image",
    render: (text, record, index) => (
      <div style={{ textAlign: "center" }}>
        <img className="vimg" src={record.image} alt="visual img"/>
        <p>caption</p>
      </div>
    ),
  },
  {
    title: "Question",
    dataIndex: "ques_list",
    render: (text, record) => (
      <ul>
        {record.ques_list.map((q, index) => (
          <li>
            Q{index + 1}: {q}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "GT Answer",
    dataIndex: "gt_ans_list",
    render: (text, record) => (
      <ul>
        {record.gt_ans_list.map((e, index) => (
          <li>
            A{index + 1}: {e}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Sample Answer",
    dataIndex: "sample_ans_list",
    render: (text, record) => (
      <ul>
        {record.sample_ans_list.map((e, index) => (
          <li>
            A{index + 1}: {e}
          </li>
        ))}
      </ul>
    ),
  },
]

if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0 //truncate if number, or convert non-number to 0;
    padString = String(typeof padString !== "undefined" ? padString : " ")
    if (this.length >= targetLength) {
      return String(this)
    } else {
      targetLength = targetLength - this.length
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length) //append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(this)
    }
  }
}

const transformDataSource = data => {
  const newData = []
  data.forEach(row => {
    if (row.length) {
      newData.push({
        image: `https://vision.ece.vt.edu/mscoco/images/val2014/COCO_val2014_${(
          row[0].img_id + ""
        ).padStart(12, 0)}`,
        ques_list: row.map(r => r.ques),
        gt_ans_list: row.map(r => r.gt_ans),
        sample_ans_list: row.map(r => r.sample_ans),
      })
    }
  })
  return newData
}

const IndexPage = ({pageContext: {rowsData}}) => {
  const dataSource = transformDataSource(rowsData)
  return (
    <Layout>
      <Header style={{ color: "white", fontSize: 28 }}>Virtual Dialog</Header>
      <Content>
        <Table dataSource={dataSource} columns={columns} size="middle" pagination={false}/>
      </Content>
    </Layout>
  )
}

export default IndexPage


