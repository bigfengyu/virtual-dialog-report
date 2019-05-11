import React from "react"
import { Layout, Table, Pagination } from "antd"
import { navigate } from "@reach/router"

import "./index.css"
import "normalize.css"

const { Header, Content } = Layout

const columns = [
  {
    title: "Image",
    dataIndex: "image",
    render: (text, record, index) => (
      <div style={{ textAlign: "center" }}>
        <img className="vimg" src={record.image} alt="visual img" />
        <p>{record.caption}</p>
      </div>
    ),
    className: 'vhead'
  },
  {
    title: "Question",
    dataIndex: "ques_list",
    render: (text, record) => (
      <ul>
        {record.ques_list.map((q, index) => (
          <li key={index}>
            Q{index + 1}: {q}
          </li>
        ))}
      </ul>
    ),
    className: 'vhead'

  },
  {
    title: "GT Answer",
    dataIndex: "gt_ans_list",
    render: (text, record) => (
      <ul>
        {record.gt_ans_list.map((e, index) => (
          <li key={index}>
            A{index + 1}: {e}
          </li>
        ))}
      </ul>
    ),
    className: 'vhead'

  },
  {
    title: "Sample Answer",
    dataIndex: "sample_ans_list",
    render: (text, record) => (
      <ul>
        {record.sample_ans_list.map((e, index) => (
          <li key={index}>
            A{index + 1}: {e}
          </li>
        ))}
      </ul>
    ),
    className: 'vhead'

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
        caption: row[0].caption || "-",
        ques_list: row.map(r => r.ques),
        gt_ans_list: row.map(r => r.gt_ans),
        sample_ans_list: row.map(r => r.sample_ans),
      })
    }
  })
  return newData
}

const goToPage = page => {
  navigate(`/page/${page}`)
}

const IndexPage = ({ pageContext: { rowsData, total, page, pageSize } }) => {
  const dataSource = transformDataSource(rowsData)
  return (
    <Layout>
      <Header style={{ color: "white", fontSize: 28 }}>Virtual Dialog</Header>
      <Content>
        <Table
          rowKey="image"
          dataSource={dataSource}
          columns={columns}
          rowClassName="vtable-row"
          size="middle"
          pagination={false}
        />
      </Content>
    </Layout>
  )
}

export default IndexPage
