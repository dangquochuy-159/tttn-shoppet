import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Validator from "~/utils/validator";
import './login.scss'

function Login() {
    const [eyePass, setEyePass] = useState('false')
    const ipPassRef = useRef()

    useEffect(() => {
        const check = {
            isEmpty: "Vui lòng không để trống",
            isEmail: "Vui lòng nhập đúng định dạng",
            minPass: 6,
            isPass() {
                return `Vui lòng nhập tối thiểu ${this.minPass} ký tự`
            },
        }
        Validator({
            form: '#form-login',
            formGroup: '.form-group',
            formError: '.msg-error',
            rules: [
                Validator.isRequired("#email", check.isEmpty),
                Validator.isEmail("#email", check.isEmail),
                Validator.isRequired("#password", check.isEmpty),
                Validator.isMinLength("#password", check.minPass, check.isPass()),
            ],
            onRegister: function (data) {
                const eleErrorLogin = document.querySelector('.error--login')
                axios.post(`${process.env.REACT_APP_API_URL}/api/admins/login`, data)
                    .then((res) => {
                        let logged = res.data.login
                        if (logged) {
                            alert(res.data.message)
                            window.localStorage.setItem('adminLogin', JSON.stringify({ data: res.data }))
                            window.location.href = '/admin/dashboard';
                        } else {
                            eleErrorLogin.innerHTML = res.data.message
                        }
                    })
                    .catch((error) => {
                        console.error('Đã xảy ra lỗi:', error);
                    });
            }
        })
    })
    const handleShowPassword = (e) => {
        setEyePass(!eyePass)
        ipPassRef.current.type = ipPassRef.current.type === 'password' ? 'text' : 'password';
    }
    return (
        <div className="wrapper--login w-full h-screen relative">
            <div className="w-3/4 h-1/2 p-5 max-w-md bg-white absolute bottom-32 left-24 rounded shadow-lg">
                <h2 className="text-4xl text-center">Đăng nhập</h2>
                <form action="" method="POST" id="form-login" noValidate className="form mt-10 space-y-8">
                    <div className="form-group">
                        <input
                            id="email"
                            className="w-full border-2 border-solid border-gray-400 rounded h-12 px-4 focus:outline-none form-control"
                            type="email"
                            name="email"
                            placeholder="Nhập emai"
                            onFocus={() => document.querySelector('.error--login').innerHTML = ''}
                        />
                        <span className="msg-error text-red-600"></span>
                    </div>
                    <div className="form-group">
                        <div className="flex items-center">
                            <input
                                ref={ipPassRef}
                                id="password"
                                className="w-full border-2 border-solid border-gray-400 rounded h-12 px-4 focus:outline-none -mr-7  form-control"
                                type="password"
                                name="password"
                                placeholder="Nhập mật khẩu"
                                onFocus={() => document.querySelector('.error--login').innerHTML = ''}
                            />
                            <button type='button' onClick={handleShowPassword}>
                                {
                                    eyePass ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )
                                }
                            </button>
                        </div>
                        <span className="msg-error text-red-600"></span>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-orange-500 text-sm active:bg-gray-700 cursor-pointer font-regular text-white px-4 py-2 rounded uppercase">
                            Xác nhận
                        </button>
                        <p className="error--login inline-block align-baseline font-bold text-sm text-red-500"></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;