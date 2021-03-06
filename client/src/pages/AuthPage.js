import React, {useContext, useEffect, useState} from 'react'
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
    const message = useMessage()
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });

      

    useEffect(() => {
        message(error)
        clearError()
      }, [error, message, clearError])
    
      useEffect(() => {
        window.M.updateTextFields()
      }, [])


    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    };

    const registerHandler = async () => {
        try {
           const data = await request('/api/auth/register', 'POST', {...form});
           message(data.message)
        } catch (e) {            
        }
    }

    const loginHandler = async () => {
        try {
          const data = await request('/api/auth/login', 'POST', {...form})
          //message(data.message)
          auth.login(data.token, data.userId)
        } catch (e) {}
      }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                            <div className="input-field">
                                <input value={form.email} onChange={changeHandler} placeholder="Введите email" id="email" type="text" name="email" className="yellow-input" />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input value={form.password}  onChange={changeHandler} placeholder="Введите пароль" id="password" type="password" name="password" className="yellow-input" />
                                <label htmlFor="email">Пароль</label>
                            </div>

                        </div>
                    </div>


                    <div className="card-action">
                        <button onClick={loginHandler} disabled={loading}  className="btn yellow darken-4" style={{ marginRight: 10 }}>
                            Войти
                        </button>
                        <button onClick={registerHandler} disabled={loading} className="btn grey lighten-1 black-text">
                            Регистрация
                        </button>
                    </div>

                </div>
            </div>
        </div>)
}