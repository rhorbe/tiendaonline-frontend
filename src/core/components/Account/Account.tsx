import Button from "../Button/Button";

export default function AccountDetails() {
    return (
        <form className="space-y-10 w-full py-10 md:py-0 md:px-[72px]">
            <div className="space-y-5">
                <p className="text-app-black font-poppins text-xl/7 font-semibold">
                    Información de contacto
                </p>
                <div className="space-y-3 w-full">
                    <label htmlFor="firstname"
                           className="text-app-gray font-inter text-sm/3 font-bold uppercase">Nombre</label>
                    <input placeholder="First name" type="text" name="firstname" id="firstname"
                           className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"/>
                </div>
                <div className="space-y-3 w-full">
                    <label htmlFor="lastname" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Apellido</label>
                    <input placeholder="Last name" type="text" name="lastname" id="firstname"
                           className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"/>
                </div>
                <div className="space-y-3 w-full">
                    <label htmlFor="displayName" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Display
                        Name</label>
                    <input placeholder="Display Name" type="text" name="Display Name" id="Display Name"
                           className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"/>
                    <p className="text-app-gray font-inter text-xs/5 italic">
                        This will be how your name will be displayed in the account section and in reviews
                    </p>
                </div>
                <div className="space-y-3 w-full">
                    <label htmlFor="email" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Correo Electrónico</label>
                    <input placeholder="Email Address" type="email" name="email" id="email"
                           className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"/>
                </div>
            </div>
            <div className="space-y-5">
                <p className="text-app-black font-poppins text-xl/7 font-semibold">
                    Contraseña
                </p>
                <div className="space-y-3 w-full">
                    <label htmlFor="oldPassword" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Contraseña actual</label>
                    <input placeholder="Old password" type="text" name="oldPassword" id="oldPassword"
                           className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"/>
                </div>
                <div className="space-y-3 w-full">
                    <label htmlFor="newPassword" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Nueva Contraseña</label>
                    <input placeholder="new password" type="text" name="newpassword" id="newPassword"
                           className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"/>
                </div>
                <div className="space-y-3 w-full">
                    <label htmlFor="repeatNewPassword"
                           className="text-app-gray font-inter text-sm/3 font-bold uppercase">Repetir nueva contraseña</label>
                    <input placeholder="Repeat New Password" type="text" name="repeatNewPassword" id="repeatNewPassword"
                           className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"/>
                </div>
                <div className="space-y-3 w-full">
                    <label htmlFor="email" className="text-app-gray font-inter text-sm/3 font-bold uppercase">Correo electrónico</label>
                    <input placeholder="Email Address" type="email" name="email" id="email"
                           className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"/>
                </div>
            </div>
            <Button text="Save changes" className="max-w-fit"/>
        </form>
    )
}
