import React from "react";
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../Firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../Share/Loading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";

const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);


  const {register,handleSubmit,watch,formState: { errors } } = useForm();

  const [token]=useToken(user || gUser);
  

  let signinError;
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/appointment";
  

  if(loading || gLoading){
    return <Loading/>;
  }
  if(error || gError){
    signinError=<p className="text-red-500">{error?.message || gError?.message}</p>
  }
  if (token) {
    navigate(from, { replace: true });
  }
  

  const onSubmit = (data) =>{
    console.log(data);
     signInWithEmailAndPassword(data.email, data.password)
    }
  

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full max-w-xs"
                {...register(
                  "email",{
                    
                      required:{
                        value:true,
                        message: "Email Required",
                      } ,
                      
                        pattern:{
                            value:/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                            message: "provide a valid email",
                        }
                      
                  
                    })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}

                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>

              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your Password"
                className="input input-bordered w-full max-w-xs"
                {...register(
                  "password",{
                    required:{
                        value:true,
                        message: "Password Required",
                    },

                    minLength:{
                        value:6,
                        message: "Must be 6 character or more",
                    } 

                  })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}

                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>

            {signinError}
            <input  className="btn btn-accent w-full" type="submit" value="Login"/>
          </form>
          <p className="text-sm text-center">new to doctor portal? <Link className="text-primary " to='/signUp'>Create a new account.</Link> </p>
          <div className="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline"
          >
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
