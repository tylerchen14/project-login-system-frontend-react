import React, { useEffect, useState } from 'react'
import { API_SERVER, API_SERVER_DELETE } from '@/components/config/api-path'
import { useRouter } from 'next/router'
import Layout from '@/components/shared/layout'
import Link from 'next/link'
import { FaTrash } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";

export default function MemberList() {

  const router = useRouter()

  // 預設資料
  const [list, setList] = useState({
    rows: [],
    success: false,
    totalPage: 0,
    page: 0
  })

  // 取得資料
  useEffect(() => {
    fetch(`${API_SERVER}${location.search}`)
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setList(result)
      })
  }, [router.query]
  )

  // 刪除資料
  const removeData = async (user_id) => {
    const r = await fetch(`${API_SERVER_DELETE}/${user_id}`, {
      method: "DELETE",
    })
    const result = await r.json()
    router.push(location.search)
  }


  return (
    <Layout>

      {list.success && list.rows.length > 0 ?
        <>
          <div className="row">
            <div className="col">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  {Array(11).fill(1).map((v, i) => {

                    const p = list.page - 5 + i
                    if (p < 1 || p > list.totalPage) {
                      return null
                    }

                    const active = p === list.page ? 'active' : ''

                    return (
                      <li
                        className={`page-item ${active}`}
                        key={p}>
                        <Link
                          className="page-link"
                          href={`?page=${p}`}>
                          {p}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">姓名</th>
                <th scope="col">信箱</th>
                <th scope="col">生日</th>
                <th scope="col">創建時間</th>
                <th scope="col">編輯</th>
                <th scope="col">刪除</th>
              </tr>
            </thead>
            <tbody>
              {list.rows.map((v, i) => {
                return <tr key={i}>
                  <td>{v.user_id}</td>
                  <td>{v.name}</td>
                  <td>{v.email}</td>
                  <td>{v.birthday}</td>
                  <td>{v.created_at}</td>
                  <td>
                  <Link
                  href={`/memberList/edit/${v.user_id}`}
                  >
                <FaPencil />
                </Link>
                  </td>
                  <td>
                    <Link
                      href='#'
                      onClick={(e) => {
                        e.preventDefault()
                        removeData(v.user_id)
                      }}>
                      <FaTrash />
                    </Link>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </>
        :
        <div>沒有資料可顯現</div>
      }
    </Layout>
  )
}
