import Layout from '@/components/shared/layout'
import React from 'react'
import { useState } from 'react'
import { API_SERVER_ADD } from '@/components/config/api-path'
import { z } from 'zod'
import { useRouter } from 'next/router'
import styles from '@/styles/form.module.css'
import dayjs from 'dayjs'

// 判斷基準
const checkName = z.string().min(2, { message: "至少輸入兩個字" })
const checkEmail = z.string().email({ message: "請輸入正確的信箱格式" })

export default function MBadd() {

  // 建立router
  const router = useRouter()

  // 資料預設
  const [mbInfo, setmbInfo] = useState({
    name: "",
    email: "",
    birthday: "",
    created_at: "",
  })

  // 錯誤預設
  const [error, setError] = useState({
    name: "",
    email: "",
    birthday: "",
    hasErrors: false,
  })

  // 新增資料
  const handleChange = (e) => {
    setmbInfo({ ...mbInfo, [e.target.name]: e.target.value })
  }

  // 傳出資料
  const handleSubmit = async (e) => {
    e.preventDefault()

    // 錯誤判定與訊息
    let initError = {
      name: "",
      email: "",
      birthday: "",
      hasErrors: false,
    }

    // 判斷資料-姓名
    const rowName = checkName.safeParse(mbInfo.name)
    if (!rowName.success) {

      initError = {
        ...initError,
        hasErrors: true,
        name: rowName.error.issues[0].message
      }
    }

    // 判斷資料-信箱
    const rowEmail = checkEmail.safeParse(mbInfo.email)
    if (!rowEmail.success) {
      initError = {
        ...initError,
        hasErrors: true,
        email: rowEmail.error.issues[0].message
      }
    }

    // 判斷資料 -生日
    let birthday = mbInfo.birthday
    const timeFormat = "YYYY-MM-DD"

    const b = dayjs(birthday, timeFormat, true)
    if(!b.isValid()){
      initError = {
        ...initError,
        hasErrors: true,
        birthday: "必須填寫生日"
      }
    }

    // 如果有錯，展示錯誤訊息
    if (initError.hasErrors) {
      setError(initError)
      return;
    }

    // 連線資料庫，新增資料
    const r = await fetch(API_SERVER_ADD, {
      method: "POST",
      body: JSON.stringify(mbInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await r.json()
    console.log({ result });

    // 如果資料新增成功，跳轉回列表頁
    if (result.success) {
      router.push('/memberList')
    } else {
      alert('資料出現錯誤')
    }
  }

  return (
    <Layout>
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">新增資料</h5>
              <form name="form1" method="post" onSubmit={handleSubmit}>

                <div className={"mb-3 " + (error.name ? styles.error : "")}>
                  <span style={{ color: 'red' }}>*</span>
                  <label htmlFor="name" className="form-label">姓名</label>
                  <input type="text" className="form-control" id="name" name="name"
                    value={mbInfo.name}
                    onChange={handleChange} />
                  <div className="form-text">{error.name}</div>
                </div>

                <div className={"mb-3 " + (error.email ? styles.error : "")}>
                  <span style={{ color: 'red' }}>*</span>
                  <label htmlFor="email" className="form-label">信箱</label>
                  <input type="text" className="form-control" id="email" name="email"
                    value={mbInfo.email}
                    onChange={handleChange}
                  />
                  <div className="form-text">{error.email}</div>
                </div>

                <div className={"mb-3 " + (error.birthday ? styles.error : "")}>
                  <span style={{ color: 'red' }}>*</span>
                  <label htmlFor="birthday" className="form-label">生日</label>
                  <input type="date" className="form-control" id="birthday" name="birthday"
                    value={mbInfo.birthday}
                    onChange={handleChange} />
                  <div className="form-text">{error.birthday}</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="created_at" className="form-label">創建時間</label>
                  <span style={{ fontSize: '0.75rem' }}>（選填）</span>
                  <input type="date" className="form-control" id="created_at" name="created_at"
                    value={mbInfo.created_at}
                    onChange={handleChange} />
                  <div className="form-text"></div>
                </div>

                <button type="submit" className="btn btn-primary">新增</button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
