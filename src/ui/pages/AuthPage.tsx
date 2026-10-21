import envs from "../../config/envs";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../shared/hooks/useForm";
import useAuth from "../../shared/hooks/useAuth";
import { privateRoutes } from "../../config/routes";

const AuthPage = () => {
   const { formState, onFieldChange } = useForm({
      // email: '', password: ''
      email: envs.ADMIN_USER.email, password: envs.ADMIN_USER.password
   });

   const { onRoleChange } = useAuth();

   const navigate = useNavigate();

   const onLogin = () => {
      const { email, password } = formState;
      const { email: adminEmail, password: adminPassword } = envs.ADMIN_USER;

      if (email.trim() !== adminEmail.trim() || password.trim() !== adminPassword.trim()) {
         return alert('Credenciales inválidas');
      }

      onRoleChange('admin');
      navigate(`/${privateRoutes.dashboard}`);
   }

   const onKeyPress = (e: any) => {
      if (e.key.toLowerCase() === 'enter') {
         onLogin();
      }
   }

   return (
      <div className="min-h-screen">
         <div className="w-full max-w-md abs-center space-y-4 p-8 shadow-sm rounded-xl">
            <h1 className="mb-5 text-2xl font-semibold text-center">
               Panel de Administración
            </h1>

            <input
               onChange={(e) => onFieldChange('email', e.target.value)}
               onKeyDown={onKeyPress}
               defaultValue={formState.email}
               className="w-full block py-2.5 px-5 border text-slate-700 border-slate-300 rounded-lg focus:border-black focus:border-2"
               placeholder="Correo"
               type="email"
               autoFocus
            />

            <input
               onKeyDown={onKeyPress}
               onChange={(e) => onFieldChange('password', e.target.value)}
               defaultValue={formState.password}
               className="w-full block py-2.5 px-5 border text-slate-700 border-slate-300 rounded-lg focus:border-black focus:border-2"
               placeholder="Contraseña"
               type="password"
            />

            <button
               onClick={onLogin}
               className="cursor-pointer w-full rounded-lg block bg-black py-2.5 px-5 uppercase font-semibold text-white"
            >
               Ingresar
            </button>

            <Link
               to="/"
               className="block mx-auto text-[12px] text-slate-400 hover:text-blue-500 hover:underline text-center"
            >
               Volver
            </Link>
         </div>
      </div>
   )
}

export default AuthPage;