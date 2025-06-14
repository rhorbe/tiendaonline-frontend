import Button from "../Button/Button";

export default function Wishlist() {
    return (
        <div className="w-full space-y-10 py-10 md:py-0 md:px-[72px]">
            <div className="space-y-5">
                <p className="text-app-black font-poppins text-xl/7 font-semibold">
                    Your Wishlist
                </p>
            </div>
            <div className="overflow-x-auto hidden md:block">
                <table className="min-w-full border-collapse border-b">
                    <thead>
                        <tr className="">
                            <th className="pb-6 pl-14 pr-4 text-left text-app-black font-inter text-base/[26px] border-app-gray font-semibold border-b">
                                Product
                            </th>
                            <th className="pb-6 px-4 text-left text-app-black font-inter text-base/[26px] border-app-gray font-semibold border-b">
                                Price
                            </th>
                            <th className="pb-6 px-4 text-left text-app-black font-inter text-base/[26px] border-app-gray font-semibold border-b">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-6 px-4 border-app-light-gray border-b flex gap-4 items-center">
                                <button className="flex gap-1 items-center">
                                    <img
                                        src={'/images/close.svg'}
                                        alt={'Product Img'}
                                        className='object-contain object-center h-6 w-6'
                                    />
                                </button>
                                <div className="bg-primary w-20 h-24">
                                    <img
                                        src={'/images/product-one.png'}
                                        alt={'Product Img'}
                                        className='object-contain object-center h-auto max-h-full w-full'
                                    />
                                </div>
                                <div className="flex-shrink-0 space-y-2">
                                    <p className="text-app-black font-inter text-sm/[22px] font-semibold">
                                        Tray Table
                                    </p>
                                    <p className="text-app-gray font-inter text-xs/5 font-normal">
                                        Color: Black
                                    </p>
                                </div>
                            </td>
                            <td className="py-6 px-4 border-app-light-gray border-b">
                                <p className="text-app-black font-inter text-lg/[30px] font-normal text-left">
                                    $10.00
                                </p>
                            </td>
                            <td className="py-6 px-4 border-app-light-gray border-b">
                              <Button text="Agregar al Carrito" className="max-w-fit" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="block md:hidden">
                <table className="min-w-full border-collapse border-b">
                    <thead>
                        <tr className="">
                            <th className="pb-6 pl-14 pr-4 text-left text-app-black font-inter text-base/[26px] border-app-gray font-semibold border-b">
                                Product
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-6 px-4 border-app-light-gray border-b space-y-4">
                                <div className="flex gap-4 items-center">
                                    <button className="flex gap-1 items-center">
                                        <img
                                            src={'/images/close.svg'}
                                            alt={'Product Img'}
                                            className='object-contain object-center h-6 w-6'
                                        />
                                    </button>
                                    <div className="bg-primary w-20 h-24">
                                        <img
                                            src={'/images/product-one.png'}
                                            alt={'Product Img'}
                                            className='object-contain object-center h-auto max-h-full w-full'
                                        />
                                    </div>
                                    <div className="flex-shrink-0 space-y-2">
                                        <p className="text-app-black font-inter text-sm/[22px] font-semibold">
                                            Tray Table
                                        </p>
                                        <p className="text-app-gray font-inter text-xs/5 font-normal">
                                            Color: Black
                                        </p>
                                        <p className="text-app-black font-inter text-lg/[30px] font-normal text-left">
                                            $10.00
                                        </p>
                                    </div>
                                </div>
                                <Button text="Agregar al Carrito" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}
